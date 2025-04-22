import React from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';

const Dashboard = () => {
  const stats = [
    { title: 'Total Branches', value: '5', change: '+20% from last month', icon: '🏢' },
    { title: 'Total Students', value: '1248', change: '+12% from last month', icon: '👥' },
    { title: 'Total Staff', value: '64', change: '+5% from last month', icon: '👨‍🏫' },
   
  ];

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 transform hover:scale-105">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="transform hover:scale-105 transition-transform duration-200">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="transform hover:translate-y-[-4px] transition-transform duration-200">
          <RecentActivity />
        </div>
        <div className="transform hover:translate-y-[-4px] transition-transform duration-200">
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;