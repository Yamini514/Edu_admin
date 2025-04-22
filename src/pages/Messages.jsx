import React, { useState } from 'react';

const Messages = () => {
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const messages = [
    { 
      id: 1, 
      title: 'Parent-Teacher Meeting Next Week',
      content: 'Dear Parents, We are excited to invite you to our annual parent-teacher conference next week. This is a great opportunity to discuss your child\'s progress and any concerns you may have.',
      recipients: 'To: All Parents',
      date: '2025-04-15',
      actions: ['View Details', 'Forward']
    },
    { 
      id: 2, 
      title: 'School Field Trip Reminder',
      content: 'This is a friendly reminder about the upcoming field trip to the Science Museum. Please ensure your child brings a packed lunch and comfortable shoes.',
      recipients: 'To: Grade 5B Main Campus',
      date: '2025-04-12',
      actions: ['View Details', 'Forward']
    },
    { 
      id: 3, 
      title: 'Changes to School Schedule',
      content: 'Due to upcoming renovations, there will be changes to the class schedule next month. Please review the attached document for details.',
      recipients: 'To: All Staff, All Parents',
      date: '2025-04-10',
      actions: ['View Details', 'Forward']
    },
    { 
      id: 4, 
      title: 'New Extracurricular Activities',
      content: 'We are happy to announce new extracurricular activities starting next semester. Students can sign up for robotics, debate club, or creative writing.',
      recipients: 'To: All Parents, All Students',
      date: '2025-04-05',
      actions: ['View Details', 'Forward']
    }
  ];

  const NewMessageForm = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">New Message</h3>
        <button 
          onClick={() => setIsNewMessageOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            placeholder="Message subject"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
          <div className="flex gap-2 mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">All Parents</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">All Staff</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">All Students</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Branch</label>
          <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select Branch</option>
            <option value="main">Main Campus</option>
            <option value="north">North Campus</option>
            <option value="south">South Campus</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Grade</label>
          <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select Grade</option>
            {[9, 10, 11, 12].map(grade => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            rows="4"
            placeholder="Type your message here..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <div className="flex justify-center mb-2">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">Upload a file or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsNewMessageOpen(false)}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>
        <button 
          onClick={() => setIsNewMessageOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Message
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isNewMessageOpen ? (
        <NewMessageForm />
      ) : (
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {messages.map((message) => (
            <div key={message.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{message.title}</h3>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{message.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{message.recipients}</span>
                <div className="flex gap-3">
                  {message.actions.map((action, index) => (
                    <button
                      key={index}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;