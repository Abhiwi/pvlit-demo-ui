// // // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // // import * as XLSX from 'xlsx';
// // // // // // // // // // // // import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft } from 'lucide-react';

// // // // // // // // // // // // const LiteratureReview = () => {
// // // // // // // // // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // // // // // // // // //   const [selectedExcelData, setSelectedExcelData] = useState(null);
// // // // // // // // // // // //   const [editedExcelData, setEditedExcelData] = useState(null);
// // // // // // // // // // // //   const [selectedFileName, setSelectedFileName] = useState('');
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // // // // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // // // // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // // // // // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // // // // // // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');

// // // // // // // // // // // //   const itemsPerPage = 10;

// // // // // // // // // // // //   const excelDateToJSDate = (serial) => {
// // // // // // // // // // // //     const utc_days = Math.floor(serial - 25569);
// // // // // // // // // // // //     const utc_value = utc_days * 86400;
// // // // // // // // // // // //     const date_info = new Date(utc_value * 1000);
// // // // // // // // // // // //     return date_info.toISOString().split("T")[0];
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const fetchExcelFiles = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const filenames = ['final.xlsx' , 'finalcopy.xlsx'];
// // // // // // // // // // // //       const results = [];

// // // // // // // // // // // //       for (const file of filenames) {
// // // // // // // // // // // //         const res = await fetch(`/history_outputs/${file}`);
// // // // // // // // // // // //         const arrayBuffer = await res.arrayBuffer();
// // // // // // // // // // // //         const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });

// // // // // // // // // // // //         const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
// // // // // // // // // // // //         const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: "-" });

// // // // // // // // // // // //         const formattedData = jsonData.map(row => {
// // // // // // // // // // // //           const newRow = { ...row };
// // // // // // // // // // // //           if (typeof newRow['Validation Processing Date'] === 'number') {
// // // // // // // // // // // //             newRow['Validation Processing Date'] = excelDateToJSDate(newRow['Validation Processing Date']);
// // // // // // // // // // // //           }
// // // // // // // // // // // //           if (typeof newRow['Article Publication date'] === 'number') {
// // // // // // // // // // // //             newRow['Article Publication date'] = excelDateToJSDate(newRow['Article Publication date']);
// // // // // // // // // // // //           }
// // // // // // // // // // // //           return newRow;
// // // // // // // // // // // //         });

// // // // // // // // // // // //         const firstRow = formattedData[0] || {};

// // // // // // // // // // // //         results.push({
// // // // // // // // // // // //           filename: file,
// // // // // // // // // // // //           date: firstRow['Validation Processing Date'] || "-",
// // // // // // // // // // // //           Mail: firstRow['Mail'] || "-",
// // // // // // // // // // // //           fullData: formattedData,
// // // // // // // // // // // //         });
// // // // // // // // // // // //       }

// // // // // // // // // // // //       setLiteratureData(results);
// // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       console.error("Error reading excel files:", err);
// // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     fetchExcelFiles();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   const handleViewExcel = (fileData, filename) => {
// // // // // // // // // // // //     setSelectedExcelData(fileData);
// // // // // // // // // // // //     setEditedExcelData(fileData);
// // // // // // // // // // // //     setSelectedFileName(filename);
// // // // // // // // // // // //     setEditMode(false);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // // // // // // // // //     const newData = [...editedExcelData];
// // // // // // // // // // // //     newData[rowIndex][key] = value;
// // // // // // // // // // // //     setEditedExcelData(newData);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleSave = () => {
// // // // // // // // // // // //     const ws = XLSX.utils.json_to_sheet(editedExcelData);
// // // // // // // // // // // //     const wb = XLSX.utils.book_new();
// // // // // // // // // // // //     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
// // // // // // // // // // // //     XLSX.writeFile(wb, selectedFileName);
// // // // // // // // // // // //     setEditMode(false);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const closeExcelViewer = () => {
// // // // // // // // // // // //     setSelectedExcelData(null);
// // // // // // // // // // // //     setEditedExcelData(null);
// // // // // // // // // // // //     setSelectedFileName('');
// // // // // // // // // // // //     setEditMode(false);
// // // // // // // // // // // //     setFocusedCell({ row: null, col: null });
// // // // // // // // // // // //     setFocusedCellValue('');
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const filteredData = literatureData.filter(item =>
// // // // // // // // // // // //     item.date.toString().includes(searchTerm) ||
// // // // // // // // // // // //     item.Mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // // // // // // //     item.filename.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // // // // // // // //   );

// // // // // // // // // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="min-h-screen bg-white p-8">
// // // // // // // // // // // //       {!selectedExcelData ? (
// // // // // // // // // // // //         <>
// // // // // // // // // // // //           <div className="mb-8">
// // // // // // // // // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // // // // // // // // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // // // // // // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // // // // // // // // //             <input
// // // // // // // // // // // //               type="text"
// // // // // // // // // // // //               placeholder="Search by date, eMail or filename..."
// // // // // // // // // // // //               className="bg-transparent border-none outline-none w-full"
// // // // // // // // // // // //               value={searchTerm}
// // // // // // // // // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // // // // //             />
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           {loading ? (
// // // // // // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           ) : (
// // // // // // // // // // // //             <>
// // // // // // // // // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // // // // // // // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // // // // // // // // // //                   <thead className="bg-[#15212d] text-white">
// // // // // // // // // // // //                     <tr>
// // // // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // // // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Results</th>
// // // // // // // // // // // //                     </tr>
// // // // // // // // // // // //                   </thead>
// // // // // // // // // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // // // // // //                     {currentItems.map((item, idx) => (
// // // // // // // // // // // //                       <tr key={idx} className="hover:bg-gray-50">
// // // // // // // // // // // //                         <td className="px-6 py-4 text-sm">{item.date}</td>
// // // // // // // // // // // //                         <td className="px-6 py-4 text-sm">{item.Mail}</td>
// // // // // // // // // // // //                         <td className="px-6 py-4 text-sm">
// // // // // // // // // // // //                           <button
// // // // // // // // // // // //                             onClick={() => handleViewExcel(item.fullData, item.filename)}
// // // // // // // // // // // //                             className="flex items-center text-blue-600 hover:text-blue-900"
// // // // // // // // // // // //                           >
// // // // // // // // // // // //                             <Eye size={16} className="mr-1" /> View
// // // // // // // // // // // //                           </button>
// // // // // // // // // // // //                         </td>
// // // // // // // // // // // //                       </tr>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                   </tbody>
// // // // // // // // // // // //                 </table>
// // // // // // // // // // // //               </div>

// // // // // // // // // // // //               {filteredData.length > itemsPerPage && (
// // // // // // // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // // // // // // //                     Showing {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <div className="flex space-x-1">
// // // // // // // // // // // //                     <button
// // // // // // // // // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // // // // // // // // //                       disabled={currentPage === 1}
// // // // // // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                       <ChevronLeft size={16} />
// // // // // // // // // // // //                     </button>
// // // // // // // // // // // //                     {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
// // // // // // // // // // // //                       <button
// // // // // // // // // // // //                         key={i}
// // // // // // // // // // // //                         onClick={() => setCurrentPage(i + 1)}
// // // // // // // // // // // //                         className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // // // // // // //                       >
// // // // // // // // // // // //                         {i + 1}
// // // // // // // // // // // //                       </button>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                     <button
// // // // // // // // // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // // // // // // // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                       <ChevronRight size={16} />
// // // // // // // // // // // //                     </button>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               )}
// // // // // // // // // // // //             </>
// // // // // // // // // // // //           )}
// // // // // // // // // // // //         </>
// // // // // // // // // // // //       ) : (
// // // // // // // // // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // // // // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // // // // // // //             <div className="flex space-x-2">
// // // // // // // // // // // //               <button onClick={closeExcelViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // // // // // // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // // // // // // // // //               </button>
// // // // // // // // // // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // // // // // // // // //                 <Edit size={16} className="mr-1" /> Edit
// // // // // // // // // // // //               </button>
// // // // // // // // // // // //               {editMode && (
// // // // // // // // // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // // // // // // // // //                   <Save size={16} className="mr-1" /> Save
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               )}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <h3 className="text-xl font-medium text-[#15212d]">{selectedFileName}</h3>
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           {editMode && focusedCell.row !== null && (
// // // // // // // // // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // // // // // // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // // // // // // // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedExcelData[0])[focusedCell.col]}"
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //               <textarea
// // // // // // // // // // // //                 className="w-full h-24 p-2 border rounded-md"
// // // // // // // // // // // //                 value={focusedCellValue}
// // // // // // // // // // // //                 onChange={(e) => {
// // // // // // // // // // // //                   setFocusedCellValue(e.target.value);
// // // // // // // // // // // //                   handleCellChange(focusedCell.row, Object.keys(editedExcelData[0])[focusedCell.col], e.target.value);
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //               />
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           )}

// // // // // // // // // // // //           <div className="overflow-auto max-h-[70vh]">
// // // // // // // // // // // //             <table className="min-w-full border border-gray-300 text-sm">
// // // // // // // // // // // //               <thead className="bg-gray-100">
// // // // // // // // // // // //                 <tr>
// // // // // // // // // // // //                   {Object.keys(editedExcelData[0] || {}).map((col, idx) => (
// // // // // // // // // // // //                     <th key={idx} className="border px-4 py-2 text-left font-medium">
// // // // // // // // // // // //                       {col}
// // // // // // // // // // // //                     </th>
// // // // // // // // // // // //                   ))}
// // // // // // // // // // // //                 </tr>
// // // // // // // // // // // //               </thead>
// // // // // // // // // // // //               <tbody>
// // // // // // // // // // // //                 {editedExcelData.map((row, rowIndex) => (
// // // // // // // // // // // //                   <tr key={rowIndex} className="hover:bg-gray-50">
// // // // // // // // // // // //                     {Object.entries(row).map(([key, val], colIndex) => (
// // // // // // // // // // // //                       <td key={colIndex} className="border px-4 py-1">
// // // // // // // // // // // //                         {editMode ? (
// // // // // // // // // // // //                           <input
// // // // // // // // // // // //                             className="w-full border p-1"
// // // // // // // // // // // //                             value={val}
// // // // // // // // // // // //                             onFocus={() => {
// // // // // // // // // // // //                               setFocusedCell({ row: rowIndex, col: colIndex });
// // // // // // // // // // // //                               setFocusedCellValue(val);
// // // // // // // // // // // //                             }}
// // // // // // // // // // // //                             onChange={(e) => {
// // // // // // // // // // // //                               handleCellChange(rowIndex, key, e.target.value);
// // // // // // // // // // // //                               if (focusedCell.row === rowIndex && focusedCell.col === colIndex) {
// // // // // // // // // // // //                                 setFocusedCellValue(e.target.value);
// // // // // // // // // // // //                               }
// // // // // // // // // // // //                             }}
// // // // // // // // // // // //                           />
// // // // // // // // // // // //                         ) : (
// // // // // // // // // // // //                           val
// // // // // // // // // // // //                         )}
// // // // // // // // // // // //                       </td>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                   </tr>
// // // // // // // // // // // //                 ))}
// // // // // // // // // // // //               </tbody>
// // // // // // // // // // // //             </table>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default LiteratureReview;
// // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft, X } from 'lucide-react';
// // // // // // // // // // // import DatabaseService from '../services/DatabaseService';

// // // // // // // // // // // const LiteratureReview = () => {
// // // // // // // // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // // // // // // // //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// // // // // // // // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // // // // // // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // // // // // // // // //   const [selectedEMail, setSelectedEMail] = useState(null);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // // // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // // // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // // // // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // // // // // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // // // // // // // //   const [expandedCell, setExpandedCell] = useState(null);

// // // // // // // // // // //   const itemsPerPage = 10;

// // // // // // // // // // //   // Fetch data from database
// // // // // // // // // // //   const fetchLiteratureData = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // // // // // // // // //       // Debug: Check the structure of the first item
// // // // // // // // // // //       if (data.length > 0) {
// // // // // // // // // // //         console.log("First item fields:", Object.keys(data[0]));
// // // // // // // // // // //         console.log("First item sample:", data[0]);
// // // // // // // // // // //       }
      
// // // // // // // // // // //       setLiteratureData(data);
      
// // // // // // // // // // //       // Process data to get unique eMails
// // // // // // // // // // //       const eMailMap = new Map();
// // // // // // // // // // //       data.forEach(item => {
// // // // // // // // // // //         if (item.Mail && !eMailMap.has(item.Mail)) {
// // // // // // // // // // //           // Find the date field (whatever it's called)
// // // // // // // // // // //           const dateFieldName = Object.keys(item).find(key => 
// // // // // // // // // // //             key.toLowerCase().includes('date') && 
// // // // // // // // // // //             key.toLowerCase().includes('validation')
// // // // // // // // // // //           );
          
// // // // // // // // // // //           const dateValue = dateFieldName ? item[dateFieldName] : null;
// // // // // // // // // // //           console.log(`EMail: ${item.Mail}, Date field name: ${dateFieldName}, Value: ${dateValue}`);
          
// // // // // // // // // // //           // Store the first occurrence with the correctly named field
// // // // // // // // // // //           const uniqueItem = {
// // // // // // // // // // //             id: item.id,
// // // // // // // // // // //             mail: item.mail,
// // // // // // // // // // //             title: item.title,
// // // // // // // // // // //             Drug: item.Drug
// // // // // // // // // // //           };
          
// // // // // // // // // // //           // Add the date using the actual field name from the data
// // // // // // // // // // //           if (dateFieldName) {
// // // // // // // // // // //             uniqueItem[dateFieldName] = dateValue;
// // // // // // // // // // //           }
          
// // // // // // // // // // //           emailMap.set(item.mail, uniqueItem);
// // // // // // // // // // //         }
// // // // // // // // // // //       });
      
// // // // // // // // // // //       const uniqueEmails = Array.from(emailMap.values());
// // // // // // // // // // //       console.log("Unique emails with dates:", uniqueEmails.slice(0, 2));
// // // // // // // // // // //       setUniqueEmailData(uniqueEmails);
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error("Error fetching literature review data:", err);
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     fetchLiteratureData();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const handleViewReview = async (email) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       setLoading(true);
// // // // // // // // // // //       // Filter all entries with the selected email
// // // // // // // // // // //       const emailRelatedData = literatureData.filter(item => item.mail === email);
// // // // // // // // // // //       console.log("View data for email:", email, emailRelatedData[0]);
      
// // // // // // // // // // //       setSelectedReviewData(emailRelatedData);
// // // // // // // // // // //       setEditedReviewData(emailRelatedData);
// // // // // // // // // // //       setSelectedEmail(email);
// // // // // // // // // // //       setEditMode(false);
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error(`Error fetching review data for email ${email}:`, err);
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // // // // // // // //     const newData = [...editedReviewData];
// // // // // // // // // // //     newData[rowIndex][key] = value;
// // // // // // // // // // //     setEditedReviewData(newData);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleSave = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       setLoading(true);
// // // // // // // // // // //       // Save each modified row
// // // // // // // // // // //       for (const row of editedReviewData) {
// // // // // // // // // // //         await DatabaseService.updateLiteratureReview(row.id, row);
// // // // // // // // // // //       }
// // // // // // // // // // //       setEditMode(false);
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //       // Refresh the data after saving
// // // // // // // // // // //       fetchLiteratureData();
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error("Error saving changes:", err);
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const closeReviewViewer = () => {
// // // // // // // // // // //     setSelectedReviewData(null);
// // // // // // // // // // //     setEditedReviewData(null);
// // // // // // // // // // //     setSelectedEmail(null);
// // // // // // // // // // //     setEditMode(false);
// // // // // // // // // // //     setFocusedCell({ row: null, col: null });
// // // // // // // // // // //     setFocusedCellValue('');
// // // // // // // // // // //     setExpandedCell(null);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // // // // // // // // //     if (!editMode) {
// // // // // // // // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const closeExpandedCell = () => {
// // // // // // // // // // //     setExpandedCell(null);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Improved format dates function with better error handling
// // // // // // // // // // //   const formatDate = (dateString) => {
// // // // // // // // // // //     if (!dateString) {
// // // // // // // // // // //       return "-";
// // // // // // // // // // //     }
    
// // // // // // // // // // //     try {
// // // // // // // // // // //       const date = new Date(dateString);
      
// // // // // // // // // // //       // Check if date is valid
// // // // // // // // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // // // // // // // //         return date.toISOString().split('T')[0];
// // // // // // // // // // //       } else {
// // // // // // // // // // //         // Try to handle it as a string if it contains date-like parts
// // // // // // // // // // //         if (typeof dateString === 'string' && dateString.includes('-')) {
// // // // // // // // // // //           // Simple handling for "YYYY-MM-DD" format
// // // // // // // // // // //           const parts = dateString.split('-');
// // // // // // // // // // //           if (parts.length === 3) {
// // // // // // // // // // //             return dateString.substring(0, 10); // Just take first 10 chars if it looks like a date
// // // // // // // // // // //           }
// // // // // // // // // // //         }
// // // // // // // // // // //         return dateString || "-";
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (e) {
// // // // // // // // // // //       console.error("Error parsing date:", e, dateString);
// // // // // // // // // // //       return dateString || "-";
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Function to find any date field in an object
// // // // // // // // // // //   const findDateField = (item) => {
// // // // // // // // // // //     if (!item) return null;
    
// // // // // // // // // // //     // Look for any key containing both "validation" and "date" in any case
// // // // // // // // // // //     const dateKey = Object.keys(item).find(key => 
// // // // // // // // // // //       key.toLowerCase().includes('validation') && 
// // // // // // // // // // //       key.toLowerCase().includes('date')
// // // // // // // // // // //     );
    
// // // // // // // // // // //     return dateKey ? item[dateKey] : null;
// // // // // // // // // // //   };

// // // // // // // // // // //   const filteredData = uniqueEmailData.filter(item => {
// // // // // // // // // // //     const searchLower = searchTerm.toLowerCase();
// // // // // // // // // // //     const dateValue = findDateField(item);
    
// // // // // // // // // // //     return (
// // // // // // // // // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // // // // // // // // //       (item.mail && item.mail.toLowerCase().includes(searchLower)) ||
// // // // // // // // // // //       (item.title && item.title.toLowerCase().includes(searchLower)) ||
// // // // // // // // // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower))
// // // // // // // // // // //     );
// // // // // // // // // // //   });

// // // // // // // // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// // // // // // // // // // //   // Helper function to truncate text
// // // // // // // // // // //   const truncateText = (text, maxLength = 30) => {
// // // // // // // // // // //     if (!text) return "";
// // // // // // // // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="min-h-screen bg-white p-8">
// // // // // // // // // // //       {!selectedReviewData ? (
// // // // // // // // // // //         <>
// // // // // // // // // // //           <div className="mb-8">
// // // // // // // // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // // // // // // // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // // // // // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // // // // // // // //             <input
// // // // // // // // // // //               type="text"
// // // // // // // // // // //               placeholder="Search by date, email, title or Drug..."
// // // // // // // // // // //               className="bg-transparent border-none outline-none w-full"
// // // // // // // // // // //               value={searchTerm}
// // // // // // // // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // // // //             />
// // // // // // // // // // //           </div>

// // // // // // // // // // //           {loading ? (
// // // // // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ) : (
// // // // // // // // // // //             <>
// // // // // // // // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // // // // // // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // // // // // // // // //                   <thead className="bg-[#15212d] text-white">
// // // // // // // // // // //                     <tr>
// // // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Email</th>
// // // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // // // // // // // // //                     </tr>
// // // // // // // // // // //                   </thead>
// // // // // // // // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // // // // //                     {currentItems.map((item, idx) => {
// // // // // // // // // // //                       const dateValue = findDateField(item);
// // // // // // // // // // //                       return (
// // // // // // // // // // //                         <tr key={idx} className="hover:bg-gray-50">
// // // // // // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // // // // // //                             {formatDate(dateValue)}
// // // // // // // // // // //                           </td>
// // // // // // // // // // //                           <td className="px-6 py-4 text-sm">{item.mail || "-"}</td>
// // // // // // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.title) || "-"}</td>
// // // // // // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // // // // // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // // // // // //                             <button
// // // // // // // // // // //                               onClick={() => handleViewReview(item.mail)}
// // // // // // // // // // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // // // // // // // // // //                             >
// // // // // // // // // // //                               <Eye size={16} className="mr-1" /> View
// // // // // // // // // // //                             </button>
// // // // // // // // // // //                           </td>
// // // // // // // // // // //                         </tr>
// // // // // // // // // // //                       );
// // // // // // // // // // //                     })}
// // // // // // // // // // //                   </tbody>
// // // // // // // // // // //                 </table>
// // // // // // // // // // //               </div>

// // // // // // // // // // //               {filteredData.length > itemsPerPage && (
// // // // // // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // // // // // //                     Showing {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                   <div className="flex space-x-1">
// // // // // // // // // // //                     <button
// // // // // // // // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // // // // // // // //                       disabled={currentPage === 1}
// // // // // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // // // // //                     >
// // // // // // // // // // //                       <ChevronLeft size={16} />
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                     {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
// // // // // // // // // // //                       <button
// // // // // // // // // // //                         key={i}
// // // // // // // // // // //                         onClick={() => setCurrentPage(i + 1)}
// // // // // // // // // // //                         className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // // // // // //                       >
// // // // // // // // // // //                         {i + 1}
// // // // // // // // // // //                       </button>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                     <button
// // // // // // // // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // // // // // // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // // // // //                     >
// // // // // // // // // // //                       <ChevronRight size={16} />
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </>
// // // // // // // // // // //           )}
// // // // // // // // // // //         </>
// // // // // // // // // // //       ) : (
// // // // // // // // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // // // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // // // // // //             <div className="flex space-x-2">
// // // // // // // // // // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // // // // // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // // // // // // // //               </button>
// // // // // // // // // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // // // // // // // //                 <Edit size={16} className="mr-1" /> Edit
// // // // // // // // // // //               </button>
// // // // // // // // // // //               {editMode && (
// // // // // // // // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // // // // // // // //                   <Save size={16} className="mr-1" /> Save
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEmail}</h3>
// // // // // // // // // // //           </div>

// // // // // // // // // // //           {editMode && focusedCell.row !== null && (
// // // // // // // // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // // // // // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // // // // // // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <textarea
// // // // // // // // // // //                 className="w-full h-24 p-2 border rounded-md"
// // // // // // // // // // //                 value={focusedCellValue}
// // // // // // // // // // //                 onChange={(e) => {
// // // // // // // // // // //                   setFocusedCellValue(e.target.value);
// // // // // // // // // // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // // // // // // // // // //                 }}
// // // // // // // // // // //               />
// // // // // // // // // // //             </div>
// // // // // // // // // // //           )}

// // // // // // // // // // //           {expandedCell && (
// // // // // // // // // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // // // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // // // // // // // //                 <div className="flex justify-between items-center mb-4">
// // // // // // // // // // //                   <h3 className="text-lg font-medium">
// // // // // // // // // // //                     {editedReviewData[expandedCell.row] && 
// // // // // // // // // // //                      Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // // // // // // // // // //                   </h3>
// // // // // // // // // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // // // // // // // //                     <X size={20} />
// // // // // // // // // // //                   </button>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // // // // // // // //                   {expandedCell.value || ""}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           )}

// // // // // // // // // // //           {loading ? (
// // // // // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ) : (
// // // // // // // // // // //             <div className="overflow-auto max-h-[75vh]">
// // // // // // // // // // //               <table className="w-full border border-gray-300 text-sm table-fixed">
// // // // // // // // // // //                 <thead className="bg-gray-100 sticky top-0">
// // // // // // // // // // //                   <tr>
// // // // // // // // // // //                     {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // // // // // // // // // //                       <th key={idx} className="border px-2 py-2 text-left font-medium text-xs" style={{ width: '150px' }}>
// // // // // // // // // // //                         {col}
// // // // // // // // // // //                       </th>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                   </tr>
// // // // // // // // // // //                 </thead>
// // // // // // // // // // //                 <tbody>
// // // // // // // // // // //                   {editedReviewData && editedReviewData.map((row, rowIndex) => (
// // // // // // // // // // //                     <tr key={rowIndex} className="hover:bg-gray-50">
// // // // // // // // // // //                       {Object.entries(row).map(([key, val], colIndex) => (
// // // // // // // // // // //                         <td 
// // // // // // // // // // //                           key={colIndex} 
// // // // // // // // // // //                           className="border px-2 py-1 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // // // // // // // //                           onClick={() => handleCellClick(rowIndex, colIndex, val)}
// // // // // // // // // // //                           title="Click to view full content"
// // // // // // // // // // //                         >
// // // // // // // // // // //                           {editMode ? (
// // // // // // // // // // //                             <input
// // // // // // // // // // //                               className="w-full border p-1 text-xs"
// // // // // // // // // // //                               value={val || ''}
// // // // // // // // // // //                               onFocus={() => {
// // // // // // // // // // //                                 setFocusedCell({ row: rowIndex, col: colIndex });
// // // // // // // // // // //                                 setFocusedCellValue(val || '');
// // // // // // // // // // //                               }}
// // // // // // // // // // //                               onChange={(e) => {
// // // // // // // // // // //                                 handleCellChange(rowIndex, key, e.target.value);
// // // // // // // // // // //                                 if (focusedCell.row === rowIndex && focusedCell.col === colIndex) {
// // // // // // // // // // //                                   setFocusedCellValue(e.target.value);
// // // // // // // // // // //                                 }
// // // // // // // // // // //                               }}
// // // // // // // // // // //                             />
// // // // // // // // // // //                           ) : (
// // // // // // // // // // //                             truncateText(val, 20) || ''
// // // // // // // // // // //                           )}
// // // // // // // // // // //                         </td>
// // // // // // // // // // //                       ))}
// // // // // // // // // // //                     </tr>
// // // // // // // // // // //                   ))}
// // // // // // // // // // //                 </tbody>
// // // // // // // // // // //               </table>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           )}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default LiteratureReview;
// // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // import { BookOpen, LogIn } from 'lucide-react';
// // // // // // // // // // import LiteratureReviewContent from './LiteratureReviewContent';

// // // // // // // // // // const LiteratureReview = () => {
// // // // // // // // // //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// // // // // // // // // //   const [loginData, setLoginData] = useState({
// // // // // // // // // //     name: '',
// // // // // // // // // //     email: '',
// // // // // // // // // //     password: ''
// // // // // // // // // //   });
// // // // // // // // // //   const [error, setError] = useState('');

// // // // // // // // // //   const handleInputChange = (e) => {
// // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // //     setLoginData(prev => ({
// // // // // // // // // //       ...prev,
// // // // // // // // // //       [name]: value
// // // // // // // // // //     }));
// // // // // // // // // //     // Clear error when user starts typing again
// // // // // // // // // //     if (error) setError('');
// // // // // // // // // //   };

// // // // // // // // // //   const handleLogin = (e) => {
// // // // // // // // // //     e.preventDefault();
    
// // // // // // // // // //     // Basic validation
// // // // // // // // // //     if (!loginData.name || !loginData.email || !loginData.password) {
// // // // // // // // // //       setError('All fields are required');
// // // // // // // // // //       return;
// // // // // // // // // //     }
    
// // // // // // // // // //     // Email format validation
// // // // // // // // // //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // // // // // // // // //     if (!emailRegex.test(loginData.email)) {
// // // // // // // // // //       setError('Please enter a valid email address');
// // // // // // // // // //       return;
// // // // // // // // // //     }
    
// // // // // // // // // //     // Check the password - replace "deepforrest123" with your actual password
// // // // // // // // // //     if (loginData.password === "deepforrest123") {
// // // // // // // // // //       setIsAuthenticated(true);
// // // // // // // // // //     } else {
// // // // // // // // // //       setError('Invalid password');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   if (isAuthenticated) {
// // // // // // // // // //     // Import the actual LiteratureReview component content
// // // // // // // // // //     return <LiteratureReviewContent />;
// // // // // // // // // //   }

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8">
// // // // // // // // // //       <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
// // // // // // // // // //         <div className="bg-[#15212d] text-white p-6 flex items-center justify-center">
// // // // // // // // // //           <BookOpen size={28} className="mr-3" />
// // // // // // // // // //           <h2 className="text-2xl font-bold">Literature Review</h2>
// // // // // // // // // //         </div>
        
// // // // // // // // // //         <form onSubmit={handleLogin} className="p-8">
// // // // // // // // // //           {error && (
// // // // // // // // // //             <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
// // // // // // // // // //               {error}
// // // // // // // // // //             </div>
// // // // // // // // // //           )}
          
// // // // // // // // // //           <div className="mb-4">
// // // // // // // // // //             <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
// // // // // // // // // //               Name
// // // // // // // // // //             </label>
// // // // // // // // // //             <input
// // // // // // // // // //               type="text"
// // // // // // // // // //               id="name"
// // // // // // // // // //               name="name"
// // // // // // // // // //               value={loginData.name}
// // // // // // // // // //               onChange={handleInputChange}
// // // // // // // // // //               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // // // // // // // //               placeholder="Enter your name"
// // // // // // // // // //             />
// // // // // // // // // //           </div>
          
// // // // // // // // // //           <div className="mb-4">
// // // // // // // // // //             <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
// // // // // // // // // //               Email
// // // // // // // // // //             </label>
// // // // // // // // // //             <input
// // // // // // // // // //               type="email"
// // // // // // // // // //               id="email"
// // // // // // // // // //               name="email"
// // // // // // // // // //               value={loginData.email}
// // // // // // // // // //               onChange={handleInputChange}
// // // // // // // // // //               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // // // // // // // //               placeholder="you@example.com"
// // // // // // // // // //             />
// // // // // // // // // //           </div>
          
// // // // // // // // // //           <div className="mb-6">
// // // // // // // // // //             <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
// // // // // // // // // //               Password
// // // // // // // // // //             </label>
// // // // // // // // // //             <input
// // // // // // // // // //               type="password"
// // // // // // // // // //               id="password"
// // // // // // // // // //               name="password"
// // // // // // // // // //               value={loginData.password}
// // // // // // // // // //               onChange={handleInputChange}
// // // // // // // // // //               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // // // // // // // //               placeholder="Enter password"
// // // // // // // // // //             />
// // // // // // // // // //           </div>
          
// // // // // // // // // //           <button
// // // // // // // // // //             type="submit"
// // // // // // // // // //             className="w-full bg-[#15212d] text-white py-2 px-4 rounded-md hover:bg-[#1e2b3a] flex items-center justify-center"
// // // // // // // // // //           >
// // // // // // // // // //             <LogIn size={18} className="mr-2" />
// // // // // // // // // //             Access Literature Review
// // // // // // // // // //           </button>
// // // // // // // // // //         </form>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default LiteratureReview;
// // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';
// // // // // // // // // import DatabaseService from '../services/DatabaseService';
// // // // // // // // // import axios from 'axios';

// // // // // // // // // const LiteratureReviewContent = () => {
// // // // // // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // // // // // //   const [uniqueEmailData, setUniqueEmailData] = useState([]);
// // // // // // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // // // // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // // // // // // //   const [selectedEmail, setSelectedEmail] = useState(null);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // // // // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // // // // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // // // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // // // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // // // // // //   const [modifiedRows, setModifiedRows] = useState({});
// // // // // // // // //   const [statusUpdating, setStatusUpdating] = useState(null); // Track which row is updating status

// // // // // // // // //   const itemsPerPage = 10;

// // // // // // // // //   // Fetch data from database
// // // // // // // // //   const fetchLiteratureData = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // // // // // // //       // Debug: Check the structure of the first item
// // // // // // // // //       if (data.length > 0) {
// // // // // // // // //         console.log("First item fields:", Object.keys(data[0]));
// // // // // // // // //         console.log("First item sample:", data[0]);
// // // // // // // // //       }
      
// // // // // // // // //       setLiteratureData(data);
      
// // // // // // // // //       // Process data to get unique emails
// // // // // // // // //       const emailMap = new Map();
// // // // // // // // //       data.forEach(item => {
// // // // // // // // //         if (item.mail && !emailMap.has(item.mail)) {
// // // // // // // // //           // Find the date field (whatever it's called)
// // // // // // // // //           const dateFieldName = Object.keys(item).find(key => 
// // // // // // // // //             key.toLowerCase().includes('date') && 
// // // // // // // // //             key.toLowerCase().includes('validation')
// // // // // // // // //           );
          
// // // // // // // // //           const dateValue = dateFieldName ? item[dateFieldName] : null;
// // // // // // // // //           console.log(`Email: ${item.mail}, Date field name: ${dateFieldName}, Value: ${dateValue}`);
          
// // // // // // // // //           // Store the first occurrence with the correctly named field
// // // // // // // // //           const uniqueItem = {
// // // // // // // // //             id: item.id,
// // // // // // // // //             mail: item.mail,
// // // // // // // // //             title: item.title,
// // // // // // // // //             Drug: item.Drug
// // // // // // // // //           };
          
// // // // // // // // //           // Add the date using the actual field name from the data
// // // // // // // // //           if (dateFieldName) {
// // // // // // // // //             uniqueItem[dateFieldName] = dateValue;
// // // // // // // // //           }
          
// // // // // // // // //           emailMap.set(item.mail, uniqueItem);
// // // // // // // // //         }
// // // // // // // // //       });
      
// // // // // // // // //       const uniqueEmails = Array.from(emailMap.values());
// // // // // // // // //       console.log("Unique emails with dates:", uniqueEmails.slice(0, 2));
// // // // // // // // //       setUniqueEmailData(uniqueEmails);
// // // // // // // // //       setLoading(false);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error("Error fetching literature review data:", err);
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchLiteratureData();
// // // // // // // // //   }, []);

// // // // // // // // //   const handleViewReview = async (email) => {
// // // // // // // // //     try {
// // // // // // // // //       setLoading(true);
// // // // // // // // //       // Filter all entries with the selected email
// // // // // // // // //       const emailRelatedData = literatureData.filter(item => item.mail === email);
// // // // // // // // //       console.log("View data for email:", email, emailRelatedData[0]);
      
// // // // // // // // //       // Make sure each item has an id
// // // // // // // // //       emailRelatedData.forEach(item => {
// // // // // // // // //         if (!item.id) {
// // // // // // // // //           console.error("Item missing ID:", item);
// // // // // // // // //         }
// // // // // // // // //       });
      
// // // // // // // // //       setSelectedReviewData(emailRelatedData);
// // // // // // // // //       setEditedReviewData(emailRelatedData);
// // // // // // // // //       setSelectedEmail(email);
// // // // // // // // //       setEditMode(false);
// // // // // // // // //       setDetailCurrentPage(1); // Reset to first page when viewing details
// // // // // // // // //       setLoading(false);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error(`Error fetching review data for email ${email}:`, err);
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // // // // // //     const newData = [...editedReviewData];
// // // // // // // // //     const oldValue = newData[rowIndex][key];
// // // // // // // // //     newData[rowIndex][key] = value;
// // // // // // // // //     setEditedReviewData(newData);
    
// // // // // // // // //     // Track this row as modified
// // // // // // // // //     if (oldValue !== value) {
// // // // // // // // //       setModifiedRows(prev => ({
// // // // // // // // //         ...prev,
// // // // // // // // //         [rowIndex]: true
// // // // // // // // //       }));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // New function to handle immediate status updates
// // // // // // // // //   const handleStatusUpdate = async (rowIndex, status) => {
// // // // // // // // //     try {
// // // // // // // // //       // Get the actual record ID (Article PMID)
// // // // // // // // //       const row = editedReviewData[rowIndex];
// // // // // // // // //       const recordId = row['Article PMID'];
      
// // // // // // // // //       if (!recordId) {
// // // // // // // // //         console.error("Row missing Article PMID:", row);
// // // // // // // // //         alert("Cannot update status: missing Article PMID identifier");
// // // // // // // // //         return;
// // // // // // // // //       }
      
// // // // // // // // //       // Set status updating indicator for this row
// // // // // // // // //       setStatusUpdating(rowIndex);
      
// // // // // // // // //       // Update the status field locally first (optimistic update)
// // // // // // // // //       const newData = [...editedReviewData];
// // // // // // // // //       newData[rowIndex]['Status'] = status;
// // // // // // // // //       setEditedReviewData(newData);
      
// // // // // // // // //       // Send the update to the server
// // // // // // // // //       console.log(`Updating status for Article PMID ${recordId} to "${status}"`);
// // // // // // // // //       await DatabaseService.updateRecordStatus(recordId, status);
      
// // // // // // // // //       // If this row was marked as modified, keep it that way
// // // // // // // // //       // (this prevents losing other unsaved changes)
      
// // // // // // // // //       // Show feedback
// // // // // // // // //       alert(`Status updated to "${status}" successfully`);
      
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error("Error updating status:", err);
// // // // // // // // //       alert(`Failed to update status: ${err.message}`);
      
// // // // // // // // //       // Revert the optimistic update if it failed
// // // // // // // // //       if (selectedReviewData) {
// // // // // // // // //         setEditedReviewData([...selectedReviewData]);
// // // // // // // // //       }
// // // // // // // // //     } finally {
// // // // // // // // //       setStatusUpdating(null);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSave = async () => {
// // // // // // // // //     try {
// // // // // // // // //       setLoading(true);
// // // // // // // // //       let successCount = 0;
// // // // // // // // //       let errorCount = 0;
      
// // // // // // // // //       console.log("Modified rows:", Object.keys(modifiedRows));
      
// // // // // // // // //       // Only save rows that were modified
// // // // // // // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // // // // // // //         const rowIndex = parseInt(rowIndexStr);
// // // // // // // // //         const row = editedReviewData[rowIndex];
        
// // // // // // // // //         // Use Article PMID as the ID
// // // // // // // // //         const recordId = row['Article PMID'];
        
// // // // // // // // //         if (!recordId) {
// // // // // // // // //           console.error("Row missing Article PMID:", row);
// // // // // // // // //           errorCount++;
// // // // // // // // //           continue; // Skip rows without Article PMID
// // // // // // // // //         }
        
// // // // // // // // //         try {
// // // // // // // // //           console.log(`Saving modified row with Article PMID ${recordId}:`, row);
// // // // // // // // //           const result = await DatabaseService.updateLiteratureReview(recordId, row);
// // // // // // // // //           console.log(`Save result for Article PMID ${recordId}:`, result);
// // // // // // // // //           successCount++;
// // // // // // // // //         } catch (rowErr) {
// // // // // // // // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // // // // // // // //           errorCount++;
// // // // // // // // //         }
// // // // // // // // //       }
      
// // // // // // // // //       setEditMode(false);
// // // // // // // // //       setLoading(false);
// // // // // // // // //       setModifiedRows({}); // Clear modified rows tracking
      
// // // // // // // // //       // Refresh the data after saving to get any server-side changes
// // // // // // // // //       fetchLiteratureData();
      
// // // // // // // // //       // Update the selected review data from the refreshed data
// // // // // // // // //       if (selectedEMail) {
// // // // // // // // //         // Wait a moment for the data to refresh
// // // // // // // // //         setTimeout(() => {
// // // // // // // // //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// // // // // // // // //           setSelectedReviewData(refreshedEMailData);
// // // // // // // // //           setEditedReviewData(refreshedEMailData);
// // // // // // // // //         }, 500);
// // // // // // // // //       }
      
// // // // // // // // //       // Show status message
// // // // // // // // //       if (errorCount > 0) {
// // // // // // // // //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// // // // // // // // //       } else if (successCount > 0) {
// // // // // // // // //         alert(`Successfully saved ${successCount} rows.`);
// // // // // // // // //       } else {
// // // // // // // // //         alert("No changes were made.");
// // // // // // // // //       }
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error("Error in save operation:", err);
// // // // // // // // //       setLoading(false);
// // // // // // // // //       alert(`Error saving changes: ${err.message}`);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const closeReviewViewer = () => {
// // // // // // // // //     setSelectedReviewData(null);
// // // // // // // // //     setEditedReviewData(null);
// // // // // // // // //     setSelectedEMail(null);
// // // // // // // // //     setEditMode(false);
// // // // // // // // //     setFocusedCell({ row: null, col: null });
// // // // // // // // //     setFocusedCellValue('');
// // // // // // // // //     setExpandedCell(null);
// // // // // // // // //   };

// // // // // // // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // // // // // // //     if (!editMode) {
// // // // // // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const closeExpandedCell = () => {
// // // // // // // // //     setExpandedCell(null);
// // // // // // // // //   };

// // // // // // // // //   // Improved format dates function with better error handling
// // // // // // // // //   const formatDate = (dateString) => {
// // // // // // // // //     if (!dateString) {
// // // // // // // // //       return "-";
// // // // // // // // //     }
    
// // // // // // // // //     try {
// // // // // // // // //       const date = new Date(dateString);
      
// // // // // // // // //       // Check if date is valid
// // // // // // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // // // // // //         return date.toISOString().split('T')[0];
// // // // // // // // //       } else {
// // // // // // // // //         // Try to handle it as a string if it contains date-like parts
// // // // // // // // //         if (typeof dateString === 'string' && dateString.includes('-')) {
// // // // // // // // //           // Simple handling for "YYYY-MM-DD" format
// // // // // // // // //           const parts = dateString.split('-');
// // // // // // // // //           if (parts.length === 3) {
// // // // // // // // //             return dateString.substring(0, 10); // Just take first 10 chars if it looks like a date
// // // // // // // // //           }
// // // // // // // // //         }
// // // // // // // // //         return dateString || "-";
// // // // // // // // //       }
// // // // // // // // //     } catch (e) {
// // // // // // // // //       console.error("Error parsing date:", e, dateString);
// // // // // // // // //       return dateString || "-";
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Function to find any date field in an object
// // // // // // // // //   const findDateField = (item) => {
// // // // // // // // //     if (!item) return null;
    
// // // // // // // // //     // Look for any key containing both "validation" and "date" in any case
// // // // // // // // //     const dateKey = Object.keys(item).find(key => 
// // // // // // // // //       key.toLowerCase().includes('validation') && 
// // // // // // // // //       key.toLowerCase().includes('date')
// // // // // // // // //     );
    
// // // // // // // // //     return dateKey ? item[dateKey] : null;
// // // // // // // // //   };

// // // // // // // // //   const filteredData = uniqueEMailData.filter(item => {
// // // // // // // // //     const searchLower = searchTerm.toLowerCase();
// // // // // // // // //     const dateValue = findDateField(item);
    
// // // // // // // // //     return (
// // // // // // // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // // // // // // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // // // // // // // //       (item.title && item.title.toLowerCase().includes(searchLower)) ||
// // // // // // // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower))
// // // // // // // // //     );
// // // // // // // // //   });

// // // // // // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// // // // // // // // //   // Helper function to truncate text
// // // // // // // // //   const truncateText = (text, maxLength = 30) => {
// // // // // // // // //     if (!text) return "";
// // // // // // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // // // // // //   };

// // // // // // // // //   // For detailed view pagination
// // // // // // // // //   const detailCurrentItems = selectedReviewData ? 
// // // // // // // // //     selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage) : 
// // // // // // // // //     [];

// // // // // // // // //   // Function to render status buttons for a row
// // // // // // // // //   // Function to render status buttons for a row
// // // // // // // // // // Function to render status buttons for a row
// // // // // // // // // const renderStatusButtons = (rowIndex) => {
// // // // // // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // // // // // //     const currentStatus = editedReviewData[rowIndex]['Status'];
    
// // // // // // // // //     return (
// // // // // // // // //       <div className="flex space-x-2 items-center">
// // // // // // // // //         {currentStatus && <span className="text-xs mr-2"> <strong>{currentStatus}</strong></span>}
// // // // // // // // //         <button
// // // // // // // // //           onClick={() => {
// // // // // // // // //             if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
// // // // // // // // //               handleStatusUpdate(rowIndex, 'Approved');
// // // // // // // // //             }
// // // // // // // // //           }}
// // // // // // // // //           disabled={isUpdating || currentStatus === 'Approved'}
// // // // // // // // //           className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // // // // //             currentStatus === 'Approved' 
// // // // // // // // //               ? 'bg-green-100 text-green-800' 
// // // // // // // // //               : 'bg-green-500 text-white hover:bg-green-600'
// // // // // // // // //           }`}
// // // // // // // // //         >
// // // // // // // // //           <CheckCircle size={12} className="mr-1" /> Approve
// // // // // // // // //         </button>
// // // // // // // // //         {currentStatus !== 'Approved' && (
// // // // // // // // //           <button
// // // // // // // // //             onClick={() => handleStatusUpdate(rowIndex, 'Checking')}
// // // // // // // // //             disabled={isUpdating || currentStatus === 'Checking'}
// // // // // // // // //             className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // // // // //               currentStatus === 'Checking' 
// // // // // // // // //                 ? 'bg-yellow-100 text-yellow-800' 
// // // // // // // // //                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
// // // // // // // // //             }`}
// // // // // // // // //           >
// // // // // // // // //             <Clock size={12} className="mr-1" /> Checking
// // // // // // // // //           </button>
// // // // // // // // //         )}
// // // // // // // // //         {isUpdating && (
// // // // // // // // //           <span className="text-xs italic text-gray-500">Updating...</span>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   };
// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-white p-8">
// // // // // // // // //       {!selectedReviewData ? (
// // // // // // // // //         <>
// // // // // // // // //           <div className="mb-8">
// // // // // // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // // // // // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // // // // // // //           </div>
// // // // // // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // // // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // // // // // //             <input
// // // // // // // // //               type="text"
// // // // // // // // //               placeholder="Search by date, eMail, title or Drug..."
// // // // // // // // //               className="bg-transparent border-none outline-none w-full"
// // // // // // // // //               value={searchTerm}
// // // // // // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // //             />
// // // // // // // // //           </div>

// // // // // // // // //           {loading ? (
// // // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // // //             </div>
// // // // // // // // //           ) : (
// // // // // // // // //             <>
// // // // // // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // // // // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // // // // // // //                   <thead className="bg-[#15212d] text-white">
// // // // // // // // //                     <tr>
// // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // // // // // // //                     </tr>
// // // // // // // // //                   </thead>
// // // // // // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // // //                     {currentItems.map((item, idx) => {
// // // // // // // // //                       const dateValue = findDateField(item);
// // // // // // // // //                       return (
// // // // // // // // //                         <tr key={idx} className="hover:bg-gray-50">
// // // // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // // // //                             {formatDate(dateValue)}
// // // // // // // // //                           </td>
// // // // // // // // //                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
// // // // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.title) || "-"}</td>
// // // // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // // // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // // // //                             <button
// // // // // // // // //                               onClick={() => handleViewReview(item.Mail)}
// // // // // // // // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // // // // // // // //                             >
// // // // // // // // //                               <Eye size={16} className="mr-1" /> View
// // // // // // // // //                             </button>
// // // // // // // // //                           </td>
// // // // // // // // //                         </tr>
// // // // // // // // //                       );
// // // // // // // // //                     })}
// // // // // // // // //                   </tbody>
// // // // // // // // //                 </table>
// // // // // // // // //               </div>

// // // // // // // // //               {filteredData.length > itemsPerPage && (
// // // // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // // // //                     Showing {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="flex space-x-1">
// // // // // // // // //                     <button
// // // // // // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // // // // // //                       disabled={currentPage === 1}
// // // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // // //                     >
// // // // // // // // //                       <ChevronLeft size={16} />
// // // // // // // // //                     </button>
// // // // // // // // //                     {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
// // // // // // // // //                       <button
// // // // // // // // //                         key={i}
// // // // // // // // //                         onClick={() => setCurrentPage(i + 1)}
// // // // // // // // //                         className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // // // //                       >
// // // // // // // // //                         {i + 1}
// // // // // // // // //                       </button>
// // // // // // // // //                     ))}
// // // // // // // // //                     <button
// // // // // // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // // // // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // // //                     >
// // // // // // // // //                       <ChevronRight size={16} />
// // // // // // // // //                     </button>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               )}
// // // // // // // // //             </>
// // // // // // // // //           )}
// // // // // // // // //         </>
// // // // // // // // //       ) : (
// // // // // // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // // // //             <div className="flex space-x-2">
// // // // // // // // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // // // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // // // // // //               </button>
// // // // // // // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // // // // // //                 <Edit size={16} className="mr-1" /> Edit
// // // // // // // // //               </button>
// // // // // // // // //               {editMode && (
// // // // // // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // // // // // //                   <Save size={16} className="mr-1" /> Save
// // // // // // // // //                 </button>
// // // // // // // // //               )}
// // // // // // // // //             </div>
// // // // // // // // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
// // // // // // // // //           </div>

// // // // // // // // //           {editMode && focusedCell.row !== null && (
// // // // // // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // // // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // // // // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // // // // // // // //               </div>
// // // // // // // // //               <textarea
// // // // // // // // //                 className="w-full h-24 p-2 border rounded-md"
// // // // // // // // //                 value={focusedCellValue}
// // // // // // // // //                 onChange={(e) => {
// // // // // // // // //                   setFocusedCellValue(e.target.value);
// // // // // // // // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //             </div>
// // // // // // // // //           )}

// // // // // // // // //           {expandedCell && (
// // // // // // // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // // // // // //                 <div className="flex justify-between items-center mb-4">
// // // // // // // // //                   <h3 className="text-lg font-medium">
// // // // // // // // //                     {editedReviewData[expandedCell.row] && 
// // // // // // // // //                      Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // // // // // // // //                   </h3>
// // // // // // // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // // // // // //                     <X size={20} />
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // // // // // //                   {expandedCell.value || ""}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           )}

// // // // // // // // //           {loading ? (
// // // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // // //             </div>
// // // // // // // // //           ) : (
// // // // // // // // //             <>
// // // // // // // // //               <div className="overflow-auto max-h-[75vh]">
// // // // // // // // //                 <table className="w-full border border-gray-300 text-sm">
// // // // // // // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // // // // // // //                     <tr>
// // // // // // // // //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // // // // // // // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
// // // // // // // // //                           {col}
// // // // // // // // //                         </th>
// // // // // // // // //                       ))}

// // // // // // // // //                     </tr>
// // // // // // // // //                   </thead>
// // // // // // // // //                   <tbody>
// // // // // // // // //   {detailCurrentItems.map((row, rowIndex) => {
// // // // // // // // //     const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// // // // // // // // //     return (
// // // // // // // // //       <tr key={rowIndex} className="hover:bg-gray-50">
// // // // // // // // //         {Object.entries(row).map(([key, val], colIndex) => {
// // // // // // // // //           // Skip rendering the Status column
// // // // // // // // //           if (key === 'Status') return null;
          
// // // // // // // // //           return (
// // // // // // // // //             <td 
// // // // // // // // //               key={colIndex} 
// // // // // // // // //               className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // // // // // //               onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// // // // // // // // //               title="Click to view full content"
// // // // // // // // //               style={{ minWidth: '200px', maxWidth: '300px' }}
// // // // // // // // //             >
// // // // // // // // //               {editMode ? (
// // // // // // // // //                 <input
// // // // // // // // //                   className="w-full border p-2 text-xs"
// // // // // // // // //                   value={val || ''}
// // // // // // // // //                   onFocus={() => {
// // // // // // // // //                     setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // // // // // // //                     setFocusedCellValue(val || '');
// // // // // // // // //                   }}
// // // // // // // // //                   onChange={(e) => {
// // // // // // // // //                     handleCellChange(actualRowIndex, key, e.target.value);
// // // // // // // // //                     if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // // // // // // //                       setFocusedCellValue(e.target.value);
// // // // // // // // //                     }
// // // // // // // // //                   }}
// // // // // // // // //                 />
// // // // // // // // //               ) : (
// // // // // // // // //                 truncateText(val, 25) || ''
// // // // // // // // //               )}
// // // // // // // // //             </td>
// // // // // // // // //           );
// // // // // // // // //         })}
// // // // // // // // //         <td className="border px-4 py-2 text-xs">
// // // // // // // // //           {renderStatusButtons(actualRowIndex)}
// // // // // // // // //         </td>
// // // // // // // // //       </tr>
// // // // // // // // //     );
// // // // // // // // //   })}
// // // // // // // // // </tbody>
// // // // // // // // //                 </table>
// // // // // // // // //               </div>

// // // // // // // // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // // // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // // // //                     Showing {detailCurrentPage} of {Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="flex space-x-1">
// // // // // // // // //                     <button
// // // // // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // // // // // // // //                       disabled={detailCurrentPage === 1}
// // // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // // //                     >
// // // // // // // // //                       <ChevronLeft size={16} />
// // // // // // // // //                     </button>
// // // // // // // // //                     {Array.from({ length: Math.ceil(selectedReviewData.length / itemsPerPage) }, (_, i) => (
// // // // // // // // //                       <button
// // // // // // // // //                         key={i}
// // // // // // // // //                         onClick={() => setDetailCurrentPage(i + 1)}
// // // // // // // // //                         className={`px-3 py-1 rounded-md ${detailCurrentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // // // //                       >
// // // // // // // // //                         {i + 1}
// // // // // // // // //                       </button>
// // // // // // // // //                     ))}
// // // // // // // // //                     <button
// // // // // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // // // // // // // //                       disabled={detailCurrentPage === Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // // //                     >
// // // // // // // // //                       <ChevronRight size={16} />
// // // // // // // // //                     </button>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               )}
// // // // // // // // //             </>
// // // // // // // // //           )}
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default LiteratureReviewContent;
// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';
// // // // // // // // import DatabaseService from '../services/DatabaseService';
// // // // // // // // import axios from 'axios';
// // // // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // // // const LiteratureReviewContent = () => {
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // // // // //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// // // // // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // // // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // // // // // //   const [selectedEMail, setSelectedEMail] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // // // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // // // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // // // // //   const [modifiedRows, setModifiedRows] = useState({});
// // // // // // // //   const [statusUpdating, setStatusUpdating] = useState(null); // Track which row is updating status

// // // // // // // //   const itemsPerPage = 10;

// // // // // // // //   // Fetch data from database
// // // // // // // //   const fetchLiteratureData = async () => {
// // // // // // // //     try {
// // // // // // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // // // // // //       // Debug: Check the structure of the first item
// // // // // // // //       if (data.length > 0) {
// // // // // // // //         console.log("First item fields:", Object.keys(data[0]));
// // // // // // // //         console.log("First item sample:", data[0]);
// // // // // // // //       }
      
// // // // // // // //       setLiteratureData(data);
      
// // // // // // // //       // Process data to get unique eMails
// // // // // // // //       const eMailMap = new Map();
// // // // // // // //       data.forEach(item => {
// // // // // // // //         if (item.Mail && !eMailMap.has(item.Mail)) {
// // // // // // // //           // Find the date field (whatever it's called)
// // // // // // // //           const dateFieldName = Object.keys(item).find(key => 
// // // // // // // //             key.toLowerCase().includes('date') && 
// // // // // // // //             key.toLowerCase().includes('validation')
// // // // // // // //           );
          
// // // // // // // //           const dateValue = dateFieldName ? item[dateFieldName] : null;
// // // // // // // //           console.log(`EMail: ${item.Mail}, Date field name: ${dateFieldName}, Value: ${dateValue}`);
          
// // // // // // // //           // Store the first occurrence with the correctly named field
// // // // // // // //           const uniqueItem = {
// // // // // // // //             id: item.id,
// // // // // // // //             Mail: item.Mail,
// // // // // // // //             title: item.title,
// // // // // // // //             Drug: item.Drug
// // // // // // // //           };
          
// // // // // // // //           // Add the date using the actual field name from the data
// // // // // // // //           if (dateFieldName) {
// // // // // // // //             uniqueItem[dateFieldName] = dateValue;
// // // // // // // //           }
          
// // // // // // // //           eMailMap.set(item.Mail, uniqueItem);
// // // // // // // //         }
// // // // // // // //       });
      
// // // // // // // //       const uniqueEMails = Array.from(eMailMap.values());
// // // // // // // //       console.log("Unique eMails with dates:", uniqueEMails.slice(0, 2));
// // // // // // // //       setUniqueEMailData(uniqueEMails);
// // // // // // // //       setLoading(false);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("Error fetching literature review data:", err);
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchLiteratureData();
// // // // // // // //   }, []);

// // // // // // // //   // Modified to navigate to cases page with eMail as search parameter
// // // // // // // //   const handleViewReview = (eMail) => {
// // // // // // // //     console.log("Navigating to cases with eMail:", eMail); // Add this for debugging
// // // // // // // //     navigate(`/cases?search=${encodeURIComponent(eMail)}`);
// // // // // // // //   };

// // // // // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // // // // //     const newData = [...editedReviewData];
// // // // // // // //     const oldValue = newData[rowIndex][key];
// // // // // // // //     newData[rowIndex][key] = value;
// // // // // // // //     setEditedReviewData(newData);
    
// // // // // // // //     // Track this row as modified
// // // // // // // //     if (oldValue !== value) {
// // // // // // // //       setModifiedRows(prev => ({
// // // // // // // //         ...prev,
// // // // // // // //         [rowIndex]: true
// // // // // // // //       }));
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // New function to handle immediate status updates
// // // // // // // //   const handleStatusUpdate = async (rowIndex, status) => {
// // // // // // // //     try {
// // // // // // // //       // Get the actual record ID (Article PMID)
// // // // // // // //       const row = editedReviewData[rowIndex];
// // // // // // // //       const recordId = row['Article PMID'];
      
// // // // // // // //       if (!recordId) {
// // // // // // // //         console.error("Row missing Article PMID:", row);
// // // // // // // //         alert("Cannot update status: missing Article PMID identifier");
// // // // // // // //         return;
// // // // // // // //       }
      
// // // // // // // //       // Set status updating indicator for this row
// // // // // // // //       setStatusUpdating(rowIndex);
      
// // // // // // // //       // Update the status field locally first (optimistic update)
// // // // // // // //       const newData = [...editedReviewData];
// // // // // // // //       newData[rowIndex]['Status'] = status;
// // // // // // // //       setEditedReviewData(newData);
      
// // // // // // // //       // Send the update to the server
// // // // // // // //       console.log(`Updating status for Article PMID ${recordId} to "${status}"`);
// // // // // // // //       await DatabaseService.updateRecordStatus(recordId, status);
      
// // // // // // // //       // If this row was marked as modified, keep it that way
// // // // // // // //       // (this prevents losing other unsaved changes)
      
// // // // // // // //       // Show feedback
// // // // // // // //       alert(`Status updated to "${status}" successfully`);
      
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("Error updating status:", err);
// // // // // // // //       alert(`Failed to update status: ${err.message}`);
      
// // // // // // // //       // Revert the optimistic update if it failed
// // // // // // // //       if (selectedReviewData) {
// // // // // // // //         setEditedReviewData([...selectedReviewData]);
// // // // // // // //       }
// // // // // // // //     } finally {
// // // // // // // //       setStatusUpdating(null);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSave = async () => {
// // // // // // // //     try {
// // // // // // // //       setLoading(true);
// // // // // // // //       let successCount = 0;
// // // // // // // //       let errorCount = 0;
      
// // // // // // // //       console.log("Modified rows:", Object.keys(modifiedRows));
      
// // // // // // // //       // Only save rows that were modified
// // // // // // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // // // // // //         const rowIndex = parseInt(rowIndexStr);
// // // // // // // //         const row = editedReviewData[rowIndex];
        
// // // // // // // //         // Use Article PMID as the ID
// // // // // // // //         const recordId = row['Article PMID'];
        
// // // // // // // //         if (!recordId) {
// // // // // // // //           console.error("Row missing Article PMID:", row);
// // // // // // // //           errorCount++;
// // // // // // // //           continue; // Skip rows without Article PMID
// // // // // // // //         }
        
// // // // // // // //         try {
// // // // // // // //           console.log(`Saving modified row with Article PMID ${recordId}:`, row);
// // // // // // // //           const result = await DatabaseService.updateLiteratureReview(recordId, row);
// // // // // // // //           console.log(`Save result for Article PMID ${recordId}:`, result);
// // // // // // // //           successCount++;
// // // // // // // //         } catch (rowErr) {
// // // // // // // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // // // // // // //           errorCount++;
// // // // // // // //         }
// // // // // // // //       }
      
// // // // // // // //       setEditMode(false);
// // // // // // // //       setLoading(false);
// // // // // // // //       setModifiedRows({}); // Clear modified rows tracking
      
// // // // // // // //       // Refresh the data after saving
// // // // // // // //       fetchLiteratureData();
      
// // // // // // // //       // Update the selected review data from the refreshed data
// // // // // // // //       if (selectedEMail) {
// // // // // // // //         // Wait a moment for the data to refresh
// // // // // // // //         setTimeout(() => {
// // // // // // // //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// // // // // // // //           setSelectedReviewData(refreshedEMailData);
// // // // // // // //           setEditedReviewData(refreshedEMailData);
// // // // // // // //         }, 500);
// // // // // // // //       }
      
// // // // // // // //       // Show status message
// // // // // // // //       if (errorCount > 0) {
// // // // // // // //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// // // // // // // //       } else if (successCount > 0) {
// // // // // // // //         alert(`Successfully saved ${successCount} rows.`);
// // // // // // // //       } else {
// // // // // // // //         alert("No changes were made.");
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("Error in save operation:", err);
// // // // // // // //       setLoading(false);
// // // // // // // //       alert(`Error saving changes: ${err.message}`);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const closeReviewViewer = () => {
// // // // // // // //     setSelectedReviewData(null);
// // // // // // // //     setEditedReviewData(null);
// // // // // // // //     setSelectedEMail(null);
// // // // // // // //     setEditMode(false);
// // // // // // // //     setFocusedCell({ row: null, col: null });
// // // // // // // //     setFocusedCellValue('');
// // // // // // // //     setExpandedCell(null);
// // // // // // // //   };

// // // // // // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // // // // // //     if (!editMode) {
// // // // // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const closeExpandedCell = () => {
// // // // // // // //     setExpandedCell(null);
// // // // // // // //   };

// // // // // // // //   // Improved format dates function with better error handling
// // // // // // // //   const formatDate = (dateString) => {
// // // // // // // //     if (!dateString) {
// // // // // // // //       return "-";
// // // // // // // //     }
    
// // // // // // // //     try {
// // // // // // // //       const date = new Date(dateString);
      
// // // // // // // //       // Check if date is valid
// // // // // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // // // // //         return date.toISOString().split('T')[0];
// // // // // // // //       } else {
// // // // // // // //         // Try to handle it as a string if it contains date-like parts
// // // // // // // //         if (typeof dateString === 'string' && dateString.includes('-')) {
// // // // // // // //           // Simple handling for "YYYY-MM-DD" format
// // // // // // // //           const parts = dateString.split('-');
// // // // // // // //           if (parts.length === 3) {
// // // // // // // //             return dateString.substring(0, 10); // Just take first 10 chars if it looks like a date
// // // // // // // //           }
// // // // // // // //         }
// // // // // // // //         return dateString || "-";
// // // // // // // //       }
// // // // // // // //     } catch (e) {
// // // // // // // //       console.error("Error parsing date:", e, dateString);
// // // // // // // //       return dateString || "-";
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Function to find any date field in an object
// // // // // // // //   const findDateField = (item) => {
// // // // // // // //     if (!item) return null;
    
// // // // // // // //     // Look for any key containing both "validation" and "date" in any case
// // // // // // // //     const dateKey = Object.keys(item).find(key => 
// // // // // // // //       key.toLowerCase().includes('validation') && 
// // // // // // // //       key.toLowerCase().includes('date')
// // // // // // // //     );
    
// // // // // // // //     return dateKey ? item[dateKey] : null;
// // // // // // // //   };

// // // // // // // //   const filteredData = uniqueEMailData.filter(item => {
// // // // // // // //     const searchLower = searchTerm.toLowerCase();
// // // // // // // //     const dateValue = findDateField(item);
    
// // // // // // // //     return (
// // // // // // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // // // // // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // // // // // // //       (item.title && item.title.toLowerCase().includes(searchLower)) ||
// // // // // // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower))
// // // // // // // //     );
// // // // // // // //   });

// // // // // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// // // // // // // //   // Helper function to truncate text
// // // // // // // //   const truncateText = (text, maxLength = 30) => {
// // // // // // // //     if (!text) return "";
// // // // // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // // // // //   };

// // // // // // // //   // For detailed view pagination
// // // // // // // //   const detailCurrentItems = selectedReviewData ? 
// // // // // // // //     selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage) : 
// // // // // // // //     [];

// // // // // // // //   // Function to render status buttons for a row
// // // // // // // //   const renderStatusButtons = (rowIndex) => {
// // // // // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // // // // //     const currentStatus = editedReviewData[rowIndex]['Status'];
    
// // // // // // // //     return (
// // // // // // // //       <div className="flex space-x-2 items-center">
// // // // // // // //         {currentStatus && <span className="text-xs mr-2"> <strong>{currentStatus}</strong></span>}
// // // // // // // //         <button
// // // // // // // //           onClick={() => {
// // // // // // // //             if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
// // // // // // // //               handleStatusUpdate(rowIndex, 'Approved');
// // // // // // // //             }
// // // // // // // //           }}
// // // // // // // //           disabled={isUpdating || currentStatus === 'Approved'}
// // // // // // // //           className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // // // //             currentStatus === 'Approved' 
// // // // // // // //               ? 'bg-green-100 text-green-800' 
// // // // // // // //               : 'bg-green-500 text-white hover:bg-green-600'
// // // // // // // //           }`}
// // // // // // // //         >
// // // // // // // //           <CheckCircle size={12} className="mr-1" /> Approve
// // // // // // // //         </button>
// // // // // // // //         {currentStatus !== 'Approved' && (
// // // // // // // //           <button
// // // // // // // //             onClick={() => handleStatusUpdate(rowIndex, 'Checking')}
// // // // // // // //             disabled={isUpdating || currentStatus === 'Checking'}
// // // // // // // //             className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // // // //               currentStatus === 'Checking' 
// // // // // // // //                 ? 'bg-yellow-100 text-yellow-800' 
// // // // // // // //                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
// // // // // // // //             }`}
// // // // // // // //           >
// // // // // // // //             <Clock size={12} className="mr-1" /> Checking
// // // // // // // //           </button>
// // // // // // // //         )}
// // // // // // // //         {isUpdating && (
// // // // // // // //           <span className="text-xs italic text-gray-500">Updating...</span>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   };
  
// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-white p-8">
// // // // // // // //       {!selectedReviewData ? (
// // // // // // // //         <>
// // // // // // // //           <div className="mb-8">
// // // // // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // // // // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // // // // // //           </div>
// // // // // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               placeholder="Search by date, eMail, title or Drug..."
// // // // // // // //               className="bg-transparent border-none outline-none w-full"
// // // // // // // //               value={searchTerm}
// // // // // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // //             />
// // // // // // // //           </div>

// // // // // // // //           {loading ? (
// // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // //             </div>
// // // // // // // //           ) : (
// // // // // // // //             <>
// // // // // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // // // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // // // // // //                   <thead className="bg-[#15212d] text-white">
// // // // // // // //                     <tr>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // // // // // //                     </tr>
// // // // // // // //                   </thead>
// // // // // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // //                     {currentItems.map((item, idx) => {
// // // // // // // //                       const dateValue = findDateField(item);
// // // // // // // //                       // Store the current item's eMail for the onClick handler
// // // // // // // //                       const itemEMail = item.Mail;
                      
// // // // // // // //                       return (
// // // // // // // //                         <tr key={idx} className="hover:bg-gray-50">
// // // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // // //                             {formatDate(dateValue)}
// // // // // // // //                           </td>
// // // // // // // //                           <td className="px-6 py-4 text-sm">{itemEMail || "-"}</td>
// // // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.title) || "-"}</td>
// // // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // // //                             {/* Create a new function in the onClick to capture the current itemEMail */}
// // // // // // // //                             <button
// // // // // // // //                               onClick={() => {
// // // // // // // //                                 console.log(`Clicked View for eMail: ${itemEMail}`);
// // // // // // // //                                 handleViewReview(itemEMail);
// // // // // // // //                               }}
// // // // // // // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // // // // // // //                             >
// // // // // // // //                               <Eye size={16} className="mr-1" /> View
// // // // // // // //                             </button>
// // // // // // // //                           </td>
// // // // // // // //                         </tr>
// // // // // // // //                       );
// // // // // // // //                     })}
// // // // // // // //                   </tbody>
// // // // // // // //                 </table>
// // // // // // // //               </div>

// // // // // // // //               {filteredData.length > itemsPerPage && (
// // // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // // //                     Showing {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // //                   </div>
// // // // // // // //                   <div className="flex space-x-1">
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // // // // //                       disabled={currentPage === 1}
// // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // //                     >
// // // // // // // //                       <ChevronLeft size={16} />
// // // // // // // //                     </button>
// // // // // // // //                     {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
// // // // // // // //                       <button
// // // // // // // //                         key={i}
// // // // // // // //                         onClick={() => setCurrentPage(i + 1)}
// // // // // // // //                         className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // // //                       >
// // // // // // // //                         {i + 1}
// // // // // // // //                       </button>
// // // // // // // //                     ))}
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // // // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // //                     >
// // // // // // // //                       <ChevronRight size={16} />
// // // // // // // //                     </button>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </>
// // // // // // // //           )}
// // // // // // // //         </>
// // // // // // // //       ) : (
// // // // // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // // //             <div className="flex space-x-2">
// // // // // // // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // // // // //               </button>
// // // // // // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // // // // //                 <Edit size={16} className="mr-1" /> Edit
// // // // // // // //               </button>
// // // // // // // //               {editMode && (
// // // // // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // // // // //                   <Save size={16} className="mr-1" /> Save
// // // // // // // //                 </button>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
// // // // // // // //           </div>

// // // // // // // //           {editMode && focusedCell.row !== null && (
// // // // // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // // // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // // // // // // //               </div>
// // // // // // // //               <textarea
// // // // // // // //                 className="w-full h-24 p-2 border rounded-md"
// // // // // // // //                 value={focusedCellValue}
// // // // // // // //                 onChange={(e) => {
// // // // // // // //                   setFocusedCellValue(e.target.value);
// // // // // // // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // // // // // // //                 }}
// // // // // // // //               />
// // // // // // // //             </div>
// // // // // // // //           )}

// // // // // // // //           {expandedCell && (
// // // // // // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // // // // //                 <div className="flex justify-between items-center mb-4">
// // // // // // // //                   <h3 className="text-lg font-medium">
// // // // // // // //                     {editedReviewData[expandedCell.row] && 
// // // // // // // //                      Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // // // // // // //                   </h3>
// // // // // // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // // // // //                     <X size={20} />
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // // // // //                   {expandedCell.value || ""}
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           )}

// // // // // // // //           {loading ? (
// // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // //             </div>
// // // // // // // //           ) : (
// // // // // // // //             <>
// // // // // // // //               <div className="overflow-auto max-h-[75vh]">
// // // // // // // //                 <table className="w-full border border-gray-300 text-sm">
// // // // // // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // // // // // //                     <tr>
// // // // // // // //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // // // // // // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
// // // // // // // //                           {col}
// // // // // // // //                         </th>
// // // // // // // //                       ))}
// // // // // // // //                     </tr>
// // // // // // // //                   </thead>
// // // // // // // //                   <tbody>
// // // // // // // //                     {detailCurrentItems.map((row, rowIndex) => {
// // // // // // // //                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// // // // // // // //                       return (
// // // // // // // //                         <tr key={rowIndex} className="hover:bg-gray-50">
// // // // // // // //                           {Object.entries(row).map(([key, val], colIndex) => {
// // // // // // // //                             // Skip rendering the Status column
// // // // // // // //                             if (key === 'Status') return null;
                            
// // // // // // // //                             return (
// // // // // // // //                               <td 
// // // // // // // //                                 key={colIndex} 
// // // // // // // //                                 className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // // // // //                                 onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// // // // // // // //                                 title="Click to view full content"
// // // // // // // //                                 style={{ minWidth: '200px', maxWidth: '300px' }}
// // // // // // // //                               >
// // // // // // // //                                 {editMode ? (
// // // // // // // //                                   <input
// // // // // // // //                                     className="w-full border p-2 text-xs"
// // // // // // // //                                     value={val || ''}
// // // // // // // //                                     onFocus={() => {
// // // // // // // //                                       setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // // // // // //                                       setFocusedCellValue(val || '');
// // // // // // // //                                     }}
// // // // // // // //                                     onChange={(e) => {
// // // // // // // //                                       handleCellChange(actualRowIndex, key, e.target.value);
// // // // // // // //                                       if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // // // // // //                                         setFocusedCellValue(e.target.value);
// // // // // // // //                                       }
// // // // // // // //                                     }}
// // // // // // // //                                   />
// // // // // // // //                                 ) : (
// // // // // // // //                                   truncateText(val, 25) || ''
// // // // // // // //                                 )}
// // // // // // // //                               </td>
// // // // // // // //                             );
// // // // // // // //                           })}
// // // // // // // //                           <td className="border px-4 py-2 text-xs">
// // // // // // // //                             {renderStatusButtons(actualRowIndex)}
// // // // // // // //                           </td>
// // // // // // // //                         </tr>
// // // // // // // //                       );
// // // // // // // //                     })}
// // // // // // // //                   </tbody>
// // // // // // // //                 </table>
// // // // // // // //               </div>

// // // // // // // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // // //                     Showing {detailCurrentPage} of {Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // // // // //                   </div>
// // // // // // // //                   <div className="flex space-x-1">
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // // // // // // //                       disabled={detailCurrentPage === 1}
// // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // //                     >
// // // // // // // //                       <ChevronLeft size={16} />
// // // // // // // //                     </button>
// // // // // // // //                     {Array.from({ length: Math.ceil(selectedReviewData.length / itemsPerPage) }, (_, i) => (
// // // // // // // //                       <button
// // // // // // // //                         key={i}
// // // // // // // //                         onClick={() => setDetailCurrentPage(i + 1)}
// // // // // // // //                         className={`px-3 py-1 rounded-md ${detailCurrentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // // //                       >
// // // // // // // //                         {i + 1}
// // // // // // // //                       </button>
// // // // // // // //                     ))}
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // // // // // // //                       disabled={detailCurrentPage === Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // //                     >
// // // // // // // //                       <ChevronRight size={16} />
// // // // // // // //                     </button>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default LiteratureReviewContent;
// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';
// // // // // // // // import DatabaseService from '../services/DatabaseService';
// // // // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // // // const LiteratureReviewContent = () => {
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // // // // //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// // // // // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // // // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // // // // // //   const [selectedEMail, setSelectedEMail] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // // // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // // // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // // // // //   const [modifiedRows, setModifiedRows] = useState({});
// // // // // // // //   const [statusUpdating, setStatusUpdating] = useState(null); // Track which row is updating status

// // // // // // // //   const itemsPerPage = 10;

// // // // // // // //   // Fetch data from database
// // // // // // // //   const fetchLiteratureData = async () => {
// // // // // // // //     try {
// // // // // // // //       const data = await DatabaseService.fetchLiteratureReviews();
      
// // // // // // // //       // Debug: Check the structure of the first item
// // // // // // // //       if (data.length > 0) {
// // // // // // // //         console.log("First item fields:", Object.keys(data[0]));
// // // // // // // //         console.log("First item sample:", data[0]);
// // // // // // // //       }
      
// // // // // // // //       setLiteratureData(data);
      
// // // // // // // //       // Process data to get unique eMails
// // // // // // // //       const eMailMap = new Map();
// // // // // // // //       data.forEach(item => {
// // // // // // // //         if (item.Mail && !eMailMap.has(item.Mail)) {
// // // // // // // //           // Find the date field (whatever it's called)
// // // // // // // //           const dateFieldName = Object.keys(item).find(key => 
// // // // // // // //             key.toLowerCase().includes('date') && 
// // // // // // // //             key.toLowerCase().includes('validation')
// // // // // // // //           );
          
// // // // // // // //           const dateValue = dateFieldName ? item[dateFieldName] : null;
// // // // // // // //           console.log(`EMail: ${item.Mail}, Date field name: ${dateFieldName}, Value: ${dateValue}`);
          
// // // // // // // //           // Store the first occurrence with the correctly named field
// // // // // // // //           const uniqueItem = {
// // // // // // // //             id: item.id,
// // // // // // // //             Mail: item.Mail,
// // // // // // // //             Title: item.Title,
// // // // // // // //             Drug: item.Drug
// // // // // // // //           };
          
// // // // // // // //           // Add the date using the actual field name from the data
// // // // // // // //           if (dateFieldName) {
// // // // // // // //             uniqueItem[dateFieldName] = dateValue;
// // // // // // // //           }
          
// // // // // // // //           eMailMap.set(item.Mail, uniqueItem);
// // // // // // // //         }
// // // // // // // //       });
      
// // // // // // // //       const uniqueEMails = Array.from(eMailMap.values());
// // // // // // // //       console.log("Unique eMails with dates:", uniqueEMails.slice(0, 2));
// // // // // // // //       setUniqueEMailData(uniqueEMails);
// // // // // // // //       setLoading(false);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("Error fetching literature review data:", err);
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchLiteratureData();
// // // // // // // //   }, []);

// // // // // // // //   // Modified to navigate to Cases page with eMail search term
// // // // // // // //   const handleViewReview = (eMail) => {
// // // // // // // //     console.log("Navigating to Cases page with eMail search:", eMail);
// // // // // // // //     // Navigate to Cases page with eMail search parameter
// // // // // // // //     navigate('/cases', { state: { searchTerm: eMail } });
// // // // // // // //   };

// // // // // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // // // // //     const newData = [...editedReviewData];
// // // // // // // //     const oldValue = newData[rowIndex][key];
// // // // // // // //     newData[rowIndex][key] = value;
// // // // // // // //     setEditedReviewData(newData);
    
// // // // // // // //     // Track this row as modified
// // // // // // // //     if (oldValue !== value) {
// // // // // // // //       setModifiedRows(prev => ({
// // // // // // // //         ...prev,
// // // // // // // //         [rowIndex]: true
// // // // // // // //       }));
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // New function to handle immediate status updates
// // // // // // // //   const handleStatusUpdate = async (rowIndex, status) => {
// // // // // // // //     try {
// // // // // // // //       // Get the actual record ID (Article PMID)
// // // // // // // //       const row = editedReviewData[rowIndex];
// // // // // // // //       const recordId = row['Article PMID'];
      
// // // // // // // //       if (!recordId) {
// // // // // // // //         console.error("Row missing Article PMID:", row);
// // // // // // // //         alert("Cannot update status: missing Article PMID identifier");
// // // // // // // //         return;
// // // // // // // //       }
      
// // // // // // // //       // Set status updating indicator for this row
// // // // // // // //       setStatusUpdating(rowIndex);
      
// // // // // // // //       // Update the status field locally first (optimistic update)
// // // // // // // //       const newData = [...editedReviewData];
// // // // // // // //       newData[rowIndex]['Status'] = status;
// // // // // // // //       setEditedReviewData(newData);
      
// // // // // // // //       // Send the update to the server
// // // // // // // //       console.log(`Updating status for Article PMID ${recordId} to "${status}"`);
// // // // // // // //       await DatabaseService.updateRecordStatus(recordId, status);
      
// // // // // // // //       // If this row was marked as modified, keep it that way
// // // // // // // //       // (this prevents losing other unsaved changes)
      
// // // // // // // //       // Show feedback
// // // // // // // //       alert(`Status updated to "${status}" successfully`);
      
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("Error updating status:", err);
// // // // // // // //       alert(`Failed to update status: ${err.message}`);
      
// // // // // // // //       // Revert the optimistic update if it failed
// // // // // // // //       if (selectedReviewData) {
// // // // // // // //         setEditedReviewData([...selectedReviewData]);
// // // // // // // //       }
// // // // // // // //     } finally {
// // // // // // // //       setStatusUpdating(null);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSave = async () => {
// // // // // // // //     try {
// // // // // // // //       setLoading(true);
// // // // // // // //       let successCount = 0;
// // // // // // // //       let errorCount = 0;
      
// // // // // // // //       console.log("Modified rows:", Object.keys(modifiedRows));
      
// // // // // // // //       // Only save rows that were modified
// // // // // // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // // // // // //         const rowIndex = parseInt(rowIndexStr);
// // // // // // // //         const row = editedReviewData[rowIndex];
        
// // // // // // // //         // Use Article PMID as the ID
// // // // // // // //         const recordId = row['Article PMID'];
        
// // // // // // // //         if (!recordId) {
// // // // // // // //           console.error("Row missing Article PMID:", row);
// // // // // // // //           errorCount++;
// // // // // // // //           continue; // Skip rows without Article PMID
// // // // // // // //         }
        
// // // // // // // //         try {
// // // // // // // //           console.log(`Saving modified row with Article PMID ${recordId}:`, row);
// // // // // // // //           const result = await DatabaseService.updateLiteratureReview(recordId, row);
// // // // // // // //           console.log(`Save result for Article PMID ${recordId}:`, result);
// // // // // // // //           successCount++;
// // // // // // // //         } catch (rowErr) {
// // // // // // // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // // // // // // //           errorCount++;
// // // // // // // //         }
// // // // // // // //       }
      
// // // // // // // //       setEditMode(false);
// // // // // // // //       setLoading(false);
// // // // // // // //       setModifiedRows({}); // Clear modified rows tracking
      
// // // // // // // //       // Refresh the data after saving to get any server-side changes
// // // // // // // //       fetchLiteratureData();
      
// // // // // // // //       // Update the selected review data from the refreshed data
// // // // // // // //       if (selectedEMail) {
// // // // // // // //         // Wait a moment for the data to refresh
// // // // // // // //         setTimeout(() => {
// // // // // // // //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// // // // // // // //           setSelectedReviewData(refreshedEMailData);
// // // // // // // //           setEditedReviewData(refreshedEMailData);
// // // // // // // //         }, 500);
// // // // // // // //       }
      
// // // // // // // //       // Show status message
// // // // // // // //       if (errorCount > 0) {
// // // // // // // //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// // // // // // // //       } else if (successCount > 0) {
// // // // // // // //         alert(`Successfully saved ${successCount} rows.`);
// // // // // // // //       } else {
// // // // // // // //         alert("No changes were made.");
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("Error in save operation:", err);
// // // // // // // //       setLoading(false);
// // // // // // // //       alert(`Error saving changes: ${err.message}`);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const closeReviewViewer = () => {
// // // // // // // //     setSelectedReviewData(null);
// // // // // // // //     setEditedReviewData(null);
// // // // // // // //     setSelectedEMail(null);
// // // // // // // //     setEditMode(false);
// // // // // // // //     setFocusedCell({ row: null, col: null });
// // // // // // // //     setFocusedCellValue('');
// // // // // // // //     setExpandedCell(null);
// // // // // // // //   };

// // // // // // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // // // // // //     if (!editMode) {
// // // // // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const closeExpandedCell = () => {
// // // // // // // //     setExpandedCell(null);
// // // // // // // //   };

// // // // // // // //   // Improved format dates function with better error handling
// // // // // // // //   const formatDate = (dateString) => {
// // // // // // // //     if (!dateString) {
// // // // // // // //       return "-";
// // // // // // // //     }
    
// // // // // // // //     try {
// // // // // // // //       const date = new Date(dateString);
      
// // // // // // // //       // Check if date is valid
// // // // // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // // // // //         return date.toISOString().split('T')[0];
// // // // // // // //       } else {
// // // // // // // //         // Try to handle it as a string if it contains date-like parts
// // // // // // // //         if (typeof dateString === 'string' && dateString.includes('-')) {
// // // // // // // //           // Simple handling for "YYYY-MM-DD" format
// // // // // // // //           const parts = dateString.split('-');
// // // // // // // //           if (parts.length === 3) {
// // // // // // // //             return dateString.substring(0, 10); // Just take first 10 chars if it looks like a date
// // // // // // // //           }
// // // // // // // //         }
// // // // // // // //         return dateString || "-";
// // // // // // // //       }
// // // // // // // //     } catch (e) {
// // // // // // // //       console.error("Error parsing date:", e, dateString);
// // // // // // // //       return dateString || "-";
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Function to find any date field in an object
// // // // // // // //   const findDateField = (item) => {
// // // // // // // //     if (!item) return null;
    
// // // // // // // //     // Look for any key containing both "validation" and "date" in any case
// // // // // // // //     const dateKey = Object.keys(item).find(key => 
// // // // // // // //       key.toLowerCase().includes('validation') && 
// // // // // // // //       key.toLowerCase().includes('date')
// // // // // // // //     );
    
// // // // // // // //     return dateKey ? item[dateKey] : null;
// // // // // // // //   };

// // // // // // // //   const filteredData = uniqueEMailData.filter(item => {
// // // // // // // //     const searchLower = searchTerm.toLowerCase();
// // // // // // // //     const dateValue = findDateField(item);
    
// // // // // // // //     return (
// // // // // // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // // // // // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // // // // // // //       (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
// // // // // // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower))
// // // // // // // //     );
// // // // // // // //   });

// // // // // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// // // // // // // //   // Helper function to truncate text
// // // // // // // //   const truncateText = (text, maxLength = 30) => {
// // // // // // // //     if (!text) return "";
// // // // // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // // // // //   };

// // // // // // // //   // For detailed view pagination
// // // // // // // //   const detailCurrentItems = selectedReviewData ? 
// // // // // // // //     selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage) : 
// // // // // // // //     [];

// // // // // // // //   // Function to render status buttons for a row
// // // // // // // //   const renderStatusButtons = (rowIndex) => {
// // // // // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // // // // //     const currentStatus = editedReviewData[rowIndex]['Status'];
    
// // // // // // // //     return (
// // // // // // // //       <div className="flex space-x-2 items-center">
// // // // // // // //         {currentStatus && <span className="text-xs mr-2"> <strong>{currentStatus}</strong></span>}
// // // // // // // //         <button
// // // // // // // //           onClick={() => {
// // // // // // // //             if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
// // // // // // // //               handleStatusUpdate(rowIndex, 'Approved');
// // // // // // // //             }
// // // // // // // //           }}
// // // // // // // //           disabled={isUpdating || currentStatus === 'Approved'}
// // // // // // // //           className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // // // //             currentStatus === 'Approved' 
// // // // // // // //               ? 'bg-green-100 text-green-800' 
// // // // // // // //               : 'bg-green-500 text-white hover:bg-green-600'
// // // // // // // //           }`}
// // // // // // // //         >
// // // // // // // //           <CheckCircle size={12} className="mr-1" /> Approve
// // // // // // // //         </button>
// // // // // // // //         {currentStatus !== 'Approved' && (
// // // // // // // //           <button
// // // // // // // //             onClick={() => handleStatusUpdate(rowIndex, 'Checking')}
// // // // // // // //             disabled={isUpdating || currentStatus === 'Checking'}
// // // // // // // //             className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // // // //               currentStatus === 'Checking' 
// // // // // // // //                 ? 'bg-yellow-100 text-yellow-800' 
// // // // // // // //                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
// // // // // // // //             }`}
// // // // // // // //           >
// // // // // // // //             <Clock size={12} className="mr-1" /> Checking
// // // // // // // //           </button>
// // // // // // // //         )}
// // // // // // // //         {isUpdating && (
// // // // // // // //           <span className="text-xs italic text-gray-500">Updating...</span>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-white p-8">
// // // // // // // //       {!selectedReviewData ? (
// // // // // // // //         <>
// // // // // // // //           <div className="mb-8">
// // // // // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // // // // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // // // // // //           </div>
// // // // // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               placeholder="Search by date, Mail, Title or Drug..."
// // // // // // // //               className="bg-transparent border-none outline-none w-full"
// // // // // // // //               value={searchTerm}
// // // // // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // //             />
// // // // // // // //           </div>

// // // // // // // //           {loading ? (
// // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // //             </div>
// // // // // // // //           ) : (
// // // // // // // //             <>
// // // // // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // // // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // // // // // //                   <thead className="bg-[#15212d] text-white">
// // // // // // // //                     <tr>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // // // // // //                     </tr>
// // // // // // // //                   </thead>
// // // // // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // //                     {currentItems.map((item, idx) => {
// // // // // // // //                       const dateValue = findDateField(item);
// // // // // // // //                       return (
// // // // // // // //                         <tr key={idx} className="hover:bg-gray-50">
// // // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // // //                             {formatDate(dateValue)}
// // // // // // // //                           </td>
// // // // // // // //                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
// // // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
// // // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // // //                             <button
// // // // // // // //                               onClick={() => handleViewReview(item.Mail)}
// // // // // // // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // // // // // // //                             >
// // // // // // // //                               <Eye size={16} className="mr-1" /> View
// // // // // // // //                             </button>
// // // // // // // //                           </td>
// // // // // // // //                         </tr>
// // // // // // // //                       );
// // // // // // // //                     })}
// // // // // // // //                   </tbody>
// // // // // // // //                 </table>
// // // // // // // //               </div>

// // // // // // // //               {filteredData.length > itemsPerPage && (
// // // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // // //                     Showing {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // //                   </div>
// // // // // // // //                   <div className="flex space-x-1">
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // // // // //                       disabled={currentPage === 1}
// // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // //                     >
// // // // // // // //                       <ChevronLeft size={16} />
// // // // // // // //                     </button>
// // // // // // // //                     {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
// // // // // // // //                       <button
// // // // // // // //                         key={i}
// // // // // // // //                         onClick={() => setCurrentPage(i + 1)}
// // // // // // // //                         className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // // //                       >
// // // // // // // //                         {i + 1}
// // // // // // // //                       </button>
// // // // // // // //                     ))}
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // // // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // //                     >
// // // // // // // //                       <ChevronRight size={16} />
// // // // // // // //                     </button>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </>
// // // // // // // //           )}
// // // // // // // //         </>
// // // // // // // //       ) : (
// // // // // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // // //             <div className="flex space-x-2">
// // // // // // // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // // // // //               </button>
// // // // // // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // // // // //                 <Edit size={16} className="mr-1" /> Edit
// // // // // // // //               </button>
// // // // // // // //               {editMode && (
// // // // // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // // // // //                   <Save size={16} className="mr-1" /> Save
// // // // // // // //                 </button>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
// // // // // // // //           </div>

// // // // // // // //           {editMode && focusedCell.row !== null && (
// // // // // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // // // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // // // // // // //               </div>
// // // // // // // //               <textarea
// // // // // // // //                 className="w-full h-24 p-2 border rounded-md"
// // // // // // // //                 value={focusedCellValue}
// // // // // // // //                 onChange={(e) => {
// // // // // // // //                   setFocusedCellValue(e.target.value);
// // // // // // // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // // // // // // //                 }}
// // // // // // // //               />
// // // // // // // //             </div>
// // // // // // // //           )}

// // // // // // // //           {expandedCell && (
// // // // // // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // // // // //                 <div className="flex justify-between items-center mb-4">
// // // // // // // //                   <h3 className="text-lg font-medium">
// // // // // // // //                     {editedReviewData[expandedCell.row] && 
// // // // // // // //                      Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // // // // // // //                   </h3>
// // // // // // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // // // // //                     <X size={20} />
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // // // // //                   {expandedCell.value || ""}
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           )}

// // // // // // // //           {loading ? (
// // // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // // //             </div>
// // // // // // // //           ) : (
// // // // // // // //             <>
// // // // // // // //               <div className="overflow-auto max-h-[75vh]">
// // // // // // // //                 <table className="w-full border border-gray-300 text-sm">
// // // // // // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // // // // // //                     <tr>
// // // // // // // //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // // // // // // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
// // // // // // // //                           {col}
// // // // // // // //                         </th>
// // // // // // // //                       ))}
// // // // // // // //                     </tr>
// // // // // // // //                   </thead>
// // // // // // // //                   <tbody>
// // // // // // // //                     {detailCurrentItems.map((row, rowIndex) => {
// // // // // // // //                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// // // // // // // //                       return (
// // // // // // // //                         <tr key={rowIndex} className="hover:bg-gray-50">
// // // // // // // //                           {Object.entries(row).map(([key, val], colIndex) => {
// // // // // // // //                             // Skip rendering the Status column
// // // // // // // //                             if (key === 'Status') return null;
                            
// // // // // // // //                             return (
// // // // // // // //                               <td 
// // // // // // // //                                 key={colIndex} 
// // // // // // // //                                 className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // // // // //                                 onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// // // // // // // //                                 title="Click to view full content"
// // // // // // // //                                 style={{ minWidth: '200px', maxWidth: '300px' }}
// // // // // // // //                               >
// // // // // // // //                                 {editMode ? (
// // // // // // // //                                   <input
// // // // // // // //                                     className="w-full border p-2 text-xs"
// // // // // // // //                                     value={val || ''}
// // // // // // // //                                     onFocus={() => {
// // // // // // // //                                       setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // // // // // //                                       setFocusedCellValue(val || '');
// // // // // // // //                                     }}
// // // // // // // //                                     onChange={(e) => {
// // // // // // // //                                       handleCellChange(actualRowIndex, key, e.target.value);
// // // // // // // //                                       if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // // // // // //                                         setFocusedCellValue(e.target.value);
// // // // // // // //                                       }
// // // // // // // //                                     }}
// // // // // // // //                                   />
// // // // // // // //                                 ) : (
// // // // // // // //                                   truncateText(val, 25) || ''
// // // // // // // //                                 )}
// // // // // // // //                               </td>
// // // // // // // //                             );
// // // // // // // //                           })}
// // // // // // // //                           <td className="border px-4 py-2 text-xs">
// // // // // // // //                             {renderStatusButtons(actualRowIndex)}
// // // // // // // //                           </td>
// // // // // // // //                         </tr>
// // // // // // // //                       );
// // // // // // // //                     })}
// // // // // // // //                   </tbody>
// // // // // // // //                 </table>
// // // // // // // //               </div>

// // // // // // // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // // //                     Showing {detailCurrentPage} of {Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // // // // //                   </div>
// // // // // // // //                   <div className="flex space-x-1">
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // // // // // // //                       disabled={detailCurrentPage === 1}
// // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // //                     >
// // // // // // // //                       <ChevronLeft size={16} />
// // // // // // // //                     </button>
// // // // // // // //                     {Array.from({ length: Math.ceil(selectedReviewData.length / itemsPerPage) }, (_, i) => (
// // // // // // // //                       <button
// // // // // // // //                         key={i}
// // // // // // // //                         onClick={() => setDetailCurrentPage(i + 1)}
// // // // // // // //                         className={`px-3 py-1 rounded-md ${detailCurrentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // // //                       >
// // // // // // // //                         {i + 1}
// // // // // // // //                       </button>
// // // // // // // //                     ))}
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // // // // // // //                       disabled={detailCurrentPage === Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // // //                     >
// // // // // // // //                       <ChevronRight size={16} />
// // // // // // // //                     </button>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default LiteratureReviewContent;
// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';
// // // // // // // import DatabaseService from '../services/DatabaseService';
// // // // // // // import { useNavigate, useLocation } from 'react-router-dom';

// // // // // // // const LiteratureReviewContent = () => {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const location = useLocation();
// // // // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // // // //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// // // // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // // // // //   const [selectedEMail, setSelectedEMail] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // // // //   const [modifiedRows, setModifiedRows] = useState({});
// // // // // // //   const [statusUpdating, setStatusUpdating] = useState(null);

// // // // // // //   const itemsPerPage = 10;

// // // // // // //   // Parse query parameters
// // // // // // //   const queryParams = new URLSearchParams(location.search);
// // // // // // //   const filterYear = parseInt(queryParams.get('year')) || new Date().getFullYear();
// // // // // // //   const filterStartMonth = parseInt(queryParams.get('startMonth')) || 1;
// // // // // // //   const filterEndMonth = parseInt(queryParams.get('endMonth')) || 12;
// // // // // // //   const filterType = queryParams.get('filterType');

// // // // // // //   // Fetch data from database
// // // // // // //   const fetchLiteratureData = async () => {
// // // // // // //     try {
// // // // // // //       const data = await DatabaseService.fetchLiteratureReviews();

// // // // // // //       // Process data to get unique emails with date consideration
// // // // // // //       const eMailDateMap = new Map();
// // // // // // //       data.forEach(item => {
// // // // // // //         const dateFieldName = Object.keys(item).find(key =>
// // // // // // //           key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // // // // // //         );
// // // // // // //         const dateValue = dateFieldName ? item[dateFieldName] : null;
// // // // // // //         let year, month, formattedDate;

// // // // // // //         if (dateValue) {
// // // // // // //           const date = new Date(dateValue);
// // // // // // //           if (!isNaN(date.getTime())) {
// // // // // // //             year = date.getFullYear();
// // // // // // //             month = date.getMonth() + 1;
// // // // // // //             formattedDate = date.toISOString().split('T')[0];
// // // // // // //           }
// // // // // // //         }

// // // // // // //         // Apply year and month filters
// // // // // // //         if (year === filterYear && month >= filterStartMonth && month <= filterEndMonth) {
// // // // // // //           if (item.Mail && dateValue) {
// // // // // // //             // Use composite key for unique email-date combinations
// // // // // // //             const emailDateKey = filterType === 'uniqueEmailsWithDate'
// // // // // // //               ? `${item.Mail}_${formattedDate}`
// // // // // // //               : item.Mail;

// // // // // // //             if (!eMailDateMap.has(emailDateKey)) {
// // // // // // //               const uniqueItem = {
// // // // // // //                 id: item.id,
// // // // // // //                 Mail: item.Mail,
// // // // // // //                 Title: item.Title,
// // // // // // //                 Drug: item.Drug,
// // // // // // //                 [dateFieldName]: dateValue,
// // // // // // //                 ArticlePMID: item['Article PMID'], // Include for status updates
// // // // // // //                 Status: item.Status // Include for status rendering
// // // // // // //               };
// // // // // // //               eMailDateMap.set(emailDateKey, uniqueItem);
// // // // // // //             }
// // // // // // //           }
// // // // // // //         }
// // // // // // //       });

// // // // // // //       const uniqueEMails = Array.from(eMailDateMap.values());
// // // // // // //       setLiteratureData(data); // Store full dataset for detailed view
// // // // // // //       setUniqueEMailData(uniqueEMails);
// // // // // // //       setLoading(false);
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Error fetching literature review data:", err);
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchLiteratureData();
// // // // // // //   }, [filterYear, filterStartMonth, filterEndMonth, filterType]);

// // // // // // //   // Handle view review (navigate to Cases page with email search term)
// // // // // // //   const handleViewReview = (eMail, date) => {
// // // // // // //     const queryParams = new URLSearchParams();
// // // // // // //     queryParams.set('searchTerm', eMail);
// // // // // // //     if (filterType === 'uniqueEmailsWithDate' && date) {
// // // // // // //       queryParams.set('validationDate', date.toISOString().split('T')[0]);
// // // // // // //     }
// // // // // // //     navigate(`/cases?${queryParams.toString()}`);
// // // // // // //   };

// // // // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // // // //     const newData = [...editedReviewData];
// // // // // // //     const oldValue = newData[rowIndex][key];
// // // // // // //     newData[rowIndex][key] = value;
// // // // // // //     setEditedReviewData(newData);

// // // // // // //     if (oldValue !== value) {
// // // // // // //       setModifiedRows(prev => ({
// // // // // // //         ...prev,
// // // // // // //         [rowIndex]: true
// // // // // // //       }));
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleStatusUpdate = async (rowIndex, status) => {
// // // // // // //     try {
// // // // // // //       const row = editedReviewData[rowIndex];
// // // // // // //       const recordId = row['Article PMID'];

// // // // // // //       if (!recordId) {
// // // // // // //         console.error("Row missing Article PMID:", row);
// // // // // // //         alert("Cannot update status: missing Article PMID identifier");
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       setStatusUpdating(rowIndex);

// // // // // // //       const newData = [...editedReviewData];
// // // // // // //       newData[rowIndex]['Status'] = status;
// // // // // // //       setEditedReviewData(newData);

// // // // // // //       await DatabaseService.updateRecordStatus(recordId, status);
// // // // // // //       alert(`Status updated to "${status}" successfully`);
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Error updating status:", err);
// // // // // // //       alert(`Failed to update status: ${err.message}`);
// // // // // // //       setEditedReviewData([...selectedReviewData]);
// // // // // // //     } finally {
// // // // // // //       setStatusUpdating(null);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSave = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       let successCount = 0;
// // // // // // //       let errorCount = 0;

// // // // // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // // // // //         const rowIndex = parseInt(rowIndexStr);
// // // // // // //         const row = editedReviewData[rowIndex];
// // // // // // //         const recordId = row['Article PMID'];

// // // // // // //         if (!recordId) {
// // // // // // //           console.error("Row missing Article PMID:", row);
// // // // // // //           errorCount++;
// // // // // // //           continue;
// // // // // // //         }

// // // // // // //         try {
// // // // // // //           await DatabaseService.updateLiteratureReview(recordId, row);
// // // // // // //           successCount++;
// // // // // // //         } catch (rowErr) {
// // // // // // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // // // // // //           errorCount++;
// // // // // // //         }
// // // // // // //       }

// // // // // // //       setEditMode(false);
// // // // // // //       setLoading(false);
// // // // // // //       setModifiedRows({});

// // // // // // //       fetchLiteratureData();

// // // // // // //       if (selectedEMail) {
// // // // // // //         setTimeout(() => {
// // // // // // //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// // // // // // //           setSelectedReviewData(refreshedEMailData);
// // // // // // //           setEditedReviewData(refreshedEMailData);
// // // // // // //         }, 500);
// // // // // // //       }

// // // // // // //       if (errorCount > 0) {
// // // // // // //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// // // // // // //       } else if (successCount > 0) {
// // // // // // //         alert(`Successfully saved ${successCount} rows.`);
// // // // // // //       } else {
// // // // // // //         alert("No changes were made.");
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Error in save operation:", err);
// // // // // // //       setLoading(false);
// // // // // // //       alert(`Error saving changes: ${err.message}`);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const closeReviewViewer = () => {
// // // // // // //     setSelectedReviewData(null);
// // // // // // //     setEditedReviewData(null);
// // // // // // //     setSelectedEMail(null);
// // // // // // //     setEditMode(false);
// // // // // // //     setFocusedCell({ row: null, col: null });
// // // // // // //     setFocusedCellValue('');
// // // // // // //     setExpandedCell(null);
// // // // // // //   };

// // // // // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // // // // //     if (!editMode) {
// // // // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const closeExpandedCell = () => {
// // // // // // //     setExpandedCell(null);
// // // // // // //   };

// // // // // // //   const formatDate = (dateString) => {
// // // // // // //     if (!dateString) return "-";
// // // // // // //     try {
// // // // // // //       const date = new Date(dateString);
// // // // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // // // //         return date.toISOString().split('T')[0];
// // // // // // //       }
// // // // // // //       return dateString || "-";
// // // // // // //     } catch (e) {
// // // // // // //       console.error("Error parsing date:", e, dateString);
// // // // // // //       return dateString || "-";
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const findDateField = (item) => {
// // // // // // //     if (!item) return null;
// // // // // // //     const dateKey = Object.keys(item).find(key =>
// // // // // // //       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // // // // // //     );
// // // // // // //     return dateKey ? item[dateKey] : null;
// // // // // // //   };

// // // // // // //   const filteredData = uniqueEMailData.filter(item => {
// // // // // // //     const searchLower = searchTerm.toLowerCase();
// // // // // // //     const dateValue = findDateField(item);

// // // // // // //     return (
// // // // // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // // // // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // // // // // //       (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
// // // // // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower))
// // // // // // //     );
// // // // // // //   });

// // // // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// // // // // // //   const truncateText = (text, maxLength = 30) => {
// // // // // // //     if (!text) return "";
// // // // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // // // //   };

// // // // // // //   const detailCurrentItems = selectedReviewData
// // // // // // //     ? selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage)
// // // // // // //     : [];

// // // // // // //   const renderStatusButtons = (rowIndex) => {
// // // // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // // // //     const currentStatus = editedReviewData[rowIndex]['Status'];

// // // // // // //     return (
// // // // // // //       <div className="flex space-x-2 items-center">
// // // // // // //         {currentStatus && <span className="text-xs mr-2"><strong>{currentStatus}</strong></span>}
// // // // // // //         <button
// // // // // // //           onClick={() => {
// // // // // // //             if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
// // // // // // //               handleStatusUpdate(rowIndex, 'Approved');
// // // // // // //             }
// // // // // // //           }}
// // // // // // //           disabled={isUpdating || currentStatus === 'Approved'}
// // // // // // //           className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // // //             currentStatus === 'Approved'
// // // // // // //               ? 'bg-green-100 text-green-800'
// // // // // // //               : 'bg-green-500 text-white hover:bg-green-600'
// // // // // // //           }`}
// // // // // // //         >
// // // // // // //           <CheckCircle size={12} className="mr-1" /> Approve
// // // // // // //         </button>
// // // // // // //         {currentStatus !== 'Approved' && (
// // // // // // //           <button
// // // // // // //             onClick={() => handleStatusUpdate(rowIndex, 'Checking')}
// // // // // // //             disabled={isUpdating || currentStatus === 'Checking'}
// // // // // // //             className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // // //               currentStatus === 'Checking'
// // // // // // //                 ? 'bg-yellow-100 text-yellow-800'
// // // // // // //                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             <Clock size={12} className="mr-1" /> Checking
// // // // // // //           </button>
// // // // // // //         )}
// // // // // // //         {isUpdating && (
// // // // // // //           <span className="text-xs italic text-gray-500">Updating...</span>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-white p-8">
// // // // // // //       {!selectedReviewData ? (
// // // // // // //         <>
// // // // // // //           <div className="mb-8">
// // // // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // // // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // // // // //           </div>
// // // // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               placeholder="Search by date, Mail, Title or Drug..."
// // // // // // //               className="bg-transparent border-none outline-none w-full"
// // // // // // //               value={searchTerm}
// // // // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //             />
// // // // // // //           </div>

// // // // // // //           {loading ? (
// // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // //             </div>
// // // // // // //           ) : (
// // // // // // //             <>
// // // // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // // // // //                   <thead className="bg-[#15212d] text-white">
// // // // // // //                     <tr>
// // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // // // // //                     </tr>
// // // // // // //                   </thead>
// // // // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // // // //                     {currentItems.map((item, idx) => {
// // // // // // //                       const dateValue = findDateField(item);
// // // // // // //                       return (
// // // // // // //                         <tr key={idx} className="hover:bg-gray-50">
// // // // // // //                           <td className="px-6 py-4 text-sm">{formatDate(dateValue)}</td>
// // // // // // //                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
// // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
// // // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // // //                             <button
// // // // // // //                               onClick={() => handleViewReview(item.Mail, dateValue ? new Date(dateValue) : null)}
// // // // // // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // // // // // //                             >
// // // // // // //                               <Eye size={16} className="mr-1" /> View
// // // // // // //                             </button>
// // // // // // //                           </td>
// // // // // // //                         </tr>
// // // // // // //                       );
// // // // // // //                     })}
// // // // // // //                   </tbody>
// // // // // // //                 </table>
// // // // // // //               </div>

// // // // // // //               {filteredData.length > itemsPerPage && (
// // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // //                     Showing {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // //                   </div>
// // // // // // //                   <div className="flex space-x-1">
// // // // // // //                     <button
// // // // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // // // //                       disabled={currentPage === 1}
// // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // //                     >
// // // // // // //                       <ChevronLeft size={16} />
// // // // // // //                     </button>
// // // // // // //                     {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
// // // // // // //                       <button
// // // // // // //                         key={i}
// // // // // // //                         onClick={() => setCurrentPage(i + 1)}
// // // // // // //                         className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // //                       >
// // // // // // //                         {i + 1}
// // // // // // //                       </button>
// // // // // // //                     ))}
// // // // // // //                     <button
// // // // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // // // //                       disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
// // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // //                     >
// // // // // // //                       <ChevronRight size={16} />
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </>
// // // // // // //           )}
// // // // // // //         </>
// // // // // // //       ) : (
// // // // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // //             <div className="flex space-x-2">
// // // // // // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // // // //               </button>
// // // // // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // // // //                 <Edit size={16} className="mr-1" /> Edit
// // // // // // //               </button>
// // // // // // //               {editMode && (
// // // // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // // // //                   <Save size={16} className="mr-1" /> Save
// // // // // // //                 </button>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
// // // // // // //           </div>

// // // // // // //           {editMode && focusedCell.row !== null && (
// // // // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // // // // // //               </div>
// // // // // // //               <textarea
// // // // // // //                 className="w-full h-24 p-2 border rounded-md"
// // // // // // //                 value={focusedCellValue}
// // // // // // //                 onChange={(e) => {
// // // // // // //                   setFocusedCellValue(e.target.value);
// // // // // // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // // // // // //                 }}
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           {expandedCell && (
// // // // // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // // // //                 <div className="flex justify-between items-center mb-4">
// // // // // // //                   <h3 className="text-lg font-medium">
// // // // // // //                     {editedReviewData[expandedCell.row] &&
// // // // // // //                       Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // // // // // //                   </h3>
// // // // // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // // // //                     <X size={20} />
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // // // //                   {expandedCell.value || ""}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           {loading ? (
// // // // // // //             <div className="flex justify-center items-center h-64">
// // // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // // //             </div>
// // // // // // //           ) : (
// // // // // // //             <>
// // // // // // //               <div className="overflow-auto max-h-[75vh]">
// // // // // // //                 <table className="w-full border border-gray-300 text-sm">
// // // // // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // // // // //                     <tr>
// // // // // // //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // // // // // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
// // // // // // //                           {col}
// // // // // // //                         </th>
// // // // // // //                       ))}
// // // // // // //                     </tr>
// // // // // // //                   </thead>
// // // // // // //                   <tbody>
// // // // // // //                     {detailCurrentItems.map((row, rowIndex) => {
// // // // // // //                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// // // // // // //                       return (
// // // // // // //                         <tr key={rowIndex} className="hover:bg-gray-50">
// // // // // // //                           {Object.entries(row).map(([key, val], colIndex) => {
// // // // // // //                             if (key === 'Status') return null;
// // // // // // //                             return (
// // // // // // //                               <td
// // // // // // //                                 key={colIndex}
// // // // // // //                                 className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // // // //                                 onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// // // // // // //                                 title="Click to view full content"
// // // // // // //                                 style={{ minWidth: '200px', maxWidth: '300px' }}
// // // // // // //                               >
// // // // // // //                                 {editMode ? (
// // // // // // //                                   <input
// // // // // // //                                     className="w-full border p-2 text-xs"
// // // // // // //                                     value={val || ''}
// // // // // // //                                     onFocus={() => {
// // // // // // //                                       setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // // // // //                                       setFocusedCellValue(val || '');
// // // // // // //                                     }}
// // // // // // //                                     onChange={(e) => {
// // // // // // //                                       handleCellChange(actualRowIndex, key, e.target.value);
// // // // // // //                                       if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // // // // //                                         setFocusedCellValue(e.target.value);
// // // // // // //                                       }
// // // // // // //                                     }}
// // // // // // //                                   />
// // // // // // //                                 ) : (
// // // // // // //                                   truncateText(val, 25) || ''
// // // // // // //                                 )}
// // // // // // //                               </td>
// // // // // // //                             );
// // // // // // //                           })}
// // // // // // //                           <td className="border px-4 py-2 text-xs">
// // // // // // //                             {renderStatusButtons(actualRowIndex)}
// // // // // // //                           </td>
// // // // // // //                         </tr>
// // // // // // //                       );
// // // // // // //                     })}
// // // // // // //                   </tbody>
// // // // // // //                 </table>
// // // // // // //               </div>

// // // // // // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // // //                   <div className="text-sm text-gray-700">
// // // // // // //                     Showing {detailCurrentPage} of {Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // // // //                   </div>
// // // // // // //                   <div className="flex space-x-1">
// // // // // // //                     <button
// // // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // // // // // //                       disabled={detailCurrentPage === 1}
// // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // //                     >
// // // // // // //                       <ChevronLeft size={16} />
// // // // // // //                     </button>
// // // // // // //                     {Array.from({ length: Math.ceil(selectedReviewData.length / itemsPerPage) }, (_, i) => (
// // // // // // //                       <button
// // // // // // //                         key={i}
// // // // // // //                         onClick={() => setDetailCurrentPage(i + 1)}
// // // // // // //                         className={`px-3 py-1 rounded-md ${detailCurrentPage === i + 1 ? 'bg-[#15212d] text-white' : 'bg-gray-200'}`}
// // // // // // //                       >
// // // // // // //                         {i + 1}
// // // // // // //                       </button>
// // // // // // //                     ))}
// // // // // // //                     <button
// // // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // // // // // //                       disabled={detailCurrentPage === Math.ceil(selectedReviewData.length / itemsPerPage)}
// // // // // // //                       className="px-3 py-1 rounded-md bg-gray-200"
// // // // // // //                     >
// // // // // // //                       <ChevronRight size={16} />
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default LiteratureReviewContent;
// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';
// // // // // // import DatabaseService from '../services/DatabaseService';
// // // // // // import { useNavigate, useLocation } from 'react-router-dom';

// // // // // // const LiteratureReviewContent = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const location = useLocation();
// // // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // // //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// // // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // // // //   const [selectedEMail, setSelectedEMail] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // // //   const [modifiedRows, setModifiedRows] = useState({});
// // // // // //   const [statusUpdating, setStatusUpdating] = useState(null);

// // // // // //   const itemsPerPage = 10;
// // // // // //   const maxPageButtons = 5; // Maximum number of page buttons to show

// // // // // //   // Parse query parameters
// // // // // //   const queryParams = new URLSearchParams(location.search);
// // // // // //   const filterYear = parseInt(queryParams.get('year')) || new Date().getFullYear();
// // // // // //   const filterStartMonth = parseInt(queryParams.get('startMonth')) || 1;
// // // // // //   const filterEndMonth = parseInt(queryParams.get('endMonth')) || 12;
// // // // // //   const filterType = queryParams.get('filterType');

// // // // // //   // Fetch data from database
// // // // // //   const fetchLiteratureData = async () => {
// // // // // //     try {
// // // // // //       const data = await DatabaseService.fetchLiteratureReviews();

// // // // // //       // Process data to get unique emails with date consideration
// // // // // //       const eMailDateMap = new Map();
// // // // // //       data.forEach(item => {
// // // // // //         const dateFieldName = Object.keys(item).find(key =>
// // // // // //           key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // // // // //         );
// // // // // //         const dateValue = dateFieldName ? item[dateFieldName] : null;
// // // // // //         let year, month, formattedDate;

// // // // // //         if (dateValue) {
// // // // // //           const date = new Date(dateValue);
// // // // // //           if (!isNaN(date.getTime())) {
// // // // // //             year = date.getFullYear();
// // // // // //             month = date.getMonth() + 1;
// // // // // //             formattedDate = date.toISOString().split('T')[0];
// // // // // //           }
// // // // // //         }

// // // // // //         // Apply year and month filters
// // // // // //         if (year === filterYear && month >= filterStartMonth && month <= filterEndMonth) {
// // // // // //           if (item.Mail && dateValue) {
// // // // // //             // Use composite key for unique email-date combinations
// // // // // //             const emailDateKey = filterType === 'uniqueEmailsWithDate'
// // // // // //               ? `${item.Mail}_${formattedDate}`
// // // // // //               : item.Mail;

// // // // // //             if (!eMailDateMap.has(emailDateKey)) {
// // // // // //               const uniqueItem = {
// // // // // //                 id: item.id,
// // // // // //                 Mail: item.Mail,
// // // // // //                 Title: item.Title,
// // // // // //                 Drug: item.Drug,
// // // // // //                 [dateFieldName]: dateValue,
// // // // // //                 ArticlePMID: item['Article PMID'],
// // // // // //                 Status: item.Status
// // // // // //               };
// // // // // //               eMailDateMap.set(emailDateKey, uniqueItem);
// // // // // //             }
// // // // // //           }
// // // // // //         }
// // // // // //       });

// // // // // //       const uniqueEMails = Array.from(eMailDateMap.values());
// // // // // //       setLiteratureData(data);
// // // // // //       setUniqueEMailData(uniqueEMails);
// // // // // //       setLoading(false);
// // // // // //     } catch (err) {
// // // // // //       console.error("Error fetching literature review data:", err);
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchLiteratureData();
// // // // // //   }, [filterYear, filterStartMonth, filterEndMonth, filterType]);

// // // // // //   // Handle view review
// // // // // //   const handleViewReview = (eMail, date) => {
// // // // // //     const queryParams = new URLSearchParams();
// // // // // //     queryParams.set('searchTerm', eMail);
// // // // // //     if (filterType === 'uniqueEmailsWithDate' && date) {
// // // // // //       queryParams.set('validationDate', date.toISOString().split('T')[0]);
// // // // // //     }
// // // // // //     navigate(`/cases?${queryParams.toString()}`);
// // // // // //   };

// // // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // // //     const newData = [...editedReviewData];
// // // // // //     const oldValue = newData[rowIndex][key];
// // // // // //     newData[rowIndex][key] = value;
// // // // // //     setEditedReviewData(newData);

// // // // // //     if (oldValue !== value) {
// // // // // //       setModifiedRows(prev => ({
// // // // // //         ...prev,
// // // // // //         [rowIndex]: true
// // // // // //       }));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleStatusUpdate = async (rowIndex, status) => {
// // // // // //     try {
// // // // // //       const row = editedReviewData[rowIndex];
// // // // // //       const recordId = row['Article PMID'];

// // // // // //       if (!recordId) {
// // // // // //         console.error("Row missing Article PMID:", row);
// // // // // //         alert("Cannot update status: missing Article PMID identifier");
// // // // // //         return;
// // // // // //       }

// // // // // //       setStatusUpdating(rowIndex);

// // // // // //       const newData = [...editedReviewData];
// // // // // //       newData[rowIndex]['Status'] = status;
// // // // // //       setEditedReviewData(newData);

// // // // // //       await DatabaseService.updateRecordStatus(recordId, status);
// // // // // //       alert(`Status updated to "${status}" successfully`);
// // // // // //     } catch (err) {
// // // // // //       console.error("Error updating status:", err);
// // // // // //       alert(`Failed to update status: ${err.message}`);
// // // // // //       setEditedReviewData([...selectedReviewData]);
// // // // // //     } finally {
// // // // // //       setStatusUpdating(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSave = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       let successCount = 0;
// // // // // //       let errorCount = 0;

// // // // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // // // //         const rowIndex = parseInt(rowIndexStr);
// // // // // //         const row = editedReviewData[rowIndex];
// // // // // //         const recordId = row['Article PMID'];

// // // // // //         if (!recordId) {
// // // // // //           console.error("Row missing Article PMID:", row);
// // // // // //           errorCount++;
// // // // // //           continue;
// // // // // //         }

// // // // // //         try {
// // // // // //           await DatabaseService.updateLiteratureReview(recordId, row);
// // // // // //           successCount++;
// // // // // //         } catch (rowErr) {
// // // // // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // // // // //           errorCount++;
// // // // // //         }
// // // // // //       }

// // // // // //       setEditMode(false);
// // // // // //       setLoading(false);
// // // // // //       setModifiedRows({});

// // // // // //       fetchLiteratureData();

// // // // // //       if (selectedEMail) {
// // // // // //         setTimeout(() => {
// // // // // //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// // // // // //           setSelectedReviewData(refreshedEMailData);
// // // // // //           setEditedReviewData(refreshedEMailData);
// // // // // //         }, 500);
// // // // // //       }

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

// // // // // //   const closeReviewViewer = () => {
// // // // // //     setSelectedReviewData(null);
// // // // // //     setEditedReviewData(null);
// // // // // //     setSelectedEMail(null);
// // // // // //     setEditMode(false);
// // // // // //     setFocusedCell({ row: null, col: null });
// // // // // //     setFocusedCellValue('');
// // // // // //     setExpandedCell(null);
// // // // // //   };

// // // // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // // // //     if (!editMode) {
// // // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // // // //     }
// // // // // //   };

// // // // // //   const closeExpandedCell = () => {
// // // // // //     setExpandedCell(null);
// // // // // //   };

// // // // // //   const formatDate = (dateString) => {
// // // // // //     if (!dateString) return "-";
// // // // // //     try {
// // // // // //       const date = new Date(dateString);
// // // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // // //         return date.toISOString().split('T')[0];
// // // // // //       }
// // // // // //       return dateString || "-";
// // // // // //     } catch (e) {
// // // // // //       console.error("Error parsing date:", e, dateString);
// // // // // //       return dateString || "-";
// // // // // //     }
// // // // // //   };

// // // // // //   const findDateField = (item) => {
// // // // // //     if (!item) return null;
// // // // // //     const dateKey = Object.keys(item).find(key =>
// // // // // //       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // // // // //     );
// // // // // //     return dateKey ? item[dateKey] : null;
// // // // // //   };

// // // // // //   const filteredData = uniqueEMailData.filter(item => {
// // // // // //     const searchLower = searchTerm.toLowerCase();
// // // // // //     const dateValue = findDateField(item);

// // // // // //     return (
// // // // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // // // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // // // // //       (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
// // // // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower))
// // // // // //     );
// // // // // //   });

// // // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
// // // // // //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// // // // // //   const truncateText = (text, maxLength = 30) => {
// // // // // //     if (!text) return "";
// // // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // // //   };

// // // // // //   const detailCurrentItems = selectedReviewData
// // // // // //     ? selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage)
// // // // // //     : [];
// // // // // //   const detailTotalPages = selectedReviewData ? Math.ceil(selectedReviewData.length / itemsPerPage) : 0;

// // // // // //   // Calculate pagination range
// // // // // //   const getPageNumbers = (current, total) => {
// // // // // //     const range = [];
// // // // // //     const delta = Math.floor(maxPageButtons / 2);

// // // // // //     let start = Math.max(1, current - delta);
// // // // // //     let end = Math.min(total, current + delta);

// // // // // //     if (end - start < maxPageButtons - 1) {
// // // // // //       if (start === 1) {
// // // // // //         end = Math.min(total, start + maxPageButtons - 1);
// // // // // //       } else if (end === total) {
// // // // // //         start = Math.max(1, end - maxPageButtons + 1);
// // // // // //       }
// // // // // //     }

// // // // // //     for (let i = start; i <= end; i++) {
// // // // // //       range.push(i);
// // // // // //     }

// // // // // //     return range;
// // // // // //   };

// // // // // //   const renderStatusButtons = (rowIndex) => {
// // // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // // //     const currentStatus = editedReviewData[rowIndex]['Status'];

// // // // // //     return (
// // // // // //       <div className="flex space-x-2 items-center">
// // // // // //         {currentStatus && <span className="text-xs mr-2"><strong>{currentStatus}</strong></span>}
// // // // // //         <button
// // // // // //           onClick={() => {
// // // // // //             if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
// // // // // //               handleStatusUpdate(rowIndex, 'Approved');
// // // // // //             }
// // // // // //           }}
// // // // // //           disabled={isUpdating || currentStatus === 'Approved'}
// // // // // //           className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // //             currentStatus === 'Approved'
// // // // // //               ? 'bg-green-100 text-green-800'
// // // // // //               : 'bg-green-500 text-white hover:bg-green-600'
// // // // // //           }`}
// // // // // //         >
// // // // // //           <CheckCircle size={12} className="mr-1" /> Approve
// // // // // //         </button>
// // // // // //         {currentStatus !== 'Approved' && (
// // // // // //           <button
// // // // // //             onClick={() => handleStatusUpdate(rowIndex, 'Checking')}
// // // // // //             disabled={isUpdating || currentStatus === 'Checking'}
// // // // // //             className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // // //               currentStatus === 'Checking'
// // // // // //                 ? 'bg-yellow-100 text-yellow-800'
// // // // // //                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
// // // // // //             }`}
// // // // // //           >
// // // // // //             <Clock size={12} className="mr-1" /> Checking
// // // // // //           </button>
// // // // // //         )}
// // // // // //         {isUpdating && (
// // // // // //           <span className="text-xs italic text-gray-500">Updating...</span>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     );
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-white p-8">
// // // // // //       {!selectedReviewData ? (
// // // // // //         <>
// // // // // //           <div className="mb-8">
// // // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // // // //           </div>
// // // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               placeholder="Search by date, Mail, Title or Drug..."
// // // // // //               className="bg-transparent border-none outline-none w-full"
// // // // // //               value={searchTerm}
// // // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //             />
// // // // // //           </div>

// // // // // //           {loading ? (
// // // // // //             <div className="flex justify-center items-center h-64">
// // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // // // //                   <thead className="bg-[#15212d] text-white">
// // // // // //                     <tr>
// // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // // // //                     </tr>
// // // // // //                   </thead>
// // // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // // //                     {currentItems.map((item, idx) => {
// // // // // //                       const dateValue = findDateField(item);
// // // // // //                       return (
// // // // // //                         <tr key={idx} className="hover:bg-gray-50">
// // // // // //                           <td className="px-6 py-4 text-sm">{formatDate(dateValue)}</td>
// // // // // //                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
// // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
// // // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // // // // //                           <td className="px-6 py-4 text-sm">
// // // // // //                             <button
// // // // // //                               onClick={() => handleViewReview(item.Mail, dateValue ? new Date(dateValue) : null)}
// // // // // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // // // // //                             >
// // // // // //                               <Eye size={16} className="mr-1" /> View
// // // // // //                             </button>
// // // // // //                           </td>
// // // // // //                         </tr>
// // // // // //                       );
// // // // // //                     })}
// // // // // //                   </tbody>
// // // // // //                 </table>
// // // // // //               </div>

// // // // // //               {filteredData.length > itemsPerPage && (
// // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // //                   <div className="text-sm text-gray-700">
// // // // // //                     Showing {currentItems.length} entries out of {filteredData.length} entries
// // // // // //                   </div>
// // // // // //                   <div className="flex space-x-1">
// // // // // //                     <button
// // // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // // //                       disabled={currentPage === 1}
// // // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // // // //                     >
// // // // // //                       <ChevronLeft size={16} />
// // // // // //                     </button>
// // // // // //                     {getPageNumbers(currentPage, totalPages).map(page => (
// // // // // //                       <button
// // // // // //                         key={page}
// // // // // //                         onClick={() => setCurrentPage(page)}
// // // // // //                         className={`px-3 py-1 rounded-md ${
// // // // // //                           currentPage === page ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {page}
// // // // // //                       </button>
// // // // // //                     ))}
// // // // // //                     {totalPages > maxPageButtons && currentPage < totalPages - Math.floor(maxPageButtons / 2) && (
// // // // // //                       <span className="px-3 py-1">...</span>
// // // // // //                     )}
// // // // // //                     {totalPages > maxPageButtons && currentPage < totalPages && (
// // // // // //                       <button
// // // // // //                         onClick={() => setCurrentPage(totalPages)}
// // // // // //                         className={`px-3 py-1 rounded-md ${
// // // // // //                           currentPage === totalPages ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {totalPages}
// // // // // //                       </button>
// // // // // //                     )}
// // // // // //                     <button
// // // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // // //                       disabled={currentPage === totalPages}
// // // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // // // //                     >
// // // // // //                       <ChevronRight size={16} />
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </>
// // // // // //           )}
// // // // // //         </>
// // // // // //       ) : (
// // // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // //             <div className="flex space-x-2">
// // // // // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // // //               </button>
// // // // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // // //                 <Edit size={16} className="mr-1" /> Edit
// // // // // //               </button>
// // // // // //               {editMode && (
// // // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // // //                   <Save size={16} className="mr-1" /> Save
// // // // // //                 </button>
// // // // // //               )}
// // // // // //             </div>
// // // // // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
// // // // // //           </div>

// // // // // //           {editMode && focusedCell.row !== null && (
// // // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // // // // //               </div>
// // // // // //               <textarea
// // // // // //                 className="w-full h-24 p-2 border rounded-md"
// // // // // //                 value={focusedCellValue}
// // // // // //                 onChange={(e) => {
// // // // // //                   setFocusedCellValue(e.target.value);
// // // // // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // // // // //                 }}
// // // // // //               />
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {expandedCell && (
// // // // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // // // //                 <div className="flex justify-between items-center mb-4">
// // // // // //                   <h3 className="text-lg font-medium">
// // // // // //                     {editedReviewData[expandedCell.row] &&
// // // // // //                       Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // // // // //                   </h3>
// // // // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // // // //                     <X size={20} />
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // // // //                   {expandedCell.value || ""}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {loading ? (
// // // // // //             <div className="flex justify-center items-center h-64">
// // // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <div className="overflow-auto max-h-[75vh]">
// // // // // //                 <table className="w-full border border-gray-300 text-sm">
// // // // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // // // //                     <tr>
// // // // // //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // // // // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
// // // // // //                           {col}
// // // // // //                         </th>
// // // // // //                       ))}
// // // // // //                     </tr>
// // // // // //                   </thead>
// // // // // //                   <tbody>
// // // // // //                     {detailCurrentItems.map((row, rowIndex) => {
// // // // // //                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// // // // // //                       return (
// // // // // //                         <tr key={rowIndex} className="hover:bg-gray-50">
// // // // // //                           {Object.entries(row).map(([key, val], colIndex) => {
// // // // // //                             if (key === 'Status') return null;
// // // // // //                             return (
// // // // // //                               <td
// // // // // //                                 key={colIndex}
// // // // // //                                 className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // // //                                 onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// // // // // //                                 title="Click to view full content"
// // // // // //                                 style={{ minWidth: '200px', maxWidth: '300px' }}
// // // // // //                               >
// // // // // //                                 {editMode ? (
// // // // // //                                   <input
// // // // // //                                     className="w-full border p-2 text-xs"
// // // // // //                                     value={val || ''}
// // // // // //                                     onFocus={() => {
// // // // // //                                       setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // // // //                                       setFocusedCellValue(val || '');
// // // // // //                                     }}
// // // // // //                                     onChange={(e) => {
// // // // // //                                       handleCellChange(actualRowIndex, key, e.target.value);
// // // // // //                                       if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // // // //                                         setFocusedCellValue(e.target.value);
// // // // // //                                       }
// // // // // //                                     }}
// // // // // //                                   />
// // // // // //                                 ) : (
// // // // // //                                   truncateText(val, 25) || ''
// // // // // //                                 )}
// // // // // //                               </td>
// // // // // //                             );
// // // // // //                           })}
// // // // // //                           <td className="border px-4 py snarled-2 text-xs">
// // // // // //                             {renderStatusButtons(actualRowIndex)}
// // // // // //                           </td>
// // // // // //                         </tr>
// // // // // //                       );
// // // // // //                     })}
// // // // // //                   </tbody>
// // // // // //                 </table>
// // // // // //               </div>

// // // // // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // // // // //                 <div className="flex justify-between items-center mt-6">
// // // // // //                   <div className="text-sm text-gray-700">
// // // // // //                     Showing {detailCurrentItems.length} entries out of {selectedReviewData.length} entries
// // // // // //                   </div>
// // // // // //                   <div className="flex space-x-1">
// // // // // //                     <button
// // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // // // // //                       disabled={detailCurrentPage === 1}
// // // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // // // //                     >
// // // // // //                       <ChevronLeft size={16} />
// // // // // //                     </button>
// // // // // //                     {getPageNumbers(detailCurrentPage, detailTotalPages).map(page => (
// // // // // //                       <button
// // // // // //                         key={page}
// // // // // //                         onClick={() => setDetailCurrentPage(page)}
// // // // // //                         className={`px-3 py-1 rounded-md ${
// // // // // //                           detailCurrentPage === page ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {page}
// // // // // //                       </button>
// // // // // //                     ))}
// // // // // //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages - Math.floor(maxPageButtons / 2) && (
// // // // // //                       <span className="px-3 py-1">...</span>
// // // // // //                     )}
// // // // // //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages && (
// // // // // //                       <button
// // // // // //                         onClick={() => setDetailCurrentPage(detailTotalPages)}
// // // // // //                         className={`px-3 py-1 rounded-md ${
// // // // // //                           detailCurrentPage === detailTotalPages ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {detailTotalPages}
// // // // // //                       </button>
// // // // // //                     )}
// // // // // //                     <button
// // // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // // // // //                       disabled={detailCurrentPage === detailTotalPages}
// // // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // // // //                     >
// // // // // //                       <ChevronRight size={16} />
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default LiteratureReviewContent;
// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { ChevronLeft, ChevronRight, Search, Eye, Edit, Save, ArrowLeft, X, CheckCircle, Clock } from 'lucide-react';
// // // // // import DatabaseService from '../services/DatabaseService';
// // // // // import { useNavigate, useLocation } from 'react-router-dom';

// // // // // const LiteratureReviewContent = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const location = useLocation();
// // // // //   const [literatureData, setLiteratureData] = useState([]);
// // // // //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// // // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // // //   const [selectedEMail, setSelectedEMail] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // // // //   const [editMode, setEditMode] = useState(false);
// // // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // // //   const [modifiedRows, setModifiedRows] = useState({});
// // // // //   const [statusUpdating, setStatusUpdating] = useState(null);

// // // // //   const itemsPerPage = 10;
// // // // //   const maxPageButtons = 5; // Maximum number of page buttons to show

// // // // //   // Parse query parameters
// // // // //   const queryParams = new URLSearchParams(location.search);
// // // // //   const filterYear = parseInt(queryParams.get('year')) || new Date().getFullYear();
// // // // //   const filterStartMonth = parseInt(queryParams.get('startMonth')) || 1;
// // // // //   const filterEndMonth = parseInt(queryParams.get('endMonth')) || 12;
// // // // //   const filterType = queryParams.get('filterType');

// // // // //   // Fetch data from database
// // // // //   const fetchLiteratureData = async () => {
// // // // //     try {
// // // // //       const data = await DatabaseService.fetchLiteratureReviews();

// // // // //       // Process data to get unique emails with date consideration
// // // // //       const eMailDateMap = new Map();
// // // // //       data.forEach(item => {
// // // // //         const dateFieldName = Object.keys(item).find(key =>
// // // // //           key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // // // //         );
// // // // //         const dateValue = dateFieldName ? item[dateFieldName] : null;
// // // // //         let year, month, formattedDate;

// // // // //         if (dateValue) {
// // // // //           const date = new Date(dateValue);
// // // // //           if (!isNaN(date.getTime())) {
// // // // //             year = date.getFullYear();
// // // // //             month = date.getMonth() + 1;
// // // // //             formattedDate = date.toISOString().split('T')[0];
// // // // //           }
// // // // //         }

// // // // //         // Apply year and month filters
// // // // //         if (year === filterYear && month >= filterStartMonth && month <= filterEndMonth) {
// // // // //           if (item.Mail && dateValue) {
// // // // //             // Use composite key for unique email-date combinations
// // // // //             const emailDateKey = filterType === 'uniqueEmailsWithDate'
// // // // //               ? `${item.Mail}_${formattedDate}`
// // // // //               : item.Mail;

// // // // //             if (!eMailDateMap.has(emailDateKey)) {
// // // // //               const uniqueItem = {
// // // // //                 id: item.id,
// // // // //                 Mail: item.Mail,
// // // // //                 Title: item.Title,
// // // // //                 Drug:  item.Drug,
// // // // //                 [dateFieldName]: dateValue,
// // // // //                 ArticlePMID: item['Article PMID'],
// // // // //                 Status: item.Status
// // // // //               };
// // // // //               eMailDateMap.set(emailDateKey, uniqueItem);
// // // // //             }
// // // // //           }
// // // // //         }
// // // // //       });

// // // // //       const uniqueEMails = Array.from(eMailDateMap.values());
// // // // //       setLiteratureData(data);
// // // // //       setUniqueEMailData(uniqueEMails);
// // // // //       setLoading(false);
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching literature review data:", err);
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchLiteratureData();
// // // // //   }, [filterYear, filterStartMonth, filterEndMonth, filterType]);

// // // // //   // Handle view review
// // // // //   const handleViewReview = (eMail, date) => {
// // // // //     setSelectedEMail(eMail);
// // // // //     const filteredData = literatureData.filter(item => item.Mail === eMail && (!date || findDateField(item) === date));
// // // // //     setSelectedReviewData(filteredData);
// // // // //     setEditedReviewData(filteredData);

// // // // //     const queryParams = new URLSearchParams();
// // // // //     queryParams.set('searchTerm', eMail);
// // // // //     if (date) {
// // // // //       queryParams.set('validationDate', date.toISOString().split('T')[0]);
// // // // //     }
// // // // //     navigate(`/cases?${queryParams.toString()}`);
// // // // //   };

// // // // //   const handleCellChange = (rowIndex, key, value) => {
// // // // //     const newData = [...editedReviewData];
// // // // //     const oldValue = newData[rowIndex][key];
// // // // //     newData[rowIndex][key] = value;
// // // // //     setEditedReviewData(newData);

// // // // //     if (oldValue !== value) {
// // // // //       setModifiedRows(prev => ({
// // // // //         ...prev,
// // // // //         [rowIndex]: true
// // // // //       }));
// // // // //     }
// // // // //   };

// // // // //   const handleStatusUpdate = async (rowIndex, status) => {
// // // // //     try {
// // // // //       const row = editedReviewData[rowIndex];
// // // // //       const recordId = row['Article PMID'];

// // // // //       if (!recordId) {
// // // // //         console.error("Row missing Article PMID:", row);
// // // // //         alert("Cannot update status: missing Article PMID identifier");
// // // // //         return;
// // // // //       }

// // // // //       setStatusUpdating(rowIndex);

// // // // //       const newData = [...editedReviewData];
// // // // //       newData[rowIndex]['Status'] = status;
// // // // //       setEditedReviewData(newData);

// // // // //       await DatabaseService.updateRecordStatus(recordId, status);
// // // // //       alert(`Status updated to "${status}" successfully`);
// // // // //     } catch (err) {
// // // // //       console.error("Error updating status:", err);
// // // // //       alert(`Failed to update status: ${err.message}`);
// // // // //       setEditedReviewData([...selectedReviewData]);
// // // // //     } finally {
// // // // //       setStatusUpdating(null);
// // // // //     }
// // // // //   };

// // // // //   const handleSave = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       let successCount = 0;
// // // // //       let errorCount = 0;

// // // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // // //         const rowIndex = parseInt(rowIndexStr);
// // // // //         const row = editedReviewData[rowIndex];
// // // // //         const recordId = row['Article PMID'];

// // // // //         if (!recordId) {
// // // // //           console.error("Row missing Article PMID:", row);
// // // // //           errorCount++;
// // // // //           continue;
// // // // //         }

// // // // //         try {
// // // // //           await DatabaseService.updateLiteratureReview(recordId, row);
// // // // //           successCount++;
// // // // //         } catch (rowErr) {
// // // // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // // // //           errorCount++;
// // // // //         }
// // // // //       }

// // // // //       setEditMode(false);
// // // // //       setLoading(false);
// // // // //       setModifiedRows({});

// // // // //       fetchLiteratureData();

// // // // //       if (selectedEMail) {
// // // // //         setTimeout(() => {
// // // // //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// // // // //           setSelectedReviewData(refreshedEMailData);
// // // // //           setEditedReviewData(refreshedEMailData);
// // // // //         }, 500);
// // // // //       }

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

// // // // //   const closeReviewViewer = () => {
// // // // //     setSelectedReviewData(null);
// // // // //     setEditedReviewData(null);
// // // // //     setSelectedEMail(null);
// // // // //     setEditMode(false);
// // // // //     setFocusedCell({ row: null, col: null });
// // // // //     setFocusedCellValue('');
// // // // //     setExpandedCell(null);
// // // // //   };

// // // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // // //     if (!editMode) {
// // // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // // //     }
// // // // //   };

// // // // //   const closeExpandedCell = () => {
// // // // //     setExpandedCell(null);
// // // // //   };

// // // // //   const formatDate = (dateString) => {
// // // // //     if (!dateString) return "-";
// // // // //     try {
// // // // //       const date = new Date(dateString);
// // // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // // //         return date.toISOString().split('T')[0];
// // // // //       }
// // // // //       return dateString || "-";
// // // // //     } catch (e) {
// // // // //       console.error("Error parsing date:", e, dateString);
// // // // //       return dateString || "-";
// // // // //     }
// // // // //   };

// // // // //   const findDateField = (item) => {
// // // // //     if (!item) return null;
// // // // //     const dateKey = Object.keys(item).find(key =>
// // // // //       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // // // //     );
// // // // //     return dateKey ? item[dateKey] : null;
// // // // //   };

// // // // //   const filteredData = uniqueEMailData.filter(item => {
// // // // //     const searchLower = searchTerm.toLowerCase();
// // // // //     const dateValue = findDateField(item);

// // // // //     return (
// // // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // // // //       (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
// // // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower))
// // // // //     );
// // // // //   });

// // // // //   const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
// // // // //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// // // // //   const truncateText = (text, maxLength = 30) => {
// // // // //     if (!text) return "";
// // // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // // //   };

// // // // //   const detailCurrentItems = selectedReviewData
// // // // //     ? selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage)
// // // // //     : [];
// // // // //   const detailTotalPages = selectedReviewData ? Math.ceil(selectedReviewData.length / itemsPerPage) : 0;

// // // // //   // Calculate pagination range
// // // // //   const getPageNumbers = (current, total) => {
// // // // //     const range = [];
// // // // //     const delta = Math.floor(maxPageButtons / 2);

// // // // //     let start = Math.max(1, current - delta);
// // // // //     let end = Math.min(total, current + delta);

// // // // //     if (end - start < maxPageButtons - 1) {
// // // // //       if (start === 1) {
// // // // //         end = Math.min(total, start + maxPageButtons - 1);
// // // // //       } else if (end === total) {
// // // // //         start = Math.max(1, end - maxPageButtons + 1);
// // // // //       }
// // // // //     }

// // // // //     for (let i = start; i <= end; i++) {
// // // // //       range.push(i);
// // // // //     }

// // // // //     return range;
// // // // //   };

// // // // //   const renderStatusButtons = (rowIndex) => {
// // // // //     const isUpdating = statusUpdating === rowIndex;
// // // // //     const currentStatus = editedReviewData[rowIndex]['Status'];

// // // // //     return (
// // // // //       <div className="flex space-x-2 items-center">
// // // // //         {currentStatus && <span className="text-xs mr-2"><strong>{currentStatus}</strong></span>}
// // // // //         <button
// // // // //           onClick={() => {
// // // // //             if (window.confirm('Are you sure you want to approve this entry? This action cannot be undone.')) {
// // // // //               handleStatusUpdate(rowIndex, 'Approved');
// // // // //             }
// // // // //           }}
// // // // //           disabled={isUpdating || currentStatus === 'Approved'}
// // // // //           className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // //             currentStatus === 'Approved'
// // // // //               ? 'bg-green-100 text-green-800'
// // // // //               : 'bg-green-500 text-white hover:bg-green-600'
// // // // //           }`}
// // // // //         >
// // // // //           <CheckCircle size={12} className="mr-1" /> Approve
// // // // //         </button>
// // // // //         {currentStatus !== 'Approved' && (
// // // // //           <button
// // // // //             onClick={() => handleStatusUpdate(rowIndex, 'Checking')}
// // // // //             disabled={isUpdating || currentStatus === 'Checking'}
// // // // //             className={`px-2 py-1 text-xs rounded flex items-center ${
// // // // //               currentStatus === 'Checking'
// // // // //                 ? 'bg-yellow-100 text-yellow-800'
// // // // //                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
// // // // //             }`}
// // // // //           >
// // // // //             <Clock size={12} className="mr-1" /> Checking
// // // // //           </button>
// // // // //         )}
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
// // // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // // //           </div>
// // // // //           <div className="flex items-center mb-6 bg-gray-100 rounded-lg p-2 w-full max-w-md">
// // // // //             <Search size={20} className="text-gray-500 mr-2" />
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Search by date, Mail, Title or Drug..."
// // // // //               className="bg-transparent border-none outline-none w-full"
// // // // //               value={searchTerm}
// // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // //             />
// // // // //           </div>

// // // // //           {loading ? (
// // // // //             <div className="flex justify-center items-center h-64">
// // // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <>
// // // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // // //                   <thead className="bg-[#15212d] text-white">
// // // // //                     <tr>
// // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // //                     {currentItems.map((item, idx) => {
// // // // //                       const dateValue = findDateField(item);
// // // // //                       return (
// // // // //                         <tr key={idx} className="hover:bg-gray-50">
// // // // //                           <td className="px-6 py-4 text-sm">{formatDate(dateValue)}</td>
// // // // //                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
// // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
// // // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // // // //                           <td className="px-6 py-4 text-sm">
// // // // //                             <button
// // // // //                               onClick={() => handleViewReview(item.Mail, dateValue ? new Date(dateValue) : null)}
// // // // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // // // //                             >
// // // // //                               <Eye size={16} className="mr-1" /> View
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
// // // // //                     Showing {currentItems.length} entries out of {filteredData.length} entries
// // // // //                   </div>
// // // // //                   <div className="flex space-x-1">
// // // // //                     <button
// // // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // // //                       disabled={currentPage === 1}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // // //                     >
// // // // //                       <ChevronLeft size={16} />
// // // // //                     </button>
// // // // //                     {getPageNumbers(currentPage, totalPages).map(page => (
// // // // //                       <button
// // // // //                         key={page}
// // // // //                         onClick={() => setCurrentPage(page)}
// // // // //                         className={`px-3 py-1 rounded-md ${
// // // // //                           currentPage === page ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // // //                         }`}
// // // // //                       >
// // // // //                         {page}
// // // // //                       </button>
// // // // //                     ))}
// // // // //                     {totalPages > maxPageButtons && currentPage < totalPages - Math.floor(maxPageButtons / 2) && (
// // // // //                       <span className="px-3 py-1">...</span>
// // // // //                     )}
// // // // //                     {totalPages > maxPageButtons && currentPage < totalPages && (
// // // // //                       <button
// // // // //                         onClick={() => setCurrentPage(totalPages)}
// // // // //                         className={`px-3 py-1 rounded-md ${
// // // // //                           currentPage === totalPages ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // // //                         }`}
// // // // //                       >
// // // // //                         {totalPages}
// // // // //                       </button>
// // // // //                     )}
// // // // //                     <button
// // // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // // //                       disabled={currentPage === totalPages}
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
// // // // //       ) : (
// // // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // // //           <div className="flex justify-between items-center mb-4">
// // // // //             <div className="flex space-x-2">
// // // // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // // //               </button>
// // // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // // //                 <Edit size={16} className="mr-1" /> Edit
// // // // //               </button>
// // // // //               {editMode && (
// // // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // // //                   <Save size={16} className="mr-1" /> Save
// // // // //                 </button>
// // // // //               )}
// // // // //             </div>
// // // // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
// // // // //           </div>

// // // // //           {editMode && focusedCell.row !== null && (
// // // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
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
// // // // //                       Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
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
// // // // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
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
// // // // //                           {Object.entries(row).map(([key, val], colIndex) => {
// // // // //                             if (key === 'Status') return null;
// // // // //                             return (
// // // // //                               <td
// // // // //                                 key={colIndex}
// // // // //                                 className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // // //                                 onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// // // // //                                 title="Click to view full content"
// // // // //                                 style={{ minWidth: '200px', maxWidth: '300px' }}
// // // // //                               >
// // // // //                                 {editMode ? (
// // // // //                                   <input
// // // // //                                     className="w-full border p-2 text-xs"
// // // // //                                     value={val || ''}
// // // // //                                     onFocus={() => {
// // // // //                                       setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // // //                                       setFocusedCellValue(val || '');
// // // // //                                     }}
// // // // //                                     onChange={(e) => {
// // // // //                                       handleCellChange(actualRowIndex, key, e.target.value);
// // // // //                                       if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // // //                                         setFocusedCellValue(e.target.value);
// // // // //                                       }
// // // // //                                     }}
// // // // //                                   />
// // // // //                                 ) : (
// // // // //                                   truncateText(val, 25) || ''
// // // // //                                 )}
// // // // //                               </td>
// // // // //                             );
// // // // //                           })}
// // // // //                           <td className="border px-4 py-2 text-xs">
// // // // //                             {renderStatusButtons(actualRowIndex)}
// // // // //                           </td>
// // // // //                         </tr>
// // // // //                       );
// // // // //                     })}
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               </div>

// // // // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // // // //                 <div className="flex justify-between items-center mt-6">
// // // // //                   <div className="text-sm text-gray-700">
// // // // //                     Showing {detailCurrentItems.length} entries out of {selectedReviewData.length} entries
// // // // //                   </div>
// // // // //                   <div className="flex space-x-1">
// // // // //                     <button
// // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // // // //                       disabled={detailCurrentPage === 1}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // // //                     >
// // // // //                       <ChevronLeft size={16} />
// // // // //                     </button>
// // // // //                     {getPageNumbers(detailCurrentPage, detailTotalPages).map(page => (
// // // // //                       <button
// // // // //                         key={page}
// // // // //                         onClick={() => setDetailCurrentPage(page)}
// // // // //                         className={`px-3 py-1 rounded-md ${
// // // // //                           detailCurrentPage === page ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // // //                         }`}
// // // // //                       >
// // // // //                         {page}
// // // // //                       </button>
// // // // //                     ))}
// // // // //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages - Math.floor(maxPageButtons / 2) && (
// // // // //                       <span className="px-3 py-1">...</span>
// // // // //                     )}
// // // // //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages && (
// // // // //                       <button
// // // // //                         onClick={() => setDetailCurrentPage(detailTotalPages)}
// // // // //                         className={`px-3 py-1 rounded-md ${
// // // // //                           detailCurrentPage === detailTotalPages ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // // //                         }`}
// // // // //                       >
// // // // //                         {detailTotalPages}
// // // // //                       </button>
// // // // //                     )}
// // // // //                     <button
// // // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // // // //                       disabled={detailCurrentPage === detailTotalPages}
// // // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
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

// // // // // export default LiteratureReviewContent;
// // // // import { useState, useEffect } from 'react';
// // // // import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// // // // import { Search, Eye, ArrowLeft, Edit, Save, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
// // // // import DatabaseService from '../services/DatabaseService';

// // // // const LiteratureReviewContent = () => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const [searchParams, setSearchParams] = useSearchParams();
// // // //   const [literatureData, setLiteratureData] = useState([]);
// // // //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// // // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // // //   const [selectedEMail, setSelectedEMail] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // // //   const [editMode, setEditMode] = useState(false);
// // // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // // //   const [expandedCell, setExpandedCell] = useState(null);
// // // //   const [modifiedRows, setModifiedRows] = useState({});
// // // //   const [sortOrder, setSortOrder] = useState('desc'); // Default to descending
// // // //   const [dateRange, setDateRange] = useState({
// // // //     startDate: searchParams.get('startDate') || '',
// // // //     endDate: searchParams.get('endDate') || ''
// // // //   });
// // // //   const [showDateFilter, setShowDateFilter] = useState(false);

// // // //   const itemsPerPage = 10;
// // // //   const maxPageButtons = 5;

// // // //   // Parse query parameters
// // // //   const queryParams = new URLSearchParams(location.search);
// // // //   const filterYear = parseInt(queryParams.get('year')) || new Date().getFullYear();
// // // //   const filterStartMonth = parseInt(queryParams.get('startMonth')) || 1;
// // // //   const filterEndMonth = parseInt(queryParams.get('endMonth')) || 12;
// // // //   const filterType = queryParams.get('filterType');

// // // //   // Update search params when filters change
// // // //   useEffect(() => {
// // // //     const newSearchParams = new URLSearchParams();
// // // //     if (searchTerm) newSearchParams.set('searchTerm', searchTerm);
// // // //     if (dateRange.startDate && dateRange.endDate) {
// // // //       newSearchParams.set('startDate', dateRange.startDate);
// // // //       newSearchParams.set('endDate', dateRange.endDate);
// // // //     }
// // // //     if (filterYear) newSearchParams.set('year', filterYear);
// // // //     if (filterStartMonth) newSearchParams.set('startMonth', filterStartMonth);
// // // //     if (filterEndMonth) newSearchParams.set('endMonth', filterEndMonth);
// // // //     if (filterType) newSearchParams.set('filterType', filterType);
// // // //     setSearchParams(newSearchParams, { replace: true });
// // // //   }, [searchTerm, dateRange, filterYear, filterStartMonth, filterEndMonth, filterType, setSearchParams]);

// // // //   // Parse date function
// // // //   const parseDate = (dateString) => {
// // // //     if (!dateString) return null;

// // // //     if (typeof dateString === 'string') {
// // // //       const monthNameRegex = /^([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})/;
// // // //       let matches = dateString.match(monthNameRegex);

// // // //       if (matches) {
// // // //         const monthName = matches[1];
// // // //         const day = parseInt(matches[2], 10);
// // // //         const year = parseInt(matches[3], 10);

// // // //         const monthMap = {
// // // //           'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
// // // //           'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
// // // //         };

// // // //         if (monthMap[monthName] !== undefined) {
// // // //           const month = monthMap[monthName];
// // // //           const date = new Date(year, month, day);
// // // //           if (!isNaN(date.getTime())) {
// // // //             return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
// // // //           }
// // // //         }
// // // //       }

// // // //       const ymdRegex = /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/;
// // // //       matches = dateString.match(ymdRegex);

// // // //       if (matches) {
// // // //         const year = parseInt(matches[1], 10);
// // // //         const month = parseInt(matches[2], 10);
// // // //         const day = parseInt(matches[3], 10);

// // // //         const date = new Date(year, month - 1, day);
// // // //         if (!isNaN(date.getTime())) {
// // // //           return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
// // // //         }
// // // //       }
// // // //     }

// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       if (!isNaN(date.getTime())) {
// // // //         const year = date.getFullYear();
// // // //         const month = String(date.getMonth() + 1).padStart(2, '0');
// // // //         const day = String(date.getDate()).padStart(2, '0');
// // // //         return `${year}-${month}-${day}`;
// // // //       }
// // // //     } catch (e) {
// // // //       console.error("Error parsing date:", e);
// // // //     }

// // // //     return null;
// // // //   };

// // // //   // Fetch data from database
// // // //   const fetchLiteratureData = async () => {
// // // //     try {
// // // //       const data = await DatabaseService.fetchLiteratureReviews();

// // // //       // Process data to get unique emails with date consideration
// // // //       const eMailDateMap = new Map();
// // // //       data.forEach(item => {
// // // //         const dateFieldName = Object.keys(item).find(key =>
// // // //           key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // // //         );
// // // //         const dateValue = dateFieldName ? item[dateFieldName] : null;
// // // //         let year, month, formattedDate;

// // // //         if (dateValue) {
// // // //           const date = new Date(dateValue);
// // // //           if (!isNaN(date.getTime())) {
// // // //             year = date.getFullYear();
// // // //             month = date.getMonth() + 1;
// // // //             formattedDate = date.toISOString().split('T')[0];
// // // //           }
// // // //         }

// // // //         // Apply year and month filters
// // // //         if (year === filterYear && month >= filterStartMonth && month <= filterEndMonth) {
// // // //           if (item.Mail && dateValue) {
// // // //             const emailDateKey = filterType === 'uniqueEmailsWithDate'
// // // //               ? `${item.Mail}_${formattedDate}`
// // // //               : item.Mail;

// // // //             if (!eMailDateMap.has(emailDateKey)) {
// // // //               const uniqueItem = {
// // // //                 id: item.id,
// // // //                 Mail: item.Mail,
// // // //                 Title: item.Title,
// // // //                 Drug: item.Drug,
// // // //                 [dateFieldName]: dateValue,
// // // //                 IRD: item.IRD,
// // // //                 'Comments (ICSR, AOI, Not selected)': item['Comments (ICSR, AOI, Not selected)'],
// // // //                 Status: item.Status,
// // // //                 ArticlePMID: item['Article PMID']
// // // //               };
// // // //               eMailDateMap.set(emailDateKey, uniqueItem);
// // // //             }
// // // //           }
// // // //         }
// // // //       });

// // // //       const uniqueEMails = Array.from(eMailDateMap.values());
// // // //       setLiteratureData(data);
// // // //       setUniqueEMailData(uniqueEMails);
// // // //       setLoading(false);
// // // //     } catch (err) {
// // // //       console.error("Error fetching literature review data:", err);
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchLiteratureData();
// // // //   }, [filterYear, filterStartMonth, filterEndMonth, filterType]);

// // // //   // Handle view review
// // // //   const handleViewReview = (eMail, date) => {
// // // //     setSelectedEMail(eMail);
// // // //     const filteredData = literatureData.filter(item => item.Mail === eMail && (!date || findDateField(item) === date));
// // // //     setSelectedReviewData(filteredData);
// // // //     setEditedReviewData(filteredData);

// // // //     const queryParams = new URLSearchParams();
// // // //     queryParams.set('searchTerm', eMail);
// // // //     if (date) {
// // // //       queryParams.set('validationDate', date.toISOString().split('T')[0]);
// // // //     }
// // // //     navigate(`/cases?${queryParams.toString()}`);
// // // //   };

// // // //   const handleCellChange = (rowIndex, key, value) => {
// // // //     const newData = [...editedReviewData];
// // // //     const oldValue = newData[rowIndex][key];
// // // //     newData[rowIndex][key] = value;
// // // //     setEditedReviewData(newData);

// // // //     if (oldValue !== value) {
// // // //       setModifiedRows(prev => ({
// // // //         ...prev,
// // // //         [rowIndex]: true
// // // //       }));
// // // //     }
// // // //   };

// // // //   const handleSave = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       let successCount = 0;
// // // //       let errorCount = 0;

// // // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // // //         const rowIndex = parseInt(rowIndexStr);
// // // //         const row = editedReviewData[rowIndex];
// // // //         const recordId = row['Article PMID'];

// // // //         if (!recordId) {
// // // //           console.error("Row missing Article PMID:", row);
// // // //           errorCount++;
// // // //           continue;
// // // //         }

// // // //         try {
// // // //           await DatabaseService.updateLiteratureReview(recordId, row);
// // // //           successCount++;
// // // //         } catch (rowErr) {
// // // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // // //           errorCount++;
// // // //         }
// // // //       }

// // // //       setEditMode(false);
// // // //       setLoading(false);
// // // //       setModifiedRows({});

// // // //       fetchLiteratureData();

// // // //       if (selectedEMail) {
// // // //         setTimeout(() => {
// // // //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// // // //           setSelectedReviewData(refreshedEMailData);
// // // //           setEditedReviewData(refreshedEMailData);
// // // //         }, 500);
// // // //       }

// // // //       if (errorCount > 0) {
// // // //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// // // //       } else if (successCount > 0) {
// // // //         alert(`Successfully saved ${successCount} rows.`);
// // // //       } else {
// // // //         alert("No changes were made.");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Error in save operation:", err);
// // // //       setLoading(false);
// // // //       alert(`Error saving changes: ${err.message}`);
// // // //     }
// // // //   };

// // // //   const closeReviewViewer = () => {
// // // //     setSelectedReviewData(null);
// // // //     setEditedReviewData(null);
// // // //     setSelectedEMail(null);
// // // //     setEditMode(false);
// // // //     setFocusedCell({ row: null, col: null });
// // // //     setFocusedCellValue('');
// // // //     setExpandedCell(null);
// // // //   };

// // // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // // //     if (!editMode) {
// // // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // // //     }
// // // //   };

// // // //   const closeExpandedCell = () => {
// // // //     setExpandedCell(null);
// // // //   };

// // // //   const formatDate = (dateString) => {
// // // //     if (!dateString) return "-";
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // // //         return date.toISOString().split('T')[0];
// // // //       }
// // // //       return dateString || "-";
// // // //     } catch (e) {
// // // //       console.error("Error parsing date:", e, dateString);
// // // //       return dateString || "-";
// // // //     }
// // // //   };

// // // //   const findDateField = (item) => {
// // // //     if (!item) return null;
// // // //     const dateKey = Object.keys(item).find(key =>
// // // //       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // // //     );
// // // //     return dateKey ? item[dateKey] : null;
// // // //   };

// // // //   // Filter data based on search term and date range
// // // //   const filteredData = uniqueEMailData.filter(item => {
// // // //     if (!item) return false;

// // // //     let passesDateFilter = true;
// // // //     if (dateRange.startDate && dateRange.endDate && item['IRD']) {
// // // //       const parsedDate = parseDate(item['IRD']);
// // // //       if (parsedDate) {
// // // //         passesDateFilter = parsedDate >= dateRange.startDate && parsedDate <= dateRange.endDate;
// // // //       } else {
// // // //         passesDateFilter = false;
// // // //       }
// // // //     }
// // // //     if (!passesDateFilter) return false;

// // // //     const searchLower = searchTerm.toLowerCase();
// // // //     const dateValue = findDateField(item);

// // // //     return (
// // // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // // //       (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
// // // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower)) ||
// // // //       (item['IRD'] && parseDate(item['IRD'])?.toLowerCase().includes(searchLower)) ||
// // // //       (item['Comments (ICSR, AOI, Not selected)'] && item['Comments (ICSR, AOI, Not selected)'].toLowerCase().includes(searchLower)) ||
// // // //       (item['Status'] && item['Status'].toLowerCase().includes(searchLower))
// // // //     );
// // // //   });

// // // //   // Sort data by IRD
// // // //   const sortedData = [...filteredData].sort((a, b) => {
// // // //     if (!sortOrder) return 0;
// // // //     const dateA = parseDate(a['IRD']);
// // // //     const dateB = parseDate(b['IRD']);

// // // //     if (!dateA && !dateB) return 0;
// // // //     if (!dateA) return sortOrder === 'asc' ? 1 : -1;
// // // //     if (!dateB) return sortOrder === 'asc' ? -1 : 1;

// // // //     const dateObjA = new Date(dateA);
// // // //     const dateObjB = new Date(dateB);

// // // //     return sortOrder === 'asc'
// // // //       ? dateObjA - dateObjB
// // // //       : dateObjB - dateObjA;
// // // //   });

// // // //   const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
// // // //   const totalPages = Math.ceil(sortedData.length / itemsPerPage);

// // // //   const truncateText = (text, maxLength = 30) => {
// // // //     if (!text) return "";
// // // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // // //   };

// // // //   const detailCurrentItems = selectedReviewData
// // // //     ? selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage)
// // // //     : [];
// // // //   const detailTotalPages = selectedReviewData ? Math.ceil(selectedReviewData.length / itemsPerPage) : 0;

// // // //   // Calculate pagination range
// // // //   const getPageNumbers = (current, total) => {
// // // //     const range = [];
// // // //     const delta = Math.floor(maxPageButtons / 2);

// // // //     let start = Math.max(1, current - delta);
// // // //     let end = Math.min(total, current + delta);

// // // //     if (end - start < maxPageButtons - 1) {
// // // //       if (start === 1) {
// // // //         end = Math.min(total, start + maxPageButtons - 1);
// // // //       } else if (end === total) {
// // // //         start = Math.max(1, end - maxPageButtons + 1);
// // // //       }
// // // //     }

// // // //     for (let i = start; i <= end; i++) {
// // // //       range.push(i);
// // // //     }

// // // //     return range;
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-white p-8">
// // // //       {!selectedReviewData ? (
// // // //         <>
// // // //           <div className="mb-8">
// // // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // // //           </div>

// // // //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
// // // //             <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md border border-[#15212d] shadow-sm">
// // // //               <Search size={20} className="text-gray-500 mr-2" />
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search by date, Mail, Title, Drug, IRD, Comments, Status..."
// // // //                 className="bg-transparent border-none outline-none w-full"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>

// // // //             <div className="relative">
// // // //               <button
// // // //                 onClick={() => setShowDateFilter(!showDateFilter)}
// // // //                 className="flex items-center bg-[#15212d] text-white px-3 py-2 rounded-md"
// // // //               >
// // // //                 <Calendar size={16} className="mr-2" /> Date Range
// // // //               </button>
// // // //               {showDateFilter && (
// // // //                 <div className="absolute right-0 top-full mt-2 bg-white p-4 rounded-md shadow-lg z-20 border border-gray-200 min-w-[300px]">
// // // //                   <div className="flex flex-col gap-3">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-[#15212d] mb-1">Start Date</label>
// // // //                       <input
// // // //                         type="date"
// // // //                         value={dateRange.startDate}
// // // //                         onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
// // // //                         className="w-full border border-gray-300 rounded-md p-2"
// // // //                       />
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-[#15212d] mb-1">End Date</label>
// // // //                       <input
// // // //                         type="date"
// // // //                         value={dateRange.endDate}
// // // //                         onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
// // // //                         className="w-full border border-gray-300 rounded-md p-2"
// // // //                       />
// // // //                     </div>
// // // //                     <div className="flex justify-end gap-2 mt-2">
// // // //                       <button
// // // //                         onClick={() => setShowDateFilter(false)}
// // // //                         className="px-3 py-1 text-sm bg-gray-200 rounded-md"
// // // //                       >
// // // //                         Cancel
// // // //                       </button>
// // // //                       <button
// // // //                         onClick={() => {
// // // //                           setShowDateFilter(false);
// // // //                           setCurrentPage(1);
// // // //                         }}
// // // //                         className="px-3 py-1 text-sm bg-[#15212d] text-white rounded-md"
// // // //                       >
// // // //                         Apply Filter
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {(dateRange.startDate && dateRange.endDate || searchTerm) && (
// // // //             <div className="mb-4 flex items-center flex-wrap gap-2">
// // // //               <span className="text-sm text-[#15212d] mr-2">Filtered by:</span>
// // // //               {searchTerm && (
// // // //                 <div className="bg-[#15212d] text-white text-xs px-3 py-1 rounded-full flex items-center">
// // // //                   <Search size={12} className="mr-1" />
// // // //                   Search: {searchTerm}
// // // //                   <button
// // // //                     onClick={() => {
// // // //                       setSearchTerm('');
// // // //                       searchParams.delete('searchTerm');
// // // //                       setSearchParams(searchParams);
// // // //                     }}
// // // //                     className="ml-2 text-white hover:text-red-200"
// // // //                   >
// // // //                     <X size={12} />
// // // //                   </button>
// // // //                 </div>
// // // //               )}
// // // //               {dateRange.startDate && dateRange.endDate && (
// // // //                 <div className="bg-[#15212d] text-white text-xs px-3 py-1 rounded-full flex items-center">
// // // //                   <Calendar size={12} className="mr-1" />
// // // //                   IRD: {dateRange.startDate} to {dateRange.endDate}
// // // //                   <button
// // // //                     onClick={() => setDateRange({ startDate: '', endDate: '' })}
// // // //                     className="ml-2 text-white hover:text-red-200"
// // // //                   >
// // // //                     <X size={12} />
// // // //                   </button>
// // // //                 </div>
// // // //               )}
// // // //               {(dateRange.startDate && dateRange.endDate || searchTerm) && (
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     setDateRange({ startDate: '', endDate: '' });
// // // //                     setSearchTerm('');
// // // //                     setSearchParams({});
// // // //                   }}
// // // //                   className="text-xs bg-[#15212d] text-white px-2 py-1 rounded-md flex items-center"
// // // //                 >
// // // //                   <X size={12} className="mr-1" /> Clear all filters
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           )}

// // // //           {loading ? (
// // // //             <div className="flex justify-center items-center h-64">
// // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // //             </div>
// // // //           ) : (
// // // //             <>
// // // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // // //                 <table className="min-w-full divide-y divide-gray-200">
// // // //                   <thead className="bg-[#15212d] text-white">
// // // //                     <tr>
// // // //                       <th
// // // //                         className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer"
// // // //                         onClick={() => {
// // // //                           setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
// // // //                           setCurrentPage(1);
// // // //                         }}
// // // //                       >
// // // //                         <div className="flex items-center">
// // // //                           IRD
// // // //                           {sortOrder && (
// // // //                             <svg
// // // //                               className="ml-1 w-4 h-4"
// // // //                               fill="none"
// // // //                               stroke="currentColor"
// // // //                               viewBox="0 0 24 24"
// // // //                               xmlns="http://www.w3.org/2000/svg"
// // // //                             >
// // // //                               <path
// // // //                                 strokeLinecap="round"
// // // //                                 strokeLinejoin="round"
// // // //                                 strokeWidth={2}
// // // //                                 d={sortOrder === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
// // // //                               />
// // // //                             </svg>
// // // //                           )}
// // // //                         </div>
// // // //                       </th>
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Comments (ICSR, AOI, Not selected)</th>
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // //                     {currentItems.map((item, idx) => {
// // // //                       const dateValue = findDateField(item);
// // // //                       return (
// // // //                         <tr key={idx} className="hover:bg-gray-50">
// // // //                           <td className="px-6 py-4 text-sm">{formatDate(item['IRD'])}</td>
// // // //                           <td className="px-6 py-4 text-sm">{formatDate(dateValue)}</td>
// // // //                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
// // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
// // // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // // //                           <td className="px-6 py-4 text-sm">{truncateText(item['Comments (ICSR, AOI, Not selected)']) || "-"}</td>
// // // //                           <td className="px-6 py-4 text-sm">{item.Status || "-"}</td>
// // // //                           <td className="px-6 py-4 text-sm">
// // // //                             <button
// // // //                               onClick={() => handleViewReview(item.Mail, dateValue ? new Date(dateValue) : null)}
// // // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // // //                             >
// // // //                               <Eye size={16} className="mr-1" /> View
// // // //                             </button>
// // // //                           </td>
// // // //                         </tr>
// // // //                       );
// // // //                     })}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>

// // // //               {sortedData.length > itemsPerPage && (
// // // //                 <div className="flex justify-between items-center mt-6">
// // // //                   <div className="text-sm text-gray-700">
// // // //                     Showing {currentItems.length} entries out of {sortedData.length} entries
// // // //                   </div>
// // // //                   <div className="flex space-x-1">
// // // //                     <button
// // // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // // //                       disabled={currentPage === 1}
// // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // //                     >
// // // //                       <ChevronLeft size={16} />
// // // //                     </button>
// // // //                     {getPageNumbers(currentPage, totalPages).map(page => (
// // // //                       <button
// // // //                         key={page}
// // // //                         onClick={() => setCurrentPage(page)}
// // // //                         className={`px-3 py-1 rounded-md ${
// // // //                           currentPage === page ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // //                         }`}
// // // //                       >
// // // //                         {page}
// // // //                       </button>
// // // //                     ))}
// // // //                     {totalPages > maxPageButtons && currentPage < totalPages - Math.floor(maxPageButtons / 2) && (
// // // //                       <span className="px-3 py-1">...</span>
// // // //                     )}
// // // //                     {totalPages > maxPageButtons && currentPage < totalPages && (
// // // //                       <button
// // // //                         onClick={() => setCurrentPage(totalPages)}
// // // //                         className={`px-3 py-1 rounded-md ${
// // // //                           currentPage === totalPages ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // //                         }`}
// // // //                       >
// // // //                         {totalPages}
// // // //                       </button>
// // // //                     )}
// // // //                     <button
// // // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // // //                       disabled={currentPage === totalPages}
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
// // // //       ) : (
// // // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // // //           <div className="flex justify-between items-center mb-4">
// // // //             <div className="flex space-x-2">
// // // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // // //               </button>
// // // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // // //                 <Edit size={16} className="mr-1" /> Edit
// // // //               </button>
// // // //               {editMode && (
// // // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // // //                   <Save size={16} className="mr-1" /> Save
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
// // // //           </div>

// // // //           {editMode && focusedCell.row !== null && (
// // // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // // //               </div>
// // // //               <textarea
// // // //                 className="w-full h-24 p-2 border rounded-md"
// // // //                 value={focusedCellValue}
// // // //                 onChange={(e) => {
// // // //                   setFocusedCellValue(e.target.value);
// // // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // // //                 }}
// // // //               />
// // // //             </div>
// // // //           )}

// // // //           {expandedCell && (
// // // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // // //                 <div className="flex justify-between items-center mb-4">
// // // //                   <h3 className="text-lg font-medium">
// // // //                     {editedReviewData[expandedCell.row] &&
// // // //                       Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // // //                   </h3>
// // // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // // //                     <X size={20} />
// // // //                   </button>
// // // //                 </div>
// // // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // // //                   {expandedCell.value || ""}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {loading ? (
// // // //             <div className="flex justify-center items-center h-64">
// // // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // // //             </div>
// // // //           ) : (
// // // //             <>
// // // //               <div className="overflow-auto max-h-[75vh]">
// // // //                 <table className="w-full border border-gray-300 text-sm">
// // // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // // //                     <tr>
// // // //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
// // // //                           {col}
// // // //                         </th>
// // // //                       ))}
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody>
// // // //                     {detailCurrentItems.map((row, rowIndex) => {
// // // //                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// // // //                       return (
// // // //                         <tr key={rowIndex} className="hover:bg-gray-50">
// // // //                           {Object.entries(row).map(([key, val], colIndex) => (
// // // //                             <td
// // // //                               key={colIndex}
// // // //                               className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // // //                               onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// // // //                               title="Click to view full content"
// // // //                               style={{ minWidth: '200px', maxWidth: '300px' }}
// // // //                             >
// // // //                               {editMode ? (
// // // //                                 <input
// // // //                                   className="w-full border p-2 text-xs"
// // // //                                   value={val || ''}
// // // //                                   onFocus={() => {
// // // //                                     setFocusedCell({ row: actualRowIndex, col: colIndex });
// // // //                                     setFocusedCellValue(val || '');
// // // //                                   }}
// // // //                                   onChange={(e) => {
// // // //                                     handleCellChange(actualRowIndex, key, e.target.value);
// // // //                                     if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // // //                                       setFocusedCellValue(e.target.value);
// // // //                                     }
// // // //                                   }}
// // // //                                 />
// // // //                               ) : (
// // // //                                 ['IRD', 'Validation Processing Date'].includes(key) ? formatDate(val) : truncateText(val, 25) || ''
// // // //                               )}
// // // //                             </td>
// // // //                           ))}
// // // //                         </tr>
// // // //                       );
// // // //                     })}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>

// // // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // // //                 <div className="flex justify-between items-center mt-6">
// // // //                   <div className="text-sm text-gray-700">
// // // //                     Showing {detailCurrentItems.length} entries out of {selectedReviewData.length} entries
// // // //                   </div>
// // // //                   <div className="flex space-x-1">
// // // //                     <button
// // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // // //                       disabled={detailCurrentPage === 1}
// // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // //                     >
// // // //                       <ChevronLeft size={16} />
// // // //                     </button>
// // // //                     {getPageNumbers(detailCurrentPage, detailTotalPages).map(page => (
// // // //                       <button
// // // //                         key={page}
// // // //                         onClick={() => setDetailCurrentPage(page)}
// // // //                         className={`px-3 py-1 rounded-md ${
// // // //                           detailCurrentPage === page ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // //                         }`}
// // // //                       >
// // // //                         {page}
// // // //                       </button>
// // // //                     ))}
// // // //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages - Math.floor(maxPageButtons / 2) && (
// // // //                       <span className="px-3 py-1">...</span>
// // // //                     )}
// // // //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages && (
// // // //                       <button
// // // //                         onClick={() => setDetailCurrentPage(detailTotalPages)}
// // // //                         className={`px-3 py-1 rounded-md ${
// // // //                           detailCurrentPage === detailTotalPages ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // // //                         }`}
// // // //                       >
// // // //                         {detailTotalPages}
// // // //                       </button>
// // // //                     )}
// // // //                     <button
// // // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // // //                       disabled={detailCurrentPage === detailTotalPages}
// // // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // // //                     >
// // // //                       <ChevronRight size={16} />
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default LiteratureReviewContent;
// // // import { useState, useEffect } from 'react';
// // // import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// // // import { Search, Eye, ArrowLeft, Edit, Save, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
// // // import DatabaseService from '../services/DatabaseService';

// // // const LiteratureReviewContent = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [searchParams, setSearchParams] = useSearchParams();
// // //   const [literatureData, setLiteratureData] = useState([]);
// // //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// // //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// // //   const [editedReviewData, setEditedReviewData] = useState(null);
// // //   const [selectedEMail, setSelectedEMail] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// // //   const [editMode, setEditMode] = useState(false);
// // //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// // //   const [focusedCellValue, setFocusedCellValue] = useState('');
// // //   const [expandedCell, setExpandedCell] = useState(null);
// // //   const [modifiedRows, setModifiedRows] = useState({});
// // //   const [sortOrder, setSortOrder] = useState('desc'); // Default to descending
// // //   const [dateRange, setDateRange] = useState({
// // //     startDate: searchParams.get('startDate') || '',
// // //     endDate: searchParams.get('endDate') || ''
// // //   });
// // //   const [showDateFilter, setShowDateFilter] = useState(false);

// // //   const itemsPerPage = 10;
// // //   const maxPageButtons = 5;

// // //   // Parse query parameters
// // //   const queryParams = new URLSearchParams(location.search);
// // //   const filterYear = parseInt(queryParams.get('year')) || new Date().getFullYear();
// // //   const filterStartMonth = parseInt(queryParams.get('startMonth')) || 1;
// // //   const filterEndMonth = parseInt(queryParams.get('endMonth')) || 12;
// // //   const filterType = queryParams.get('filterType');

// // //   // Update search params when filters change
// // //   useEffect(() => {
// // //     const newSearchParams = new URLSearchParams();
// // //     if (searchTerm) newSearchParams.set('searchTerm', searchTerm);
// // //     if (dateRange.startDate && dateRange.endDate) {
// // //       newSearchParams.set('startDate', dateRange.startDate);
// // //       newSearchParams.set('endDate', dateRange.endDate);
// // //     }
// // //     if (filterYear) newSearchParams.set('year', filterYear);
// // //     if (filterStartMonth) newSearchParams.set('startMonth', filterStartMonth);
// // //     if (filterEndMonth) newSearchParams.set('endMonth', filterEndMonth);
// // //     if (filterType) newSearchParams.set('filterType', filterType);
// // //     setSearchParams(newSearchParams, { replace: true });
// // //   }, [searchTerm, dateRange, filterYear, filterStartMonth, filterEndMonth, filterType, setSearchParams]);

// // //   // Parse date function
// // //   const parseDate = (dateString) => {
// // //     if (!dateString) return null;

// // //     if (typeof dateString === 'string') {
// // //       const monthNameRegex = /^([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})/;
// // //       let matches = dateString.match(monthNameRegex);

// // //       if (matches) {
// // //         const monthName = matches[1];
// // //         const day = parseInt(matches[2], 10);
// // //         const year = parseInt(matches[3], 10);

// // //         const monthMap = {
// // //           'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
// // //           'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
// // //         };

// // //         if (monthMap[monthName] !== undefined) {
// // //           const month = monthMap[monthName];
// // //           const date = new Date(year, month, day);
// // //           if (!isNaN(date.getTime())) {
// // //             return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
// // //           }
// // //         }
// // //       }

// // //       const ymdRegex = /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/;
// // //       matches = dateString.match(ymdRegex);

// // //       if (matches) {
// // //         const year = parseInt(matches[1], 10);
// // //         const month = parseInt(matches[2], 10);
// // //         const day = parseInt(matches[3], 10);

// // //         const date = new Date(year, month - 1, day);
// // //         if (!isNaN(date.getTime())) {
// // //           return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
// // //         }
// // //       }
// // //     }

// // //     try {
// // //       const date = new Date(dateString);
// // //       if (!isNaN(date.getTime())) {
// // //         const year = date.getFullYear();
// // //         const month = String(date.getMonth() + 1).padStart(2, '0');
// // //         const day = String(date.getDate()).padStart(2, '0');
// // //         return `${year}-${month}-${day}`;
// // //       }
// // //     } catch (e) {
// // //       console.error("Error parsing date:", e);
// // //     }

// // //     return null;
// // //   };

// // //   // Fetch data from database
// // //   const fetchLiteratureData = async () => {
// // //     try {
// // //       const data = await DatabaseService.fetchLiteratureReviews();

// // //       // Process data to get unique emails with date consideration
// // //       const eMailDateMap = new Map();
// // //       data.forEach(item => {
// // //         const dateFieldName = Object.keys(item).find(key =>
// // //           key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // //         );
// // //         const dateValue = dateFieldName ? item[dateFieldName] : null;
// // //         let year, month, formattedDate;

// // //         if (dateValue) {
// // //           const date = new Date(dateValue);
// // //           if (!isNaN(date.getTime())) {
// // //             year = date.getFullYear();
// // //             month = date.getMonth() + 1;
// // //             formattedDate = date.toISOString().split('T')[0];
// // //           }
// // //         }

// // //         // Apply year and month filters
// // //         if (year === filterYear && month >= filterStartMonth && month <= filterEndMonth) {
// // //           if (item.Mail && dateValue) {
// // //             const emailDateKey = filterType === 'uniqueEmailsWithDate'
// // //               ? `${item.Mail}_${formattedDate}`
// // //               : item.Mail;

// // //             if (!eMailDateMap.has(emailDateKey)) {
// // //               const uniqueItem = {
// // //                 id: item.id,
// // //                 Mail: item.Mail,
// // //                 Title: item.Title,
// // //                 Drug: item.Drug,
// // //                 [dateFieldName]: dateValue,
// // //                 IRD: item.IRD,
// // //                 'Comments (ICSR, AOI, Not selected)': item['Comments (ICSR, AOI, Not selected)'],
// // //                 Status: item.Status,
// // //                 ArticlePMID: item['Article PMID']
// // //               };
// // //               eMailDateMap.set(emailDateKey, uniqueItem);
// // //             }
// // //           }
// // //         }
// // //       });

// // //       const uniqueEMails = Array.from(eMailDateMap.values());
// // //       setLiteratureData(data);
// // //       setUniqueEMailData(uniqueEMails);
// // //       setLoading(false);
// // //     } catch (err) {
// // //       console.error("Error fetching literature review data:", err);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchLiteratureData();
// // //   }, [filterYear, filterStartMonth, filterEndMonth, filterType]);

// // //   // Handle view review
// // //   const handleViewReview = (eMail, date) => {
// // //     setSelectedEMail(eMail);
// // //     const filteredData = literatureData.filter(item => item.Mail === eMail && (!date || findDateField(item) === date));
// // //     setSelectedReviewData(filteredData);
// // //     setEditedReviewData(filteredData);

// // //     const queryParams = new URLSearchParams();
// // //     queryParams.set('searchTerm', eMail);
// // //     if (date) {
// // //       queryParams.set('validationDate', date.toISOString().split('T')[0]);
// // //     }
// // //     navigate(`/cases?${queryParams.toString()}`);
// // //   };

// // //   const handleCellChange = (rowIndex, key, value) => {
// // //     const newData = [...editedReviewData];
// // //     const oldValue = newData[rowIndex][key];
// // //     newData[rowIndex][key] = value;
// // //     setEditedReviewData(newData);

// // //     if (oldValue !== value) {
// // //       setModifiedRows(prev => ({
// // //         ...prev,
// // //         [rowIndex]: true
// // //       }));
// // //     }
// // //   };

// // //   const handleSave = async () => {
// // //     try {
// // //       setLoading(true);
// // //       let successCount = 0;
// // //       let errorCount = 0;

// // //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// // //         const rowIndex = parseInt(rowIndexStr);
// // //         const row = editedReviewData[rowIndex];
// // //         const recordId = row['Article PMID'];

// // //         if (!recordId) {
// // //           console.error("Row missing Article PMID:", row);
// // //           errorCount++;
// // //           continue;
// // //         }

// // //         try {
// // //           await DatabaseService.updateLiteratureReview(recordId, row);
// // //           successCount++;
// // //         } catch (rowErr) {
// // //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// // //           errorCount++;
// // //         }
// // //       }

// // //       setEditMode(false);
// // //       setLoading(false);
// // //       setModifiedRows({});

// // //       fetchLiteratureData();

// // //       if (selectedEMail) {
// // //         setTimeout(() => {
// // //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// // //           setSelectedReviewData(refreshedEMailData);
// // //           setEditedReviewData(refreshedEMailData);
// // //         }, 500);
// // //       }

// // //       if (errorCount > 0) {
// // //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// // //       } else if (successCount > 0) {
// // //         alert(`Successfully saved ${successCount} rows.`);
// // //       } else {
// // //         alert("No changes were made.");
// // //       }
// // //     } catch (err) {
// // //       console.error("Error in save operation:", err);
// // //       setLoading(false);
// // //       alert(`Error saving changes: ${err.message}`);
// // //     }
// // //   };

// // //   const closeReviewViewer = () => {
// // //     setSelectedReviewData(null);
// // //     setEditedReviewData(null);
// // //     setSelectedEMail(null);
// // //     setEditMode(false);
// // //     setFocusedCell({ row: null, col: null });
// // //     setFocusedCellValue('');
// // //     setExpandedCell(null);
// // //   };

// // //   const handleCellClick = (rowIndex, colIndex, value) => {
// // //     if (!editMode) {
// // //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// // //     }
// // //   };

// // //   const closeExpandedCell = () => {
// // //     setExpandedCell(null);
// // //   };

// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return "-";
// // //     try {
// // //       const date = new Date(dateString);
// // //       if (date instanceof Date && !isNaN(date.getTime())) {
// // //         return date.toISOString().split('T')[0];
// // //       }
// // //       return dateString || "-";
// // //     } catch (e) {
// // //       console.error("Error parsing date:", e, dateString);
// // //       return dateString || "-";
// // //     }
// // //   };

// // //   const findDateField = (item) => {
// // //     if (!item) return null;
// // //     const dateKey = Object.keys(item).find(key =>
// // //       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// // //     );
// // //     return dateKey ? item[dateKey] : null;
// // //   };

// // //   // Handle date filter application
// // //   const handleApplyDateFilter = () => {
// // //     setShowDateFilter(false);
// // //     setCurrentPage(1); // Reset to page 1 when applying filter
// // //   };

// // //   // Filter data based on search term and date range
// // //   const filteredData = uniqueEMailData.filter(item => {
// // //     if (!item) return false;

// // //     let passesDateFilter = true;
// // //     if (dateRange.startDate && dateRange.endDate && item['IRD']) {
// // //       const parsedDate = parseDate(item['IRD']);
// // //       if (parsedDate) {
// // //         passesDateFilter = parsedDate >= dateRange.startDate && parsedDate <= dateRange.endDate;
// // //       } else {
// // //         passesDateFilter = false;
// // //       }
// // //     }
// // //     if (!passesDateFilter) return false;

// // //     const searchLower = searchTerm.toLowerCase();
// // //     const dateValue = findDateField(item);

// // //     return (
// // //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// // //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// // //       (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
// // //       (item.Drug && item.Drug.toLowerCase().includes(searchLower)) ||
// // //       (item['IRD'] && parseDate(item['IRD'])?.toLowerCase().includes(searchLower)) ||
// // //       (item['Comments (ICSR, AOI, Not selected)'] && item['Comments (ICSR, AOI, Not selected)'].toLowerCase().includes(searchLower)) ||
// // //       (item['Status'] && item['Status'].toLowerCase().includes(searchLower))
// // //     );
// // //   });

// // //   // Sort data by IRD
// // //   const sortedData = [...filteredData].sort((a, b) => {
// // //     if (!sortOrder) return 0;
// // //     const dateA = parseDate(a['IRD']);
// // //     const dateB = parseDate(b['IRD']);

// // //     if (!dateA && !dateB) return 0;
// // //     if (!dateA) return sortOrder === 'asc' ? 1 : -1;
// // //     if (!dateB) return sortOrder === 'asc' ? -1 : 1;

// // //     const dateObjA = new Date(dateA);
// // //     const dateObjB = new Date(dateB);

// // //     return sortOrder === 'asc'
// // //       ? dateObjA - dateObjB
// // //       : dateObjB - dateObjA;
// // //   });

// // //   const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
// // //   const totalPages = Math.ceil(sortedData.length / itemsPerPage);

// // //   const truncateText = (text, maxLength = 30) => {
// // //     if (!text) return "";
// // //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// // //   };

// // //   const detailCurrentItems = selectedReviewData
// // //     ? selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage)
// // //     : [];
// // //   const detailTotalPages = selectedReviewData ? Math.ceil(selectedReviewData.length / itemsPerPage) : 0;

// // //   // Calculate pagination range
// // //   const getPageNumbers = (current, total) => {
// // //     const range = [];
// // //     const delta = Math.floor(maxPageButtons / 2);

// // //     let start = Math.max(1, current - delta);
// // //     let end = Math.min(total, current + delta);

// // //     if (end - start < maxPageButtons - 1) {
// // //       if (start === 1) {
// // //         end = Math.min(total, start + maxPageButtons - 1);
// // //       } else if (end === total) {
// // //         start = Math.max(1, end - maxPageButtons + 1);
// // //       }
// // //     }

// // //     for (let i = start; i <= end; i++) {
// // //       range.push(i);
// // //     }

// // //     return range;
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-white p-8">
// // //       {!selectedReviewData ? (
// // //         <>
// // //           <div className="mb-8">
// // //             <h1 className="text-3xl font-bold text-[#15212d]">Literature Review</h1>
// // //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// // //           </div>

// // //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
// // //             <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md border border-[#15212d] shadow-sm">
// // //               <Search size={20} className="text-gray-500 mr-2" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search by date, Mail, Title, Drug, IRD, Comments, Status..."
// // //                 className="bg-transparent border-none outline-none w-full"
// // //                 value={searchTerm}
// // //                 onChange={(e) => {
// // //                   setSearchTerm(e.target.value);
// // //                   setCurrentPage(1); // Reset page on search
// // //                 }}
// // //               />
// // //             </div>

// // //             <div className="relative">
// // //               <button
// // //                 onClick={() => setShowDateFilter(!showDateFilter)}
// // //                 className="flex items-center bg-[#15212d] text-white px-3 py-2 rounded-md"
// // //               >
// // //                 <Calendar size={16} className="mr-2" /> Date Range
// // //               </button>
// // //               {showDateFilter && (
// // //                 <div className="absolute right-0 top-full mt-2 bg-white p-4 rounded-md shadow-lg z-20 border border-gray-200 min-w-[300px]">
// // //                   <div className="flex flex-col gap-3">
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-[#15212d] mb-1">Start Date</label>
// // //                       <input
// // //                         type="date"
// // //                         value={dateRange.startDate}
// // //                         onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
// // //                         className="w-full border border-gray-300 rounded-md p-2"
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-[#15212d] mb-1">End Date</label>
// // //                       <input
// // //                         type="date"
// // //                         value={dateRange.endDate}
// // //                         onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
// // //                         className="w-full border border-gray-300 rounded-md p-2"
// // //                       />
// // //                     </div>
// // //                     <div className="flex justify-end gap-2 mt-2">
// // //                       <button
// // //                         onClick={() => setShowDateFilter(false)}
// // //                         className="px-3 py-1 text-sm bg-gray-200 rounded-md"
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                       <button
// // //                         onClick={handleApplyDateFilter}
// // //                         className="px-3 py-1 text-sm bg-[#15212d] text-white rounded-md"
// // //                       >
// // //                         Apply Filter
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {(dateRange.startDate && dateRange.endDate || searchTerm) && (
// // //             <div className="mb-4 flex items-center flex-wrap gap-2">
// // //               <span className="text-sm text-[#15212d] mr-2">Filtered by:</span>
// // //               {searchTerm && (
// // //                 <div className="bg-[#15212d] text-white text-xs px-3 py-1 rounded-full flex items-center">
// // //                   <Search size={12} className="mr-1" />
// // //                   Search: {searchTerm}
// // //                   <button
// // //                     onClick={() => {
// // //                       setSearchTerm('');
// // //                       setCurrentPage(1);
// // //                       searchParams.delete('searchTerm');
// // //                       setSearchParams(searchParams);
// // //                     }}
// // //                     className="ml-2 text-white hover:text-red-200"
// // //                   >
// // //                     <X size={12} />
// // //                   </button>
// // //                 </div>
// // //               )}
// // //               {dateRange.startDate && dateRange.endDate && (
// // //                 <div className="bg-[#15212d] text-white text-xs px-3 py-1 rounded-full flex items-center">
// // //                   <Calendar size={12} className="mr-1" />
// // //                   IRD: {dateRange.startDate} to {dateRange.endDate}
// // //                   <button
// // //                     onClick={() => {
// // //                       setDateRange({ startDate: '', endDate: '' });
// // //                       setCurrentPage(1);
// // //                     }}
// // //                     className="ml-2 text-white hover:text-red-200"
// // //                   >
// // //                     <X size={12} />
// // //                   </button>
// // //                 </div>
// // //               )}
// // //               {(dateRange.startDate && dateRange.endDate || searchTerm) && (
// // //                 <button
// // //                   onClick={() => {
// // //                     setDateRange({ startDate: '', endDate: '' });
// // //                     setSearchTerm('');
// // //                     setCurrentPage(1);
// // //                     setSearchParams({});
// // //                   }}
// // //                   className="text-xs bg-[#15212d] text-white px-2 py-1 rounded-md flex items-center"
// // //                 >
// // //                   <X size={12} className="mr-1" /> Clear all filters
// // //                 </button>
// // //               )}
// // //             </div>
// // //           )}

// // //           {loading ? (
// // //             <div className="flex justify-center items-center h-64">
// // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // //             </div>
// // //           ) : sortedData.length === 0 ? (
// // //             <div className="text-center text-gray-600 mt-8">
// // //               No entries match the applied filters.
// // //             </div>
// // //           ) : (
// // //             <>
// // //               <div className="bg-white rounded-lg shadow overflow-hidden">
// // //                 <table className="min-w-full divide-y divide-gray-200">
// // //                   <thead className="bg-[#15212d] text-white">
// // //                     <tr>
// // //                       <th
// // //                         className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer"
// // //                         onClick={() => {
// // //                           setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
// // //                           setCurrentPage(1);
// // //                         }}
// // //                       >
// // //                         <div className="flex items-center">
// // //                           IRD
// // //                           {sortOrder && (
// // //                             <svg
// // //                               className="ml-1 w-4 h-4"
// // //                               fill="none"
// // //                               stroke="currentColor"
// // //                               viewBox="0 0 24 24"
// // //                               xmlns="http://www.w3.org/2000/svg"
// // //                             >
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d={sortOrder === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
// // //                               />
// // //                             </svg>
// // //                           )}
// // //                         </div>
// // //                       </th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Comments (ICSR, AOI, Not selected)</th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody className="bg-white divide-y divide-gray-200">
// // //                     {currentItems.map((item, idx) => {
// // //                       const dateValue = findDateField(item);
// // //                       return (
// // //                         <tr key={idx} className="hover:bg-gray-50">
// // //                           <td className="px-6 py-4 text-sm">{formatDate(item['IRD'])}</td>
// // //                           <td className="px-6 py-4 text-sm">{formatDate(dateValue)}</td>
// // //                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
// // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
// // //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// // //                           <td className="px-6 py-4 text-sm">{truncateText(item['Comments (ICSR, AOI, Not selected)']) || "-"}</td>
// // //                           <td className="px-6 py-4 text-sm">{item.Status || "-"}</td>
// // //                           <td className="px-6 py-4 text-sm">
// // //                             <button
// // //                               onClick={() => handleViewReview(item.Mail, dateValue ? new Date(dateValue) : null)}
// // //                               className="flex items-center text-blue-600 hover:text-blue-900"
// // //                             >
// // //                               <Eye size={16} className="mr-1" /> View
// // //                             </button>
// // //                           </td>
// // //                         </tr>
// // //                       );
// // //                     })}
// // //                   </tbody>
// // //                 </table>
// // //               </div>

// // //               <div className="flex justify-between items-center mt-6">
// // //                 <div className="text-sm text-gray-700">
// // //                   Showing {currentItems.length} entries out of {sortedData.length} entries
// // //                 </div>
// // //                 {sortedData.length > itemsPerPage && (
// // //                   <div className="flex space-x-1">
// // //                     <button
// // //                       onClick={() => setCurrentPage(currentPage - 1)}
// // //                       disabled={currentPage === 1}
// // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // //                     >
// // //                       <ChevronLeft size={16} />
// // //                     </button>
// // //                     {getPageNumbers(currentPage, totalPages).map(page => (
// // //                       <button
// // //                         key={page}
// // //                         onClick={() => setCurrentPage(page)}
// // //                         className={`px-3 py-1 rounded-md ${
// // //                           currentPage === page ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // //                         }`}
// // //                       >
// // //                         {page}
// // //                       </button>
// // //                     ))}
// // //                     {totalPages > maxPageButtons && currentPage < totalPages - Math.floor(maxPageButtons / 2) && (
// // //                       <span className="px-4 py-1">...</span>
// // //                     )}
// // //                     {totalPages > maxPageButtons && currentPage < totalPages && (
// // //                       <button
// // //                         onClick={() => setCurrentPage(totalPages)}
// // //                         className={`px-3 py-1 rounded-md ${
// // //                           currentPage === totalPages ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // //                         }`}
// // //                       >
// // //                         {totalPages}
// // //                       </button>
// // //                     )}
// // //                     <button
// // //                       onClick={() => setCurrentPage(currentPage + 1)}
// // //                       disabled={currentPage === totalPages}
// // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // //                     >
// // //                       <ChevronRight size={16} />
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </>
// // //           )}
// // //         </>
// // //       ) : (
// // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // //           <div className="flex justify-between items-center mb-4">
// // //             <div className="flex space-x-2">
// // //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// // //                 <ArrowLeft size={16} className="mr-1" /> Back
// // //               </button>
// // //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// // //                 <Edit size={16} className="mr-1" /> Edit
// // //               </button>
// // //               {editMode && (
// // //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// // //                   <Save size={16} className="mr-1" /> Save
// // //                 </button>
// // //               )}
// // //             </div>
// // //             <h3 className="text-xl font-medium text-[#15212d]">Records for: {selectedEMail}</h3>
// // //           </div>

// // //           {editMode && focusedCell.row !== null && (
// // //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// // //               <div className="mb-2 text-sm font-medium text-gray-800">
// // //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// // //               </div>
// // //               <textarea
// // //                 className="w-full h-24 p-2 border rounded-md"
// // //                 value={focusedCellValue}
// // //                 onChange={(e) => {
// // //                   setFocusedCellValue(e.target.value);
// // //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// // //                 }}
// // //               />
// // //             </div>
// // //           )}

// // //           {expandedCell && (
// // //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// // //                 <div className="flex justify-between items-center mb-4">
// // //                   <h3 className="text-lg font-medium">
// // //                     {editedReviewData[expandedCell.row] &&
// // //                       Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// // //                   </h3>
// // //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// // //                     <X size={20} />
// // //                   </button>
// // //                 </div>
// // //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// // //                   {expandedCell.value || ""}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {loading ? (
// // //             <div className="flex justify-center items-center h-64">
// // //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15212d]"></div>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               <div className="overflow-auto max-h-[75vh]">
// // //                 <table className="w-full border border-gray-300 text-sm">
// // //                   <thead className="bg-[#15212d] text-white sticky top-0">
// // //                     <tr>
// // //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// // //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
// // //                           {col}
// // //                         </th>
// // //                       ))}
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody>
// // //                     {detailCurrentItems.map((row, rowIndex) => {
// // //                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// // //                       return (
// // //                         <tr key={rowIndex} className="hover:bg-gray-50">
// // //                           {Object.entries(row).map(([key, val], colIndex) => (
// // //                             <td
// // //                               key={colIndex}
// // //                               className="border px-4 py-2 text-xs truncate cursor-pointer hover:bg-gray-100"
// // //                               onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// // //                               title="Click to view full content"
// // //                               style={{ minWidth: '200px', maxWidth: '300px' }}
// // //                             >
// // //                               {editMode ? (
// // //                                 <input
// // //                                   className="w-full border p-2 text-xs"
// // //                                   value={val || ''}
// // //                                   onFocus={() => {
// // //                                     setFocusedCell({ row: actualRowIndex, col: colIndex });
// // //                                     setFocusedCellValue(val || '');
// // //                                   }}
// // //                                   onChange={(e) => {
// // //                                     handleCellChange(actualRowIndex, key, e.target.value);
// // //                                     if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// // //                                       setFocusedCellValue(e.target.value);
// // //                                     }
// // //                                   }}
// // //                                 />
// // //                               ) : (
// // //                                 ['IRD', 'Validation Processing Date'].includes(key) ? formatDate(val) : truncateText(val, 25) || ''
// // //                               )}
// // //                             </td>
// // //                           ))}
// // //                         </tr>
// // //                       );
// // //                     })}
// // //                   </tbody>
// // //                 </table>
// // //               </div>

// // //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// // //                 <div className="flex justify-between items-center mt-6">
// // //                   <div className="text-sm text-gray-700">
// // //                     Showing {detailCurrentItems.length} entries out of {selectedReviewData.length} entries
// // //                   </div>
// // //                   <div className="flex space-x-1">
// // //                     <button
// // //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// // //                       disabled={detailCurrentPage === 1}
// // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // //                     >
// // //                       <ChevronLeft size={16} />
// // //                     </button>
// // //                     {getPageNumbers(detailCurrentPage, detailTotalPages).map(page => (
// // //                       <button
// // //                         key={page}
// // //                         onClick={() => setDetailCurrentPage(page)}
// // //                         className={`px-3 py-1 rounded-md ${
// // //                           detailCurrentPage === page ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // //                         }`}
// // //                       >
// // //                         {page}
// // //                       </button>
// // //                     ))}
// // //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages - Math.floor(maxPageButtons / 2) && (
// // //                       <span className="px-4 py-1">...</span>
// // //                     )}
// // //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages && (
// // //                       <button
// // //                         onClick={() => setDetailCurrentPage(detailTotalPages)}
// // //                         className={`px-3 py-1 rounded-md ${
// // //                           detailCurrentPage === detailTotalPages ? 'bg-[#15212d] text-white' : 'bg-gray-200'
// // //                         }`}
// // //                       >
// // //                         {detailTotalPages}
// // //                       </button>
// // //                     )}
// // //                     <button
// // //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// // //                       disabled={detailCurrentPage === detailTotalPages}
// // //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// // //                     >
// // //                       <ChevronRight size={16} />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default LiteratureReviewContent;

// // import { useState, useEffect } from 'react';
// // import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// // import { Search, Eye, ArrowLeft, Edit, Save, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
// // import DatabaseService from '../services/DatabaseService';

// // const LiteratureReviewContent = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const [literatureData, setLiteratureData] = useState([]);
// //   const [uniqueEMailData, setUniqueEMailData] = useState([]);
// //   const [selectedReviewData, setSelectedReviewData] = useState(null);
// //   const [editedReviewData, setEditedReviewData] = useState(null);
// //   const [selectedEMail, setSelectedEMail] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
// //   const [editMode, setEditMode] = useState(false);
// //   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
// //   const [focusedCellValue, setFocusedCellValue] = useState('');
// //   const [expandedCell, setExpandedCell] = useState(null);
// //   const [modifiedRows, setModifiedRows] = useState({});
// //   const [sortOrder, setSortOrder] = useState('desc'); // Default to descending
// //   const [dateRange, setDateRange] = useState({
// //     startDate: searchParams.get('startDate') || '',
// //     endDate: searchParams.get('endDate') || ''
// //   });
// //   const [showDateFilter, setShowDateFilter] = useState(false);

// //   const itemsPerPage = 10;
// //   const maxPageButtons = 5;

// //   // Parse query parameters
// //   const queryParams = new URLSearchParams(location.search);
// //   const filterYear = parseInt(queryParams.get('year')) || new Date().getFullYear();
// //   const filterStartMonth = parseInt(queryParams.get('startMonth')) || 1;
// //   const filterEndMonth = parseInt(queryParams.get('endMonth')) || 12;
// //   const filterType = queryParams.get('filterType');

// //   // Update search params when filters change
// //   useEffect(() => {
// //     const newSearchParams = new URLSearchParams();
// //     if (searchTerm) newSearchParams.set('searchTerm', searchTerm);
// //     if (dateRange.startDate && dateRange.endDate) {
// //       newSearchParams.set('startDate', dateRange.startDate);
// //       newSearchParams.set('endDate', dateRange.endDate);
// //     }
// //     if (filterYear) newSearchParams.set('year', filterYear);
// //     if (filterStartMonth) newSearchParams.set('startMonth', filterStartMonth);
// //     if (filterEndMonth) newSearchParams.set('endMonth', filterEndMonth);
// //     if (filterType) newSearchParams.set('filterType', filterType);
// //     setSearchParams(newSearchParams, { replace: true });
// //   }, [searchTerm, dateRange, filterYear, filterStartMonth, filterEndMonth, filterType, setSearchParams]);

// //   // Parse date function
// //   const parseDate = (dateString) => {
// //     if (!dateString) return null;

// //     if (typeof dateString === 'string') {
// //       const monthNameRegex = /^([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})/;
// //       let matches = dateString.match(monthNameRegex);

// //       if (matches) {
// //         const monthName = matches[1];
// //         const day = parseInt(matches[2], 10);
// //         const year = parseInt(matches[3], 10);

// //         const monthMap = {
// //           'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
// //           'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
// //         };

// //         if (monthMap[monthName] !== undefined) {
// //           const month = monthMap[monthName];
// //           const date = new Date(year, month, day);
// //           if (!isNaN(date.getTime())) {
// //             return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
// //           }
// //         }
// //       }

// //       const ymdRegex = /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/;
// //       matches = dateString.match(ymdRegex);

// //       if (matches) {
// //         const year = parseInt(matches[1], 10);
// //         const month = parseInt(matches[2], 10);
// //         const day = parseInt(matches[3], 10);

// //         const date = new Date(year, month - 1, day);
// //         if (!isNaN(date.getTime())) {
// //           return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
// //         }
// //       }
// //     }

// //     try {
// //       const date = new Date(dateString);
// //       if (!isNaN(date.getTime())) {
// //         const year = date.getFullYear();
// //         const month = String(date.getMonth() + 1).padStart(2, '0');
// //         const day = String(date.getDate()).padStart(2, '0');
// //         return `${year}-${month}-${day}`;
// //       }
// //     } catch (e) {
// //       console.error("Error parsing date:", e);
// //     }

// //     return null;
// //   };

// //   // Fetch data from database
// //   const fetchLiteratureData = async () => {
// //     try {
// //       const data = await DatabaseService.fetchLiteratureReviews();

// //       // Process data to get unique emails with date consideration
// //       const eMailDateMap = new Map();
// //       data.forEach(item => {
// //         const dateFieldName = Object.keys(item).find(key =>
// //           key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// //         );
// //         const dateValue = dateFieldName ? item[dateFieldName] : null;
// //         let year, month, formattedDate;

// //         if (dateValue) {
// //           const date = new Date(dateValue);
// //           if (!isNaN(date.getTime())) {
// //             year = date.getFullYear();
// //             month = date.getMonth() + 1;
// //             formattedDate = date.toISOString().split('T')[0];
// //           }
// //         }

// //         // Apply year and month filters
// //         if (year === filterYear && month >= filterStartMonth && month <= filterEndMonth) {
// //           if (item.Mail && dateValue) {
// //             const emailDateKey = filterType === 'uniqueEmailsWithDate'
// //               ? `${item.Mail}_${formattedDate}`
// //               : item.Mail;

// //             if (!eMailDateMap.has(emailDateKey)) {
// //               const uniqueItem = {
// //                 id: item.id,
// //                 Mail: item.Mail,
// //                 Title: item.Title,
// //                 Drug: item.Drug,
// //                 [dateFieldName]: dateValue,
// //                 IRD: item.IRD,
// //                 'Comments (ICSR, AOI, Not selected)': item['Comments (ICSR, AOI, Not selected)'],
// //                 Status: item.Status,
// //                 ArticlePMID: item['Article PMID']
// //               };
// //               eMailDateMap.set(emailDateKey, uniqueItem);
// //             }
// //           }
// //         }
// //       });

// //       const uniqueEMails = Array.from(eMailDateMap.values());
// //       setLiteratureData(data);
// //       setUniqueEMailData(uniqueEMails);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error("Error fetching literature review data:", err);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLiteratureData();
// //   }, [filterYear, filterStartMonth, filterEndMonth, filterType]);

// //   // Handle view review
// //   const handleViewReview = (eMail, date) => {
// //     setSelectedEMail(eMail);
// //     const filteredData = literatureData.filter(item => item.Mail === eMail && (!date || findDateField(item) === date));
// //     setSelectedReviewData(filteredData);
// //     setEditedReviewData(filteredData);

// //     const queryParams = new URLSearchParams();
// //     queryParams.set('searchTerm', eMail);
// //     if (date) {
// //       queryParams.set('validationDate', date.toISOString().split('T')[0]);
// //     }
// //     navigate(`/cases?${queryParams.toString()}`);
// //   };

// //   const handleCellChange = (rowIndex, key, value) => {
// //     const newData = [...editedReviewData];
// //     const oldValue = newData[rowIndex][key];
// //     newData[rowIndex][key] = value;
// //     setEditedReviewData(newData);

// //     if (oldValue !== value) {
// //       setModifiedRows(prev => ({
// //         ...prev,
// //         [rowIndex]: true
// //       }));
// //     }
// //   };

// //   const handleSave = async () => {
// //     try {
// //       setLoading(true);
// //       let successCount = 0;
// //       let errorCount = 0;

// //       for (const rowIndexStr of Object.keys(modifiedRows)) {
// //         const rowIndex = parseInt(rowIndexStr);
// //         const row = editedReviewData[rowIndex];
// //         const recordId = row['Article PMID'];

// //         if (!recordId) {
// //           console.error("Row missing Article PMID:", row);
// //           errorCount++;
// //           continue;
// //         }

// //         try {
// //           await DatabaseService.updateLiteratureReview(recordId, row);
// //           successCount++;
// //         } catch (rowErr) {
// //           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
// //           errorCount++;
// //         }
// //       }

// //       setEditMode(false);
// //       setLoading(false);
// //       setModifiedRows({});

// //       fetchLiteratureData();

// //       if (selectedEMail) {
// //         setTimeout(() => {
// //           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
// //           setSelectedReviewData(refreshedEMailData);
// //           setEditedReviewData(refreshedEMailData);
// //         }, 500);
// //       }

// //       if (errorCount > 0) {
// //         alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
// //       } else if (successCount > 0) {
// //         alert(`Successfully saved ${successCount} rows.`);
// //       } else {
// //         alert("No changes were made.");
// //       }
// //     } catch (err) {
// //       console.error("Error in save operation:", err);
// //       setLoading(false);
// //       alert(`Error saving changes: ${err.message}`);
// //     }
// //   };

// //   const closeReviewViewer = () => {
// //     setSelectedReviewData(null);
// //     setEditedReviewData(null);
// //     setSelectedEMail(null);
// //     setEditMode(false);
// //     setFocusedCell({ row: null, col: null });
// //     setFocusedCellValue('');
// //     setExpandedCell(null);
// //   };

// //   const handleCellClick = (rowIndex, colIndex, value) => {
// //     if (!editMode) {
// //       setExpandedCell({ row: rowIndex, col: colIndex, value });
// //     }
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
// //       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
// //     );
// //     return dateKey ? item[dateKey] : null;
// //   };

// //   // Handle date filter application
// //   const handleApplyDateFilter = () => {
// //     setShowDateFilter(false);
// //     setCurrentPage(1); // Reset to page 1 when applying filter
// //   };

// //   // Filter data based on search term and date range
// //   const filteredData = uniqueEMailData.filter(item => {
// //     if (!item) return false;

// //     let passesDateFilter = true;
// //     if (dateRange.startDate && dateRange.endDate && item['IRD']) {
// //       const parsedDate = parseDate(item['IRD']);
// //       if (parsedDate) {
// //         passesDateFilter = parsedDate >= dateRange.startDate && parsedDate <= dateRange.endDate;
// //       } else {
// //         passesDateFilter = false;
// //       }
// //     }
// //     if (!passesDateFilter) return false;

// //     const searchLower = searchTerm.toLowerCase();
// //     const dateValue = findDateField(item);

// //     return (
// //       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
// //       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
// //       (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
// //       (item.Drug && item.Drug.toLowerCase().includes(searchLower)) ||
// //       (item['IRD'] && parseDate(item['IRD'])?.toLowerCase().includes(searchLower)) ||
// //       (item['Comments (ICSR, AOI, Not selected)'] && item['Comments (ICSR, AOI, Not selected)'].toLowerCase().includes(searchLower)) ||
// //       (item['Status'] && item['Status'].toLowerCase().includes(searchLower))
// //     );
// //   });

// //   // Sort data by IRD
// //   const sortedData = [...filteredData].sort((a, b) => {
// //     if (!sortOrder) return 0;
// //     const dateA = parseDate(a['IRD']);
// //     const dateB = parseDate(b['IRD']);

// //     if (!dateA && !dateB) return 0;
// //     if (!dateA) return sortOrder === 'asc' ? 1 : -1;
// //     if (!dateB) return sortOrder === 'asc' ? -1 : 1;

// //     const dateObjA = new Date(dateA);
// //     const dateObjB = new Date(dateB);

// //     return sortOrder === 'asc'
// //       ? dateObjA - dateObjB
// //       : dateObjB - dateObjA;
// //   });

// //   const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
// //   const totalPages = Math.ceil(sortedData.length / itemsPerPage);

// //   const truncateText = (text, maxLength = 30) => {
// //     if (!text) return "";
// //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// //   };

// //   const detailCurrentItems = selectedReviewData
// //     ? selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage)
// //     : [];
// //   const detailTotalPages = selectedReviewData ? Math.ceil(selectedReviewData.length / itemsPerPage) : 0;

// //   // Calculate pagination range
// //   const getPageNumbers = (current, total) => {
// //     const range = [];
// //     const delta = Math.floor(maxPageButtons / 2);

// //     let start = Math.max(1, current - delta);
// //     let end = Math.min(total, current + delta);

// //     if (end - start < maxPageButtons - 1) {
// //       if (start === 1) {
// //         end = Math.min(total, start + maxPageButtons - 1);
// //       } else if (end === total) {
// //         start = Math.max(1, end - maxPageButtons + 1);
// //       }
// //     }

// //     for (let i = start; i <= end; i++) {
// //       range.push(i);
// //     }

// //     return range;
// //   };

// //   return (
// //     <div className="min-h-screen bg-white p-8">
// //       {!selectedReviewData ? (
// //         <>
// //           <div className="mb-8">
// //             <h1 className="text-3xl font-bold text-[#14242c]">Literature Review</h1>
// //             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
// //           </div>

// //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
// //             <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md border border-[#14242c] shadow-sm">
// //               <Search size={20} className="text-gray-500 mr-2" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by Mail, Title, Drug, IRD, Comments, Status..."
// //                 className="bg-transparent border-none outline-none w-full"
// //                 value={searchTerm}
// //                 onChange={(e) => {
// //                   setSearchTerm(e.target.value);
// //                   setCurrentPage(1); // Reset page on search
// //                 }}
// //               />
// //             </div>

// //             <div className="relative">
// //               <button
// //                 onClick={() => setShowDateFilter(!showDateFilter)}
// //                 className="flex items-center bg-[#14242c] text-white px-3 py-2 rounded-md"
// //               >
// //                 <Calendar size={16} className="mr-2" /> Date Range
// //               </button>
// //               {showDateFilter && (
// //                 <div className="absolute right-0 top-full mt-2 bg-white p-4 rounded-md shadow-lg z-20 border border-gray-200 min-w-[300px]">
// //                   <div className="flex flex-col gap-3">
// //                     <div>
// //                       <label className="block text-sm font-medium text-[#14242c] mb-1">Start Date</label>
// //                       <input
// //                         type="date"
// //                         value={dateRange.startDate}
// //                         onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
// //                         className="w-full border border-gray-300 rounded-md p-2"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-[#14242c] mb-1">End Date</label>
// //                       <input
// //                         type="date"
// //                         value={dateRange.endDate}
// //                         onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
// //                         className="w-full border border-gray-300 rounded-md p-2"
// //                       />
// //                     </div>
// //                     <div className="flex justify-end gap-2 mt-2">
// //                       <button
// //                         onClick={() => setShowDateFilter(false)}
// //                         className="px-3 py-1 text-sm bg-gray-200 rounded-md"
// //                       >
// //                         Cancel
// //                       </button>
// //                       <button
// //                         onClick={handleApplyDateFilter}
// //                         className="px-3 py-1 text-sm bg-[#14242c] text-white rounded-md"
// //                       >
// //                         Apply Filter
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {(dateRange.startDate && dateRange.endDate || searchTerm) && (
// //             <div className="mb-4 flex items-center flex-wrap gap-2">
// //               <span className="text-sm text-[#14242c] mr-2">Filtered by:</span>
// //               {searchTerm && (
// //                 <div className="bg-[#14242c] text-white text-xs px-3 py-1 rounded-full flex items-center">
// //                   <Search size={12} className="mr-1" />
// //                   Search: {searchTerm}
// //                   <button
// //                     onClick={() => {
// //                       setSearchTerm('');
// //                       setCurrentPage(1);
// //                       searchParams.delete('searchTerm');
// //                       setSearchParams(searchParams);
// //                     }}
// //                     className="ml-2 text-white hover:text-red-200"
// //                   >
// //                     <X size={12} />
// //                   </button>
// //                 </div>
// //               )}
// //               {dateRange.startDate && dateRange.endDate && (
// //                 <div className="bg-[#14242c] text-white text-xs px-3 py-1 rounded-full flex items-center">
// //                   <Calendar size={12} className="mr-1" />
// //                   IRD: {dateRange.startDate} to {dateRange.endDate}
// //                   <button
// //                     onClick={() => {
// //                       setDateRange({ startDate: '', endDate: '' });
// //                       setCurrentPage(1);
// //                     }}
// //                     className="ml-2 text-white hover:text-red-200"
// //                   >
// //                     <X size={12} />
// //                   </button>
// //                 </div>
// //               )}
// //               {(dateRange.startDate && dateRange.endDate || searchTerm) && (
// //                 <button
// //                   onClick={() => {
// //                     setDateRange({ startDate: '', endDate: '' });
// //                     setSearchTerm('');
// //                     setCurrentPage(1);
// //                     setSearchParams({});
// //                   }}
// //                   className="text-xs bg-[#14242c] text-white px-2 py-1 rounded-md flex items-center"
// //                 >
// //                   <X size={12} className="mr-1" /> Clear all filters
// //                 </button>
// //               )}
// //             </div>
// //           )}

// //           {loading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14242c]"></div>
// //             </div>
// //           ) : sortedData.length === 0 ? (
// //             <div className="text-center text-gray-600 mt-8">
// //               No entries match the applied filters.
// //             </div>
// //           ) : (
// //             <>
// //               <div className="bg-white rounded-lg shadow overflow-hidden">
// //                 <table className="min-w-full divide-y divide-gray-200">
// //                   <thead className="text-white" style={{ backgroundColor: '#14242c' }}>
// //                     <tr>
// //                       <th
// //                         className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer"
// //                         onClick={() => {
// //                           setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
// //                           setCurrentPage(1);
// //                         }}
// //                       >
// //                         <div className="flex items-center">
// //                           IRD
// //                           {sortOrder && (
// //                             <svg
// //                               className="ml-1 w-4 h-4"
// //                               fill="none"
// //                               stroke="currentColor"
// //                               viewBox="0 0 24 24"
// //                               xmlns="http://www.w3.org/2000/svg"
// //                             >
// //                               <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 strokeWidth={2}
// //                                 d={sortOrder === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
// //                               />
// //                             </svg>
// //                           )}
// //                         </div>
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Comments (ICSR, AOI, Not selected)</th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-200">
// //                     {currentItems.map((item, idx) => {
// //                       const dateValue = findDateField(item);
// //                       return (
// //                         <tr key={idx} className="hover:bg-gray-50">
// //                           <td className="px-6 py-4 text-sm">{formatDate(item['IRD'])}</td>
// //                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
// //                           <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
// //                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
// //                           <td className="px-6 py-4 text-sm">{truncateText(item['Comments (ICSR, AOI, Not selected)']) || "-"}</td>
// //                           <td className="px-6 py-4 text-sm">{item.Status || "-"}</td>
// //                           <td className="px-6 py-4 text-sm">
// //                             <button
// //                               onClick={() => handleViewReview(item.Mail, dateValue ? new Date(dateValue) : null)}
// //                               className="flex items-center text-blue-600 hover:text-blue-900"
// //                             >
// //                               <Eye size={16} className="mr-1" /> View
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               <div className="flex justify-between items-center mt-6">
// //                 <div className="text-sm text-gray-700">
// //                   Showing {currentItems.length} entries out of {sortedData.length} entries
// //                 </div>
// //                 {sortedData.length > itemsPerPage && (
// //                   <div className="flex space-x-1">
// //                     <button
// //                       onClick={() => setCurrentPage(currentPage - 1)}
// //                       disabled={currentPage === 1}
// //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// //                     >
// //                       <ChevronLeft size={16} />
// //                     </button>
// //                     {getPageNumbers(currentPage, totalPages).map(page => (
// //                       <button
// //                         key={page}
// //                         onClick={() => setCurrentPage(page)}
// //                         className={`px-3 py-1 rounded-md ${
// //                           currentPage === page ? 'bg-[#14242c] text-white' : 'bg-gray-200'
// //                         }`}
// //                       >
// //                         {page}
// //                       </button>
// //                     ))}
// //                     {totalPages > maxPageButtons && currentPage < totalPages - Math.floor(maxPageButtons / 2) && (
// //                       <span className="px-4 py-1">...</span>
// //                     )}
// //                     {totalPages > maxPageButtons && currentPage < totalPages && (
// //                       <button
// //                         onClick={() => setCurrentPage(totalPages)}
// //                         className={`px-3 py-1 rounded-md ${
// //                           currentPage === totalPages ? 'bg-[#14242c] text-white' : 'bg-gray-200'
// //                         }`}
// //                       >
// //                         {totalPages}
// //                       </button>
// //                     )}
// //                     <button
// //                       onClick={() => setCurrentPage(currentPage + 1)}
// //                       disabled={currentPage === totalPages}
// //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// //                     >
// //                       <ChevronRight size={16} />
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </>
// //           )}
// //         </>
// //       ) : (
// //         <div className="bg-white p-4 rounded-lg shadow-lg">
// //           <div className="flex justify-between items-center mb-4">
// //             <div className="flex space-x-2">
// //               <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
// //                 <ArrowLeft size={16} className="mr-1" /> Back
// //               </button>
// //               <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
// //                 <Edit size={16} className="mr-1" /> Edit
// //               </button>
// //               {editMode && (
// //                 <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
// //                   <Save size={16} className="mr-1" /> Save
// //                 </button>
// //               )}
// //             </div>
// //             <h3 className="text-xl font-medium text-[#14242c]">Records for: {selectedEMail}</h3>
// //           </div>

// //           {editMode && focusedCell.row !== null && (
// //             <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
// //               <div className="mb-2 text-sm font-medium text-gray-800">
// //                 Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
// //               </div>
// //               <textarea
// //                 className="w-full h-24 p-2 border rounded-md"
// //                 value={focusedCellValue}
// //                 onChange={(e) => {
// //                   setFocusedCellValue(e.target.value);
// //                   handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
// //                 }}
// //               />
// //             </div>
// //           )}

// //           {expandedCell && (
// //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //               <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h3 className="text-lg font-medium">
// //                     {editedReviewData[expandedCell.row] &&
// //                       Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
// //                   </h3>
// //                   <button onClick={closeExpandedCell} className="text-gray-500 hover:text-gray-700">
// //                     <X size={20} />
// //                   </button>
// //                 </div>
// //                 <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
// //                   {expandedCell.value || ""}
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {loading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14242c]"></div>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="overflow-auto max-h-[75vh]">
// //                 <table className="w-full border border-gray-300 text-sm">
// //                   <thead className="text-white sticky top-0" style={{ backgroundColor: '#14242c' }}>
// //                     <tr>
// //                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
// //                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
// //                           {col}
// //                         </th>
// //                       ))}
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {detailCurrentItems.map((row, rowIndex) => {
// //                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
// //                       return (
// //                         <tr key={rowIndex} className="hover:bg-gray-50">
// //                           {Object.entries(row).map(([key, val], colIndex) => (
// //                             <td
// //                               key={colIndex}
// //                               className="border px-4 py-2 text-sm truncate cursor-pointer hover:bg-gray-100 rounded"
// //                               onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
// //                               title="Click to view full content"
// //                               style={{ minWidth: '200px', maxWidth: '300px' }}
// //                             >
// //                               {editMode ? (
// //                                 <input
// //                                   className="w-full border p-2 text-sm"
// //                                   value={val || ''}
// //                                   onFocus={() => {
// //                                     setFocusedCell({ row: actualRowIndex, col: colIndex });
// //                                     setFocusedCellValue(val || '');
// //                                   }}
// //                                   onChange={(e) => {
// //                                     handleCellChange(actualRowIndex, key, e.target.value);
// //                                     if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
// //                                       setFocusedCellValue(e.target.value);
// //                                     }
// //                                   }}
// //                                 />
// //                               ) : (
// //                                 ['IRD', 'Validation Processing Date'].includes(key) ? formatDate(val) : truncateText(val, 25) || ''
// //                               )}
// //                             </td>
// //                           ))}
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
// //                 <div className="flex justify-between items-center mt-6">
// //                   <div className="text-sm text-gray-700">
// //                     Showing {detailCurrentItems.length} entries out of {selectedReviewData.length} entries
// //                   </div>
// //                   <div className="flex space-x-1">
// //                     <button
// //                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
// //                       disabled={detailCurrentPage === 1}
// //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// //                     >
// //                       <ChevronLeft size={16} />
// //                     </button>
// //                     {getPageNumbers(detailCurrentPage, detailTotalPages).map(page => (
// //                       <button
// //                         key={page}
// //                         onClick={() => setDetailCurrentPage(page)}
// //                         className={`px-3 py-1 rounded-md ${
// //                           detailCurrentPage === page ? 'bg-[#14242c] text-white' : 'bg-gray-200'
// //                         }`}
// //                       >
// //                         {page}
// //                       </button>
// //                     ))}
// //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages - Math.floor(maxPageButtons / 2) && (
// //                       <span className="px-4 py-1">...</span>
// //                     )}
// //                     {detailTotalPages > maxPageButtons && detailCurrentPage < detailTotalPages && (
// //                       <button
// //                         onClick={() => setDetailCurrentPage(detailTotalPages)}
// //                         className={`px-3 py-1 rounded-md ${
// //                           detailCurrentPage === detailTotalPages ? 'bg-[#14242c] text-white' : 'bg-gray-200'
// //                         }`}
// //                       >
// //                         {detailTotalPages}
// //                       </button>
// //                     )}
// //                     <button
// //                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
// //                       disabled={detailCurrentPage === detailTotalPages}
// //                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
// //                     >
// //                       <ChevronRight size={16} />
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default LiteratureReviewContent;
// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// import { Search, Eye, ArrowLeft, Edit, Save, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
// import DatabaseService from '../services/DatabaseService';

// const LiteratureReviewContent = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [literatureData, setLiteratureData] = useState([]);
//   const [uniqueEMailData, setUniqueEMailData] = useState([]);
//   const [selectedReviewData, setSelectedReviewData] = useState(null);
//   const [editedReviewData, setEditedReviewData] = useState(null);
//   const [selectedEMail, setSelectedEMail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [detailCurrentPage, setDetailCurrentPage] = useState(1);
//   const [editMode, setEditMode] = useState(false);
//   const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
//   const [focusedCellValue, setFocusedCellValue] = useState('');
//   const [expandedCell, setExpandedCell] = useState(null);
//   const [modifiedRows, setModifiedRows] = useState({});
//   const [sortOrder, setSortOrder] = useState('desc'); // Default to descending
//   const [dateRange, setDateRange] = useState({
//     startDate: searchParams.get('startDate') || '',
//     endDate: searchParams.get('endDate') || ''
//   });
//   const [showDateFilter, setShowDateFilter] = useState(false);
//   const [itemsPerPage, setItemsPerPage] = useState(10); // New state for items per page
//   const maxPageButtons = 5;

//   // Parse query parameters
//   const queryParams = new URLSearchParams(location.search);
//   const filterYear = parseInt(queryParams.get('year')) || new Date().getFullYear();
//   const filterStartMonth = parseInt(queryParams.get('startMonth')) || 1;
//   const filterEndMonth = parseInt(queryParams.get('endMonth')) || 12;
//   const filterType = queryParams.get('filterType');

//   // Update search params when filters change
//   useEffect(() => {
//     const newSearchParams = new URLSearchParams();
//     if (searchTerm) newSearchParams.set('searchTerm', searchTerm);
//     if (dateRange.startDate && dateRange.endDate) {
//       newSearchParams.set('startDate', dateRange.startDate);
//       newSearchParams.set('endDate', dateRange.endDate);
//     }
//     if (filterYear) newSearchParams.set('year', filterYear);
//     if (filterStartMonth) newSearchParams.set('startMonth', filterStartMonth);
//     if (filterEndMonth) newSearchParams.set('endMonth', filterEndMonth);
//     if (filterType) newSearchParams.set('filterType', filterType);
//     setSearchParams(newSearchParams, { replace: true });
//   }, [searchTerm, dateRange, filterYear, filterStartMonth, filterEndMonth, filterType, setSearchParams]);

//   // Parse date function
//   const parseDate = (dateString) => {
//     if (!dateString) return null;

//     if (typeof dateString === 'string') {
//       const monthNameRegex = /^([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})/;
//       let matches = dateString.match(monthNameRegex);

//       if (matches) {
//         const monthName = matches[1];
//         const day = parseInt(matches[2], 10);
//         const year = parseInt(matches[3], 10);

//         const monthMap = {
//           'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
//           'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
//         };

//         if (monthMap[monthName] !== undefined) {
//           const month = monthMap[monthName];
//           const date = new Date(year, month, day);
//           if (!isNaN(date.getTime())) {
//             return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//           }
//         }
//       }

//       const ymdRegex = /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/;
//       matches = dateString.match(ymdRegex);

//       if (matches) {
//         const year = parseInt(matches[1], 10);
//         const month = parseInt(matches[2], 10);
//         const day = parseInt(matches[3], 10);

//         const date = new Date(year, month - 1, day);
//         if (!isNaN(date.getTime())) {
//           return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//         }
//       }
//     }

//     try {
//       const date = new Date(dateString);
//       if (!isNaN(date.getTime())) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       }
//     } catch (e) {
//       console.error("Error parsing date:", e);
//     }

//     return null;
//   };

//   // Fetch data from database
//   const fetchLiteratureData = async () => {
//     try {
//       const data = await DatabaseService.fetchLiteratureReviews();

//       // Process data to get unique emails with date consideration
//       const eMailDateMap = new Map();
//       data.forEach(item => {
//         const dateFieldName = Object.keys(item).find(key =>
//           key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
//         );
//         const dateValue = dateFieldName ? item[dateFieldName] : null;
//         let year, month, formattedDate;

//         if (dateValue) {
//           const date = new Date(dateValue);
//           if (!isNaN(date.getTime())) {
//             year = date.getFullYear();
//             month = date.getMonth() + 1;
//             formattedDate = date.toISOString().split('T')[0];
//           }
//         }

//         // Apply year and month filters
//         if (year === filterYear && month >= filterStartMonth && month <= filterEndMonth) {
//           if (item.Mail && dateValue) {
//             const emailDateKey = filterType === 'uniqueEmailsWithDate'
//               ? `${item.Mail}_${formattedDate}`
//               : item.Mail;

//             if (!eMailDateMap.has(emailDateKey)) {
//               const uniqueItem = {
//                 id: item.id,
//                 Mail: item.Mail,
//                 Title: item.Title,
//                 Drug: item.Drug,
//                 [dateFieldName]: dateValue,
//                 IRD: item.IRD,
//                 'Comments (ICSR, AOI, Not selected)': item['Comments (ICSR, AOI, Not selected)'],
//                 Status: item.Status,
//                 ArticlePMID: item['Article PMID']
//               };
//               eMailDateMap.set(emailDateKey, uniqueItem);
//             }
//           }
//         }
//       });

//       const uniqueEMails = Array.from(eMailDateMap.values());
//       setLiteratureData(data);
//       setUniqueEMailData(uniqueEMails);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching literature review data:", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLiteratureData();
//   }, [filterYear, filterStartMonth, filterEndMonth, filterType]);

//   // Handle view review
//   const handleViewReview = (eMail, date) => {
//     setSelectedEMail(eMail);
//     const filteredData = literatureData.filter(item => item.Mail === eMail && (!date || findDateField(item) === date));
//     setSelectedReviewData(filteredData);
//     setEditedReviewData(filteredData);

//     const queryParams = new URLSearchParams();
//     queryParams.set('searchTerm', eMail);
//     if (date) {
//       queryParams.set('validationDate', date.toISOString().split('T')[0]);
//     }
//     navigate(`/cases?${queryParams.toString()}`);
//   };

//   const handleCellChange = (rowIndex, key, value) => {
//     const newData = [...editedReviewData];
//     const oldValue = newData[rowIndex][key];
//     newData[rowIndex][key] = value;
//     setEditedReviewData(newData);

//     if (oldValue !== value) {
//       setModifiedRows(prev => ({
//         ...prev,
//         [rowIndex]: true
//       }));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       let successCount = 0;
//       let errorCount = 0;

//       for (const rowIndexStr of Object.keys(modifiedRows)) {
//         const rowIndex = parseInt(rowIndexStr);
//         const row = editedReviewData[rowIndex];
//         const recordId = row['Article PMID'];

//         if (!recordId) {
//           console.error("Row missing Article PMID:", row);
//           errorCount++;
//           continue;
//         }

//         try {
//           await DatabaseService.updateLiteratureReview(recordId, row);
//           successCount++;
//         } catch (rowErr) {
//           console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
//           errorCount++;
//         }
//       }

//       setEditMode(false);
//       setLoading(false);
//       setModifiedRows({});

//       fetchLiteratureData();

//       if (selectedEMail) {
//         setTimeout(() => {
//           const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
//           setSelectedReviewData(refreshedEMailData);
//           setEditedReviewData(refreshedEMailData);
//         }, 500);
//       }

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

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     try {
//       const date = new Date(dateString);
//       if (date instanceof Date && !isNaN(date.getTime())) {
//         return date.toISOString().split('T')[0];
//       }
//       return dateString || "-";
//     } catch (e) {
//       console.error("Error parsing date:", e, dateString);
//       return dateString || "-";
//     }
//   };

//   const findDateField = (item) => {
//     if (!item) return null;
//     const dateKey = Object.keys(item).find  (key =>
//       key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
//     );
//     return dateKey ? item[dateKey] : null;
//   };

//   // Handle date filter application
//   const handleApplyDateFilter = () => {
//     setShowDateFilter(false);
//     setCurrentPage(1); // Reset to page 1 when applying filter
//   };

//   // Filter data based on search term and date range
//   const filteredData = uniqueEMailData.filter(item => {
//     if (!item) return false;

//     let passesDateFilter = true;
//     if (dateRange.startDate && dateRange.endDate && item['IRD']) {
//       const parsedDate = parseDate(item['IRD']);
//       if (parsedDate) {
//         passesDateFilter = parsedDate >= dateRange.startDate && parsedDate <= dateRange.endDate;
//       } else {
//         passesDateFilter = false;
//       }
//     }
//     if (!passesDateFilter) return false;

//     const searchLower = searchTerm.toLowerCase();
//     const dateValue = findDateField(item);

//     return (
//       (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
//       (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
//       (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
//       (item.Drug && item.Drug.toLowerCase().includes(searchLower)) ||
//       (item['IRD'] && parseDate(item['IRD'])?.toLowerCase().includes(searchLower)) ||
//       (item['Comments (ICSR, AOI, Not selected)'] && item['Comments (ICSR, AOI, Not selected)'].toLowerCase().includes(searchLower)) ||
//       (item['Status'] && item['Status'].toLowerCase().includes(searchLower))
//     );
//   });

//   // Sort data by IRD
//   const sortedData = [...filteredData].sort((a, b) => {
//     if (!sortOrder) return 0;
//     const dateA = parseDate(a['IRD']);
//     const dateB = parseDate(b['IRD']);

//     if (!dateA && !dateB) return 0;
//     if (!dateA) return sortOrder === 'asc' ? 1 : -1;
//     if (!dateB) return sortOrder === 'asc' ? -1 : 1;

//     const dateObjA = new Date(dateA);
//     const dateObjB = new Date(dateB);

//     return sortOrder === 'asc'
//       ? dateObjA - dateObjB
//       : dateObjB - dateObjA;
//   });

//   const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);

//   const truncateText = (text, maxLength = 30) => {
//     if (!text) return "";
//     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
//   };

//   const detailCurrentItems = selectedReviewData
//     ? selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage)
//     : [];
//   const detailTotalPages = selectedReviewData ? Math.ceil(selectedReviewData.length / itemsPerPage) : 0;

//   // Calculate pagination range
//   const getPageNumbers = (current, total) => {
//     if (total <= maxPageButtons) {
//       return Array.from({ length: total }, (_, i) => i + 1);
//     }

//     const range = [];
//     const delta = Math.floor(maxPageButtons / 2);
//     let start = Math.max(1, current - delta);
//     let end = Math.min(total, start + maxPageButtons - 1);

//     if (end - start < maxPageButtons - 1) {
//       start = Math.max(1, end - maxPageButtons + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       range.push(i);
//     }

//     return range;
//   };

//   return (
//     <div className="min-h-screen bg-white p-8">
//       {!selectedReviewData ? (
//         <>
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-[#14242c]">Literature Review</h1>
//             <p className="text-gray-600 mt-2">View and analyze literature review data</p>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md border border-[#14242c] shadow-sm">
//               <Search size={20} className="text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search by Mail, Title, Drug, IRD, Comments, Status..."
//                 className="bg-transparent border-none outline-none w-full"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1); // Reset page on search
//                 }}
//               />
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <button
//                   onClick={() => setShowDateFilter(!showDateFilter)}
//                   className="flex items-center bg-[#14242c] text-white px-3 py-2 rounded-md"
//                 >
//                   <Calendar size={16} className="mr-2" /> Date Range
//                 </button>
//                 {showDateFilter && (
//                   <div className="absolute right-0 top-full mt-2 bg-white p-4 rounded-md shadow-lg z-20 border border-gray-200 min-w-[300px]">
//                     <div className="flex flex-col gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-[#14242c] mb-1">Start Date</label>
//                         <input
//                           type="date"
//                           value={dateRange.startDate}
//                           onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
//                           className="w-full border border-gray-300 rounded-md p-2"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-[#14242c] mb-1">End Date</label>
//                         <input
//                           type="date"
//                           value={dateRange.endDate}
//                           onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
//                           className="w-full border border-gray-300 rounded-md p-2"
//                         />
//                       </div>
//                       <div className="flex justify-end gap-2 mt-2">
//                         <button
//                           onClick={() => setShowDateFilter(false)}
//                           className="px-3 py-1 text-sm bg-gray-200 rounded-md"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleApplyDateFilter}
//                           className="px-3 py-1 text-sm bg-[#14242c] text-white rounded-md"
//                         >
//                           Apply Filter
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="flex items-center">
//                 <label className="text-sm text-[#14242c] mr-2">Rows per page:</label>
//                 <select
//                   value={itemsPerPage}
//                   onChange={(e) => {
//                     setItemsPerPage(Number(e.target.value));
//                     setCurrentPage(1); // Reset to page 1 when changing items per page
//                   }}
//                   className="border border-gray-300 rounded-md p-1"
//                 >
//                   <option value={5}>5</option>
//                   <option value={10}>10</option>
//                   <option value={20}>20</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                   <option value={150}>150</option>
//                   <option value={200}>200</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {(dateRange.startDate && dateRange.endDate || searchTerm) && (
//             <div className="mb-4 flex items-center flex-wrap gap-2">
//               <span className="text-sm text-[#14242c] mr-2">Filtered by:</span>
//               {searchTerm && (
//                 <div className="bg-[#14242c] text-white text-xs px-3 py-1 rounded-full flex items-center">
//                   <Search size={12} className="mr-1" />
//                   Search: {searchTerm}
//                   <button
//                     onClick={() => {
//                       setSearchTerm('');
//                       setCurrentPage(1);
//                       searchParams.delete('searchTerm');
//                       setSearchParams(searchParams);
//                     }}
//                     className="ml-2 text-white hover:text-red-200"
//                   >
//                     <X size={12} />
//                   </button>
//                 </div>
//               )}
//               {dateRange.startDate && dateRange.endDate && (
//                 <div className="bg-[#14242c] text-white text-xs px-3 py-1 rounded-full flex items-center">
//                   <Calendar size={12} className="mr-1" />
//                   IRD: {dateRange.startDate} to {dateRange.endDate}
//                   <button
//                     onClick={() => {
//                       setDateRange({ startDate: '', endDate: '' });
//                       setCurrentPage(1);
//                     }}
//                     className="ml-2 text-white hover:text-red-200"
//                   >
//                     <X size={12} />
//                   </button>
//                 </div>
//               )}
//               {(dateRange.startDate && dateRange.endDate || searchTerm) && (
//                 <button
//                   onClick={() => {
//                     setDateRange({ startDate: '', endDate: '' });
//                     setSearchTerm('');
//                     setCurrentPage(1);
//                     setSearchParams({});
//                   }}
//                   className="text-xs bg-[#14242c] text-white px-2 py-1 rounded-md flex items-center"
//                 >
//                   <X size={12} className="mr-1" /> Clear all filters
//                 </button>
//               )}
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14242c]"></div>
//             </div>
//           ) : sortedData.length === 0 ? (
//             <div className="text-center text-gray-600 mt-8">
//               No entries match the applied filters.
//             </div>
//           ) : (
//             <>
//               <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="text-white" style={{ backgroundColor: '#14242c' }}>
//                     <tr>
//                       <th
//                         className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer"
//                         onClick={() => {
//                           setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
//                           setCurrentPage(1);
//                         }}
//                       >
//                         <div className="flex items-center">
//                           IRD
//                           {sortOrder && (
//                             <svg
//                               className="ml-1 w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d={sortOrder === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
//                               />
//                             </svg>
//                           )}
//                         </div>
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Comments (ICSR, AOI, Not selected)</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {currentItems.map((item, idx) => {
//                       const dateValue = findDateField(item);
//                       return (
//                         <tr key={idx} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 text-sm">{formatDate(item['IRD'])}</td>
//                           <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
//                           <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
//                           <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
//                           <td className="px-6 py-4 text-sm">{truncateText(item['Comments (ICSR, AOI, Not selected)']) || "-"}</td>
//                           <td className="px-6 py-4 text-sm">{item.Status || "-"}</td>
//                           <td className="px-6 py-4 text-sm">
//                             <button
//                               onClick={() => handleViewReview(item.Mail, dateValue ? new Date(dateValue) : null)}
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

//               <div className="flex justify-between items-center mt-6">
//                 <div className="text-sm text-gray-700">
//                   Showing {currentItems.length} entries out of {sortedData.length} entries
//                 </div>
//                 {sortedData.length > itemsPerPage && (
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
//                     >
//                       <ChevronLeft size={16} />
//                     </button>
//                     {getPageNumbers(currentPage, totalPages).map(page => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className={`px-3 py-1 rounded-md ${
//                           currentPage === page ? 'bg-[#14242c] text-white' : 'bg-gray-200'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
//                     >
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>
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
//             <h3 className="text-xl font-medium text-[#14242c]">Records for: {selectedEMail}</h3>
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
//                       Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
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
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14242c]"></div>
//             </div>
//           ) : (
//             <>
//               <div className="flex items-center mb-4">
//                 <label className="text-sm text-[#14242c] mr-2">Rows per page:</label>
//                 <select
//                   value={itemsPerPage}
//                   onChange={(e) => {
//                     setItemsPerPage(Number(e.target.value));
//                     setDetailCurrentPage(1); // Reset to page 1 when changing items per page
//                   }}
//                   className="border border-gray-300 rounded-md p-1"
//                 >
//                   <option value={5}>5</option>
//                   <option value={10}>10</option>
//                   <option value={20}>20</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                   <option value={150}>150</option>
//                   <option value={200}>200</option>
//                 </select>
//               </div>

//               <div className="overflow-auto max-h-[75vh]">
//                 <table className="w-full border border-gray-300 text-sm">
//                   <thead className="text-white sticky top-0" style={{ backgroundColor: '#14242c' }}>
//                     <tr>
//                       {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
//                         <th key={idx} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
//                           {col}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {detailCurrentItems.map((row, rowIndex) => {
//                       const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
//                       return (
//                         <tr key={rowIndex} className="hover:bg-gray-50">
//                           {Object.entries(row).map(([key, val], colIndex) => (
//                             <td
//                               key={colIndex}
//                               className="border px-4 py-2 text-sm truncate cursor-pointer hover:bg-gray-100 rounded"
//                               onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
//                               title="Click to view full content"
//                               style={{ minWidth: '200px', maxWidth: '300px' }}
//                             >
//                               {editMode ? (
//                                 <input
//                                   className="w-full border p-2 text-sm"
//                                   value={val || ''}
//                                   onFocus={() => {
//                                     setFocusedCell({ row: actualRowIndex, col: colIndex });
//                                     setFocusedCellValue(val || '');
//                                   }}
//                                   onChange={(e) => {
//                                     handleCellChange(actualRowIndex, key, e.target.value);
//                                     if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
//                                       setFocusedCellValue(e.target.value);
//                                     }
//                                   }}
//                                 />
//                               ) : (
//                                 ['IRD', 'Validation Processing Date'].includes(key) ? formatDate(val) : truncateText(val, 25) || ''
//                               )}
//                             </td>
//                           ))}
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               {selectedReviewData && selectedReviewData.length > itemsPerPage && (
//                 <div className="flex justify-between items-center mt-6">
//                   <div className="text-sm text-gray-700">
//                     Showing {detailCurrentItems.length} entries out of {selectedReviewData.length} entries
//                   </div>
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
//                       disabled={detailCurrentPage === 1}
//                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
//                     >
//                       <ChevronLeft size={16} />
//                     </button>
//                     {getPageNumbers(detailCurrentPage, detailTotalPages).map(page => (
//                       <button
//                         key={page}
//                         onClick={() => setDetailCurrentPage(page)}
//                         className={`px-3 py-1 rounded-md ${
//                           detailCurrentPage === page ? 'bg-[#14242c] text-white' : 'bg-gray-200'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
//                       disabled={detailCurrentPage === detailTotalPages}
//                       className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
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
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Search, Eye, ArrowLeft, Edit, Save, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import DatabaseService from '../services/DatabaseService';

const LiteratureReviewContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [literatureData, setLiteratureData] = useState([]);
  const [filteredEMailData, setFilteredEMailData] = useState([]);
  const [selectedReviewData, setSelectedReviewData] = useState(null);
  const [editedReviewData, setEditedReviewData] = useState(null);
  const [selectedEMail, setSelectedEMail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [detailCurrentPage, setDetailCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
  const [focusedCellValue, setFocusedCellValue] = useState('');
  const [expandedCell, setExpandedCell] = useState(null);
  const [modifiedRows, setModifiedRows] = useState({});
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || ''
  });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const maxPageButtons = 5;

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const filterYear = parseInt(queryParams.get('year')) || new Date().getFullYear();
  const filterStartMonth = parseInt(queryParams.get('startMonth')) || 1;
  const filterEndMonth = parseInt(queryParams.get('endMonth')) || 12;
  const filterType = queryParams.get('filterType');

  // Update search params when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (searchTerm) newSearchParams.set('searchTerm', searchTerm);
    if (dateRange.startDate && dateRange.endDate) {
      newSearchParams.set('startDate', dateRange.startDate);
      newSearchParams.set('endDate', dateRange.endDate);
    }
    if (filterYear) newSearchParams.set('year', filterYear);
    if (filterStartMonth) newSearchParams.set('startMonth', filterStartMonth);
    if (filterEndMonth) newSearchParams.set('endMonth', filterEndMonth);
    if (filterType) newSearchParams.set('filterType', filterType);
    setSearchParams(newSearchParams, { replace: true });
  }, [searchTerm, dateRange, filterYear, filterStartMonth, filterEndMonth, filterType, setSearchParams]);

  // Parse date function
  const parseDate = (dateString) => {
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
  };

  // Fetch data from database
 const fetchLiteratureData = async () => {
  try {
    const data = await DatabaseService.fetchLiteratureReviews();

    // Track unique IRD and Mail combinations
    const uniquePairs = new Set();

    // Filter data by year and month, then ensure unique IRD and Mail
    const filteredEmails = data
      .filter(item => {
        const dateFieldName = Object.keys(item).find(key =>
          key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
        );
        const dateValue = dateFieldName ? item[dateFieldName] : null;
        let year, month;

        if (dateValue) {
          const date = new Date(dateValue);
          if (!isNaN(date.getTime())) {
            year = date.getFullYear();
            month = date.getMonth() + 1;
          }
        }

        // Apply year and month filters
        return (
          year === filterYear &&
          month >= filterStartMonth &&
          month <= filterEndMonth &&
          item.Mail
        );
      })
      .filter(item => {
        const ird = parseDate(item.IRD) || ''; // Normalize IRD for consistency
        const mail = item.Mail || '';
        const pairKey = `${ird}|${mail}`; // Create a unique key for the pair

        // Only include if this pair hasn't been seen before
        if (!uniquePairs.has(pairKey)) {
          uniquePairs.add(pairKey);
          return true;
        }
        return false;
      })
      .map(item => ({
        id: item.id,
        Mail: item.Mail,
        Title: item.Title,
        Drug: item.Drug,
        [Object.keys(item).find(key => key.toLowerCase().includes('validation') && key.toLowerCase().includes('date'))]:
          item[Object.keys(item).find(key => key.toLowerCase().includes('validation') && key.toLowerCase().includes('date'))],
        IRD: item.IRD,
        'Comments (ICSR, AOI, Not selected)': item['Comments (ICSR, AOI, Not selected)'],
        Status: item.Status,
        ArticlePMID: item['Article PMID']
      }));

    setLiteratureData(data);
    setFilteredEMailData(filteredEmails);
    setLoading(false);
  } catch (err) {
    console.error("Error fetching literature review data:", err);
    setLoading(false);
  }
};
  useEffect(() => {
    fetchLiteratureData();
  }, [filterYear, filterStartMonth, filterEndMonth, filterType]);

  // Handle view review
  const handleViewReview = (item, date) => {
    setSelectedEMail(item.Mail);
    const filteredData = literatureData.filter(data => data.Mail === item.Mail && (!date || findDateField(data) === date));
    setSelectedReviewData(filteredData);
    setEditedReviewData(filteredData);

    const queryParams = new URLSearchParams();
    queryParams.set('searchTerm', item.Mail);
    if (date) {
      queryParams.set('validationDate', date.toISOString().split('T')[0]);
    }
    navigate(`/cases?${queryParams.toString()}`);
  };

  const handleCellChange = (rowIndex, key, value) => {
    const newData = [...editedReviewData];
    const oldValue = newData[rowIndex][key];
    newData[rowIndex][key] = value;
    setEditedReviewData(newData);

    if (oldValue !== value) {
      setModifiedRows(prev => ({
        ...prev,
        [rowIndex]: true
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let successCount = 0;
      let errorCount = 0;

      for (const rowIndexStr of Object.keys(modifiedRows)) {
        const rowIndex = parseInt(rowIndexStr);
        const row = editedReviewData[rowIndex];
        const recordId = row['Article PMID'];

        if (!recordId) {
          console.error("Row missing Article PMID:", row);
          errorCount++;
          continue;
        }

        try {
          await DatabaseService.updateLiteratureReview(recordId, row);
          successCount++;
        } catch (rowErr) {
          console.error(`Failed to save row with Article PMID ${recordId}:`, rowErr);
          errorCount++;
        }
      }

      setEditMode(false);
      setLoading(false);
      setModifiedRows({});

      fetchLiteratureData();

      if (selectedEMail) {
        setTimeout(() => {
          const refreshedEMailData = literatureData.filter(item => item.Mail === selectedEMail);
          setSelectedReviewData(refreshedEMailData);
          setEditedReviewData(refreshedEMailData);
        }, 500);
      }

      if (errorCount > 0) {
        alert(`Saved ${successCount} rows, but ${errorCount} rows had errors. Check console for details.`);
      } else if (successCount > 0) {
        alert(`Successfully saved ${successCount} rows.`);
      } else {
        alert("No changes were made.");
      }
    } catch (err) {
      console.error("Error in save operation:", err);
      setLoading(false);
      alert(`Error saving changes: ${err.message}`);
    }
  };

  const closeReviewViewer = () => {
    setSelectedReviewData(null);
    setEditedReviewData(null);
    setSelectedEMail(null);
    setEditMode(false);
    setFocusedCell({ row: null, col: null });
    setFocusedCellValue('');
    setExpandedCell(null);
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
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      return dateString || "-";
    } catch (e) {
      console.error("Error parsing date:", e, dateString);
      return dateString || "-";
    }
  };

  const findDateField = (item) => {
    if (!item) return null;
    const dateKey = Object.keys(item).find(key =>
      key.toLowerCase().includes('validation') && key.toLowerCase().includes('date')
    );
    return dateKey ? item[dateKey] : null;
  };

  const handleApplyDateFilter = () => {
    setShowDateFilter(false);
    setCurrentPage(1);
  };

  const filteredData = filteredEMailData.filter(item => {
    if (!item) return false;

    let passesDateFilter = true;
    if (dateRange.startDate && dateRange.endDate && item['IRD']) {
      const parsedDate = parseDate(item['IRD']);
      if (parsedDate) {
        passesDateFilter = parsedDate >= dateRange.startDate && parsedDate <= dateRange.endDate;
      } else {
        passesDateFilter = false;
      }
    }
    if (!passesDateFilter) return false;

    const searchLower = searchTerm.toLowerCase();
    const dateValue = findDateField(item);

    return (
      (dateValue && formatDate(dateValue).toLowerCase().includes(searchLower)) ||
      (item.Mail && item.Mail.toLowerCase().includes(searchLower)) ||
      (item.Title && item.Title.toLowerCase().includes(searchLower)) ||
      (item.Drug && item.Drug.toLowerCase().includes(searchLower)) ||
      (item['IRD'] && parseDate(item['IRD'])?.toLowerCase().includes(searchLower)) ||
      (item['Comments (ICSR, AOI, Not selected)'] && item['Comments (ICSR, AOI, Not selected)'].toLowerCase().includes(searchLower)) ||
      (item['Status'] && item['Status'].toLowerCase().includes(searchLower))
    );
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
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const detailCurrentItems = selectedReviewData
    ? selectedReviewData.slice((detailCurrentPage - 1) * itemsPerPage, detailCurrentPage * itemsPerPage)
    : [];
  const detailTotalPages = selectedReviewData ? Math.ceil(selectedReviewData.length / itemsPerPage) : 0;

  const getPageNumbers = (current, total) => {
    if (total <= maxPageButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range = [];
    const delta = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, current - delta);
    let end = Math.min(total, start + maxPageButtons - 1);

    if (end - start < maxPageButtons - 1) {
      start = Math.max(1, end - maxPageButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {!selectedReviewData ? (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#14242c]">Literature Review</h1>
            <p className="text-gray-600 mt-2">View and analyze literature review data</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md border border-[#14242c] shadow-sm">
              <Search size={20} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by Mail, Title, Drug, IRD, Comments, Status..."
                className="bg-transparent border-none outline-none w-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowDateFilter(!showDateFilter)}
                  className="flex items-center bg-[#14242c] text-white px-3 py-2 rounded-md"
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
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#14242c] mb-1">End Date</label>
                        <input
                          type="date"
                          value={dateRange.endDate}
                          onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => setShowDateFilter(false)}
                          className="px-3 py-1 text-sm bg-gray-200 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleApplyDateFilter}
                          className="px-3 py-1 text-sm bg-[#14242c] text-white rounded-md"
                        >
                          Apply Filter
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <label className="text-sm text-[#14242c] mr-2">Rows per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-md p-1"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={150}>150</option>
                  <option value={200}>200</option>
                </select>
              </div>
            </div>
          </div>

          {(dateRange.startDate && dateRange.endDate || searchTerm) && (
            <div className="mb-4 flex items-center flex-wrap gap-2">
              <span className="text-sm text-[#14242c] mr-2">Filtered by:</span>
              {searchTerm && (
                <div className="bg-[#14242c] text-white text-xs px-3 py-1 rounded-full flex items-center">
                  <Search size={12} className="mr-1" />
                  Search: {searchTerm}
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                      searchParams.delete('searchTerm');
                      setSearchParams(searchParams);
                    }}
                    className="ml-2 text-white hover:text-red-200"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              {dateRange.startDate && dateRange.endDate && (
                <div className="bg-[#14242c] text-white text-xs px-3 py-1 rounded-full flex items-center">
                  <Calendar size={12} className="mr-1" />
                  IRD: {dateRange.startDate} to {dateRange.endDate}
                  <button
                    onClick={() => {
                      setDateRange({ startDate: '', endDate: '' });
                      setCurrentPage(1);
                    }}
                    className="ml-2 text-white hover:text-red-200"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              {(dateRange.startDate && dateRange.endDate || searchTerm) && (
                <button
                  onClick={() => {
                    setDateRange({ startDate: '', endDate: '' });
                    setSearchTerm('');
                    setCurrentPage(1);
                    setSearchParams({});
                  }}
                  className="text-xs bg-[#14242c] text-white px-2 py-1 rounded-md flex items-center"
                >
                  <X size={12} className="mr-1" /> Clear all filters
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14242c]"></div>
            </div>
          ) : sortedData.length === 0 ? (
            <div className="text-center text-gray-600 mt-8">
              No entries match the applied filters.
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="text-white" style={{ backgroundColor: '#14242c' }}>
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer"
                        onClick={() => {
                          setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? '' : 'asc'));
                          setCurrentPage(1);
                        }}
                      >
                        <div className="flex items-center">
                          IRD
                          {sortOrder && (
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
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">EMail</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">Drug</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">Comments (ICSR, AOI, Not selected)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((item, idx) => {
                      const dateValue = findDateField(item);
                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm">{formatDate(item['IRD'])}</td>
                          <td className="px-6 py-4 text-sm">{item.Mail || "-"}</td>
                          <td className="px-6 py-4 text-sm">{truncateText(item.Title) || "-"}</td>
                          <td className="px-6 py-4 text-sm">{truncateText(item.Drug) || "-"}</td>
                          <td className="px-6 py-4 text-sm">{truncateText(item['Comments (ICSR, AOI, Not selected)']) || "-"}</td>
                          <td className="px-6 py-4 text-sm">{item.Status || "-"}</td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={() => handleViewReview(item, dateValue ? new Date(dateValue) : null)}
                              className="flex items-center text-blue-600 hover:text-blue-900"
                            >
                              <Eye size={16} className="mr-1" /> View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-700">
                  Showing {currentItems.length} entries out of {sortedData.length} entries
                </div>
                {sortedData.length > itemsPerPage && (
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {getPageNumbers(currentPage, totalPages).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === page ? 'bg-[#14242c] text-white' : 'bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button onClick={closeReviewViewer} className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
                <ArrowLeft size={16} className="mr-1" /> Back
              </button>
              <button onClick={() => setEditMode(true)} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
                <Edit size={16} className="mr-1" /> Edit
              </button>
              {editMode && (
                <button onClick={handleSave} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
                  <Save size={16} className="mr-1" /> Save
                </button>
              )}
            </div>
            <h3 className="text-xl font-medium text-[#14242c]">Records for: {selectedEMail}</h3>
          </div>

          {editMode && focusedCell.row !== null && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
              <div className="mb-2 text-sm font-medium text-gray-800">
                Editing cell: Row {focusedCell.row + 1}, Column "{Object.keys(editedReviewData[0])[focusedCell.col]}"
              </div>
              <textarea
                className="w-full h-24 p-2 border rounded-md"
                value={focusedCellValue}
                onChange={(e) => {
                  setFocusedCellValue(e.target.value);
                  handleCellChange(focusedCell.row, Object.keys(editedReviewData[0])[focusedCell.col], e.target.value);
                }}
              />
            </div>
          )}

          {expandedCell && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-3xl max-h-3/4 w-full overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {editedReviewData[expandedCell.row] &&
                      Object.keys(editedReviewData[expandedCell.row])[expandedCell.col]}
                  </h3>
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
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14242c]"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <label className="text-sm text-[#14242c] mr-2">Rows per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setDetailCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-md p-1"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={150}>150</option>
                  <option value={200}>200</option>
                </select>
              </div>

              <div className="overflow-auto max-h-[75vh]">
                <table className="w-full border border-gray-300 text-sm">
                  <thead className="text-white sticky top-0" style={{ backgroundColor: '#14242c' }}>
                    <tr>
                      {editedReviewData && editedReviewData[0] && Object.keys(editedReviewData[0]).map((col, idx) => (
                        <th key={col} className="border px-4 py-3 text-left font-medium text-xs" style={{ minWidth: '200px' }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detailCurrentItems.map((row, rowIndex) => {
                      const actualRowIndex = (detailCurrentPage - 1) * itemsPerPage + rowIndex;
                      return (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {Object.entries(row).map(([key, val], colIndex) => (
                            <td
                              key={colIndex}
                              className="border px-4 py-2 text-sm truncate cursor-pointer hover:bg-gray-100 rounded-md"
                              onClick={() => handleCellClick(actualRowIndex, colIndex, val)}
                              title="Click to view full content"
                              style={{ minWidth: '200px', maxWidth: '300px' }}
                            >
                              {editMode ? (
                                <input
                                  className="w-full border p-2 text-sm"
                                  value={val || ''}
                                  onFocus={() => {
                                    setFocusedCell({ row: actualRowIndex, col: colIndex });
                                    setFocusedCellValue(val || '');
                                  }}
                                  onChange={(e) => {
                                    handleCellChange(actualRowIndex, key, e.target.value);
                                    if (focusedCell.row === actualRowIndex && focusedCell.col === colIndex) {
                                      setFocusedCellValue(e.target.value);
                                    }
                                  }}
                                />
                              ) : (
                                ['IRD', 'Validation Processing Date'].includes(key) ? formatDate(val) : truncateText(val, 25) || ''
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {selectedReviewData && selectedReviewData.length > itemsPerPage && (
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-700">
                    Showing {detailCurrentItems.length} entries out of {selectedReviewData.length} entries
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setDetailCurrentPage(detailCurrentPage - 1)}
                      disabled={detailCurrentPage === 1}
                      className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {getPageNumbers(detailCurrentPage, detailTotalPages).map(page => (
                      <button
                        key={page}
                        onClick={() => setDetailCurrentPage(page)}
                        className={`px-3 py-1 rounded-md ${
                          detailCurrentPage === page ? 'bg-[#14242c] text-white' : 'bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setDetailCurrentPage(detailCurrentPage + 1)}
                      disabled={detailCurrentPage === detailTotalPages}
                      className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LiteratureReviewContent;