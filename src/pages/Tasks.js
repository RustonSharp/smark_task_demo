import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  Flag,
  MessageSquare,
  Paperclip
} from 'lucide-react';
import './Tasks.css';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // list, kanban
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    project: '',
    priority: 'medium',
    dueDate: '',
    tags: ''
  });

  // 模拟任务数据
  const tasks = [
    {
      id: 1,
      title: '用户登录功能开发',
      description: '实现用户登录、注册、密码重置等功能',
      assignee: '张三',
      project: '电商平台重构',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-01-25',
      createdDate: '2024-01-15',
      progress: 60,
      tags: ['前端', '认证'],
      comments: 3,
      attachments: 2
    },
    {
      id: 2,
      title: '数据库设计优化',
      description: '优化用户表和订单表的索引结构',
      assignee: '李四',
      project: '电商平台重构',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-01-30',
      createdDate: '2024-01-16',
      progress: 0,
      tags: ['后端', '数据库'],
      comments: 1,
      attachments: 0
    },
    {
      id: 3,
      title: 'UI界面设计',
      description: '设计移动端应用的主要界面和交互流程',
      assignee: '王五',
      project: '移动端APP开发',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-01-28',
      createdDate: '2024-01-17',
      progress: 80,
      tags: ['设计', 'UI/UX'],
      comments: 5,
      attachments: 8
    },
    {
      id: 4,
      title: 'API接口开发',
      description: '开发用户管理、商品管理等核心API接口',
      assignee: '赵六',
      project: '移动端APP开发',
      priority: 'high',
      status: 'completed',
      dueDate: '2024-01-20',
      createdDate: '2024-01-10',
      progress: 100,
      tags: ['后端', 'API'],
      comments: 2,
      attachments: 1
    },
    {
      id: 5,
      title: '数据可视化组件',
      description: '开发图表、仪表板等数据展示组件',
      assignee: '钱七',
      project: '数据分析系统',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-02-05',
      createdDate: '2024-01-18',
      progress: 45,
      tags: ['前端', '图表'],
      comments: 4,
      attachments: 3
    },
    {
      id: 6,
      title: '性能测试',
      description: '对系统进行压力测试和性能优化',
      assignee: '孙八',
      project: '数据分析系统',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-02-10',
      createdDate: '2024-01-19',
      progress: 0,
      tags: ['测试', '性能'],
      comments: 0,
      attachments: 0
    },
    {
      id: 7,
      title: '客户反馈收集',
      description: '收集和整理客户对新功能的反馈意见',
      assignee: '周九',
      project: '客户服务优化',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-01-15',
      createdDate: '2024-01-05',
      progress: 100,
      tags: ['调研', '客服'],
      comments: 6,
      attachments: 2
    },
    {
      id: 8,
      title: '安全漏洞扫描',
      description: '对系统进行全面的安全漏洞检测',
      assignee: '吴十',
      project: '安全系统升级',
      priority: 'high',
      status: 'overdue',
      dueDate: '2024-01-22',
      createdDate: '2024-01-12',
      progress: 30,
      tags: ['安全', '测试'],
      comments: 2,
      attachments: 1
    }
  ];

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in-progress': return '进行中';
      case 'pending': return '待开始';
      case 'overdue': return '已逾期';
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

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    console.log('创建任务:', newTask);
    setShowCreateModal(false);
    setNewTask({
      title: '',
      description: '',
      assignee: '',
      project: '',
      priority: 'medium',
      dueDate: '',
      tags: ''
    });
  };

  const toggleTaskStatus = (taskId) => {
    console.log('切换任务状态:', taskId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="status-icon completed" />;
      case 'in-progress':
        return <Circle size={16} className="status-icon in-progress" />;
      case 'overdue':
        return <AlertCircle size={16} className="status-icon overdue" />;
      default:
        return <Circle size={16} className="status-icon pending" />;
    }
  };

  return (
    <div className="tasks fade-in">
      <div className="page-header">
        <h1 className="page-title">任务管理</h1>
        <p className="page-subtitle">跟踪和管理所有项目任务</p>
      </div>

      {/* 工具栏 */}
      <div className="tasks-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="搜索任务标题、描述、负责人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-group">
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
                <option value="overdue">已逾期</option>
              </select>
            </div>
            <div className="filter-box">
              <Flag size={16} className="filter-icon" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="filter-select"
              >
                <option value="all">全部优先级</option>
                <option value="high">高优先级</option>
                <option value="medium">中优先级</option>
                <option value="low">低优先级</option>
              </select>
            </div>
          </div>
        </div>
        <div className="toolbar-right">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              列表
            </button>
            <button 
              className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
            >
              看板
            </button>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
            新建任务
          </button>
        </div>
      </div>

      {/* 任务统计 */}
      <div className="tasks-stats">
        <div className="stat-item">
          <span className="stat-label">总任务</span>
          <span className="stat-value">{tasks.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">进行中</span>
          <span className="stat-value">{tasks.filter(t => t.status === 'in-progress').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">已完成</span>
          <span className="stat-value">{tasks.filter(t => t.status === 'completed').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">已逾期</span>
          <span className="stat-value">{tasks.filter(t => t.status === 'overdue').length}</span>
        </div>
      </div>

      {/* 任务列表 */}
      {viewMode === 'list' && (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item card">
              <div className="task-header">
                <div className="task-status" onClick={() => toggleTaskStatus(task.id)}>
                  {getStatusIcon(task.status)}
                </div>
                <div className="task-content">
                  <div className="task-title-row">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-badges">
                      <span className={`priority-badge priority-${getPriorityColor(task.priority)}`}>
                        {getPriorityText(task.priority)}
                      </span>
                      <span className={`status-badge status-${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                    </div>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <div className="meta-left">
                      <div className="meta-item">
                        <User size={14} />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{task.project}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>截止: {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="meta-right">
                      {task.comments > 0 && (
                        <div className="meta-item">
                          <MessageSquare size={14} />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="meta-item">
                          <Paperclip size={14} />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {task.status !== 'pending' && task.status !== 'completed' && (
                    <div className="task-progress">
                      <div className="progress-header">
                        <span className="progress-label">进度</span>
                        <span className="progress-percentage">{task.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="task-tags">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="task-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="task-actions">
                  <button className="action-btn">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 看板视图 */}
      {viewMode === 'kanban' && (
        <div className="kanban-board">
          {['pending', 'in-progress', 'completed'].map((status) => (
            <div key={status} className="kanban-column">
              <div className="column-header">
                <h3 className="column-title">{getStatusText(status)}</h3>
                <span className="column-count">
                  {filteredTasks.filter(task => task.status === status).length}
                </span>
              </div>
              <div className="column-tasks">
                {filteredTasks
                  .filter(task => task.status === status)
                  .map((task) => (
                    <div key={task.id} className="kanban-task card">
                      <div className="task-header-kanban">
                        <h4 className="task-title-kanban">{task.title}</h4>
                        <span className={`priority-badge priority-${getPriorityColor(task.priority)}`}>
                          {getPriorityText(task.priority)}
                        </span>
                      </div>
                      <p className="task-description-kanban">{task.description}</p>
                      <div className="task-meta-kanban">
                        <div className="meta-item">
                          <User size={12} />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="meta-item">
                          <Clock size={12} />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                      {task.status === 'in-progress' && (
                        <div className="task-progress-kanban">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{task.progress}%</span>
                        </div>
                      )}
                      <div className="task-tags-kanban">
                        {task.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="task-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 创建任务模态框 */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>新建任务</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="modal-body">
              <div className="form-group">
                <label className="form-label">任务标题</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">任务描述</label>
                <textarea
                  className="form-input"
                  rows="3"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="请输入任务描述..."
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">负责人</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">所属项目</label>
                  <select
                    className="form-select"
                    value={newTask.project}
                    onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                    required
                  >
                    <option value="">选择项目</option>
                    <option value="电商平台重构">电商平台重构</option>
                    <option value="移动端APP开发">移动端APP开发</option>
                    <option value="数据分析系统">数据分析系统</option>
                    <option value="客户服务优化">客户服务优化</option>
                    <option value="安全系统升级">安全系统升级</option>
                    <option value="营销活动策划">营销活动策划</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">优先级</label>
                  <select
                    className="form-select"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">低优先级</option>
                    <option value="medium">中优先级</option>
                    <option value="high">高优先级</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">截止日期</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">标签</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
                  placeholder="用逗号分隔多个标签"
                />
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
                  创建任务
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;