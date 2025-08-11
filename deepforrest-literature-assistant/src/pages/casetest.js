// original
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Edit, Save, X, CheckCircle, Clock, Filter, Calendar, RefreshCw } from 'lucide-react';
import DatabaseService from '../services/DatabaseService';
import { useLocation } from 'react-router-dom';
const CasesContent = () => {
const location = useLocation();  
// Modify this part of your code at the top:

const [isFromLiteratureReview, setIsFromLiteratureReview] = useState(
  location.state?.fromLiteratureReview || false
);


// Then update the navigation effect
useEffect(() => {
  if (location.state?.searchTerm) {
    console.log("Received search term from navigation:", location.state.searchTerm);
    setSearchTerm(location.state?.searchTerm);
    
    // Check if coming from literature review
    if (location.state?.fromLiteratureReview) {
      setIsFromLiteratureReview(true);
      // Clear date filtering
      setDateRange({
        startDate: '',
        endDate: ''
      });
    }
  }
}, [location.state]);
  const [casesData, setCasesData] = useState([]);
  const [editedCasesData, setEditedCasesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    location.state?.searchTerm || ''
  );
// Change this useEffect section

  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [expandedCell, setExpandedCell] = useState(null);
  const [modifiedRows, setModifiedRows] = useState({});
  const [statusUpdating, setStatusUpdating] = useState(null);
// Get date from 7 days ago
function getLastSevenDaysStart() {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 6); // 6 days back + today = 7 days total
  return sevenDaysAgo.toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

// Update the useState hook
const [dateRange, setDateRange] = useState(() => {
  // Check if we're coming from literature review via URL state
  if (location.state?.fromLiteratureReview) {
    return {
      startDate: '',
      endDate: ''
    };
  } else {
    // Use default date range only if not coming from literature review
    return {
      startDate: getLastSevenDaysStart(),
      endDate: new Date().toISOString().split('T')[0]
    };
  }
});
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [formData, setFormData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 10;

  // Calculate the start of the current week

  function parseDate(dateString) {
    if (!dateString) return null;
    
    // Handle string format
    if (typeof dateString === 'string') {
      // Format: "Apr 16 2025 12:00AM"
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
      
      // Format: DD/MM/YYYY or DD-MM-YYYY
      const dmyRegex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;
      matches = dateString.match(dmyRegex);
      
      if (matches) {
        const day = parseInt(matches[1], 10);
        const month = parseInt(matches[2], 10);
        const year = parseInt(matches[3], 10);
        
        // Create date object (note: month is 0-indexed in JavaScript)
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
      }
      
      // Format: YYYY-MM-DD
      const ymdRegex = /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/;
      matches = dateString.match(ymdRegex);
      
      if (matches) {
        const year = parseInt(matches[1], 10);
        const month = parseInt(matches[2], 10);
        const day = parseInt(matches[3], 10);
        
        // Create date object (note: month is 0-indexed in JavaScript)
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
      }
    }
    
    // Try standard date parsing as fallback
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
    
    // Return null if parsing failed
    return null;
  }
  // Fetch data from database
  const fetchCasesData = async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.fetchCases();
      
      if (data.length > 0) {
        console.log("First item fields:", Object.keys(data[0]));
        console.log("First item sample:", data[0]);
      }
      
      setCasesData(data);
      setEditedCasesData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cases data:", err);
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
    
    // Track this row as modified
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

  // Function to handle immediate status updates
  // Function to handle immediate status updates
  const handleStatusUpdate = async (recordId, status) => {
    try {
      if (!recordId) {
        console.error("Missing record identifier");
        alert("Cannot update status: missing record identifier");
        return;
      }
      
      // Set status updating indicator for this record
      setStatusUpdating(recordId);
      
      // Send the update to the server first before updating UI
      console.log(`Updating status for record ${recordId} to "${status}"`);
      await DatabaseService.updateCaseStatus(recordId, status);
      
      // Update the local state after successful backend update
      const newData = editedCasesData.map(row => {
        if ((row['Article pmid'] === recordId) || (row.id === recordId)) {
          return { ...row, Status: status };
        }
        return row;
      });
      
      setEditedCasesData(newData);
      
      // Update the original data to keep it in sync
      const originalData = casesData.map(row => {
        if ((row['Article pmid'] === recordId) || (row.id === recordId)) {
          return { ...row, Status: status };
        }
        return row;
      });
      
      setCasesData(originalData);
      
      // Show feedback with toast animation
      showToast(`Status updated to "${status}" successfully`);
      
    } catch (err) {
      console.error("Error updating status:", err);
      showToast(`Failed to update status: ${err.message}`, 'error');
    } finally {
      setStatusUpdating(null);
    }
  };
  const showToast = (message, type = 'success') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg text-white z-50 animate-slide-in ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.replace('animate-slide-in', 'animate-slide-out');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };
// Replace the openEditForm function with this implementation
const openEditForm = (row) => {
  const status = row['Status'];
  
  // Don't allow editing for Verified or Approved records
  if (status === 'Verified' || status === 'Approved') {
    showToast(`${status} records cannot be edited`, "error");
    return;
  }
  
  // Find the actual row index in the editedCasesData array
  const rowIndex = editedCasesData.findIndex(item => 
    (item['Article pmid'] === row['Article pmid']) || 
    (item.id === row.id)
  );
  
  if (rowIndex === -1) {
    showToast("Cannot find the record to edit", "error");
    return;
  }
  
  setFormData({...row});
  setEditingRowIndex(rowIndex);
  setIsFormVisible(true);
};

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingRowIndex(null);
    setFormData({});
  };

  const saveForm = async () => {
    try {
      setIsSaving(true);
      
      // Update the row in the table data
      const newData = [...editedCasesData];
      newData[editingRowIndex] = {...formData};
      setEditedCasesData(newData);
      
      // Mark this row as modified
      setModifiedRows(prev => ({
        ...prev,
        [editingRowIndex]: true
      }));
      
      // Save to database
      const row = formData;
      const recordId = row['Article pmid'] || row.id;
      
      if (recordId) {
        await DatabaseService.updateCase(recordId, row);
        showToast("Changes saved successfully");
      } else {
        showToast("Cannot save: missing record identifier", "error");
      }
      
      // Close the form
      closeForm();
      
      // Refresh data
      fetchCasesData();
      
    } catch (err) {
      console.error("Error saving form:", err);
      showToast(`Error saving changes: ${err.message}`, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let successCount = 0;
      let errorCount = 0;
      
      console.log("Modified rows:", Object.keys(modifiedRows));
      
      // Only save rows that were modified
      for (const rowIndexStr of Object.keys(modifiedRows)) {
        const rowIndex = parseInt(rowIndexStr);
        const row = editedCasesData[rowIndex];
        
        // Use Article pmid or id as the identifier
        const recordId = row['Article pmid'] || row.id;
        
        if (!recordId) {
          console.error("Row missing identifier:", row);
          errorCount++;
          continue; // Skip rows without identifier
        }
        
        try {
          console.log(`Saving modified row with ID ${recordId}:`, row);
          const result = await DatabaseService.updateCase(recordId, row);
          console.log(`Save result for ID ${recordId}:`, result);
          successCount++;
        } catch (rowErr) {
          console.error(`Failed to save row with ID ${recordId}:`, rowErr);
          errorCount++;
        }
      }
      
      setEditMode(false);
      setLoading(false);
      setModifiedRows({}); // Clear modified rows tracking
      
      // Refresh the data after saving to get any server-side changes
      fetchCasesData();
      
      // Show status message
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

  // Format dates function with better error handling
  const formatDate = (dateString) => {
    if (!dateString) {
      return "-";
    }
    
    try {
      // Handle string format like "Apr 16 2025 12:00AM"
      if (typeof dateString === 'string') {
        // Check if it's in the format "MMM DD YYYY hh:mmAM/PM"
        const monthNamePattern = /^[A-Za-z]{3}\s\d{1,2}\s\d{4}/;
        if (monthNamePattern.test(dateString)) {
          const date = new Date(dateString);
          if (!isNaN(date.getTime())) {
            // Format as YYYY-MM-DD for comparison
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
        }
      }
      
      // Standard date handling for ISO strings and date objects
      const date = new Date(dateString);
      if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      } else {
        // Try to handle it as a string if it contains date-like parts
        if (typeof dateString === 'string' && dateString.includes('-')) {
          // Simple handling for "YYYY-MM-DD" format
          const parts = dateString.split('-');
          if (parts.length === 3) {
            return dateString.substring(0, 10); // Just take first 10 chars if it looks like a date
          }
        }
        return dateString || "-";
      }
    } catch (e) {
      console.error("Error parsing date:", e, dateString);
      return dateString || "-";
    }
  };
 // Update your filteredData logic in CasesContent.jsx:
// Update your filteredData logic
const filteredData = casesData.filter(item => {
  if (!item) return false;
  
  // Apply date range filter only if dates are set and not coming from literature review
  let passesDateFilter = true;
  
  if (!isFromLiteratureReview && dateRange.startDate && dateRange.endDate && item['Validation Processing Date']) {
    const rawDate = item['Validation Processing Date'];
    const parsedDate = parseDate(rawDate);
    
    if (parsedDate) {
      passesDateFilter = parsedDate >= dateRange.startDate && parsedDate <= dateRange.endDate;
    } else {
      passesDateFilter = false;
    }
  }
  
  if (!passesDateFilter) return false;
  
  // Apply search filter with special handling for email
  const searchLower = searchTerm.toLowerCase();
  if (!searchTerm) return true;
  
  // First priority: exact match on email field
  if (item.mail && item.mail.toLowerCase() === searchLower) {
    return true;
  }
  
  // Second priority: partial match on any field
  return Object.entries(item).some(([key, value]) => {
    if (value && typeof value === 'string') {
      return value.toLowerCase().includes(searchLower);
    }
    return false;
  });
});
// Also update the Date Range Pills display to show the correct column name


  // Pagination for the main table
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Helper function to truncate text
  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Function to render status buttons for a row
// Function to render status buttons for a row
// Find the row by id instead of by index
const renderStatusButtons = (row) => {
  // Use the row data directly instead of accessing by index
  const isUpdating = statusUpdating === row['Article pmid'] || statusUpdating === row.id;
  const currentStatus = row ? row['Status'] : '';
  
  // Don't show action buttons if status is 'Verified' or 'Approved'
  if (currentStatus === 'Verified' || currentStatus === 'Approved') {
    return (
      <div className="flex space-x-2 items-center">
        <span className={`text-xs px-2 py-1 rounded-full ${
          currentStatus === 'Verified' ? 'bg-blue-100 text-blue-800' : 
          'bg-green-100 text-green-800'
        }`}>
          {currentStatus}
        </span>
      </div>
    );
  }
  
  // Show buttons only for Pending or Checking status
  return (
    <div className="flex space-x-2 items-center">
      {currentStatus && (
        <span className={`text-xs px-2 py-1 rounded-full ${
          currentStatus === 'Checking' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {currentStatus}
        </span>
      )}
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
            // Use the row's unique identifier instead of index
            handleStatusUpdate(row['Article pmid'] || row.id, 'Approved');
          }
        }}
        disabled={isUpdating}
        className="px-2 py-1 text-xs rounded-full flex items-center transition-all duration-300 bg-green-500 text-white hover:bg-green-600 hover:shadow-md"
      >
        <CheckCircle size={12} className="mr-1" /> Approve
      </button>
      <button
        onClick={() => handleStatusUpdate(row['Article pmid'] || row.id, 'Checking')}
        disabled={isUpdating || currentStatus === 'Checking'}
        className={`px-2 py-1 text-xs rounded-full flex items-center transition-all duration-300 ${
          currentStatus === 'Checking' 
            ? 'bg-yellow-100 text-yellow-800 opacity-50 cursor-not-allowed' 
            : 'bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-md'
        }`}
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#14242c]">Cases</h1>
        <p className="text-[#1a4e6a] mt-2">View and manage cases data</p>
      </div>
      
      {/* Controls bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        {/* Search bar */}
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
        
        {/* Date filter & Edit buttons */}
        <div className="flex space-x-3">
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
                      onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#14242c] mb-1">End Date</label>
                    <input 
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
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
                        setCurrentPage(1); // Reset to first page when filtering
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
          
          {!editMode ? (
            <button 
              onClick={() => setEditMode(true)} 
              className="flex items-center bg-[#1483b9] text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
            >
              <Edit size={16} className="mr-2" /> Bulk Edit
            </button>
          ) : (
            <button 
              onClick={handleSave} 
              className="flex items-center bg-green-500 text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-green-600 hover:shadow-md"
            >
              <Save size={16} className="mr-2" /> Save All
            </button>
          )}
          
          <button 
            onClick={fetchCasesData}
            className="flex items-center bg-gray-200 text-[#14242c] px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-300"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>
      
      {/* Date Range Pills */}
      {/* Date Range Pills - Only show if date range is actually set */}
{/* Add this near your date filter UI */}
{(dateRange.startDate && dateRange.endDate) && (
  <div className="mb-4 flex items-center">
    <span className="text-sm text-[#1a4e6a] mr-2">Filtered by Validation Processing Date:</span>
    <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
      <Calendar size={12} className="mr-1" />
      {dateRange.startDate} to {dateRange.endDate}
    </div>
{/* Update the clear filter button */}
<button 
  onClick={() => setDateRange({ startDate: '', endDate: '' })}
  className="ml-2 text-xs bg-[#1483b9] text-white px-2 py-1 rounded-md hover:bg-[#143b50] flex items-center transition-all duration-300"
>
  <X size={12} className="mr-1" /> Clear filter
</button>
  </div>
)}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-[#1483b9] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#14242c]">Loading cases data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Table with fixed action column */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#14242c] text-white sticky top-0 z-10">
                  <tr>
                    {casesData.length > 0 && Object.keys(casesData[0]).map((col, idx) => (
                      col !== 'Status' && (
                        <th key={idx} className="px-4 py-3 text-left font-medium text-xs whitespace-nowrap" style={{ minWidth: '180px' }}>
                          {col}
                        </th>
                      )
                    ))}
                    <th className="px-4 py-3 text-left font-medium text-xs whitespace-nowrap bg-[#143b50] sticky right-0 shadow-l" style={{ minWidth: '200px' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                {currentItems.map((row, rowIndex) => {
  const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
  const actualRow = editedCasesData.find(item => 
    item['Article pmid'] === row['Article pmid'] || 
    item.id === row.id
  ) || row;
  return (
    <tr key={rowIndex} className="hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150">
      {Object.entries(row).map(([key, val], colIndex) => {
        // Skip rendering the Status column
        if (key === 'Status') return null;
        
        return (
          <td 
            key={colIndex} 
            className={`px-4 py-3 text-xs ${
              key === 'Article pmid' ? 'font-medium text-[#143b50]' : 
              editMode ? 'p-0' : 'truncate hover:bg-gray-100 transition-colors duration-150'
            }`}
            onClick={() => !editMode && key !== 'Article pmid' && handleCellClick(actualRowIndex, colIndex, val)}
            title={!editMode && key !== 'Article pmid' ? "Click to view full content" : ""}
            style={{ minWidth: '180px', maxWidth: '180px' }}
          >
            {editMode && key !== 'Article pmid' ? (
              <textarea
                value={editedCasesData[actualRowIndex][key] || ''}
                onChange={(e) => handleCellChange(actualRowIndex, key, e.target.value)}
                className="w-full h-full min-h-[40px] p-2 border border-[#1483b9] focus:outline-none focus:ring-2 focus:ring-[#1483b9] text-xs"
              />
            ) : (
              truncateText(val, 25) || ''
            )}
          </td>
        );
      })}

<td className="px-4 py-3 bg-white sticky right-0 shadow-l" style={{ minWidth: '200px' }}>
  <div className="flex items-center space-x-2">
    <button
      onClick={() => openEditForm(row)}
      className="flex items-center justify-center w-8 h-8 bg-[#1483b9] text-white rounded-full transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
      title="Edit this record"
    >
      <Edit size={14} />
    </button>
    {/* Use the actual row index from the current page to render status buttons */}
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

          {/* Pagination */}
          {filteredData.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-[#1a4e6a]">
                Showing page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {/* Pagination buttons */}
                {(() => {
                  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
                  let pagesToShow = [];
                  
                  if (totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
                  } else {
                    // Complex logic for longer pagination
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
                      return <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>;
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
                  disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Full Content Modal */}
      {expandedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto shadow-2xl animate-scale-in">
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
      
      {/* Edit Form Modal */}
    {/* Edit Form Modal - Improved Design */}
{isFormVisible && editingRowIndex !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl animate-scale-in flex flex-col max-h-[90vh]">
      {/* Header */}
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
      
      {/* Form content - scrollable */}
      <div className="overflow-y-auto p-6 flex-grow" style={{maxHeight: "calc(90vh - 150px)"}}>
        {/* Case ID Banner */}
        {formData['Article pmid'] && (
          <div className="mb-6 bg-[#1a4e6a] bg-opacity-10 p-3 rounded-md border-l-4 border-[#1a4e6a] flex items-center">
            <span className="font-semibold text-[#1a4e6a] mr-2">Case ID:</span>
            <span className="text-[#143b50]">{formData['Article pmid']}</span>
            <span className="ml-auto px-2 py-1 text-xs bg-[#1a4e6a] text-white rounded-md">
              {formData['Status'] || 'No Status'}
            </span>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {Object.entries(formData).map(([key, value]) => {
  // Skip these fields as they're handled separately
  if (key === 'Status' || key === 'Article pmid') return null;
  
  // Check if this is a date field
  const isDateField = key.toLowerCase().includes('date');
  const isReadOnly = formData['Status'] === 'Verified' || formData['Status'] === 'Approved';
  
  return (
    <div key={key} className={`${
      key.toLowerCase().includes('description') || 
      key.toLowerCase().includes('notes') || 
      key.toLowerCase().includes('abstract') ? 
      'col-span-1 md:col-span-2' : ''
    }`}>
      <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
        {isDateField && <Calendar size={14} className="mr-1 text-[#1483b9]" />}
        {key}
      </label>
      <textarea
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1483b9] ${
          isDateField ? 'border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5' : 'border-gray-300'
        } ${
          key.toLowerCase().includes('description') || 
          key.toLowerCase().includes('notes') || 
          key.toLowerCase().includes('abstract') ? 
          'min-h-[120px]' : 'min-h-[60px]'
        } ${
          isReadOnly ? 'bg-gray-50 opacity-80' : ''
        }`}
        value={value || ''}
        onChange={(e) => handleFormChange(key, e.target.value)}
        readOnly={isReadOnly}
      />
    </div>
  );
})}
        </div>
      </div>
      
      {/* Status and action buttons - fixed at bottom */}
      <div className="border-t border-gray-200 p-5 bg-gray-50 rounded-b-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status section */}
{/* Status section */}
<div className="flex-grow">
  <h4 className="font-medium text-[#14242c] mb-3 text-sm">Case Status</h4>
  <div className="flex flex-wrap gap-2">
    {formData['Status'] === 'Verified' ? (
      <div className="px-3 py-2 text-sm rounded-md flex items-center bg-blue-100 text-blue-800 border border-blue-200">
        <CheckCircle size={14} className="mr-2" /> 
        Verified (No changes allowed)
      </div>
    ) : (
      <>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
              handleFormChange('Status', 'Approved');
            }
          }}
          disabled={formData['Status'] === 'Approved'}
          className={`px-3 py-2 text-sm rounded-md flex items-center transition-all duration-300 ${
            formData['Status'] === 'Approved' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md'
          }`}
        >
          <CheckCircle size={14} className="mr-2" /> 
          {formData['Status'] === 'Approved' ? 'Approved' : 'Approve'}
        </button>
        
        <button
          onClick={() => handleFormChange('Status', 'Checking')}
          disabled={formData['Status'] === 'Checking'}
          className={`px-3 py-2 text-sm rounded-md flex items-center transition-all duration-300 ${
            formData['Status'] === 'Checking' 
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
              : 'bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-md'
          }`}
        >
          <Clock size={14} className="mr-2" /> 
          {formData['Status'] === 'Checking' ? 'Checking' : 'Mark as Checking'}
        </button>
      </>
    )}
    
    {/* Show current status pill */}
    {formData['Status'] && (
      <div className="flex items-center ml-auto md:ml-2 px-3 py-2 text-sm bg-gray-100 rounded-md">
        <span className="mr-2 text-gray-500">Current:</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          formData['Status'] === 'Approved' ? 'bg-green-100 text-green-800' :
          formData['Status'] === 'Checking' ? 'bg-yellow-100 text-yellow-800' :
          formData['Status'] === 'Verified' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-200 text-gray-800'
        }`}>
          {formData['Status']}
        </span>
      </div>
    )}
  </div>
</div>
          
          {/* Form actions */}
          <div className="flex space-x-3 items-center md:border-l md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 mt-3 md:mt-0">
            <button
              onClick={closeForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveForm}
              disabled={isSaving}
              className="px-4 py-2 bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] transition-colors disabled:opacity-70 flex items-center"
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
    </div>
  </div>
)}
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideOut {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(20px); opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slideOut 0.3s ease-out;
        }
        
        /* Custom shadows */
        .shadow-l {
          box-shadow: -4px 0 8px -2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CasesContent;