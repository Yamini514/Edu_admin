import React from 'react';

const UpcomingEvents = () => {
  const events = [
    { title: 'Parent-Teacher Meeting', date: 'Tomorrow, 10:00 AM', location: 'Main Hall' },
    { title: 'Science Fair', date: 'Aug 28, 9:00 AM', location: 'Branch A' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <a href="#" className="text-blue-600 text-sm">View Calendar</a>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              📅
            </div>
            <div>
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-gray-500">{event.date}</div>
              <div className="text-sm text-gray-500">{event.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;