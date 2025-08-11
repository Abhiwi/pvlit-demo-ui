import React, { useState, useEffect } from 'react';

const ExcelViewer = ({ excelData, filename }) => {
  const [parsedData, setParsedData] = useState({
    headers: [],
    rows: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would parse the Excel file data
    // Here we're simulating parsing with mock data
    const parseExcelData = () => {
      try {
        // Mock data - in a real app this would come from parsing the actual Excel file
        const mockParsedData = {
          headers: ['Validation Processing Date', 'Mail', 'Document ID', 'Status', 'Validated By', 'Comments'],
          rows: [
            ['2025-04-15', 'researcher@deepforrest.com', 'DOC-2587', 'Completed', 'John Smith', 'All requirements met'],
            ['2025-04-15', 'analyst@deepforrest.com', 'DOC-2588', 'Pending', 'Mary Johnson', 'Awaiting final review'],
            ['2025-04-14', 'scientist@deepforrest.com', 'DOC-2586', 'Completed', 'Robert Brown', 'Approved with minor changes'],
            ['2025-04-14', 'reviewer@deepforrest.com', 'DOC-2585', 'Rejected', 'Sarah Davis', 'Failed validation criteria'],
            ['2025-04-13', 'researcher2@deepforrest.com', 'DOC-2584', 'Completed', 'Michael Wilson', 'Successfully validated'],
          ]
        };
        
        setParsedData(mockParsedData);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing Excel data:", error);
        setLoading(false);
      }
    };

    // Simulate network delay
    setTimeout(parseExcelData, 800);
  }, [excelData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#15212d]"></div>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <h2 className="text-xl font-bold mb-4">{filename}</h2>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#15212d]">
            <tr>
              {parsedData.headers.map((header, index) => (
                <th 
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parsedData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExcelViewer;