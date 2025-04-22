import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState(null);
  const [settings, setSettings] = useState({
    general: {
      schoolName: 'Beacon Academy',
      schoolAddress: '1234 Education Blvd, New York, NY 10001',
      phoneNumber: '(555) 123-4567',
      email: 'info@beaconacademy.edu',
      website: 'https://beaconacademy.edu',
      academicYear: '2023-2024',
      startDate: '2023-09-01',
      endDate: '2024-06-15',
      termStructure: 'Semesters (2 terms)'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      inAppNotifications: true,
      events: {
        studentAttendance: true,
        gradePostings: true,
        calendarEvents: true,
        staffAnnouncements: true,
        systemUpdates: false
      }
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30 minutes'
    },
    // appearance: {
    //   theme: 'system',
    //   colorScheme: 'blue',
    //   logo: null,
    //   displayMode: 'system',
    //   dashboardLayout: 'overview',
    //   statsDisplay: 'both'
    // }
  });

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedSettingChange = (section, parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
          [field]: value
        }
      }
    }));
  };

  useEffect(() => {
    // Store the original settings when component mounts
    setOriginalSettings(settings);
  }, []);

  useEffect(() => {
    // Check for changes whenever settings are updated
    if (originalSettings) {
      const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
      setHasUnsavedChanges(hasChanges);
    }
  }, [settings, originalSettings]);

  const handleSaveChanges = () => {
    // Save the changes and update the original settings
    console.log('Saving settings:', settings);
    setOriginalSettings(settings);
    setHasUnsavedChanges(false);
  };

  // Add window event listener for unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Settings</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {hasUnsavedChanges && (
            <span className="text-sm text-amber-600 whitespace-nowrap">
              <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              You have unsaved changes
            </span>
          )}
          <button 
            onClick={handleSaveChanges}
            disabled={!hasUnsavedChanges}
            className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center ${
              hasUnsavedChanges
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex flex-wrap">
            {['general', 'notifications', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>


        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">School Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={settings.general.schoolName}
                      onChange={(e) => handleSettingChange('general', 'schoolName', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Address
                    </label>
                    <input
                      type="text"
                      value={settings.general.schoolAddress}
                      onChange={(e) => handleSettingChange('general', 'schoolAddress', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={settings.general.phoneNumber}
                        onChange={(e) => handleSettingChange('general', 'phoneNumber', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.general.email}
                        onChange={(e) => handleSettingChange('general', 'email', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Website
                    </label>
                    <input
                      type="url"
                      value={settings.general.website}
                      onChange={(e) => handleSettingChange('general', 'website', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Academic Year Settings</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Academic Year
                      </label>
                      <input
                        type="text"
                        value={settings.general.academicYear}
                        onChange={(e) => handleSettingChange('general', 'academicYear', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={settings.general.startDate}
                        onChange={(e) => handleSettingChange('general', 'startDate', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={settings.general.endDate}
                        onChange={(e) => handleSettingChange('general', 'endDate', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Term Structure
                      </label>
                      <select
                        value={settings.general.termStructure}
                        onChange={(e) => handleSettingChange('general', 'termStructure', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Semesters (2 terms)">Semesters (2 terms)</option>
                        <option value="Trimesters (3 terms)">Trimesters (3 terms)</option>
                        <option value="Quarters (4 terms)">Quarters (4 terms)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              
              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive important alerts via text message</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* In-App Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">In-App Notifications</h4>
                    <p className="text-sm text-gray-500">Show notifications in the dashboard</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.inAppNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'inAppNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Notification Events */}
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Notification Events</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.events.studentAttendance}
                        onChange={(e) => handleNestedSettingChange('notifications', 'events', 'studentAttendance', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Student attendance updates</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.events.gradePostings}
                        onChange={(e) => handleNestedSettingChange('notifications', 'events', 'gradePostings', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Grade postings</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.events.calendarEvents}
                        onChange={(e) => handleNestedSettingChange('notifications', 'events', 'calendarEvents', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Calendar events</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.events.staffAnnouncements}
                        onChange={(e) => handleNestedSettingChange('notifications', 'events', 'staffAnnouncements', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Staff announcements</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.events.systemUpdates}
                        onChange={(e) => handleNestedSettingChange('notifications', 'events', 'systemUpdates', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">System updates</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Password Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Authentication Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Timeout
                    </label>
                    <select
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="15 minutes">15 minutes</option>
                      <option value="30 minutes">30 minutes</option>
                      <option value="1 hour">1 hour</option>
                      <option value="2 hours">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Theme Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Theme
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { color: 'blue', bg: 'bg-blue-600' },
                        { color: 'green', bg: 'bg-green-600' },
                        { color: 'purple', bg: 'bg-purple-600' },
                        { color: 'orange', bg: 'bg-orange-600' }
                      ].map((theme) => (
                        <button
                          key={theme.color}
                          onClick={() => handleSettingChange('appearance', 'colorScheme', theme.color)}
                          className={`h-12 rounded-lg ${theme.bg} ${
                            settings.appearance.colorScheme === theme.color 
                              ? 'ring-2 ring-offset-2 ring-blue-500' 
                              : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-bold text-blue-600">
                        B
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Change
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Mode
                    </label>
                    <div className="flex space-x-4">
                      {['light', 'dark', 'system'].map((mode) => (
                        <label key={mode} className="flex items-center">
                          <input
                            type="radio"
                            value={mode}
                            checked={settings.appearance.displayMode === mode}
                            onChange={(e) => handleSettingChange('appearance', 'displayMode', e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dashboard Layout
                    </label>
                    <select
                      value={settings.appearance.dashboardLayout}
                      onChange={(e) => handleSettingChange('appearance', 'dashboardLayout', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="overview">Overview</option>
                      <option value="detailed">Detailed</option>
                      <option value="compact">Compact</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stats Display
                    </label>
                    <div className="flex space-x-4">
                      {['numbers', 'charts', 'both'].map((display) => (
                        <label key={display} className="flex items-center">
                          <input
                            type="radio"
                            value={display}
                            checked={settings.appearance.statsDisplay === display}
                            onChange={(e) => handleSettingChange('appearance', 'statsDisplay', e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {display.charAt(0).toUpperCase() + display.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
