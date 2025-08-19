require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');

// Azure Storage configuration
const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'storageattach1';
const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY || 'CzfafEbGF7YzQoqShY7N3dUpw13kC2CRvNcvjasem5H6YNpi4sKI6qZFcIeVpFFDTYiFTiQ1B0jE+AStykwq/w==';
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || 'manual-pdfs';
const AZURE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net` || 'DefaultEndpointsProtocol=https;AccountName=storageattach1;AccountKey=CzfafEbGF7YzQoqShY7N3dUpw13kC2CRvNcvjasem5H6YNpi4sKI6qZFcIeVpFFDTYiFTiQ1B0jE+AStykwq/w==;EndpointSuffix=core.windows.net';

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-secret-key-123456';

// In-memory cache for LiteratureReviewView data
const userDataCache = new Map();
const CACHE_EXPIRY_MS = 3600000; // 1 hour

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Database configurations
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ,
  server: process.env.DB_SERVER,
  database: 'biov2',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000,
    requestTimeout: 30000,
    authentication: { type: 'default' }
  }
};

const loginDbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ,
  server: process.env.DB_SERVER,
  database: 'biov2',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000,
    requestTimeout: 30000,
    authentication: { type: 'default' }
  }
};

// Connection pools
let pool;
async function initializePool() {
  try {
    console.log('Initializing SQL pool for biov2...');
    if (!pool) {
      pool = await new sql.ConnectionPool(dbConfig).connect();
      console.log('SQL pool established for biov2');
    }
    return pool;
  } catch (err) {
    console.error('Database connection failed for biov2:', err.message);
    throw err;
  }
}

let loginPool;
async function initializeLoginPool() {
  try {
    console.log('Initializing SQL pool for Literature Assistant(Emcure)...');
    if (!loginPool) {
      loginPool = await new sql.ConnectionPool(loginDbConfig).connect();
      console.log('SQL pool established for Literature Assistant(Emcure)');
    }
    return loginPool;
  } catch (err) {
    console.error('Database connection failed for Literature Assistant(Emcure):', err.message);
    throw err;
  }
}

initializePool().catch(err => console.error('Failed to initialize biov2 pool:', err));
initializeLoginPool().catch(err => console.error('Failed to initialize Literature Assistant pool:', err));

// Ensure locks table (in biov2)
async function ensureLocksTable() {
  try {
    const poolInstance = await initializePool();
    await poolInstance.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'record_locks')
      BEGIN
        CREATE TABLE record_locks (
          id INT IDENTITY(1,1) PRIMARY KEY,
          record_id NVARCHAR(100) NOT NULL,
          client_id NVARCHAR(100) NOT NULL,
          timestamp DATETIME NOT NULL,
          CONSTRAINT UQ_record_lock UNIQUE (record_id)
        )
      END
    `);
    console.log('Locks table ready');
  } catch (err) {
    console.error('Error creating locks table:', err.message);
  }
}

ensureLocksTable();

// Clean expired locks
async function cleanExpiredLocks() {
  try {
    const poolInstance = await initializePool();
    const expiryMinutes = 30;
    const result = await poolInstance.request()
      .input('expiryTime', sql.DateTime, new Date(Date.now() - expiryMinutes * 60000))
      .query('DELETE FROM record_locks WHERE timestamp < @expiryTime');
    console.log(`Expired locks: ${result.rowsAffected[0]} removed`);
  } catch (err) {
    console.error('Error cleaning expired locks:', err.message);
  }
}

setInterval(cleanExpiredLocks, 5 * 60 * 1000);

// SQL type helper
function getSqlType(value, key) {
  if (value === null || value === undefined) return sql.NVarChar(4000);
  const keyLower = key.toLowerCase();
  if (keyLower.includes('date') || keyLower.includes('validation processing')) {
    return (value instanceof Date || !isNaN(Date.parse(value))) ? sql.DateTime : sql.NVarChar(100);
  }
  if (typeof value === 'number') return Number.isInteger(value) ? sql.Int : sql.Float;
  if (typeof value === 'boolean') return sql.Bit;
  if (typeof value === 'string') {
    if (/^\d+$/.test(value) && !keyLower.includes('id') && !keyLower.includes('article')) return sql.Int;
    if (/^\d+\.\d+$/.test(value)) return sql.Float;
    return value.length > 4000 ? sql.NVarChar(sql.MAX) : sql.NVarChar(4000);
  }
  return sql.NVarChar(4000);
}

// Role-based middleware
const restrictToRoles = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.roleId;
    console.log(`User role: ${userRole}, Allowed roles: ${allowedRoles}`);
    if (!userRole || !allowedRoles.includes(userRole)) {
      console.warn(`Access denied: User with roleId ${userRole} attempted to access restricted endpoint`);
      return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};

// JWT middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.user;
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('JWT Payload:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Clear cache for user
function clearUserCache(userId) {
  userDataCache.delete(userId);
  console.log(`Cache cleared for userId: ${userId}`);
}

// Update cache for user
async function updateUserCache(userId) {
  try {
    const poolInstance = await initializeLoginPool();
    const result = await poolInstance.request().query('SELECT * FROM [dbo].[LiteratureReviewView]');
    userDataCache.set(userId, {
      data: result.recordset,
      timestamp: new Date(),
      expiryMs: CACHE_EXPIRY_MS
    });
    console.log(`Cache updated for userId: ${userId}, records: ${result.recordset.length}`);
  } catch (err) {
    console.error(`Error updating cache for userId ${userId}:`, err.message);
    throw err;
  }
}

// Update single row in cache
async function updateSingleRowInCache(userId, articlePMID, drug, updatedData) {
  try {
    let cache = userDataCache.get(userId);
    if (!cache || (Date.now() - cache.timestamp.getTime()) >= cache.expiryMs) {
      console.log(`Cache miss or expired for userId: ${userId}, initializing cache`);
      await updateUserCache(userId);
      cache = userDataCache.get(userId);
    }

    const rowIndex = cache.data.findIndex(
      item => item['Article PMID'] === articlePMID && item['Drug'] === (drug || item['Drug'])
    );

    const updatedRow = {
      ...(rowIndex >= 0 ? cache.data[rowIndex] : {}),
      ...updatedData,
      'Article PMID': articlePMID,
      'Drug': drug || (rowIndex >= 0 ? cache.data[rowIndex]['Drug'] : 'UnknownDrug')
    };

    if (rowIndex >= 0) {
      cache.data[rowIndex] = updatedRow;
      console.log(`Updated row in cache for userId: ${userId}, Article PMID: ${articlePMID}, Drug: ${drug}`);
    } else {
      cache.data.push(updatedRow);
      console.log(`Added new row to cache for userId: ${userId}, Article PMID: ${articlePMID}, Drug: ${drug}`);
    }

    userDataCache.set(userId, {
      data: cache.data,
      timestamp: new Date(),
      expiryMs: CACHE_EXPIRY_MS
    });
  } catch (err) {
    console.error(`Error updating single row in cache for userId ${userId}:`, err.message);
    await updateUserCache(userId);
  }
}

// Get cached data or refresh if expired
async function getCachedData(userId) {
  const cache = userDataCache.get(userId);
  if (cache && (Date.now() - cache.timestamp.getTime()) < cache.expiryMs) {
    console.log(`Returning cached data for userId: ${userId}`);
    return cache.data;
  }
  console.log(`Cache miss or expired for userId: ${userId}, fetching from DB`);
  await updateUserCache(userId);
  return userDataCache.get(userId).data;
}

// Map columns to their base tables
const columnToTableMap = {
  'Mail': ['Mail'],
  'Article PMID': ['Mail_Article', 'Article', 'Article_Drug'],
  'Url': ['Article'],
  'Article Access': ['Article'],
  'Article Type': ['Article'],
  'PMCID': ['Article'],
  'Pdf File': ['Article'],
  'IRD': ['Mail'],
  'Validation Processing Date': ['Mail'],
  'Title': ['Article'],
  'Abstract': ['Article'],
  'Summary': ['Article_Drug'],
  'Search Term': ['Mail'],
  'Drug': ['Mail_Article', 'Article_Drug'],
  'Article Publication Date': ['Article'],
  'Primary Author Address': ['Article'],
  'Primary Author Country': ['Article'],
  'Author Validation (Rule-1)': ['Article'],
  'Publication Date Validation (Rule-2)': ['Article'],
  'Patient Type': ['Article_Drug'],
  'Patient Details': ['Article_Drug'],
  'Patient Validation (Rule-3)': ['Article_Drug'],
  'Reporter Details': ['Article_Drug'],
  'Casuality Response': ['Article_Drug'],
  'Casuality Validation (Rule-4)': ['Article_Drug'],
  'Comments (ICSR, AOI, Not selected)': ['Article_Drug'],
  'Reason of selection': ['Article_Drug'],
  'Status': ['Mail_Article'],
  'MedicalReviewerStatus': ['Mail_Article'],
  'MedicalReviewerComments': ['Mail_Article'],
  'DocumentURL': ['Article']
};

// Authentication Endpoints
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password: password ? '[provided]' : '[missing]' });
    if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ error: 'Username and password required' });
    }
    const poolInstance = await initializeLoginPool();
    const result = await poolInstance.request()
      .input('username', sql.NVarChar, username)
      .query(`
        SELECT u.UserID, u.Username, u.Password, CAST(u.RoleID AS INT) AS RoleID, r.Role
        FROM [dbo].[User] u
        JOIN [dbo].[Role] r ON u.RoleID = r.RoleID
        WHERE u.Username = @username
      `);
    console.log('Query result:', result.recordset.length, 'users found');
    const user = result.recordset[0];
    if (!user || password !== user.Password) {
      console.log('Invalid credentials for:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('User roleId:', user.RoleID);
    const token = jwt.sign({ userId: user.UserID, roleId: user.RoleID }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated JWT token:', token);
    await updateUserCache(user.UserID);
    res.cookie('user', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });
    console.log('Login successful:', user.Username);
    res.json({
      userId: user.UserID,
      username: user.Username,
      roleId: user.RoleID,
      role: user.Role
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.post('/api/logout', (req, res) => {
  const userId = req.user?.userId;
  if (userId) clearUserCache(userId);
  res.clearCookie('user');
  res.json({ message: 'Logged out' });
});

// File Upload Endpoint
app.post('/api/upload-document', verifyToken, restrictToRoles([1]), upload.single('file'), async (req, res) => {
  try {
    const { articlePMID, drugName } = req.body;
    const file = req.file;
    console.log('Received upload request:', { articlePMID, drugName, file: file ? file.originalname : 'No file' });
    if (!file || !articlePMID) {
      console.error('Missing required fields:', { articlePMID, file: !!file });
      return res.status(400).json({ error: 'File and Article PMID are required' });
    }
    const poolInstance = await initializeLoginPool();
    const checkResult = await poolInstance.request()
      .input('pmid', sql.NVarChar(100), articlePMID)
      .input('drug', sql.NVarChar(100), drugName || null)
      .query(`
        SELECT Status, Drug
        FROM [dbo].[LiteratureReviewView]
        WHERE [Article PMID] = @pmid AND (@drug IS NULL OR Drug = @drug)
      `);
    if (checkResult.recordset.length === 0) {
      console.error(`No record found for Article PMID: ${articlePMID}, Drug: ${drugName || 'Any'}`);
      return res.status(404).json({ error: `Record not found for Article PMID: ${articlePMID}` });
    }
    const currentStatus = checkResult.recordset[0].Status;
    const dbDrugName = checkResult.recordset[0].Drug;
    if (currentStatus === 'Approved' || currentStatus === 'Verified') {
      console.warn(`Cannot upload: Record status is ${currentStatus}`);
      return res.status(403).json({ error: 'Cannot upload document: Record is Approved or Verified' });
    }
    const finalDrugName = drugName || dbDrugName || 'UnknownDrug';
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
    await containerClient.createIfNotExists();
    const blobName = `${articlePMID}_${finalDrugName}.pdf`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: 'application/pdf' }
    });
    const fileUrl = blockBlobClient.url;
    console.log(`File uploaded to Azure Blob Storage: ${fileUrl}`);
    const transaction = new sql.Transaction(poolInstance);
    try {
      await transaction.begin();
      const request = transaction.request();
      const result = await request
        .input('pmid', sql.NVarChar(100), articlePMID)
        .input('drug', sql.NVarChar(100), finalDrugName)
        .input('status', sql.NVarChar(100), 'Document Uploaded')
        .input('documentUrl', sql.NVarChar(4000), fileUrl)
        .query(`
          UPDATE [dbo].[Mail_Article]
          SET Status = @status
          WHERE [Article PMID] = @pmid AND Drug = @drug;
          UPDATE [dbo].[Article]
          SET DocumentURL = @documentUrl
          WHERE [Article PMID] = @pmid;
        `);
      const totalRowsAffected = result.rowsAffected.reduce((sum, count) => sum + count, 0);
      if (totalRowsAffected === 0) {
        await transaction.rollback();
        console.error(`No rows updated for Article PMID: ${articlePMID}, Drug: ${finalDrugName}`);
        return res.status(404).json({ error: `No records updated for Article PMID: ${articlePMID} and Drug: ${finalDrugName}` });
      }
      await transaction.commit();
      await updateSingleRowInCache(req.user.userId, articlePMID, finalDrugName, { Status: 'Document Uploaded', DocumentURL: fileUrl });
      res.json({ fileUrl, status: 'Document Uploaded' });
    } catch (err) {
      await transaction.rollback();
      console.error(`Transaction failed for Article PMID ${articlePMID}:`, err);
      throw err;
    }
  } catch (err) {
    console.error('Error in /api/upload-document:', err);
    res.status(500).json({ error: 'Failed to upload document', message: err.message });
  }
});

// Literature Reviews Endpoints
app.get('/api/literature-reviews', verifyToken, restrictToRoles([1]), async (req, res) => {
  try {
    const data = await getCachedData(req.user.userId);
    console.log(`Fetched ${data.length} literature reviews from cache for role ${req.user.roleId}`);
    res.json(data);
  } catch (err) {
    console.error('Error fetching literature reviews:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.get('/api/literature-reviews/:id', verifyToken, restrictToRoles([1]), async (req, res) => {
  try {
    const data = await getCachedData(req.user.userId);
    const record = data.find(item => item['Article PMID'] === req.params.id) || {};
    console.log(`Fetched literature review ID ${req.params.id} for role ${req.user.roleId}`);
    res.json(record);
  } catch (err) {
    console.error('Error fetching literature review:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.put('/api/literature-reviews/:id', verifyToken, restrictToRoles([1]), async (req, res) => {
  try {
    const poolInstance = await initializeLoginPool();
    const lockPool = await initializePool();
    const { clientId, Drug, ...updateData } = req.body;

    if (!clientId) return res.status(400).json({ error: 'Client ID is required' });
    if (!Drug) return res.status(400).json({ error: 'Drug is required' });

    // Check lock
    const lockCheck = await lockPool.request()
      .input('recordId', sql.NVarChar, req.params.id)
      .input('clientId', sql.NVarChar, clientId)
      .query(`SELECT COUNT(*) as lockCount FROM record_locks WHERE record_id = @recordId AND client_id = @clientId`);
    if (lockCheck.recordset[0].lockCount === 0) {
      console.warn(`No lock found for Article PMID=${req.params.id}, ClientId=${clientId}`);
      return res.status(403).json({ error: 'No lock on this record' });
    }

    // Validate record exists
    const checkResult = await poolInstance.request()
      .input('id', sql.NVarChar, req.params.id)
      .input('drug', sql.NVarChar, Drug.trim())
      .query(`
        SELECT Status
        FROM [dbo].[LiteratureReviewView]
        WHERE [Article PMID] = @id AND Drug = @drug
      `);
    if (checkResult.recordset.length === 0) {
      console.warn(`No record found for Article PMID=${req.params.id}, Drug=${Drug.trim()}`);
      return res.status(404).json({ error: 'No record found for the specified Article PMID and Drug' });
    }

    const transaction = new sql.Transaction(poolInstance);
    try {
      await transaction.begin();
      let rowsAffected = 0;
      const updatesByTable = {
        Mail: [],
        Article: [],
        Mail_Article: [],
        Article_Drug: []
      };

      Object.entries(updateData).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'S.No' && key !== 'Article PMID') {
          const tables = columnToTableMap[key] || [];
          tables.forEach(table => {
            if (!updatesByTable[table]) updatesByTable[table] = [];
            updatesByTable[table].push({ key, value });
          });
        }
      });

      for (const [table, fields] of Object.entries(updatesByTable)) {
        if (fields.length === 0) continue;

        const request = transaction.request()
          .input('id', sql.NVarChar, req.params.id)
          .input('drug', sql.NVarChar, Drug.trim());

        const paramMapping = {};
        fields.forEach(({ key, value }, index) => {
          const paramName = `p${index}`;
          paramMapping[key] = paramName;
          request.input(paramName, getSqlType(value, key), value);
        });

        const updateFields = fields.map(({ key }) => `[${key}] = @${paramMapping[key]}`).join(', ');

        let query;
        if (table === 'Mail') {
          query = `
            UPDATE [dbo].[Mail]
            SET ${updateFields}
            FROM [dbo].[Mail] m
            JOIN [dbo].[Mail_Article] ma ON m.MailID = ma.MailID
            WHERE ma.[Article PMID] = @id AND ma.Drug = @drug
          `;
        } else if (table === 'Article') {
          query = `
            UPDATE [dbo].[Article]
            SET ${updateFields}
            WHERE [Article PMID] = @id
          `;
        } else if (table === 'Mail_Article') {
          query = `
            UPDATE [dbo].[Mail_Article]
            SET ${updateFields}
            WHERE [Article PMID] = @id AND Drug = @drug
          `;
        } else if (table === 'Article_Drug') {
          query = `
            UPDATE [dbo].[Article_Drug]
            SET ${updateFields}
            WHERE [Article PMID] = @id AND Drug = @drug
          `;
        }

        console.log(`Executing UPDATE query on ${table}: ${query}`);
        const result = await request.query(query);
        rowsAffected += result.rowsAffected[0];
      }

      if (rowsAffected === 0) {
        await transaction.rollback();
        console.warn(`No rows updated for Article PMID=${req.params.id}, Drug=${Drug.trim()}`);
        return res.status(404).json({ error: 'No records updated. Verify Article PMID and Drug.' });
      }

      await transaction.commit();
      await updateSingleRowInCache(req.user.userId, req.params.id, Drug.trim(), updateData);
      res.json({ success: true, message: 'Record updated', rowsAffected });
    } catch (err) {
      await transaction.rollback();
      console.error(`Error executing update for Article PMID=${req.params.id}, Drug=${Drug.trim()}:`, err);
      return res.status(500).json({ error: 'Database error during update', message: err.message });
    }
  } catch (err) {
    console.error(`Error updating literature review for Article PMID=${req.params.id}, Drug=${req.body.Drug}:`, err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Medical Reviews Endpoints
app.get('/api/medical-reviews', verifyToken, restrictToRoles([2]), async (req, res) => {
  try {
    const data = await getCachedData(req.user.userId);
    const filteredData = data.filter(item =>
      ['Approved', 'Verified'].includes(item.Status) &&
      ['AOI', 'ICSR'].includes(item['Comments (ICSR, AOI, Not selected)'])
    );
    console.log(`Fetched ${filteredData.length} medical reviews from cache for role ${req.user.roleId}`);
    res.json(filteredData);
  } catch (err) {
    console.error('Error fetching medical reviews:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.get('/api/medical-reviews/:id', verifyToken, restrictToRoles([2]), async (req, res) => {
  try {
    const data = await getCachedData(req.user.userId);
    const record = data.find(item =>
      item['Article PMID'] === req.params.id &&
      ['Approved', 'Verified'].includes(item.Status) &&
      ['AOI', 'ICSR'].includes(item['Comments (ICSR, AOI, Not selected)'])
    );
    if (!record) {
      console.warn(`Medical review not found for Article PMID=${req.params.id}`);
      return res.status(404).json({ error: 'Medical review not found' });
    }
    res.json(record);
  } catch (err) {
    console.error('Error fetching medical review:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.put('/api/medical-reviews/:id', verifyToken, restrictToRoles([2]), async (req, res) => {
  try {
    const poolInstance = await initializeLoginPool();
    const lockPool = await initializePool();
    const id = req.params.id;
    const { Drug, clientId, ...updateData } = req.body;
    const drugParam = req.query.drug;

    console.log(`PUT /api/medical-reviews/${id} called with:`, {
      ArticlePMID: id,
      BodyDrug: Drug,
      QueryDrug: drugParam,
      ClientId: clientId,
      UpdateData: updateData
    });

    if (!Drug || !drugParam || Drug.trim() !== drugParam.trim()) {
      return res.status(400).json({ error: 'Drug is required in both body and query parameter, and they must match' });
    }
    if (!clientId) {
      return res.status(400).json({ error: 'Client ID is required' });
    }

    const checkResult = await poolInstance.request()
      .input('id', sql.NVarChar, id)
      .input('drug', sql.NVarChar, Drug.trim())
      .query(`
        SELECT Status, [Comments (ICSR, AOI, Not selected)] as Comments, Drug
        FROM [dbo].[LiteratureReviewView]
        WHERE [Article PMID] = @id AND Drug = @drug
      `);

    if (checkResult.recordset.length === 0) {
      console.warn(`No record found for Article PMID=${id}, Drug=${Drug.trim()}`);
      return res.status(404).json({ error: 'No record found for the specified Article PMID and Drug' });
    }

    const { Status, Comments } = checkResult.recordset[0];
    if (!['Approved', 'Verified'].includes(Status) || !['AOI', 'ICSR'].includes(Comments)) {
      return res.status(403).json({ error: 'Record does not meet medical review criteria' });
    }

    const lockCheck = await lockPool.request()
      .input('recordId', sql.NVarChar, id)
      .input('clientId', sql.NVarChar, clientId)
      .query(`SELECT COUNT(*) as lockCount FROM record_locks WHERE record_id = @recordId AND client_id = @clientId`);
    if (lockCheck.recordset[0].lockCount === 0) {
      return res.status(403).json({ error: 'No lock on this record' });
    }

    const transaction = new sql.Transaction(poolInstance);
    try {
      await transaction.begin();
      let rowsAffected = 0;
      const updatesByTable = {
        Mail: [],
        Article: [],
        Mail_Article: [],
        Article_Drug: []
      };

      Object.entries(updateData).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'S.No' && key !== 'Article PMID') {
          const tables = columnToTableMap[key] || [];
          tables.forEach(table => {
            if (!updatesByTable[table]) updatesByTable[table] = [];
            updatesByTable[table].push({ key, value });
          });
        }
      });

      for (const [table, fields] of Object.entries(updatesByTable)) {
        if (fields.length === 0) continue;

        const request = transaction.request()
          .input('id', sql.NVarChar, id)
          .input('drug', sql.NVarChar, Drug.trim());

        const paramMapping = {};
        fields.forEach(({ key, value }, index) => {
          const paramName = `p${index}`;
          paramMapping[key] = paramName;
          request.input(paramName, getSqlType(value, key), value);
        });

        const updateFields = fields.map(({ key }) => `[${key}] = @${paramMapping[key]}`).join(', ');

        let query;
        if (table === 'Mail') {
          query = `
            UPDATE [dbo].[Mail]
            SET ${updateFields}
            FROM [dbo].[Mail] m
            JOIN [dbo].[Mail_Article] ma ON m.MailID = ma.MailID
            WHERE ma.[Article PMID] = @id AND ma.Drug = @drug
          `;
        } else if (table === 'Article') {
          query = `
            UPDATE [dbo].[Article]
            SET ${updateFields}
            WHERE [Article PMID] = @id
          `;
        } else if (table === 'Mail_Article') {
          query = `
            UPDATE [dbo].[Mail_Article]
            SET ${updateFields}
            WHERE [Article PMID] = @id AND Drug = @drug
          `;
        } else if (table === 'Article_Drug') {
          query = `
            UPDATE [dbo].[Article_Drug]
            SET ${updateFields}
            WHERE [Article PMID] = @id AND Drug = @drug
          `;
        }

        console.log(`Executing UPDATE query on ${table}: ${query}`);
        const result = await request.query(query);
        rowsAffected += result.rowsAffected[0];
      }

      if (rowsAffected === 0) {
        await transaction.rollback();
        console.warn(`No rows updated for Article PMID=${id}, Drug=${Drug.trim()}`);
        return res.status(404).json({ error: 'No records updated. Verify Article PMID and Drug.' });
      }

      await transaction.commit();
      await updateSingleRowInCache(req.user.userId, id, Drug.trim(), updateData);
      res.json({ success: true, message: 'Record updated', rowsAffected });
    } catch (err) {
      await transaction.rollback();
      console.error(`Error executing update for Article PMID=${id}, Drug=${Drug.trim()}:`, err);
      return res.status(500).json({ error: 'Database error during update', message: err.message });
    }
  } catch (err) {
    console.error(`Error updating medical review for Article PMID=${id}, Drug=${req.query.drug}:`, err);
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

// Cases Endpoints
app.get('/api/cases', verifyToken, restrictToRoles([1]), async (req, res) => {
  try {
    const data = await getCachedData(req.user.userId);
    const { showTotal, comments, year, startMonth, endMonth } = req.query;

    let filteredData = [...data]; // Start with full dataset

    if (showTotal === 'true' && comments === 'ICSR') {
      // Return total ICSR count matching exact 'ICSR'
      const totalIcsrCount = filteredData.filter(item => 
        item['Comments (ICSR, AOI, Not selected)'] === 'ICSR'
      ).length;
      console.log(`Total ICSR count requested: ${totalIcsrCount}`);
      return res.json({ totalIcsrCount });
    }

    // Apply filters if not showing total
    if (comments) {
      filteredData = filteredData.filter(item => 
        item['Comments (ICSR, AOI, Not selected)'] === comments
      );
    }
    if (year) {
      filteredData = filteredData.filter(item => 
        item.IRD && new Date(item.IRD).getFullYear() === parseInt(year)
      );
    }
    if (startMonth && endMonth) {
      filteredData = filteredData.filter(item => {
        const month = item.IRD && new Date(item.IRD).getMonth() + 1;
        return month >= parseInt(startMonth) && month <= parseInt(endMonth);
      });
    }

    console.log(`Fetched ${filteredData.length} cases from cache with filters`);
    res.json(filteredData);
  } catch (err) {
    console.error('Error fetching cases:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.put('/api/cases/:id', verifyToken, restrictToRoles([1]), async (req, res) => {
  try {
    const poolInstance = await initializeLoginPool();
    const lockPool = await initializePool();
    const id = req.params.id;
    const { Drug, clientId, ...updateData } = req.body;
    const drugParam = req.query.drug;

    console.log(`PUT /api/cases/${id} called with:`, {
      ArticlePMID: id,
      Drug,
      clientId,
      updateData,
      queryDrug: drugParam
    });

    if (!Drug || !drugParam || Drug.trim() !== drugParam.trim()) {
      return res.status(400).json({ error: 'Drug is required in both body and query parameter, and they must match' });
    }
    if (!clientId) {
      return res.status(400).json({ error: 'Client ID is required' });
    }

    const checkResult = await poolInstance.request()
      .input('id', sql.NVarChar, id)
      .input('drug', sql.NVarChar, Drug.trim())
      .query(`
        SELECT Status, [Comments (ICSR, AOI, Not selected)] as Comments, Drug
        FROM [dbo].[LiteratureReviewView]
        WHERE [Article PMID] = @id AND Drug = @drug
      `);

    if (checkResult.recordset.length === 0) {
      console.warn(`No record found for Article PMID=${id}, Drug=${Drug.trim()}`);
      return res.status(404).json({ error: 'No record found for the specified Article PMID and Drug' });
    }

    const lockCheck = await lockPool.request()
      .input('recordId', sql.NVarChar, id)
      .input('clientId', sql.NVarChar, clientId)
      .query(`SELECT COUNT(*) as lockCount FROM record_locks WHERE record_id = @recordId AND client_id = @clientId`);
    if (lockCheck.recordset[0].lockCount === 0) {
      return res.status(403).json({ error: 'No lock on this record' });
    }

    const transaction = new sql.Transaction(poolInstance);
    try {
      await transaction.begin();
      let rowsAffected = 0;
      const updatesByTable = {
        Mail: [],
        Article: [],
        Mail_Article: [],
        Article_Drug: []
      };

      Object.entries(updateData).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'S.No' && key !== 'Article PMID') {
          const tables = columnToTableMap[key] || [];
          tables.forEach(table => {
            if (!updatesByTable[table]) updatesByTable[table] = [];
            updatesByTable[table].push({ key, value });
          });
        }
      });

      for (const [table, fields] of Object.entries(updatesByTable)) {
        if (fields.length === 0) continue;

        const request = transaction.request()
          .input('id', sql.NVarChar, id)
          .input('drug', sql.NVarChar, Drug.trim());

        const paramMapping = {};
        fields.forEach(({ key, value }, index) => {
          const paramName = `p${index}`;
          paramMapping[key] = paramName;
          request.input(paramName, getSqlType(value, key), value);
        });

        const updateFields = fields.map(({ key }) => `[${key}] = @${paramMapping[key]}`).join(', ');

        let query;
        if (table === 'Mail') {
          query = `
            UPDATE [dbo].[Mail]
            SET ${updateFields}
            FROM [dbo].[Mail] m
            JOIN [dbo].[Mail_Article] ma ON m.MailID = ma.MailID
            WHERE ma.[Article PMID] = @id AND ma.Drug = @drug
          `;
        } else if (table === 'Article') {
          query = `
            UPDATE [dbo].[Article]
            SET ${updateFields}
            WHERE [Article PMID] = @id
          `;
        } else if (table === 'Mail_Article') {
          query = `
            UPDATE [dbo].[Mail_Article]
            SET ${updateFields}
            WHERE [Article PMID] = @id AND Drug = @drug
          `;
        } else if (table === 'Article_Drug') {
          query = `
            UPDATE [dbo].[Article_Drug]
            SET ${updateFields}
            WHERE [Article PMID] = @id AND Drug = @drug
          `;
        }

        console.log(`Executing UPDATE query on ${table}: ${query}`);
        const result = await request.query(query);
        rowsAffected += result.rowsAffected[0];
      }

      if (rowsAffected === 0) {
        await transaction.rollback();
        console.warn(`No rows updated for Article PMID=${id}, Drug=${Drug.trim()}`);
        return res.status(404).json({ error: 'No records updated. Verify Article PMID and Drug.' });
      }

      await transaction.commit();
      await updateSingleRowInCache(req.user.userId, id, Drug.trim(), updateData);
      res.json({ success: true, message: 'Case updated', rowsAffected });
    } catch (err) {
      await transaction.rollback();
      console.error(`Error executing update for Article PMID=${id}, Drug=${Drug.trim()}:`, err);
      return res.status(500).json({ error: 'Database error during update', message: err.message });
    }
  } catch (err) {
    console.error(`Error updating case for Article PMID=${id}, Drug=${req.query.drug}:`, err);
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});
app.get('/api/dashboard', verifyToken, restrictToRoles([1, 2]), async (req, res) => {
  try {
    const poolInstance = await initializeLoginPool(); // For [dbo].[LiteratureReviewView]
    const mailPoolInstance = await initializeLoginPool(); // For [dbo].[Mail]
    // Fetch all dashboard data from LiteratureReviewView
    const dataResult = await poolInstance.request().query('SELECT * FROM [dbo].[LiteratureReviewView]');
    // Fetch total email count from Mail table
    const emailCountResult = await mailPoolInstance.request().query('SELECT COUNT(*) AS emailCount FROM (SELECT DISTINCT IRD, Mail FROM [dbo].[LiteratureReviewView]) AS distinct_pairs;SELECT DISTINCT IRD, Mail FROM [dbo].[LiteratureReviewView]');
    const emailCount = emailCountResult.recordset[0].emailCount;
    console.log(`Fetched ${dataResult.recordset.length} dashboard records and ${emailCount} total emails for role ${req.user.roleId}`);
    // Update cache with LiteratureReviewView data
    userDataCache.set(req.user.userId, {
      data: dataResult.recordset,
      timestamp: new Date(),
      expiryMs: CACHE_EXPIRY_MS
    });
    res.json({
      data: dataResult.recordset,
      emailCount: emailCount
    });
    console.log('Cached ICSR records:', dataResult.recordset.filter(item => item['Comments (ICSR, AOI, Not selected)'] === 'ICSR').length);

  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});
app.get('/api/drugs', verifyToken, restrictToRoles([1, 2]), async (req, res) => {
  try {
    const poolInstance = await initializeLoginPool();
    const query = `
      SELECT [Drug], [Comments (ICSR, AOI, Not selected)] AS category
      FROM [dbo].[LiteratureReviewView]
    `;
    console.log('Executing query:', query); // Debug log
    const result = await poolInstance.request().query(query);
    console.log('Query result recordset:', result.recordset); // Debug log

    if (!result.recordset || result.recordset.length === 0) {
      console.warn('No data found in LiteratureReviewView');
      return res.status(404).json({ error: 'No data found in LiteratureReviewView' });
    }

    const drugsData = result.recordset.map(row => ({
      drug: row.Drug,
      category: row.category
    }));

    console.log('Processed drugsData:', drugsData); // Debug log
    res.json(drugsData);
  } catch (err) {
    console.error('Error fetching drugs data:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.get('/api/icsr-monthly-counts', verifyToken, restrictToRoles([1, 2]), async (req, res) => {
  try {
    const poolInstance = await initializeLoginPool();
    const query = `
      SELECT 
        YEAR(CAST(IRD AS DATE)) AS year,
        MONTH(CAST(IRD AS DATE)) AS month,
        COUNT(*) AS count
      FROM [dbo].[LiteratureReviewView]
      WHERE [Comments (ICSR, AOI, Not selected)] LIKE '%ICSR%'
      GROUP BY YEAR(CAST(IRD AS DATE)), MONTH(CAST(IRD AS DATE))
      ORDER BY year, month
    `;
    console.log('Executing query for ICSR monthly counts:', query);
    const result = await poolInstance.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      console.warn('No ICSR data found in LiteratureReviewView');
      return res.status(404).json({ error: 'No ICSR data found' });
    }

    const icsrData = result.recordset.map(row => {
      const irdDate = new Date(row.year, row.month - 1, 1);
      console.log(`Row data - Year: ${row.year}, Month: ${row.month}, Count: ${row.count}, IRD: ${irdDate.toISOString().split('T')[0]}`);
      return {
        ird: irdDate.toISOString().split('T')[0], // 'YYYY-MM-DD' format
        year: row.year,
        month: row.month,
        count: row.count
      };
    });

    console.log('Processed ICSR monthly counts:', icsrData);
    res.json({ data: icsrData });
  } catch (err) {
    console.error('Error fetching ICSR monthly counts:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});


app.get('/api/approved-count', verifyToken, restrictToRoles([1, 2]), async (req, res) => {
  try {
    const poolInstance = await initializeLoginPool();
    const query = `
      SELECT COUNT(*) as approvedCount
      FROM [dbo].[LiteratureReviewView]
      WHERE status = 'Approved'
    `;
    console.log('Executing query:', query);
    const result = await poolInstance.request().query(query);
    console.log('Raw result:', result.recordset); // Already added
    const approvedCount = result.recordset[0].approvedCount;
    console.log('Approved count:', approvedCount);
    res.json({ approvedCount });
  } catch (err) {
    console.error('Error in /api/approved-count:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.get('/api/drug-count', async (req, res) => {
  try {
    const poolInstance = await initializeLoginPool();
    const query = `
      SELECT COUNT(DISTINCT Drug) AS DistinctDrugCount
      FROM [dbo].[LiteratureReviewView];
    `;
    console.log('Executing /api/drug-count query:', query);
    const result = await poolInstance.request().query(query);
    console.log('Raw result from /api/drug-count:', result.recordset);
    if (!result.recordset || result.recordset.length === 0) {
      console.warn('No records found in /api/drug-count');
      return res.json({ drugCount: 0 });
    }
    const drugCount = result.recordset[0].DistinctDrugCount;
    console.log('Returning drugCount:', drugCount);
    res.json({ drugCount });
  } catch (err) {
    console.error('Error in /api/drug-count:', err.message, 'Stack:', err.stack);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Lock Endpoints
app.get('/api/locks', verifyToken, async (req, res) => {
  try {
    const poolInstance = await initializePool();
    const tableCheck = await poolInstance.request().query(`SELECT OBJECT_ID('record_locks') as tableExists`);
    if (!tableCheck.recordset[0].tableExists) {
      console.log('No locks table exists');
      return res.json([]);
    }
    const result = await poolInstance.request().query('SELECT * FROM record_locks');
    console.log(`Fetched ${result.recordset.length} active locks`);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching locks:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.get('/api/locks-test', verifyToken, async (req, res) => {
  try {
    const poolInstance = await initializePool();
    const tableCheck = await poolInstance.request().query(`SELECT OBJECT_ID('record_locks') as tableExists`);
    if (!tableCheck.recordset[0].tableExists) return res.json([]);
    const result = await poolInstance.request().query('SELECT * FROM record_locks');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error testing locks:', err);
    res.json([]);
  }
});

app.post('/api/locks/acquire', verifyToken, async (req, res) => {
  try {
    const { recordId, clientId } = req.body;
    if (!recordId || !clientId) {
      return res.status(400).json({ success: false, message: 'Record ID and Client ID required' });
    }
    const poolInstance = await initializePool();
    const checkResult = await poolInstance.request()
      .input('recordId', sql.NVarChar, recordId)
      .input('clientId', sql.NVarChar, clientId)
      .query(`SELECT client_id FROM record_locks WHERE record_id = @recordId AND client_id != @clientId`);
    if (checkResult.recordset.length > 0) {
      return res.status(409).json({ success: false, message: 'Record locked by another user' });
    }
    await poolInstance.request()
      .input('recordId', sql.NVarChar, recordId)
      .input('clientId', sql.NVarChar, clientId)
      .input('timestamp', sql.DateTime, new Date())
      .query(`
        MERGE record_locks AS target
        USING (SELECT @recordId as record_id, @clientId as client_id) AS source
        ON target.record_id = source.record_id
        WHEN MATCHED THEN
          UPDATE SET client_id = @clientId, timestamp = @timestamp
        WHEN NOT MATCHED THEN
          INSERT (record_id, client_id, timestamp)
          VALUES (@recordId, @clientId, @timestamp);
      `);
    res.json({ success: true, message: 'Lock acquired' });
  } catch (err) {
    console.error('Error acquiring lock:', err);
    res.status(500).json({ success: false, message: 'Failed to acquire lock' });
  }
});

app.post('/api/locks/release', verifyToken, async (req, res) => {
  try {
    const { recordId, clientId } = req.body;
    if (!recordId || !clientId) {
      return res.status(400).json({ success: false, message: 'Record ID and Client ID required' });
    }
    const poolInstance = await initializePool();
    const result = await poolInstance.request()
      .input('recordId', sql.NVarChar, recordId)
      .input('clientId', sql.NVarChar, clientId)
      .query(`DELETE FROM record_locks WHERE record_id = @recordId AND client_id = @clientId`);
    res.json({ success: true, message: 'Lock released' });
  } catch (err) {
    console.error('Error releasing lock:', err);
    res.status(500).json({ success: false, message: 'Failed to release lock' });
  }
});

app.post('/api/locks/release-all', verifyToken, async (req, res) => {
  try {
    const { clientId } = req.body;
    if (!clientId) {
      return res.status(400).json({ success: false, message: 'Client ID required' });
    }
    const poolInstance = await initializePool();
    const result = await poolInstance.request()
      .input('clientId', sql.NVarChar, clientId)
      .query('DELETE FROM record_locks WHERE client_id = @clientId');
    res.json({ success: true, message: 'All locks released', count: result.rowsAffected[0] });
  } catch (err) {
    console.error('Error releasing all locks:', err);
    res.status(500).json({ success: false, message: 'Failed to release locks' });
  }
});

// Test Endpoint
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API working' });
});

// Debug User Endpoint
app.get('/api/test-user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const poolInstance = await initializeLoginPool();
    const result = await poolInstance.request()
      .input('username', sql.NVarChar, username)
      .query(`
        SELECT u.UserID, u.Username, u.Password, u.RoleID, r.Role
        FROM [dbo].[User] u
        LEFT JOIN [dbo].[Role] r ON u.RoleID = r.RoleID
        WHERE u.Username = @username
      `);
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Test user error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../deepforrest-literature-assistant/build')));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../deepforrest-literature-assistant/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
