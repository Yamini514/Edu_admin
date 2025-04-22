import React, { useState } from 'react';

const Branches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [branches, setBranches] = useState([
    { 
      id: 1, 
      name: 'Main Branch', 
      location: 'Downtown', 
      mainHead: 'John Doe',
      students: 450, 
      staff: 25, 
      status: 'Active' 
    },
    { id: 2, name: 'North Campus', location: 'North City', students: 380, staff: 20, status: 'Active' },
    { id: 3, name: 'South Wing', location: 'South City', students: 290, staff: 15, status: 'Active' },
    { id: 4, name: 'East Center', location: 'East Town', students: 128, staff: 12, status: 'Inactive' },
  ]);

  const handleAddBranch = (newBranch) => {
    setBranches([...branches, { 
      ...newBranch, 
      id: branches.length + 1,
      students: 0,
      staff: 0,
      status: 'Active'
    }]);
    setIsModalOpen(false);
    setEditingBranch(null);
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleSaveBranch = (formData) => {
    if (editingBranch) {
      setBranches(branches.map(branch => 
        branch.id === editingBranch.id 
          ? { ...branch, ...formData }
          : branch
      ));
    } else {
      handleAddBranch(formData);
    }
    setIsModalOpen(false);
    setEditingBranch(null);
  };

  const handleActionClick = (branchId) => {
    if (activeDropdown === branchId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(branchId);
    }
  };

  const handleDeleteBranch = (branchId) => {
    setBranches(branches.filter(branch => branch.id !== branchId));
    setActiveDropdown(null);
  };

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Branch Management</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search branches..."
            className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Branch
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium">{branch.name}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm">{branch.location}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm">{branch.students}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm">{branch.staff}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                        branch.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {branch.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm">
                      <div className="relative">
                        <button 
                          onClick={() => handleActionClick(branch.id)}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                        
                        {activeDropdown === branch.id && (
                          <div className="fixed mt-2 w-48 bg-white rounded-md shadow-lg z-[100] border" style={{ top: 'auto', left: 'auto', transform: 'translate(-75%, 0)' }}>
                            <div className="py-1">
                              <button
                                onClick={() => handleEditBranch(branch)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteBranch(branch.id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto z-50">
            <div className="p-4 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {editingBranch ? 'Edit Branch' : 'Add New Branch'}
                </h3>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingBranch(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSaveBranch({
                  name: formData.get('branchName'),
                  location: formData.get('address'),
                  mainHead: formData.get('mainHead'),
                  mainHeadPhone: formData.get('mainHeadPhone'),
                  students: parseInt(formData.get('students')) || 0,
                  staff: parseInt(formData.get('staff')) || 0
                });
              }}>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Branch Name</label>
                    <input
                      type="text"
                      name="branchName"
                      defaultValue={editingBranch?.name || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      placeholder="e.g. Main Campus"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={editingBranch?.location || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      placeholder="Full address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Main Head</label>
                      <input
                        type="text"
                        name="mainHead"
                        defaultValue={editingBranch?.mainHead || ''}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                        placeholder="Name of branch head"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                      <input
                        type="tel"
                        name="mainHeadPhone"
                        defaultValue={editingBranch?.mainHeadPhone || ''}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                        placeholder="Phone number"
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit phone number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Total Students</label>
                      <input
                        type="number"
                        name="students"
                        defaultValue={editingBranch?.students || ''}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                        min="0"
                        placeholder="Number of students"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Total Staff</label>
                      <input
                        type="number"
                        name="staff"
                        defaultValue={editingBranch?.staff || ''}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                        min="0"
                        placeholder="Number of staff"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingBranch(null);
                    }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    {editingBranch ? 'Save Changes' : 'Save Branch'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branches;