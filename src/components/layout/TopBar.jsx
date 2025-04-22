import React, { useState, useEffect, useRef } from 'react';

const TopBar = ({ onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <input
          type="search"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
        />
      </div>
      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <div 
          className="w-10 h-10 bg-blue-600 rounded-full text-white flex items-center justify-center cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          JD
        </div>
        <div>
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-gray-500">Administrator</div>
        </div>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;