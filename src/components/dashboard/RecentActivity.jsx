import React from 'react';

const RecentActivity = () => {
  const activities = [
    { type: 'New student registered', details: 'Jane Smith was added to Branch A', time: '10 min ago' },
    { type: 'Teacher assigned', details: 'Mr. Johnson assigned to Mathematics', time: '1 hour ago' },
    { type: 'Branch updated', details: 'Branch A settings were modified', time: '3 hours ago' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <a href="#" className="text-blue-600 text-sm">View All</a>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              👤
            </div>
            <div>
              <div className="font-medium">{activity.type}</div>
              <div className="text-sm text-gray-500">{activity.details}</div>
              <div className="text-xs text-gray-400">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;