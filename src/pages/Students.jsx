import React, { useState } from 'react';

const Students = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Alex Johnson',
      email: 'alex.johnson@school.edu',
      grade: '12',
      branch: 'Main Branch',
      parentName: 'John Johnson',
      parentEmail: 'john@email.com',
      parentPhone: '555-0123',
      enrollmentDate: '2021-09-01',
      status: 'Active'
    },
    { id: 2, name: 'Bob Wilson', email: 'bob.wilson@school.edu', grade: '11', branch: 'North Campus', parentName: 'Mary Wilson', parentEmail: 'mary@email.com', parentPhone: '555-0124', enrollmentDate: '2021-09-01', status: 'Active' },
    { id: 3, name: 'Carol Martinez', email: 'carol.m@school.edu', grade: '9', branch: 'South Wing', parentName: 'Jose Martinez', parentEmail: 'jose@email.com', parentPhone: '555-0125', enrollmentDate: '2021-09-01', status: 'Active' },
  ]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddOrUpdateStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const studentData = {
      name: formData.get('fullName'),
      email: formData.get('email'),
      grade: formData.get('grade'),
      branch: formData.get('branch'),
      parentName: formData.get('parentName'),
      parentEmail: formData.get('parentEmail'),
      parentPhone: formData.get('parentPhone'),
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    if (editingStudent) {
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...student, ...studentData }
          : student
      ));
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...studentData, id: students.length + 1 }]);
    }
    setIsAddModalOpen(false);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsAddModalOpen(true);
    setActiveMenu(null);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
    setActiveMenu(null);
  };

  const toggleMenu = (studentId) => {
    setActiveMenu(activeMenu === studentId ? null : studentId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            onClick={() => {
              setEditingStudent(null);
              setIsAddModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{student.grade}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{student.enrollmentDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 relative">
                  <button
                    onClick={() => toggleMenu(student.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                  {activeMenu === student.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <button 
                          onClick={() => handleEditStudent(student)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit Student
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete Student
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h3>
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingStudent(null);
                }} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddOrUpdateStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  defaultValue={editingStudent?.name || ''}
                  className="w-full px-3 py-2 border rounded-lg" 
                  placeholder="Student's full name" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  defaultValue={editingStudent?.email || ''}
                  className="w-full px-3 py-2 border rounded-lg" 
                  placeholder="Student's email" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Select Grade</option>
                  {[9, 10, 11, 12].map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Select Branch</option>
                  <option value="main">Main Branch</option>
                  <option value="north">North Campus</option>
                  <option value="south">South Wing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Parent's full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Email</label>
                <input type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="Parent's email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Phone</label>
                <input type="tel" className="w-full px-3 py-2 border rounded-lg" placeholder="Parent's phone" />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingStudent ? 'Update Student' : 'Save Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;