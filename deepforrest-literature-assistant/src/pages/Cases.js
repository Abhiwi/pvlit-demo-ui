import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Edit, Save, X, CheckCircle, Clock, Lock, Filter, Calendar, RefreshCw, Users, MessageSquare } from 'lucide-react';
import DatabaseService from '../services/DatabaseService';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const CasesContent = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [clientId, setClientId] = useState('');
  const [isFromLiteratureReview, setIsFromLiteratureReview] = useState(
    location.state?.fromLiteratureReview || false
  );
  const [patientTypeFilter, setPatientTypeFilter] = useState(searchParams.get('patientType') || '');
  const [commentsFilter, setCommentsFilter] = useState(searchParams.get('comments') || '');
  const [medicalReviewerStatusFilter, setMedicalReviewerStatusFilter] = useState(
    searchParams.get('medicalReviewerStatus') ? searchParams.get('medicalReviewerStatus').split(',') : []
  );
  const [startMonth, setStartMonth] = useState(searchParams.get('startMonth') ? parseInt(searchParams.get('startMonth')) : '');
  const [endMonth, setEndMonth] = useState(searchParams.get('endMonth') ? parseInt(searchParams.get('endMonth')) : '');
  const [year, setYear] = useState(searchParams.get('year') ? parseInt(searchParams.get('year')) : '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || location.state?.searchTerm || '');
  const [validationDate, setValidationDate] = useState(searchParams.get('validationDate') || '');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showMedicalReviewerFilter, setShowMedicalReviewerFilter] = useState(false);
  const [availableMedicalReviewerStatuses, setAvailableMedicalReviewerStatuses] = useState([]);

  const [casesData, setCasesData] = useState([]);
  const [editedCasesData, setEditedCasesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Added state for itemsPerPage
  const [editMode, setEditMode] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [expandedCell, setExpandedCell] = useState(null);
  const [modifiedRows, setModifiedRows] = useState({});
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [lockedRecords, setLockedRecords] = useState({});
  const [refreshLocksInterval, setRefreshLocksInterval] = useState(null);
  const [dateRange, setDateRange] = useState(() => {
  const startDateFromParams = searchParams.get('startDate');
  const endDateFromParams = searchParams.get('endDate');
  if (isFromLiteratureReview || (!startDateFromParams && !endDateFromParams)) {
    return { startDate: '', endDate: '' };
  } else if (startDateFromParams && endDateFromParams) {
    return { startDate: startDateFromParams, endDate: endDateFromParams };
  } else {
    return { startDate: '', endDate: '' };
  }
});
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [formData, setFormData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function getLastSevenDaysStart() {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    return sevenDaysAgo.toISOString().split('T')[0];
  }

  function parseDate(dateString) {
    if (!dateString) return null;

    if (typeof dateString === 'string') {
      const monthNameRegex = /^([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})/;
      let matches = dateString.match(monthNameRegex);

      if (matches) {
        const monthName = matches[1];
        const day = parseInt(matches[2], 10);
        const year = parseInt(matches[3], 10);

        const monthMap = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };

        if (monthMap[monthName] !== undefined) {
          const month = monthMap[monthName];
          const date = new Date(year, month, day);
          if (!isNaN(date.getTime())) {
            return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          }
        }
      }

      const ymdRegex = /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/;
      matches = dateString.match(ymdRegex);

      if (matches) {
        const year = parseInt(matches[1], 10);
        const month = parseInt(matches[2], 10);
        const day = parseInt(matches[3], 10);

        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
      }
    }

    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    } catch (e) {
      console.error("Error parsing date:", e);
    }

    return null;
  }

  const refreshLockStatus = async () => {
    try {
      const locks = await DatabaseService.getAllActiveLocks();
      const newLockedRecords = {};
      locks.forEach(lock => {
        if (lock.clientId !== clientId) {
          newLockedRecords[lock.recordId] = lock;
        }
      });
      setLockedRecords(newLockedRecords);
    } catch (err) {
      console.error("Error refreshing lock status:", err);
    }
  };

  useEffect(() => {
    let existingClientId = localStorage.getItem('editorClientId');
    if (!existingClientId) {
      const newClientId = uuidv4();
      localStorage.setItem('editorClientId', newClientId);
      existingClientId = newClientId;
    }
    setClientId(existingClientId);

    const cleanupLocks = async () => {
      try {
        await DatabaseService.releaseAllLocksByClient(existingClientId);
      } catch (err) {
        console.error("Error releasing locks on page unload:", err);
      }
    };

    window.addEventListener('beforeunload', cleanupLocks);

    refreshLockStatus();
    const interval = setInterval(refreshLockStatus, 10000);
    setRefreshLocksInterval(interval);

    return () => {
      window.removeEventListener('beforeunload', cleanupLocks);
      cleanupLocks();
      if (refreshLocksInterval) {
        clearInterval(refreshLocksInterval);
      }
    };
  }, []);

  useEffect(() => {
    const newPatientType = searchParams.get('patientType') || '';
    const newComments = searchParams.get('comments') || '';
    const newMedicalReviewerStatus = searchParams.get('medicalReviewerStatus') ? searchParams.get('medicalReviewerStatus').split(',') : [];
    const newStartMonth = searchParams.get('startMonth') ? parseInt(searchParams.get('startMonth')) : '';
    const newEndMonth = searchParams.get('endMonth') ? parseInt(searchParams.get('endMonth')) : '';
    const newYear = searchParams.get('year') ? parseInt(searchParams.get('year')) : '';
    const newSearchTerm = searchParams.get('searchTerm') || '';
    const newValidationDate = searchParams.get('validationDate') || '';

    setPatientTypeFilter(newPatientType);
    setCommentsFilter(newComments);
    setMedicalReviewerStatusFilter(newMedicalReviewerStatus);
    setStartMonth(newStartMonth);
    setEndMonth(newEndMonth);
    setYear(newYear);
    setSearchTerm(newSearchTerm);
    setValidationDate(newValidationDate);
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (patientTypeFilter && !isFromLiteratureReview) newSearchParams.set('patientType', patientTypeFilter);
    if (commentsFilter && !isFromLiteratureReview) newSearchParams.set('comments', commentsFilter);
    if (medicalReviewerStatusFilter.length > 0 && !isFromLiteratureReview) newSearchParams.set('medicalReviewerStatus', medicalReviewerStatusFilter.join(','));
    if (startMonth && !isFromLiteratureReview) newSearchParams.set('startMonth', startMonth);
    if (endMonth && !isFromLiteratureReview) newSearchParams.set('endMonth', endMonth);
    if (year && !isFromLiteratureReview) newSearchParams.set('year', year);
    if (dateRange.startDate && dateRange.endDate && !isFromLiteratureReview) {
      newSearchParams.set('startDate', dateRange.startDate);
      newSearchParams.set('endDate', dateRange.endDate);
    }
    if (searchTerm) newSearchParams.set('searchTerm', searchTerm);
    if (validationDate) newSearchParams.set('validationDate', validationDate);
    setSearchParams(newSearchParams, { replace: true });
  }, [patientTypeFilter, commentsFilter, medicalReviewerStatusFilter, startMonth, endMonth, year, dateRange, searchTerm, validationDate, isFromLiteratureReview, setSearchParams]);

  const acquireLock = async (recordId) => {
    try {
      if (isRecordLocked(recordId)) {
        const lock = lockedRecords[recordId];
        const lockTime = new Date(lock.timestamp).toLocaleTimeString();
        showToast(`This record is being edited by another user since ${lockTime}`, "error");
        return false;
      }

      const result = await DatabaseService.acquireLock(recordId, clientId);
      if (result.success) {
        await refreshLockStatus();
        return true;
      } else {
        showToast(result.message || "Failed to lock record", "error");
        return false;
      }
    } catch (err) {
      if (err.message && err.message.includes('409: Conflict')) {
        await refreshLockStatus();
        if (isRecordLocked(recordId)) {
          const lock = lockedRecords[recordId];
          const lockTime = new Date(lock.timestamp).toLocaleTimeString();
          showToast(`This record is being edited by another user since ${lockTime}`, "error");
        } else {
          showToast("This record is currently being edited by another user", "error");
        }
        return false;
      }
      console.error("Error acquiring lock:", err);
      showToast("Failed to lock record: " + (err.message || "Unknown error"), "error");
      return false;
    }
  };

  const releaseLock = async (recordId) => {
    try {
      const result = await DatabaseService.releaseLock(recordId, clientId);
      await refreshLockStatus();
      return result.success;
    } catch (err) {
      console.error("Error releasing lock:", err);
      return false;
    }
  };

  const isRecordLocked = (recordId) => {
    return recordId in lockedRecords;
  };

  const fetchCasesData = async () => {
    try {
      setLoading(true);
      let data = await DatabaseService.fetchCases();

      if (data.length > 0) {
        console.log("First item fields:", Object.keys(data[0]));
        console.log("First item sample:", data[0]);

        // Get unique MedicalReviewerStatus values
        const statuses = [...new Set(data.map(row => row['MedicalReviewerStatus'] || '').filter(status => status !== ''))];
        setAvailableMedicalReviewerStatuses(statuses);

        data = data.map(row => {
          const reorderedRow = {
            'Mail': row['Mail'] ? String(row['Mail']).trim() : '',
            'Article PMID': row['Article PMID'] ? String(row['Article PMID']).trim() : '',
            'Comments (ICSR, AOI, Not selected)': row['Comments (ICSR, AOI, Not selected)'] ? String(row['Comments (ICSR, AOI, Not selected)']).trim() : ''
          };

          Object.keys(row).forEach(key => {
            if (
              key !== 'Mail' &&
              key !== 'Article PMID' &&
              key !== 'Comments (ICSR, AOI, Not selected)'
            ) {
              reorderedRow[key] = row[key] != null ? String(row[key]).trim() : '';
            }
          });

          return reorderedRow;
        });
      }

      setCasesData(data);
      setEditedCasesData(data);
      setLoading(false);
      await refreshLockStatus();
    } catch (err) {
      console.error("Error fetching cases data:", err);
      showToast("Failed to fetch cases data", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCasesData();
  }, []);

  const handleCellChange = (rowIndex, key, value) => {
    const newData = [...editedCasesData];
    const oldValue = newData[rowIndex][key];
    newData[rowIndex][key] = value;
    setEditedCasesData(newData);

    if (oldValue !== value) {
      setModifiedRows(prev => ({
        ...prev,
        [rowIndex]: true
      }));
    }
  };

  const handleFormChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleMedicalReviewerStatusChange = (status) => {
    setMedicalReviewerStatusFilter(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
    setCurrentPage(1);
  };

  const handleStatusUpdate = async (recordId, status, drugName) => {
    try {
      if (!recordId) {
        throw new Error("Missing Article PMID or ID");
      }
      if (!drugName) {
        throw new Error("Missing Drug name");
      }

      const matchingRows = casesData.filter(
        (item) =>
          (item['Article PMID'] === recordId || item.id === recordId) &&
          (item['Drug'] === drugName || item['drug'] === drugName)
      );

      if (matchingRows.length === 0) {
        throw new Error(`No record found for Article PMID=${recordId}, Drug=${drugName}`);
      }

      console.log(`Found ${matchingRows.length} matching rows for Article PMID=${recordId}, Drug=${drugName}:`, matchingRows);

      const lockAcquired = await acquireLock(recordId);
      if (!lockAcquired) {
        throw new Error("Failed to acquire lock");
      }

      try {
        setStatusUpdating(`${recordId}_${drugName}`);

        let updatedCount = 0;
        const errors = [];

        for (const row of matchingRows) {
          try {
            console.log(`Updating row: Article PMID=${recordId}, Drug=${drugName}, Status=${status}`);
            await DatabaseService.updateCaseStatus(recordId, drugName, status, clientId);
            updatedCount++;
          } catch (err) {
            console.error(`Failed to update row for Article PMID=${recordId}, Drug=${drugName}:`, {
              message: err.message,
              status: err.response?.status,
              response: err.response?.data,
            });
            errors.push(err.response?.data?.error || err.message);
          }
        }

        const newData = casesData.map((item) => {
          if (
            (item['Article PMID'] === recordId || item.id === recordId) &&
            (item['Drug'] === drugName || item['drug'] === drugName)
          ) {
            return { ...item, Status: status };
          }
          return item;
        });

        const newEditedData = editedCasesData.map((item) => {
          if (
            (item['Article PMID'] === recordId || item.id === recordId) &&
            (item['Drug'] === drugName || item['drug'] === drugName)
          ) {
            return { ...item, Status: status };
          }
          return item;
        });

        setCasesData(newData);
        setEditedCasesData(newEditedData);

        if (errors.length > 0) {
          showToast(`Updated ${updatedCount} of ${matchingRows.length} record(s). Errors: ${errors.join('; ')}`, "error");
        } else {
          showToast(`Status updated to "${status}" for ${updatedCount} record(s) successfully`);
        }
      } finally {
        await releaseLock(recordId);
      }
    } catch (err) {
      console.error(`Error updating status for Article PMID=${recordId}, Drug=${drugName || 'unknown'}:`, {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      const errorMsg = err.response?.data?.error
        ? `${err.response.data.error}${err.response.data.details ? `: ${err.response.data.details}` : ''}`
        : err.message;
      showToast(`Error: ${errorMsg}`, "error");
    } finally {
      setStatusUpdating(null);
    }
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg text-white z-50 animate-slide-in ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.replace('animate-slide-in', 'animate-slide-out');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  const openEditForm = async (row) => {
    const status = row['Status'];

    if (status === 'Verified' || status === 'Approved') {
      showToast(`${status} records cannot be edited`, "error");
      return;
    }

    const recordId = row['Article PMID'] || row.id;

    if (!recordId) {
      showToast("Cannot find record identifier", "error");
      return;
    }

    if (isRecordLocked(recordId)) {
      const lock = lockedRecords[recordId];
      const lockTime = new Date(lock.timestamp).toLocaleTimeString();
      showToast(`This record is being edited by another user since ${lockTime}`, "error");
      return;
    }

    const lockAcquired = await acquireLock(recordId);
    if (!lockAcquired) {
      return;
    }

    const rowIndex = editedCasesData.findIndex(item =>
      (item['Article PMID'] === recordId) || (item.id === recordId)
    );

    if (rowIndex === -1) {
      showToast("Cannot find the record to edit", "error");
      await releaseLock(recordId);
      return;
    }

    setFormData({ ...row });
    setEditingRowIndex(rowIndex);
    setIsFormVisible(true);
  };

  const closeForm = async () => {
    if (formData && (formData['Article PMID'] || formData.id)) {
      const recordId = formData['Article PMID'] || formData.id;
      await releaseLock(recordId);
    }

    setIsFormVisible(false);
    setEditingRowIndex(null);
    setFormData({});
    setSelectedFile(null);
  };

  const saveForm = async () => {
    try {
      setIsSaving(true);
      const row = formData;
      const recordId = row['Article PMID'] || row.id;
      const drugName = row['Drug'];

      if (!recordId || !drugName) {
        console.error(`Missing required fields: recordId=${recordId}, drugName=${drugName}`);
        showToast("Cannot save: Article PMID and Drug name are required", "error");
        await releaseLock(recordId);
        return;
      }

      const lockAcquired = await acquireLock(recordId);
      if (!lockAcquired) {
        showToast("Cannot save: Failed to acquire lock", "error");
        return;
      }

      const matchingRows = casesData.filter(
        (item) =>
          (item['Article PMID'] === recordId || item.id === recordId) &&
          (item['Drug'] === drugName || item['drug'] === drugName)
      );

      if (matchingRows.length === 0) {
        console.error(`No matching record found for Article PMID=${recordId}, Drug=${drugName}`);
        showToast("No matching record found with the provided Article PMID and Drug name", "error");
        await releaseLock(recordId);
        return;
      }

      if (row['Article Access'] === 'Credentials Required' && selectedFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', selectedFile);
        formDataUpload.append('Article PMID', recordId);
        formDataUpload.append('drugName', drugName);

        try {
          const documentUrl = await DatabaseService.uploadDocumentToBackend(formDataUpload.get('file'), formDataUpload.get('Article PMID'));
          console.log("Document uploaded successfully:", documentUrl);

          let updatedCount = 0;
          const errors = [];

          for (const matchingRow of matchingRows) {
            try {
              await DatabaseService.updateCase(recordId, drugName, {
                ...formData,
                Status: 'Document Uploaded',
                DocumentURL: documentUrl,
                clientId
              });
              updatedCount++;
            } catch (err) {
              console.error(`Failed to update row for Article PMID=${recordId}, Drug=${drugName}:`, err);
              errors.push(err.message);
            }
          }

          const newData = casesData.map((item) => {
            if (
              (item['Article PMID'] === recordId || item.id === recordId) &&
              (item['Drug'] === drugName || item['drug'] === drugName)
            ) {
              return { ...formData, Status: 'Document Uploaded', DocumentURL: documentUrl };
            }
            return item;
          });

          const newEditedData = editedCasesData.map((item) => {
            if (
              (item['Article PMID'] === recordId || item.id === recordId) &&
              (item['Drug'] === drugName || item['drug'] === drugName)
            ) {
              return { ...formData, Status: 'Document Uploaded', DocumentURL: documentUrl };
            }
            return item;
          });

          setCasesData(newData);
          setEditedCasesData(newEditedData);

          const newModifiedRows = { ...modifiedRows };
          matchingRows.forEach((_, index) => {
            const actualRowIndex = casesData.findIndex(
              (item) =>
                (item['Article PMID'] === recordId || item.id === recordId) &&
                (item['Drug'] === drugName || item['drug'] === drugName)
            ) + index;
            newModifiedRows[actualRowIndex] = true;
          });
          setModifiedRows(newModifiedRows);

          if (errors.length > 0) {
            showToast(`Updated ${updatedCount} of ${matchingRows.length} record(s). Errors: ${errors.join('; ')}`, "error");
          } else {
            showToast(`Document uploaded and changes saved for ${updatedCount} record(s) successfully`);
          }
        } catch (err) {
          console.error("Error uploading document:", err.response?.data || err.message);
          showToast(`Error uploading document: ${err.response?.data?.error || err.message}`, "error");
          await releaseLock(recordId);
          return;
        }
      } else {
        let updatedCount = 0;
        const errors = [];

        for (const matchingRow of matchingRows) {
          try {
            await DatabaseService.updateCase(recordId, drugName, { ...formData, clientId });
            updatedCount++;
          } catch (err) {
            console.error(`Failed to update row for Article PMID=${recordId}, Drug=${drugName}:`, err);
            errors.push(err.message);
          }
        }

        const newData = casesData.map((item) => {
          if (
            (item['Article PMID'] === recordId || item.id === recordId) &&
            (item['Drug'] === drugName || item['drug'] === drugName)
          ) {
            return { ...formData };
          }
          return item;
        });

        const newEditedData = editedCasesData.map((item) => {
          if (
            (item['Article PMID'] === recordId || item.id === recordId) &&
            (item['Drug'] === drugName || item['drug'] === drugName)
          ) {
            return { ...formData };
          }
          return item;
        });

        setCasesData(newData);
        setEditedCasesData(newEditedData);

        const newModifiedRows = { ...modifiedRows };
        matchingRows.forEach((_, index) => {
          const actualRowIndex = casesData.findIndex(
            (item) =>
              (item['Article PMID'] === recordId || item.id === recordId) &&
              (item['Drug'] === drugName || item['drug'] === drugName)
          ) + index;
          newModifiedRows[actualRowIndex] = true;
        });
        setModifiedRows(newModifiedRows);

        if (errors.length > 0) {
          showToast(`Updated ${updatedCount} of ${matchingRows.length} record(s). Errors: ${errors.join('; ')}`, "error");
        } else {
          showToast(`Changes saved for ${updatedCount} record(s) successfully`);
        }
      }

      await releaseLock(recordId);
      closeForm();
    } catch (err) {
      console.error("Error saving form:", err);
      showToast(`Error saving changes: ${err.message}`, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const renderLockStatus = (recordId) => {
    if (isRecordLocked(recordId)) {
      const lock = lockedRecords[recordId];
      const lockTime = new Date(lock.timestamp).toLocaleTimeString();

      return (
        <div className="flex items-center text-red-500" title={`Being edited since ${lockTime}`}>
          <Lock size={14} className="mr-1" />
          <span className="text-xs">Locked</span>
        </div>
      );
    }
    return null;
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let successCount = 0;
      let errorCount = 0;

      console.log("Modified rows:", Object.keys(modifiedRows));

      for (const rowIndexStr of Object.keys(modifiedRows)) {
        const rowIndex = parseInt(rowIndexStr);
        const row = editedCasesData[rowIndex];

        const recordId = row['Article PMID'] || row.id;
        const drugName = row['Drug'];

        if (!recordId || !drugName) {
          console.error("Row missing identifier or drug:", row);
          errorCount++;
          continue;
        }

        try {
          console.log(`Saving modified row with ID ${recordId}, Drug ${drugName}:`, row);
          const result = await DatabaseService.updateCase(recordId, drugName, row);
          console.log(`Save result for ID ${recordId}, Drug ${drugName}:`, result);
          successCount++;
        } catch (rowErr) {
          console.error(`Failed to save row with ID ${recordId}, Drug ${drugName}:`, rowErr);
          errorCount++;
        }
      }

      setEditMode(false);
      setLoading(false);
      setModifiedRows({});

      await fetchCasesData();

      if (errorCount > 0) {
        showToast(`Saved ${successCount} rows, but ${errorCount} rows had errors`, "error");
      } else if (successCount > 0) {
        showToast(`Successfully saved ${successCount} rows`);
      } else {
        showToast("No changes were made");
      }
    } catch (err) {
      console.error("Error in save operation:", err);
      setLoading(false);
      showToast(`Error saving changes: ${err.message}`, "error");
    }
  };

  const handleCellClick = (rowIndex, colIndex, value) => {
    if (!editMode) {
      setExpandedCell({ row: rowIndex, col: colIndex, value });
    }
  };

  const closeExpandedCell = () => {
    setExpandedCell(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "-";
    }

    try {
      const ymdRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
      if (typeof dateString === 'string' && ymdRegex.test(dateString)) {
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime()) && date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day) {
          return dateString;
        }
      }

      const monthNamePattern = /^[A-Za-z]{3}\s\d{1,2}\s\d{4}/;
      if (typeof dateString === 'string' && monthNamePattern.test(dateString)) {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
      }

      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      return dateString;
    } catch (e) {
      console.error("Error parsing date:", e, dateString);
      return dateString;
    }
  };

  const filteredData = casesData.filter(item => {
    if (!item) return false;

    if (isFromLiteratureReview && searchTerm) {
      const matchesEmail = item.Mail && item.Mail.toLowerCase() === searchTerm.toLowerCase();
      if (!matchesEmail) return false;

      if (validationDate && item['Validation Processing Date']) {
        const parsedDate = parseDate(item['Validation Processing Date']);
        return parsedDate === validationDate;
      }
      return true;
    }

    let passesDateFilter = true;
    if (!isFromLiteratureReview && dateRange.startDate && dateRange.endDate && item['IRD']) {
      const rawDate = item['IRD'];
      const parsedDate = parseDate(rawDate);
      if (parsedDate) {
        passesDateFilter = parsedDate >= dateRange.startDate && parsedDate <= dateRange.endDate;
      } else {
        passesDateFilter = false;
      }
    }
    if (!passesDateFilter) return false;

    let passesMonthYearFilter = true;
    if (!isFromLiteratureReview && year && startMonth && endMonth && item['IRD']) {
      const rawDate = item['IRD'];
      const parsedDate = parseDate(rawDate);
      if (parsedDate) {
        const dateObj = new Date(parsedDate);
        const rowYear = dateObj.getFullYear();
        const rowMonth = dateObj.getMonth() + 1;
        passesMonthYearFilter = rowYear === year && rowMonth >= startMonth && rowMonth <= endMonth;
      } else {
        passesMonthYearFilter = false;
      }
    }
    if (!passesMonthYearFilter) return false;

    let passesPatientTypeFilter = true;
    if (!isFromLiteratureReview && patientTypeFilter) {
      const patientType = item['Patient Type'] ? item['Patient Type'].toString().trim() : 'Unknown';
      passesPatientTypeFilter = patientType === patientTypeFilter;
    }
    if (!passesPatientTypeFilter) return false;

    let passesCommentsFilter = true;
    if (!isFromLiteratureReview && commentsFilter) {
      const comments = item['Comments (ICSR, AOI, Not selected)']
        ? item['Comments (ICSR, AOI, Not selected)'].toString().toUpperCase()
        : 'Others';
      passesCommentsFilter = comments.includes(commentsFilter.toUpperCase());
    }
    if (!passesCommentsFilter) return false;

    let passesMedicalReviewerStatusFilter = true;
    if (!isFromLiteratureReview && medicalReviewerStatusFilter.length > 0) {
      const status = item['MedicalReviewerStatus'] ? item['MedicalReviewerStatus'].toString().trim() : '';
      passesMedicalReviewerStatusFilter = medicalReviewerStatusFilter.includes(status);
    }
    if (!passesMedicalReviewerStatusFilter) return false;

    if (!isFromLiteratureReview && searchTerm) {
      const searchLower = searchTerm.trim().toLowerCase();
      const pmid = item['Article PMID'] ? String(item['Article PMID']).trim().toLowerCase() : '';

      if (/^\d{8}$/.test(searchTerm)) {
        return pmid === searchLower;
      }

      return Object.entries(item).some(([key, value]) => {
        const stringValue = value == null ? '' : String(value).trim().toLowerCase();
        return stringValue.includes(searchLower);
      });
    }

    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortOrder) return 0;
    const dateA = parseDate(a['IRD']);
    const dateB = parseDate(b['IRD']);
    
    if (!dateA && !dateB) return 0;
    if (!dateA) return sortOrder === 'asc' ? 1 : -1;
    if (!dateB) return sortOrder === 'asc' ? -1 : 1;

    const dateObjA = new Date(dateA);
    const dateObjB = new Date(dateB);
    
    return sortOrder === 'asc'
      ? dateObjA - dateObjB
      : dateObjB - dateObjA;
  });

  const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const renderStatusButtons = (row) => {
    const recordId = row['Article PMID'] || row.id;
    const drugName = row['Drug'];
    const isUpdating = statusUpdating === `${recordId}_${drugName}`;
    const currentStatus = row?.['Status'] || '';

    if (currentStatus === 'Verified' || currentStatus === 'Approved') {
      return (
        <div className="flex space-x-2 items-center">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              currentStatus === 'Verified' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {currentStatus}
          </span>
        </div>
      );
    }

    return (
      <div className="flex space-x-2 items-center">
        {currentStatus && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              currentStatus === 'Checking'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {currentStatus}
          </span>
        )}
        <button
          onClick={() => {
            if (!drugName) {
              showToast("Error: Drug name is missing for this record", "error");
              return;
            }
            if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
              handleStatusUpdate(recordId, 'Approved', drugName);
            }
          }}
          disabled={isUpdating || !drugName}
          className="px-2 py-1 text-xs rounded-full flex items-center transition-all duration-300 bg-green-500 text-white hover:bg-green-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          title={!drugName ? 'Drug information missing' : 'Approve this record'}
        >
          <CheckCircle size={12} className="mr-1" /> Approve
        </button>
        <button
          onClick={() => {
            if (!drugName) {
              showToast("Error: Drug name is missing for this record", "error");
              return;
            }
            handleStatusUpdate(recordId, 'Checking', drugName);
          }}
          disabled={isUpdating || currentStatus === 'Checking' || !drugName}
          className={`px-2 py-1 text-xs rounded-full flex items-center transition-all duration-300 ${
            currentStatus === 'Checking'
              ? 'bg-yellow-100 text-yellow-800 opacity-50 cursor-not-allowed'
              : 'bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-md'
          }`}
          title={!drugName ? 'Drug information missing' : 'Mark as Checking'}
        >
          <Clock size={12} className="mr-1" /> Checking
        </button>
        {isUpdating && (
          <span className="text-xs flex items-center text-gray-500">
            <RefreshCw size={12} className="mr-1 animate-spin" /> Updating...
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#14242c]">Cases</h1>
        <p className="text-[#1a4e6a] mt-2">View and manage cases data</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md border border-[#1a4e6a] shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-[#1483b9]">
          <Search size={20} className="text-[#143b50] mr-2" />
          <input
            type="text"
            placeholder="Search across all fields..."
            className="bg-transparent border-none outline-none w-full text-[#14242c]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={async () => {
              try {
                showToast("Preparing filtered data download...");
                const dataToExport = sortedData;

                if (dataToExport.length === 0) {
                  showToast("No data to export. Please adjust your filters.", "error");
                  return;
                }

                const escapeCSV = (str) => {
                  if (str === null || str === undefined) {
                    return '';
                  }
                  const val = typeof str !== 'string' ? String(str) : str;
                  const escaped = val.replace(/"/g, '""');
                  return `"${escaped}"`;
                };

                const headers = Object.keys(dataToExport[0]).filter(header => header !== 'DocumentURL');
                let csvRows = [];
                csvRows.push(headers.map(header => escapeCSV(header)).join(','));

                dataToExport.forEach(row => {
                  const rowValues = headers.map(header => escapeCSV(row[header]));
                  csvRows.push(rowValues.join(','));
                });

                const csvString = csvRows.join('\n');
                const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

                let filename = `cases_export_${new Date().toISOString().split('T')[0]}`;
                if (searchTerm) {
                  const cleanSearchTerm = searchTerm.substring(0, 10).replace(/[^a-z0-9]/gi, '_');
                  filename += `_search_${cleanSearchTerm}`;
                }
                if (dateRange.startDate && dateRange.endDate) {
                  filename += `_date_filtered`;
                }
                filename += `.csv`;

                const url = window.URL.createObjectURL(blob);
                const downloadLink = document.createElement('a');
                downloadLink.style.display = 'none';
                downloadLink.href = url;
                downloadLink.download = filename;

                document.body.appendChild(downloadLink);
                downloadLink.click();

                window.setTimeout(() => {
                  window.URL.revokeObjectURL(url);
                  try {
                    if (document.body.contains(downloadLink)) {
                      document.body.removeChild(downloadLink);
                    }
                  } catch (e) {
                    console.log("Download element already removed");
                  }
                }, 1000);

                showToast(`Downloaded ${dataToExport.length} filtered records successfully`);
              } catch (err) {
                console.error("Error exporting filtered data:", err);
                showToast("Failed to download data: " + (err.message || "Unknown error"), "error");
              }
            }}
            className="flex items-center bg-[#14242c] text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-[#143b50] hover:shadow-md mr-3"
            title="Download filtered data as CSV"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            Export {sortedData.length > 0 ? `(${sortedData.length})` : ''}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="flex items-center bg-[#1a4e6a] text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
            >
              <Calendar size={16} className="mr-2" /> Date Range
            </button>

            {showDateFilter && (
              <div className="absolute right-0 top-full mt-2 bg-white p-4 rounded-md shadow-lg z-20 border border-gray-200 min-w-[300px]">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#14242c] mb-1">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#14242c] mb-1">End Date</label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setShowDateFilter(false)}
                      className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowDateFilter(false);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1 text-sm bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] transition-colors"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={fetchCasesData}
            className="flex items-center bg-gray-200 text-[#14242c] px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-300"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {(dateRange.startDate && dateRange.endDate || patientTypeFilter || commentsFilter || medicalReviewerStatusFilter.length > 0 || (isFromLiteratureReview && searchTerm)) && (
        <div className="mb-4 flex items-center flex-wrap gap-2">
          <span className="text-sm text-[#1a4e6a] mr-2">Filtered by:</span>
          {isFromLiteratureReview && searchTerm && (
            <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
              <Search size={12} className="mr-1" />
              Email: {searchTerm}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setValidationDate('');
                  setIsFromLiteratureReview(false);
                  searchParams.delete('searchTerm');
                  searchParams.delete('validationDate');
                  setSearchParams(searchParams);
                }}
                className="ml-2 text-white hover:text-red-200"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {isFromLiteratureReview && validationDate && (
            <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
              <Calendar size={12} className="mr-1" />
              Validation Date: {validationDate}
              <button
                onClick={() => {
                  setValidationDate('');
                  searchParams.delete('validationDate');
                  setSearchParams(searchParams);
                }}
                className="ml-2 text-white hover:text-red-200"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {dateRange.startDate && dateRange.endDate && !isFromLiteratureReview && (
            <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
              <Calendar size={12} className="mr-1" />
              IRD: {dateRange.startDate} to {dateRange.endDate}
              <button
                onClick={() => setDateRange({ startDate: '', endDate: '' })}
                className="ml-2 text-white hover:text-red-200"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {patientTypeFilter && !isFromLiteratureReview && (
            <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
              <Users size={12} className="mr-1" />
              Patient Type: {patientTypeFilter}
              <button
                onClick={() => {
                  setPatientTypeFilter('');
                  searchParams.delete('patientType');
                  setSearchParams(searchParams);
                }}
                className="ml-2 text-white hover:text-red-200"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {commentsFilter && !isFromLiteratureReview && (
            <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
              <MessageSquare size={12} className="mr-1" />
              Comments: {commentsFilter}
              <button
                onClick={() => {
                  setCommentsFilter('');
                  searchParams.delete('comments');
                  setSearchParams(searchParams);
                }}
                className="ml-2 text-white hover:text-red-200"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {medicalReviewerStatusFilter.length > 0 && !isFromLiteratureReview && (
            <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
              <Filter size={12} className="mr-1" />
              Medical Reviewer Status: {medicalReviewerStatusFilter.join(', ')}
              <button
                onClick={() => {
                  setMedicalReviewerStatusFilter([]);
                  searchParams.delete('medicalReviewerStatus');
                  setSearchParams(searchParams);
                }}
                className="ml-2 text-white hover:text-red-200"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {(dateRange.startDate && dateRange.endDate || patientTypeFilter || commentsFilter || medicalReviewerStatusFilter.length > 0 || (isFromLiteratureReview && searchTerm)) && (
            <button
              onClick={() => {
                setDateRange({ startDate: '', endDate: '' });
                setPatientTypeFilter('');
                setCommentsFilter('');
                setMedicalReviewerStatusFilter([]);
                setStartMonth('');
                setEndMonth('');
                setYear('');
                setSearchTerm('');
                setValidationDate('');
                setIsFromLiteratureReview(false);
                setSearchParams({});
              }}
              className="text-xs bg-[#1483b9] text-white px-2 py-1 rounded-md hover:bg-[#143b50] flex items-center transition-all duration-300"
            >
              <X size={12} className="mr-1" /> Clear all filters
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-[#1483b9] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#14242c]">Loading cases data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#14242c] text-white sticky top-0 z-10">
                  <tr>
                    {casesData.length > 0 &&
                      Object.keys(casesData[0]).map((col, idx) =>
                        col !== 'Status' && col !== 'DocumentURL' && (
                          <th
                            key={idx}
                            className={`px-4 py-3 text-left font-medium text-xs whitespace-nowrap relative ${
                              col === 'IRD' || col === 'MedicalReviewerStatus' ? 'cursor-pointer hover:bg-[#143b50]' : ''
                            }`}
                            style={{ minWidth: '180px' }}
                            onClick={() => {
                              if (col === 'IRD') {
                                setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
                                setCurrentPage(1);
                              } else if (col === 'MedicalReviewerStatus') {
                                setShowMedicalReviewerFilter(!showMedicalReviewerFilter);
                              }
                            }}
                          >
                            <div className="flex items-center">
                              {col}
                              {col === 'IRD' && sortOrder && (
                                <svg
                                  className="ml-1 w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={sortOrder === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
                                  />
                                </svg>
                              )}
                              {col === 'MedicalReviewerStatus' && (
                                <Filter size={14} className="ml-1" />
                              )}
                            </div>
                            {col === 'MedicalReviewerStatus' && showMedicalReviewerFilter && (
                              <div className="absolute top-full left-0 mt-2 bg-white p-4 rounded-md shadow-lg z-20 border border-gray-200 min-w-[200px]">
                                <div className="flex flex-col gap-2">
                                  {availableMedicalReviewerStatuses.map(status => (
                                    <label key={status} className="flex items-center text-sm text-[#14242c]">
                                      <input
                                        type="checkbox"
                                        checked={medicalReviewerStatusFilter.includes(status)}
                                        onChange={() => handleMedicalReviewerStatusChange(status)}
                                        className="mr-2"
                                      />
                                      {status || 'No Status'}
                                    </label>
                                  ))}
                                  <div className="flex justify-end gap-2 mt-2">
                                    <button
                                      onClick={() => setShowMedicalReviewerFilter(false)}
                                      className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                                    >
                                      Close
                                    </button>
                                    <button
                                      onClick={() => {
                                        setShowMedicalReviewerFilter(false);
                                        setCurrentPage(1);
                                      }}
                                      className="px-3 py-1 text-sm bg-[#1483b9] text-white rounded-md hover:bg-[#143b50]"
                                    >
                                      Apply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </th>
                        )
                      )}
                    <th
                      className="px-4 py-3 text-left font-medium text-xs whitespace-nowrap bg-[#143b50] sticky right-0 shadow-l"
                      style={{ minWidth: '200px' }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row, rowIndex) => {
                    const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
                    const recordId = row['Article PMID'] || row.id;
                    const isLocked = isRecordLocked(recordId);

                    return (
                      <tr
                        key={`${recordId}_${row['Drug']}_${rowIndex}`}
                        className={`hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150 ${
                          isLocked ? 'bg-red-50' : ''
                        }`}
                      >
                        {Object.entries(row).map(([key, val], colIndex) => {
                          if (key === 'Status' || key === 'DocumentURL') return null;

                          return (
                            <td
                              key={`${recordId}_${key}_${colIndex}`}
                              className={`px-4 py-3 text-xs ${
                                key === 'Article PMID'
                                  ? 'font-medium text-[#143b50]'
                                  : editMode
                                  ? 'p-0'
                                  : 'truncate hover:bg-gray-100 transition-colors duration-150'
                              }`}
                              onClick={() =>
                                !editMode && key !== 'Article PMID' && handleCellClick(actualRowIndex, colIndex, val)
                              }
                              title={!editMode && key !== 'Article PMID' ? 'Click to view full content' : ''}
                              style={{ minWidth: '180px', maxWidth: '180px' }}
                            >
                              {editMode && key !== 'Article PMID' ? (
                                <textarea
                                  value={editedCasesData[actualRowIndex][key] || ''}
                                  onChange={(e) => handleCellChange(actualRowIndex, key, e.target.value)}
                                  className="w-full h-full min-h-[40px] p-2 border border-[#1483b9] focus:outline-none focus:ring-2 focus:ring-[#1483b9] text-xs"
                                />
                              ) : ['IRD', 'Validation Processing Date'].includes(key) ? (
                                formatDate(val)
                              ) : (
                                truncateText(val, 25) || ''
                              )}
                            </td>
                          );
                        })}
                        <td className="px-4 py-3 bg-white sticky right-0 shadow-l" style={{ minWidth: '200px' }}>
                          <div className="flex items-center space-x-2">
                            {isLocked ? (
                              <>
                                {renderLockStatus(recordId)}
                                <button
                                  disabled
                                  className="flex items-center justify-center w-8 h-8 bg-gray-300 text-white rounded-full cursor-not-allowed opacity-50"
                                  title="This record is being edited by another user"
                                >
                                  <Lock size={14} />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => openEditForm(row)}
                                className="flex items-center justify-center w-8 h-8 bg-[#1483b9] text-white rounded-full transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
                                title="Edit this record"
                              >
                                <Edit size={14} />
                              </button>
                            )}
                            {renderStatusButtons(row)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center space-x-2 text-sm text-[#1a4e6a]">
              <span>Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing items per page
                }}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
              <span>
                Showing {sortedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, sortedData.length)} entries of {sortedData.length} total
                entries
              </span>
            </div>
            {sortedData.length > itemsPerPage && (
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>

                {(() => {
                  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
                  let pagesToShow = [];

                  if (totalPages <= 5) {
                    pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
                  } else {
                    if (currentPage <= 3) {
                      pagesToShow = [1, 2, 3, 4, '...', totalPages];
                    } else if (currentPage >= totalPages - 2) {
                      pagesToShow = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                    } else {
                      pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                    }
                  }

                  return pagesToShow.map((page, index) => {
                    if (page === '...') {
                      return (
                        <span key={`ellipsis-${index}`} className="px-3 py-1">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={`page-${page}`}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-md transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-[#14242c] text-white shadow-md'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  });
                })()}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedData.length / itemsPerPage)}
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {expandedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto shadow-2xl animate-scale-in mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#14242c]">
                {editedCasesData[expandedCell.row] &&
                 Object.keys(editedCasesData[expandedCell.row])[expandedCell.col]}
              </h3>
              <button
                onClick={closeExpandedCell}
                className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
              {expandedCell.value || ""}
            </div>
          </div>
        </div>
      )}

     {isFormVisible && editingRowIndex !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl animate-scale-in flex flex-col max-h-[95vh]">
      <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#14242c] text-white rounded-t-lg">
        <h3 className="text-xl font-bold flex items-center">
          <Edit size={18} className="mr-2" />
          Edit Case Record
        </h3>
        <button
          onClick={closeForm}
          className="text-white hover:text-red-300 transition-colors p-1 rounded-full hover:bg-[#143b50]"
        >
          <X size={20} />
        </button>
      </div>

      <div className="overflow-y-auto p-6 flex-grow" style={{maxHeight: "calc(95vh - 150px)"}}>
        {formData['Article PMID'] && (
          <div className="mb-6 bg-[#1a4e6a] bg-opacity-10 p-3 rounded-md border-l-4 border-[#1a4e6a] flex items-center">
            <span className="font-semibold text-[#1a4e6a] mr-2">Case ID:</span>
            <span className="text-[#143b50]">{formData['Article PMID']}</span>
            <span className="ml-auto px-2 py-1 text-xs bg-[#1a4e6a] text-white rounded-md">
              {formData['Status'] || 'No Status'}
            </span>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 space-y-4">
            {formData['Title'] && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  Title
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">Read-only</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] bg-gray-50 opacity-80"
                  value={formData['Title'] || ''}
                  readOnly
                />
              </div>
            )}

            {formData['Abstract'] && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  Abstract
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">Read-only</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-gray-300 min-h-[140px] bg-gray-50 opacity-80"
                  value={formData['Abstract'] || ''}
                  readOnly
                />
              </div>
            )}

            {formData['URL'] && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  URL
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">Read-only</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md border-gray-300 bg-gray-50 opacity-80"
                    value={formData['URL'] || ''}
                    readOnly
                  />
                  <a
                    href={formData['URL']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {formData['Search Date'] !== undefined && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  <Calendar size={14} className="mr-1 text-[#1483b9]" />
                  Search Date
                  <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                  value={formData['Search Date'] || ''}
                  onChange={(e) => handleFormChange('Search Date', e.target.value)}
                />
              </div>
            )}

            {formData['Validation Processing Date'] !== undefined && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  <Calendar size={14} className="mr-1 text-[#1483b9]" />
                  Validation Processing Date
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">Read-only</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 min-h-[60px] bg-gray-50 opacity-80"
                  value={formData['Validation Processing Date'] || ''}
                  readOnly
                />
              </div>
            )}

            {formData['Search Term'] !== undefined && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  Search Term
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">Read-only</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] bg-gray-50 opacity-80"
                  value={formData['Search Term'] || ''}
                  readOnly
                />
              </div>
            )}

            {formData['Article Publication Date'] !== undefined && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  <Calendar size={14} className="mr-1 text-[#1483b9]" />
                  Article Publication Date
                  <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                  value={formData['Article Publication Date'] || ''}
                  onChange={(e) => handleFormChange('Article Publication Date', e.target.value)}
                />
              </div>
            )}

            {formData['Primary Author Address'] !== undefined && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  Primary Author Address
                  <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                  value={formData['Primary Author Address'] || ''}
                  onChange={(e) => handleFormChange('Primary Author Address', e.target.value)}
                />
              </div>
            )}

            {formData['Primary Author Country'] !== undefined && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  Primary Author Country
                  <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                  value={formData['Primary Author Country'] || ''}
                  onChange={(e) => handleFormChange('Primary Author Country', e.target.value)}
                />
              </div>
            )}

            {formData['Drug'] !== undefined && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  Drug
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">Read-only</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                  value={formData['Drug'] || ''}
                  readOnly
                />
              </div>
            )}

            {formData['Comments (ICSR, AOI, Not selected)'] !== undefined && (
              <div>
                <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                  Comments (ICSR, AOI, Not selected)
                  <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                  value={formData['Comments (ICSR, AOI, Not selected)'] || ''}
                  onChange={(e) => handleFormChange('Comments (ICSR, AOI, Not selected)', e.target.value)}
                />
              </div>
            )}
          </div>

        <div className="md:w-1/2 space-y-4">
  {formData['Summary'] && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Summary
        <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">Read-only</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[120px] bg-gray-50 opacity-80"
        value={formData['Summary'] || ''}
        readOnly
      />
    </div>
  )}

  {formData['Reason of Selection'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Reason of Selection
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-[#1483b9] focus:outline-none focus:ring-2 focus:ring-[#1483b9] min-h-[120px]"
        value={formData['Reason of Selection'] || ''}
        onChange={(e) => handleFormChange('Reason of Selection', e.target.value)}
      />
    </div>
  )}

  {formData['Author Validation (Rule-1)'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Author Validation (Rule-1)
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
        value={formData['Author Validation (Rule-1)'] || ''}
        onChange={(e) => handleFormChange('Author Validation (Rule-1)', e.target.value)}
      />
    </div>
  )}

  {formData['Publication Date Validation (Rule-2)'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Publication Date Validation (Rule-2)
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
        value={formData['Publication Date Validation (Rule-2)'] || ''}
        onChange={(e) => handleFormChange('Publication Date Validation (Rule-2)', e.target.value)}
      />
    </div>
  )}

  {formData['Patient Type'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Patient Type
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
        value={formData['Patient Type'] || ''}
        onChange={(e) => handleFormChange('Patient Type', e.target.value)}
      />
    </div>
  )}

  {formData['Patient Details'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Patient Details
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
        value={formData['Patient Details'] || ''}
        onChange={(e) => handleFormChange('Patient Details', e.target.value)}
      />
    </div>
  )}

  {formData['Patient Validation (Rule-3)'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Patient Validation (Rule-3)
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
        value={formData['Patient Validation (Rule-3)'] || ''}
        onChange={(e) => handleFormChange('Patient Validation (Rule-3)', e.target.value)}
      />
    </div>
  )}

  {formData['Reporter Details'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Reporter Details
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
        value={formData['Reporter Details'] || ''}
        onChange={(e) => handleFormChange('Reporter Details', e.target.value)}
      />
    </div>
  )}

  {formData['Casuality Response'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Causality Response
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
        value={formData['Casuality Response'] || ''}
        onChange={(e) => handleFormChange('Casuality Response', e.target.value)}
      />
    </div>
  )}

  {formData['Casuality Validation (Rule-4)'] !== undefined && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Causality Validation (Rule-4)
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Editable</span>
      </label>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
        value={formData['Casuality Validation (Rule-4)'] || ''}
        onChange={(e) => handleFormChange('Casuality Validation (Rule-4)', e.target.value)}
      />
    </div>
  )}

  {formData['Article Access'] === 'Credentials Required' && (
    <div>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        Upload Document
        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Required</span>
      </label>
      <div className="flex items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-[#1483b9] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#1483b9] file:text-white file:hover:bg-[#143b50]"
          accept=".pdf,.doc,.docx"
        />
        {selectedFile && (
          <span className="ml-2 text-xs text-[#14242c] truncate max-w-[150px]">
            {selectedFile.name}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {selectedFile ? 'File selected. Click Save to upload.' : 'Please select a file to upload (PDF only).'}
      </p>
    </div>
  )}
</div>
        </div>
      </div>
             <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-end gap-3">
              <button
                onClick={closeForm}
                className="px-4 py-2 bg-gray-200 text-[#14242c] rounded-md hover:bg-gray-300 transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={saveForm}
                className="px-4 py-2 bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] transition-colors flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {editMode && (
        <div className="fixed bottom-4 right-4 flex space-x-2 z-50">
          <button
            onClick={() => {
              setEditMode(false);
              setEditedCasesData(casesData);
              setModifiedRows({});
            }}
            className="px-4 py-2 bg-gray-200 text-[#14242c] rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] transition-colors flex items-center"
            disabled={Object.keys(modifiedRows).length === 0}
          >
            <Save size={16} className="mr-2" />
            Save All
          </button>
        </div>
      )}
    </div>
  );
};

export default CasesContent;
