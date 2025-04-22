import React, { useState } from 'react';

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courses, setCourses] = useState([
    { id: 1, name: 'Advanced Mathematics', code: 'MATH-101', teacher: 'John Smith', branch: 'Main Campus', grade: '12', students: 35, schedule: 'Mon, Wed 10:00 AM', status: 'Active' },
    { id: 2, name: 'Physics 101', code: 'PHY-101', teacher: 'Sarah Johnson', branch: 'North Campus', grade: '11', students: 28, schedule: 'Tue, Thu 11:00 AM', status: 'Active' },
    { id: 3, name: 'English Literature', code: 'ENG-101', teacher: 'Michael Brown', branch: 'South Wing', grade: '10', students: 32, schedule: 'Mon, Fri 2:00 PM', status: 'Active' },
  ]);

  const handleAddOrUpdateCourse = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const courseData = {
      name: formData.get('courseName'),
      code: formData.get('courseCode'),
      teacher: formData.get('teacher'),
      branch: formData.get('branch'),
      grade: formData.get('grade'),
      schedule: formData.get('schedule'),
      status: 'Active',
      students: editingCourse ? editingCourse.students : 0
    };

    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, ...courseData }
          : course
      ));
      setEditingCourse(null);
    } else {
      setCourses([...courses, { ...courseData, id: courses.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Courses & Subjects</h2>
        <button 
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium mb-1">{course.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{course.code}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {course.status}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Teacher: {course.teacher}</p>
              <p>Branch: {course.branch}</p>
              <p>Grade: {course.grade}</p>
              <p>Students Enrolled: {course.students}</p>
              <p>Schedule: {course.schedule}</p>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
              <button 
                onClick={() => handleEditCourse(course)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteCourse(course.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCourse(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddOrUpdateCourse} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <input 
                    type="text"
                    name="courseName"
                    defaultValue={editingCourse?.name || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                  <input 
                    type="text"
                    name="courseCode"
                    defaultValue={editingCourse?.code || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="e.g. MATH-101"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                  <select
                    name="teacher"
                    defaultValue={editingCourse?.teacher || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Teacher</option>
                    <option value="John Smith">John Smith</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Michael Brown">Michael Brown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <select
                    name="branch"
                    defaultValue={editingCourse?.branch || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="Main Campus">Main Campus</option>
                    <option value="North Campus">North Campus</option>
                    <option value="South Wing">South Wing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select
                    name="grade"
                    defaultValue={editingCourse?.grade || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Grade</option>
                    {[9, 10, 11, 12].map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                  <input 
                    type="text"
                    name="schedule"
                    defaultValue={editingCourse?.schedule || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="e.g. Mon, Wed 10:00 AM"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCourse(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  {editingCourse ? 'Update Course' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;