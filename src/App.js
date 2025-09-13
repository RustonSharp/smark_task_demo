import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Team from './pages/Team';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="app-body">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/team" element={<Team />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;