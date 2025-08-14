// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { ChevronLeft, ChevronRight, Search, X, Edit, Save, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
// // // // // // import DatabaseService from '../services/DatabaseService';

// // // // // // const MedicalReview = () => {
// // // // // //   const [medicalData, setMedicalData] = useState([]);
// // // // // //   const [filteredData, setFilteredData] = useState([]);
// // // // // //   const [editedData, setEditedData] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // // //   const [modifiedRows, setModifiedRows] = useState({});
// // // // // //   const [statusUpdating, setStatusUpdating] = useState(null);

// // // // // //   const itemsPerPage = 10;

// // // // // //   // Fetch data from database
// // // // // //   const fetchMedicalData = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       setError(null);
// // // // // //       const data = await DatabaseService.fetchMedicalReviews();
      
// // // // // //       // Debug: Check the structure of the first item
// // // // // //       if (data.length > 0) {
// // // // // //         console.log("First item fields:", Object.keys(data[0]));
// // // // // //         console.log("First item sample:", data[0]);
// // // // // //       }
      
// // // // // //       // We're now keeping ALL data, not just pre-filtering for Approved
// // // // // //       setMedicalData(data);
// // // // // //       setFilteredData(data);
// // // // // //       setEditedData(data);
// // // // // //       setLoading(false);
// // // // // //     } catch (err) {
// // // // // //       console.error("Error fetching medical review data:", err);
// // // // // //       setError("Failed to load medical review data. Please try again later.");
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchMedicalData();
// // // // // //   }, []);

// // // // // //   // Apply search filter
// // // // // //   useEffect(() => {
// // // // // //     if (!medicalData.length) return;
    
// // // // // //     if (searchTerm) {
// // // // // //       const searchLower = searchTerm.toLowerCase();
// // // // // //       const searchResults = medicalData.filter(item => 
// // // // // //         // Apply search term across all fields
// // // // // //         Object.values(item).some(val => 
// // // // // //           val && typeof val === 'string' && val.toLowerCase().includes(searchLower)
// // // // // //         )
// // // // // //       );
// // // // // //       setFilteredData(searchResults);
// // // // // //       setEditedData(searchResults);
// // // // // //     } else {
// // // // // //       // Reset to all data
// // // // // //       setFilteredData(medicalData);
// // // // // //       setEditedData(medicalData);
// // // // // //     }
// // // // // //   }, [searchTerm, medicalData]);

// // // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // // //     const newData = [...editedData];
// // // // // //     const oldValue = newData[rowIndex][key];
// // // // // //     newData[rowIndex][key] = value;
// // // // // //     setEditedData(newData);
    
// // // // // //     // Track this row as modified
// // // // // //     if (oldValue !== value) {
// // // // // //       setModifiedRows(prev => ({
// // // // // //         ...prev,
// // // // // //         [rowIndex]: true
// // // // // //       }));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleStatusUpdate = async (rowIndex, status) => {
// // // // // //     try {
// // // // // //       // Get the record ID - using a unique identifier like title or Mail
// // // // // //       const row = editedData[rowIndex];
// // // // // //       const recordId = row.id || row.Mail || row.title; // Use what's available as identifier
      
// // // // // //       if (!recordId) {
// // // // // //         console.error("Row missing identifier:", row);
// // // // // //         alert("Cannot update status: missing identifier");
// // // // // //         return;
// // // // // //       }
      
// // // // // //       // Set status updating indicator for this row
// // // // // //       setStatusUpdating(rowIndex);
      
// // // // // //       // Update the status field locally first (optimistic update)
// // // // // //       const newData = [...editedData];
// // // // // //       newData[rowIndex]['Status'] = status;
// // // // // //       setEditedData(newData);
      
// // // // // //       // Track this row as modified
// // // // // //       setModifiedRows(prev => ({
// // // // // //         ...prev,
// // // // // //         [rowIndex]: true
// // // // // //       }));
      
// // // // // //       // Show feedback
// // // // // //       alert(`Status updated to "${status}". Click Save to commit all changes.`);
// // // // // //     } catch (err) {
// // // // // //       console.error("Error updating status:", err);
// // // // // //       alert(`Failed to update status: ${err.message}`);
      
// // // // // //       // Revert the optimistic update if it failed
// // // // // //       setEditedData([...filteredData]);
// // // // // //     } finally {
// // // // // //       setStatusUpdating(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSave = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       let successCount = 0;
// // // // // //       let errorCount = 0;
      
// // // // // //       console.log("Modified rows:", Object.keys(modifiedRows));
      
// // // // // //       // Only save rows that were modified
// // // // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // // // //         const rowIndex = parseInt(rowIndexStr);
// // // // // //         const row = editedData[rowIndex];
        
// // // // // //         // Use an identifier (id, Mail, title or whatever is available)
// // // // // //         const recordId = row.id || row.Mail || row.title;
        
// // // // // //         if (!recordId) {
// // // // // //           console.error("Row missing identifier:", row);
// // // // // //           errorCount++;
// // // // // //           continue;
// // // // // //         }
        
// // // // // //         try {
// // // // // //           console.log(`Saving modified row with identifier ${recordId}:`, row);
// // // // // //           const result = await DatabaseService.updateMedicalReview(recordId, row);
// // // // // //           console.log(`Save result for identifier ${recordId}:`, result);
// // // // // //           successCount++;
// // // // // //         } catch (rowErr) {
// // // // // //           console.error(`Failed to save row with identifier ${recordId}:`, rowErr);
// // // // // //           errorCount++;
// // // // // //         }
// // // // // //       }
      
// // // // // //       setEditMode(false);
// // // // // //       setLoading(false);
// // // // // //       setModifiedRows({}); // Clear modified rows tracking
      
// // // // // //       // Refresh the data after saving to get any server-side changes
// // // // // //       fetchMedicalData();
      
// // // // // //       // Show status message
// // // // // //       if (errorCount > 0) {
// // // // // //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// // // // // //       } else if (successCount > 0) {
// // // // // //         alert(`Successfully saved ${successCount} rows.`);
// // // // // //       } else {
// // // // // //         alert("No changes were made.");
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error("Error in save operation:", err);
// // // // // //       setLoading(false);
// // // // // //       alert(`Error saving changes: ${err.message}`);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
// // // // // //     if (!editMode) {
// // // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
// // // // // //     }
// // // // // //   };

// // // // // //   const closeExpandedCell = () => {
// // // // // //     setExpandedCell(null);
// // // // // //   };

// // // // // //   // Format dates function with error handling
// // // // // //   const formatDate = (dateString) => {
// // // // // //     if (!dateString) {
// // // // // //       return "-";
// // // // // //     }
    
// // // // // //     try {
// // // // // //       const date = new Date(dateString);
      
// // // // // //       // Check if date is valid
// // // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // // //         return date.toISOString().split('T')[0];
// // // // // //       } else {
// // // // // //         // Try to handle it as a string if it contains date-like parts
// // // // // //         if (typeof dateString === 'string' && dateString.includes('-')) {
// // // // // //           // Simple handling for "YYYY-MM-DD" format
// // // // // //           const parts = dateString.split('-');
// // // // // //           if (parts.length === 3) {
// // // // // //             return dateString.substring(0, 10); // Just take first 10 chars if it looks like a date
// // // // // //           }
// // // // // //         }
// // // // // //         return dateString || "-";
// // // // // //       }
// // // // // //     } catch (e) {
// // // // // //       console.error("Error parsing date:", e, dateString);
// // // // // //       return dateString || "-";
// // // // // //     }
// // // // // //   };

// // // // // //   // Helper function to truncate text
// // // // // //   const truncateText = (text, maxLength = 30) => {
// // // // // //     if (!text) return "";
// // // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // // //   };

// // // // // //   const currentItems = editedData ? 
// // // // // //     editedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : 
// // // // // //     [];

// // // // // //   // Function to get comment type (AOI or ICSR)
// // // // // //   const getCommentType = (item) => {
// // // // // //     return item['Comments (ICSR, AOI, Not selected)'] || '-';
// // // // // //   };
  
// // // // // //   // Function to render status buttons for a row - always showing all options
// // // // // //   const renderStatusButtons = (rowIndex) => {
// // // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // // //     const currentStatus = editedData[rowIndex]['Status'] || '';
    
// // // // // //     return (
// // // // // //       <div className="flex flex-col space-y-2">
// // // // // //         <div className="text-xs font-medium">Current Status: <span className="font-bold">{currentStatus}</span></div>
// // // // // //         <div className="flex space-x-2">
// // // // // //           <button
// // // // // //             onClick={() => handleStatusUpdate(rowIndex, 'Approved')}
// // // // // //             disabled={isUpdating}
// // // // // //             className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // //               currentStatus === 'Approved' 
// // // // // //                 ? 'bg-green-100 text-green-800 border border-green-800' 
// // // // // //                 : 'bg-green-500 text-white hover:bg-green-600'
// // // // // //             }`}
// // // // // //           >
// // // // // //             <CheckCircle size={12} className="mr-1" /> Approve
// // // // // //           </button>
// // // // // //           <button
// // // // // //             onClick={() => handleStatusUpdate(rowIndex, 'Checking')}
// // // // // //             disabled={isUpdating}
// // // // // //             className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // //               currentStatus === 'Checking' 
// // // // // //                 ? 'bg-yellow-100 text-yellow-800 border border-yellow-800' 
// // // // // //                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
// // // // // //             }`}
// // // // // //           >
// // // // // //             <Clock size={12} className="mr-1" /> Checking
// // // // // //           </button>
// // // // // //           {isUpdating && (
// // // // // //             <span className="text-xs italic text-gray-500">Updating...</span>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-white p-8">
// // // // // //       <div className="mb-8">
// // // // // //         <h1 className="text-3xl font-bold text-[#15212d]">Medical Review</h1>
// // // // // //         <p className="text-gray-600 mt-2">View and analyze medical review data</p>
// // // // // //       </div>
      
// // // // // //       <div className="flex items-center justify-between mb-6">
// // // // // //         <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // // //           <Search size={20} className="text-gray-500 mr-2" />
// // // // // //           <input
// // // // // //             type="text"
// // // // // //             placeholder="Search medical reviews..."
// // // // // //             className="bg-transparent border-none outline-none w-full"
// // // // // //             value={searchTerm}
// // // // // //             onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //           />
// // // // // //         </div>
        
// // // // // //         <div className="flex space-x-2">
// // // // // //           {!editMode ? (
// // // // // //             <button 
// // // // // //               onClick={() => setEditMode(true)} 
// // // // // //               className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md"
// // // // // //             >
// // // // // //               <Edit size={16} className="mr-1" /> Edit
// // // // // //             </button>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <button 
// // // // // //                 onClick={handleSave} 
// // // // // //                 className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md"
// // // // // //               >
// // // // // //                 <Save size={16} className="mr-1" /> Save
// // // // // //               </button>
// // // // // //               <button 
// // // // // //                 onClick={() => {
// // // // // //                   setEditMode(false);
// // // // // //                   setEditedData([...filteredData]); // Discard changes
// // // // // //                   setModifiedRows({});
// // // // // //                 }} 
// // // // // //                 className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md"
// // // // // //               >
// // // // // //                 <X size={16} className="mr-1" /> Cancel
// // // // // //               </button>
// // // // // //             </>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {error && (
// // // // // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// // // // // //           <p>{error}</p>
// // // // // //         </div>
// // // // // //       )}
      
// // // // // //       {editMode && focusedCell.row !== null && (
// // // // // //         <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // // //           <div className="mb-2 text-sm font-medium text-gray-800">
// // // // // //             Editing cell: Row {focusedCell.row + 1}, Column "{editedData && editedData[0] && Object.keys(editedData[0])[focusedCell.col]}"
// // // // // //           </div>
// // // // // //           <textarea
// // // // // //             className="w-full h-24 p-2 border rounded-md"
// // // // // //             value={focusedCellValue}
// // // // // //             onChange={(e) => {
// // // // // //               setFocusedCellValue(e.target.value);
// // // // // //               handleCellChange(focusedCell.row, Object.keys(editedData[0])[focusedCell.col], e.target.value);
// // // // // //             }}
// // // // // //           />
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {expandedCell && (
// // // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // //           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // // //             <div className="flex justify-between items-center mb-4">
// // // // // //               <h3 className="text-lg font-medium">{expandedCell.columnName}</h3>
// // // // // //               <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // // //                 <X size={20} />
// // // // // //               </button>
// // // // // //             </div>
// // // // // //             <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // // //               {expandedCell.value || ""}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {loading ? (
// // // // // //         <div className="flex justify-center items-center h-64">
// // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <>
// // // // // //           {editedData && editedData.length === 0 ? (
// // // // // //             <div className="bg-white rounded-lg shadow p-6 text-center">
// // // // // //               <p className="text-gray-600">No medical reviews found.</p>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // // //                 <div className="overflow-auto max-h-[75vh]">
// // // // // //                   <table className="min-w-full divide-y divide-gray-200">
// // // // // //                     <thead className="bg-[#15212d] text-white sticky top-0">
// // // // // //                       <tr>
// // // // // //                         {editedData && editedData.length > 0 && Object.keys(editedData[0]).map((col, idx) => {
// // // // // //                           // Show all columns including Status
// // // // // //                           return (
// // // // // //                             <th key={idx} className="px-6 py-3 text-left text-xs font-medium uppercase">
// // // // // //                               {col}
// // // // // //                             </th>
// // // // // //                           );
// // // // // //                         })}
// // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // // // //                       </tr>
// // // // // //                     </thead>
// // // // // //                     <tbody className="bg-white divide-y divide-gray-200">
// // // // // //                       {currentItems.map((item, rowIndex) => {
// // // // // //                         const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
// // // // // //                         return (
// // // // // //                           <tr key={rowIndex} className="hover:bg-gray-50">
// // // // // //                             {Object.entries(item).map(([key, value], colIndex) => {
// // // // // //                               // Format date fields
// // // // // //                               const formattedValue = key.toLowerCase().includes('date') 
// // // // // //                                 ? formatDate(value) 
// // // // // //                                 : value;
                              
// // // // // //                               return (
// // // // // //                                 <td 
// // // // // //                                   key={colIndex} 
// // // // // //                                   className="px-6 py-4 text-sm truncate cursor-pointer hover:bg-gray-100"
// // // // // //                                   title="Click to view full content"
// // // // // //                                   onClick={() => handleCellClick(actualRowIndex, colIndex, formattedValue, key)}
// // // // // //                                 >
// // // // // //                                   {editMode ? (
// // // // // //                                     <input
// // // // // //                                       className="w-full border p-2 text-xs"
// // // // // //                                       value={formattedValue || ''}
// // // // // //                                       onFocus={() => {
// // // // // //                                         setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // // // //                                         setFocusedCellValue(formattedValue || '');
// // // // // //                                       }}
// // // // // //                                       onChange={(e) => {
// // // // // //                                         handleCellChange(actualRowIndex, key, e.target.value);
// // // // // //                                         if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // // // //                                           setFocusedCellValue(e.target.value);
// // // // // //                                         }
// // // // // //                                       }}
// // // // // //                                     />
// // // // // //                                   ) : (
// // // // // //                                     truncateText(formattedValue, 30) || "-"
// // // // // //                                   )}
// // // // // //                                 </td>
// // // // // //                               );
// // // // // //                             })}
// // // // // //                             <td className="px-6 py-4 text-sm">
// // // // // //                               {renderStatusButtons(actualRowIndex)}
// // // // // //                             </td>
// // // // // //                           </tr>
// // // // // //                         );
// // // // // //                       })}
// // // // // //                     </tbody>
// // // // // //                   </table>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {editedData && editedData.length > itemsPerPage && (
// // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // //                   <div className="text-sm text-gray-700">
// // // // // //                     Showing {currentPage} of {Math.ceil(editedData.length / itemsPerPage)}
// // // // // //                   </div>
// // // // // //                   <div className="flex space-x-1">
// // // // // //                     <button
// // // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // // //                       disabled={currentPage === 1}
// // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // //                     >
// // // // // //                       <ChevronLeft size={16} />
// // // // // //                     </button>
// // // // // //                     {Array.from({ length: Math.min(5, Math.ceil(editedData.length / itemsPerPage)) }, (_, i) => {
// // // // // //                       const pageNum = currentPage <= 3 
// // // // // //                         ? i + 1 
// // // // // //                         : currentPage - 2 + i;
                      
// // // // // //                       if (pageNum <= Math.ceil(editedData.length / itemsPerPage)) {
// // // // // //                         return (
// // // // // //                           <button
// // // // // //                             key={i}
// // // // // //                             onClick={() => setCurrentPage(pageNum)}
// // // // // //                             className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // //                           >
// // // // // //                             {pageNum}
// // // // // //                           </button>
// // // // // //                         );
// // // // // //                       }
// // // // // //                       return null;
// // // // // //                     })}
// // // // // //                     <button
// // // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // // //                       disabled={currentPage === Math.ceil(editedData.length / itemsPerPage)}
// // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // //                     >
// // // // // //                       <ChevronRight size={16} />
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </>
// // // // // //           )}
// // // // // //         </>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default MedicalReview;
// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { ChevronLeft, ChevronRight, Search, CheckCircle, Edit, Save, ArrowLeft, X } from 'lucide-react';
// // // // // import DatabaseService from '../services/DatabaseService';

// // // // // const MedicalReviewContent = () => {
// // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // // // //   const [editMode, setEditMode] = useState(false);
// // // // //   const [statusUpdating, setStatusUpdating] = useState(null); // Track which row is updating status
// // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // //   const [modifiedRows, setModifiedRows] = useState({});

// // // // //   const itemsPerPage = 10;

// // // // //   // Fetch data from database and filter for approved records with AOI or ICSR comments
// // // // //   const fetchMedicalReviewData = async () => {
// // // // //     try {
// // // // //       // Use the standard fetchLiteratureReviews method which is available
// // // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // // //       // Debug: Check the structure of the first item
// // // // //       if (data.length > 0) {
// // // // //         console.log("First item fields:", Object.keys(data[0]));
// // // // //         console.log("First item sample:", data[0]);
// // // // //       }
      
// // // // //       // Filter for only Approved status AND Comments == "AOI" OR "ICSR"
// // // // //       const filteredData = data.filter(item => {
// // // // //         const commentField = item['Comments (ICSR, AOI, Not selected)'];
// // // // //         return (item.Status === 'Approved' || item.Status === 'Verified') &&
// // // // //                (commentField === 'AOI' || commentField === 'ICSR');
// // // // //       });
      
      
// // // // //       setLiteratureData(filteredData);
// // // // //       setLoading(false);
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching medical review data:", err);
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchMedicalReviewData();
// // // // //   }, []);

// // // // //   // Function to handle verification status update
// // // // //   const handleVerifyUpdate = async (rowIndex) => {
// // // // //     try {
// // // // //       // Get the actual record ID (Article PMID)
// // // // //       const row = selectedReviewData ? editedReviewData[rowIndex] : literatureData[rowIndex];
// // // // //       const recordId = row['Article PMID'];
      
// // // // //       if (!recordId) {
// // // // //         console.error("Row missing Article PMID:", row);
// // // // //         alert("Cannot update verification status: missing Article PMID identifier");
// // // // //         return;
// // // // //       }
      
// // // // //       // Set status updating indicator for this row
// // // // //       setStatusUpdating(rowIndex);
      
// // // // //       // Update the status field locally first (optimistic update)
// // // // //       if (selectedReviewData) {
// // // // //         const newData = [...editedReviewData];
// // // // //         newData[rowIndex]['Status'] = 'Verified';
// // // // //         setEditedReviewData(newData);
// // // // //       } else {
// // // // //         const newData = [...literatureData];
// // // // //         newData[rowIndex]['Status'] = 'Verified';
// // // // //         setLiteratureData(newData);
// // // // //       }
      
// // // // //       // Create updated record object with the new status
// // // // //       const updatedRecord = { ...row, Status: 'Verified' };
      
// // // // //       // Send the update to the server using the same method as the edit function
// // // // //       console.log(`Updating status for Article PMID ${recordId} to "Verified"`);
// // // // //       await DatabaseService.updateLiteratureReview(recordId, updatedRecord);
      
// // // // //       // Show feedback
// // // // //       alert(`Record marked as "Verified" successfully`);
      
// // // // //       // Refresh data to ensure we have the latest version
// // // // //       fetchMedicalReviewData();
      
// // // // //     } catch (err) {
// // // // //       console.error("Error updating verification status:", err);
// // // // //       alert(`Failed to update verification status: ${err.message}`);
      
// // // // //       // Revert the optimistic update if it failed
// // // // //       fetchMedicalReviewData();
      
// // // // //       // If in detail view, refresh the selected data
// // // // //       if (selectedReviewData) {
// // // // //         const rowData = literatureData.find(item => item['Article PMID'] === selectedReviewData[0]['Article PMID']);
// // // // //         if (rowData) {
// // // // //           const updatedDetailData = [...selectedReviewData];
// // // // //           updatedDetailData[rowIndex] = rowData;
// // // // //           setSelectedReviewData(updatedDetailData);
// // // // //           setEditedReviewData(updatedDetailData);
// // // // //         }
// // // // //       }
// // // // //     } finally {
// // // // //       setStatusUpdating(null);
// // // // //     }
// // // // //   };
  
// // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // //     const newData = [...editedReviewData];
// // // // //     const oldValue = newData[rowIndex][key];
// // // // //     newData[rowIndex][key] = value;
// // // // //     setEditedReviewData(newData);
    
// // // // //     // Track this row as modified
// // // // //     if (oldValue !== value) {
// // // // //       setModifiedRows(prev => ({
// // // // //         ...prev,
// // // // //         [rowIndex]: true
// // // // //       }));
// // // // //     }
// // // // //   };

// // // // //   const handleEditRow = (rowIndex) => {
// // // // //     const rowData = literatureData[rowIndex];
// // // // //     setSelectedReviewData([rowData]);
// // // // //     setEditedReviewData([rowData]);
// // // // //     setEditMode(true); // Start in edit mode directly
// // // // //     setDetailCurrentPage(1);
// // // // //   };

// // // // //   const handleSave = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       let successCount = 0;
// // // // //       let errorCount = 0;
      
// // // // //       console.log("Modified rows:", Object.keys(modifiedRows));
      
// // // // //       // Only save rows that were modified
// // // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // // //         const rowIndex = parseInt(rowIndexStr);
// // // // //         const row = editedReviewData[rowIndex];
        
// // // // //         // Use Article PMID as the ID
// // // // //         const recordId = row['Article PMID'];
        
// // // // //         if (!recordId) {
// // // // //           console.error("Row missing Article PMID:", row);
// // // // //           errorCount++;
// // // // //           continue; // Skip rows without Article PMID
// // // // //         }
        
// // // // //         try {
// // // // //           console.log(`Saving modified row with Article PMID ${recordId}:`, row);
// // // // //           const result = await DatabaseService.updateLiteratureReview(recordId, row);
// // // // //           console.log(`Save result for Article PMID ${recordId}:`, result);
// // // // //           successCount++;
// // // // //         } catch (rowErr) {
// // // // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // // // //           errorCount++;
// // // // //         }
// // // // //       }
      
// // // // //       setEditMode(false);
// // // // //       setLoading(false);
// // // // //       setModifiedRows({}); // Clear modified rows tracking
      
// // // // //       // Refresh the data after saving to get any server-side changes
// // // // //       fetchMedicalReviewData();
      
// // // // //       // If in detail view, update the selected record data
// // // // //       if (selectedReviewData && selectedReviewData.length > 0) {
// // // // //         setTimeout(() => {
// // // // //           const recordId = selectedReviewData[0]['Article PMID'];
// // // // //           const updatedRecord = literatureData.find(item => item['Article PMID'] === recordId);
// // // // //           if (updatedRecord) {
// // // // //             setSelectedReviewData([updatedRecord]);
// // // // //             setEditedReviewData([updatedRecord]);
// // // // //           }
// // // // //         }, 500);
// // // // //       }
      
// // // // //       // Show status message
// // // // //       if (errorCount > 0) {
// // // // //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// // // // //       } else if (successCount > 0) {
// // // // //         alert(`Successfully saved ${successCount} rows.`);
// // // // //       } else {
// // // // //         alert("No changes were made.");
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Error in save operation:", err);
// // // // //       setLoading(false);
// // // // //       alert(`Error saving changes: ${err.message}`);
// // // // //     }
// // // // //   };

// // // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // // //     if (!editMode) {
// // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // // //     }
// // // // //   };

// // // // //   const closeExpandedCell = () => {
// // // // //     setExpandedCell(null);
// // // // //   };

// // // // //   const closeDetailView = () => {
// // // // //     setSelectedReviewData(null);
// // // // //     setEditedReviewData(null);
// // // // //     setEditMode(false);
// // // // //     setFocusedCell({ row: null, col: null });
// // // // //     setFocusedCellValue('');
// // // // //     setExpandedCell(null);
// // // // //   };

// // // // //   // Improved format dates function with better error handling
// // // // //   const formatDate = (dateString) => {
// // // // //     if (!dateString) {
// // // // //       return "-";
// // // // //     }
    
// // // // //     try {
// // // // //       const date = new Date(dateString);
      
// // // // //       // Check if date is valid
// // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // //         return date.toISOString().split('T')[0];
// // // // //       } else {
// // // // //         // Try to handle it as a string if it contains date-like parts
// // // // //         if (typeof dateString === 'string' && dateString.includes('-')) {
// // // // //           // Simple handling for "YYYY-MM-DD" format
// // // // //           const parts = dateString.split('-');
// // // // //           if (parts.length === 3) {
// // // // //             return dateString.substring(0, 10); // Just take first 10 chars if it looks like a date
// // // // //           }
// // // // //         }
// // // // //         return dateString || "-";
// // // // //       }
// // // // //     } catch (e) {
// // // // //       console.error("Error parsing date:", e, dateString);
// // // // //       return dateString || "-";
// // // // //     }
// // // // //   };

// // // // //   // Function to find any date field in an object
// // // // //   const findDateField = (item) => {
// // // // //     if (!item) return null;
    
// // // // //     // Look for any key containing both "validation" and "date" in any case
// // // // //     const dateKey = Object.keys(item).find(key => 
// // // // //       key.toLowerCase().includes('validation') && 
// // // // //       key.toLowerCase().includes('date')
// // // // //     );
    
// // // // //     return dateKey ? item[dateKey] : null;
// // // // //   };

// // // // //   const filteredData = literatureData.filter(item => {
// // // // //     const searchLower = searchTerm.toLowerCase();
// // // // //     const dateValue = findDateField(item);
// // // // //     const commentField = item['Comments (ICSR, AOI, Not selected)'];
    
// // // // //     return (
// // // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // // // //       (item.title && item.title.toLowerCase().includes(searchLower)) ||
// // // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower)) ||
// // // // //       (commentField && commentField.toLowerCase().includes(searchLower))
// // // // //     );
// // // // //   });

// // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// // // // //   // Helper function to truncate text
// // // // //   const truncateText = (text, maxLength = 30) => {
// // // // //     if (!text) return "";
// // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // //   };

// // // // //   // For detailed view pagination
// // // // //   const detailCurrentItems = selectedReviewData ? 
// // // // //     selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage) : 
// // // // //     [];

// // // // //   // Function to render verified button for a row
// // // // //   const renderVerifyButton = (rowIndex, isDetailView = false) => {
// // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // //     const currentStatus = isDetailView ? 
// // // // //       editedReviewData[rowIndex]['Status'] : 
// // // // //       literatureData[rowIndex]['Status'];
    
// // // // //     return (
// // // // //       <div className="flex space-x-2 items-center">
// // // // //         {currentStatus && <span className="text-xs mr-2"><strong>{currentStatus}</strong></span>}
// // // // //         <button
// // // // //           onClick={() => {
// // // // //             if (window.confirm('Are you sure you want to mark this entry as verified? This action cannot be undone.')) {
// // // // //               handleVerifyUpdate(rowIndex);
// // // // //             }
// // // // //           }}
// // // // //           disabled={isUpdating || currentStatus === 'Verified'}
// // // // //           className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // //             currentStatus === 'Verified' 
// // // // //               ? 'bg-green-100 text-green-800' 
// // // // //               : 'bg-green-500 text-white hover:bg-green-600'
// // // // //           }`}
// // // // //         >
// // // // //           <CheckCircle size={12} className="mr-1" /> Verify
// // // // //         </button>
// // // // //         {isUpdating && (
// // // // //           <span className="text-xs italic text-gray-500">Updating...</span>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-white p-8">
// // // // //       {!selectedReviewData ? (
// // // // //         <>
// // // // //           <div className="mb-8">
// // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Medical Review</h1>
// // // // //             <p className="text-gray-600 mt-2">View approved literature review data marked as AOI or ICSR</p>
// // // // //           </div>
// // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Search by date, eMail, title or Drug..."
// // // // //               className="bg-transparent border-none outline-none w-full"
// // // // //               value={searchTerm}
// // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // //             />
// // // // //           </div>

// // // // //           {expandedCell && (
// // // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // //                 <div className="flex justify-between items-center mb-4">
// // // // //                   <h3 className="text-lg font-medium">
// // // // //                     {literatureData[expandedCell.row] && 
// // // // //                     Object.keys(literatureData[expandedCell.row])[expandedCell.col]}
// // // // //                   </h3>
// // // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // //                     <X size={20} />
// // // // //                   </button>
// // // // //                 </div>
// // // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // //                   {expandedCell.value || ""}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {loading ? (
// // // // //             <div className="flex justify-center items-center h-64">
// // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <>
// // // // //               <div className="overflow-auto max-h-[75vh]">
// // // // //                 <table className="w-full border border-gray-300 text-sm">
// // // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // // //                     <tr>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '100px' }}>Date</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '150px' }}>EMail</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>Title</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '150px' }}>Drug</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '100px' }}>Comment</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '100px' }}>Status</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '150px' }}>Actions</th>
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody>
// // // // //                     {currentItems.map((row, rowIndex) => {
// // // // //                       const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
// // // // //                       const dateValue = findDateField(row);
// // // // //                       return (
// // // // //                         <tr key={rowIndex} className="hover:bg-gray-50">
// // // // //                           <td className="border px-4 py-2 text-xs">
// // // // //                             {formatDate(dateValue)}
// // // // //                           </td>
// // // // //                           <td 
// // // // //                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // //                             onClick={() => handleCellClick(actualRowIndex, Object.keys(row).indexOf('Mail'), row.Mail)}
// // // // //                           >
// // // // //                             {truncateText(row.Mail, 25) || ''}
// // // // //                           </td>
// // // // //                           <td 
// // // // //                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // //                             onClick={() => handleCellClick(actualRowIndex, Object.keys(row).indexOf('title'), row.title)}
// // // // //                           >
// // // // //                             {truncateText(row.title, 25) || ''}
// // // // //                           </td>
// // // // //                           <td 
// // // // //                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // //                             onClick={() => handleCellClick(actualRowIndex, Object.keys(row).indexOf('Drug'), row.Drug)}
// // // // //                           >
// // // // //                             {truncateText(row.Drug, 25) || ''}
// // // // //                           </td>
// // // // //                           <td className="border px-4 py-2 text-xs">
// // // // //                             {row['Comments (ICSR, AOI, Not selected)'] || ''}
// // // // //                           </td>
// // // // //                           <td className="border px-4 py-2 text-xs">
// // // // //                             {row.Status || ''}
// // // // //                           </td>
// // // // //                           <td className="border px-4 py-2 text-xs flex space-x-2">
// // // // //                             {renderVerifyButton(actualRowIndex)}
// // // // //                             <button
// // // // //                               onClick={() => handleEditRow(actualRowIndex)}
// // // // //                               className="px-2 py-1 text-xs rounded flex items-center bg-blue-500 text-white hover:bg-blue-600"
// // // // //                             >
// // // // //                               <Edit size={12} className="mr-1" /> Edit
// // // // //                             </button>
// // // // //                           </td>
// // // // //                         </tr>
// // // // //                       );
// // // // //                     })}
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               </div>

// // // // //               {filteredData.length > itemsPerPage && (
// // // // //                 <div className="flex justify-between items-center mt-6">
// // // // //                   <div className="text-sm text-gray-700">
// // // // //                     Showing {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // // //                   </div>
// // // // //                   <div className="flex space-x-1">
// // // // //                     <button
// // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // //                       disabled={currentPage === 1}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // //                     >
// // // // //                       <ChevronLeft size={16} />
// // // // //                     </button>
// // // // //                     {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
// // // // //                       // Show pages around current page
// // // // //                       let pageToShow;
// // // // //                       if (Math.ceil(filteredData.length / itemsPerPage) <= 5) {
// // // // //                         pageToShow = i + 1;
// // // // //                       } else {
// // // // //                         const middle = Math.min(
// // // // //                           Math.max(currentPage, 3),
// // // // //                           Math.ceil(filteredData.length / itemsPerPage) - 2
// // // // //                         );
// // // // //                         pageToShow = middle - 2 + i;
// // // // //                       }
                      
// // // // //                       return (
// // // // //                         <button
// // // // //                           key={i}
// // // // //                           onClick={() => setCurrentPage(pageToShow)}
// // // // //                           className={`px-3 py-1 rounded-md ${currentPage === pageToShow ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // //                         >
// // // // //                           {pageToShow}
// // // // //                         </button>
// // // // //                       );
// // // // //                     })}
// // // // //                     <button
// // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // //                     >
// // // // //                       <ChevronRight size={16} />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}
// // // // //             </>
// // // // //           )}
// // // // //         </>
// // // // //       ) : (
// // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // //           <div className="flex justify-between items-center mb-4">
// // // // //             <div className="flex space-x-2">
// // // // //               <button onClick={closeDetailView} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // //               </button>
// // // // //               {!editMode ? (
// // // // //                 <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // //                   <Edit size={16} className="mr-1" /> Edit
// // // // //                 </button>
// // // // //               ) : (
// // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // //                   <Save size={16} className="mr-1" /> Save
// // // // //                 </button>
// // // // //               )}
// // // // //             </div>
// // // // //             <h3 className="text-xl font-medium text-[#15212d]">Record Details</h3>
// // // // //           </div>

// // // // //           {editMode && focusedCell.row !== null && (
// // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // //                 Editing cell: Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // // // //               </div>
// // // // //               <textarea
// // // // //                 className="w-full h-24 p-2 border rounded-md"
// // // // //                 value={focusedCellValue}
// // // // //                 onChange={(e) => {
// // // // //                   setFocusedCellValue(e.target.value);
// // // // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // // // //                 }}
// // // // //               />
// // // // //             </div>
// // // // //           )}

// // // // //           {expandedCell && (
// // // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // //                 <div className="flex justify-between items-center mb-4">
// // // // //                   <h3 className="text-lg font-medium">
// // // // //                     {editedReviewData[expandedCell.row] && 
// // // // //                      Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // // // //                   </h3>
// // // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // //                     <X size={20} />
// // // // //                   </button>
// // // // //                 </div>
// // // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // //                   {expandedCell.value || ""}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {loading ? (
// // // // //             <div className="flex justify-center items-center h-64">
// // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <>
// // // // //               <div className="overflow-auto max-h-[75vh]">
// // // // //                 <table className="w-full border border-gray-300 text-sm">
// // // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // // //                     <tr>
// // // // //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // // // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '150px' }}>
// // // // //                           {col}
// // // // //                         </th>
// // // // //                       ))}
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody>
// // // // //                     {detailCurrentItems.map((row, rowIndex) => {
// // // // //                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// // // // //                       return (
// // // // //                         <tr key={rowIndex} className="hover:bg-gray-50">
// // // // //                           {Object.entries(row).map(([key, val], colIndex) => (
// // // // //                             <td 
// // // // //                               key={colIndex} 
// // // // //                               className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // //                               onClick={() => {
// // // // //                                 if (!editMode) {
// // // // //                                   handleCellClick(actualRowIndex, colIndex, val);
// // // // //                                 }
// // // // //                               }}
// // // // //                               title="Click to view full content"
// // // // //                               style={{ minWidth: '150px', maxWidth: '300px' }}
// // // // //                             >
// // // // //                               {editMode ? (
// // // // //                                 <input
// // // // //                                   className="w-full border p-2 text-xs"
// // // // //                                   value={val || ''}
// // // // //                                   onFocus={() => {
// // // // //                                     setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // // //                                     setFocusedCellValue(val || '');
// // // // //                                   }}
// // // // //                                   onChange={(e) => {
// // // // //                                     handleCellChange(actualRowIndex, key, e.target.value);
// // // // //                                     if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // // //                                       setFocusedCellValue(e.target.value);
// // // // //                                     }
// // // // //                                   }}
// // // // //                                 />
// // // // //                               ) : (
// // // // //                                 truncateText(val, 25) || ''
// // // // //                               )}
// // // // //                             </td>
// // // // //                           ))}
// // // // //                         </tr>
// // // // //                       );
// // // // //                     })}
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               </div>

// // // // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // // // //                 <div className="flex justify-between items-center mt-6">
// // // // //                   <div className="text-sm text-gray-700">
// // // // //                     Showing {detailCurrentPage} of {Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // //                   </div>
// // // // //                   <div className="flex space-x-1">
// // // // //                     <button
// // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // // // //                       disabled={detailCurrentPage === 1}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // //                     >
// // // // //                       <ChevronLeft size={16} />
// // // // //                     </button>
// // // // //                     {Array.from({ length: Math.ceil(selectedReviewData.length / itemsPerPage) }, (_, i) => (
// // // // //                       <button
// // // // //                         key={i}
// // // // //                         onClick={() => setDetailCurrentPage(i + 1)}
// // // // //                         className={`px-3 py-1 rounded-md ${detailCurrentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // //                       >
// // // // //                         {i + 1}
// // // // //                       </button>
// // // // //                     ))}
// // // // //                     <button
// // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // // // //                       disabled={detailCurrentPage === Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // //                     >
// // // // //                       <ChevronRight size={16} />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}
// // // // //             </>
// // // // //           )}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default MedicalReviewContent;
// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { ChevronLeft, ChevronRight, Search, CheckCircle, Edit, Save, ArrowLeft, X, FileEdit } from 'lucide-react';
// // // // // import DatabaseService from '../services/DatabaseService';

// // // // // const MedicalReviewContent = () => {
// // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // //   const [filteredData, setFilteredData] = useState([]);
// // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // //   const [editingRecord, setEditingRecord] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [statusUpdating, setStatusUpdating] = useState(null);
// // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // //   const [error, setError] = useState(null);

// // // // //   const itemsPerPage = 10;

// // // // //   // Fetch all literature review data
// // // // //   const fetchMedicalReviewData = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // // //       // Debug: Check the structure of the first item
// // // // //       if (data.length > 0) {
// // // // //         console.log("First item fields:", Object.keys(data[0]));
// // // // //         console.log("First item sample:", data[0]);
// // // // //       }
      
// // // // //       // Filter for ONLY "Approved" status AND Comments is either "AOI" OR "ICSR"
// // // // //       const filteredData = data.filter(item => {
// // // // //         const status = item.Status || '';
// // // // //         const commentField = item['Comments (ICSR, AOI, Not selected)'] || '';
        
// // // // //         return (status === 'Approved' || status === 'Verified') &&
// // // // //                (commentField === 'AOI' || commentField === 'ICSR');
// // // // //       });
      
// // // // //       console.log(`Filtered ${filteredData.length} records out of ${data.length} total records`);
      
// // // // //       setLiteratureData(filteredData);
// // // // //       setFilteredData(filteredData);
// // // // //       setLoading(false);
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching medical review data:", err);
// // // // //       setError("Failed to load medical review data. Please try again later.");
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchMedicalReviewData();
// // // // //   }, []);

// // // // //   // Apply search filter
// // // // //   useEffect(() => {
// // // // //     if (!literatureData.length) return;
    
// // // // //     if (searchTerm) {
// // // // //       const searchLower = searchTerm.toLowerCase();
// // // // //       const searchResults = literatureData.filter(item => {
// // // // //         return Object.entries(item).some(([key, val]) => {
// // // // //           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
// // // // //         });
// // // // //       });
// // // // //       setFilteredData(searchResults);
// // // // //     } else {
// // // // //       setFilteredData(literatureData);
// // // // //     }
// // // // //   }, [searchTerm, literatureData]);

// // // // //   // Function to handle verification status update
// // // // //   const handleVerifyUpdate = async (rowIndex) => {
// // // // //     try {
// // // // //       // Get the row data
// // // // //       const row = filteredData[rowIndex];
// // // // //       const recordId = row['Article PMID'];
      
// // // // //       if (!recordId) {
// // // // //         console.error("Row missing Article PMID:", row);
// // // // //         alert("Cannot update verification status: missing Article PMID identifier");
// // // // //         return;
// // // // //       }
      
// // // // //       // Set status updating indicator for this row
// // // // //       setStatusUpdating(rowIndex);
      
// // // // //       // Update the status field locally first (optimistic update)
// // // // //       const updatedData = [...filteredData];
// // // // //       updatedData[rowIndex] = { ...updatedData[rowIndex], Status: 'Verified' };
// // // // //       setFilteredData(updatedData);
      
// // // // //       // Create updated record object with the new status
// // // // //       const updatedRecord = { ...row, Status: 'Verified' };
      
// // // // //       // Send the update to the server
// // // // //       console.log(`Updating status for Article PMID ${recordId} to "Verified"`);
// // // // //       await DatabaseService.updateLiteratureReview(recordId, updatedRecord);
      
// // // // //       // Show feedback
// // // // //       alert(`Record marked as "Verified" successfully`);
      
// // // // //       // Refresh data to ensure we have the latest version
// // // // //       fetchMedicalReviewData();
      
// // // // //     } catch (err) {
// // // // //       console.error("Error updating verification status:", err);
// // // // //       alert(`Failed to update verification status: ${err.message}`);
// // // // //       fetchMedicalReviewData();
// // // // //     } finally {
// // // // //       setStatusUpdating(null);
// // // // //     }
// // // // //   };

// // // // //   // Open record in form view for editing
// // // // //   const handleEditRow = (rowIndex) => {
// // // // //     const rowData = filteredData[rowIndex];
// // // // //     setEditingRecord(rowData);
// // // // //   };

// // // // //   // Save edited record
// // // // //   const handleSaveRecord = async () => {
// // // // //     try {
// // // // //       setLoading(true);
      
// // // // //       const recordId = editingRecord['Article PMID'];
// // // // //       if (!recordId) {
// // // // //         throw new Error("Missing Article PMID identifier");
// // // // //       }
      
// // // // //       console.log(`Saving changes for Article PMID ${recordId}:`, editingRecord);
// // // // //       await DatabaseService.updateLiteratureReview(recordId, editingRecord);
      
// // // // //       // Show feedback
// // // // //       alert("Changes saved successfully");
      
// // // // //       // Clear editing state
// // // // //       setEditingRecord(null);
      
// // // // //       // Refresh data
// // // // //       fetchMedicalReviewData();
// // // // //     } catch (err) {
// // // // //       console.error("Error saving record:", err);
// // // // //       alert(`Failed to save changes: ${err.message}`);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Handle field change in the edit form
// // // // //   const handleFieldChange = (field, value) => {
// // // // //     setEditingRecord(prev => ({
// // // // //       ...prev,
// // // // //       [field]: value
// // // // //     }));
// // // // //   };

// // // // //   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
// // // // //     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
// // // // //   };

// // // // //   const closeExpandedCell = () => {
// // // // //     setExpandedCell(null);
// // // // //   };

// // // // //   // Format dates function with better error handling
// // // // //   const formatDate = (dateString) => {
// // // // //     if (!dateString) return "-";
    
// // // // //     try {
// // // // //       const date = new Date(dateString);
      
// // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // //         return date.toISOString().split('T')[0];
// // // // //       } else if (typeof dateString === 'string' && dateString.includes('-')) {
// // // // //         const parts = dateString.split('-');
// // // // //         if (parts.length === 3) {
// // // // //           return dateString.substring(0, 10);
// // // // //         }
// // // // //       }
// // // // //       return dateString || "-";
// // // // //     } catch (e) {
// // // // //       console.error("Error parsing date:", e, dateString);
// // // // //       return dateString || "-";
// // // // //     }
// // // // //   };

// // // // //   // Find any date field in an object
// // // // //   const findDateField = (item) => {
// // // // //     if (!item) return null;
    
// // // // //     const dateKey = Object.keys(item).find(key => 
// // // // //       key.toLowerCase().includes('validation') && 
// // // // //       key.toLowerCase().includes('date')
// // // // //     );
    
// // // // //     return dateKey ? item[dateKey] : null;
// // // // //   };

// // // // //   // Helper function to truncate text
// // // // //   const truncateText = (text, maxLength = 30) => {
// // // // //     if (!text) return "";
// // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // //   };

// // // // //   // Get paginated items
// // // // //   const currentItems = filteredData.slice(
// // // // //     (currentPage - 1) * itemsPerPage, 
// // // // //     currentPage * itemsPerPage
// // // // //   );

// // // // //   // Function to render verified button for a row
// // // // //   const renderVerifyButton = (rowIndex) => {
// // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // //     const currentStatus = filteredData[rowIndex].Status || '';
// // // // //     const isVerified = currentStatus === 'Verified';
    
// // // // //     return (
// // // // //       <button
// // // // //         onClick={() => {
// // // // //           if (window.confirm('Are you sure you want to mark this entry as verified? This action cannot be undone.')) {
// // // // //             handleVerifyUpdate(rowIndex);
// // // // //           }
// // // // //         }}
// // // // //         disabled={isUpdating || isVerified}
// // // // //         className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // //           isVerified
// // // // //             ? 'bg-green-100 text-green-800 cursor-not-allowed'
// // // // //             : 'bg-green-500 text-white hover:bg-green-600'
// // // // //         }`}
// // // // //       >
// // // // //         <CheckCircle size={12} className="mr-1" /> 
// // // // //         {isVerified ? 'Verified' : 'Verify'}
// // // // //       </button>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-white p-8">
// // // // //       {/* Edit Form Modal */}
// // // // //       {editingRecord && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //           <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
// // // // //             <div className="flex justify-between items-center mb-4">
// // // // //               <h3 className="text-lg font-bold">Edit Record</h3>
// // // // //               <button 
// // // // //                 onClick={() => setEditingRecord(null)} 
// // // // //                 className="text-gray-500 hover:text-gray-700"
// // // // //               >
// // // // //                 <X size={20} />
// // // // //               </button>
// // // // //             </div>
            
// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// // // // //               {editingRecord && Object.entries(editingRecord).map(([key, value], index) => (
// // // // //                 <div key={index} className="mb-3">
// // // // //                   <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
// // // // //                   {key === 'Status' ? (
// // // // //                     <div className="text-sm py-2 px-3 bg-gray-100 rounded">
// // // // //                       {value === 'Verified' ? (
// // // // //                         <span className="font-medium text-green-700">{value} (cannot be changed)</span>
// // // // //                       ) : (
// // // // //                         value
// // // // //                       )}
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <textarea
// // // // //                       className="w-full p-2 border rounded-md text-sm"
// // // // //                       rows={key === 'title' || key === 'abstract' ? 4 : 2}
// // // // //                       value={value || ''}
// // // // //                       onChange={(e) => handleFieldChange(key, e.target.value)}
// // // // //                       disabled={value === 'Verified'}
// // // // //                     />
// // // // //                   )}
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
            
// // // // //             <div className="flex justify-end mt-4">
// // // // //               <button
// // // // //                 onClick={() => setEditingRecord(null)}
// // // // //                 className="mr-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={handleSaveRecord}
// // // // //                 className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
// // // // //               >
// // // // //                 Save Changes
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Main Content */}
// // // // //       <div className="mb-8">
// // // // //         <h1 className="text-3xl font-bold text-[#15212d]">Medical Review</h1>
// // // // //         <p className="text-gray-600 mt-2">View approved literature review data marked as AOI or ICSR</p>
// // // // //       </div>
      
// // // // //       <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // //         <Search size={20} className="text-gray-500 mr-2" />
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search records..."
// // // // //           className="bg-transparent border-none outline-none w-full"
// // // // //           value={searchTerm}
// // // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // // //         />
// // // // //       </div>

// // // // //       {error && (
// // // // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// // // // //           <p>{error}</p>
// // // // //         </div>
// // // // //       )}

// // // // //       {expandedCell && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // //             <div className="flex justify-between items-center mb-4">
// // // // //               <h3 className="text-lg font-medium">{expandedCell.columnName}</h3>
// // // // //               <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // //                 <X size={20} />
// // // // //               </button>
// // // // //             </div>
// // // // //             <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // //               {expandedCell.value || ""}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {loading ? (
// // // // //         <div className="flex justify-center items-center h-64">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <>
// // // // //           {filteredData.length === 0 ? (
// // // // //             <div className="bg-white rounded-lg shadow p-6 text-center">
// // // // //               <p className="text-gray-600">No medical reviews found matching the criteria.</p>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <>
// // // // //               <div className="overflow-auto max-h-[75vh]">
// // // // //                 <table className="w-full border border-gray-300 text-sm">
// // // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // // //                     <tr>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs">Date</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs">EMail</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs">Title</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs">Drug</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs">Comment</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs">Status</th>
// // // // //                       <th className="border px-4 py-3 text-left font-medium text-xs">Actions</th>
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody>
// // // // //                     {currentItems.map((row, rowIndex) => {
// // // // //                       const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
// // // // //                       const dateValue = findDateField(row);
// // // // //                       const isVerified = (row.Status || '') === 'Verified';
                      
// // // // //                       return (
// // // // //                         <tr key={rowIndex} className={`hover:bg-gray-50 ${isVerified ? 'bg-green-50' : ''}`}>
// // // // //                           <td className="border px-4 py-2 text-xs">
// // // // //                             {formatDate(dateValue)}
// // // // //                           </td>
// // // // //                           <td 
// // // // //                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // //                             onClick={() => handleCellClick(actualRowIndex, 1, row.Mail, 'EMail')}
// // // // //                           >
// // // // //                             {truncateText(row.Mail, 25) || ''}
// // // // //                           </td>
// // // // //                           <td 
// // // // //                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // //                             onClick={() => handleCellClick(actualRowIndex, 2, row.title, 'Title')}
// // // // //                           >
// // // // //                             {truncateText(row.title, 25) || ''}
// // // // //                           </td>
// // // // //                           <td 
// // // // //                             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // //                             onClick={() => handleCellClick(actualRowIndex, 3, row.Drug, 'Drug')}
// // // // //                           >
// // // // //                             {truncateText(row.Drug, 25) || ''}
// // // // //                           </td>
// // // // //                           <td className="border px-4 py-2 text-xs">
// // // // //                             {row['Comments (ICSR, AOI, Not selected)'] || ''}
// // // // //                           </td>
// // // // //                           <td className="border px-4 py-2 text-xs font-medium">
// // // // //                             <span className={isVerified ? 'text-green-700' : 'text-blue-700'}>
// // // // //                               {row.Status || ''}
// // // // //                             </span>
// // // // //                           </td>
// // // // //                           <td className="border px-4 py-2 text-xs">
// // // // //                             <div className="flex space-x-2 items-center">
// // // // //                               {renderVerifyButton(actualRowIndex)}
// // // // //                               <button
// // // // //                                 onClick={() => handleEditRow(actualRowIndex)}
// // // // //                                 disabled={isVerified}
// // // // //                                 className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // //                                   isVerified
// // // // //                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
// // // // //                                     : 'bg-blue-500 text-white hover:bg-blue-600'
// // // // //                                 }`}
// // // // //                                 title={isVerified ? "Verified records cannot be edited" : "Edit record"}
// // // // //                               >
// // // // //                                 <FileEdit size={12} className="mr-1" /> Edit
// // // // //                               </button>
// // // // //                             </div>
// // // // //                           </td>
// // // // //                         </tr>
// // // // //                       );
// // // // //                     })}
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               </div>

// // // // //               {filteredData.length > itemsPerPage && (
// // // // //                 <div className="flex justify-between items-center mt-6">
// // // // //                   <div className="text-sm text-gray-700">
// // // // //                     Showing page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // // //                   </div>
// // // // //                   <div className="flex space-x-1">
// // // // //                     <button
// // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // //                       disabled={currentPage === 1}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // // //                     >
// // // // //                       <ChevronLeft size={16} />
// // // // //                     </button>
// // // // //                     {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
// // // // //                       // Show pages around current page
// // // // //                       let pageToShow;
// // // // //                       if (Math.ceil(filteredData.length / itemsPerPage) <= 5) {
// // // // //                         pageToShow = i + 1;
// // // // //                       } else {
// // // // //                         const middle = Math.min(
// // // // //                           Math.max(currentPage, 3),
// // // // //                           Math.ceil(filteredData.length / itemsPerPage) - 2
// // // // //                         );
// // // // //                         pageToShow = middle - 2 + i;
// // // // //                       }
                      
// // // // //                       if (pageToShow > 0 && pageToShow <= Math.ceil(filteredData.length / itemsPerPage)) {
// // // // //                         return (
// // // // //                           <button
// // // // //                             key={i}
// // // // //                             onClick={() => setCurrentPage(pageToShow)}
// // // // //                             className={`px-3 py-1 rounded-md ${currentPage === pageToShow ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // //                           >
// // // // //                             {pageToShow}
// // // // //                           </button>
// // // // //                         );
// // // // //                       }
// // // // //                       return null;
// // // // //                     })}
// // // // //                     <button
// // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // // //                     >
// // // // //                       <ChevronRight size={16} />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}
// // // // //             </>
// // // // //           )}
// // // // //         </>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default MedicalReviewContent;
// // // // import React, { useEffect, useState } from 'react';
// // // // import { ChevronLeft, ChevronRight, Search, CheckCircle, Edit, Calendar, Save, ArrowLeft, X, FileEdit } from 'lucide-react';
// // // // import DatabaseService from '../services/DatabaseService';


// // // // const MedicalReviewContent = () => {
// // // //   const [literatureData, setLiteratureData] = useState([]);
// // // //   const [filteredData, setFilteredData] = useState([]);
// // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // //   const [editingRecord, setEditingRecord] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [statusUpdating, setStatusUpdating] = useState(null);
// // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // //   const [error, setError] = useState(null);
// // // //   const [columnNames, setColumnNames] = useState([]);

// // // //   const itemsPerPage = 10;

// // // //   // Fetch all literature review data
// // // //   const fetchMedicalReviewData = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       setError(null);
// // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // //       // Debug: Check the structure of the first item
// // // //       if (data.length > 0) {
// // // //         console.log("First item fields:", Object.keys(data[0]));
// // // //         console.log("First item sample:", data[0]);
        
// // // //         // Extract all column names from the first record
// // // //         setColumnNames(Object.keys(data[0]));
// // // //       }
      
// // // //       // Filter for ONLY "Approved" or "Verified" status AND Comments is either "AOI" OR "ICSR"
// // // //       const filteredData = data.filter(item => {
// // // //         const status = item.Status || '';
// // // //         const commentField = item['Comments (ICSR, AOI, Not selected)'] || '';
        
// // // //         return (status === 'Approved' || status === 'Verified') &&
// // // //                (commentField === 'AOI' || commentField === 'ICSR');
// // // //       });
      
// // // //       console.log(`Filtered ${filteredData.length} records out of ${data.length} total records`);
      
// // // //       setLiteratureData(filteredData);
// // // //       setFilteredData(filteredData);
// // // //       setLoading(false);
// // // //     } catch (err) {
// // // //       console.error("Error fetching medical review data:", err);
// // // //       setError("Failed to load medical review data. Please try again later.");
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchMedicalReviewData();
// // // //   }, []);

// // // //   // Apply search filter
// // // //   useEffect(() => {
// // // //     if (!literatureData.length) return;
    
// // // //     if (searchTerm) {
// // // //       const searchLower = searchTerm.toLowerCase();
// // // //       const searchResults = literatureData.filter(item => {
// // // //         return Object.entries(item).some(([key, val]) => {
// // // //           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
// // // //         });
// // // //       });
// // // //       setFilteredData(searchResults);
// // // //     } else {
// // // //       setFilteredData(literatureData);
// // // //     }
// // // //   }, [searchTerm, literatureData]);

// // // //   // Function to handle verification status update
// // // //   const handleVerifyUpdate = async (rowIndex) => {
// // // //     try {
// // // //       // Get the row data
// // // //       const row = filteredData[rowIndex];
// // // //       const recordId = row['Article PMID'];
// // // //       const drugName = row['Drug'];
      
// // // //       if (!recordId || !drugName) {
// // // //         console.error("Row missing Article PMID or Drug:", row);
// // // //         alert("Cannot update verification status: missing Article PMID or Drug identifier");
// // // //         return;
// // // //       }
      
// // // //       // Set status updating indicator for this row
// // // //       setStatusUpdating(rowIndex);
      
// // // //       // Update the status field locally first (optimistic update)
// // // //       const updatedData = [...filteredData];
// // // //       updatedData[rowIndex] = { ...updatedData[rowIndex], Status: 'Verified' };
// // // //       setFilteredData(updatedData);
      
// // // //       // Create updated record object with the new status
// // // //       const updatedRecord = { ...row, Status: 'Verified' };
      
// // // //       // Send the update to the server with Drug parameter
// // // //       console.log(`Updating status for Article PMID ${recordId}, Drug ${drugName} to "Verified"`);
// // // //       await DatabaseService.updateLiteratureReview(recordId, updatedRecord, { drug: drugName });
      
// // // //       // Show feedback
// // // //       alert(`Record marked as "Verified" successfully`);
      
// // // //       // Refresh data to ensure we have the latest version
// // // //       fetchMedicalReviewData();
      
// // // //     } catch (err) {
// // // //       console.error("Error updating verification status:", err);
// // // //       alert(`Failed to update verification status: ${err.message}`);
// // // //       fetchMedicalReviewData();
// // // //     } finally {
// // // //       setStatusUpdating(null);
// // // //     }
// // // //   };

// // // //   // Open record in form view for editing
// // // //   const handleEditRow = (rowIndex) => {
// // // //     const rowData = filteredData[rowIndex];
// // // //     setEditingRecord(rowData);
// // // //   };

// // // //   // Save edited record
// // // //   const handleSaveRecord = async () => {
// // // //     try {
// // // //       setLoading(true);
      
// // // //       const recordId = editingRecord['Article PMID'];
// // // //       const drugName = editingRecord['Drug'];
// // // //       if (!recordId || !drugName) {
// // // //         throw new Error("Missing Article PMID or Drug identifier");
// // // //       }
      
// // // //       console.log(`Saving changes for Article PMID ${recordId}, Drug ${drugName}:`, editingRecord);
// // // //       await DatabaseService.updateLiteratureReview(recordId, editingRecord, { drug: drugName });
      
// // // //       // Show feedback
// // // //       alert("Changes saved successfully");
      
// // // //       // Clear editing state
// // // //       setEditingRecord(null);
      
// // // //       // Refresh data
// // // //       fetchMedicalReviewData();
// // // //     } catch (err) {
// // // //       console.error("Error saving record:", err);
// // // //       alert(`Failed to save changes: ${err.message}`);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Handle field change in the edit form
// // // //   const handleFieldChange = (field, value) => {
// // // //     setEditingRecord(prev => ({
// // // //       ...prev,
// // // //       [field]: value
// // // //     }));
// // // //   };

// // // //   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
// // // //     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
// // // //   };

// // // //   const closeExpandedCell = () => {
// // // //     setExpandedCell(null);
// // // //   };

// // // //   // Format dates function with better error handling
// // // //   const formatDate = (dateString) => {
// // // //     if (!dateString) return "-";
    
// // // //     try {
// // // //       const date = new Date(dateString);
      
// // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // //         return date.toISOString().split('T')[0];
// // // //       } else if (typeof dateString === 'string' && dateString.includes('-')) {
// // // //         const parts = dateString.split('-');
// // // //         if (parts.length === 3) {
// // // //           return dateString.substring(0, 10);
// // // //         }
// // // //       }
// // // //       return dateString || "-";
// // // //     } catch (e) {
// // // //       console.error("Error parsing date:", e, dateString);
// // // //       return dateString || "-";
// // // //     }
// // // //   };

// // // //   // Find any date field in an object
// // // //   const findDateField = (item) => {
// // // //     if (!item) return null;
    
// // // //     const dateKey = Object.keys(item).find(key => 
// // // //       key.toLowerCase().includes('validation') && 
// // // //       key.toLowerCase().includes('date')
// // // //     );
    
// // // //     return dateKey ? item[dateKey] : null;
// // // //   };

// // // //   // Helper function to truncate text
// // // //   const truncateText = (text, maxLength = 30) => {
// // // //     if (!text) return "";
// // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // //   };

// // // //   // Get paginated items
// // // //   const currentItems = filteredData.slice(
// // // //     (currentPage - 1) * itemsPerPage, 
// // // //     currentPage * itemsPerPage
// // // //   );

// // // //   // Function to render verified button for a row
// // // //   const renderVerifyButton = (rowIndex) => {
// // // //     const isUpdating = statusUpdating === rowIndex;
// // // //     const currentStatus = filteredData[rowIndex].Status || '';
// // // //     const isVerified = currentStatus === 'Verified';
    
// // // //     return (
// // // //       <button
// // // //         onClick={() => {
// // // //           if (window.confirm('Are you sure you want to mark this entry as verified? This action cannot be undone.')) {
// // // //             handleVerifyUpdate(rowIndex);
// // // //           }
// // // //         }}
// // // //         disabled={isUpdating || isVerified}
// // // //         className={`px-2 py-1 text-xs rounded flex items-center ${
// // // //           isVerified
// // // //             ? 'bg-green-100 text-green-800 cursor-not-allowed'
// // // //             : 'bg-green-500 text-white hover:bg-green-600'
// // // //         }`}
// // // //       >
// // // //         <CheckCircle size={12} className="mr-1" /> 
// // // //         {isVerified ? 'Verified' : 'Verify'}
// // // //       </button>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-white p-8">
// // // //       {/* Edit Form Modal */}
// // // //       {editingRecord && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
// // // //           <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl animate-scale-in flex flex-col max-h-[95vh]">
// // // //             {/* Header */}
// // // //             <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#15212d] text-white rounded-t-lg">
// // // //               <h3 className="text-lg font-bold flex items-center">
// // // //                 <FileEdit size={18} className="mr-2" />
// // // //                 Edit Medical Review Record
// // // //               </h3>
// // // //               <button 
// // // //                 onClick={() => setEditingRecord(null)} 
// // // //                 className="text-white hover:text-red-300 transition-colors p-1 rounded-full hover:bg-[#143b50]"
// // // //               >
// // // //                 <X size={20} />
// // // //               </button>
// // // //             </div>
            
// // // //             {/* Form content - scrollable with balanced columns */}
// // // //             <div className="overflow-y-auto p-6 flex-grow" style={{maxHeight: "calc(95vh - 150px)"}}>
// // // //               {/* Case ID and Drug Banner */}
// // // //               {editingRecord['Article PMID'] && (
// // // //                 <div className="mb-6 bg-[#15212d] bg-opacity-10 p-3 rounded-md border-l-4 border-[#15212d] flex items-center flex-wrap">
// // // //                   <span className="font-semibold text-[#15212d] mr-2">Article PMID:</span>
// // // //                   <span className="text-[#15212d] mr-4">{editingRecord['Article PMID']}</span>
// // // //                   <span className="font-semibold text-[#15212d] mr-2">Drug:</span>
// // // //                   <span className="text-[#15212d]">{editingRecord['Drug']}</span>
// // // //                   <span className="ml-auto px-2 py-1 text-xs bg-[#15212d] text-white rounded-md">
// // // //                     {editingRecord['Status'] || 'No Status'}
// // // //                   </span>
// // // //                 </div>
// // // //               )}
              
// // // //               <div className="flex flex-col md:flex-row gap-6">
// // // //                 {/* Left Column */}
// // // //                 <div className="md:w-1/2 space-y-4">
// // // //                   {editingRecord && Object.entries(editingRecord)
// // // //                     .filter(([key]) => {
// // // //                       // Put specific fields in left column
// // // //                       const leftColumnFields = [
// // // //                         'Title', 'abstract', 'URL', 'Status', 'Article PMID',
// // // //                         'Search Date', 'Validation Processing Date', 'Search Term',
// // // //                         'Article Publication Date', 'Primary Author Address', 
// // // //                         'Primary Author Country', 'Drug'
// // // //                       ];
// // // //                       return leftColumnFields.includes(key);
// // // //                     })
// // // //                     .map(([key, value], index) => {
// // // //                       const isReadOnly = ['Status', 'Article PMID', 'Title', 'abstract', 'URL', 'Validation Processing Date', 'Search Term', 'Drug'].includes(key);
// // // //                       const isDateField = key.toLowerCase().includes('date');
                      
// // // //                       return (
// // // //                         <div key={index} className="mb-3">
// // // //                           <label className="block text-sm font-medium text-[#15212d] mb-1 flex items-center">
// // // //                             {isDateField && <Calendar size={14} className="mr-1 text-[#15212d]" />}
// // // //                             {key}
// // // //                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
// // // //                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
// // // //                             }`}>
// // // //                               {isReadOnly ? 'Read-only' : 'Editable'}
// // // //                             </span>
// // // //                           </label>
                          
// // // //                           {key === 'URL' ? (
// // // //                             <div className="flex items-center">
// // // //                               <input
// // // //                                 type="text"
// // // //                                 className={`w-full p-2 border rounded-md ${
// // // //                                   isReadOnly ? 'bg-gray-50 opacity-80 border-gray-300' : 'bg-white border-[#15212d] focus:outline-none focus:ring-2 focus:ring-[#15212d]'
// // // //                                 }`}
// // // //                                 value={value || ''}
// // // //                                 onChange={(e) => !isReadOnly && handleFieldChange(key, e.target.value)}
// // // //                                 readOnly={isReadOnly}
// // // //                               />
// // // //                               {value && (
// // // //                                 <a 
// // // //                                   href={value} 
// // // //                                   target="_blank" 
// // // //                                   rel="noopener noreferrer"
// // // //                                   className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
// // // //                                 >
// // // //                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // //                                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
// // // //                                     <polyline points="15 3 21 3 21 9"></polyline>
// // // //                                     <line x1="10" y1="14" x2="21" y2="3"></line>
// // // //                                   </svg>
// // // //                                 </a>
// // // //                               )}
// // // //                             </div>
// // // //                           ) : (
// // // //                             <textarea
// // // //                               className={`w-full p-2 border rounded-md ${
// // // //                                 isReadOnly ? 'bg-gray-50 opacity-80 border-gray-300' : 'bg-[#15212d] bg-opacity-5 border-[#15212d] focus:outline-none focus:ring-2 focus:ring-[#15212d]'
// // // //                               }`}
// // // //                               rows={key === 'Title' || key === 'abstract' ? 4 : 2}
// // // //                               value={value || ''}
// // // //                               onChange={(e) => !isReadOnly && handleFieldChange(key, e.target.value)}
// // // //                               readOnly={isReadOnly}
// // // //                             />
// // // //                           )}
// // // //                         </div>
// // // //                       );
// // // //                     })
// // // //                   }
// // // //                 </div>
                
// // // //                 {/* Right Column */}
// // // //                 <div className="md:w-1/2 space-y-4">
// // // //                   {editingRecord && Object.entries(editingRecord)
// // // //                     .filter(([key]) => {
// // // //                       // Filter out fields that are already in left column
// // // //                       const leftColumnFields = [
// // // //                         'Title', 'abstract', 'URL', 'Status', 'Article PMID',
// // // //                         'Search Date', 'Validation Processing Date', 'Search Term',
// // // //                         'Article Publication Date', 'Primary Author Address', 
// // // //                         'Primary Author Country', 'Drug'
// // // //                       ];
// // // //                       return !leftColumnFields.includes(key);
// // // //                     })
// // // //                     .map(([key, value], index) => {
// // // //                       // Define specific fields that should be read-only in the right column
// // // //                       const isReadOnly = ['Status', 'Article PMID', 'Summary'].includes(key);
// // // //                       const isCommentField = key === 'Comments (ICSR, AOI, Not selected)';
                      
// // // //                       return (
// // // //                         <div key={index} className="mb-3">
// // // //                           <label className="block text-sm font-medium text-[#15212d] mb-1 flex items-center">
// // // //                             {key}
// // // //                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
// // // //                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
// // // //                             }`}>
// // // //                               {isReadOnly ? 'Read-only' : 'Editable'}
// // // //                             </span>
// // // //                           </label>
// // // //                           <textarea
// // // //                             className={`w-full p-2 border rounded-md ${
// // // //                               isReadOnly ? 'bg-gray-50 opacity-80 border-gray-300' : 
// // // //                               isCommentField ? 'bg-yellow-50 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-[#15212d]' :
// // // //                               'bg-[#15212d] bg-opacity-5 border-[#15212d] focus:outline-none focus:ring-2 focus:ring-[#15212d]'
// // // //                             }`}
// // // //                             rows={key === 'Reason of Selection' || key === 'Summary' ? 4 : 2}
// // // //                             value={value || ''}
// // // //                             onChange={(e) => !isReadOnly && handleFieldChange(key, e.target.value)}
// // // //                             readOnly={isReadOnly}
// // // //                           />
// // // //                         </div>
// // // //                       );
// // // //                     })
// // // //                   }
// // // //                 </div>
// // // //               </div>
// // // //             </div>
            
// // // //             {/* Status and action buttons - fixed at bottom */}
// // // //             <div className="border-t border-gray-200 p-5 bg-gray-50 rounded-b-lg">
// // // //               <div className="flex flex-col md:flex-row gap-4">
// // // //                 {/* Status section */}
// // // //                 <div className="flex-grow">
// // // //                   <h4 className="font-medium text-[#15212d] mb-3 text-sm">Record Status</h4>
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {editingRecord && editingRecord['Status'] === 'Verified' ? (
// // // //                       <div className="px-3 py-2 text-sm rounded-md flex items-center bg-blue-100 text-blue-800 border border-blue-200">
// // // //                         <CheckCircle size={14} className="mr-2" /> 
// // // //                         Verified (No changes allowed)
// // // //                       </div>
// // // //                     ) : (
// // // //                       <>
// // // //                         <button
// // // //                           onClick={() => {
// // // //                             if (window.confirm('Are you sure you want to mark this entry as verified? This action cannot be undone.')) {
// // // //                               handleFieldChange('Status', 'Verified');
// // // //                             }
// // // //                           }}
// // // //                           disabled={editingRecord && editingRecord['Status'] === 'Verified'}
// // // //                           className="px-3 py-2 text-sm rounded-md flex items-center bg-green-500 text-white hover:bg-green-600 transition-colors"
// // // //                         >
// // // //                           <CheckCircle size={14} className="mr-2" /> 
// // // //                           Mark as Verified
// // // //                         </button>
// // // //                       </>
// // // //                     )}
                    
// // // //                     {/* Show current status pill */}
// // // //                     {editingRecord && editingRecord['Status'] && (
// // // //                       <div className="flex items-center ml-auto md:ml-2 px-3 py-2 text-sm bg-gray-100 rounded-md">
// // // //                         <span className="mr-2 text-gray-500">Current:</span>
// // // //                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // //                           editingRecord['Status'] === 'Approved' ? 'bg-green-100 text-green-800' :
// // // //                           editingRecord['Status'] === 'Verified' ? 'bg-blue-100 text-blue-800' :
// // // //                           'bg-gray-200 text-gray-800'
// // // //                         }`}>
// // // //                           {editingRecord['Status']}
// // // //                         </span>
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
                
// // // //                 {/* Form actions */}
// // // //                 <div className="flex space-x-3 items-center md:border-l md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 mt-3 md:mt-0">
// // // //                   <button
// // // //                     onClick={() => setEditingRecord(null)}
// // // //                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
// // // //                   >
// // // //                     Cancel
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={handleSaveRecord}
// // // //                     disabled={loading}
// // // //                     className="px-4 py-2 bg-[#15212d] text-white rounded-md hover:bg-[#143b50] transition-colors disabled:opacity-70 flex items-center"
// // // //                   >
// // // //                     {loading ? (
// // // //                       <>
// // // //                         <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
// // // //                         Saving...
// // // //                       </>
// // // //                     ) : (
// // // //                       <>
// // // //                         <Save size={16} className="mr-2" /> 
// // // //                         Save Changes
// // // //                       </>
// // // //                     )}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //       {/* Main Content */}
// // // //       <div className="mb-8">
// // // //         <h1 className="text-3xl font-bold text-[#15212d]">Medical Review</h1>
// // // //         <p className="text-gray-600 mt-2">View approved literature review data marked as AOI or ICSR</p>
// // // //       </div>
      
// // // //       <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // //         <Search size={20} className="text-gray-500 mr-2" />
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search records..."
// // // //           className="bg-transparent border-none outline-none w-full"
// // // //           value={searchTerm}
// // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // //         />
// // // //       </div>

// // // //       {error && (
// // // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// // // //           <p>{error}</p>
// // // //         </div>
// // // //       )}

// // // //       {expandedCell && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // //             <div className="flex justify-between items-center mb-4">
// // // //               <h3 className="text-lg font-medium">{expandedCell.columnName}</h3>
// // // //               <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // //                 <X size={20} />
// // // //               </button>
// // // //             </div>
// // // //             <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // //               {expandedCell.value || ""}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {loading ? (
// // // //         <div className="flex justify-center items-center h-64">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           {filteredData.length === 0 ? (
// // // //             <div className="bg-white rounded-lg shadow p-6 text-center">
// // // //               <p className="text-gray-600">No medical reviews found matching the criteria.</p>
// // // //             </div>
// // // //           ) : (
// // // //             <>
// // // //               <div className="overflow-auto max-h-[75vh]">
// // // //                 <table className="w-full border border-gray-300 text-sm relative">
// // // //                   <thead className="bg-[#15212d] text-white sticky top-0 z-10">
// // // //                     <tr>
// // // //                       {/* Display all column headers dynamically */}
// // // //                       {columnNames.map((columnName, index) => (
// // // //                         <th key={index} className="border px-4 py-3 text-left font-medium text-xs">
// // // //                           {columnName}
// // // //                         </th>
// // // //                       ))}
// // // //                       <th className="border px-4 py-3 text-left font-medium text-xs sticky right-0 bg-[#15212d] z-20">Actions</th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody>
// // // //                     {currentItems.map((row, rowIndex) => {
// // // //                       const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
// // // //                       const isVerified = (row.Status || '') === 'Verified';
                      
// // // //                       return (
// // // //                         <tr key={rowIndex} className={`hover:bg-gray-50 ${isVerified ? 'bg-green-50' : ''}`}>
// // // //                           {/* Display all columns dynamically */}
// // // //                           {columnNames.map((columnName, columnIndex) => (
// // // //                             <td 
// // // //                               key={columnIndex}
// // // //                               className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // //                               onClick={() => handleCellClick(actualRowIndex, columnIndex, row[columnName], columnName)}
// // // //                             >
// // // //                               {columnName.toLowerCase().includes('date') 
// // // //                                 ? formatDate(row[columnName])
// // // //                                 : truncateText(row[columnName], 25) || ''}
// // // //                             </td>
// // // //                           ))}
// // // //                           <td className="border px-4 py-2 text-xs sticky right-0 bg-white z-10">
// // // //                             <div className="flex space-x-2 items-center">
// // // //                               {renderVerifyButton(actualRowIndex)}
// // // //                               <button
// // // //                                 onClick={() => handleEditRow(actualRowIndex)}
// // // //                                 disabled={isVerified}
// // // //                                 className={`px-2 py-1 text-xs rounded flex items-center ${
// // // //                                   isVerified
// // // //                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
// // // //                                     : 'bg-blue-500 text-white hover:bg-blue-600'
// // // //                                 }`}
// // // //                                 title={isVerified ? "Verified records cannot be edited" : "Edit record"}
// // // //                               >
// // // //                                 <FileEdit size={12} className="mr-1" /> Edit
// // // //                               </button>
// // // //                             </div>
// // // //                           </td>
// // // //                         </tr>
// // // //                       );
// // // //                     })}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>

// // // //               {filteredData.length > itemsPerPage && (
// // // //                 <div className="flex justify-between items-center mt-6">
// // // //                   <div className="text-sm text-gray-700">
// // // //                     Showing page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // //                   </div>
// // // //                   <div className="flex space-x-1">
// // // //                     <button
// // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // //                       disabled={currentPage === 1}
// // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // //                     >
// // // //                       <ChevronLeft size={16} />
// // // //                     </button>
// // // //                     {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
// // // //                       // Show pages around current page
// // // //                       let pageToShow;
// // // //                       if (Math.ceil(filteredData.length / itemsPerPage) <= 5) {
// // // //                         pageToShow = i + 1;
// // // //                       } else {
// // // //                         const middle = Math.min(
// // // //                           Math.max(currentPage, 3),
// // // //                           Math.ceil(filteredData.length / itemsPerPage) - 2
// // // //                         );
// // // //                         pageToShow = middle - 2 + i;
// // // //                       }
                      
// // // //                       if (pageToShow > 0 && pageToShow <= Math.ceil(filteredData.length / itemsPerPage)) {
// // // //                         return (
// // // //                           <button
// // // //                             key={i}
// // // //                             onClick={() => setCurrentPage(pageToShow)}
// // // //                             className={`px-3 py-1 rounded-md ${currentPage === pageToShow ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // //                           >
// // // //                             {pageToShow}
// // // //                           </button>
// // // //                         );
// // // //                       }
// // // //                       return null;
// // // //                     })}
// // // //                     <button
// // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // //                     >
// // // //                       <ChevronRight size={16} />
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </>
// // // //           )}
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MedicalReviewContent;
// // // import React, { useEffect, useState } from 'react';
// // // import { ChevronLeft, ChevronRight, Search, CheckCircle, Edit, Calendar, Save, ArrowLeft, X, FileEdit } from 'lucide-react';
// // // import DatabaseService from '../services/DatabaseService';

// // // const MedicalReviewContent = () => {
// // //   const [literatureData, setLiteratureData] = useState([]);
// // //   const [filteredData, setFilteredData] = useState([]);
// // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // //   const [editingRecord, setEditingRecord] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [statusUpdating, setStatusUpdating] = useState(null);
// // //   const [expandedCell, setExpandedCell] = useState(null);
// // //   const [error, setError] = useState(null);
// // //   const [columnNames, setColumnNames] = useState([]);
// // //   const [clientId] = useState(`client-${Math.random().toString(36).substr(2, 9)}`); // Unique client ID for locking

// // //   const itemsPerPage = 10;

// // //   // Fetch medical review data
// // //   const fetchMedicalReviewData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const data = await DatabaseService.fetchMedicalReviews();
      
// // //       if (data.length > 0) {
// // //         console.log("First item fields:", Object.keys(data[0]));
// // //         console.log("First item sample:", data[0]);
// // //         setColumnNames(Object.keys(data[0]));
// // //       }
      
// // //       console.log(`Fetched ${data.length} medical review records`);
// // //       setLiteratureData(data);
// // //       setFilteredData(data);
// // //       setLoading(false);
// // //     } catch (err) {
// // //       console.error("Error fetching medical review data:", err);
// // //       setError("Failed to load medical review data. Please try again later.");
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchMedicalReviewData();
// // //   }, []);

// // //   // Apply search filter
// // //   useEffect(() => {
// // //     if (!literatureData.length) return;
    
// // //     if (searchTerm) {
// // //       const searchLower = searchTerm.toLowerCase();
// // //       const searchResults = literatureData.filter(item => {
// // //         return Object.entries(item).some(([key, val]) => {
// // //           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
// // //         });
// // //       });
// // //       setFilteredData(searchResults);
// // //     } else {
// // //       setFilteredData(literatureData);
// // //     }
// // //   }, [searchTerm, literatureData]);
// // // const showToast = (message, type = 'success') => {
// // //   const toast = document.createElement('div');
// // //   toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg text-white z-50 animate-slide-in ${
// // //     type === 'success' ? 'bg-green-500' : 'bg-red-500'
// // //   }`;
// // //   toast.innerText = message;
// // //   document.body.appendChild(toast);

// // //   setTimeout(() => {
// // //     toast.classList.replace('animate-slide-in', 'animate-slide-out');
// // //     setTimeout(() => {
// // //       document.body.removeChild(toast);
// // //     }, 300);
// // //   }, 3000);
// // // };

// // // const handleVerifyUpdate = async (rowIndex) => {
// // //   try {
// // //     const row = filteredData[rowIndex];
// // //     const recordId = row['Article PMID'];
// // //     const drugName = row['Drug'];
    
// // //     if (!recordId) {
// // //       console.error("Missing Article PMID in row:", row);
// // //       showToast("Cannot update verification status: missing Article PMID", "error");
// // //       return;
// // //     }
// // //     if (!drugName) {
// // //       console.error("Missing Drug in row:", row);
// // //       showToast("Cannot update verification status: missing Drug identifier", "error");
// // //       return;
// // //     }
    
// // //     console.log(`Attempting to verify: Article PMID=${recordId}, Drug=${drugName}, ClientId=${clientId}`);
    
// // //     // Acquire lock
// // //     await DatabaseService.acquireLock(recordId, clientId);
    
// // //     setStatusUpdating(rowIndex);

// // //     // Update all matching rows in filteredData
// // //     const updatedFilteredData = filteredData.map(item => {
// // //       if (
// // //         (item['Article PMID'] === recordId || item.id === recordId) &&
// // //         item['Drug'] === drugName
// // //       ) {
// // //         return { ...item, Status: 'Verified' };
// // //       }
// // //       return item;
// // //     });
// // //     setFilteredData(updatedFilteredData);

// // //     // Update all matching rows in literatureData to keep source data in sync
// // //     const updatedLiteratureData = literatureData.map(item => {
// // //       if (
// // //         (item['Article PMID'] === recordId || item.id === recordId) &&
// // //         item['Drug'] === drugName
// // //       ) {
// // //         return { ...item, Status: 'Verified' };
// // //       }
// // //       return item;
// // //     });
// // //     setLiteratureData(updatedLiteratureData);
    
// // //     const updatedRecord = { ...row, Status: 'Verified', clientId };
    
// // //     console.log(`Updating status for Article PMID=${recordId}, Drug=${drugName} to "Verified"`);
// // //     const response = await DatabaseService.updateMedicalReview(recordId, updatedRecord, { drug: drugName });
    
// // //     showToast(`Successfully updated ${response.rowsAffected} row(s)`);
// // //     await DatabaseService.releaseLock(recordId, clientId);
// // //     fetchMedicalReviewData();
// // //   } catch (err) {
// // //     console.error("Error updating verification status:", err);
// // //     showToast(`Failed to update verification status: ${err.message}`, "error");
// // //     const row = filteredData[rowIndex];
// // //     if (row && row['Article PMID']) {
// // //       await DatabaseService.releaseLock(row['Article PMID'], clientId).catch(() => {});
// // //     }
// // //     fetchMedicalReviewData();
// // //   } finally {
// // //     setStatusUpdating(null);
// // //   }
// // // };

// // //   // Open record in form view for editing
// // //   const handleEditRow = (rowIndex) => {
// // //     const rowData = filteredData[rowIndex];
// // //     setEditingRecord(rowData);
// // //   };
// // // const handleSaveRecord = async () => {
// // //   try {
// // //     setLoading(true);
// // //     const recordId = editingRecord['Article PMID'];
// // //     const drugName = editingRecord['Drug'];
// // //     if (!recordId) {
// // //       console.error("Missing Article PMID in editingRecord:", editingRecord);
// // //       throw new Error("Missing Article PMID");
// // //     }
// // //     if (!drugName) {
// // //       console.error("Missing Drug in editingRecord:", editingRecord);
// // //       throw new Error("Missing Drug identifier");
// // //     }
    
// // //     console.log(`Saving medical review data: Article PMID=${recordId}, Drug=${drugName}, ClientId=${clientId}, Data=`, editingRecord);
    
// // //     // Acquire lock
// // //     await DatabaseService.acquireLock(recordId, clientId);
    
// // //     const response = await DatabaseService.updateMedicalReview(recordId, { ...editingRecord, clientId }, { drug: drugName });
    
// // //     alert(`Successfully updated ${response.rowsAffected} row(s)`);
// // //     await DatabaseService.releaseLock(recordId, clientId);
// // //     setEditingRecord(null);
// // //     fetchMedicalReviewData();
// // //   } catch (err) {
// // //     console.error("Error saving medical review:", err);
// // //     alert(`Failed to save changes: ${err.message}`);
// // //     await DatabaseService.releaseLock(editingRecord['Article PMID'], clientId).catch(() => {});
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };
// // //   // Handle field change in the edit form
// // //   const handleFieldChange = (field, value) => {
// // //     setEditingRecord(prev => ({
// // //       ...prev,
// // //       [field]: value
// // //     }));
// // //   };

// // //   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
// // //     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
// // //   };

// // //   const closeExpandedCell = () => {
// // //     setExpandedCell(null);
// // //   };

// // //   // Format dates function
// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return "-";
// // //     try {
// // //       const date = new Date(dateString);
// // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // //         return date.toISOString().split('T')[0];
// // //       } else if (typeof dateString === 'string' && dateString.includes('-')) {
// // //         return dateString.substring(0, 10);
// // //       }
// // //       return dateString || "-";
// // //     } catch (e) {
// // //       console.error("Error parsing date:", e, dateString);
// // //       return dateString || "-";
// // //     }
// // //   };

// // //   // Find any date field in an object
// // //   const findDateField = (item) => {
// // //     if (!item) return null;
// // //     const dateKey = Object.keys(item).find(key => 
// // //       key.toLowerCase().includes('validation') && 
// // //       key.toLowerCase().includes('date')
// // //     );
// // //     return dateKey ? item[dateKey] : null;
// // //   };

// // //   // Helper function to truncate text
// // //   const truncateText = (text, maxLength = 30) => {
// // //     if (!text) return "";
// // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // //   };

// // //   // Get paginated items
// // //   const currentItems = filteredData.slice(
// // //     (currentPage - 1) * itemsPerPage, 
// // //     currentPage * itemsPerPage
// // //   );

// // //   // Function to render verified button for a row
// // //   const renderVerifyButton = (rowIndex) => {
// // //     const isUpdating = statusUpdating === rowIndex;
// // //     const currentStatus = filteredData[rowIndex].Status || '';
// // //     const isVerified = currentStatus === 'Verified';
    
// // //     return (
// // //       <button
// // //         onClick={() => {
// // //           if (window.confirm('Are you sure you want to mark this entry as verified? This action cannot be undone.')) {
// // //             handleVerifyUpdate(rowIndex);
// // //           }
// // //         }}
// // //         disabled={isUpdating || isVerified}
// // //         className={`px-2 py-1 text-xs rounded flex items-center ${
// // //           isVerified
// // //             ? 'bg-green-100 text-green-800 cursor-not-allowed'
// // //             : 'bg-green-500 text-white hover:bg-green-600'
// // //         }`}
// // //       >
// // //         <CheckCircle size={12} className="mr-1" /> 
// // //         {isVerified ? 'Verified' : 'Verify'}
// // //       </button>
// // //     );
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-white p-8">
// // //       {/* Edit Form Modal */}
// // //       {editingRecord && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
// // //           <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl animate-scale-in flex flex-col max-h-[95vh]">
// // //             <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#15212d] text-white rounded-t-lg">
// // //               <h3 className="text-lg font-bold flex items-center">
// // //                 <FileEdit size={18} className="mr-2" />
// // //                 Edit Medical Review Record
// // //               </h3>
// // //               <button 
// // //                 onClick={() => setEditingRecord(null)} 
// // //                 className="text-white hover:text-red-300 transition-colors p-1 rounded-full hover:bg-[#143b50]"
// // //               >
// // //                 <X size={20} />
// // //               </button>
// // //             </div>
            
// // //             <div className="overflow-y-auto p-6 flex-grow" style={{maxHeight: "calc(95vh - 150px)"}}>
// // //               {editingRecord['Article PMID'] && (
// // //                 <div className="mb-6 bg-[#15212d] bg-opacity-10 p-3 rounded-md border-l-4 border-[#15212d] flex items-center flex-wrap">
// // //                   <span className="font-semibold text-[#15212d] mr-2">Article PMID:</span>
// // //                   <span className="text-[#15212d] mr-4">{editingRecord['Article PMID']}</span>
// // //                   <span className="font-semibold text-[#15212d] mr-2">Drug:</span>
// // //                   <span className="text-[#15212d]">{editingRecord['Drug']}</span>
// // //                   <span className="ml-auto px-2 py-1 text-xs bg-[#15212d] text-white rounded-md">
// // //                     {editingRecord['Status'] || 'No Status'}
// // //                   </span>
// // //                 </div>
// // //               )}
              
// // //               <div className="flex flex-col md:flex-row gap-6">
// // //                 <div className="md:w-1/2 space-y-4">
// // //                   {editingRecord && Object.entries(editingRecord)
// // //                     .filter(([key]) => {
// // //                       const leftColumnFields = [
// // //                         'Title', 'abstract', 'URL', 'Status', 'Article PMID',
// // //                         'Search Date', 'Validation Processing Date', 'Search Term',
// // //                         'Article Publication Date', 'Primary Author Address', 
// // //                         'Primary Author Country', 'Drug'
// // //                       ];
// // //                       return leftColumnFields.includes(key);
// // //                     })
// // //                     .map(([key, value], index) => {
// // //                       const isReadOnly = ['Status', 'Article PMID', 'Title', 'abstract', 'URL', 'Validation Processing Date', 'Search Term', 'Drug'].includes(key);
// // //                       const isDateField = key.toLowerCase().includes('date');
                      
// // //                       return (
// // //                         <div key={index} className="mb-3">
// // //                           <label className="block text-sm font-medium text-[#15212d] mb-1 flex items-center">
// // //                             {isDateField && <Calendar size={14} className="mr-1 text-[#15212d]" />}
// // //                             {key}
// // //                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
// // //                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
// // //                             }`}>
// // //                               {isReadOnly ? 'Read-only' : 'Editable'}
// // //                             </span>
// // //                           </label>
                          
// // //                           {key === 'URL' ? (
// // //                             <div className="flex items-center">
// // //                               <input
// // //                                 type="text"
// // //                                 className={`w-full p-2 border rounded-md ${
// // //                                   isReadOnly ? 'bg-gray-50 opacity-80 border-gray-300' : 'bg-white border-[#15212d] focus:outline-none focus:ring-2 focus:ring-[#15212d]'
// // //                                 }`}
// // //                                 value={value || ''}
// // //                                 onChange={(e) => !isReadOnly && handleFieldChange(key, e.target.value)}
// // //                                 readOnly={isReadOnly}
// // //                               />
// // //                               {value && (
// // //                                 <a 
// // //                                   href={value} 
// // //                                   target="_blank" 
// // //                                   rel="noopener noreferrer"
// // //                                   className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
// // //                                 >
// // //                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //                                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
// // //                                     <polyline points="15 3 21 3 21 9"></polyline>
// // //                                     <line x1="10" y1="14" x2="21" y2="3"></line>
// // //                                   </svg>
// // //                                 </a>
// // //                               )}
// // //                             </div>
// // //                           ) : (
// // //                             <textarea
// // //                               className={`w-full p-2 border rounded-md ${
// // //                                 isReadOnly ? 'bg-gray-50 opacity-80 border-gray-300' : 'bg-[#15212d] bg-opacity-5 border-[#15212d] focus:outline-none focus:ring-2 focus:ring-[#15212d]'
// // //                               }`}
// // //                               rows={key === 'Title' || key === 'abstract' ? 4 : 2}
// // //                               value={value || ''}
// // //                               onChange={(e) => !isReadOnly && handleFieldChange(key, e.target.value)}
// // //                               readOnly={isReadOnly}
// // //                             />
// // //                           )}
// // //                         </div>
// // //                       );
// // //                     })
// // //                   }
// // //                 </div>
                
// // //                 <div className="md:w-1/2 space-y-4">
// // //                   {editingRecord && Object.entries(editingRecord)
// // //                     .filter(([key]) => {
// // //                       const leftColumnFields = [
// // //                         'Title', 'abstract', 'URL', 'Status', 'Article PMID',
// // //                         'Search Date', 'Validation Processing Date', 'Search Term',
// // //                         'Article Publication Date', 'Primary Author Address', 
// // //                         'Primary Author Country', 'Drug'
// // //                       ];
// // //                       return !leftColumnFields.includes(key);
// // //                     })
// // //                     .map(([key, value], index) => {
// // //                       const isReadOnly = ['Status', 'Article PMID', 'Summary'].includes(key);
// // //                       const isCommentField = key === 'Comments (ICSR, AOI, Not selected)';
                      
// // //                       return (
// // //                         <div key={index} className="mb-3">
// // //                           <label className="block text-sm font-medium text-[#15212d] mb-1 flex items-center">
// // //                             {key}
// // //                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
// // //                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
// // //                             }`}>
// // //                               {isReadOnly ? 'Read-only' : 'Editable'}
// // //                             </span>
// // //                           </label>
// // //                           <textarea
// // //                             className={`w-full p-2 border rounded-md ${
// // //                               isReadOnly ? 'bg-gray-50 opacity-80 border-gray-300' : 
// // //                               isCommentField ? 'bg-yellow-50 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-[#15212d]' :
// // //                               'bg-[#15212d] bg-opacity-5 border-[#15212d] focus:outline-none focus:ring-2 focus:ring-[#15212d]'
// // //                             }`}
// // //                             rows={key === 'Reason of Selection' || key === 'Summary' ? 4 : 2}
// // //                             value={value || ''}
// // //                             onChange={(e) => !isReadOnly && handleFieldChange(key, e.target.value)}
// // //                             readOnly={isReadOnly}
// // //                           />
// // //                         </div>
// // //                       );
// // //                     })
// // //                   }
// // //                 </div>
// // //               </div>
// // //             </div>
            
// // //             <div className="border-t border-gray-200 p-5 bg-gray-50 rounded-b-lg">
// // //               <div className="flex flex-col md:flex-row gap-4">
// // //                 <div className="flex-grow">
// // //                   <h4 className="font-medium text-[#15212d] mb-3 text-sm">Record Status</h4>
// // //                   <div className="flex flex-wrap gap-2">
// // //                     {editingRecord && editingRecord['Status'] === 'Verified' ? (
// // //                       <div className="px-3 py-2 text-sm rounded-md flex items-center bg-blue-100 text-blue-800 border border-blue-200">
// // //                         <CheckCircle size={14} className="mr-2" /> 
// // //                         Verified (No changes allowed)
// // //                       </div>
// // //                     ) : (
// // //                       <>
// // //                         <button
// // //                           onClick={() => {
// // //                             if (window.confirm('Are you sure you want to mark this entry as verified? This action cannot be undone.')) {
// // //                               handleFieldChange('Status', 'Verified');
// // //                             }
// // //                           }}
// // //                           disabled={editingRecord && editingRecord['Status'] === 'Verified'}
// // //                           className="px-3 py-2 text-sm rounded-md flex items-center bg-green-500 text-white hover:bg-green-600 transition-colors"
// // //                         >
// // //                           <CheckCircle size={14} className="mr-2" /> 
// // //                           Mark as Verified
// // //                         </button>
// // //                       </>
// // //                     )}
                    
// // //                     {editingRecord && editingRecord['Status'] && (
// // //                       <div className="flex items-center ml-auto md:ml-2 px-3 py-2 text-sm bg-gray-100 rounded-md">
// // //                         <span className="mr-2 text-gray-500">Current:</span>
// // //                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //                           editingRecord['Status'] === 'Approved' ? 'bg-green-100 text-green-800' :
// // //                           editingRecord['Status'] === 'Verified' ? 'bg-blue-100 text-blue-800' :
// // //                           'bg-gray-200 text-gray-800'
// // //                         }`}>
// // //                           {editingRecord['Status']}
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="flex space-x-3 items-center md:border-l md:pl-4 pt-3 md:border-t-0 mt-3 md:mt-0">
// // //                   <button
// // //                     onClick={() => setEditingRecord(null)}
// // //                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     onClick={handleSaveRecord}
// // //                     disabled={loading}
// // //                     className="px-4 py-2 bg-[#15212d] text-white rounded-md hover:bg-[#143b50] transition-colors disabled:opacity-70 flex items-center"
// // //                   >
// // //                     {loading ? (
// // //                       <>
// // //                         <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
// // //                         Saving...
// // //                       </>
// // //                     ) : (
// // //                       <>
// // //                         <Save size={16} className="mr-2" /> 
// // //                         Save Changes
// // //                       </>
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
      
// // //       <div className="mb-8">
// // //         <h1 className="text-3xl font-bold text-[#15212d]">Medical Review</h1>
// // //         <p className="text-gray-600 mt-2">View approved literature review data marked as AOI or ICSR</p>
// // //       </div>
      
// // //       <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // //         <Search size={20} className="text-gray-500 mr-2" />
// // //         <input
// // //           type="text"
// // //           placeholder="Search records..."
// // //           className="bg-transparent border-none outline-none w-full"
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //         />
// // //       </div>

// // //       {error && (
// // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// // //           <p>{error}</p>
// // //         </div>
// // //       )}

// // //       {expandedCell && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h3 className="text-lg font-medium">{expandedCell.columnName}</h3>
// // //               <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // //                 <X size={20} />
// // //               </button>
// // //             </div>
// // //             <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // //               {expandedCell.value || ""}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {loading ? (
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           {filteredData.length === 0 ? (
// // //             <div className="bg-white rounded-lg shadow p-6 text-center">
// // //               <p className="text-gray-600">No medical reviews found matching the criteria.</p>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               <div className="overflow-auto max-h-[75vh]">
// // //                 <table className="w-full border border-gray-300 text-sm relative">
// // //                   <thead className="bg-[#15212d] text-white sticky top-0 z-10">
// // //                     <tr>
// // //                       {columnNames.map((columnName, index) => (
// // //                         <th key={index} className="border px-4 py-3 text-left font-medium text-xs">
// // //                           {columnName}
// // //                         </th>
// // //                       ))}
// // //                       <th className="border px-4 py-3 text-left font-medium text-xs sticky right-0 bg-[#15212d] z-20">Actions</th>
// // //                     </tr>
// // //                   </thead>
// // // <tbody>
// // //   {currentItems.map((row, rowIndex) => {
// // //     const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
// // //     const isVerified = (row.Status || '') === 'Verified';
    
// // //     return (
// // //       <tr
// // //         key={`${row['Article PMID']}_${row['Drug']}_${actualRowIndex}`}
// // //         className={`hover:bg-gray-50 ${isVerified ? 'bg-green-50' : ''}`}
// // //       >
// // //         {columnNames.map((columnName, columnIndex) => (
// // //           <td 
// // //             key={columnIndex}
// // //             className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // //             onClick={() => handleCellClick(actualRowIndex, columnIndex, row[columnName], columnName)}
// // //           >
// // //             {columnName.toLowerCase().includes('date') 
// // //               ? formatDate(row[columnName])
// // //               : truncateText(row[columnName], 25) || ''}
// // //           </td>
// // //         ))}
// // //         <td className="border px-4 py-2 text-xs sticky right-0 bg-white z-10">
// // //           <div className="flex space-x-2 items-center">
// // //             {renderVerifyButton(actualRowIndex)}
// // //             <button
// // //               onClick={() => handleEditRow(actualRowIndex)}
// // //               disabled={isVerified}
// // //               className={`px-2 py-1 text-xs rounded flex items-center ${
// // //                 isVerified
// // //                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
// // //                   : 'bg-blue-500 text-white hover:bg-blue-600'
// // //               }`}
// // //               title={isVerified ? "Verified records cannot be edited" : "Edit record"}
// // //             >
// // //               <FileEdit size={12} className="mr-1" /> Edit
// // //             </button>
// // //           </div>
// // //         </td>
// // //       </tr>
// // //     );
// // //   })}
// // // </tbody>
// // //                 </table>
// // //               </div>

// // //               {filteredData.length > itemsPerPage && (
// // //                 <div className="flex justify-between items-center mt-6">
// // //                   <div className="text-sm text-gray-600">
// // //                     Showing page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // //                   </div>
// // //                   <div className="flex space-x-1">
// // //                     <button
// // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // //                       disabled={currentPage === 1}
// // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // //                     >
// // //                       <ChevronLeft size={16} />
// // //                     </button>
// // //                     {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
// // //                       let pageToShow;
// // //                       if (Math.ceil(filteredData.length / itemsPerPage) <= 5) {
// // //                         pageToShow = i + 1;
// // //                       } else {
// // //                         const middle = Math.min(
// // //                           Math.max(currentPage, 3),
// // //                           Math.ceil(filteredData.length / itemsPerPage) - 2
// // //                         );
// // //                         pageToShow = middle - 2 + i;
// // //                       }
                      
// // //                       if (pageToShow > 0 && pageToShow <= Math.ceil(filteredData.length / itemsPerPage)) {
// // //                         return (
// // //                           <button
// // //                             key={i}
// // //                             onClick={() => setCurrentPage(pageToShow)}
// // //                             className={`px-3 py-1 rounded-md ${currentPage === pageToShow ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // //                           >
// // //                             {pageToShow}
// // //                           </button>
// // //                         );
// // //                       }
// // //                       return null;
// // //                     })}
// // //                     <button
// // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // //                     >
// // //                       <ChevronRight size={16} />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </>
// // //           )}
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default MedicalReviewContent;

// // import React, { useEffect, useState } from 'react';
// // import { ChevronLeft, ChevronRight, Search, CheckCircle, Edit, Calendar, Save, ArrowLeft, X, FileEdit, ArrowUp, ArrowDown } from 'lucide-react';
// // import DatabaseService from '../services/DatabaseService';

// // const MedicalReviewContent = () => {
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
// //   const [columnNames, setColumnNames] = useState([]);
// //   const [clientId] = useState(`client-${Math.random().toString(36).substr(2, 9)}`);
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [sortOrder, setSortOrder] = useState(null);
// //   // State for inline comment editing
// //   const [commentEdits, setCommentEdits] = useState({}); // { [rowIndex]: comment }
// //   const [commentSaving, setCommentSaving] = useState(null); // rowIndex being saved

// //   const itemsPerPage = 10;

// //   const fetchMedicalReviewData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const data = await DatabaseService.fetchMedicalReviews();
      
// //       if (data.length > 0) {
// //         console.log("First item fields:", Object.keys(data[0]));
// //         console.log("First item sample:", data[0]);
// //         // Use provided columns
// //         const columns = [
// //           'Mail', 'Article PMID', 'Comments (ICSR, AOI, Not selected)', 'Url', 'Article Access',
// //           'Article Type', 'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
// //           'Abstract', 'Summary', 'Search Term', 'Drug', 'Article Publication Date',
// //           'Primary Author Address', 'Primary Author Country', 'Author Validation (Rule-1)',
// //           'Publication Date Validation (Rule-2)', 'Patient Type', 'Patient Details',
// //           'Patient Validation (Rule-3)', 'Reporter Details', 'Casuality Response',
// //           'Casuality Validation (Rule-4)', 'Reason of selection', 'Status', 'DocumentURL',
// //           'MedicalReviewerStatus', 'MedicalReviewerComments'
// //         ];
// //         setColumnNames(columns);
// //       }
      
// //       console.log(`Fetched ${data.length} medical review records`);
// //       // Map 'Search Date' to 'IRD' if necessary
// //       const mappedData = data.map(item => ({
// //         ...item,
// //         IRD: item['Search Date'] || item['IRD'],
// //       }));
// //       setLiteratureData(mappedData);
// //       setFilteredData(mappedData);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("Error fetching medical review data:", err);
// //       setError("Failed to load medical review data. Please try again later.");
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMedicalReviewData();
// //   }, []);

// //   useEffect(() => {
// //     if (!literatureData.length) return;
    
// //     let filtered = literatureData;

// //     if (searchTerm) {
// //       const searchLower = searchTerm.toLowerCase();
// //       filtered = filtered.filter(item => {
// //         return Object.entries(item).some(([key, val]) => {
// //           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
// //         });
// //       });
// //     }

// //     if (startDate || endDate) {
// //       filtered = filtered.filter(item => {
// //         const dateStr = item['IRD'] || item['Search Date'];
// //         if (!dateStr) return false;
// //         const itemDate = new Date(dateStr);
// //         if (isNaN(itemDate.getTime())) return false;

// //         const start = startDate ? new Date(startDate) : null;
// //         const end = endDate ? new Date(endDate) : null;

// //         return (
// //           (!start || itemDate >= start) &&
// //           (!end || itemDate <= end)
// //         );
// //       });
// //     }

// //     if (sortOrder) {
// //       filtered = [...filtered].sort((a, b) => {
// //         const dateA = new Date(a['IRD'] || a['Search Date'] || '');
// //         const dateB = new Date(b['IRD'] || b['Search Date'] || '');
// //         if (isNaN(dateA.getTime())) return sortOrder === 'asc' ? 1 : -1;
// //         if (isNaN(dateB.getTime())) return sortOrder === 'asc' ? -1 : 1;
// //         return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
// //       });
// //     }

// //     setFilteredData(filtered);
// //     setCurrentPage(1);
// //   }, [searchTerm, startDate, endDate, sortOrder, literatureData]);

// //   const showToast = (message, type = 'success') => {
// //     const toast = document.createElement('div');
// //     toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg text-white z-50 animate-slide-in ${
// //       type === 'success' ? 'bg-green-500' : 'bg-red-500'
// //     }`;
// //     toast.innerText = message;
// //     document.body.appendChild(toast);

// //     setTimeout(() => {
// //       toast.classList.replace('animate-slide-in', 'animate-slide-out');
// //       setTimeout(() => {
// //         document.body.removeChild(toast);
// //       }, 300);
// //     }, 3000);
// //   };

// //   const handleVerifyUpdate = async (rowIndex) => {
// //     try {
// //       const row = filteredData[rowIndex];
// //       const recordId = row['Article PMID'];
// //       const drugName = row['Drug'];
      
// //       if (!recordId) {
// //         console.error("Missing Article PMID in row:", row);
// //         showToast("Cannot update verification status: missing Article PMID", "error");
// //         return;
// //       }
// //       if (!drugName) {
// //         console.error("Missing Drug in row:", row);
// //         showToast("Cannot update verification status: missing Drug identifier", "error");
// //         return;
// //       }
      
// //       console.log(`Attempting to verify: Article PMID=${recordId}, Drug=${drugName}, ClientId=${clientId}`);
      
// //       await DatabaseService.acquireLock(recordId, clientId);
      
// //       setStatusUpdating(rowIndex);

// //       const updatedFilteredData = filteredData.map(item => {
// //         if (
// //           (item['Article PMID'] === recordId || item.id === recordId) &&
// //           item['Drug'] === drugName
// //         ) {
// //           return { ...item, Status: 'Verified', MedicalReviewerStatus: 'Verified' };
// //         }
// //         return item;
// //       });
// //       setFilteredData(updatedFilteredData);

// //       const updatedLiteratureData = literatureData.map(item => {
// //         if (
// //           (item['Article PMID'] === recordId || item.id === recordId) &&
// //           item['Drug'] === drugName
// //         ) {
// //           return { ...item, Status: 'Verified', MedicalReviewerStatus: 'Verified' };
// //         }
// //         return item;
// //       });
// //       setLiteratureData(updatedLiteratureData);
      
// //       const updatedRecord = { ...row, Status: 'Verified', MedicalReviewerStatus: 'Verified', clientId };
      
// //       console.log(`Updating status for Article PMID=${recordId}, Drug=${drugName} to "Verified"`);
// //       const response = await DatabaseService.updateMedicalReview(recordId, updatedRecord, { drug: drugName });
      
// //       showToast(`Successfully updated ${response.rowsAffected} row(s)`);
// //       await DatabaseService.releaseLock(recordId, clientId);
// //       fetchMedicalReviewData();
// //     } catch (err) {
// //       console.error("Error updating verification status:", err);
// //       showToast(`Failed to update verification status: ${err.message}`, "error");
// //       const row = filteredData[rowIndex];
// //       if (row && row['Article PMID']) {
// //         await DatabaseService.releaseLock(row['Article PMID'], clientId).catch(() => {});
// //       }
// //       fetchMedicalReviewData();
// //     } finally {
// //       setStatusUpdating(null);
// //     }
// //   };

// //   const handleEditRow = (rowIndex) => {
// //     const rowData = filteredData[rowIndex];
// //     setEditingRecord(rowData);
// //   };

// //   const handleSaveRecord = async () => {
// //     try {
// //       setLoading(true);
// //       const recordId = editingRecord['Article PMID'];
// //       const drugName = editingRecord['Drug'];
// //       if (!recordId) {
// //         console.error("Missing Article PMID in editingRecord:", editingRecord);
// //         throw new Error("Missing Article PMID");
// //       }
// //       if (!drugName) {
// //         console.error("Missing Drug in editingRecord:", editingRecord);
// //         throw new Error("Missing Drug identifier");
// //       }
      
// //       console.log(`Saving medical review data: Article PMID=${recordId}, Drug=${drugName}, ClientId=${clientId}, Data=`, editingRecord);
      
// //       await DatabaseService.acquireLock(recordId, clientId);
      
// //       const response = await DatabaseService.updateMedicalReview(recordId, { ...editingRecord, clientId }, { drug: drugName });
      
// //       alert(`Successfully updated ${response.rowsAffected} row(s)`);
// //       await DatabaseService.releaseLock(recordId, clientId);
// //       setEditingRecord(null);
// //       fetchMedicalReviewData();
// //     } catch (err) {
// //       console.error("Error saving medical review:", err);
// //       alert(`Failed to save changes: ${err.message}`);
// //       await DatabaseService.releaseLock(editingRecord['Article PMID'], clientId).catch(() => {});
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleFieldChange = (field, value) => {
// //     setEditingRecord(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   // Handle inline comment editing
// //   const handleCommentChange = (rowIndex, value) => {
// //     setCommentEdits(prev => ({
// //       ...prev,
// //       [rowIndex]: value
// //     }));
// //   };

// //  const handleSaveComment = async (rowIndex) => {
// //   let row = null;
// //   try {
// //     row = filteredData[rowIndex];
// //     const recordId = row['Article PMID'];
// //     const drugName = row['Drug'];
// //     const newComment = commentEdits[rowIndex] || '';

// //     if (!recordId) {
// //       console.error("Missing Article PMID in row:", row);
// //       showToast("Cannot save comment: missing Article PMID", "error");
// //       return;
// //     }
// //     if (!drugName) {
// //       console.error("Missing Drug in row:", row);
// //       showToast("Cannot save comment: missing Drug identifier", "error");
// //       return;
// //     }

// //     setCommentSaving(rowIndex);
// //     await DatabaseService.acquireLock(recordId, clientId);

// //     const updatedRecord = { ...row, MedicalReviewerComments: newComment, clientId };
// //     const response = await DatabaseService.updateMedicalReview(recordId, updatedRecord, { drug: drugName });

// //     setFilteredData(prev => prev.map((item, idx) => 
// //       idx === rowIndex ? { ...item, MedicalReviewerComments: newComment } : item
// //     ));
// //     setLiteratureData(prev => prev.map(item => 
// //       (item['Article PMID'] === recordId && item['Drug'] === drugName) 
// //         ? { ...item, MedicalReviewerComments: newComment } 
// //         : item
// //     ));

// //     setCommentEdits(prev => {
// //       const newEdits = { ...prev };
// //       delete newEdits[rowIndex];
// //       return newEdits;
// //     });

// //     showToast(`Comment saved successfully`);
// //     await DatabaseService.releaseLock(recordId, clientId);
// //   } catch (err) {
// //     console.error("Error saving comment:", err);
// //     showToast(`Failed to save comment: ${err.message}`, "error");
// //   } finally {
// //     setCommentSaving(null);
// //     if (row && row['Article PMID']) {
// //       await DatabaseService.releaseLock(row['Article PMID'], clientId).catch(() => {});
// //     }
// //   }

// //   };

// //   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
// //     if (columnName === 'MedicalReviewerComments') return; // Skip for inline editable column
// //     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
// //   };

// //   const closeExpandedCell = () => {
// //     setExpandedCell(null);
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "-";
// //     try {
// //       const date = new Date(dateString);
// //       if (date instanceof Date && !isNaN(date.getTime())) {
// //         return date.toISOString().split('T')[0];
// //       } else if (typeof dateString === 'string' && dateString.includes('-')) {
// //         return dateString.substring(0, 10);
// //       }
// //       return dateString || "-";
// //     } catch (e) {
// //       console.error("Error parsing date:", e, dateString);
// //       return dateString || "-";
// //     }
// //   };

// //   const findDateField = (item) => {
// //     if (!item) return null;
// //     const dateKey = Object.keys(item).find(key => 
// //       key.toLowerCase().includes('validation') && 
// //       key.toLowerCase().includes('date')
// //     );
// //     return dateKey ? item[dateKey] : null;
// //   };

// //   const truncateText = (text, maxLength = 30) => {
// //     if (!text) return "";
// //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// //   };

// //   const currentItems = filteredData.slice(
// //     (currentPage - 1) * itemsPerPage, 
// //     currentPage * itemsPerPage
// //   );

// //   const renderVerifyButton = (rowIndex) => {
// //     const isUpdating = statusUpdating === rowIndex;
// //     const currentStatus = filteredData[rowIndex].Status || '';
// //     const isVerified = currentStatus === 'Verified';
    
// //     return (
// //       <button
// //         onClick={() => {
// //           if (window.confirm('Are you sure you want to mark this entry as verified? This action cannot be undone.')) {
// //             handleVerifyUpdate(rowIndex);
// //           }
// //         }}
// //         disabled={isUpdating || isVerified}
// //         className={`px-2 py-1 text-xs rounded flex items-center ${
// //           isVerified
// //             ? 'bg-green-100 text-green-800 cursor-not-allowed'
// //             : 'bg-green-500 text-white hover:bg-green-600'
// //         }`}
// //       >
// //         <CheckCircle size={12} className="mr-1" /> 
// //         {isVerified ? 'Verified' : 'Verify'}
// //       </button>
// //     );
// //   };

// //   const toggleSortOrder = () => {
// //     setSortOrder(prev => {
// //       if (!prev) return 'asc';
// //       if (prev === 'asc') return 'desc';
// //       return null;
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-white p-8">
// //       {editingRecord && (
// //         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
// //           <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl animate-scale-in flex flex-col max-h-[95vh]">
// //             <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#15212d] text-white rounded-t-lg">
// //               <h3 className="text-lg font-bold flex items-center">
// //                 <FileEdit size={18} className="mr-2" />
// //                 Edit Medical Review Record
// //               </h3>
// //               <button 
// //                 onClick={() => setEditingRecord(null)} 
// //                 className="text-white hover:text-red-300 transition-colors p-1 rounded-full"
// //               >
// //                 <X size={16} />
// //               </button>
// //             </div>
            
// //             <div className="overflow-y-auto p-6 flex-grow" style={{maxHeight: "calc(95vh - 150px)"}}>
// //               {editingRecord['Article PMID'] && (
// //                 <div className="mb-6 bg-[#15212d] bg-opacity-20 p-3 rounded-md border-l-4 border-[#15212d] flex items-center">
// //                   <span className="font-semibold text-[#15212d] mr-2">Article PMID:</span>
// //                   <span className="text-[#15212d]">{editingRecord['Article PMID']}</span>
// //                   <span className="ml-auto px-2 py-1 text-xs bg-[#15212d] text-white rounded-md">
// //                     {editingRecord['Status'] || 'No Status'}
// //                   </span>
// //                 </div>
// //               )}
              
// //               <div className="flex flex-col md:flex-row gap-6">
// //                 <div className="md:w-1/2 space-y-4">
// //                   {editingRecord && Object.entries(editingRecord)
// //                     .filter(([key]) => {
// //                       const leftColumnFields = [
// //                         'Mail', 'Article PMID', 'Url', 'Article Access', 'Article Type',
// //                         'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
// //                         'Abstract', 'Search Term', 'Drug', 'Article Publication Date',
// //                         'Primary Author Address', 'Primary Author Country'
// //                       ];
// //                       return leftColumnFields.includes(key);
// //                     })
// //                     .map(([key, value], index) => {
// //                       const isReadOnly = [
// //                         'Article PMID', 'Title', 'Abstract', 'Url', 'Validation Processing Date',
// //                         'Drug', 'Article Access', 'Article Type', 'PMCID', 'Pdf File', 'Search Term'
// //                       ].includes(key);
// //                       const isDateField = key === 'IRD' || key === 'Validation Processing Date' || key === 'Article Publication Date';
                      
// //                       return (
// //                         <div key={index} className="mb-3">
// //                           <label className="block text-sm font-medium text-[#15212d] mb-1 flex items-center">
// //                             {isDateField && <Calendar size={14} className="mr-1 text-[#15212d]" />}
// //                             {key}
// //                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
// //                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
// //                             }`}>
// //                               {isReadOnly ? 'Read-only' : 'Editable'}
// //                             </span>
// //                           </label>
                          
// //                           {key === 'Url' ? (
// //                             <div className="flex items-center">
// //                               <input
// //                                 type="text"
// //                                 className="w-full p-2 border rounded-md bg-gray-50 border-gray-300 opacity-80"
// //                                 value={value || ''}
// //                                 readOnly
// //                               />
// //                               {value && (
// //                                 <a 
// //                                   href={value} 
// //                                   target="_blank" 
// //                                   rel="noopener noreferrer"
// //                                   className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
// //                                 >
// //                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
// //                                     <polyline points="15 3 21 3 21 9"></polyline>
// //                                     <line x1="10" y1="14" x2="21" y2="3"></line>
// //                                   </svg>
// //                                 </a>
// //                               )}
// //                             </div>
// //                           ) : (
// //                             <textarea
// //                               className={`w-full p-2 border rounded-md ${
// //                                 isReadOnly ? 'bg-gray-50 opacity-80 border-gray-300' : 'bg-[#15212d] bg-opacity-5 border-[#15212d] focus:outline-none focus:ring-2 focus:ring-[#15212d]'
// //                               }`}
// //                               rows={key === 'Title' || key === 'Abstract' ? 4 : 2}
// //                               value={value || ''}
// //                               onChange={(e) => !isReadOnly && handleFieldChange(key, e.target.value)}
// //                               readOnly={isReadOnly}
// //                             />
// //                           )}
// //                         </div>
// //                       );
// //                     })
// //                   }
// //                 </div>
                
// //                 <div className="md:w-1/2 space-y-4">
// //                   {editingRecord && Object.entries(editingRecord)
// //                     .filter(([key]) => {
// //                       const leftColumnFields = [
// //                         'Mail', 'Article PMID', 'Url', 'Article Access', 'Article Type',
// //                         'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
// //                         'Abstract', 'Search Term', 'Drug', 'Article Publication Date',
// //                         'Primary Author Address', 'Primary Author Country'
// //                       ];
// //                       return !leftColumnFields.includes(key);
// //                     })
// //                     .map(([key, value], index) => {
// //                       const isReadOnly = ['Status', 'Summary', 'MedicalReviewerStatus'].includes(key);
// //                       const isCommentField = key === 'Comments (ICSR, AOI, Not selected)' || key === 'MedicalReviewerComments';
// //                       const isDateField = key.toLowerCase().includes('date');
                      
// //                       return (
// //                         <div key={index} className="mb-3">
// //                           <label className="block text-sm font-medium text-[#15212d] mb-1 flex items-center">
// //                             {isDateField && <Calendar size={14} className="mr-1 text-[#15212d]" />}
// //                             {key}
// //                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
// //                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
// //                             }`}>
// //                               {isReadOnly ? 'Read-only' : 'Editable'}
// //                             </span>
// //                           </label>
// //                           <textarea
// //                             className={`w-full p-2 border rounded-md ${
// //                               isReadOnly ? 'bg-gray-50 opacity-80 border-gray-300' : 
// //                               isCommentField ? 'bg-yellow-50 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-[#15212d]' :
// //                               'bg-[#15212d] bg-opacity-5 border-[#15212d] focus:outline-none focus:ring-2 focus:ring-[#15212d]'
// //                             }`}
// //                             rows={key === 'Summary' ? 4 : 2}
// //                             value={value || ''}
// //                             onChange={(e) => !isReadOnly && handleFieldChange(key, e.target.value)}
// //                             readOnly={isReadOnly}
// //                           />
// //                         </div>
// //                       );
// //                     })
// //                   }
// //                 </div>
// //               </div>
// //             </div>
            
// //             <div className="border-t border-gray-200 p-5 bg-gray-50 rounded-b-lg">
// //               <div className="flex flex-col md:flex-row gap-4">
// //                 <div className="flex-grow">
// //                   <h4 className="font-medium text-[#15212d] mb-3 text-sm">Record Status</h4>
// //                   <div className="flex flex-wrap gap-2">
// //                     {editingRecord['Status'] === 'Verified' ? (
// //                       <div className="px-3 py-2 text-sm rounded-md flex items-center bg-blue-100 text-blue-800 border border-blue-200">
// //                         <CheckCircle size={14} className="mr-2" /> 
// //                         Verified (No changes allowed)
// //                       </div>
// //                     ) : (
// //                       <>
// //                         <button
// //                           onClick={() => {
// //                             if (window.confirm('Are you sure you want to mark this entry as verified? This action cannot be undone.')) {
// //                               handleFieldChange('Status', 'Verified');
// //                               handleFieldChange('MedicalReviewerStatus', 'Verified');
// //                             }
// //                           }}
// //                           disabled={editingRecord['Status'] === 'Verified'}
// //                           className="px-3 py-2 text-sm rounded-md flex items-center bg-green-500 text-white hover:bg-green-600 transition-colors"
// //                         >
// //                           <CheckCircle size={14} className="mr-2" /> 
// //                           Mark as Verified
// //                         </button>
// //                       </>
// //                     )}
                    
// //                     {editingRecord['Status'] && (
// //                       <div className="flex items-center ml-auto md:ml-2 px-3 py-2 text-sm bg-gray-100 rounded-md">
// //                         <span className="mr-2 text-gray-500">Current:</span>
// //                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                           editingRecord['Status'] === 'Approved' ? 'bg-green-100 text-green-800' :
// //                           editingRecord['Status'] === 'Verified' ? 'bg-blue-100 text-blue-800' :
// //                           'bg-gray-200 text-gray-800'
// //                         }`}>
// //                           {editingRecord['Status']}
// //                         </span>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
                
// //                 <div className="flex space-x-3 items-center md:border-l md:pl-4 pt-3 md:border-t-0 mt-3 md:mt-0">
// //                   <button
// //                     onClick={() => setEditingRecord(null)}
// //                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     onClick={handleSaveRecord}
// //                     disabled={loading}
// //                     className="px-4 py-2 bg-[#15212d] text-white rounded-md hover:bg-[#143b50] transition-colors disabled:opacity-70 flex items-center"
// //                   >
// //                     {loading ? (
// //                       <>
// //                         <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
// //                         Saving...
// //                       </>
// //                     ) : (
// //                       <>
// //                         <Save size={16} className="mr-2" /> 
// //                         Save Changes
// //                       </>
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
      
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold text-[#15212d]">Medical Review</h1>
// //         <p className="text-gray-600 mt-2">View approved literature review data marked as AOI or ICSR</p>
// //       </div>
      
// //       <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
// //         <div className="flex items-center gap-2">
// //           <label className="text-sm font-medium text-[#15212d]">IRD From:</label>
// //           <input
// //             type="date"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //             className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#15212d]"
// //           />
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <label className="text-sm font-medium text-[#15212d]">To:</label>
// //           <input
// //             type="date"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //             className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#15212d]"
// //           />
// //         </div>
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
// //               <p className="text-gray-600">No medical reviews found matching the criteria.</p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="overflow-auto max-h-[75vh]">
// //                 <table className="w-full border border-gray-300 text-sm relative">
// //                   <thead className="bg-[#15212d] text-white sticky top-0 z-10">
// //                     <tr>
// //                       {columnNames.map((columnName, index) => (
// //                         <th key={index} className="border px-4 py-3 text-left font-medium text-xs">
// //                           <div className="flex items-center">
// //                             {columnName}
// //                             {columnName === 'IRD' && (
// //                               <button
// //                                 onClick={toggleSortOrder}
// //                                 className="ml-2 focus:outline-none"
// //                               >
// //                                 {sortOrder === 'asc' ? (
// //                                   <ArrowUp size={14} />
// //                                 ) : sortOrder === 'desc' ? (
// //                                   <ArrowDown size={14} />
// //                                 ) : (
// //                                   <div className="w-4 h-4" />
// //                                 )}
// //                               </button>
// //                             )}
// //                           </div>
// //                         </th>
// //                       ))}
// //                       <th className="border px-4 py-3 text-left font-medium text-xs sticky right-0 bg-[#15212d] z-20">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {currentItems.map((row, rowIndex) => {
// //                       const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
// //                       const isVerified = (row.Status || '') === 'Verified';
                      
// //                       return (
// //                         <tr
// //                           key={`${row['Article PMID']}_${row['Drug']}_${actualRowIndex}`}
// //                           className={`hover:bg-gray-50 ${isVerified ? 'bg-green-50' : ''}`}
// //                         >
// //                           {columnNames.map((columnName, columnIndex) => (
// //                             <td 
// //                               key={columnIndex}
// //                               className="border px-4 py-2 text-xs"
// //                             >
// //                               {columnName === 'MedicalReviewerComments' ? (
// //                                 <div className="flex flex-col gap-2">
// //                                   <textarea
// //                                     className="w-full p-2 border rounded-md bg-yellow-50 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-[#15212d]"
// //                                     rows={2}
// //                                     value={commentEdits[actualRowIndex] ?? row[columnName] ?? ''}
// //                                     onChange={(e) => handleCommentChange(actualRowIndex, e.target.value)}
// //                                     disabled={commentSaving === actualRowIndex}
// //                                   />
// //                                   <button
// //                                     onClick={() => handleSaveComment(actualRowIndex)}
// //                                     disabled={commentSaving === actualRowIndex || commentEdits[actualRowIndex] === undefined}
// //                                     className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
// //                                   >
// //                                     {commentSaving === actualRowIndex ? 'Saving...' : 'Save'}
// //                                   </button>
// //                                 </div>
// //                               ) : (
// //                                 <span
// //                                   className="truncate cursor-pointer hover:bg-gray-100 block"
// //                                   onClick={() => handleCellClick(actualRowIndex, columnIndex, row[columnName], columnName)}
// //                                 >
// //                                   {(columnName.toLowerCase().includes('date') || columnName === 'IRD')
// //                                     ? formatDate(row[columnName])
// //                                     : truncateText(row[columnName], 25) || ''}
// //                                 </span>
// //                               )}
// //                             </td>
// //                           ))}
// //                           <td className="border px-4 py-2 text-xs sticky right-0 bg-white z-10">
// //                             <div className="flex space-x-2 items-center">
// //                               {renderVerifyButton(actualRowIndex)}
// //                               <button
// //                                 onClick={() => handleEditRow(actualRowIndex)}
// //                                 disabled={isVerified}
// //                                 className={`px-2 py-1 text-xs rounded flex items-center ${
// //                                   isVerified
// //                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
// //                                     : 'bg-blue-500 text-white hover:bg-blue-600'
// //                                 }`}
// //                                 title={isVerified ? "Verified records cannot be edited" : "Edit record"}
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
// //                   <div className="text-sm text-gray-600">
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

// // export default MedicalReviewContent;

// import React, { useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight, Search, Edit, Save, X, CheckCircle, Calendar, RefreshCw, Lock } from 'lucide-react';
// import DatabaseService from '../services/DatabaseService';
// import { v4 as uuidv4 } from 'uuid';

// const MedicalReviewContent = () => {
//   const [literatureData, setLiteratureData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusUpdating, setStatusUpdating] = useState(null);
//   const [expandedCell, setExpandedCell] = useState(null);
//   const [error, setError] = useState(null);
//   const [columnNames, setColumnNames] = useState([]);
//   const [clientId, setClientId] = useState('');
//   const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
//   const [showDateFilter, setShowDateFilter] = useState(false);
//   const [sortOrder, setSortOrder] = useState('');
//   const [formData, setFormData] = useState({});
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingRowIndex, setEditingRowIndex] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [commentEdits, setCommentEdits] = useState({});
//   const [commentSaving, setCommentSaving] = useState(null);
//   const [lockedRecords, setLockedRecords] = useState({});
//   const [refreshLocksInterval, setRefreshLocksInterval] = useState(null);

//   const itemsPerPage = 10;

//   const fetchMedicalReviewData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await DatabaseService.fetchMedicalReviews();
      
//       if (data.length > 0) {
//         console.log("First item fields:", Object.keys(data[0]));
//         console.log("First item sample:", data[0]);
//         const columns = [
//           'Mail', 'Article PMID', 'Comments (ICSR, AOI, Not selected)', 'Url', 'Article Access',
//           'Article Type', 'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
//           'Abstract', 'Summary', 'Search Term', 'Drug', 'Article Publication Date',
//           'Primary Author Address', 'Primary Author Country', 'Author Validation (Rule-1)',
//           'Publication Date Validation (Rule-2)', 'Patient Type', 'Patient Details',
//           'Patient Validation (Rule-3)', 'Reporter Details', 'Casuality Response',
//           'Casuality Validation (Rule-4)', 'Reason of selection', 'Status', 'DocumentURL',
//           'MedicalReviewerStatus', 'MedicalReviewerComments'
//         ];
//         setColumnNames(columns);
//       }
      
//       console.log(`Fetched ${data.length} medical review records`);
//       const mappedData = data.map(item => ({
//         ...item,
//         IRD: item['Search Date'] || item['IRD'],
//       }));
//       setLiteratureData(mappedData);
//       setFilteredData(mappedData);
//       setLoading(false);
//       await refreshLockStatus();
//     } catch (err) {
//       console.error("Error fetching medical review data:", err);
//       setError("Failed to load medical review data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const refreshLockStatus = async () => {
//     try {
//       const locks = await DatabaseService.getAllActiveLocks();
//       const newLockedRecords = {};
//       locks.forEach(lock => {
//         if (lock.clientId !== clientId) {
//           newLockedRecords[lock.recordId] = lock;
//         }
//       });
//       setLockedRecords(newLockedRecords);
//     } catch (err) {
//       console.error("Error refreshing lock status:", err);
//     }
//   };

//   useEffect(() => {
//     let existingClientId = localStorage.getItem('editorClientId');
//     if (!existingClientId) {
//       const newClientId = uuidv4();
//       localStorage.setItem('editorClientId', newClientId);
//       existingClientId = newClientId;
//     }
//     setClientId(existingClientId);

//     const cleanupLocks = async () => {
//       try {
//         await DatabaseService.releaseAllLocksByClient(existingClientId);
//       } catch (err) {
//         console.error("Error releasing locks on page unload:", err);
//       }
//     };

//     window.addEventListener('beforeunload', cleanupLocks);

//     fetchMedicalReviewData();
//     const interval = setInterval(refreshLockStatus, 10000);
//     setRefreshLocksInterval(interval);

//     return () => {
//       window.removeEventListener('beforeunload', cleanupLocks);
//       cleanupLocks();
//       if (refreshLocksInterval) {
//         clearInterval(refreshLocksInterval);
//       }
//     };
//   }, []);

//   const acquireLock = async (recordId) => {
//     try {
//       if (isRecordLocked(recordId)) {
//         const lock = lockedRecords[recordId];
//         const lockTime = new Date(lock.timestamp).toLocaleTimeString();
//         showToast(`This record is being edited by another user since ${lockTime}`, "error");
//         return false;
//       }

//       const result = await DatabaseService.acquireLock(recordId, clientId);
//       if (result.success) {
//         await refreshLockStatus();
//         return true;
//       } else {
//         showToast(result.message || "Failed to lock record", "error");
//         return false;
//       }
//     } catch (err) {
//       if (err.message && err.message.includes('409: Conflict')) {
//         await refreshLockStatus();
//         if (isRecordLocked(recordId)) {
//           const lock = lockedRecords[recordId];
//           const lockTime = new Date(lock.timestamp).toLocaleTimeString();
//           showToast(`This record is being edited by another user since ${lockTime}`, "error");
//         } else {
//           showToast("This record is currently being edited by another user", "error");
//         }
//         return false;
//       }
//       console.error("Error acquiring lock:", err);
//       showToast("Failed to lock record: " + (err.message || "Unknown error"), "error");
//       return false;
//     }
//   };

//   const releaseLock = async (recordId) => {
//     try {
//       const result = await DatabaseService.releaseLock(recordId, clientId);
//       await refreshLockStatus();
//       return result.success;
//     } catch (err) {
//       console.error("Error releasing lock:", err);
//       return false;
//     }
//   };

//   const isRecordLocked = (recordId) => {
//     return recordId in lockedRecords;
//   };

//   useEffect(() => {
//     if (!literatureData.length) return;
    
//     let filtered = literatureData;

//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       filtered = filtered.filter(item => {
//         return Object.entries(item).some(([key, val]) => {
//           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
//         });
//       });
//     }

//     if (dateRange.startDate || dateRange.endDate) {
//       filtered = filtered.filter(item => {
//         const dateStr = item['IRD'];
//         if (!dateStr) return false;
//         const parsedDate = formatDate(dateStr);
//         if (!parsedDate) return false;

//         const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
//         const end = dateRange.endDate ? new Date(dateRange.endDate) : null;

//         return (
//           (!start || new Date(parsedDate) >= start) &&
//           (!end || new Date(parsedDate) <= end)
//         );
//       });
//     }

//     if (sortOrder) {
//       filtered = [...filtered].sort((a, b) => {
//         const dateA = formatDate(a['IRD']);
//         const dateB = formatDate(b['IRD']);
//         if (!dateA) return sortOrder === 'asc' ? 1 : -1;
//         if (!dateB) return sortOrder === 'asc' ? -1 : 1;
//         return sortOrder === 'asc'
//           ? new Date(dateA) - new Date(dateB)
//           : new Date(dateB) - new Date(dateA);
//       });
//     }

//     setFilteredData(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, dateRange, sortOrder, literatureData]);

//   const showToast = (message, type = 'success') => {
//     const toast = document.createElement('div');
//     toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg text-white z-50 animate-slide-in ${
//       type === 'success' ? 'bg-green-500' : 'bg-red-500'
//     }`;
//     toast.innerText = message;
//     document.body.appendChild(toast);

//     setTimeout(() => {
//       toast.classList.replace('animate-slide-in', 'animate-slide-out');
//       setTimeout(() => {
//         document.body.removeChild(toast);
//       }, 300);
//     }, 3000);
//   };

//   const handleVerifyUpdate = async (rowIndex) => {
//     try {
//       const row = filteredData[rowIndex];
//       const recordId = row['Article PMID'];
//       const drugName = row['Drug'];
      
//       if (!recordId) {
//         console.error("Missing Article PMID in row:", row);
//         showToast("Cannot update verification status: missing Article PMID", "error");
//         return;
//       }
//       if (!drugName) {
//         console.error("Missing Drug in row:", row);
//         showToast("Cannot update verification status: missing Drug identifier", "error");
//         return;
//       }
      
//       const lockAcquired = await acquireLock(recordId);
//       if (!lockAcquired) return;

//       setStatusUpdating(`${recordId}_${drugName}`);

//       const matchingRows = filteredData.filter(
//         item => (item['Article PMID'] === recordId) && item['Drug'] === drugName
//       );

//       if (matchingRows.length === 0) {
//         throw new Error(`No record found for Article PMID=${recordId}, Drug=${drugName}`);
//       }

//       let updatedCount = 0;
//       for (const row of matchingRows) {
//         await DatabaseService.updateMedicalReview(recordId, {
//           ...row,
//           Status: 'Verified',
//           MedicalReviewerStatus: 'Verified',
//           clientId
//         }, { drug: drugName });
//         updatedCount++;
//       }

//       const newData = literatureData.map(item => {
//         if ((item['Article PMID'] === recordId) && item['Drug'] === drugName) {
//           return { ...item, Status: 'Verified', MedicalReviewerStatus: 'Verified' };
//         }
//         return item;
//       });

//       setLiteratureData(newData);
//       setFilteredData(newData.filter(item => filteredData.some(f => f['Article PMID'] === item['Article PMID'] && f['Drug'] === item['Drug'])));

//       showToast(`Successfully verified ${updatedCount} record(s)`);
//       await releaseLock(recordId);
//       fetchMedicalReviewData();
//     } catch (err) {
//       console.error("Error updating verification status:", err);
//       showToast(`Failed to update verification status: ${err.message}`, "error");
//       await releaseLock(filteredData[rowIndex]['Article PMID']).catch(() => {});
//     } finally {
//       setStatusUpdating(null);
//     }
//   };

//   const openEditForm = async (row, rowIndex) => {
//     const status = row['Status'];

//     if (status === 'Verified') {
//       showToast("Verified records cannot be edited", "error");
//       return;
//     }

//     const recordId = row['Article PMID'];

//     if (!recordId) {
//       showToast("Cannot find record identifier", "error");
//       return;
//     }

//     if (isRecordLocked(recordId)) {
//       const lock = lockedRecords[recordId];
//       const lockTime = new Date(lock.timestamp).toLocaleTimeString();
//       showToast(`This record is being edited by another user since ${lockTime}`, "error");
//       return;
//     }

//     const lockAcquired = await acquireLock(recordId);
//     if (!lockAcquired) return;

//     setFormData({ ...row });
//     setEditingRowIndex(rowIndex);
//     setIsFormVisible(true);
//   };

//   const closeForm = async () => {
//     if (formData && formData['Article PMID']) {
//       await releaseLock(formData['Article PMID']);
//     }

//     setIsFormVisible(false);
//     setEditingRowIndex(null);
//     setFormData({});
//   };

//   const handleFormChange = (key, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const saveForm = async () => {
//     try {
//       setIsSaving(true);
//       const recordId = formData['Article PMID'];
//       const drugName = formData['Drug'];

//       if (!recordId || !drugName) {
//         showToast("Cannot save: Article PMID and Drug name are required", "error");
//         await releaseLock(recordId);
//         return;
//       }

//       const lockAcquired = await acquireLock(recordId);
//       if (!lockAcquired) {
//         showToast("Cannot save: Failed to acquire lock", "error");
//         return;
//       }

//       const matchingRows = literatureData.filter(
//         item => (item['Article PMID'] === recordId) && item['Drug'] === drugName
//       );

//       if (matchingRows.length === 0) {
//         showToast("No matching record found", "error");
//         await releaseLock(recordId);
//         return;
//       }

//       let updatedCount = 0;
//       for (const row of matchingRows) {
//         await DatabaseService.updateMedicalReview(recordId, { ...formData, clientId }, { drug: drugName });
//         updatedCount++;
//       }

//       const newData = literatureData.map(item => {
//         if ((item['Article PMID'] === recordId) && item['Drug'] === drugName) {
//           return { ...formData };
//         }
//         return item;
//       });

//       setLiteratureData(newData);
//       setFilteredData(newData.filter(item => filteredData.some(f => f['Article PMID'] === item['Article PMID'] && f['Drug'] === item['Drug'])));

//       showToast(`Changes saved for ${updatedCount} record(s) successfully`);
//       await releaseLock(recordId);
//       closeForm();
//     } catch (err) {
//       console.error("Error saving form:", err);
//       showToast(`Error saving changes: ${err.message}`, "error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCommentChange = (rowIndex, value) => {
//     setCommentEdits(prev => ({
//       ...prev,
//       [rowIndex]: value
//     }));
//   };

//   const handleSaveComment = async (rowIndex) => {
//     let row = null;
//     try {
//       row = filteredData[rowIndex];
//       const recordId = row['Article PMID'];
//       const drugName = row['Drug'];
//       const newComment = commentEdits[rowIndex] || '';

//       if (!recordId) {
//         console.error("Missing Article PMID in row:", row);
//         showToast("Cannot save comment: missing Article PMID", "error");
//         return;
//       }
//       if (!drugName) {
//         console.error("Missing Drug in row:", row);
//         showToast("Cannot save comment: missing Drug identifier", "error");
//         return;
//       }

//       const lockAcquired = await acquireLock(recordId);
//       if (!lockAcquired) return;

//       setCommentSaving(rowIndex);

//       const updatedRecord = { ...row, MedicalReviewerComments: newComment, clientId };
//       await DatabaseService.updateMedicalReview(recordId, updatedRecord, { drug: drugName });

//       setFilteredData(prev => prev.map((item, idx) => 
//         idx === rowIndex ? { ...item, MedicalReviewerComments: newComment } : item
//       ));
//       setLiteratureData(prev => prev.map(item => 
//         (item['Article PMID'] === recordId && item['Drug'] === drugName) 
//           ? { ...item, MedicalReviewerComments: newComment } 
//           : item
//       ));

//       setCommentEdits(prev => {
//         const newEdits = { ...prev };
//         delete newEdits[rowIndex];
//         return newEdits;
//       });

//       showToast(`Comment saved successfully`);
//       await releaseLock(recordId);
//       fetchMedicalReviewData();
//     } catch (err) {
//       console.error("Error saving comment:", err);
//       showToast(`Failed to save comment: ${err.message}`, "error");
//     } finally {
//       setCommentSaving(null);
//       if (row && row['Article PMID']) {
//         await DatabaseService.releaseLock(row['Article PMID']).catch(() => {});
//       }
//     }
//   };

//   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
//     if (columnName === 'MedicalReviewerComments') return;
//     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
//   };

//   const closeExpandedCell = () => {
//     setExpandedCell(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     try {
//       const ymdRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
//       if (typeof dateString === 'string' && ymdRegex.test(dateString)) {
//         return dateString;
//       }

//       const monthNamePattern = /^[A-Za-z]{3}\s\d{1,2}\s\d{4}/;
//       if (typeof dateString === 'string' && monthNamePattern.test(dateString)) {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//           const year = date.getFullYear();
//           const month = String(date.getMonth() + 1).padStart(2, '0');
//           const day = String(date.getDate()).padStart(2, '0');
//           return `${year}-${month}-${day}`;
//         }
//       }

//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }

//       return dateString;
//     } catch (e) {
//       console.error("Error parsing date:", e, dateString);
//       return dateString;
//     }
//   };

//   const truncateText = (text, maxLength = 25) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
//   };

//   const renderVerifyButton = (row, rowIndex) => {
//     const recordId = row['Article PMID'];
//     const drugName = row['Drug'];
//     const isUpdating = statusUpdating === `${recordId}_${drugName}`;
//     const currentStatus = row['Status'] || '';

//     if (currentStatus === 'Verified') {
//       return (
//         <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
//           Verified
//         </span>
//       );
//     }

//     return (
//       <button
//         onClick={() => {
//           if (!drugName) {
//             showToast("Error: Drug name is missing for this record", "error");
//             return;
//           }
//           if (window.confirm('Are you sure you want to verify this entry? This action cannot be undone.')) {
//             handleVerifyUpdate(rowIndex);
//           }
//         }}
//         disabled={isUpdating || !drugName}
//         className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full transition-all duration-300 hover:bg-green-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//         title={!drugName ? 'Drug information missing' : 'Verify this record'}
//       >
//         <CheckCircle size={14} />
//       </button>
//     );
//   };

//   const renderLockStatus = (recordId) => {
//     if (isRecordLocked(recordId)) {
//       const lock = lockedRecords[recordId];
//       const lockTime = new Date(lock.timestamp).toLocaleTimeString();

//       return (
//         <div className="flex items-center text-red-500" title={`Being edited since ${lockTime}`}>
//           <Lock size={14} className="mr-1" />
//           <span className="text-xs">Locked</span>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-white p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-[#14242c]">Medical Review</h1>
//         <p className="text-[#1a4e6a] mt-2">View and manage medical review data</p>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md border border-[#1a4e6a] shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-[#1483b9]">
//           <Search size={20} className="text-[#143b50] mr-2" />
//           <input
//             type="text"
//             placeholder="Search across all fields..."
//             className="bg-transparent border-none outline-none w-full text-[#14242c]"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="flex space-x-3">
//           <div className="relative">
//             <button
//               onClick={() => setShowDateFilter(!showDateFilter)}
//               className="flex items-center bg-[#1a4e6a] text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
//             >
//               <Calendar size={16} className="mr-2" /> Date Range
//             </button>

//             {showDateFilter && (
//               <div className="absolute right-0 top-full mt-2 bg-white p-4 rounded-md shadow-lg z-20 border border-gray-200 min-w-[300px]">
//                 <div className="flex flex-col gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-[#14242c] mb-1">Start Date</label>
//                     <input
//                       type="date"
//                       value={dateRange.startDate}
//                       onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
//                       className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-[#14242c] mb-1">End Date</label>
//                     <input
//                       type="date"
//                       value={dateRange.endDate}
//                       onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
//                       className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
//                     />
//                   </div>
//                   <div className="flex justify-end gap-2 mt-2">
//                     <button
//                       onClick={() => setShowDateFilter(false)}
//                       className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowDateFilter(false);
//                         setCurrentPage(1);
//                       }}
//                       className="px-3 py-1 text-sm bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] transition-colors"
//                     >
//                       Apply Filter
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={fetchMedicalReviewData}
//             className="flex items-center bg-gray-200 text-[#14242c] px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-300"
//             title="Refresh Data"
//           >
//             <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
//           </button>
//         </div>
//       </div>

//       {(dateRange.startDate && dateRange.endDate || searchTerm) && (
//         <div className="mb-4 flex items-center flex-wrap gap-2">
//           <span className="text-sm text-[#1a4e6a] mr-2">Filtered by:</span>
//           {dateRange.startDate && dateRange.endDate && (
//             <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
//               <Calendar size={12} className="mr-1" />
//               IRD: {dateRange.startDate} to {dateRange.endDate}
//               <button
//                 onClick={() => setDateRange({ startDate: '', endDate: '' })}
//                 className="ml-2 text-white hover:text-red-200"
//               >
//                 <X size={12} />
//               </button>
//             </div>
//           )}
//           {searchTerm && (
//             <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
//               <Search size={12} className="mr-1" />
//               Search: {searchTerm}
//               <button
//                 onClick={() => setSearchTerm('')}
//                 className="ml-2 text-white hover:text-red-200"
//               >
//                 <X size={12} />
//               </button>
//             </div>
//           )}
//           {(dateRange.startDate && dateRange.endDate || searchTerm) && (
//             <button
//               onClick={() => {
//                 setDateRange({ startDate: '', endDate: '' });
//                 setSearchTerm('');
//               }}
//               className="text-xs bg-[#1483b9] text-white px-2 py-1 rounded-md hover:bg-[#143b50] flex items-center transition-all duration-300"
//             >
//               <X size={12} className="mr-1" /> Clear all filters
//             </button>
//           )}
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <p>{error}</p>
//         </div>
//       )}

//       {expandedCell && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
//           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto shadow-2xl animate-scale-in">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium text-[#14242c]">{expandedCell.columnName}</h3>
//               <button
//                 onClick={closeExpandedCell}
//                 className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
//               >
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
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 border-4 border-[#1483b9] border-t-transparent rounded-full animate-spin mb-4"></div>
//             <p className="text-[#14242c]">Loading medical review data...</p>
//           </div>
//         </div>
//       ) : (
//         <>
//           {filteredData.length === 0 ? (
//             <div className="bg-white rounded-lg shadow p-6 text-center">
//               <p className="text-[#1a4e6a]">No medical reviews found matching the criteria.</p>
//             </div>
//           ) : (
//             <>
//               <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//                 <div className="relative overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead className="bg-[#14242c] text-white sticky top-0 z-10">
//                       <tr>
//                         {columnNames.map((col, idx) => (
//                           <th
//                             key={idx}
//                             className={`px-4 py-3 text-left font-medium text-xs whitespace-nowrap ${
//                               col === 'IRD' ? 'cursor-pointer hover:bg-[#143b50]' : ''
//                             }`}
//                             style={{ minWidth: '180px' }}
//                             onClick={() => {
//                               if (col === 'IRD') {
//                                 setSortOrder(prev => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
//                                 setCurrentPage(1);
//                               }
//                             }}
//                           >
//                             <div className="flex items-center">
//                               {col}
//                               {col === 'IRD' && sortOrder && (
//                                 <svg
//                                   className="ml-1 w-4 h-4"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d={sortOrder === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
//                                   />
//                                 </svg>
//                               )}
//                             </div>
//                           </th>
//                         ))}
//                         <th
//                           className="px-4 py-3 text-left font-medium text-xs whitespace-nowrap bg-[#143b50] sticky right-0 shadow-l"
//                           style={{ minWidth: '200px' }}
//                         >
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, rowIndex) => {
//                         const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
//                         const recordId = row['Article PMID'];
//                         const isLocked = isRecordLocked(recordId);

//                         return (
//                           <tr
//                             key={`${recordId}_${row['Drug']}_${rowIndex}`}
//                             className={`hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150 ${
//                               isLocked ? 'bg-red-50' : row['Status'] === 'Verified' ? 'bg-blue-50' : ''
//                             }`}
//                           >
//                             {columnNames.map((col, colIndex) => (
//                               <td
//                                 key={`${recordId}_${col}_${colIndex}`}
//                                 className={`px-4 py-3 text-xs ${
//                                   col === 'Article PMID'
//                                     ? 'font-medium text-[#143b50]'
//                                     : col === 'MedicalReviewerComments'
//                                     ? 'p-0'
//                                     : 'truncate hover:bg-gray-100 transition-colors duration-150'
//                                 }`}
//                                 onClick={() => col !== 'MedicalReviewerComments' && handleCellClick(actualRowIndex, colIndex, row[col], col)}
//                                 title={col !== 'MedicalReviewerComments' ? 'Click to view full content' : ''}
//                                 style={{ minWidth: '180px', maxWidth: '180px' }}
//                               >
//                                 {col === 'MedicalReviewerComments' ? (
//                                   <div className="flex flex-col gap-2 p-2">
//                                     <textarea
//                                       className="w-full p-2 border rounded-md border-[#1483b9] bg-white min-h-[40px] focus:outline-none focus:ring-2 focus:ring-[#1483b9] text-xs"
//                                       value={commentEdits[actualRowIndex] ?? row[col] ?? ''}
//                                       onChange={(e) => handleCommentChange(actualRowIndex, e.target.value)}
//                                       disabled={commentSaving === actualRowIndex}
//                                     />
//                                     <button
//                                       onClick={() => handleSaveComment(actualRowIndex)}
//                                       disabled={commentSaving === actualRowIndex || commentEdits[actualRowIndex] === undefined}
//                                       className="px-2 py-1 text-xs bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] disabled:opacity-50"
//                                     >
//                                       {commentSaving === actualRowIndex ? 'Saving...' : 'Save'}
//                                     </button>
//                                   </div>
//                                 ) : ['IRD', 'Validation Processing Date', 'Article Publication Date'].includes(col) ? (
//                                   formatDate(row[col])
//                                 ) : (
//                                   truncateText(row[col], 25) || ''
//                                 )}
//                               </td>
//                             ))}
//                             <td className="px-4 py-3 bg-white sticky right-0 shadow-l" style={{ minWidth: '200px' }}>
//                               <div className="flex items-center space-x-2">
//                                 {isLocked ? (
//                                   <>
//                                     {renderLockStatus(recordId)}
//                                     <button
//                                       disabled
//                                       className="flex items-center justify-center w-8 h-8 bg-gray-300 text-white rounded-full cursor-not-allowed opacity-50"
//                                       title="This record is being edited by another user"
//                                     >
//                                       <Lock size={14} />
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <button
//                                     onClick={() => openEditForm(row, actualRowIndex)}
//                                     className="flex items-center justify-center w-8 h-8 bg-[#1483b9] text-white rounded-full transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
//                                     title="Edit this record"
//                                   >
//                                     <Edit size={14} />
//                                   </button>
//                                 )}
//                                 {renderVerifyButton(row, actualRowIndex)}
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mt-6">
//                 <div className="text-sm text-[#1a4e6a]">
//                   Showing {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
//                   {Math.min(currentPage * itemsPerPage, filteredData.length)} entries of {filteredData.length} total entries
//                 </div>
//                 {filteredData.length > itemsPerPage && (
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronLeft size={16} />
//                     </button>

//                     {(() => {
//                       const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//                       let pagesToShow = [];

//                       if (totalPages <= 5) {
//                         pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
//                       } else {
//                         if (currentPage <= 3) {
//                           pagesToShow = [1, 2, 3, 4, '...', totalPages];
//                         } else if (currentPage >= totalPages - 2) {
//                           pagesToShow = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
//                         } else {
//                           pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
//                         }
//                       }

//                       return pagesToShow.map((page, index) => {
//                         if (page === '...') {
//                           return (
//                             <span key={`ellipsis-${index}`} className="px-3 py-1">
//                               ...
//                             </span>
//                           );
//                         }
//                         return (
//                           <button
//                             key={`page-${page}`}
//                             onClick={() => setCurrentPage(page)}
//                             className={`px-3 py-1 rounded-md transition-all duration-300 ${
//                               currentPage === page
//                                 ? 'bg-[#14242c] text-white shadow-md'
//                                 : 'bg-gray-200 hover:bg-gray-300'
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         );
//                       });
//                     })()}

//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
//                       className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </>
//       )}

//       {isFormVisible && editingRowIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
//           <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl animate-scale-in flex flex-col max-h-[95vh]">
//             <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#14242c] text-white rounded-t-lg">
//               <h3 className="text-xl font-bold flex items-center">
//                 <Edit size={18} className="mr-2" />
//                 Edit Medical Review Record
//               </h3>
//               <button
//                 onClick={closeForm}
//                 className="text-white hover:text-red-300 transition-colors p-1 rounded-full hover:bg-[#143b50]"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="overflow-y-auto p-6 flex-grow" style={{ maxHeight: "calc(95vh - 150px)" }}>
//               {formData['Article PMID'] && (
//                 <div className="mb-6 bg-[#1a4e6a] bg-opacity-10 p-3 rounded-md border-l-4 border-[#1a4e6a] flex items-center">
//                   <span className="font-semibold text-[#1a4e6a] mr-2">Article PMID:</span>
//                   <span className="text-[#143b50]">{formData['Article PMID']}</span>
//                   <span className="ml-auto px-2 py-1 text-xs bg-[#1a4e6a] text-white rounded-md">
//                     {formData['Status'] || 'No Status'}
//                   </span>
//                 </div>
//               )}

//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="md:w-1/2 space-y-4">
//                   {Object.entries(formData)
//                     .filter(([key]) => [
//                       'Mail', 'Article PMID', 'Url', 'Article Access', 'Article Type',
//                       'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
//                       'Abstract', 'Search Term', 'Drug', 'Article Publication Date',
//                       'Primary Author Address', 'Primary Author Country'
//                     ].includes(key))
//                     .map(([key, value], index) => {
//                       const isReadOnly = [
//                         'Article PMID', 'Title', 'Abstract', 'Url', 'Validation Processing Date',
//                         'Drug', 'Article Access', 'Article Type', 'PMCID', 'Pdf File', 'Search Term'
//                       ].includes(key);
//                       const isDateField = ['IRD', 'Validation Processing Date', 'Article Publication Date'].includes(key);

//                       return (
//                         <div key={index}>
//                           <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
//                             {isDateField && <Calendar size={14} className="mr-1 text-[#1483b9]" />}
//                             {key}
//                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
//                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
//                             }`}>
//                               {isReadOnly ? 'Read-only' : 'Editable'}
//                             </span>
//                           </label>
//                           {key === 'Url' ? (
//                             <div className="flex items-center">
//                               <input
//                                 type="text"
//                                 className="w-full p-2 border rounded-md border-gray-300 bg-gray-50 opacity-80"
//                                 value={value || ''}
//                                 readOnly
//                               />
//                               {value && (
//                                 <a
//                                   href={value}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                                 >
//                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//                                     <polyline points="15 3 21 3 21 9"></polyline>
//                                     <line x1="10" y1="14" x2="21" y2="3"></line>
//                                   </svg>
//                                 </a>
//                               )}
//                             </div>
//                           ) : (
//                             <textarea
//                               className={`w-full p-2 border rounded-md min-h-[60px] ${
//                                 isReadOnly ? 'border-gray-300 bg-gray-50 opacity-80' : 'border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-[#1483b9]'
//                               }`}
//                               value={value || ''}
//                               onChange={(e) => !isReadOnly && handleFormChange(key, e.target.value)}
//                               readOnly={isReadOnly}
//                             />
//                           )}
//                         </div>
//                       );
//                     })}
//                 </div>

//                 <div className="md:w-1/2 space-y-4">
//                   {Object.entries(formData)
//                     .filter(([key]) => ![
//                       'Mail', 'Article PMID', 'Url', 'Article Access', 'Article Type',
//                       'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
//                       'Abstract', 'Search Term', 'Drug', 'Article Publication Date',
//                       'Primary Author Address', 'Primary Author Country'
//                     ].includes(key))
//                     .map(([key, value], index) => {
//                       const isReadOnly = ['Status', 'Summary', 'MedicalReviewerStatus'].includes(key);
//                       const isCommentField = key === 'Comments (ICSR, AOI, Not selected)' || key === 'MedicalReviewerComments';

//                       return (
//                         <div key={index}>
//                           <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
//                             {key}
//                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
//                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
//                             }`}>
//                               {isReadOnly ? 'Read-only' : 'Editable'}
//                             </span>
//                           </label>
//                           <textarea
//                             className={`w-full p-2 border rounded-md min-h-[${isCommentField ? '120px' : '60px'}] ${
//                               isReadOnly ? 'border-gray-300 bg-gray-50 opacity-80' : 
//                               isCommentField ? 'border-[#1483b9] focus:outline-none focus:ring-2 focus:ring-[#1483b9]' :
//                               'border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-[#1483b9]'
//                             }`}
//                             value={value || ''}
//                             onChange={(e) => !isReadOnly && handleFormChange(key, e.target.value)}
//                             readOnly={isReadOnly}
//                           />
//                         </div>
//                       );
//                     })}
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-gray-200 p-5 bg-gray-50 rounded-b-lg">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-grow">
//                   <h4 className="font-medium text-[#14242c] mb-3 text-sm">Record Status</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {formData['Status'] === 'Verified' ? (
//                       <div className="px-3 py-2 text-sm rounded-md flex items-center bg-blue-100 text-blue-800 border border-blue-200">
//                         <CheckCircle size={14} className="mr-2" />
//                         Verified (No changes allowed)
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => {
//                           if (window.confirm('Are you sure you want to verify this entry? This action cannot be undone.')) {
//                             handleFormChange('Status', 'Verified');
//                             handleFormChange('MedicalReviewerStatus', 'Verified');
//                           }
//                         }}
//                         disabled={formData['Status'] === 'Verified'}
//                         className="px-3 py-2 text-sm rounded-md flex items-center bg-green-500 text-white hover:bg-green-600 hover:shadow-md transition-all duration-300"
//                       >
//                         <CheckCircle size={14} className="mr-2" />
//                         Verify
//                       </button>
//                     )}

//                     {formData['Status'] && (
//                       <div className="flex items-center ml-auto md:ml-2 px-3 py-2 text-sm bg-gray-100 rounded-md">
//                         <span className="mr-2 text-gray-500">Current:</span>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           formData['Status'] === 'Verified' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'
//                         }`}>
//                           {formData['Status']}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex space-x-3 items-center md:border-l md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 mt-3 md:mt-0">
//                   <button
//                     onClick={closeForm}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={saveForm}
//                     disabled={isSaving}
//                     className="px-4 py-2 bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] transition-colors disabled:opacity-70 flex items-center"
//                   >
//                     {isSaving ? (
//                       <>
//                         <RefreshCw size={16} className="mr-2 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save size={16} className="mr-2" />
//                         Save Changes
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicalReviewContent;

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Edit, Save, X, CheckCircle, Calendar, RefreshCw, Lock } from 'lucide-react';
import DatabaseService from '../services/DatabaseService';
import { v4 as uuidv4 } from 'uuid';

// const MedicalReviewContent = () => {
//   const [literatureData, setLiteratureData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusUpdating, setStatusUpdating] = useState(null);
//   const [expandedCell, setExpandedCell] = useState(null);
//   const [error, setError] = useState(null);
//   const [columnNames, setColumnNames] = useState([]);
//   const [clientId, setClientId] = useState('');
//   const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
//   const [showDateFilter, setShowDateFilter] = useState(false);
//   const [sortOrder, setSortOrder] = useState('');
//   const [formData, setFormData] = useState({});
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingRowIndex, setEditingRowIndex] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [commentEdits, setCommentEdits] = useState({});
//   const [commentSaving, setCommentSaving] = useState(null);
//   const [lockedRecords, setLockedRecords] = useState({});
//   const [refreshLocksInterval, setRefreshLocksInterval] = useState(null);

//   const itemsPerPage = 10;

//   const fetchMedicalReviewData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await DatabaseService.fetchMedicalReviews();
      
//       if (data.length > 0) {
//         const columns = [
//           'Mail', 'Article PMID', 'Comments (ICSR, AOI, Not selected)', 'Url', 'Article Access',
//           'Article Type', 'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
//           'Abstract', 'Summary', 'Search Term', 'Drug', 'Article Publication Date',
//           'Primary Author Address', 'Primary Author Country', 'Author Validation (Rule-1)',
//           'Publication Date Validation (Rule-2)', 'Patient Type', 'Patient Details',
//           'Patient Validation (Rule-3)', 'Reporter Details', 'Casuality Response',
//           'Casuality Validation (Rule-4)', 'Reason of selection', 'Status', 'DocumentURL',
//           'MedicalReviewerStatus', 'MedicalReviewerComments'
//         ];
//         setColumnNames(columns);
//       }
      
//       const mappedData = data.map(item => ({
//         ...item,
//         IRD: item['Search Date'] || item['IRD'],
//       }));
//       setLiteratureData(mappedData);
//       setFilteredData(mappedData);
//       setLoading(false);
//       await refreshLockStatus();
//     } catch (err) {
//       console.error("Error fetching medical review data:", err);
//       setError("Failed to load medical review data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const refreshLockStatus = async () => {
//     try {
//       const locks = await DatabaseService.getAllActiveLocks();
//       const newLockedRecords = {};
//       locks.forEach(lock => {
//         if (lock.clientId !== clientId) {
//           newLockedRecords[lock.recordId] = lock;
//         }
//       });
//       setLockedRecords(newLockedRecords);
//     } catch (err) {
//       console.error("Error refreshing lock status:", err);
//     }
//   };

//   useEffect(() => {
//     let existingClientId = localStorage.getItem('editorClientId');
//     if (!existingClientId) {
//       const newClientId = uuidv4();
//       localStorage.setItem('editorClientId', newClientId);
//       existingClientId = newClientId;
//     }
//     setClientId(existingClientId);

//     const cleanupLocks = async () => {
//       try {
//         await DatabaseService.releaseAllLocksByClient(existingClientId);
//       } catch (err) {
//         console.error("Error releasing locks on page unload:", err);
//       }
//     };

//     window.addEventListener('beforeunload', cleanupLocks);

//     fetchMedicalReviewData();
//     const interval = setInterval(refreshLockStatus, 10000);
//     setRefreshLocksInterval(interval);

//     return () => {
//       window.removeEventListener('beforeunload', cleanupLocks);
//       cleanupLocks();
//       if (refreshLocksInterval) {
//         clearInterval(refreshLocksInterval);
//       }
//     };
//   }, []);

//   const acquireLock = async (recordId) => {
//     try {
//       if (isRecordLocked(recordId)) {
//         const lock = lockedRecords[recordId];
//         const lockTime = new Date(lock.timestamp).toLocaleTimeString();
//         showToast(`This record is being edited by another user since ${lockTime}`, "error");
//         return false;
//       }

//       const result = await DatabaseService.acquireLock(recordId, clientId);
//       if (result.success) {
//         await refreshLockStatus();
//         return true;
//       } else {
//         showToast(result.message || "Failed to lock record", "error");
//         return false;
//       }
//     } catch (err) {
//       if (err.message && err.message.includes('409: Conflict')) {
//         await refreshLockStatus();
//         if (isRecordLocked(recordId)) {
//           const lock = lockedRecords[recordId];
//           const lockTime = new Date(lock.timestamp).toLocaleTimeString();
//           showToast(`This record is being edited by another user since ${lockTime}`, "error");
//         } else {
//           showToast("This record is currently being edited by another user", "error");
//         }
//         return false;
//       }
//       console.error("Error acquiring lock:", err);
//       showToast("Failed to lock record: " + (err.message || "Unknown error"), "error");
//       return false;
//     }
//   };

//   const releaseLock = async (recordId) => {
//     try {
//       const result = await DatabaseService.releaseLock(recordId, clientId);
//       await refreshLockStatus();
//       return result.success;
//     } catch (err) {
//       console.error("Error releasing lock:", err);
//       return false;
//     }
//   };

//   const isRecordLocked = (recordId) => {
//     return recordId in lockedRecords;
//   };

//   useEffect(() => {
//     if (!literatureData.length) return;
    
//     let filtered = literatureData;

//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       filtered = filtered.filter(item => {
//         return Object.entries(item).some(([key, val]) => {
//           return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
//         });
//       });
//     }

//     if (dateRange.startDate || dateRange.endDate) {
//       filtered = filtered.filter(item => {
//         const dateStr = item['IRD'];
//         if (!dateStr) return false;
//         const parsedDate = formatDate(dateStr);
//         if (!parsedDate) return false;

//         const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
//         const end = dateRange.endDate ? new Date(dateRange.endDate) : null;

//         return (
//           (!start || new Date(parsedDate) >= start) &&
//           (!end || new Date(parsedDate) <= end)
//         );
//       });
//     }

//     if (sortOrder) {
//       filtered = [...filtered].sort((a, b) => {
//         const dateA = formatDate(a['IRD']);
//         const dateB = formatDate(b['IRD']);
//         if (!dateA) return sortOrder === 'asc' ? 1 : -1;
//         if (!dateB) return sortOrder === 'asc' ? -1 : 1;
//         return sortOrder === 'asc'
//           ? new Date(dateA) - new Date(dateB)
//           : new Date(dateB) - new Date(dateA);
//       });
//     }

//     setFilteredData(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, dateRange, sortOrder, literatureData]);

//   const showToast = (message, type = 'success') => {
//     const toast = document.createElement('div');
//     toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg text-white z-50 animate-slide-in ${
//       type === 'success' ? 'bg-green-500' : 'bg-red-500'
//     }`;
//     toast.innerText = message;
//     document.body.appendChild(toast);

//     setTimeout(() => {
//       toast.classList.replace('animate-slide-in', 'animate-slide-out');
//       setTimeout(() => {
//         document.body.removeChild(toast);
//       }, 300);
//     }, 3000);
//   };

//   const handleVerifyUpdate = async (rowIndex) => {
//     try {
//       const row = filteredData[rowIndex];
//       const recordId = row['Article PMID'];
//       const drugName = row['Drug'];
      
//       if (!recordId) {
//         console.error("Missing Article PMID in row:", row);
//         showToast("Cannot update verification status: missing Article PMID", "error");
//         return;
//       }
//       if (!drugName) {
//         console.error("Missing Drug in row:", row);
//         showToast("Cannot update verification status: missing Drug identifier", "error");
//         return;
//       }
      
//       const lockAcquired = await acquireLock(recordId);
//       if (!lockAcquired) return;

//       setStatusUpdating(`${recordId}_${drugName}`);

//       const matchingRows = filteredData.filter(
//         item => (item['Article PMID'] === recordId) && item['Drug'] === drugName
//       );

//       if (matchingRows.length === 0) {
//         throw new Error(`No record found for Article PMID=${recordId}, Drug=${drugName}`);
//       }

//       let updatedCount = 0;
//       for (const row of matchingRows) {
//         await DatabaseService.updateMedicalReview(recordId, {
//           ...row,
//           Status: 'Verified',
//           MedicalReviewerStatus: 'Verified',
//           clientId
//         }, { drug: drugName });
//         updatedCount++;
//       }

//       const newData = literatureData.map(item => {
//         if ((item['Article PMID'] === recordId) && item['Drug'] === drugName) {
//           return { ...item, Status: 'Verified', MedicalReviewerStatus: 'Verified' };
//         }
//         return item;
//       });

//       setLiteratureData(newData);
//       setFilteredData(newData.filter(item => filteredData.some(f => f['Article PMID'] === item['Article PMID'] && f['Drug'] === item['Drug'])));

//       showToast(`Successfully verified ${updatedCount} record(s)`);
//       await releaseLock(recordId);
//       fetchMedicalReviewData();
//     } catch (err) {
//       console.error("Error updating verification status:", err);
//       showToast(`Failed to update verification status: ${err.message}`, "error");
//       await releaseLock(filteredData[rowIndex]['Article PMID']).catch(() => {});
//     } finally {
//       setStatusUpdating(null);
//     }
//   };

//   const openEditForm = async (row, rowIndex) => {
//     const recordId = row['Article PMID'];

//     if (!recordId) {
//       showToast("Cannot find record identifier", "error");
//       return;
//     }

//     if (isRecordLocked(recordId)) {
//       const lock = lockedRecords[recordId];
//       const lockTime = new Date(lock.timestamp).toLocaleTimeString();
//       showToast(`This record is being edited by another user since ${lockTime}`, "error");
//       return;
//     }

//     const lockAcquired = await acquireLock(recordId);
//     if (!lockAcquired) return;

//     setFormData({ ...row });
//     setEditingRowIndex(rowIndex);
//     setIsFormVisible(true);
//   };

//   const closeForm = async () => {
//     if (formData && formData['Article PMID']) {
//       await releaseLock(formData['Article PMID']);
//     }

//     setIsFormVisible(false);
//     setEditingRowIndex(null);
//     setFormData({});
//   };

//   const handleFormChange = (key, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const saveForm = async () => {
//     try {
//       setIsSaving(true);
//       const recordId = formData['Article PMID'];
//       const drugName = formData['Drug'];

//       if (!recordId || !drugName) {
//         showToast("Cannot save: Article PMID and Drug name are required", "error");
//         await releaseLock(recordId);
//         return;
//       }

//       const lockAcquired = await acquireLock(recordId);
//       if (!lockAcquired) {
//         showToast("Cannot save: Failed to acquire lock", "error");
//         return;
//       }

//       const matchingRows = literatureData.filter(
//         item => (item['Article PMID'] === recordId) && item['Drug'] === drugName
//       );

//       if (matchingRows.length === 0) {
//         showToast("No matching record found", "error");
//         await releaseLock(recordId);
//         return;
//       }

//       let updatedCount = 0;
//       for (const row of matchingRows) {
//         await DatabaseService.updateMedicalReview(recordId, { ...formData, clientId }, { drug: drugName });
//         updatedCount++;
//       }

//       const newData = literatureData.map(item => {
//         if ((item['Article PMID'] === recordId) && item['Drug'] === drugName) {
//           return { ...formData };
//         }
//         return item;
//       });

//       setLiteratureData(newData);
//       setFilteredData(newData.filter(item => filteredData.some(f => f['Article PMID'] === item['Article PMID'] && f['Drug'] === item['Drug'])));

//       showToast(`Changes saved for ${updatedCount} record(s) successfully`);
//       await releaseLock(recordId);
//       closeForm();
//     } catch (err) {
//       console.error("Error saving form:", err);
//       showToast(`Error saving changes: ${err.message}`, "error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCommentChange = (rowIndex, value) => {
//     setCommentEdits(prev => ({
//       ...prev,
//       [rowIndex]: value
//     }));
//   };

//   const handleSaveComment = async (rowIndex) => {
//     let row = null;
//     try {
//       row = filteredData[rowIndex];
//       const recordId = row['Article PMID'];
//       const drugName = row['Drug'];
//       const newComment = commentEdits[rowIndex] || '';

//       if (!recordId) {
//         console.error("Missing Article PMID in row:", row);
//         showToast("Cannot save comment: missing Article PMID", "error");
//         return;
//       }
//       if (!drugName) {
//         console.error("Missing Drug in row:", row);
//         showToast("Cannot save comment: missing Drug identifier", "error");
//         return;
//       }

//       const lockAcquired = await acquireLock(recordId);
//       if (!lockAcquired) return;

//       setCommentSaving(rowIndex);

//       const matchingRows = literatureData.filter(
//         item => item['Article PMID'] === recordId && item['Drug'] === drugName
//       );

//       let updatedCount = 0;
//       for (const matchingRow of matchingRows) {
//         const updatedRecord = { ...matchingRow, MedicalReviewerComments: newComment, clientId };
//         await DatabaseService.updateMedicalReview(recordId, updatedRecord, { drug: drugName });
//         updatedCount++;
//       }

//       setFilteredData(prev => prev.map((item, idx) => 
//         idx === rowIndex ? { ...item, MedicalReviewerComments: newComment } : item
//       ));
//       setLiteratureData(prev => prev.map(item => 
//         (item['Article PMID'] === recordId && item['Drug'] === drugName) 
//           ? { ...item, MedicalReviewerComments: newComment } 
//           : item
//       ));

//       setCommentEdits(prev => {
//         const newEdits = { ...prev };
//         delete newEdits[rowIndex];
//         return newEdits;
//       });

//       showToast(`Comment saved for ${updatedCount} record(s) successfully`);
//       await releaseLock(recordId);
//       fetchMedicalReviewData();
//     } catch (err) {
//       console.error("Error saving comment:", err);
//       showToast(`Failed to save comment: ${err.message}`, "error");
//     } finally {
//       setCommentSaving(null);
//       if (row && row['Article PMID']) {
//         await DatabaseService.releaseLock(row['Article PMID']).catch(() => {});
//       }
//     }
//   };

//   const handleCellClick = (rowIndex, colIndex, value, columnName) => {
//     if (columnName === 'MedicalReviewerComments') return;
//     setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
//   };

//   const closeExpandedCell = () => {
//     setExpandedCell(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     try {
//       const ymdRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
//       if (typeof dateString === 'string' && ymdRegex.test(dateString)) {
//         return dateString;
//       }

//       const monthNamePattern = /^[A-Za-z]{3}\s\d{1,2}\s\d{4}/;
//       if (typeof dateString === 'string' && monthNamePattern.test(dateString)) {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//           const year = date.getFullYear();
//           const month = String(date.getMonth() + 1).padStart(2, '0');
//           const day = String(date.getDate()).padStart(2, '0');
//           return `${year}-${month}-${day}`;
//         }
//       }

//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }

//       return dateString;
//     } catch (e) {
//       console.error("Error parsing date:", e, dateString);
//       return dateString;
//     }
//   };

//   const truncateText = (text, maxLength = 25) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
//   };

//   const renderVerifyButton = (row, rowIndex) => {
//     const recordId = row['Article PMID'];
//     const drugName = row['Drug'];
//     const isUpdating = statusUpdating === `${recordId}_${drugName}`;
//     const currentStatus = row['Status'] || '';

//     if (currentStatus === 'Verified') {
//       return (
//         <span className="text-xs px-3 py-1 rounded-full bg-green-500 text-white flex items-center">
//           <CheckCircle size={14} className="mr-1" />
//           Verified
//         </span>
//       );
//     }

//     return (
//       <button
//         onClick={() => {
//           if (!drugName) {
//             showToast("Error: Drug name is missing for this record", "error");
//             return;
//           }
//           if (window.confirm('Are you sure you want to verify this entry? This action cannot be undone.')) {
//             handleVerifyUpdate(rowIndex);
//           }
//         }}
//         disabled={isUpdating || !drugName}
//         className="flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded-full transition-all duration-300 hover:bg-green-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//         title={!drugName ? 'Drug information missing' : 'Verify this record'}
//       >
//         <CheckCircle size={14} className="mr-1" />
//         Verify
//       </button>
//     );
//   };

//   const renderLockStatus = (recordId) => {
//     if (isRecordLocked(recordId)) {
//       const lock = lockedRecords[recordId];
//       const lockTime = new Date(lock.timestamp).toLocaleTimeString();

//       return (
//         <div className="flex items-center text-red-500" title={`Being edited since ${lockTime}`}>
//           <Lock size={14} className="mr-1" />
//           <span className="text-xs">Locked</span>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-white p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-[#14242c]">Medical Review</h1>
//         <p className="text-[#1a4e6a] mt-2">View and manage medical review data</p>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md border border-[#1a4e6a] shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-[#1483b9]">
//           <Search size={20} className="text-[#143b50] mr-2" />
//           <input
//             type="text"
//             placeholder="Search across all fields..."
//             className="bg-transparent border-none outline-none w-full text-[#14242c]"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="flex space-x-3">
//           <div className="relative">
//             <button
//               onClick={() => setShowDateFilter(!showDateFilter)}
//               className="flex items-center bg-[#1a4e6a] text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
//             >
//               <Calendar size={16} className="mr-2" /> Date Range
//             </button>

//             {showDateFilter && (
//               <div className="absolute right-0 top-full mt-2 bg-white p-4 rounded-md shadow-lg z-20 border border-gray-200 min-w-[300px]">
//                 <div className="flex flex-col gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-[#14242c] mb-1">Start Date</label>
//                     <input
//                       type="date"
//                       value={dateRange.startDate}
//                       onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
//                       className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-[#14242c] mb-1">End Date</label>
//                     <input
//                       type="date"
//                       value={dateRange.endDate}
//                       onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
//                       className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1483b9]"
//                     />
//                   </div>
//                   <div className="flex justify-end gap-2 mt-2">
//                     <button
//                       onClick={() => {
//                         setShowDateFilter(false);
//                         setDateRange({ startDate: '', endDate: '' });
//                       }}
//                       className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//                     >
//                       Clear
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowDateFilter(false);
//                         setCurrentPage(1);
//                       }}
//                       className="px-3 py-1 text-sm bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] transition-colors"
//                     >
//                       Apply Filter
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={fetchMedicalReviewData}
//             className="flex items-center bg-gray-200 text-[#14242c] px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-300"
//             title="Refresh Data"
//           >
//             <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
//           </button>
//         </div>
//       </div>

//       {(dateRange.startDate || dateRange.endDate || searchTerm) && (
//         <div className="mb-4 flex items-center flex-wrap gap-2">
//           <span className="text-sm text-[#1a4e6a] mr-2">Filtered by:</span>
//           {(dateRange.startDate || dateRange.endDate) && (
//             <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
//               <Calendar size={12} className="mr-1" />
//               IRD: {dateRange.startDate || 'No start'} to {dateRange.endDate || 'No end'}
//               <button
//                 onClick={() => setDateRange({ startDate: '', endDate: '' })}
//                 className="ml-2 text-white hover:text-red-200"
//               >
//                 <X size={12} />
//               </button>
//             </div>
//           )}
//           {searchTerm && (
//             <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
//               <Search size={12} className="mr-1" />
//               Search: {searchTerm}
//               <button
//                 onClick={() => setSearchTerm('')}
//                 className="ml-2 text-white hover:text-red-200"
//               >
//                 <X size={12} />
//               </button>
//             </div>
//           )}
//           {(dateRange.startDate || dateRange.endDate || searchTerm) && (
//             <button
//               onClick={() => {
//                 setDateRange({ startDate: '', endDate: '' });
//                 setSearchTerm('');
//               }}
//               className="text-xs bg-[#1483b9] text-white px-2 py-1 rounded-md hover:bg-[#143b50] flex items-center transition-all duration-300"
//             >
//               <X size={12} className="mr-1" /> Clear all filters
//             </button>
//           )}
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <p>{error}</p>
//         </div>
//       )}

//       {expandedCell && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
//           <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto shadow-2xl animate-scale-in">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium text-[#14242c]">{expandedCell.columnName}</h3>
//               <button
//                 onClick={closeExpandedCell}
//                 className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
//               >
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
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 border-4 border-[#1483b9] border-t-transparent rounded-full animate-spin mb-4"></div>
//             <p className="text-[#14242c]">Loading medical review data...</p>
//           </div>
//         </div>
//       ) : (
//         <>
//           {filteredData.length === 0 ? (
//             <div className="bg-white rounded-lg shadow p-6 text-center">
//               <p className="text-[#1a4e6a]">No medical reviews found matching the criteria.</p>
//             </div>
//           ) : (
//             <>
//               <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//                 <div className="relative overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead className="bg-[#14242c] text-white sticky top-0 z-10">
//                       <tr>
//                         {columnNames.map((col, idx) => (
//                           <th
//                             key={idx}
//                             className={`px-3 py-2 text-left font-medium text-xs whitespace-nowrap ${
//                               col === 'IRD' ? 'cursor-pointer hover:bg-[#143b50]' : ''
//                             }`}
//                             style={{ minWidth: '120px' }}
//                             onClick={() => {
//                               if (col === 'IRD') {
//                                 setSortOrder(prev => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
//                                 setCurrentPage(1);
//                               }
//                             }}
//                           >
//                             <div className="flex items-center">
//                               {col}
//                               {col === 'IRD' && sortOrder && (
//                                 <svg
//                                   className="ml-1 w-4 h-4"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d={sortOrder === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
//                                   />
//                                 </svg>
//                               )}
//                             </div>
//                           </th>
//                         ))}
//                         <th
//                           className="px-3 py-2 text-left font-medium text-xs whitespace-nowrap bg-[#143b50] sticky right-0 shadow-l"
//                           style={{ minWidth: '160px' }}
//                         >
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, rowIndex) => {
//                         const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
//                         const recordId = row['Article PMID'];
//                         const isLocked = isRecordLocked(recordId);

//                         return (
//                           <tr
//                             key={`${recordId}_${row['Drug']}_${rowIndex}`}
//                             className={`hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150 ${
//                               isLocked ? 'bg-red-50' : row['Status'] === 'Verified' ? 'bg-blue-50' : ''
//                             }`}
//                           >
//                             {columnNames.map((col, colIndex) => (
//                               <td
//                                 key={`${recordId}_${col}_${colIndex}`}
//                                 className={`px-3 py-2 text-xs ${
//                                   col === 'Article PMID'
//                                     ? 'font-medium text-[#143b50]'
//                                     : col === 'MedicalReviewerComments'
//                                     ? 'p-0'
//                                     : 'truncate hover:bg-gray-100 transition-colors duration-150'
//                                 }`}
//                                 onClick={() => col !== 'MedicalReviewerComments' && handleCellClick(actualRowIndex, colIndex, row[col], col)}
//                                 title={col !== 'MedicalReviewerComments' ? 'Click to view full content' : ''}
//                                 style={{ minWidth: '120px', maxWidth: '120px' }}
//                               >
//                                 {col === 'MedicalReviewerComments' ? (
//                                   <div className="flex flex-col gap-2 p-2">
//                                     <textarea
//                                       className="w-full p-2 border rounded-md border-[#1483b9] bg-white resize-y focus:outline-none focus:ring-2 focus:ring-[#1483b9] text-xs"
//                                       style={{ minHeight: '40px', height: 'auto' }}
//                                       value={commentEdits[actualRowIndex] ?? row[col] ?? ''}
//                                       onChange={(e) => {
//                                         handleCommentChange(actualRowIndex, e.target.value);
//                                         e.target.style.height = 'auto';
//                                         e.target.style.height = `${e.target.scrollHeight}px`;
//                                       }}
//                                       disabled={commentSaving === actualRowIndex}
//                                     />
//                                     <button
//                                       onClick={() => handleSaveComment(actualRowIndex)}
//                                       disabled={commentSaving === actualRowIndex || commentEdits[actualRowIndex] === undefined}
//                                       className="px-2 py-1 text-xs bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] disabled:opacity-50"
//                                     >
//                                       {commentSaving === actualRowIndex ? 'Saving...' : 'Save'}
//                                     </button>
//                                   </div>
//                                 ) : ['IRD', 'Validation Processing Date', 'Article Publication Date'].includes(col) ? (
//                                   formatDate(row[col])
//                                 ) : (
//                                   truncateText(row[col], 25) || ''
//                                 )}
//                               </td>
//                             ))}
//                             <td className="px-3 py-2 bg-white sticky right-0 shadow-l" style={{ minWidth: '160px' }}>
//                               <div className="flex items-center space-x-2">
//                                 {isLocked ? (
//                                   <>
//                                     {renderLockStatus(recordId)}
//                                     <button
//                                       disabled
//                                       className="flex items-center justify-center w-8 h-8 bg-gray-300 text-white rounded-full cursor-not-allowed opacity-50"
//                                       title="This record is being edited by another user"
//                                     >
//                                       <Lock size={14} />
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <button
//                                     onClick={() => openEditForm(row, actualRowIndex)}
//                                     className="flex items-center justify-center w-8 h-8 bg-[#1483b9] text-white rounded-full transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
//                                     title="Edit this record"
//                                   >
//                                     <Edit size={14} />
//                                   </button>
//                                 )}
//                                 {renderVerifyButton(row, actualRowIndex)}
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mt-6">
//                 <div className="text-sm text-[#1a4e6a]">
//                   Showing {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
//                   {Math.min(currentPage * itemsPerPage, filteredData.length)} entries of {filteredData.length} total entries
//                 </div>
//                 {filteredData.length > itemsPerPage && (
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronLeft size={16} />
//                     </button>

//                     {(() => {
//                       const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//                       let pagesToShow = [];

//                       if (totalPages <= 5) {
//                         pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
//                       } else {
//                         if (currentPage <= 3) {
//                           pagesToShow = [1, 2, 3, 4, '...', totalPages];
//                         } else if (currentPage >= totalPages - 2) {
//                           pagesToShow = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
//                         } else {
//                           pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
//                         }
//                       }

//                       return pagesToShow.map((page, index) => {
//                         if (page === '...') {
//                           return (
//                             <span key={`ellipsis-${index}`} className="px-3 py-1">
//                               ...
//                             </span>
//                           );
//                         }
//                         return (
//                           <button
//                             key={`page-${page}`}
//                             onClick={() => setCurrentPage(page)}
//                             className={`px-3 py-1 rounded-md transition-all duration-300 ${
//                               currentPage === page
//                                 ? 'bg-[#14242c] text-white shadow-md'
//                                 : 'bg-gray-200 hover:bg-gray-300'
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         );
//                       });
//                     })()}

//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
//                       className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </>
//       )}

//       {isFormVisible && editingRowIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
//           <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl animate-scale-in flex flex-col max-h-[95vh]">
//             <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#14242c] text-white rounded-t-lg">
//               <h3 className="text-xl font-bold flex items-center">
//                 <Edit size={18} className="mr-2" />
//                 Edit Medical Review Record
//               </h3>
//               <button
//                 onClick={closeForm}
//                 className="text-white hover:text-red-300 transition-colors p-1 rounded-full hover:bg-[#143b50]"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="overflow-y-auto p-6 flex-grow" style={{ maxHeight: "calc(95vh - 150px)" }}>
//               {formData['Article PMID'] && (
//                 <div className="mb-6 bg-[#1a4e6a] bg-opacity-10 p-3 rounded-md border-l-4 border-[#1a4e6a] flex items-center">
//                   <span className="font-semibold text-[#1a4e6a] mr-2">Article PMID:</span>
//                   <span className="text-[#143b50]">{formData['Article PMID']}</span>
//                   <span className="ml-auto px-2 py-1 text-xs bg-[#1a4e6a] text-white rounded-md">
//                     {formData['Status'] || 'No Status'}
//                   </span>
//                 </div>
//               )}

//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="md:w-1/2 space-y-4">
//                   {Object.entries(formData)
//                     .filter(([key]) => [
//                       'Mail', 'Article PMID', 'Url', 'Article Access', 'Article Type',
//                       'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
//                       'Abstract', 'Search Term', 'Drug', 'Article Publication Date',
//                       'Primary Author Address', 'Primary Author Country'
//                     ].includes(key))
//                     .map(([key, value], index) => {
//                       const isReadOnly = [
//                         'Article PMID', 'Title', 'Abstract', 'Url', 'Validation Processing Date',
//                         'Drug', 'Article Access', 'Article Type', 'PMCID', 'Pdf File', 'Search Term'
//                       ].includes(key);
//                       const isDateField = ['IRD', 'Validation Processing Date', 'Article Publication Date'].includes(key);

//                       return (
//                         <div key={index}>
//                           <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
//                             {isDateField && <Calendar size={14} className="mr-1 text-[#1483b9]" />}
//                             {key}
//                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
//                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
//                             }`}>
//                               {isReadOnly ? 'Read-only' : 'Editable'}
//                             </span>
//                           </label>
//                           {key === 'Url' ? (
//                             <div className="flex items-center">
//                               <input
//                                 type="text"
//                                 className="w-full p-2 border rounded-md border-gray-300 bg-gray-50 opacity-80"
//                                 value={value || ''}
//                                 readOnly
//                               />
//                               {value && (
//                                 <a
//                                   href={value}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                                 >
//                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth Caribe="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//                                     <polyline points="15 3 21 3 21 9"></polyline>
//                                     <line x1="10" y1="14" x2="21" y2="3"></line>
//                                   </svg>
//                                 </a>
//                               )}
//                             </div>
//                           ) : (
//                             <textarea
//                               className={`w-full p-2 border rounded-md min-h-[60px] ${
//                                 isReadOnly ? 'border-gray-300 bg-gray-50 opacity-80' : 'border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-[#1483b9]'
//                               }`}
//                               value={value || ''}
//                               onChange={(e) => !isReadOnly && handleFormChange(key, e.target.value)}
//                               readOnly={isReadOnly}
//                             />
//                           )}
//                         </div>
//                       );
//                     })}
//                 </div>

//                 <div className="md:w-1/2 space-y-4">
//                   {Object.entries(formData)
//                     .filter(([key]) => ![
//                       'Mail', 'Article PMID', 'Url', 'Article Access', 'Article Type',
//                       'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
//                       'Abstract', 'Search Term', 'Drug', 'Article Publication Date',
//                       'Primary Author Address', 'Primary Author Country'
//                     ].includes(key))
//                     .map(([key, value], index) => {
//                       const isReadOnly = ['Status', 'Summary', 'MedicalReviewerStatus'].includes(key);
//                       const isCommentField = key === 'Comments (ICSR, AOI, Not selected)' || key === 'MedicalReviewerComments';

//                       return (
//                         <div key={index}>
//                           <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
//                             {key}
//                             <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
//                               isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
//                             }`}>
//                               {isReadOnly ? 'Read-only' : 'Editable'}
//                             </span>
//                           </label>
//                           <textarea
//                             className={`w-full p-2 border rounded-md min-h-[${isCommentField ? '120px' : '60px'}] ${
//                               isReadOnly ? 'border-gray-300 bg-gray-50 opacity-80' : 
//                               isCommentField ? 'border-[#1483b9] focus:outline-none focus:ring-2 focus:ring-[#1483b9]' :
//                               'border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-[#1483b9]'
//                             }`}
//                             value={value || ''}
//                             onChange={(e) => !isReadOnly && handleFormChange(key, e.target.value)}
//                             readOnly={isReadOnly}
//                           />
//                         </div>
//                       );
//                     })}
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-gray-200 p-5 bg-gray-50 rounded-b-lg">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-grow">
//                   <h4 className="font-medium text-[#14242c] mb-3 text-sm">Record Status</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {formData['Status'] === 'Verified' ? (
//                       <div className="px-3 py-2 text-sm rounded-md flex items-center bg-blue-100 text-blue-800 border border-blue-200">
//                         <CheckCircle size={14} className="mr-2" />
//                         Verified (No changes allowed except comments)
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => {
//                           if (window.confirm('Are you sure you want to verify this entry? This action cannot be undone.')) {
//                             handleFormChange('Status', 'Verified');
//                             handleFormChange('MedicalReviewerStatus', 'Verified');
//                           }
//                         }}
//                         disabled={formData['Status'] === 'Verified'}
//                         className="px-3 py-2 text-sm rounded-md flex items-center bg-green-500 text-white hover:bg-green-600 hover:shadow-md transition-all duration-300"
//                       >
//                         <CheckCircle size={14} className="mr-2" />
//                         Verify
//                       </button>
//                     )}

//                     {formData['Status'] && (
//                       <div className="flex items-center ml-auto md:ml-2 px-3 py-2 text-sm bg-gray-100 rounded-md">
//                         <span className="mr-2 text-gray-500">Current:</span>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           formData['Status'] === 'Verified' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'
//                         }`}>
//                           {formData['Status']}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex space-x-3 items-center md:border-l md:pl-4 pt-3 md:border-t-0 mt-3 md:mt-0">
//                   <button
//                     onClick={closeForm}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={saveForm}
//                     disabled={isSaving}
//                     className="px-4 py-2 bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] transition-colors disabled:opacity-70 flex items-center"
//                   >
//                     {isSaving ? (
//                       <>
//                         <RefreshCw size={16} className="mr-2 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save size={16} className="mr-2" />
//                         Save Changes
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicalReviewContent;
const MedicalReviewContent = () => {
  const [literatureData, setLiteratureData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [expandedCell, setExpandedCell] = useState(null);
  const [error, setError] = useState(null);
  const [columnNames, setColumnNames] = useState([]);
  const [clientId, setClientId] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [formData, setFormData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [commentEdits, setCommentEdits] = useState({});
  const [commentSaving, setCommentSaving] = useState(null);
  const [lockedRecords, setLockedRecords] = useState({});
  const [refreshLocksInterval, setRefreshLocksInterval] = useState(null);

  const itemsPerPage = 10;

  const fetchMedicalReviewData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DatabaseService.fetchMedicalReviews();
      
      if (data.length > 0) {
        const columns = [
          'Mail', 'Article PMID', 'Comments (ICSR, AOI, Not selected)', 'Url', 'Article Access',
          'Article Type', 'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
          'Abstract', 'Summary', 'Search Term', 'Drug', 'Article Publication Date',
          'Primary Author Address', 'Primary Author Country', 'Author Validation (Rule-1)',
          'Publication Date Validation (Rule-2)', 'Patient Type', 'Patient Details',
          'Patient Validation (Rule-3)', 'Reporter Details', 'Casuality Response',
          'Casuality Validation (Rule-4)', 'Reason of selection', 'Status', 
          'MedicalReviewerStatus', 'MedicalReviewerComments'
        ];
        setColumnNames(columns);
      }
      
      const mappedData = data.map(item => ({
        ...item,
        IRD: item['Search Date'] || item['IRD'],
      }));
      setLiteratureData(mappedData);
      setFilteredData(mappedData); // Ensure initial filtered data includes all records
      setLoading(false);
      await refreshLockStatus();
    } catch (err) {
      console.error("Error fetching medical review data:", err);
      setError("Failed to load medical review data. Please try again later.");
      setLoading(false);
    }
  };

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

    fetchMedicalReviewData();
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
useEffect(() => {
  if (!literatureData.length) return;

  let filtered = literatureData;

  // Include all records, regardless of status
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filtered = filtered.filter(item => {
      return Object.entries(item).some(([key, val]) => {
        return val && typeof val === 'string' && val.toLowerCase().includes(searchLower);
      });
    });
  }

  if (dateRange.startDate || dateRange.endDate) {
    filtered = filtered.filter(item => {
      const dateStr = item['IRD'];
      const parsedDate = formatDate(dateStr);
      if (parsedDate === dateStr) return false; // Skip unparseable dates

      // Convert DD-MM-YYYY to Date object
      const [day, month, year] = parsedDate.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const end = dateRange.endDate ? new Date(dateRange.endDate) : null;

      return (
        (!start || date >= start) &&
        (!end || date <= end)
      );
    });
  }

  if (sortOrder) {
    filtered = [...filtered].sort((a, b) => {
      const dateA = formatDate(a['IRD']);
      const dateB = formatDate(b['IRD']);

      // Handle unparseable dates (where formatDate returns the original string)
      if (dateA === a['IRD'] && dateB === b['IRD']) return 0;
      if (dateA === a['IRD']) return sortOrder === 'asc' ? 1 : -1; // Unparseable last
      if (dateB === b['IRD']) return sortOrder === 'asc' ? -1 : 1; // Unparseable last

      // Convert DD-MM-YYYY to Date objects
      const [dayA, monthA, yearA] = dateA.split('-').map(Number);
      const [dayB, monthB, yearB] = dateB.split('-').map(Number);
      const timeA = new Date(yearA, monthA - 1, dayA).getTime();
      const timeB = new Date(yearB, monthB - 1, dayB).getTime();

      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }

  setFilteredData(filtered);
  setCurrentPage(1);
}, [searchTerm, dateRange, sortOrder, literatureData]);

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

  const handleVerifyUpdate = async (rowIndex) => {
    try {
      const row = filteredData[rowIndex];
      const recordId = row['Article PMID'];
      const drugName = row['Drug'];
      
      if (!recordId) {
        console.error("Missing Article PMID in row:", row);
        showToast("Cannot update verification status: missing Article PMID", "error");
        return;
      }
      if (!drugName) {
        console.error("Missing Drug in row:", row);
        showToast("Cannot update verification status: missing Drug identifier", "error");
        return;
      }
      
      const lockAcquired = await acquireLock(recordId);
      if (!lockAcquired) return;

      setStatusUpdating(`${recordId}_${drugName}`);

      const matchingRows = filteredData.filter(
        item => (item['Article PMID'] === recordId) && item['Drug'] === drugName
      );

      if (matchingRows.length === 0) {
        throw new Error(`No record found for Article PMID=${recordId}, Drug=${drugName}`);
      }

      let updatedCount = 0;
      for (const row of matchingRows) {
        await DatabaseService.updateMedicalReview(recordId, {
          ...row,
          Status: 'Verified',
          MedicalReviewerStatus: 'Verified',
          clientId
        }, { drug: drugName });
        updatedCount++;
      }

      const newData = literatureData.map(item => {
        if ((item['Article PMID'] === recordId) && item['Drug'] === drugName) {
          return { ...item, Status: 'Verified', MedicalReviewerStatus: 'Verified' };
        }
        return item;
      });

      setLiteratureData(newData);
      setFilteredData(newData); // Replace with full updated dataset
      showToast(`Successfully verified ${updatedCount} record(s)`);
      await releaseLock(recordId);
      fetchMedicalReviewData();
    } catch (err) {
      console.error("Error updating verification status:", err);
      showToast(`Failed to update verification status: ${err.message}`, "error");
      await releaseLock(filteredData[rowIndex]['Article PMID']).catch(() => {});
    } finally {
      setStatusUpdating(null);
    }
  };

 const openEditForm = async (row, rowIndex) => {
  const recordId = row['Article PMID'];

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
  if (!lockAcquired) return;

  setFormData({ ...row });
  setEditingRowIndex(rowIndex);
  setIsFormVisible(true);
};

  const closeForm = async () => {
    if (formData && formData['Article PMID']) {
      await releaseLock(formData['Article PMID']);
    }

    setIsFormVisible(false);
    setEditingRowIndex(null);
    setFormData({});
  };

  const handleFormChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveForm = async () => {
    try {
      setIsSaving(true);
      const recordId = formData['Article PMID'];
      const drugName = formData['Drug'];

      if (!recordId || !drugName) {
        showToast("Cannot save: Article PMID and Drug name are required", "error");
        await releaseLock(recordId);
        return;
      }

      const lockAcquired = await acquireLock(recordId);
      if (!lockAcquired) {
        showToast("Cannot save: Failed to acquire lock", "error");
        return;
      }

      const matchingRows = literatureData.filter(
        item => (item['Article PMID'] === recordId) && item['Drug'] === drugName
      );

      if (matchingRows.length === 0) {
        showToast("No matching record found", "error");
        await releaseLock(recordId);
        return;
      }

      let updatedCount = 0;
      for (const row of matchingRows) {
        await DatabaseService.updateMedicalReview(recordId, { ...formData, clientId }, { drug: drugName });
        updatedCount++;
      }

      const newData = literatureData.map(item => {
        if ((item['Article PMID'] === recordId) && item['Drug'] === drugName) {
          return { ...formData };
        }
        return item;
      });

      setLiteratureData(newData);
      setFilteredData(newData.filter(item => filteredData.some(f => f['Article PMID'] === item['Article PMID'] && f['Drug'] === item['Drug'])));

      showToast(`Changes saved for ${updatedCount} record(s) successfully`);
      await releaseLock(recordId);
      closeForm();
    } catch (err) {
      console.error("Error saving form:", err);
      showToast(`Error saving changes: ${err.message}`, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCommentChange = (rowIndex, value) => {
    setCommentEdits(prev => ({
      ...prev,
      [rowIndex]: value
    }));
  };

  const handleSaveComment = async (rowIndex) => {
    let row = null;
    try {
      row = filteredData[rowIndex];
      const recordId = row['Article PMID'];
      const drugName = row['Drug'];
      const newComment = commentEdits[rowIndex] || '';

      if (!recordId) {
        console.error("Missing Article PMID in row:", row);
        showToast("Cannot save comment: missing Article PMID", "error");
        return;
      }
      if (!drugName) {
        console.error("Missing Drug in row:", row);
        showToast("Cannot save comment: missing Drug identifier", "error");
        return;
      }

      const lockAcquired = await acquireLock(recordId);
      if (!lockAcquired) return;

      setCommentSaving(rowIndex);

      const matchingRows = literatureData.filter(
        item => item['Article PMID'] === recordId && item['Drug'] === drugName
      );

      let updatedCount = 0;
      for (const matchingRow of matchingRows) {
        const updatedRecord = { ...matchingRow, MedicalReviewerComments: newComment, clientId };
        await DatabaseService.updateMedicalReview(recordId, updatedRecord, { drug: drugName });
        updatedCount++;
      }

      setFilteredData(prev => prev.map((item, idx) => 
        idx === rowIndex ? { ...item, MedicalReviewerComments: newComment } : item
      ));
      setLiteratureData(prev => prev.map(item => 
        (item['Article PMID'] === recordId && item['Drug'] === drugName) 
          ? { ...item, MedicalReviewerComments: newComment } 
          : item
      ));

      setCommentEdits(prev => {
        const newEdits = { ...prev };
        delete newEdits[rowIndex];
        return newEdits;
      });

      showToast(`Comment saved for ${updatedCount} record(s) successfully`);
      await releaseLock(recordId);
      fetchMedicalReviewData();
    } catch (err) {
      console.error("Error saving comment:", err);
      showToast(`Failed to save comment: ${err.message}`, "error");
    } finally {
      setCommentSaving(null);
      if (row && row['Article PMID']) {
        await DatabaseService.releaseLock(row['Article PMID']).catch(() => {});
      }
    }
  };

  const handleCellClick = (rowIndex, colIndex, value, columnName) => {
    if (columnName === 'MedicalReviewerComments') return;
    setExpandedCell({ row: rowIndex, col: colIndex, value, columnName });
  };

  const closeExpandedCell = () => {
    setExpandedCell(null);
  };

//  const formatDate = (dateString) => {
//   if (!dateString || typeof dateString !== 'string') return null;

//   try {
//     const ymdRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
//     if (ymdRegex.test(dateString)) {
//       return dateString; // Already in YYYY-MM-DD format
//     }

//     const monthNamePattern = /^[A-Za-z]{3}\s\d{1,2}\s\d{4}$/;
//     if (monthNamePattern.test(dateString)) {
//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }
//     }

//     const date = new Date(dateString);
//     if (!isNaN(date.getTime())) {
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       return `${year}-${month}-${day}`;
//     }

//     return null; // Return null for invalid dates
//   } catch (e) {
//     console.error("Error parsing date:", e, dateString);
//     return null;
//   }
// };
const formatDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return dateString || '-';

  try {
    // Handle YYYY-MM-DD format
    const ymdRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (ymdRegex.test(dateString)) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    }

    // Handle "MMM DD YYYY h:mmA" format (e.g., "Apr 28 2025 6:30PM")
    const fullDateTimePattern = /^[A-Za-z]{3}\s\d{1,2}\s\d{4}\s\d{1,2}:\d{2}(AM|PM)$/i;
    if (fullDateTimePattern.test(dateString)) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    }

    // Handle "MMM DD YYYY" format
    const monthNamePattern = /^[A-Za-z]{3}\s\d{1,2}\s\d{4}$/;
    if (monthNamePattern.test(dateString)) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    }

    // Fallback for other date formats
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    console.warn("Unparseable date format:", dateString);
    return dateString; // Return original string for unparseable dates
  } catch (e) {
    console.error("Error parsing date:", e, dateString);
    return dateString; // Return original string on error
  }
};

  const truncateText = (text, maxLength = 25) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const renderVerifyButton = (row, rowIndex) => {
    const recordId = row['Article PMID'];
    const drugName = row['Drug'];
    const isUpdating = statusUpdating === `${recordId}_${drugName}`;
    const currentStatus = row['Status'] || '';

    if (currentStatus === 'Verified') {
      return (
        <span className="text-xs px-3 py-1 rounded-full bg-green-500 text-white flex items-center">
          <CheckCircle size={14} className="mr-1" />
          Verified
        </span>
      );
    }

    return (
      <button
        onClick={() => {
          if (!drugName) {
            showToast("Error: Drug name is missing for this record", "error");
            return;
          }
          if (window.confirm('Are you sure you want to verify this entry? This action cannot be undone.')) {
            handleVerifyUpdate(rowIndex);
          }
        }}
        disabled={isUpdating || !drugName}
        className="flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded-full transition-all duration-300 hover:bg-green-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        title={!drugName ? 'Drug information missing' : 'Verify this record'}
      >
        <CheckCircle size={14} className="mr-1" />
        Verify
      </button>
    );
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

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#14242c]">Medical Review</h1>
        <p className="text-[#1a4e6a] mt-2">View and manage medical review data</p>
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
      const dataToExport = filteredData;

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

      const headers = columnNames;
      let csvRows = [];
      csvRows.push(headers.map(header => escapeCSV(header)).join(','));

      dataToExport.forEach(row => {
        const rowValues = headers.map(header => escapeCSV(row[header]));
        csvRows.push(rowValues.join(','));
      });

      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

      let filename = `medical_reviews_export_${new Date().toISOString().split('T')[0]}`;
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
  Export {filteredData.length > 0 ? `(${filteredData.length})` : ''}
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
                      onClick={() => {
                        setShowDateFilter(false);
                        setDateRange({ startDate: '', endDate: '' });
                      }}
                      className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Clear
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
            onClick={fetchMedicalReviewData}
            className="flex items-center bg-gray-200 text-[#14242c] px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-300"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {(dateRange.startDate || dateRange.endDate || searchTerm) && (
        <div className="mb-4 flex items-center flex-wrap gap-2">
          <span className="text-sm text-[#1a4e6a] mr-2">Filtered by:</span>
          {(dateRange.startDate || dateRange.endDate) && (
            <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
              <Calendar size={12} className="mr-1" />
              IRD: {dateRange.startDate || 'No start'} to {dateRange.endDate || 'No end'}
              <button
                onClick={() => setDateRange({ startDate: '', endDate: '' })}
                className="ml-2 text-white hover:text-red-200"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {searchTerm && (
            <div className="bg-[#1a4e6a] text-white text-xs px-3 py-1 rounded-full flex items-center">
              <Search size={12} className="mr-1" />
              Search: {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 text-white hover:text-red-200"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {(dateRange.startDate || dateRange.endDate || searchTerm) && (
            <button
              onClick={() => {
                setDateRange({ startDate: '', endDate: '' });
                setSearchTerm('');
              }}
              className="text-xs bg-[#1483b9] text-white px-2 py-1 rounded-md hover:bg-[#143b50] flex items-center transition-all duration-300"
            >
              <X size={12} className="mr-1" /> Clear all filters
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {expandedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#14242c]">{expandedCell.columnName}</h3>
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-[#1483b9] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#14242c]">Loading medical review data...</p>
          </div>
        </div>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-[#1a4e6a]">No ICSR or AOI cases have been approved by the Literature Reviewer.</p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#14242c] text-white sticky top-0 z-10">
                      <tr>
                        {columnNames.map((col, idx) => (
                          <th
                            key={idx}
                            className={`px-3 py-2 text-left font-medium text-xs whitespace-nowrap ${
                              col === 'IRD' ? 'cursor-pointer hover:bg-[#143b50]' : ''
                            }`}
                            style={{ minWidth: '120px' }}
                            onClick={() => {
                              if (col === 'IRD') {
                                setSortOrder(prev => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
                                setCurrentPage(1);
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
                            </div>
                          </th>
                        ))}
                        <th
                          className="px-3 py-2 text-left font-medium text-xs whitespace-nowrap bg-[#143b50] sticky right-0 shadow-l"
                          style={{ minWidth: '160px' }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, rowIndex) => {
                        const actualRowIndex = (currentPage - 1) * itemsPerPage + rowIndex;
                        const recordId = row['Article PMID'];
                        const isLocked = isRecordLocked(recordId);

                        return (
                          <tr
                            key={`${recordId}_${row['Drug']}_${rowIndex}`}
                            className={`hover:bg-gray-50 border-b border-gray-200 transition-colors duration-150 ${
                              isLocked ? 'bg-red-50' : row['Status'] === 'Verified' ? 'bg-blue-50' : ''
                            }`}
                          >
                      {columnNames.map((col, colIndex) => (
  <td
    key={`${recordId}_${col}_${colIndex}`}
    className={`px-3 py-2 text-xs ${
      col === 'Article PMID'
        ? 'font-medium text-[#143b50]'
        : col === 'MedicalReviewerComments'
        ? 'p-0'
        : 'truncate hover:bg-gray-100 transition-colors duration-150'
    }`}
    onClick={() => col !== 'MedicalReviewerComments' && handleCellClick(actualRowIndex, colIndex, row[col], col)}
    title={col !== 'MedicalReviewerComments' ? 'Click to view full content' : ''}
    style={{ minWidth: '120px', maxWidth: '120px' }}
  >
    {col === 'MedicalReviewerComments' ? (
      <div className="flex flex-col gap-2 p-2">
        <textarea
          className="w-full p-2 border rounded-md border-[#1483b9] bg-white resize-y focus:outline-none focus:ring-2 focus:ring-[#1483b9] text-xs"
          style={{ minHeight: '40px', height: 'auto' }}
          value={commentEdits[actualRowIndex] ?? row[col] ?? ''}
          onChange={(e) => {
            handleCommentChange(actualRowIndex, e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          disabled={commentSaving === actualRowIndex}
        />
        <button
          onClick={() => handleSaveComment(actualRowIndex)}
          disabled={commentSaving === actualRowIndex || commentEdits[actualRowIndex] === undefined}
          className="px-2 py-1 text-xs bg-[#1483b9] text-white rounded-md hover:bg-[#143b50] disabled:opacity-50"
        >
          {commentSaving === actualRowIndex ? 'Saving...' : 'Save'}
        </button>
      </div>
    ) : ['IRD', 'Validation Processing Date', 'Article Publication Date'].includes(col) ? (
      formatDate(row[col]) || row[col] || '-'
    ) : (
      truncateText(row[col], 25) || ''
    )}
  </td>
))}
                            <td className="px-3 py-2 bg-white sticky right-0 shadow-l" style={{ minWidth: '160px' }}>
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
  onClick={() => openEditForm(row, actualRowIndex)}
  className="flex items-center justify-center w-8 h-8 bg-[#1483b9] text-white rounded-full transition-all duration-300 hover:bg-[#143b50] hover:shadow-md"
  title={row['Status'] === 'Verified' ? 'Edit comments only (record is verified)' : 'Edit this record'}
>
  <Edit size={14} />
</button>
                                )}
                                {renderVerifyButton(row, actualRowIndex)}
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
                <div className="text-sm text-[#1a4e6a]">
                  Showing {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} entries of {filteredData.length} total entries
                </div>
                {filteredData.length > itemsPerPage && (
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {(() => {
                      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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
                      disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {isFormVisible && editingRowIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl animate-scale-in flex flex-col max-h-[95vh]">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#14242c] text-white rounded-t-lg">
              <h3 className="text-xl font-bold flex items-center">
                <Edit size={18} className="mr-2" />
                Edit Medical Review Record
              </h3>
              <button
                onClick={closeForm}
                className="text-white hover:text-red-300 transition-colors p-1 rounded-full hover:bg-[#143b50]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-grow" style={{ maxHeight: "calc(95vh - 150px)" }}>
              {formData['Article PMID'] && (
                <div className="mb-6 bg-[#1a4e6a] bg-opacity-10 p-3 rounded-md border-l-4 border-[#1a4e6a] flex items-center">
                  <span className="font-semibold text-[#1a4e6a] mr-2">Article PMID:</span>
                  <span className="text-[#143b50]">{formData['Article PMID']}</span>
                  <span className="ml-auto px-2 py-1 text-xs bg-[#1a4e6a] text-white rounded-md">
                    {formData['Status'] || 'No Status'}
                  </span>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 space-y-4">
                  {Object.entries(formData)
                    .filter(([key]) => [
                      'Mail', 'Article PMID', 'Url', 'Article Access', 'Article Type',
                      'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
                      'Abstract', 'Search Term', 'Drug', 'Article Publication Date',
                      'Primary Author Address', 'Primary Author Country' 
                    ].includes(key))
                    .map(([key, value], index) => {
                      const isReadOnly = [
                        'Article PMID', 'Title', 'Abstract', 'Url', 'Validation Processing Date',
                        'Drug', 'Article Access', 'Article Type', 'PMCID', 'Pdf File', 'Search Term'
                      ].includes(key);
                      const isDateField = ['IRD', 'Validation Processing Date', 'Article Publication Date'].includes(key);

                      return (
                        <div key={index}>
                          <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
                            {isDateField && <Calendar size={14} className="mr-1 text-[#1483b9]" />}
                            {key}
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {isReadOnly ? 'Read-only' : 'Editable'}
                            </span>
                          </label>
                          {key === 'Url' ? (
                            <div className="flex items-center">
                              <input
                                type="text"
                                className="w-full p-2 border rounded-md border-gray-300 bg-gray-50 opacity-80"
                                value={value || ''}
                                readOnly
                              />
                              {value && (
                                <a
                                  href={value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth Caribe="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                  </svg>
                                </a>
                              )}
                            </div>
                          ) : (
                            <textarea
                              className={`w-full p-2 border rounded-md min-h-[60px] ${
                                isReadOnly ? 'border-gray-300 bg-gray-50 opacity-80' : 'border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-[#1483b9]'
                              }`}
                              value={value || ''}
                              onChange={(e) => !isReadOnly && handleFormChange(key, e.target.value)}
                              readOnly={isReadOnly}
                            />
                          )}
                        </div>
                      );
                    })}
                </div>

                <div className="md:w-1/2 space-y-4">
                 {Object.entries(formData)
  .filter(([key]) => ![
    'Mail', 'Article PMID', 'Url', 'Article Access', 'Article Type',
    'PMCID', 'Pdf File', 'IRD', 'Validation Processing Date', 'Title',
    'Abstract', 'Search Term', 'Drug', 'Article Publication Date',
    'Primary Author Address', 'Primary Author Country','DocumentURL'
  ].includes(key))
  .map(([key, value], index) => {
    const isVerified = formData['Status'] === 'Verified';
    const isCommentField = key === 'Comments (ICSR, AOI, Not selected)' || key === 'MedicalReviewerComments';
    const isReadOnly = ['Status', 'Summary', 'MedicalReviewerStatus'].includes(key) || 
                      (isVerified && key !== 'MedicalReviewerComments'); // Only allow MedicalReviewerComments for verified records

    return (
      <div key={index}>
        <label className="block text-sm font-medium text-[#14242c] mb-1 flex items-center">
          {key}
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
            isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
          }`}>
            {isReadOnly ? 'Read-only' : 'Editable'}
          </span>
          {isVerified && key !== 'MedicalReviewerComments' && !['Status', 'Summary', 'MedicalReviewerStatus'].includes(key) && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Verified - Locked
            </span>
          )}
        </label>
        <textarea
          className={`w-full p-2 border rounded-md min-h-[${isCommentField ? '120px' : '60px'}] ${
            isReadOnly ? 'border-gray-300 bg-gray-50 opacity-80' : 
            isCommentField ? 'border-[#1483b9] focus:outline-none focus:ring-2 focus:ring-[#1483b9]' :
            'border-[#1a4e6a] bg-[#1a4e6a] bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-[#1483b9]'
          }`}
          value={value || ''}
          onChange={(e) => !isReadOnly && handleFormChange(key, e.target.value)}
          readOnly={isReadOnly}
        />
      </div>
    );
  })}
                    
                </div>
              </div>
            </div>

<div className="border-t border-gray-200 p-5 bg-gray-50 rounded-b-lg">
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-grow">
      <h4 className="font-medium text-[#14242c] mb-3 text-sm">Record Status</h4>
      <div className="flex flex-wrap gap-2">
        {formData['Status'] === 'Verified' ? (
          <div className="px-3 py-2 text-sm rounded-md flex items-center bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle size={14} className="mr-2" />
            Verified Record - Only Medical Reviewer Comments can be edited
          </div>
        ) : (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to verify this entry? This action cannot be undone.')) {
                handleFormChange('Status', 'Verified');
                handleFormChange('MedicalReviewerStatus', 'Verified');
              }
            }}
            disabled={formData['Status'] === 'Verified'}
            className="px-3 py-2 text-sm rounded-md flex items-center bg-green-500 text-white hover:bg-green-600 hover:shadow-md transition-all duration-300"
          >
            <CheckCircle size={14} className="mr-2" />
            Verify
          </button>
        )}

        {formData['Status'] && (
          <div className="flex items-center ml-auto md:ml-2 px-3 py-2 text-sm bg-gray-100 rounded-md">
            <span className="mr-2 text-gray-500">Current:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              formData['Status'] === 'Verified' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'
            }`}>
              {formData['Status']}
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="flex space-x-3 items-center md:border-l md:pl-4 pt-3 md:border-t-0 mt-3 md:mt-0">
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
            {formData['Status'] === 'Verified' ? 'Save Comments' : 'Save Changes'}
          </>
        )}
      </button>
    </div>
  </div>
</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalReviewContent;