import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Branches from './pages/Branches';
import Staff from './pages/Staff';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Reports from './pages/Reports';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App