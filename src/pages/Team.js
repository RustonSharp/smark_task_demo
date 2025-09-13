import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, MapPin, Edit, Trash2, UserPlus, Crown, Shield, User } from 'lucide-react';
import './Team.css';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@company.com',
      phone: '138-0000-0001',
      role: 'admin',
      department: '技术部',
      position: '技术总监',
      avatar: null,
      status: 'active',
      joinDate: '2023-01-15',
      projects: ['项目A', '项目B'],
      skills: ['React', 'Node.js', '项目管理']
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@company.com',
      phone: '138-0000-0002',
      role: 'manager',
      department: '产品部',
      position: '产品经理',
      avatar: null,
      status: 'active',
      joinDate: '2023-03-20',
      projects: ['项目A', '项目C'],
      skills: ['产品设计', '用户研究', 'Figma']
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@company.com',
      phone: '138-0000-0003',
      role: 'developer',
      department: '技术部',
      position: '前端开发工程师',
      avatar: null,
      status: 'active',
      joinDate: '2023-06-10',
      projects: ['项目B', '项目D'],
      skills: ['Vue.js', 'React', 'TypeScript']
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@company.com',
      phone: '138-0000-0004',
      role: 'developer',
      department: '技术部',
      position: '后端开发工程师',
      avatar: null,
      status: 'inactive',
      joinDate: '2023-08-15',
      projects: ['项目C'],
      skills: ['Java', 'Spring Boot', 'MySQL']
    },
    {
      id: 5,
      name: '孙七',
      email: 'sunqi@company.com',
      phone: '138-0000-0005',
      role: 'designer',
      department: '设计部',
      position: 'UI/UX设计师',
      avatar: null,
      status: 'active',
      joinDate: '2023-09-01',
      projects: ['项目A', '项目D'],
      skills: ['Figma', 'Sketch', 'Photoshop']
    }
  ]);
  
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'developer',
    department: '',
    position: '',
    skills: ''
  });

  // 角色配置
  const roles = {
    admin: { label: '管理员', icon: Crown, color: '#ef4444' },
    manager: { label: '项目经理', icon: Shield, color: '#f59e0b' },
    developer: { label: '开发者', icon: User, color: '#10b981' },
    designer: { label: '设计师', icon: User, color: '#8b5cf6' }
  };

  // 过滤成员
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // 添加成员
  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member = {
        ...newMember,
        id: Date.now(),
        avatar: null,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        projects: [],
        skills: newMember.skills.split(',').map(s => s.trim()).filter(s => s)
      };
      setMembers([...members, member]);
      setNewMember({
        name: '',
        email: '',
        phone: '',
        role: 'developer',
        department: '',
        position: '',
        skills: ''
      });
      setShowAddModal(false);
    }
  };

  // 删除成员
  const handleDeleteMember = (memberId) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  // 切换成员状态
  const toggleMemberStatus = (memberId) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
        : member
    ));
  };

  // 获取角色统计
  const getRoleStats = () => {
    const stats = { admin: 0, manager: 0, developer: 0, designer: 0 };
    members.forEach(member => {
      if (member.status === 'active') {
        stats[member.role]++;
      }
    });
    return stats;
  };

  const roleStats = getRoleStats();

  return (
    <div className="team-page">
      <div className="team-header">
        <div className="header-left">
          <Users className="page-icon" />
          <div>
            <h1>团队管理</h1>
            <p>管理团队成员和权限设置</p>
          </div>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <UserPlus size={16} />
          添加成员
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{members.filter(m => m.status === 'active').length}</h3>
            <p>活跃成员</p>
          </div>
        </div>
        {Object.entries(roleStats).map(([role, count]) => {
          const RoleIcon = roles[role].icon;
          return (
            <div key={role} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: roles[role].color + '20', color: roles[role].color }}>
                <RoleIcon size={24} />
              </div>
              <div className="stat-content">
                <h3>{count}</h3>
                <p>{roles[role].label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 搜索和过滤 */}
      <div className="team-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="搜索成员姓名、邮箱或部门..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="filter-select"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="all">所有角色</option>
          {Object.entries(roles).map(([role, config]) => (
            <option key={role} value={role}>{config.label}</option>
          ))}
        </select>
      </div>

      {/* 成员列表 */}
      <div className="members-grid">
        {filteredMembers.map(member => {
          const RoleIcon = roles[member.role].icon;
          return (
            <div key={member.id} className={`member-card ${member.status}`}>
              <div className="member-header">
                <div className="member-avatar">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div className={`status-indicator ${member.status}`}></div>
                </div>
                <div className="member-actions">
                  <button className="action-btn edit">
                    <Edit size={14} />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className="member-info">
                <h3>{member.name}</h3>
                <div className="member-role">
                  <RoleIcon size={14} style={{ color: roles[member.role].color }} />
                  <span>{roles[member.role].label}</span>
                </div>
                <p className="member-position">{member.position}</p>
                <p className="member-department">{member.department}</p>
              </div>

              <div className="member-contact">
                <div className="contact-item">
                  <Mail size={14} />
                  <span>{member.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={14} />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="member-projects">
                <h4>参与项目</h4>
                <div className="project-tags">
                  {member.projects.length > 0 ? (
                    member.projects.map((project, index) => (
                      <span key={index} className="project-tag">{project}</span>
                    ))
                  ) : (
                    <span className="no-projects">暂无项目</span>
                  )}
                </div>
              </div>

              <div className="member-skills">
                <h4>技能标签</h4>
                <div className="skill-tags">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="member-footer">
                <span className="join-date">加入时间: {member.joinDate}</span>
                <button 
                  className={`status-toggle ${member.status}`}
                  onClick={() => toggleMemberStatus(member.id)}
                >
                  {member.status === 'active' ? '停用' : '启用'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="empty-state">
          <Users size={48} />
          <h3>未找到匹配的成员</h3>
          <p>尝试调整搜索条件或添加新成员</p>
        </div>
      )}

      {/* 添加成员模态框 */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>添加团队成员</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>姓名 *</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="输入姓名"
                  />
                </div>
                <div className="form-group">
                  <label>邮箱 *</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="输入邮箱地址"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>电话</label>
                  <input
                    type="tel"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                    placeholder="输入电话号码"
                  />
                </div>
                <div className="form-group">
                  <label>角色</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  >
                    {Object.entries(roles).map(([role, config]) => (
                      <option key={role} value={role}>{config.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>部门</label>
                  <input
                    type="text"
                    value={newMember.department}
                    onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                    placeholder="输入部门"
                  />
                </div>
                <div className="form-group">
                  <label>职位</label>
                  <input
                    type="text"
                    value={newMember.position}
                    onChange={(e) => setNewMember({...newMember, position: e.target.value})}
                    placeholder="输入职位"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>技能标签</label>
                <input
                  type="text"
                  value={newMember.skills}
                  onChange={(e) => setNewMember({...newMember, skills: e.target.value})}
                  placeholder="用逗号分隔多个技能，如：React, Node.js, 项目管理"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                取消
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddMember}
              >
                添加成员
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;