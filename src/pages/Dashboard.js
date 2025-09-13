import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  // 模拟数据
  const stats = [
    {
      title: '总项目数',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: BarChart3,
      color: 'primary'
    },
    {
      title: '进行中项目',
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'warning'
    },
    {
      title: '已完成项目',
      value: '6',
      change: '+25%',
      trend: 'up',
      icon: CheckCircle,
      color: 'success'
    },
    {
      title: '团队成员',
      value: '42',
      change: '+3%',
      trend: 'up',
      icon: Users,
      color: 'secondary'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: '电商平台重构',
      department: '技术部',
      progress: 75,
      status: 'in-progress',
      dueDate: '2024-02-15',
      manager: '李四',
      members: 8
    },
    {
      id: 2,
      name: '移动端APP开发',
      department: '产品部',
      progress: 45,
      status: 'in-progress',
      dueDate: '2024-03-01',
      manager: '王五',
      members: 6
    },
    {
      id: 3,
      name: '数据分析系统',
      department: '数据部',
      progress: 90,
      status: 'in-progress',
      dueDate: '2024-01-30',
      manager: '赵六',
      members: 4
    },
    {
      id: 4,
      name: '客户服务优化',
      department: '客服部',
      progress: 100,
      status: 'completed',
      dueDate: '2024-01-15',
      manager: '钱七',
      members: 5
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: '完成用户界面设计',
      project: '电商平台重构',
      assignee: '张三',
      dueDate: '今天',
      priority: 'high'
    },
    {
      id: 2,
      title: '数据库性能优化',
      project: '数据分析系统',
      assignee: '李四',
      dueDate: '明天',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'API接口测试',
      project: '移动端APP开发',
      assignee: '王五',
      dueDate: '1月28日',
      priority: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="dashboard fade-in">
      <div className="page-header">
        <h1 className="page-title">仪表板</h1>
        <p className="page-subtitle">项目概览与关键指标</p>
      </div>

      {/* 统计卡片 */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`stat-card card stat-${stat.color}`}>
              <div className="stat-header">
                <div className="stat-icon">
                  <Icon size={24} />
                </div>
                <div className={`stat-change ${stat.trend}`}>
                  <TrendingUp size={14} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-content">
        {/* 最近项目 */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">最近项目</h2>
            <button className="btn btn-secondary">查看全部</button>
          </div>
          <div className="card">
            <div className="project-list">
              {recentProjects.map((project) => (
                <div key={project.id} className="project-item">
                  <div className="project-info">
                    <div className="project-header">
                      <h3 className="project-name">{project.name}</h3>
                      <span className={`status-badge status-${getStatusColor(project.status)}`}>
                        {project.status === 'completed' ? '已完成' : 
                         project.status === 'in-progress' ? '进行中' : '待开始'}
                      </span>
                    </div>
                    <div className="project-meta">
                      <span className="project-department">{project.department}</span>
                      <span className="project-manager">负责人: {project.manager}</span>
                      <span className="project-members">
                        <Users size={14} />
                        {project.members}人
                      </span>
                    </div>
                    <div className="project-progress">
                      <div className="progress-info">
                        <span>进度</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="project-actions">
                    <div className="project-due">
                      <Calendar size={14} />
                      <span>{project.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 即将到期任务 */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">即将到期任务</h2>
            <button className="btn btn-secondary">查看全部</button>
          </div>
          <div className="card">
            <div className="task-list">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="task-item">
                  <div className="task-info">
                    <div className="task-header">
                      <h4 className="task-title">{task.title}</h4>
                      <span className={`status-badge status-${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? '高' : 
                         task.priority === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                    <div className="task-meta">
                      <span className="task-project">{task.project}</span>
                      <span className="task-assignee">分配给: {task.assignee}</span>
                    </div>
                  </div>
                  <div className="task-due">
                    <Clock size={14} />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="quick-actions">
        <button className="btn btn-primary">
          <span>新建项目</span>
        </button>
        <button className="btn btn-secondary">
          <span>分配任务</span>
        </button>
        <button className="btn btn-secondary">
          <span>查看报表</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;