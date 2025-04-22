import React, { useState } from 'react';

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState('August 2023');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedDay, setSelectedDay] = useState('All Days');

  const branches = ['All Branches', 'Main Campus', 'Downtown Branch', 'West Side Campus'];
  const days = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const attendanceOverview = [
    { branch: 'Main Campus', attendance: 92.5 },
    { branch: 'Downtown Branch', attendance: 91.8 },
    { branch: 'West Side Campus', attendance: 90.3 }
  ];

  const attendanceByGrade = [
    { grade: 'Grade 9', attendance: 93.2 },
    { grade: 'Grade 10', attendance: 91.8 },
    { grade: 'Grade 11', attendance: 92.5 },
    { grade: 'Grade 12', attendance: 90.7 }
  ];

  const monthlyAttendance = [
    {
      branch: 'Main Campus',
      data: [
        { grade: 'Grade 9', students: 120, avgAttendance: 93.2, perfectAttendance: '47 (39.2%)', chronicAbsence: '3 (2.5%)', trend: '+1.2%' },
        { grade: 'Grade 10', students: 115, avgAttendance: 92.6, perfectAttendance: '42 (36.5%)', chronicAbsence: '4 (3.5%)', trend: '+1.1%' },
        { grade: 'Grade 11', students: 108, avgAttendance: 91.5, perfectAttendance: '35 (32.4%)', chronicAbsence: '5 (4.6%)', trend: '+0.8%' },
        { grade: 'Grade 12', students: 105, avgAttendance: 90.5, perfectAttendance: '32 (30.5%)', chronicAbsence: '6 (5.7%)', trend: '+0.6%' }
      ]
    },
    // Add data for other branches...
  ];

  const handleDownload = () => {
    // Create CSV content
    const headers = ['Branch', 'Grade', 'Students', 'Avg. Attendance', 'Perfect Attendance', 'Chronic Absence', 'Trend'];
    const csvContent = [
      headers.join(','),
      ...monthlyAttendance.flatMap(branch =>
        branch.data.map(row =>
          [
            branch.branch,
            row.grade,
            row.students,
            `${row.avgAttendance}%`,
            row.perfectAttendance,
            row.chronicAbsence,
            row.trend
          ].join(',')
        )
      )
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${selectedMonth.replace(' ', '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Filter data based on selected branch and day
  const filteredData = monthlyAttendance
    .filter(branch => selectedBranch === 'All Branches' || branch.branch === selectedBranch);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Reports</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option>August 2023</option>
            <option>July 2023</option>
            <option>June 2023</option>
          </select>
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <button 
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Overview */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Attendance Overview</h3>
          <div className="space-y-4">
            {attendanceOverview.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="break-words">{item.branch}</span>
                  <span>{item.attendance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance by Grade */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Attendance by Grade</h3>
          <div className="space-y-4">
            {attendanceByGrade.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="break-words">{item.grade}</span>
                  <span>{item.attendance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Attendance Report */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <h3 className="text-lg font-medium p-4 sm:p-6 border-b">Monthly Attendance Report</h3>
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Attendance</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perfect Attendance</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chronic Absence</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((branch) => (
                    branch.data.map((row, index) => (
                      <tr key={`${branch.branch}-${index}`} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{index === 0 ? branch.branch : ''}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{row.grade}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{row.students}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{row.avgAttendance}%</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{row.perfectAttendance}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{row.chronicAbsence}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-green-600">{row.trend}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;