import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Users,
  Calendar,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: '仪表板',
      description: '项目概览'
    },
    {
      path: '/projects',
      icon: FolderOpen,
      label: '项目管理',
      description: '项目列表'
    },
    {
      path: '/tasks',
      icon: CheckSquare,
      label: '任务管理',
      description: '任务分配'
    },
    {
      path: '/analytics',
      icon: BarChart3,
      label: '数据分析',
      description: '数据统计'
    },
    {
      path: '/calendar',
      icon: Calendar,
      label: '日程安排',
      description: '时间管理'
    },
    {
      path: '/team',
      icon: Users,
      label: '团队管理',
      description: '成员管理'
    },
    {
      path: '/settings',
      icon: Settings,
      label: '系统设置',
      description: '配置管理'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/');
  };

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      {/* 侧边栏 */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <LayoutDashboard size={20} />
            <span>导航菜单</span>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <div className="nav-icon">
                      <Icon size={18} />
                    </div>
                    <div className="nav-content">
                      <span className="nav-label">{item.label}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                    {isActive(item.path) && <div className="nav-indicator"></div>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <Users size={16} />
            </div>
            <div className="user-details">
              <div className="user-name">张三</div>
              <div className="user-role">项目经理</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;