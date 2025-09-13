import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Database, Save, RefreshCw } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // 个人资料
    profile: {
      name: '张三',
      email: 'zhangsan@company.com',
      phone: '138-0000-0001',
      department: '技术部',
      position: '技术总监',
      avatar: null
    },
    // 通知设置
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      taskReminders: true,
      projectUpdates: true,
      weeklyReports: false,
      systemMaintenance: true
    },
    // 安全设置
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAlerts: true
    },
    // 界面设置
    appearance: {
      theme: 'dark',
      language: 'zh-CN',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
      sidebarCollapsed: false
    },
    // 系统设置
    system: {
      autoSave: true,
      autoBackup: true,
      backupFrequency: 'daily',
      dataRetention: 365,
      debugMode: false
    }
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const tabs = [
    { id: 'profile', label: '个人资料', icon: User },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'security', label: '安全设置', icon: Shield },
    { id: 'appearance', label: '界面设置', icon: Palette },
    { id: 'system', label: '系统设置', icon: Database }
  ];

  // 更新设置
  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  // 保存设置
  const handleSave = () => {
    // 这里应该调用API保存设置
    console.log('保存设置:', settings);
    setUnsavedChanges(false);
    // 显示保存成功提示
  };

  // 重置设置
  const handleReset = () => {
    // 重置到默认值或从服务器重新加载
    setUnsavedChanges(false);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-left">
          <SettingsIcon className="page-icon" />
          <div>
            <h1>系统设置</h1>
            <p>管理您的个人资料和系统配置</p>
          </div>
        </div>
        <div className="header-actions">
          {unsavedChanges && (
            <span className="unsaved-indicator">有未保存的更改</span>
          )}
          <button className="btn btn-secondary" onClick={handleReset}>
            <RefreshCw size={16} />
            重置
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={16} />
            保存设置
          </button>
        </div>
      </div>

      <div className="settings-content">
        {/* 侧边栏导航 */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 主要内容区域 */}
        <div className="settings-main">
          {/* 个人资料 */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>个人资料</h2>
              <p className="section-description">管理您的个人信息和联系方式</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>姓名</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>邮箱</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>电话</label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>部门</label>
                  <input
                    type="text"
                    value={settings.profile.department}
                    onChange={(e) => updateSetting('profile', 'department', e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label>职位</label>
                  <input
                    type="text"
                    value={settings.profile.position}
                    onChange={(e) => updateSetting('profile', 'position', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 通知设置 */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>通知设置</h2>
              <p className="section-description">配置您希望接收的通知类型</p>
              
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>邮件通知</h3>
                    <p>通过邮件接收重要通知</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>推送通知</h3>
                    <p>在浏览器中显示推送通知</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>任务提醒</h3>
                    <p>任务截止日期和重要事件提醒</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.taskReminders}
                      onChange={(e) => updateSetting('notifications', 'taskReminders', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>项目更新</h3>
                    <p>项目状态变更和进度更新通知</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.projectUpdates}
                      onChange={(e) => updateSetting('notifications', 'projectUpdates', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>周报通知</h3>
                    <p>每周工作总结和统计报告</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.weeklyReports}
                      onChange={(e) => updateSetting('notifications', 'weeklyReports', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>系统维护</h3>
                    <p>系统维护和更新通知</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.systemMaintenance}
                      onChange={(e) => updateSetting('notifications', 'systemMaintenance', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 安全设置 */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>安全设置</h2>
              <p className="section-description">管理您的账户安全和隐私设置</p>
              
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>双因素认证</h3>
                    <p>为您的账户添加额外的安全保护</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>会话超时</h3>
                    <p>自动登出的时间（分钟）</p>
                  </div>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="setting-select"
                  >
                    <option value={15}>15分钟</option>
                    <option value={30}>30分钟</option>
                    <option value={60}>1小时</option>
                    <option value={120}>2小时</option>
                    <option value={480}>8小时</option>
                  </select>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>密码过期</h3>
                    <p>密码自动过期时间（天）</p>
                  </div>
                  <select
                    value={settings.security.passwordExpiry}
                    onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                    className="setting-select"
                  >
                    <option value={30}>30天</option>
                    <option value={60}>60天</option>
                    <option value={90}>90天</option>
                    <option value={180}>180天</option>
                    <option value={365}>1年</option>
                  </select>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>登录提醒</h3>
                    <p>异常登录时发送邮件提醒</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.security.loginAlerts}
                      onChange={(e) => updateSetting('security', 'loginAlerts', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 界面设置 */}
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>界面设置</h2>
              <p className="section-description">自定义您的界面外观和语言偏好</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>主题</label>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                  >
                    <option value="light">浅色主题</option>
                    <option value="dark">深色主题</option>
                    <option value="auto">跟随系统</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>语言</label>
                  <select
                    value={settings.appearance.language}
                    onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="zh-TW">繁体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>日期格式</label>
                  <select
                    value={settings.appearance.dateFormat}
                    onChange={(e) => updateSetting('appearance', 'dateFormat', e.target.value)}
                  >
                    <option value="YYYY-MM-DD">2024-01-15</option>
                    <option value="MM/DD/YYYY">01/15/2024</option>
                    <option value="DD/MM/YYYY">15/01/2024</option>
                    <option value="YYYY年MM月DD日">2024年01月15日</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>时间格式</label>
                  <select
                    value={settings.appearance.timeFormat}
                    onChange={(e) => updateSetting('appearance', 'timeFormat', e.target.value)}
                  >
                    <option value="24h">24小时制</option>
                    <option value="12h">12小时制</option>
                  </select>
                </div>
              </div>
              
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>侧边栏默认收起</h3>
                    <p>页面加载时自动收起侧边栏</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.appearance.sidebarCollapsed}
                      onChange={(e) => updateSetting('appearance', 'sidebarCollapsed', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 系统设置 */}
          {activeTab === 'system' && (
            <div className="settings-section">
              <h2>系统设置</h2>
              <p className="section-description">配置系统行为和数据管理选项</p>
              
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>自动保存</h3>
                    <p>编辑时自动保存更改</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.system.autoSave}
                      onChange={(e) => updateSetting('system', 'autoSave', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>自动备份</h3>
                    <p>定期自动备份数据</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.system.autoBackup}
                      onChange={(e) => updateSetting('system', 'autoBackup', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>备份频率</h3>
                    <p>自动备份的时间间隔</p>
                  </div>
                  <select
                    value={settings.system.backupFrequency}
                    onChange={(e) => updateSetting('system', 'backupFrequency', e.target.value)}
                    className="setting-select"
                    disabled={!settings.system.autoBackup}
                  >
                    <option value="hourly">每小时</option>
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                  </select>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>数据保留期</h3>
                    <p>数据保留时间（天）</p>
                  </div>
                  <select
                    value={settings.system.dataRetention}
                    onChange={(e) => updateSetting('system', 'dataRetention', parseInt(e.target.value))}
                    className="setting-select"
                  >
                    <option value={30}>30天</option>
                    <option value={90}>90天</option>
                    <option value={180}>180天</option>
                    <option value={365}>1年</option>
                    <option value={730}>2年</option>
                    <option value={-1}>永久保留</option>
                  </select>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>调试模式</h3>
                    <p>启用详细的错误日志和调试信息</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.system.debugMode}
                      onChange={(e) => updateSetting('system', 'debugMode', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
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