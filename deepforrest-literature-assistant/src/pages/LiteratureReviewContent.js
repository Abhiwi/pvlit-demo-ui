// import React, { useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';
// import DatabaseService from '../services/DatabaseService';
// import axios from 'axios';

// const LiteratureReviewContent = () => {
//   const [literatureData, setLiteratureData] = useState([]);
//   const [uniqueEMailData, setUniqueEMailData] = useState([]);
//   const [selectedReviewData, setSelectedReviewData] = useState(null);
//   const [editedReviewData, setEditedReviewData] = useState(null);
//   const [selectedEMail, setSelectedEMail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
//   const [editMode, setEditMode] = useState(false);
//   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
//   const [focusedCellValue, setFocusedCellValue] = useState('');
//   const [expandedCell, setExpandedCell] = useState(null);
//   const [modifiedRows, setModifiedRows] = useState({});
//   const [statusUpdating, setStatusUpdating] = useState(null); // Track which row is updating status

//   const itemsPerPage = 10;

//   // Fetch data from database
//   const fetchLiteratureData = async () => {
//     try {
//       const data = await DatabaseService.fetchLiteratureReviews();
      
//       // Debug: Check the structure of the first item
//       if (data.length > 0) {
//         console.log("First item fields:", Object.keys(data[0]));
//         console.log("First item sample:", data[0]);
//       }
      
//       setLiteratureData(data);
      
//       // Process data to get unique eMails
//       const eMailMap = new Map();
//       data.forEach(item => {
//         if (item.Mail && !eMailMap.has(item.Mail)) {
//           // Find the date field (whatever it's called)
//           const dateFieldName = Object.keys(item).find(key => 
//             key.toLowerCase().includes('date') && 
//             key.toLowerCase().includes('validation')
//           );
          
//           const dateValue = dateFieldName ? item[dateFieldName] : null;
//           console.log(`EMail: ${item.Mail}, Date field name: ${dateFieldName}, Value: ${dateValue}`);
          
//           // Store the first occurrence with the correctly named field
//           const uniqueItem = {
//             id: item.id,
//             Mail: item.Mail,
//             title: item.title,
//             drug: item.drug
//           };
          
//           // Add the date using the actual field name from the data
//           if (dateFieldName) {
//             uniqueItem[dateFieldName] = dateValue;
//           }
          
//           eMailMap.set(item.Mail, uniqueItem);
//         }
//       });
      
//       const uniqueEMails = Array.from(eMailMap.values());
//       console.log("Unique eMails with dates:", uniqueEMails.slice(0, 2));
//       setUniqueEMailData(uniqueEMails);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching literature review data:", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLiteratureData();
//   }, []);

//   const handleViewReview = async (eMail) => {
//     try {
//       setLoading(true);
//       // Filter all entries with the selected eMail
//       const eMailRelatedData = literatureData.filter(item => item.Mail === eMail);
//       console.log("View data for eMail:", eMail, eMailRelatedData[0]);
      
//       // Make sure each item has an id
//       eMailRelatedData.forEach(item => {
//         if (!item.id) {
//           console.error("Item missing ID:", item);
//         }
//       });
      
//       setSelectedReviewData(eMailRelatedData);
//       setEditedReviewData(eMailRelatedData);
//       setSelectedEMail(eMail);
//       setEditMode(false);
//       setDetailCurrentPage(1); // Reset to first page when viewing details
//       setLoading(false);
//     } catch (err) {
//       console.error(`Error fetching review data for eMail ${eMail}:`, err);
//       setLoading(false);
//     }
//   };

//   const handleCellChange = (rowIndex, key, value) => {
//     const newData = [...editedReviewData];
//     const oldValue = newData[rowIndex][key];
//     newData[rowIndex][key] = value;
//     setEditedReviewData(newData);
    
//     // Track this row as modified
//     if (oldValue !== value) {
//       setModifiedRows(prev => ({
//         ...prev,
//         [rowIndex]: true
//       }));
//     }
//   };

//   // New function to handle immediate status updates
//   const handleStatusUpdate = async (rowIndex, status) => {
//     try {
//       // Get the actual record ID (Article PMID)
//       const row = editedReviewData[rowIndex];
//       const recordId = row['Article PMID'];
      
//       if (!recordId) {
//         console.error("Row missing Article PMID:", row);
//         alert("Cannot update status: missing Article PMID identifier");
//         return;
//       }
      
//       // Set status updating indicator for this row
//       setStatusUpdating(rowIndex);
      
//       // Update the status field locally first (optimistic update)
//       const newData = [...editedReviewData];
//       newData[rowIndex]['Status'] = status;
//       setEditedReviewData(newData);
      
//       // Send the update to the server
//       console.log(`Updating status for Article PMID ${recordId} to "${status}"`);
//       await DatabaseService.updateRecordStatus(recordId, status);
      
//       // If this row was marked as modified, keep it that way
//       // (this prevents losing other unsaved changes)
      
//       // Show feedback
//       alert(`Status updated to "${status}" successfully`);
      
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert(`Failed to update status: ${err.message}`);
      
//       // Revert the optimistic update if it failed
//       if (selectedReviewData) {
//         setEditedReviewData([...selectedReviewData]);
//       }
//     } finally {
//       setStatusUpdating(null);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       let successCount = 0;
//       let errorCount = 0;
      
//       console.log("Modified rows:", Object.keys(modifiedRows));
      
//       // Only save rows that were modified
//       for (const rowIndexStr of Object.keys(modifiedRows)) {
//         const rowIndex = parseInt(rowIndexStr);
//         const row = editedReviewData[rowIndex];
        
//         // Use Article PMID as the ID
//         const recordId = row['Article PMID'];
        
//         if (!recordId) {
//           console.error("Row missing Article PMID:", row);
//           errorCount++;
//           continue; // Skip rows without Article PMID
//         }
        
//         try {
//           console.log(`Saving modified row with Article PMID ${recordId}:`, row);
//           const result = await DatabaseService.updateLiteratureReview(recordId, row);
//           console.log(`Save result for Article PMID ${recordId}:`, result);
//           successCount++;
//         } catch (rowErr) {
//           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
//           errorCount++;
//         }
//       }
      
//       setEditMode(false);
//       setLoading(false);
//       setModifiedRows({}); // Clear modified rows tracking
      
//       // Refresh the data after saving to get any server-side changes
//       fetchLiteratureData();
      
//       // Update the selected review data from the refreshed data
//       if (selectedEMail) {
//         // Wait a moment for the data to refresh
//         setTimeout(() => {
//           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
//           setSelectedReviewData(refreshedEMailData);
//           setEditedReviewData(refreshedEMailData);
//         }, 500);
//       }
      
//       // Show status message
//       if (errorCount > 0) {
//         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
//       } else if (successCount > 0) {
//         alert(`Successfully saved ${successCount} rows.`);
//       } else {
//         alert("No changes were made.");
//       }
//     } catch (err) {
//       console.error("Error in save operation:", err);
//       setLoading(false);
//       alert(`Error saving changes: ${err.message}`);
//     }
//   };

//   const closeReviewViewer = () => {
//     setSelectedReviewData(null);
//     setEditedReviewData(null);
//     setSelectedEMail(null);
//     setEditMode(false);
//     setFocusedCell({ row: null, col: null });
//     setFocusedCellValue('');
//     setExpandedCell(null);
//   };

//   const handleCellClick = (rowIndex, colIndex, value) => {
//     if (!editMode) {
//       setExpandedCell({ row: rowIndex, col: colIndex, value });
//     }
//   };

//   const closeExpandedCell = () => {
//     setExpandedCell(null);
//   };

//   // Improved format dates function with better error handling
//   const formatDate = (dateString) => {
//     if (!dateString) {
//       return "-";
//     }
    
//     try {
//       const date = new Date(dateString);
      
//       // Check if date is valid
//       if (date instanceof Date && !isNaN(date.getTime())) {
//         return date.toISOString().split('T')[0];
//       } else {
//         // Try to handle it as a string if it contains date-like parts
//         if (typeof dateString === 'string' && dateString.includes('-')) {
//           // Simple handling for "YYYY-MM-DD" format
//           const parts = dateString.split('-');
//           if (parts.length === 3) {
//             return dateString.substring(0, 10); // Just take first 10 chars if it looks like a date
//           }
//         }
//         return dateString || "-";
//       }
//     } catch (e) {
//       console.error("Error parsing date:", e, dateString);
//       return dateString || "-";
//     }
//   };

//   // Function to find any date field in an object
//   const findDateField = (item) => {
//     if (!item) return null;
    
//     // Look for any key containing both "validation" and "date" in any case
//     const dateKey = Object.keys(item).find(key => 
//       key.toLowerCase().includes('validation') && 
//       key.toLowerCase().includes('date')
//     );
    
//     return dateKey ? item[dateKey] : null;
//   };

//   const filteredData = uniqueEMailData.filter(item => {
//     const searchLower = searchTerm.toLowerCase();
//     const dateValue = findDateField(item);
    
//     return (
//       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
//       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
//       (item.title && item.title.toLowerCase().includes(searchLower)) ||
//       (item.drug && item.drug.toLowerCase().includes(searchLower))
//     );
//   });

//   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   // Helper function to truncate text
//   const truncateText = (text, maxLength = 30) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
//   };

//   // For detailed view pagination
//   const detailCurrentItems = selectedReviewData ? 
//     selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage) : 
//     [];

//   // Function to render status buttons for a row
//   // Function to render status buttons for a row
// // Function to render status buttons for a row
// const renderStatusButtons = (rowIndex) => {
//     const isUpdating = statusUpdating === rowIndex;
//     const currentStatus = editedReviewData[rowIndex]['Status'];
    
//     return (
//       <div className="flex space-x-2 items-center">
//         {currentStatus && <span className="text-xs mr-2"> <strong>{currentStatus}</strong></span>}
//         <button
//           onClick={() => {
//             if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
//               handleStatusUpdate(rowIndex, 'Approved');
//             }
//           }}
//           disabled={isUpdating || currentStatus === 'Approved'}
//           className={`px-2 py-1 text-xs rounded flex items-center ${
//             currentStatus === 'Approved' 
//               ? 'bg-green-100 text-green-800' 
//               : 'bg-green-500 text-white hover:bg-green-600'
//           }`}
//         >
//           <CheckCircle size={12} className="mr-1" /> Approve
//         </button>
//         {currentStatus !== 'Approved' && (
//           <button
//             onClick={() => handleStatusUpdate(rowIndex, 'Checking')}
//             disabled={isUpdating || currentStatus === 'Checking'}
//             className={`px-2 py-1 text-xs rounded flex items-center ${
//               currentStatus === 'Checking' 
//                 ? 'bg-yellow-100 text-yellow-800' 
//                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
//             }`}
//           >
//             <Clock size={12} className="mr-1" /> Checking
//           </button>
//         )}
//         {isUpdating && (
//           <span className="text-xs italic text-gray-500">Updating...</span>
//         )}
//       </div>
//     );
//   };
//   return (
//     <div className="min-h-screen bg-white p-8">
//       {!selectedReviewData ? (
//         <>
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
//             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
//           </div>
//           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
//             <Search size={20} className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search by date, eMail, title or drug..."
//               className="bg-transparent border-none outline-none w-full"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
//             </div>
//           ) : (
//             <>
//               <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-[#15212d] text-white">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {currentItems.map((item, idx) => {
//                       const dateValue = findDateField(item);
//                       return (
//                         <tr key={idx} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 text-sm">
//                             {formatDate(dateValue)}
//                           </td>
//                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
//                           <td className="px-6 py-4 text-sm">{truncateText(item.title) || "-"}</td>
//                           <td className="px-6 py-4 text-sm">{truncateText(item.drug) || "-"}</td>
//                           <td className="px-6 py-4 text-sm">
//                             <button
//                               onClick={() => handleViewReview(item.Mail)}
//                               className="flex items-center text-blue-600 hover:text-blue-900"
//                             >
//                               <Eye size={16} className="mr-1" /> View
//                             </button>
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
//                     Showing {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
//                   </div>
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 rounded-md bg-gray-200"
//                     >
//                       <ChevronLeft size={16} />
//                     </button>
//                     {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
//                       className="px-3 py-1 rounded-md bg-gray-200"
//                     >
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </>
//       ) : (
//         <div className="bg-white p-4 rounded-lg shadow-lg">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex space-x-2">
//               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
//                 <ArrowLeft size={16} className="mr-1" /> Back
//               </button>
//               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
//                 <Edit size={16} className="mr-1" /> Edit
//               </button>
//               {editMode && (
//                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
//                   <Save size={16} className="mr-1" /> Save
//                 </button>
//               )}
//             </div>
//             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
//           </div>

//           {editMode && focusedCell.row !== null && (
//             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
//               <div className="mb-2 text-sm font-medium text-gray-800">
//                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
//               </div>
//               <textarea
//                 className="w-full h-24 p-2 border rounded-md"
//                 value={focusedCellValue}
//                 onChange={(e) => {
//                   setFocusedCellValue(e.target.value);
//                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
//                 }}
//               />
//             </div>
//           )}

//           {expandedCell && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-medium">
//                     {editedReviewData[expandedCell.row] && 
//                      Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
//                   </h3>
//                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
//                     <X size={20} />
//                   </button>
//                 </div>
//                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
//                   {expandedCell.value || ""}
//                 </div>
//               </div>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-auto max-h-[75vh]">
//                 <table className="w-full border border-gray-300 text-sm">
//                   <thead className="bg-[#15212d] text-white sticky top-0">
//                     <tr>
//                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
//                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
//                           {col}
//                         </th>
//                       ))}

//                     </tr>
//                   </thead>
//                   <tbody>
//   {detailCurrentItems.map((row, rowIndex) => {
//     const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
//     return (
//       <tr key={rowIndex} className="hover:bg-gray-50">
//         {Object.entries(row).map(([key, val], colIndex) => {
//           // Skip rendering the Status column
//           if (key === 'Status') return null;
          
//           return (
//             <td 
//               key={colIndex} 
//               className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
//               onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
//               title="Click to view full content"
//               style={{ minWidth: '200px', maxWidth: '300px' }}
//             >
//               {editMode ? (
//                 <input
//                   className="w-full border p-2 text-xs"
//                   value={val || ''}
//                   onFocus={() => {
//                     setFocusedCell({ row: actualRowIndex, col: colIndex });
//                     setFocusedCellValue(val || '');
//                   }}
//                   onChange={(e) => {
//                     handleCellChange(actualRowIndex, key, e.target.value);
//                     if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
//                       setFocusedCellValue(e.target.value);
//                     }
//                   }}
//                 />
//               ) : (
//                 truncateText(val, 25) || ''
//               )}
//             </td>
//           );
//         })}
//         <td className="border px-4 py-2 text-xs">
//           {renderStatusButtons(actualRowIndex)}
//         </td>
//       </tr>
//     );
//   })}
// </tbody>
//                 </table>
//               </div>

//               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
//                 <div className="flex justify-between items-center mt-6">
//                   <div className="text-sm text-gray-700">
//                     Showing {detailCurrentPage} of {Math.ceil(selectedReviewData.length / itemsPerPage)}
//                   </div>
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
//                       disabled={detailCurrentPage === 1}
//                       className="px-3 py-1 rounded-md bg-gray-200"
//                     >
//                       <ChevronLeft size={16} />
//                     </button>
//                     {Array.from({ length: Math.ceil(selectedReviewData.length / itemsPerPage) }, (_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setDetailCurrentPage(i + 1)}
//                         className={`px-3 py-1 rounded-md ${detailCurrentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
//                       disabled={detailCurrentPage === Math.ceil(selectedReviewData.length / itemsPerPage)}
//                       className="px-3 py-1 rounded-md bg-gray-200"
//                     >
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiteratureReviewContent;