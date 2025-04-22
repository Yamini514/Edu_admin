import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', path: '/', icon: '📊' },
    { title: 'Branches', path: '/branches', icon: '🏢' },
    { title: 'Staff & Teachers', path: '/staff', icon: '👨‍🏫' },
    { title: 'Students', path: '/students', icon: '👥' },
    { title: 'Courses & Subjects', path: '/courses', icon: '📚' },
    { title: 'Reports', path: '/reports', icon: '📊' },
    { title: 'Messages', path: '/messages', icon: '✉️' },
    { title: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className={`h-full bg-white shadow-lg transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">EduCare</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;