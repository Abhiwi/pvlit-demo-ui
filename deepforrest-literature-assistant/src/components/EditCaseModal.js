import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditCaseModal = ({ isOpen, onClose, onSave, caseData, fields }) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (caseData) {
      setFormData({ ...caseData });
    }
  }, [caseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving case:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Edit Case</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-10rem)]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field} className="mb-4">
                  <label 
                    htmlFor={field} 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field}
                  </label>
                  
                  {field.toLowerCase() === 'status' ? (
                    <select
                      id={field}
                      name={field}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={formData[field] || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Needs More Info">Needs More Info</option>
                    </select>
                  ) : field.toLowerCase().includes('icsr') || field.toLowerCase().includes('aoi') ? (
                    <select
                      id={field}
                      name={field}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={formData[field] || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                  ) : field.toLowerCase().includes('date') ? (
                    <input
                      type="date"
                      id={field}
                      name={field}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData[field] ? new Date(formData[field]).toISOString().split('T')[0] : ''}
                      onChange={handleChange}
                    />
                  ) : field.toLowerCase().includes('notes') || field.toLowerCase().includes('description') ? (
                    <textarea
                      id={field}
                      name={field}
                      rows={3}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData[field] || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type="text"
                      id={field}
                      name={field}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData[field] || ''}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </form>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t">
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCaseModal;