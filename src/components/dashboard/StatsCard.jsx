import React from 'react';

const StatsCard = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="text-xl mb-2">{icon}</div>
      <div className="text-gray-500">{title}</div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="text-sm text-green-500">{change}</div>
    </div>
  );
};

export default StatsCard;