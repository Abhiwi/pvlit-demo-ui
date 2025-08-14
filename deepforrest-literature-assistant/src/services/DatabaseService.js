// // import axios from 'axios';
// // import { BlobServiceClient } from '@azure/storage-blob';

// // const API_BASE_URL = process.env.NODE_ENV === 'production'
// //   ? '/api'
// //   : process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// // // Azure Storage configuration
// // const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'storageattach1';
// // const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY || 'qwertyuiop';
// // const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || 'manual-pdfs';
// // const AZURE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;

// // class DatabaseService {
// //   // Azure Blob Storage client
// //   async getBlobClient() {
// //     try {
// //       const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
// //       const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
      
// //       // Ensure the container exists
// //       await containerClient.createIfNotExists();
// //       return containerClient;
// //     } catch (error) {
// //       console.error('Error initializing Azure Blob Storage client:', error);
// //       throw new Error('Failed to initialize storage client');
// //     }
// //   }

// //   async uploadDocument(file, articlePMID) {
// //     try {
// //       if (!file || !articlePMID) {
// //         throw new Error('File and Article PMID are required');
// //       }
// //       const containerClient = await this.getBlobClient();
// //       const blobName = `${articlePMID}.pdf`;
// //       const blockBlobClient = containerClient.getBlockBlobClient(blobName);
// //       const arrayBuffer = await file.arrayBuffer();
// //       const buffer = Buffer.from(arrayBuffer);
// //       await blockBlobClient.uploadData(buffer, {
// //         blobHTTPHeaders: { blobContentType: file.type }
// //       });
// //       const fileUrl = blockBlobClient.url;
// //       console.log(`File uploaded successfully to Azure Blob Storage: ${fileUrl}`);
// //       return fileUrl;
// //     } catch (error) {
// //       console.error('Error uploading document to Azure Blob Storage:', error);
// //       throw new Error(`Failed to upload document: ${error.message}`);
// //     }
// //   }

// //   async fetchLiteratureReviews() {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/literature-reviews`);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching literature review data:', error);
// //       throw error;
// //     }
// //   }

// //   async getLiteratureReviewById(id) {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/literature-reviews/${id}`);
// //       return response.data;
// //     } catch (error) {
// //       console.error(`Error fetching literature review with ID ${id}:`, error);
// //       throw error;
// //     }
// //   }
// //   async updateLiteratureReview(recordId, updatedRecord, params = {}) {
// //     try {
// //       console.log('Updating literature review with:', {
// //         recordId,
// //         updatedRecord,
// //         params
// //       });
// //       const response = await axios.put(`/api/literature-reviews/${recordId}`, updatedRecord, { params });
// //       return response.data;
// //     } catch (error) {
// //       console.error(`Error updating literature review with ID ${recordId}:`, error);
// //       if (error.response) {
// //         console.error('Error response:', error.response.data);
// //         console.error('Error status:', error.response.status);
// //         console.error('Error headers:', error.response.headers);
// //       } else if (error.request) {
// //         console.error('No response received:', error.request);
// //       } else {
// //         console.error('Error setting up request:', error.message);
// //       }
// //       throw new Error(`Failed to update literature review: ${error.message}`);
// //     }}

// //   async updateRecordStatus(id, status) {
// //     try {
// //       console.log(`Updating status for ID ${id} to: ${status}`);
// //       const statusData = { Status: status };
// //       const response = await axios.put(`${API_BASE_URL}/literature-reviews/${id}`, statusData);
// //       console.log(`Status update response for ID ${id}:`, response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error(`Error updating status for record with ID ${id}:`, error);
// //       if (error.response) {
// //         console.error('Error response:', error.response.data);
// //         console.error('Error status:', error.response.status);
// //       }
// //       throw error;
// //     }
// //   }

// //   // Medical Review methods
// //   async fetchMedicalReviews() {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/medical-reviews`);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching medical review data:', error);
// //       throw error;
// //     }
// //   }

// //   async fetchApprovedMedicalReviews() {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/medical-reviews`, {
// //         params: {
// //           status: 'Approved',
// //           commentTypes: 'ICSR,AOI'
// //         }
// //       });
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching approved medical reviews:', error);
// //       throw error;
// //     }
// //   }

// //   async getMedicalReviewById(id) {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/medical-reviews/${id}`);
// //       return response.data;
// //     } catch (error) {
// //       console.error(`Error fetching medical review with ID ${id}:`, error);
// //       throw error;
// //     }
// //   }

// //   // CASES METHODS
// //   async fetchCases() {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/literature-reviews`);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching cases data:', error);
// //       throw error;
// //     }
// //   }

// //   async updateCase(id, drug, data) {
// //     try {
// //       console.log(`Sending case update for Article PMID ${id} and Drug ${drug}:`, data);
// //       const cleanData = JSON.parse(JSON.stringify(data));
// //       const recordId = id || cleanData['Article PMID'] || cleanData.id;

// //       // Ensure Drug is included and not overwritten
// //       cleanData['Drug'] = drug || cleanData['Drug'];

// //       // Convert empty strings to null for database compatibility
// //       Object.keys(cleanData).forEach(key => {
// //         if (cleanData[key] === "") {
// //           cleanData[key] = null;
// //         }
// //       });

// //       if (!recordId || !cleanData['Drug']) {
// //         throw new Error('Article PMID and Drug are required for update');
// //       }

// //       console.log(`Clean case data for Article PMID ${recordId} and Drug ${cleanData['Drug']}:`, cleanData);

// //       // Send update request with Drug as a query parameter to ensure backend uses it as an identifier
// //       const response = await axios.put(
// //         `${API_BASE_URL}/literature-reviews/${recordId}`,
// //         cleanData,
// //         {
// //           params: { drug: cleanData['Drug'] }
// //         }
// //       );

// //       console.log(`Case update response for Article PMID ${recordId}:`, response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error(`Error updating case with Article PMID ${id} and Drug ${drug}:`, error);
// //       if (error.response) {
// //         console.error('Error response:', error.response.data);
// //         console.error('Error status:', error.response.status);
// //       }
// //       throw error;
// //     }
// //   }

// //   async updateCaseStatus(id, drug, status) {
// //     try {
// //       console.log(`Updating case status for Article PMID ${id} and Drug ${drug} to: ${status}`);
// //       const statusData = { Status: status, Drug: drug }; // Include Drug to ensure backend uses it
// //       const response = await axios.put(
// //         `${API_BASE_URL}/literature-reviews/${id}`,
// //         statusData,
// //         {
// //           params: { drug }
// //         }
// //       );
// //       console.log(`Case status update response for Article PMID ${id}:`, response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error(`Error updating status for case with Article PMID ${id} and Drug ${drug}:`, error);
// //       if (error.response) {
// //         console.error('Error response:', error.response.data);
// //         console.error('Error status:', error.response.status);
// //       }
// //       throw error;
// //     }
// //   }

// //   // Lock-related methods
// //   async getAllActiveLocks() {
// //     try {
// //       const url = `${API_BASE_URL}/locks`;
// //       console.log(`Making request to: ${url}`);
// //       const response = await fetch(url);
// //       if (!response.ok) {
// //         throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
// //       }
// //       return await response.json();
// //     } catch (error) {
// //       console.error("Error getting active locks:", error);
// //       return [];
// //     }
// //   }

// //   async acquireLock(recordId, clientId) {
// //     try {
// //       console.log(`Attempting to acquire lock for record ${recordId} by client ${clientId}`);
// //       const url = `${API_BASE_URL}/locks/acquire`;
// //       console.log(`Making request to: ${url}`);
// //       const response = await fetch(url, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ recordId, clientId, timestamp: new Date().toISOString() })
// //       });
// //       if (!response.ok) {
// //         throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
// //       }
// //       return await response.json();
// //     } catch (error) {
// //       console.error("Error acquiring lock:", error);
// //       throw error;
// //     }
// //   }

// //   async releaseLock(recordId, clientId) {
// //     try {
// //       const url = `${API_BASE_URL}/locks/release`;
// //       console.log(`Making request to: ${url}`);
// //       const response = await fetch(url, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ recordId, clientId })
// //       });
// //       return await response.json();
// //     } catch (error) {
// //       console.error("Error releasing lock:", error);
// //       throw error;
// //     }
// //   }

// //   async releaseAllLocksByClient(clientId) {
// //     try {
// //       const url = `${API_BASE_URL}/locks/release-all`;
// //       console.log(`Making request to: ${url}`);
// //       const response = await fetch(url, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ clientId })
// //       });
// //       return await response.json();
// //     } catch (error) {
// //       console.error("Error releasing all locks:", error);
// //       throw error;
// //     }
// //   }
// // }

// // const databaseService = new DatabaseService();
// // export default databaseService;
// import axios from 'axios';
// import { BlobServiceClient } from '@azure/storage-blob';

// const API_BASE_URL = process.env.NODE_ENV === 'production'
//   ? '/api'
//   : process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// // Azure Storage configuration
// const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'storageattach1';
// const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY || 'qwertyuiop';
// const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || 'manual-pdfs';
// const AZURE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;

// class DatabaseService {
//   constructor() {
//     this.api = axios.create({
//       baseURL: API_BASE_URL,
//       withCredentials: true, // Ensure cookies are sent for JWT
//     });
//   }

//   // Azure Blob Storage client
//   async getBlobClient() {
//     try {
//       const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
//       const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
//       await containerClient.createIfNotExists();
//       return containerClient;
//     } catch (error) {
//       console.error('Error initializing Azure Blob Storage client:', error);
//       throw new Error('Failed to initialize storage client');
//     }
//   }

//   async uploadDocument(file, articlePMID) {
//     try {
//       if (!file || !articlePMID) {
//         throw new Error('File and Article PMID are required');
//       }
//       const containerClient = await this.getBlobClient();
//       const blobName = `${articlePMID}.pdf`;
//       const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       await blockBlobClient.uploadData(buffer, {
//         blobHTTPHeaders: { blobContentType: file.type }
//       });
//       const fileUrl = blockBlobClient.url;
//       console.log(`File uploaded successfully to Azure Blob Storage: ${fileUrl}`);
//       return fileUrl;
//     } catch (error) {
//       console.error('Error uploading document to Azure Blob Storage:', error);
//       throw new Error(`Failed to upload document: ${error.message}`);
//     }
//   }

//   // New method for dashboard data
//   async fetchDashboardData() {
//     try {
//       const response = await this.api.get('/dashboard');
//       console.log('Dashboard data fetched:', response.data); // Debug: Log response
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error.response?.data || error.message);
//       throw error;
//     }
//   }

//   async fetchLiteratureReviews() {
//     try {
//       const response = await this.api.get('/literature-reviews');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching literature review data:', error);
//       throw error;
//     }
//   }

//   async getLiteratureReviewById(id) {
//     try {
//       const response = await this.api.get(`/literature-reviews/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching literature review with ID ${id}:`, error);
//       throw error;
//     }
//   }

//   async updateLiteratureReview(recordId, updatedRecord, params = {}) {
//     try {
//       console.log('Updating literature review with:', { recordId, updatedRecord, params });
//       const response = await this.api.put(`/literature-reviews/${recordId}`, updatedRecord, { params });
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating literature review with ID ${recordId}:`, error);
//       throw error;
//     }
//   }

//   async updateRecordStatus(id, status) {
//     try {
//       console.log(`Updating status for ID ${id} to: ${status}`);
//       const statusData = { Status: status };
//       const response = await this.api.put(`/literature-reviews/${id}`, statusData);
//       console.log(`Status update response for ID ${id}:`, response.data);
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating status for record with ID ${id}:`, error);
//       throw error;
//     }
//   }

//   // Medical Review methods
//   async fetchMedicalReviews() {
//     try {
//       const response = await this.api.get('/medical-reviews');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching medical review data:', error);
//       throw error;
//     }
//   }

//   async fetchApprovedMedicalReviews() {
//     try {
//       const response = await this.api.get('/medical-reviews', {
//         params: { status: 'Approved', commentTypes: 'ICSR,AOI' }
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching approved medical reviews:', error);
//       throw error;
//     }
//   }

//   async getMedicalReviewById(id) {
//     try {
//       const response = await this.api.get(`/medical-reviews/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching medical review with ID ${id}:`, error);
//       throw error;
//     }
//   }

//   // CASES METHODS
//   async fetchCases() {
//     try {
//       const response = await this.api.get('/literature-reviews');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching cases data:', error);
//       throw error;
//     }
//   }

//   async updateCase(id, drug, data) {
//     try {
//       console.log(`Sending case update for Article PMID ${id} and Drug ${drug}:`, data);
//       const cleanData = JSON.parse(JSON.stringify(data));
//       const recordId = id || cleanData['Article PMID'] || cleanData.id;
//       cleanData['Drug'] = drug || cleanData['Drug'];
//       Object.keys(cleanData).forEach(key => {
//         if (cleanData[key] === "") cleanData[key] = null;
//       });
//       if (!recordId || !cleanData['Drug']) {
//         throw new Error('Article PMID and Drug are required for update');
//       }
//       console.log(`Clean case data for Article PMID ${recordId} and Drug ${cleanData['Drug']}:`, cleanData);
//       const response = await this.api.put(`/literature-reviews/${recordId}`, cleanData, { params: { drug: cleanData['Drug'] } });
//       console.log(`Case update response for Article PMID ${recordId}:`, response.data);
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating case with Article PMID ${id} and Drug ${drug}:`, error);
//       throw error;
//     }
//   }

//   async updateCaseStatus(id, drug, status) {
//     try {
//       console.log(`Updating case status for Article PMID ${id} and Drug ${drug} to: ${status}`);
//       const statusData = { Status: status, Drug: drug };
//       const response = await this.api.put(`/literature-reviews/${id}`, statusData, { params: { drug } });
//       console.log(`Case status update response for Article PMID ${id}:`, response.data);
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating status for case with Article PMID ${id} and Drug ${drug}:`, error);
//       throw error;
//     }
//   }

//   // Lock-related methods
//   async getAllActiveLocks() {
//     try {
//       const url = `${API_BASE_URL}/locks`;
//       console.log(`Making request to: ${url}`);
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//       return await response.json();
//     } catch (error) {
//       console.error("Error getting active locks:", error);
//       return [];
//     }
//   }

//   async acquireLock(recordId, clientId) {
//     try {
//       console.log(`Attempting to acquire lock for record ${recordId} by client ${clientId}`);
//       const response = await fetch(`${API_BASE_URL}/locks/acquire`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ recordId, clientId, timestamp: new Date().toISOString() })
//       });
//       if (!response.ok) throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//       return await response.json();
//     } catch (error) {
//       console.error("Error acquiring lock:", error);
//       throw error;
//     }
//   }

//   async releaseLock(recordId, clientId) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/locks/release`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ recordId, clientId })
//       });
//       return await response.json();
//     } catch (error) {
//       console.error("Error releasing lock:", error);
//       throw error;
//     }
//   }

//   async releaseAllLocksByClient(clientId) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/locks/release-all`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ clientId })
//       });
//       return await response.json();
//     } catch (error) {
//       console.error("Error releasing all locks:", error);
//       throw error;
//     }
//   }
// }

// const databaseService = new DatabaseService();
// export default databaseService;
import axios from 'axios';
import { BlobServiceClient } from '@azure/storage-blob';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Azure Storage configuration
const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'storageattach1';
const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY || 'CzfafEbGF7YzQoqShY7N3dUpw13kC2CRvNcvjasem5H6YNpi4sKI6qZFcIeVpFFDTYiFTiQ1B0jE+AStykwq/w==';
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || 'manual-pdfs';
const AZURE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;

class DatabaseService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
    });
  }

  async getBlobClient() {
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
      const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
      await containerClient.createIfNotExists();
      return containerClient;
    } catch (error) {
      console.error('Error initializing Azure Blob Storage client:', error);
      throw new Error('Failed to initialize storage client');
    }
  }

  async uploadDocument(file, articlePMID) {
    try {
      if (!file || !articlePMID) {
        throw new Error('File and Article PMID are required');
      }
      const containerClient = await this.getBlobClient();
      const blobName = `${articlePMID}.pdf`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: file.type }
      });
      const fileUrl = blockBlobClient.url;
      console.log(`File uploaded successfully to Azure Blob Storage: ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      console.error('Error uploading document to Azure Blob Storage:', error);
      throw new Error(`Failed to upload document: ${error.message}`);
    }
  }
async uploadDocumentToBackend(file, articlePMID) {
  try {
    if (!file || !articlePMID) {
      throw new Error('File and Article PMID are required');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('articlePMID', articlePMID);

    console.log(`Uploading document to backend for Article PMID=${articlePMID}`);
    const response = await this.api.post('/upload-document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const fileUrl = response.data.fileUrl;
    console.log(`Document uploaded successfully to backend: ${fileUrl}`);
    return fileUrl;
  } catch (error) {
    console.error(`Error uploading document to backend for Article PMID=${articlePMID}:`, error);
    throw new Error(`Failed to upload document: ${error.response?.data?.error || error.message}`);
  }
}
  async fetchDashboardData() {
    try {
      const response = await this.api.get('/dashboard');
      console.log('Dashboard data fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error.response?.data || error.message);
      throw error;
    }
  }

  async fetchLiteratureReviews() {
    try {
      const response = await this.api.get('/literature-reviews');
      return response.data;
    } catch (error) {
      console.error('Error fetching literature review data:', error);
      throw error;
    }
  }

  async getLiteratureReviewById(id) {
    try {
      const response = await this.api.get(`/literature-reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching literature review with ID ${id}:`, error);
      throw error;
    }
  }

  async updateLiteratureReview(recordId, updatedRecord, params = {}) {
    try {
      console.log('Updating literature review with:', { recordId, updatedRecord, params });
      const response = await this.api.put(`/literature-reviews/${recordId}`, updatedRecord, { params });
      return response.data;
    } catch (error) {
      console.error(`Error updating literature review with ID ${recordId}:`, error);
      throw error;
    }
  }

  async fetchMedicalReviews() {
    try {
      const response = await this.api.get('/medical-reviews');
      return response.data;
    } catch (error) {
      console.error('Error fetching medical review data:', error);
      throw error;
    }
  }

  async getMedicalReviewById(id) {
    try {
      const response = await this.api.get(`/medical-reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medical review with ID ${id}:`, error);
      throw error;
    }
  }

async updateMedicalReview(recordId, updatedRecord, params = {}) {
  try {
    console.log('Preparing medical review update for:', { recordId, updatedRecord, params });
    const cleanData = JSON.parse(JSON.stringify(updatedRecord));
    cleanData['Article PMID'] = recordId || cleanData['Article PMID'];
    cleanData['Drug'] = params.drug || cleanData['Drug'];
    cleanData['clientId'] = cleanData['clientId'] || params.clientId;

    if (!cleanData['Article PMID'] || !cleanData['Drug'] || !cleanData['clientId']) {
      console.error(`Missing required fields: Article PMID=${cleanData['Article PMID']}, Drug=${cleanData['Drug']}, clientId=${cleanData['clientId']}`);
      throw new Error('Article PMID, Drug, and Client ID are required for update');
    }

    Object.keys(cleanData).forEach((key) => {
      if (cleanData[key] === '') cleanData[key] = null;
    });

    console.log(`Sending medical review update to API: Article PMID=${cleanData['Article PMID']}, Drug=${cleanData['Drug']}, Data=`, cleanData);

    const response = await this.api.put(
      `/medical-reviews/${cleanData['Article PMID']}`,
      cleanData,
      { params: { drug: cleanData['Drug'] } }
    );

    console.log(`Medical review update response for Article PMID=${cleanData['Article PMID']}:`, response.data);
    if (response.data.rowsAffected >= 1) {
      console.log(`Successfully updated ${response.data.rowsAffected} row(s) for Article PMID=${cleanData['Article PMID']}, Drug=${cleanData['Drug']}`);
    } else {
      console.error(`No rows updated for Article PMID=${cleanData['Article PMID']}, Drug=${cleanData['Drug']}`);
      throw new Error('No records updated');
    }
    return response.data;
  } catch (error) {
    console.error(`Error updating medical review with Article PMID=${recordId}:`, {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(`Failed to update medical review: ${error.response?.data?.error || error.message}`);
  }
}
  async updateRecordStatus(id, status) {
    try {
      console.log(`Updating status for ID ${id} to: ${status}`);
      const statusData = { Status: status };
      const response = await this.api.put(`/medical-reviews/${id}`, statusData);
      console.log(`Status update response for ID ${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating status for record with ID ${id}:`, error);
      throw error;
    }
  }

  async fetchCases() {
    try {
      const response = await this.api.get('/cases');
      return response.data;
    } catch (error) {
      console.error('Error fetching cases data:', error);
      throw error;
    }
  }

async updateCase(id, drug, data, clientId = null) {
  try {
    console.log(`Preparing case update for Article PMID=${id}, Drug=${drug}`);
    const cleanData = JSON.parse(JSON.stringify(data));
    const recordId = id || cleanData['Article PMID'] || cleanData.id;
    cleanData['Drug'] = drug || cleanData['Drug'];
    cleanData['clientId'] = cleanData['clientId'] || clientId;

    if (!recordId || !cleanData['Drug'] || !cleanData['clientId']) {
      console.error(`Missing required fields: recordId=${recordId}, Drug=${cleanData['Drug']}, clientId=${cleanData['clientId']}`);
      throw new Error('Article PMID, Drug, and Client ID are required for update');
    }

    Object.keys(cleanData).forEach((key) => {
      if (cleanData[key] === '') cleanData[key] = null;
    });

    console.log(`Sending case update to API: Article PMID=${recordId}, Drug=${cleanData['Drug']}, Data=`, cleanData);

    const response = await this.api.put(
      `/cases/${recordId}`,
      cleanData,
      { params: { drug: cleanData['Drug'] } }
    );

    console.log(`Case update response for Article PMID=${recordId}:`, response.data);
    if (response.data.rowsAffected >= 1) {
      console.log(`Successfully updated ${response.data.rowsAffected} row(s) for Article PMID=${recordId}, Drug=${drug}`);
    } else {
      console.error(`No rows updated for Article PMID=${recordId}, Drug=${drug}`);
      throw new Error('No records updated');
    }
    return response.data;
  } catch (error) {
    console.error(`Error updating case with Article PMID=${id}, Drug=${drug}:`, {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(`Failed to update case: ${error.response?.data?.error || error.message}`);
  }
}

async updateCaseStatus(id, drug, status, clientId = null) {
  try {
    console.log(`Updating case status for Article PMID ${id} and Drug ${drug} to: ${status}, clientId: ${clientId}`);
    const statusData = { Status: status, Drug: drug };
    if (clientId) {
      statusData.clientId = clientId;
    }
    const response = await this.api.put(`/cases/${id}`, statusData, { params: { drug } });
    console.log(`Case status update response for Article PMID ${id}:`, response.data);
    if (response.data.rowsAffected >= 1) {
      console.log(`Successfully updated status for ${response.data.rowsAffected} row(s) for Article PMID=${id}, Drug=${drug}`);
    } else {
      console.error(`No rows updated for status update for Article PMID=${id}, Drug=${drug}`);
      throw new Error('No records updated');
    }
    return response.data;
  } catch (error) {
    console.error(`Error updating status for case with Article PMID ${id} and Drug ${drug}:`, {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      request: error.request,
    });
    throw new Error(`Failed to update status: ${error.response?.data?.error || error.message}`);
  }
}
  async getAllActiveLocks() {
    try {
      const url = `${API_BASE_URL}/locks`;
      console.log(`Making request to: ${url}`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error getting active locks:", error);
      return [];
    }
  }
  async fetchApprovedCount(year, startMonth, endMonth) {
  const url = `/api/approved-count?year=${year}&startMonth=${startMonth}&endMonth=${endMonth}`;
  console.log('Fetching from:', url); // Add this line
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) {
    const errorText = await response.text(); // Log error details
    console.error('Fetch failed with status:', response.status, errorText);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
  async acquireLock(recordId, clientId) {
    try {
      console.log(`Attempting to acquire lock for record ${recordId} by client ${clientId}`);
      const response = await fetch(`${API_BASE_URL}/locks/acquire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId, clientId, timestamp: new Date().toISOString() })
      });
      if (!response.ok) throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error acquiring lock:", error);
      throw error;
    }
  }

  async releaseLock(recordId, clientId) {
    try {
      const response = await fetch(`${API_BASE_URL}/locks/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId, clientId })
      });
      return await response.json();
    } catch (error) {
      console.error("Error releasing lock:", error);
      throw error;
    }
  }

  async releaseAllLocksByClient(clientId) {
    try {
      const response = await fetch(`${API_BASE_URL}/locks/release-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId })
      });
      return await response.json();
    } catch (error) {
      console.error("Error releasing all locks:", error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;