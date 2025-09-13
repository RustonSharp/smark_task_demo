import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="logo">
          <div className="logo-icon">
            <div className="logo-square"></div>
          </div>
          <span className="logo-text">项目管理系统</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="搜索项目、任务或成员..."
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="header-btn">
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-menu">
          <button className="user-btn">
            <User size={18} />
            <span className="user-name">张三</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;