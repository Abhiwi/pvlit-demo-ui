// // import React, { useEffect, useState } from 'react';
// // import { ChevronLeft, ChevronRight, Search, CheckCircle, Edit, Save, ArrowLeft, X, FileEdit, Upload, Check } from 'lucide-react';
// // import DatabaseService from '../services/DatabaseService';
// // import axios from 'axios'; // Added import for axios

// // // Define API_BASE_URL
// // const API_BASE_URL = process.env.NODE_ENV === 'production'
// //   ? '/api'
// //   : process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// // const UploadDocContent = () => {
// //   const [literatureData, setLiteratureData] = useState([]);
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// //   const [editingRecord, setEditingRecord] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [statusUpdating, setStatusUpdating] = useState(null);
// //   const [expandedCell, setExpandedCell] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [selectedFile, setSelectedFile] = useState(null);

// //   const itemsPerPage = 10;

// //   // Fetch all literature review data
// //   const fetchLiteratureData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const data = await DatabaseService.fetchLiteratureReviews();
      
// //       // Debug: Check the structure of the first item
// //       if (data.length > 0) {
// //         console.log("First item fields:", Object.keys(data[0]));
// //         console.log("First item sample:", data[0]);
// //       }
      
// //       // Filter for ONLY "Article Access" with value "Credentials Required"
// //       const filteredData = data.filter(item => {
// //         const articleAccess = item['Article Access'] || '';
// //         return articleAccess === 'Credentials Required';
// //       });
      
// //       console.log(`Filtered ${filteredData.length} records out of ${data.length} total records`);
      
// //       setLiteratureData(filteredData);
// //       setFilteredData(filteredData);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("Error fetching literature data:", err);
// //       setError("Failed to load literature data. Please try again later.");
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLiteratureData();
// //   }, []);

// //   // Apply search filter
// //   useEffect(() => {
// //     if (!literatureData.length) return;
    
// //     if (searchTerm) {
// //       const searchLower = searchTerm.toLowerCase();
// //       const searchResults = literatureData.filter(item => {
// //         return Object.entries(item).some(([key, val]) => {
// //           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
// //         });
// //       });
// //       setFilteredData(searchResults);
// //     } else {
// //       setFilteredData(literatureData);
// //     }
// //   }, [searchTerm, literatureData]);

// //   // Function to handle approval status update
// //   const handleStatusUpdate = async (rowIndex, newStatus) => {
// //     try {
// //       // Get the row data
// //       const row = filteredData[rowIndex];
// //       const recordId = row['Article PMID'];
      
// //       if (!recordId) {
// //         console.error("Row missing Article PMID:", row);
// //         alert("Cannot update status: missing Article PMID identifier");
// //         return;
// //       }
      
// //       // Set status updating indicator for this row
// //       setStatusUpdating(rowIndex);
      
// //       // Update the status field locally first (optimistic update)
// //       const updatedData = [...filteredData];
// //       updatedData[rowIndex] = { ...updatedData[rowIndex], Status: newStatus };
// //       setFilteredData(updatedData);
      
// //       // Create updated record object with the new status
// //       const updatedRecord = { ...row, Status: newStatus };
      
// //       // Send the update to the server
// //       console.log(`Updating status for Article PMID ${recordId} to "${newStatus}"`);
// //       await DatabaseService.updateLiteratureReview(recordId, updatedRecord);
      
// //       // Show feedback
// //       alert(`Record marked as "${newStatus}" successfully`);
      
// //       // Refresh data to ensure we have the latest version
// //       fetchLiteratureData();
      
// //     } catch (err) {
// //       console.error("Error updating status:", err);
// //       alert(`Failed to update status: ${err.message}`);
// //       fetchLiteratureData();
// //     } finally {
// //       setStatusUpdating(null);
// //     }
// //   };

// //   // Open record in form view for editing
// //   const handleEditRow = (rowIndex) => {
// //     const rowData = filteredData[rowIndex];
// //     setEditingRecord(rowData);
// //     setSelectedFile(null); // Reset selected file when opening edit modal
// //   };

// //   // Handle file selection
// //   const handleFileChange = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setSelectedFile(e.target.files[0]);
// //     }
// //   };

// //   // Upload document and save edited record
// // // Upload document and save edited record
// // // // Upload document only
// // // const handleSaveRecord = async () => {
// // //   try {
// // //     setLoading(true);
// // //     const recordId = editingRecord['Article PMID']; // Match database column name
// // //     if (!recordId) {
// // //       throw new Error("Missing Article PMID identifier");
// // //     }
    
// // //     // Handle file upload if a file was selected
// // //     if (selectedFile) {
// // //       try {
// // //         // Create FormData to send file and Article PMID
// // //         const formData = new FormData();
// // //         formData.append('file', selectedFile);
// // //         formData.append('articlePMID', recordId);
        
// // //         // Send the file to the backend
// // //         const response = await axios.post(`${API_BASE_URL}/upload-document`, formData, {
// // //           headers: {
// // //             'Content-Type': 'multipart/form-data'
// // //           }
// // //         });
// // //         const documentUrl = response.data.fileUrl;
// // //         console.log("Document uploaded successfully:", documentUrl);
        
// // //         // Show feedback
// // //         alert("Document uploaded successfully");
// // //       } catch (uploadErr) {
// // //         console.error("Error uploading document:", uploadErr);
// // //         throw new Error(`Document upload failed: ${uploadErr.message}`);
// // //       }
// // //     } else {
// // //       alert("No file selected for upload");
// // //     }
    
// // //     // Clear editing state
// // //     setEditingRecord(null);
// // //     setSelectedFile(null);
    
// // //     // Refresh data (optional, if you want to show updated table)
// // //     fetchLiteratureData();
// // //   } catch (err) {
// // //     console.error("Error uploading document:", err);
// // //     alert(`Failed to upload document: ${err.message}`);
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };
// // const handleSaveRecord = async () => {
// //   try {
// //     setLoading(true);
// //     const recordId = editingRecord['Article PMID'];
// //     if (!recordId) {
// //       throw new Error("Missing Article PMID identifier");
// //     }

// //     // Handle file upload if a file was selected
// //     if (selectedFile) {
// //       try {
// //         // Create FormData to send file and Article PMID
// //         const formData = new FormData();
// //         formData.append('file', selectedFile);
// //         formData.append('articlePMID', recordId);

// //         // Send the file to the backend
// //         const response = await axios.post(`${API_BASE_URL}/upload-document`, formData, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data'
// //           }
// //         });
// //         const documentUrl = response.data.fileUrl;
// //         console.log("Document uploaded successfully:", documentUrl);

// //         // Update filteredData to reflect the uploaded document
// //   // Update filteredData to reflect the new status (optional, as fetchLiteratureData will refresh)
// //   setFilteredData(prevData =>
// //   prevData.map(item =>
// //     item['Article PMID'] === recordId
// //       ? {
// //           ...item,
// //           Status: 'Document Uploaded' // Optimistically update status
// //         }
// //       : item
// //   )
// // );

// //         // Show feedback
// //         alert("Document uploaded successfully");
// //       } catch (uploadErr) {
// //         console.error("Error uploading document:", uploadErr);
// //         throw new Error(`Document upload failed: ${uploadErr.message}`);
// //       }
// //     } else {
// //       alert("No file selected for upload");
// //     }

// //     // Clear editing state
// //     setEditingRecord(null);
// //     setSelectedFile(null);

// //     // Optionally refresh data from the server (if you want to ensure consistency)
// //     // fetchLiteratureData();
// //   } catch (err) {
// //     console.error("Error uploading document:", err);
// //     alert(`Failed to upload document: ${err.message}`);
// //   } finally {
// //     setLoading(false);
// //   }
// // };
// //   // Handle field change in the edit form
// //   const handleFieldChange = (field, value) => {
// //     setEditingRecord(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
// //     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
// //   };

// //   const closeExpandedCell = () => {
// //     setExpandedCell(null);
// //   };

// //   // Format dates function with better error handling
// //   const formatDate = (dateString) => {
// //     if (!dateString) return "-";
    
// //     try {
// //       const date = new Date(dateString);
      
// //       if (date instanceof Date && !isNaN(date.getTime())) {
// //         return date.toISOString().split('T')[0];
// //       } else if (typeof dateString === 'string' && dateString.includes('-')) {
// //         const parts = dateString.split('-');
// //         if (parts.length === 3) {
// //           return dateString.substring(0, 10);
// //         }
// //       }
// //       return dateString || "-";
// //     } catch (e) {
// //       console.error("Error parsing date:", e, dateString);
// //       return dateString || "-";
// //     }
// //   };

// //   // Find any date field in an object
// //   const findDateField = (item) => {
// //     if (!item) return null;
    
// //     const dateKey = Object.keys(item).find(key => 
// //       key.toLowerCase().includes('validation') && 
// //       key.toLowerCase().includes('date')
// //     );
    
// //     return dateKey ? item[dateKey] : null;
// //   };

// //   // Helper function to truncate text
// //   const truncateText = (text, maxLength = 30) => {
// //     if (!text) return "";
// //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// //   };

// //   // Get paginated items
// //   const currentItems = filteredData.slice(
// //     (currentPage - 1) * itemsPerPage, 
// //     currentPage * itemsPerPage
// //   );

// //   // Function to render status buttons for a row
// //   const renderStatusButtons = (rowIndex) => {
// //     const isUpdating = statusUpdating === rowIndex;
// //     const currentStatus = filteredData[rowIndex].Status || '';
// //     const isApproved = currentStatus === 'Approved';
// //     const isChecking = currentStatus === 'Checking';
    
// //     return (
// //       <div className="flex space-x-1">
// //         <button
// //           onClick={() => {
// //             if (window.confirm('Are you sure you want to mark this entry as approved?')) {
// //               handleStatusUpdate(rowIndex, 'Approved');
// //             }
// //           }}
// //           disabled={isUpdating || isApproved}
// //           className={`px-2 py-1 text-xs rounded flex items-center ${
// //             isApproved
// //               ? 'bg-green-100 text-green-800 cursor-not-allowed'
// //               : 'bg-green-500 text-white hover:bg-green-600'
// //           }`}
// //         >
// //           <Check size={12} className="mr-1" /> 
// //           {isApproved ? 'Approved' : 'Approve'}
// //         </button>
        
// //         <button
// //           onClick={() => {
// //             if (window.confirm('Are you sure you want to mark this entry as checking?')) {
// //               handleStatusUpdate(rowIndex, 'Checking');
// //             }
// //           }}
// //           disabled={isUpdating || isChecking}
// //           className={`px-2 py-1 text-xs rounded flex items-center ${
// //             isChecking
// //               ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
// //               : 'bg-yellow-500 text-white hover:bg-yellow-600'
// //           }`}
// //         >
// //           <CheckCircle size={12} className="mr-1" /> 
// //           {isChecking ? 'Checking' : 'Checking'}
// //         </button>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-white p-8">
// //       {/* Edit Form Modal */}
// //       {editingRecord && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="text-lg font-bold">Edit Record & Upload Document</h3>
// //               <button 
// //                 onClick={() => setEditingRecord(null)} 
// //                 className="text-gray-500 hover:text-gray-700"
// //               >
// //                 <X size={20} />
// //               </button>
// //             </div>
            
// //             {/* Document Upload Section */}
// // {/* Document Upload Section */}
// // <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
// //   <h4 className="text-md font-medium mb-2 text-blue-800">Upload Article Document</h4>
  
// //   {editingRecord.Status === 'Document Uploaded' && (
// //     <div className="mb-3 p-2 bg-blue-100 rounded">
// //       <p className="text-xs text-blue-800">Document Status: Uploaded</p>
// //     </div>
// //   )}
  
// //   <div className="flex items-center">
// //     <label className="flex flex-col items-center px-4 py-3 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-500 hover:text-white">
// //       <Upload size={24} />
// //       <span className="mt-2 text-xs leading-normal">Select document</span>
// //       <input 
// //         type="file" 
// //         className="hidden" 
// //         onChange={handleFileChange}
// //         accept=".pdf,.doc,.docx"
// //       />
// //     </label>
// //     {selectedFile && (
// //       <div className="ml-3 text-sm text-gray-700">
// //         <p className="font-medium">{selectedFile.name}</p>
// //         <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
// //       </div>
// //     )}
// //   </div>
// // </div>
            
// //             {/* Record Fields */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               {editingRecord && Object.entries(editingRecord).map(([key, value], index) => {
// //                 // Skip document fields as they're handled in the upload section
// //                 if (key === 'Document URL' || key === 'Document Upload Date') return null;
                
// //                 return (
// //                   <div key={index} className="mb-3">
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
// //                     {key === 'Status' ? (
// //                       <div className="text-sm py-2 px-3 bg-gray-100 rounded">
// //                         {value || 'Not set'}
// //                       </div>
// //                     ) : (
// //                       <textarea
// //                         className="w-full p-2 border rounded-md text-sm"
// //                         rows={key === 'Title' || key === 'abstract' ? 4 : 2}
// //                         value={value || ''}
// //                         onChange={(e) => handleFieldChange(key, e.target.value)}
// //                       />
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //             </div>
            
// //             <div className="flex justify-end mt-4">
// //               <button
// //                 onClick={() => setEditingRecord(null)}
// //                 className="mr-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleSaveRecord}
// //                 className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
// //               >
// //                 <Save size={16} className="mr-1" />
// //                 Save Changes
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Main Content */}
// //       <div className="mb-8">
// //         <h1 className="text-1xl font-bold text-[#15212d]">Document Upload Manager</h1>
// //         <p className="text-black-600 mt-2">Manage articles requiring credentials and upload supporting documents</p>
// //       </div>
      
// //       <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// //         <Search size={20} className="text-gray-500 mr-2" />
// //         <input
// //           type="text"
// //           placeholder="Search records..."
// //           className="bg-transparent border-none outline-none w-full"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </div>

// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //           <p>{error}</p>
// //         </div>
// //       )}

// //       {expandedCell && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="text-lg font-medium">{expandedCell.columnName}</h3>
// //               <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// //                 <X size={20} />
// //               </button>
// //             </div>
// //             <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// //               {expandedCell.value || ""}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// //         </div>
// //       ) : (
// //         <>
// //           {filteredData.length === 0 ? (
// //             <div className="bg-white rounded-lg shadow p-6 text-center">
// //               <p className="text-gray-600">No records found requiring credentials.</p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="overflow-auto max-h-[75vh]">
// //                 <table className="w-full border border-gray-300 text-sm">
// //                   <thead className="bg-[#15212d] text-white sticky top-0">
// //                     <tr>
// //                       <th className="border px-4 py-3 text-left font-medium text-xs">Date</th>
// //                       <th className="border px-4 py-3 text-left font-medium text-xs">EMail</th>
// //                       <th className="border px-4 py-3 text-left font-medium text-xs">Title</th>
// //                       <th className="border px-4 py-3 text-left font-medium text-xs">Article Access</th>
// //                       <th className="border px-4 py-3 text-left font-medium text-xs">Document</th>
// //                       <th className="border px-4 py-3 text-left font-medium text-xs">Status</th>
// //                       <th className="border px-4 py-3 text-left font-medium text-xs">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {currentItems.map((row, rowIndex) => {
// //                       const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
// //                       const dateValue = findDateField(row);
// //                       const isApproved = (row.Status || '') === 'Approved';
// //                       const hasDocument = Boolean(row['Document URL']);
                      
// //                       return (
// //                         <tr key={rowIndex} className={`hover:bg-gray-50 ${isApproved ? 'bg-green-50' : ''}`}>
// //                           <td className="border px-4 py-2 text-xs">
// //                             {formatDate(dateValue)}
// //                           </td>
// //                           <td 
// //                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// //                             onClick={() => handleCellClick(actualRowIndex, 1, row.Mail, 'EMail')}
// //                           >
// //                             {truncateText(row.Mail, 25) || ''}
// //                           </td>
// //                           <td 
// //                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// //                             onClick={() => handleCellClick(actualRowIndex, 2, row.Title, 'Title')}
// //                           >
// //                             {truncateText(row.Title, 25) || ''}
// //                           </td>
// //                           <td className="border px-4 py-2 text-xs">
// //                             {row['Article Access'] || ''}
// //                           </td>
// //                           <td className="border px-4 py-2 text-xs">
// //   {row.Status === 'Document Uploaded' ? (
// //     <span className="text-green-600 flex items-center">
// //       <Upload size={12} className="mr-1" />
// //       Uploaded
// //     </span>
// //   ) : (
// //     <span className="text-red-500">Not uploaded</span>
// //   )}
// // </td>
// //                           <td className="border px-4 py-2 text-xs font-medium">
// //                             <span className={
// //                               row.Status === 'Approved' ? 'text-green-700' : 
// //                               row.Status === 'Checking' ? 'text-yellow-700' : 
// //                               'text-gray-700'
// //                             }>
// //                               {row.Status || 'Not set'}
// //                             </span>
// //                           </td>
// //                           <td className="border px-4 py-2 text-xs">
// //                             <div className="flex space-x-2 items-center">
// //                               {renderStatusButtons(actualRowIndex)}
// //                               <button
// //                                 onClick={() => handleEditRow(actualRowIndex)}
// //                                 className="px-2 py-1 text-xs rounded flex items-center bg-blue-500 text-white hover:bg-blue-600"
// //                                 title="Edit record and upload document"
// //                               >
// //                                 <FileEdit size={12} className="mr-1" /> Edit
// //                               </button>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {filteredData.length > itemsPerPage && (
// //                 <div className="flex justify-between items-center mt-6">
// //                   <div className="text-sm text-gray-700">
// //                     Showing page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// //                   </div>
// //                   <div className="flex space-x-1">
// //                     <button
// //                       onClick={() => setCurrentPage(currentPage - 1)}
// //                       disabled={currentPage === 1}
// //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// //                     >
// //                       <ChevronLeft size={16} />
// //                     </button>
// //                     {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
// //                       // Show pages around current page
// //                       let pageToShow;
// //                       if (Math.ceil(filteredData.length / itemsPerPage) <= 5) {
// //                         pageToShow = i + 1;
// //                       } else {
// //                         const middle = Math.min(
// //                           Math.max(currentPage, 3),
// //                           Math.ceil(filteredData.length / itemsPerPage) - 2
// //                         );
// //                         pageToShow = middle - 2 + i;
// //                       }
                      
// //                       if (pageToShow > 0 && pageToShow <= Math.ceil(filteredData.length / itemsPerPage)) {
// //                         return (
// //                           <button
// //                             key={i}
// //                             onClick={() => setCurrentPage(pageToShow)}
// //                             className={`px-3 py-1 rounded-md ${currentPage === pageToShow ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// //                           >
// //                             {pageToShow}
// //                           </button>
// //                         );
// //                       }
// //                       return null;
// //                     })}
// //                     <button
// //                       onClick={() => setCurrentPage(currentPage + 1)}
// //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// //                     >
// //                       <ChevronRight size={16} />
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default UploadDocContent;
// import React, { useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight, Search, CheckCircle, Edit, Save, X, FileEdit, Upload, Check } from 'lucide-react';
// import DatabaseService from '../services/DatabaseService';
// import axios from 'axios';

// const API_BASE_URL = process.env.NODE_ENV === 'production'
//   ? '/api'
//   : process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// const UploadDocContent = () => {
//   const [literatureData, setLiteratureData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [editingRecord, setEditingRecord] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusUpdating, setStatusUpdating] = useState(null);
//   const [expandedCell, setExpandedCell] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const itemsPerPage = 10;

//   // Fetch all literature review data
//   const fetchLiteratureData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await DatabaseService.fetchLiteratureReviews();
      
//       if (data.length > 0) {
//         console.log("First item fields:", Object.keys(data[0]));
//         console.log("First item sample:", data[0]);
//       }
      
//       // Filter for ONLY "Article Access" with value "Credentials Required"
//       const filteredData = data.filter(item => item['Article Access'] === 'Credentials Required');
      
//       console.log(`Filtered ${filteredData.length} records out of ${data.length} total records`);
      
//       setLiteratureData(filteredData);
//       setFilteredData(filteredData);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching literature data:", err);
//       setError("Failed to load literature data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLiteratureData();
//   }, []);

//   // Apply search filter
//   useEffect(() => {
//     if (!literatureData.length) return;
    
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       const searchResults = literatureData.filter(item => {
//         return Object.entries(item).some(([key, val]) => {
//           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
//         });
//       });
//       setFilteredData(searchResults);
//     } else {
//       setFilteredData(literatureData);
//     }
//   }, [searchTerm, literatureData]);

//   // Function to handle approval status update
//   const handleStatusUpdate = async (rowIndex, newStatus) => {
//     try {
//       const row = filteredData[rowIndex];
//       const recordId = row['Article PMID'];
//       const drugName = row['Drug'];
      
//       if (!recordId || !drugName) {
//         console.error("Row missing Article PMID or Drug:", row);
//         alert("Cannot update status: missing Article PMID or Drug identifier");
//         return;
//       }
      
//       setStatusUpdating(rowIndex);
      
//       // Optimistic update
//       const updatedData = [...filteredData];
//       updatedData[rowIndex] = { ...updatedData[rowIndex], Status: newStatus };
//       setFilteredData(updatedData);
      
//       const updatedRecord = { ...row, Status: newStatus };
      
//       console.log(`Updating status for Article PMID ${recordId}, Drug ${drugName} to "${newStatus}"`);
//       await DatabaseService.updateLiteratureReview(recordId, updatedRecord, { drug: drugName });
      
//       alert(`Record marked as "${newStatus}" successfully`);
//       fetchLiteratureData();
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert(`Failed to update status: ${err.message}`);
//       fetchLiteratureData();
//     } finally {
//       setStatusUpdating(null);
//     }
//   };

//   // Open record in form view for editing
//   const handleEditRow = (rowIndex) => {
//     const rowData = filteredData[rowIndex];
//     setEditingRecord(rowData);
//     setSelectedFile(null);
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   // Upload document and update status in backend
//   const handleSaveRecord = async () => {
//     try {
//       setLoading(true);
//       const recordId = editingRecord['Article PMID'];
//       const drugName = editingRecord['Drug'];
//       if (!recordId || !drugName) {
//         throw new Error("Missing Article PMID or Drug identifier");
//       }

//       // Handle file upload if a file was selected
//       if (selectedFile) {
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         formData.append('articlePMID', recordId);
//         formData.append('drugName', drugName);

//         // Upload file to backend
//         const response = await axios.post(`${API_BASE_URL}/upload-document`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         const documentUrl = response.data.fileUrl;
//         console.log("Document uploaded successfully:", documentUrl);

//         // Optimistic update for UI
//         setFilteredData(prevData =>
//           prevData.map(item =>
//             item['Article PMID'] === recordId && item['Drug'] === drugName
//               ? { ...item, Status: 'Document Uploaded' }
//               : item
//           )
//         );

//         // Update status in backend explicitly
//         const updatedRecord = { ...editingRecord, Status: 'Document Uploaded' };
//         await DatabaseService.updateLiteratureReview(recordId, updatedRecord, { drug: drugName });

//         alert("Document uploaded and status updated successfully");
//       } else {
//         alert("No file selected for upload");
//       }

//       setEditingRecord(null);
//       setSelectedFile(null);
//       fetchLiteratureData();
//     } catch (err) {
//       console.error("Error uploading document or updating status:", err);
//       alert(`Failed to upload document or update status: ${err.message}`);
//       fetchLiteratureData();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle field change in the edit form
//   const handleFieldChange = (field, value) => {
//     setEditingRecord(prev => ({ ...prev, [field]: value }));
//   };

//   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
//     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
//   };

//   const closeExpandedCell = () => {
//     setExpandedCell(null);
//   };

//   // Format dates function
//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     try {
//       const date = new Date(dateString);
//       if (date instanceof Date && !isNaN(date.getTime())) {
//         return date.toISOString().split('T')[0];
//       } else if (typeof dateString === 'string' && dateString.includes('-')) {
//         return dateString.substring(0, 10);
//       }
//       return dateString || "-";
//     } catch (e) {
//       console.error("Error parsing date:", e, dateString);
//       return dateString || "-";
//     }
//   };

//   // Find any date field
//   const findDateField = (item) => {
//     if (!item) return null;
//     const dateKey = Object.keys(item).find(key => 
//       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
//     );
//     return dateKey ? item[dateKey] : null;
//   };

//   // Truncate text
//   const truncateText = (text, maxLength = 30) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
//   };

//   // Get paginated items
//   const currentItems = filteredData.slice(
//     (currentPage - 1) * itemsPerPage, 
//     currentPage * itemsPerPage
//   );

//   // Render status buttons
//   const renderStatusButtons = (rowIndex) => {
//     const isUpdating = statusUpdating === rowIndex;
//     const currentStatus = filteredData[rowIndex].Status || '';
//     const isApproved = currentStatus === 'Approved';
//     const isChecking = currentStatus === 'Checking';
    
//     return (
//       <div className="flex space-x-1">
//         <button
//           onClick={() => {
//             if (window.confirm('Are you sure you want to mark this entry as approved?')) {
//               handleStatusUpdate(rowIndex, 'Approved');
//             }
//           }}
//           disabled={isUpdating || isApproved}
//           className={`px-2 py-1 text-xs rounded flex items-center ${
//             isApproved
//               ? 'bg-green-100 text-green-800 cursor-not-allowed'
//               : 'bg-green-500 text-white hover:bg-green-600'
//           }`}
//         >
//           <Check size={12} className="mr-1" /> 
//           {isApproved ? 'Approved' : 'Approve'}
//         </button>
//         <button
//           onClick={() => {
//             if (window.confirm('Are you sure you want to mark this entry as checking?')) {
//               handleStatusUpdate(rowIndex, 'Checking');
//             }
//           }}
//           disabled={isUpdating || isChecking}
//           className={`px-2 py-1 text-xs rounded flex items-center ${
//             isChecking
//               ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
//               : 'bg-yellow-500 text-white hover:bg-yellow-600'
//           }`}
//         >
//           <CheckCircle size={12} className="mr-1" /> 
//           {isChecking ? 'Checking' : 'Checking'}
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white p-8">
//       {/* Edit Form Modal */}
//       {editingRecord && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold">Edit Record & Upload Document</h3>
//               <button 
//                 onClick={() => setEditingRecord(null)} 
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             {/* Document Upload Section */}
//             <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <h4 className="text-md font-medium mb-2 text-blue-800">Upload Article Document</h4>
//               {editingRecord.Status === 'Document Uploaded' && (
//                 <div className="mb-3 p-2 bg-blue-100 rounded">
//                   <p className="text-xs text-blue-800">Document Status: Uploaded</p>
//                 </div>
//               )}
//               <div className="flex items-center">
//                 <label className="flex flex-col items-center px-4 py-3 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-500 hover:text-white">
//                   <Upload size={24} />
//                   <span className="mt-2 text-xs leading-normal">Select document</span>
//                   <input 
//                     type="file" 
//                     className="hidden" 
//                     onChange={handleFileChange}
//                     accept=".pdf,.doc,.docx"
//                   />
//                 </label>
//                 {selectedFile && (
//                   <div className="ml-3 text-sm text-gray-700">
//                     <p className="font-medium">{selectedFile.name}</p>
//                     <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Record Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {editingRecord && Object.entries(editingRecord).map(([key, value], index) => {
//                 if (key === 'Document URL' || key === 'Document Upload Date') return null;
//                 return (
//                   <div key={index} className="mb-3">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
//                     {key === 'Status' ? (
//                       <div className="text-sm py-2 px-3 bg-gray-100 rounded">
//                         {value || 'Not set'}
//                       </div>
//                     ) : (
//                       <textarea
//                         className="w-full p-2 border rounded-md text-sm"
//                         rows={key === 'Title' || key === 'abstract' ? 4 : 2}
//                         value={value || ''}
//                         onChange={(e) => handleFieldChange(key, e.target.value)}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
            
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={() => setEditingRecord(null)}
//                 className="mr-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveRecord}
//                 className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
//                 disabled={loading}
//               >
//                 <Save size={16} className="mr-1" />
//                 {loading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="mb-8">
//         <h1 className="text-1xl font-bold text-[#15212d]">Document Upload Manager</h1>
//         <p className="text-black-600 mt-2">Manage articles requiring credentials and upload supporting documents</p>
//       </div>
      
//       <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
//         <Search size={20} className="text-gray-500 mr-2" />
//         <input
//           type="text"
//           placeholder="Search records..."
//           className="bg-transparent border-none outline-none w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <p>{error}</p>
//         </div>
//       )}

//       {expandedCell && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium">{expandedCell.columnName}</h3>
//               <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
//               {expandedCell.value || ""}
//             </div>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
//         </div>
//       ) : (
//         <>
//           {filteredData.length === 0 ? (
//             <div className="bg-white rounded-lg shadow p-6 text-center">
//               <p className="text-gray-600">No records found requiring credentials.</p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-auto max-h-[75vh]">
//                 <table className="w-full border border-gray-300 text-sm">
//                   <thead className="bg-[#15212d] text-white sticky top-0">
//                     <tr>
//                       <th className="border px-4 py-3 text-left font-medium text-xs">Date</th>
//                       <th className="border px-4 py-3 text-left font-medium text-xs">EMail</th>
//                       <th className="border px-4 py-3 text-left font-medium text-xs">Title</th>
//                       <th className="border px-4 py-3 text-left font-medium text-xs">Article Access</th>
//                       <th className="border px-4 py-3 text-left font-medium text-xs">Status</th>
//                       <th className="border px-4 py-3 text-left font-medium text-xs">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.map((row, rowIndex) => {
//                       const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
//                       const dateValue = findDateField(row);
//                       const isApproved = (row.Status || '') === 'Approved';
                      
//                       return (
//                         <tr key={rowIndex} className={`hover:bg-gray-50 ${isApproved ? 'bg-green-50' : ''}`}>
//                           <td className="border px-4 py-2 text-xs">
//                             {formatDate(dateValue)}
//                           </td>
//                           <td 
//                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
//                             onClick={() => handleCellClick(actualRowIndex, 1, row.Mail, 'EMail')}
//                           >
//                             {truncateText(row.Mail, 25) || ''}
//                           </td>
//                           <td 
//                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
//                             onClick={() => handleCellClick(actualRowIndex, 2, row.Title, 'Title')}
//                           >
//                             {truncateText(row.Title, 25) || ''}
//                           </td>
//                           <td className="border px-4 py-2 text-xs">
//                             {row['Article Access'] || ''}
//                           </td>
//                           <td className="border px-4 py-2 text-xs font-medium">
//                             <span className={
//                               row.Status === 'Approved' ? 'text-green-700' : 
//                               row.Status === 'Checking' ? 'text-yellow-700' : 
//                               row.Status === 'Document Uploaded' ? 'text-blue-700' :
//                               'text-gray-700'
//                             }>
//                               {row.Status || 'Not set'}
//                             </span>
//                           </td>
//                           <td className="border px-4 py-2 text-xs">
//                             <div className="flex space-x-2 items-center">
//                               {renderStatusButtons(actualRowIndex)}
//                               <button
//                                 onClick={() => handleEditRow(actualRowIndex)}
//                                 className="px-2 py-1 text-xs rounded flex items-center bg-blue-500 text-white hover:bg-blue-600"
//                                 title="Edit record and upload document"
//                               >
//                                 <FileEdit size={12} className="mr-1" /> Edit
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               {filteredData.length > itemsPerPage && (
//                 <div className="flex justify-between items-center mt-6">
//                   <div className="text-sm text-gray-700">
//                     Showing page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
//                   </div>
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
//                     >
//                       <ChevronLeft size={16} />
//                     </button>
//                     {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
//                       let pageToShow;
//                       if (Math.ceil(filteredData.length / itemsPerPage) <= 5) {
//                         pageToShow = i + 1;
//                       } else {
//                         const middle = Math.min(
//                           Math.max(currentPage, 3),
//                           Math.ceil(filteredData.length / itemsPerPage) - 2
//                         );
//                         pageToShow = middle - 2 + i;
//                       }
                      
//                       if (pageToShow > 0 && pageToShow <= Math.ceil(filteredData.length / itemsPerPage)) {
//                         return (
//                           <button
//                             key={i}
//                             onClick={() => setCurrentPage(pageToShow)}
//                             className={`px-3 py-1 rounded-md ${currentPage === pageToShow ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
//                           >
//                             {pageToShow}
//                           </button>
//                         );
//                       }
//                       return null;
//                     })}
//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
//                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
//                     >
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UploadDocContent;
import React, { useEffect, useState } from 'react';
import { Search, Check, CheckCircle, FileEdit, X, Upload, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import DatabaseService from '../services/DatabaseService';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// const UploadDocContent = () => {
//   const [literatureData, setLiteratureData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [editingRecord, setEditingRecord] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusUpdating, setStatusUpdating] = useState(null);
//   const [expandedCell, setExpandedCell] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [clientId] = useState(`client-${Math.random().toString(36).substr(2, 9)}`); // Unique client ID for locking

//   const itemsPerPage = 10;

//   // Fetch all literature review data
//   const fetchLiteratureData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await DatabaseService.fetchLiteratureReviews();
      
//       if (data.length > 0) {
//         console.log("First item fields:", Object.keys(data[0]));
//         console.log("First item sample:", data[0]);
//       }
      
//       // Filter for ONLY "Article Access" with value "Credentials Required"
//       const filteredData = data.filter(item => item['Article Access'] === 'Credentials Required');
      
//       console.log(`Filtered ${filteredData.length} records out of ${data.length} total records`);
      
//       setLiteratureData(filteredData);
//       setFilteredData(filteredData);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching literature data:", err);
//       setError("Failed to load literature data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLiteratureData();
//   }, []);

//   // Apply search filter
//   useEffect(() => {
//     if (!literatureData.length) return;
    
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       const searchResults = literatureData.filter(item => {
//         return Object.entries(item).some(([key, val]) => {
//           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
//         });
//       });
//       setFilteredData(searchResults);
//     } else {
//       setFilteredData(literatureData);
//     }
//   }, [searchTerm, literatureData]);

//   // Function to handle approval status update
//   const handleStatusUpdate = async (rowIndex, newStatus) => {
//     try {
//       const row = filteredData[rowIndex];
//       const recordId = row['Article PMID'];
//       const drugName = row['Drug'];
      
//       if (!recordId) {
//         console.error("Row missing Article PMID:", row);
//         alert("Cannot update status: missing Article PMID");
//         return;
//       }
//       if (!drugName) {
//         console.error("Row missing Drug:", row);
//         alert("Cannot update status: missing Drug identifier");
//         return;
//       }
      
//       setStatusUpdating(rowIndex);
      
//       // Acquire lock
//       await DatabaseService.acquireLock(recordId, clientId);
      
//       // Optimistic update
//       const updatedData = [...filteredData];
//       updatedData[rowIndex] = { ...updatedData[rowIndex], Status: newStatus };
//       setFilteredData(updatedData);
      
//       const updatedRecord = { ...row, Status: newStatus, clientId };
      
//       console.log(`Updating status for Article PMID ${recordId}, Drug ${drugName} to "${newStatus}"`);
//       await DatabaseService.updateLiteratureReview(recordId, updatedRecord);
      
//       alert(`Record marked as "${newStatus}" successfully`);
//       await DatabaseService.releaseLock(recordId, clientId);
//       fetchLiteratureData();
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert(`Failed to update status: ${err.message}`);
//       await DatabaseService.releaseLock(filteredData[rowIndex]?.['Article PMID'], clientId).catch(() => {});
//       fetchLiteratureData();
//     } finally {
//       setStatusUpdating(null);
//     }
//   };

//   // Open record in form view for editing
//   const handleEditRow = (rowIndex) => {
//     const rowData = filteredData[rowIndex];
//     setEditingRecord(rowData);
//     setSelectedFile(null);
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   // Upload document and update status in backend
//   const handleSaveRecord = async () => {
//     try {
//       setLoading(true);
//       const recordId = editingRecord['Article PMID'];
//       const drugName = editingRecord['Drug'];
//       if (!recordId) {
//         throw new Error("Missing Article PMID");
//       }
//       if (!drugName) {
//         throw new Error("Missing Drug identifier");
//       }

//       // Acquire lock
//       await DatabaseService.acquireLock(recordId, clientId);

//       // Handle file upload if a file was selected
//       if (selectedFile) {
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         formData.append('articlePMID', recordId);
//         formData.append('drugName', drugName);

//         // Upload file to backend
//         const response = await axios.post(`${API_BASE_URL}/upload-document`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           withCredentials: true,
//         });
//         const documentUrl = response.data.fileUrl;
//         console.log("Document uploaded successfully:", documentUrl);

//         // Optimistic update for UI
//         setFilteredData(prevData =>
//           prevData.map(item =>
//             item['Article PMID'] === recordId && item['Drug'] === drugName
//               ? { ...item, Status: 'Document Uploaded' }
//               : item
//           )
//         );

//         // Update status in backend explicitly
//         const updatedRecord = { ...editingRecord, Status: 'Document Uploaded', clientId };
//         await DatabaseService.updateLiteratureReview(recordId, updatedRecord);

//         alert("Document uploaded and status updated successfully");
//       } else {
//         // Save record without file upload
//         const updatedRecord = { ...editingRecord, clientId };
//         await DatabaseService.updateLiteratureReview(recordId, updatedRecord);
//         alert("Record updated successfully");
//       }

//       await DatabaseService.releaseLock(recordId, clientId);
//       setEditingRecord(null);
//       setSelectedFile(null);
//       fetchLiteratureData();
//     } catch (err) {
//       console.error("Error uploading document or updating status:", err);
//       alert(`Failed to upload document or update status: ${err.response?.data?.error || err.message}`);
//       await DatabaseService.releaseLock(editingRecord?.['Article PMID'], clientId).catch(() => {});
//       fetchLiteratureData();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle field change in the edit form
//   const handleFieldChange = (field, value) => {
//     setEditingRecord(prev => ({ ...prev, [field]: value }));
//   };

//   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
//     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
//   };

//   const closeExpandedCell = () => {
//     setExpandedCell(null);
//   };

//   // Format dates function
//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     try {
//       const date = new Date(dateString);
//       if (date instanceof Date && !isNaN(date.getTime())) {
//         return date.toISOString().split('T')[0];
//       } else if (typeof dateString === 'string' && dateString.includes('-')) {
//         return dateString.substring(0, 10);
//       }
//       return dateString || "-";
//     } catch (e) {
//       console.error("Error parsing date:", e, dateString);
//       return dateString || "-";
//     }
//   };

//   // Find any date field
//   const findDateField = (item) => {
//     if (!item) return null;
//     const dateKey = Object.keys(item).find(key => 
//       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
//     );
//     return dateKey ? item[dateKey] : null;
//   };

//   // Truncate text
//   const truncateText = (text, maxLength = 30) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
//   };

//   // Get paginated items
//   const currentItems = filteredData.slice(
//     (currentPage - 1) * itemsPerPage, 
//     currentPage * itemsPerPage
//   );

//   // Render status buttons
//   const renderStatusButtons = (rowIndex) => {
//     const isUpdating = statusUpdating === rowIndex;
//     const currentStatus = filteredData[rowIndex].Status || '';
//     const isApproved = currentStatus === 'Approved';
//     const isChecking = currentStatus === 'Checking';
    
//     return (
//       <div className="flex space-x-1">
//         <button
//           onClick={() => {
//             if (window.confirm('Are you sure you want to mark this entry as approved?')) {
//               handleStatusUpdate(rowIndex, 'Approved');
//             }
//           }}
//           disabled={isUpdating || isApproved}
//           className={`px-2 py-1 text-xs rounded flex items-center ${
//             isApproved
//               ? 'bg-green-100 text-green-800 cursor-not-allowed'
//               : 'bg-green-500 text-white hover:bg-green-600'
//           }`}
//         >
//           <Check size={12} className="mr-1" /> 
//           {isApproved ? 'Approved' : 'Approve'}
//         </button>
//         <button
//           onClick={() => {
//             if (window.confirm('Are you sure you want to mark this entry as checking?')) {
//               handleStatusUpdate(rowIndex, 'Checking');
//             }
//           }}
//           disabled={isUpdating || isChecking}
//           className={`px-2 py-1 text-xs rounded flex items-center ${
//             isChecking
//               ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
//               : 'bg-yellow-500 text-white hover:bg-yellow-600'
//           }`}
//         >
//           <CheckCircle size={12} className="mr-1" /> 
//           {isChecking ? 'Checking' : 'Checking'}
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white p-8">
//       {/* Edit Form Modal */}
//       {editingRecord && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold">Edit Record & Upload Document</h3>
//               <button 
//                 onClick={() => setEditingRecord(null)} 
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             {/* Document Upload Section */}
//             <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <h4 className="text-md font-medium mb-2 text-blue-800">Upload Article Document</h4>
//               {editingRecord.Status === 'Document Uploaded' && (
//                 <div className="mb-3 p-2 bg-blue-100 rounded">
//                   <p className="text-xs text-blue-800">Document Status: Uploaded</p>
//                 </div>
//               )}
//               <div className="flex items-center">
//                 <label className="flex flex-col items-center px-4 py-3 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-500 hover:text-white">
//                   <Upload size={24} />
//                   <span className="mt-2 text-xs leading-normal">Select document</span>
//                   <input 
//                     type="file" 
//                     className="hidden" 
//                     onChange={handleFileChange}
//                     accept=".pdf,.doc,.docx"
//                   />
//                 </label>
//                 {selectedFile && (
//                   <div className="ml-3 text-sm text-gray-700">
//                     <p className="font-medium">{selectedFile.name}</p>
//                     <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Record Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {editingRecord && Object.entries(editingRecord).map(([key, value], index) => {
//                 if (key === 'Document URL' || key === 'Document Upload Date') return null;
//                 return (
//                   <div key={index} className="mb-3">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
//                     {key === 'Status' ? (
//                       <div className="text-sm py-2 px-3 bg-gray-100 rounded">
//                         {value || 'Not set'}
//                       </div>
//                     ) : (
//                       <textarea
//                         className="w-full p-2 border rounded-md text-sm"
//                         rows={key === 'Title' || key === 'abstract' ? 4 : 2}
//                         value={value || ''}
//                         onChange={(e) => handleFieldChange(key, e.target.value)}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
            
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={() => setEditingRecord(null)}
//                 className="mr-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveRecord}
//                 className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
//                 disabled={loading}
//               >
//                 <Save size={16} className="mr-1" />
//                 {loading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="mb-8">
//         <h1 className="text-1xl font-bold text-[#15212d]">Document Upload Manager</h1>
//         <p className="text-black-600 mt-2">Manage articles requiring credentials and upload supporting documents</p>
//       </div>
      
//       <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
//         <Search size={20} className="text-gray-500 mr-2" />
//         <input
//           type="text"
//           placeholder="Search records..."
//           className="bg-transparent border-none outline-none w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <p>{error}</p>
//         </div>
//       )}

//       {expandedCell && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium">{expandedCell.columnName}</h3>
//               <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
//               {expandedCell.value || ""}
//             </div>
//           </div>
//         </div>
//       )}
// {loading ? (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
//       </div>
//     ) : (
//       <>
//         {filteredData.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-6 text-center">
//             <p className="text-gray-600">No records found requiring credentials.</p>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-auto max-h-[75vh]">
//               <table className="w-full border border-gray-300 text-sm">
//                 <thead className="bg-[#15212d] text-white sticky top-0">
//                   <tr>
//                     <th className="border px-4 py-3 text-left font-medium text-xs">Date</th>
//                     <th className="border px-4 py-3 text-left font-medium text-xs">EMail</th>
//                     <th className="border px-4 py-3 text-left font-medium text-xs">Article PMID</th>
//                     <th className="border px-4 py-3 text-left font-medium text-xs">Drug</th>
//                     <th className="border px-4 py-3 text-left font-medium text-xs">Title</th>
//                     <th className="border px-4 py-3 text-left font-medium text-xs">Article Access</th>
//                     <th className="border px-4 py-3 text-left font-medium text-xs">Status</th>
//                     <th className="border px-4 py-3 text-left font-medium text-xs">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.map((row, rowIndex) => {
//                     const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
//                     const dateValue = findDateField(row);
//                     const isApproved = (row.Status || '') === 'Approved';
                    
//                     return (
//                       <tr key={rowIndex} className={`hover:bg-gray-50 ${isApproved ? 'bg-green-50' : ''}`}>
//                         <td className="border px-4 py-2 text-xs">
//                           {formatDate(dateValue)}
//                         </td>
//                         <td 
//                           className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
//                           onClick={() => handleCellClick(actualRowIndex, 1, row.Mail, 'EMail')}
//                         >
//                           {truncateText(row.Mail, 25) || ''}
//                         </td>
//                         <td 
//                           className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
//                           onClick={() => handleCellClick(actualRowIndex, 2, row['Article PMID'], 'Article PMID')}
//                         >
//                           {truncateText(row['Article PMID'], 25) || ''}
//                         </td>
//                         <td 
//                           className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
//                           onClick={() => handleCellClick(actualRowIndex, 3, row.Drug, 'Drug')}
//                         >
//                           {truncateText(row.Drug, 25) || ''}
//                         </td>
//                         <td 
//                           className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
//                           onClick={() => handleCellClick(actualRowIndex, 4, row.Title, 'Title')}
//                         >
//                           {truncateText(row.Title, 25) || ''}
//                         </td>
//                         <td className="border px-4 py-2 text-xs">
//                           {row['Article Access'] || ''}
//                         </td>
//                         <td className="border px-4 py-2 text-xs font-medium">
//                           <span className={
//                             row.Status === 'Approved' ? 'text-green-700' : 
//                             row.Status === 'Checking' ? 'text-yellow-700' : 
//                             row.Status === 'Document Uploaded' ? 'text-blue-700' :
//                             'text-gray-700'
//                           }>
//                             {row.Status || 'Not set'}
//                           </span>
//                         </td>
//                         <td className="border px-4 py-2 text-xs">
//                           <div className="flex space-x-2 items-center">
//                             {renderStatusButtons(actualRowIndex)}
//                             <button
//                               onClick={() => handleEditRow(actualRowIndex)}
//                               className="px-2 py-1 text-xs rounded flex items-center bg-blue-500 text-white hover:bg-blue-600"
//                               title="Edit record and upload document"
//                             >
//                               <FileEdit size={12} className="mr-1" /> Edit
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//               </div>

//               {filteredData.length > itemsPerPage && (
//                 <div className="flex justify-between items-center mt-6">
//                   <div className="text-sm text-gray-700">
//                     Showing page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
//                   </div>
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
//                     >
//                       <ChevronLeft size={16} />
//                     </button>
//                     {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
//                       let pageToShow;
//                       if (Math.ceil(filteredData.length / itemsPerPage) <= 5) {
//                         pageToShow = i + 1;
//                       } else {
//                         const middle = Math.min(
//                           Math.max(currentPage, 3),
//                           Math.ceil(filteredData.length / itemsPerPage) - 2
//                         );
//                         pageToShow = middle - 2 + i;
//                       }
                      
//                       if (pageToShow > 0 && pageToShow <= Math.ceil(filteredData.length / itemsPerPage)) {
//                         return (
//                           <button
//                             key={i}
//                             onClick={() => setCurrentPage(pageToShow)}
//                             className={`px-3 py-1 rounded-md ${currentPage === pageToShow ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
//                           >
//                             {pageToShow}
//                           </button>
//                         );
//                       }
//                       return null;
//                     })}
//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
//                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
//                     >
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UploadDocContent;


const UploadDocContent = () => {
  const [literatureData, setLiteratureData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [expandedCell, setExpandedCell] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [clientId] = useState(`client-${Math.random().toString(36).substr(2, 9)}`); // Unique client ID for locking

  const itemsPerPage = 10;

  // Fetch all literature review data
  const fetchLiteratureData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DatabaseService.fetchLiteratureReviews();
      
      if (data.length > 0) {
        console.log("First item fields:", Object.keys(data[0]));
        console.log("First item sample:", data[0]);
      }
      
      // Filter for ONLY "Article Access" with value "Credentials Required"
      const filteredData = data.filter(item => item['Article Access'] === 'Credentials Required');
      
      console.log(`Filtered ${filteredData.length} records out of ${data.length} total records`);
      
      setLiteratureData(filteredData);
      setFilteredData(filteredData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching literature data:", err);
      setError("Failed to load literature data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiteratureData();
  }, []);

  // Apply search filter
  useEffect(() => {
    if (!literatureData.length) return;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const searchResults = literatureData.filter(item => {
        return Object.entries(item).some(([key, val]) => {
          return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
        });
      });
      setFilteredData(searchResults);
    } else {
      setFilteredData(literatureData);
    }
  }, [searchTerm, literatureData]);

  // Function to handle approval status update
  const handleStatusUpdate = async (rowIndex, newStatus) => {
    try {
      const row = filteredData[rowIndex];
      const recordId = row['Article PMID'];
      const drugName = row['Drug'];
      
      if (!recordId) {
        console.error("Row missing Article PMID:", row);
        alert("Cannot update status: missing Article PMID");
        return;
      }
      if (!drugName) {
        console.error("Row missing Drug:", row);
        alert("Cannot update status: missing Drug identifier");
        return;
      }
      
      setStatusUpdating(rowIndex);
      
      // Acquire lock
      await DatabaseService.acquireLock(recordId, clientId);
      
      // Optimistic update
      const updatedData = [...filteredData];
      updatedData[rowIndex] = { ...updatedData[rowIndex], Status: newStatus };
      setFilteredData(updatedData);
      
      const updatedRecord = { ...row, Status: newStatus, clientId };
      
      console.log(`Updating status for Article PMID ${recordId}, Drug ${drugName} to "${newStatus}"`);
      await DatabaseService.updateCase(recordId, drugName, updatedRecord, clientId);
      
      alert(`Record marked as "${newStatus}" successfully`);
      await DatabaseService.releaseLock(recordId, clientId);
      fetchLiteratureData();
    } catch (err) {
      console.error("Error updating status:", err);
      alert(`Failed to update status: ${err.message}`);
      await DatabaseService.releaseLock(filteredData[rowIndex]?.['Article PMID'], clientId).catch(() => {});
      fetchLiteratureData();
    } finally {
      setStatusUpdating(null);
    }
  };

  // Open record in form view for editing
  const handleEditRow = (rowIndex) => {
    const rowData = filteredData[rowIndex];
    setEditingRecord(rowData);
    setSelectedFile(null);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Upload document and update status in backend
 // Upload document and update status in backend
const handleSaveRecord = async () => {
  try {
    setLoading(true);
    const recordId = editingRecord['Article PMID'];
    const drugName = editingRecord['Drug'];
    if (!recordId) {
      throw new Error("Missing Article PMID");
    }
    if (!drugName) {
      throw new Error("Missing Drug identifier");
    }

    // Acquire lock
    await DatabaseService.acquireLock(recordId, clientId);

    // Handle file upload if a file was selected
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('articlePMID', recordId);
      formData.append('drugName', drugName);

      try {
        // Upload file to backend
        const response = await axios.post(`${API_BASE_URL}/upload-document`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
        const documentUrl = response.data.fileUrl;
        console.log("Document uploaded successfully:", documentUrl);

        // Optimistic update for UI
        setFilteredData(prevData =>
          prevData.map(item =>
            item['Article PMID'] === recordId && item['Drug'] === drugName
              ? { ...item, Status: 'Document Uploaded' }
              : item
          )
        );

        // Update status in backend explicitly
        const updatedRecord = { ...editingRecord, Status: 'Document Uploaded', clientId };
        await DatabaseService.updateCase(recordId, drugName, updatedRecord, clientId);

        alert("Document uploaded and status updated successfully");
      } catch (err) {
        console.error("Error uploading document:", err.response?.data || err.message);
        throw new Error(err.response?.data?.error || "Failed to upload document to server");
      }
    } else {
      // Save record without file upload
      const updatedRecord = { ...editingRecord, clientId };
      await DatabaseService.updateCase(recordId, drugName, updatedRecord, clientId);
      alert("Record updated successfully");
    }

    await DatabaseService.releaseLock(recordId, clientId);
    setEditingRecord(null);
    setSelectedFile(null);
    fetchLiteratureData();
  } catch (err) {
    console.error("Error uploading document or updating status:", err);
    alert(`Failed to upload document or update status: ${err.message}`);
    await DatabaseService.releaseLock(editingRecord?.['Article PMID'], clientId).catch(() => {});
    fetchLiteratureData();
  } finally {
    setLoading(false);
  }
};
  // Handle field change in the edit form
  const handleFieldChange = (field, value) => {
    setEditingRecord(prev => ({ ...prev, [field]: value }));
  };

  const handleCellClick = (rowIndex, colIndex, value, columnName) => {
    setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
  };

  const closeExpandedCell = () => {
    setExpandedCell(null);
  };

  // Format dates function
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      } else if (typeof dateString === 'string' && dateString.includes('-')) {
        return dateString.substring(0, 10);
      }
      return dateString || "-";
    } catch (e) {
      console.error("Error parsing date:", e, dateString);
      return dateString || "-";
    }
  };

  // Find any date field
  const findDateField = (item) => {
    if (!item) return null;
    const dateKey = Object.keys(item).find(key => 
      key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
    );
    return dateKey ? item[dateKey] : null;
  };

  // Truncate text
  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Get paginated items
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Render status buttons
  const renderStatusButtons = (rowIndex) => {
    const isUpdating = statusUpdating === rowIndex;
    const currentStatus = filteredData[rowIndex].Status || '';
    const isApproved = currentStatus === 'Approved';
    const isChecking = currentStatus === 'Checking';
    
    return (
      <div className="flex space-x-1">
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to mark this entry as approved?')) {
              handleStatusUpdate(rowIndex, 'Approved');
            }
          }}
          disabled={isUpdating || isApproved}
          className={`px-2 py-1 text-xs rounded flex items-center ${
            isApproved
              ? 'bg-green-100 text-green-800 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <Check size={12} className="mr-1" /> 
          {isApproved ? 'Approved' : 'Approve'}
        </button>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to mark this entry as checking?')) {
              handleStatusUpdate(rowIndex, 'Checking');
            }
          }}
          disabled={isUpdating || isChecking}
          className={`px-2 py-1 text-xs rounded flex items-center ${
            isChecking
              ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          <CheckCircle size={12} className="mr-1" /> 
          {isChecking ? 'Checking' : 'Checking'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Edit Form Modal */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Record & Upload Document</h3>
              <button 
                onClick={() => setEditingRecord(null)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Document Upload Section */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-md font-medium mb-2 text-blue-800">Upload Article Document</h4>
              {editingRecord.Status === 'Document Uploaded' && (
                <div className="mb-3 p-2 bg-blue-100 rounded">
                  <p className="text-xs text-blue-800">Document Status: Uploaded</p>
                </div>
              )}
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-3 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-500 hover:text-white">
                  <Upload size={24} />
                  <span className="mt-2 text-xs leading-normal">Select document</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                {selectedFile && (
                  <div className="ml-3 text-sm text-gray-700">
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Record Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {editingRecord && Object.entries(editingRecord).map(([key, value], index) => {
                if (key === 'Document URL' || key === 'Document Upload Date') return null;
                return (
                  <div key={index} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                    {key === 'Status' ? (
                      <div className="text-sm py-2 px-3 bg-gray-100 rounded">
                        {value || 'Not set'}
                      </div>
                    ) : (
                      <textarea
                        className="w-full p-2 border rounded-md text-sm"
                        rows={key === 'Title' || key === 'abstract' ? 4 : 2}
                        value={value || ''}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditingRecord(null)}
                className="mr-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRecord}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                disabled={loading}
              >
                <Save size={16} className="mr-1" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mb-8">
        <h1 className="text-1xl font-bold text-[#15212d]">Document Upload Manager</h1>
        <p className="text-black-600 mt-2">Manage articles requiring credentials and upload supporting documents</p>
      </div>
      
      <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search records..."
          className="bg-transparent border-none outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {expandedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{expandedCell.columnName}</h3>
              <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
              {expandedCell.value || ""}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
        </div>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600">No records found requiring credentials.</p>
            </div>
          ) : (
            <>
              <div className="overflow-auto max-h-[75vh]">
                <table className="w-full border border-gray-300 text-sm">
                  <thead className="bg-[#15212d] text-white sticky top-0">
                    <tr>
                      <th className="border px-4 py-3 text-left font-medium text-xs">Date</th>
                      <th className="border px-4 py-3 text-left font-medium text-xs">EMail</th>
                      <th className="border px-4 py-3 text-left font-medium text-xs">Article PMID</th>
                      <th className="border px-4 py-3 text-left font-medium text-xs">Drug</th>
                      <th className="border px-4 py-3 text-left font-medium text-xs">Title</th>
                      <th className="border px-4 py-3 text-left font-medium text-xs">Article Access</th>
                      <th className="border px-4 py-3 text-left font-medium text-xs">Status</th>
                      <th className="border px-4 py-3 text-left font-medium text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((row, rowIndex) => {
                      const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
                      const dateValue = findDateField(row);
                      const isApproved = (row.Status || '') === 'Approved';
                      
                      return (
                        <tr key={rowIndex} className={`hover:bg-gray-50 ${isApproved ? 'bg-green-50' : ''}`}>
                          <td className="border px-4 py-2 text-xs">
                            {formatDate(dateValue)}
                          </td>
                          <td 
                            className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCellClick(actualRowIndex, 1, row.Mail, 'EMail')}
                          >
                            {truncateText(row.Mail, 25) || ''}
                          </td>
                          <td 
                            className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCellClick(actualRowIndex, 2, row['Article PMID'], 'Article PMID')}
                          >
                            {truncateText(row['Article PMID'], 25) || ''}
                          </td>
                          <td 
                            className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCellClick(actualRowIndex, 3, row.Drug, 'Drug')}
                          >
                            {truncateText(row.Drug, 25) || ''}
                          </td>
                          <td 
                            className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCellClick(actualRowIndex, 4, row.Title, 'Title')}
                          >
                            {truncateText(row.Title, 25) || ''}
                          </td>
                          <td className="border px-4 py-2 text-xs">
                            {row['Article Access'] || ''}
                          </td>
                          <td className="border px-4 py-2 text-xs font-medium">
                            <span className={
                              row.Status === 'Approved' ? 'text-green-700' : 
                              row.Status === 'Checking' ? 'text-yellow-700' : 
                              row.Status === 'Document Uploaded' ? 'text-blue-700' :
                              'text-gray-700'
                            }>
                              {row.Status || 'Not set'}
                            </span>
                          </td>
                          <td className="border px-4 py-2 text-xs">
                            <div className="flex space-x-2 items-center">
                              {renderStatusButtons(actualRowIndex)}
                              <button
                                onClick={() => handleEditRow(actualRowIndex)}
                                className="px-2 py-1 text-xs rounded flex items-center bg-blue-500 text-white hover:bg-blue-600"
                                title="Edit record and upload document"
                              >
                                <FileEdit size={12} className="mr-1" /> Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredData.length > itemsPerPage && (
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-700">
                    Showing page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
                      let pageToShow;
                      if (Math.ceil(filteredData.length / itemsPerPage) <= 5) {
                        pageToShow = i + 1;
                      } else {
                        const middle = Math.min(
                          Math.max(currentPage, 3),
                          Math.ceil(filteredData.length / itemsPerPage) - 2
                        );
                        pageToShow = middle - 2 + i;
                      }
                      
                      if (pageToShow > 0 && pageToShow <= Math.ceil(filteredData.length / itemsPerPage)) {
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageToShow)}
                            className={`px-3 py-1 rounded-md ${currentPage === pageToShow ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
                          >
                            {pageToShow}
                          </button>
                        );
                      }
                      return null;
                    })}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                      className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UploadDocContent;