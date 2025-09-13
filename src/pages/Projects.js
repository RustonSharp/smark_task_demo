import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Clock
} from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    department: '',
    manager: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // 模拟项目数据
  const projects = [
    {
      id: 1,
      name: '电商平台重构',
      department: '技术部',
      manager: '李四',
      members: ['张三', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一'],
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      progress: 75,
      status: 'in-progress',
      description: '对现有电商平台进行全面重构，提升性能和用户体验',
      tasks: 24,
      completedTasks: 18
    },
    {
      id: 2,
      name: '移动端APP开发',
      department: '产品部',
      manager: '王五',
      members: ['李四', '赵六', '钱七', '孙八', '周九', '吴十'],
      startDate: '2024-01-15',
      endDate: '2024-03-01',
      progress: 45,
      status: 'in-progress',
      description: '开发公司官方移动端应用，支持iOS和Android平台',
      tasks: 18,
      completedTasks: 8
    },
    {
      id: 3,
      name: '数据分析系统',
      department: '数据部',
      manager: '赵六',
      members: ['张三', '李四', '王五', '钱七'],
      startDate: '2023-12-01',
      endDate: '2024-01-30',
      progress: 90,
      status: 'in-progress',
      description: '构建企业级数据分析平台，支持实时数据处理和可视化',
      tasks: 15,
      completedTasks: 14
    },
    {
      id: 4,
      name: '客户服务优化',
      department: '客服部',
      manager: '钱七',
      members: ['孙八', '周九', '吴十', '郑十一', '冯十二'],
      startDate: '2023-12-15',
      endDate: '2024-01-15',
      progress: 100,
      status: 'completed',
      description: '优化客户服务流程，提升客户满意度',
      tasks: 12,
      completedTasks: 12
    },
    {
      id: 5,
      name: '安全系统升级',
      department: '安全部',
      manager: '孙八',
      members: ['张三', '李四'],
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      progress: 0,
      status: 'pending',
      description: '升级企业安全防护系统，加强数据保护',
      tasks: 8,
      completedTasks: 0
    },
    {
      id: 6,
      name: '营销活动策划',
      department: '市场部',
      manager: '周九',
      members: ['王五', '赵六', '钱七', '孙八', '吴十'],
      startDate: '2024-01-20',
      endDate: '2024-02-28',
      progress: 30,
      status: 'in-progress',
      description: '策划春节营销活动，提升品牌知名度',
      tasks: 20,
      completedTasks: 6
    }
  ];

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in-progress': return '进行中';
      case 'pending': return '待开始';
      case 'overdue': return '已延期';
      default: return '未知';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'secondary';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    console.log('创建项目:', newProject);
    setShowCreateModal(false);
    setNewProject({
      name: '',
      department: '',
      manager: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  return (
    <div className="projects fade-in">
      <div className="page-header">
        <h1 className="page-title">项目管理</h1>
        <p className="page-subtitle">管理和跟踪所有项目进展</p>
      </div>

      {/* 工具栏 */}
      <div className="projects-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="搜索项目名称、部门或负责人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-box">
            <Filter size={16} className="filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">全部状态</option>
              <option value="pending">待开始</option>
              <option value="in-progress">进行中</option>
              <option value="completed">已完成</option>
              <option value="overdue">已延期</option>
            </select>
          </div>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={16} />
          新建项目
        </button>
      </div>

      {/* 项目统计 */}
      <div className="projects-stats">
        <div className="stat-item">
          <span className="stat-label">总项目</span>
          <span className="stat-value">{projects.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">进行中</span>
          <span className="stat-value">{projects.filter(p => p.status === 'in-progress').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">已完成</span>
          <span className="stat-value">{projects.filter(p => p.status === 'completed').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">待开始</span>
          <span className="stat-value">{projects.filter(p => p.status === 'pending').length}</span>
        </div>
      </div>

      {/* 项目列表 */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card card">
            <div className="project-header">
              <div className="project-title-section">
                <h3 className="project-title">{project.name}</h3>
                <span className={`status-badge status-${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
              <div className="project-actions">
                <button className="action-btn">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="project-meta">
              <div className="meta-item">
                <span className="meta-label">部门:</span>
                <span className="meta-value">{project.department}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">负责人:</span>
                <span className="meta-value">{project.manager}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">团队:</span>
                <span className="meta-value">
                  <Users size={14} />
                  {project.members.length}人
                </span>
              </div>
            </div>

            <div className="project-description">
              {project.description}
            </div>

            <div className="project-progress">
              <div className="progress-header">
                <span className="progress-label">进度</span>
                <span className="progress-percentage">{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="progress-tasks">
                <span>{project.completedTasks}/{project.tasks} 任务完成</span>
              </div>
            </div>

            <div className="project-timeline">
              <div className="timeline-item">
                <Calendar size={14} />
                <span>开始: {project.startDate}</span>
              </div>
              <div className="timeline-item">
                <Clock size={14} />
                <span>截止: {project.endDate}</span>
              </div>
            </div>

            <div className="project-footer">
              <button className="btn btn-secondary btn-sm">
                <Eye size={14} />
                查看详情
              </button>
              <button className="btn btn-secondary btn-sm">
                <Edit size={14} />
                编辑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 创建项目模态框 */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>新建项目</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="modal-body">
              <div className="form-group">
                <label className="form-label">项目名称</label>
                <input
                  type="text"
                  className="form-input"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">所属部门</label>
                  <select
                    className="form-select"
                    value={newProject.department}
                    onChange={(e) => setNewProject({...newProject, department: e.target.value})}
                    required
                  >
                    <option value="">选择部门</option>
                    <option value="技术部">技术部</option>
                    <option value="产品部">产品部</option>
                    <option value="市场部">市场部</option>
                    <option value="客服部">客服部</option>
                    <option value="数据部">数据部</option>
                    <option value="安全部">安全部</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">项目负责人</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newProject.manager}
                    onChange={(e) => setNewProject({...newProject, manager: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">开始日期</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">结束日期</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">项目描述</label>
                <textarea
                  className="form-input"
                  rows="3"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="请输入项目描述..."
                ></textarea>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  创建项目
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;