import React, { useState } from 'react';

const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'Dr. James Wilson', role: 'Mathematics Teacher', branch: 'Main Branch', email: 'james.wilson@school.com', phone: '(555) 111-2233', status: 'Active' },
    { id: 2, name: 'Emma Thompson', role: 'Science Teacher', branch: 'North Campus', email: 'emma.thompson@school.com', phone: '(555) 222-3344', status: 'Active' },
    { id: 3, name: 'Robert Davis', role: 'English Teacher', branch: 'South Wing', email: 'robert.davis@school.com', phone: '(555) 333-4455', status: 'Active' },
    { id: 4, name: 'Lisa Martinez', role: 'History Teacher', branch: 'West Education', email: 'lisa.martinez@school.com', phone: '(555) 444-5566', status: 'Active' },
    { id: 5, name: 'Michael Johnson', role: 'Physical Education', branch: 'Sports Complex', email: 'michael.johnson@school.com', phone: '(555) 555-6677', status: 'Inactive' },
  ]);

  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStaff = (newStaff) => {
    setStaffMembers([...staffMembers, { ...newStaff, id: staffMembers.length + 1 }]);
    setIsModalOpen(false);
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleActionClick = (staffId) => {
    if (activeDropdown === staffId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(staffId);
    }
  };

  const handleDeleteStaff = (staffId) => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== staffId));
    setActiveDropdown(null);
  };

  const [editingStaff, setEditingStaff] = useState(null);

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Staff & Teachers</h2>
        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search staff..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Staff
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium">{staff.name}</div>
                  <div className="text-sm text-gray-500">{staff.email}</div>
                </td>
                <td className="px-6 py-4">{staff.role}</td>
                <td className="px-6 py-4">{staff.branch}</td>
                <td className="px-6 py-4">{staff.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    staff.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {staff.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button 
                      onClick={() => handleActionClick(staff.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                    
                    {activeDropdown === staff.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                        <div className="py-1">
                          <button
                            onClick={() => handleEditStaff(staff)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteStaff(staff.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-[600px] max-h-[90vh] overflow-y-auto z-50">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                </h3>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingStaff(null);
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
                const staffData = {
                  name: formData.get('fullName'),
                  email: formData.get('email'),
                  role: formData.get('position'),
                  branch: formData.get('branch'),
                  phone: formData.get('phone'),
                  status: editingStaff ? editingStaff.status : 'Active'
                };

                if (editingStaff) {
                  setStaffMembers(staffMembers.map(staff => 
                    staff.id === editingStaff.id ? { ...staff, ...staffData } : staff
                  ));
                } else {
                  handleAddStaff(staffData);
                }
                setEditingStaff(null);
                setIsModalOpen(false);
              }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      defaultValue={editingStaff?.name || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingStaff?.email || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      name="position"
                      defaultValue={editingStaff?.role || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="e.g. Math Teacher"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                    <select
                      name="branch"
                      defaultValue={editingStaff?.branch || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Select Branch</option>
                      <option value="Main Branch">Main Branch</option>
                      <option value="North Campus">North Campus</option>
                      <option value="South Wing">South Wing</option>
                      <option value="West Education">West Education</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={editingStaff?.phone || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingStaff(null);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    {editingStaff ? 'Save Changes' : 'Save Staff'}
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

export default Staff;