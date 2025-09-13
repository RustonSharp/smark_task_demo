import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');
  const [chartType, setChartType] = useState('bar');
  const [isLoading, setIsLoading] = useState(false);

  // 模拟数据
  const kpiData = {
    totalProjects: { value: 24, change: 12, trend: 'up' },
    completedTasks: { value: 156, change: 8, trend: 'up' },
    teamMembers: { value: 32, change: 3, trend: 'up' },
    avgCompletion: { value: 78, change: -5, trend: 'down' }
  };

  const projectProgressData = [
    { name: '电商平台重构', progress: 75, tasks: 24, completed: 18 },
    { name: '移动端APP开发', progress: 45, tasks: 18, completed: 8 },
    { name: '数据分析系统', progress: 90, tasks: 15, completed: 14 },
    { name: '客户服务优化', progress: 100, tasks: 12, completed: 12 },
    { name: '安全系统升级', progress: 0, tasks: 8, completed: 0 },
    { name: '营销活动策划', progress: 30, tasks: 20, completed: 6 }
  ];

  const taskStatusData = [
    { status: '已完成', count: 45, percentage: 45, color: '#22c55e' },
    { status: '进行中', count: 28, percentage: 28, color: '#3b82f6' },
    { status: '待开始', count: 18, percentage: 18, color: '#f59e0b' },
    { status: '已逾期', count: 9, percentage: 9, color: '#ef4444' }
  ];

  const teamPerformanceData = [
    { name: '张三', completed: 12, inProgress: 3, efficiency: 85 },
    { name: '李四', completed: 10, inProgress: 4, efficiency: 78 },
    { name: '王五', completed: 15, inProgress: 2, efficiency: 92 },
    { name: '赵六', completed: 8, inProgress: 5, efficiency: 72 },
    { name: '钱七', completed: 11, inProgress: 3, efficiency: 88 },
    { name: '孙八', completed: 9, inProgress: 4, efficiency: 75 }
  ];

  const weeklyProgressData = [
    { week: '第1周', planned: 20, completed: 18 },
    { week: '第2周', planned: 25, completed: 22 },
    { week: '第3周', planned: 30, completed: 28 },
    { week: '第4周', planned: 22, completed: 25 },
    { week: '第5周', planned: 28, completed: 24 },
    { week: '第6周', planned: 35, completed: 32 }
  ];

  const departmentData = [
    { department: '技术部', projects: 8, completion: 82 },
    { department: '产品部', projects: 5, completion: 76 },
    { department: '市场部', projects: 4, completion: 68 },
    { department: '客服部', projects: 3, completion: 95 },
    { department: '数据部', projects: 2, completion: 88 },
    { department: '安全部', projects: 2, completion: 45 }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    console.log('导出报告');
  };

  const renderBarChart = (data, dataKey, nameKey, color = '#3b82f6') => {
    const maxValue = Math.max(...data.map(item => item[dataKey]));
    
    return (
      <div className="bar-chart">
        {data.map((item, index) => (
          <div key={index} className="bar-item">
            <div className="bar-container">
              <div 
                className="bar-fill"
                style={{ 
                  height: `${(item[dataKey] / maxValue) * 100}%`,
                  backgroundColor: color
                }}
              >
                <span className="bar-value">{item[dataKey]}</span>
              </div>
            </div>
            <span className="bar-label">{item[nameKey]}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPieChart = (data) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = 0;
    
    return (
      <div className="pie-chart-container">
        <svg className="pie-chart" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.count / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="var(--bg-primary)"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="legend-label">{item.status}</span>
              <span className="legend-value">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="analytics fade-in">
      <div className="page-header">
        <h1 className="page-title">数据分析</h1>
        <p className="page-subtitle">项目和团队绩效分析报告</p>
      </div>

      {/* 工具栏 */}
      <div className="analytics-toolbar">
        <div className="toolbar-left">
          <div className="date-range-selector">
            <Calendar size={16} className="calendar-icon" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="date-select"
            >
              <option value="7">最近7天</option>
              <option value="30">最近30天</option>
              <option value="90">最近90天</option>
              <option value="365">最近一年</option>
            </select>
          </div>
          <div className="chart-type-selector">
            <Filter size={16} className="filter-icon" />
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="chart-select"
            >
              <option value="bar">柱状图</option>
              <option value="line">折线图</option>
              <option value="pie">饼图</option>
            </select>
          </div>
        </div>
        <div className="toolbar-right">
          <button 
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
            刷新
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleExport}
          >
            <Download size={16} />
            导出报告
          </button>
        </div>
      </div>

      {/* KPI指标卡片 */}
      <div className="kpi-grid">
        <div className="kpi-card card">
          <div className="kpi-header">
            <div className="kpi-icon projects">
              <BarChart3 size={24} />
            </div>
            <div className="kpi-trend">
              {kpiData.totalProjects.trend === 'up' ? (
                <TrendingUp size={16} className="trend-up" />
              ) : (
                <TrendingDown size={16} className="trend-down" />
              )}
              <span className={`trend-value ${kpiData.totalProjects.trend}`}>
                {kpiData.totalProjects.change}%
              </span>
            </div>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">{kpiData.totalProjects.value}</h3>
            <p className="kpi-label">总项目数</p>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-header">
            <div className="kpi-icon tasks">
              <CheckCircle size={24} />
            </div>
            <div className="kpi-trend">
              {kpiData.completedTasks.trend === 'up' ? (
                <TrendingUp size={16} className="trend-up" />
              ) : (
                <TrendingDown size={16} className="trend-down" />
              )}
              <span className={`trend-value ${kpiData.completedTasks.trend}`}>
                {kpiData.completedTasks.change}%
              </span>
            </div>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">{kpiData.completedTasks.value}</h3>
            <p className="kpi-label">已完成任务</p>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-header">
            <div className="kpi-icon team">
              <Users size={24} />
            </div>
            <div className="kpi-trend">
              {kpiData.teamMembers.trend === 'up' ? (
                <TrendingUp size={16} className="trend-up" />
              ) : (
                <TrendingDown size={16} className="trend-down" />
              )}
              <span className={`trend-value ${kpiData.teamMembers.trend}`}>
                {kpiData.teamMembers.change}%
              </span>
            </div>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">{kpiData.teamMembers.value}</h3>
            <p className="kpi-label">团队成员</p>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-header">
            <div className="kpi-icon completion">
              <Clock size={24} />
            </div>
            <div className="kpi-trend">
              {kpiData.avgCompletion.trend === 'up' ? (
                <TrendingUp size={16} className="trend-up" />
              ) : (
                <TrendingDown size={16} className="trend-down" />
              )}
              <span className={`trend-value ${kpiData.avgCompletion.trend}`}>
                {Math.abs(kpiData.avgCompletion.change)}%
              </span>
            </div>
          </div>
          <div className="kpi-content">
            <h3 className="kpi-value">{kpiData.avgCompletion.value}%</h3>
            <p className="kpi-label">平均完成率</p>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="charts-grid">
        {/* 项目进度图表 */}
        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="chart-title">项目进度分析</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <BarChart3 size={16} />
              </button>
            </div>
          </div>
          <div className="chart-content">
            {renderBarChart(projectProgressData, 'progress', 'name', '#3b82f6')}
          </div>
        </div>

        {/* 任务状态分布 */}
        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="chart-title">任务状态分布</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <PieChart size={16} />
              </button>
            </div>
          </div>
          <div className="chart-content">
            {renderPieChart(taskStatusData)}
          </div>
        </div>

        {/* 团队绩效 */}
        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="chart-title">团队绩效分析</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <Users size={16} />
              </button>
            </div>
          </div>
          <div className="chart-content">
            <div className="team-performance-list">
              {teamPerformanceData.map((member, index) => (
                <div key={index} className="team-member-item">
                  <div className="member-info">
                    <span className="member-name">{member.name}</span>
                    <div className="member-stats">
                      <span className="stat">完成: {member.completed}</span>
                      <span className="stat">进行: {member.inProgress}</span>
                    </div>
                  </div>
                  <div className="efficiency-bar">
                    <div className="efficiency-label">{member.efficiency}%</div>
                    <div className="efficiency-progress">
                      <div 
                        className="efficiency-fill"
                        style={{ width: `${member.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 周进度趋势 */}
        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="chart-title">周进度趋势</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <TrendingUp size={16} />
              </button>
            </div>
          </div>
          <div className="chart-content">
            <div className="line-chart">
              {weeklyProgressData.map((week, index) => (
                <div key={index} className="week-item">
                  <div className="week-bars">
                    <div className="bar-group">
                      <div 
                        className="bar planned"
                        style={{ height: `${(week.planned / 35) * 100}%` }}
                        title={`计划: ${week.planned}`}
                      ></div>
                      <div 
                        className="bar completed"
                        style={{ height: `${(week.completed / 35) * 100}%` }}
                        title={`完成: ${week.completed}`}
                      ></div>
                    </div>
                  </div>
                  <span className="week-label">{week.week}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color planned"></div>
                <span>计划任务</span>
              </div>
              <div className="legend-item">
                <div className="legend-color completed"></div>
                <span>完成任务</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 部门统计表格 */}
      <div className="department-stats card">
        <div className="stats-header">
          <h3 className="stats-title">部门统计</h3>
          <div className="stats-actions">
            <button className="btn btn-secondary btn-sm">
              <Download size={14} />
              导出
            </button>
          </div>
        </div>
        <div className="stats-table">
          <div className="table-header">
            <div className="table-cell">部门</div>
            <div className="table-cell">项目数</div>
            <div className="table-cell">完成率</div>
            <div className="table-cell">状态</div>
          </div>
          {departmentData.map((dept, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">
                <span className="dept-name">{dept.department}</span>
              </div>
              <div className="table-cell">
                <span className="project-count">{dept.projects}</span>
              </div>
              <div className="table-cell">
                <div className="completion-cell">
                  <span className="completion-text">{dept.completion}%</span>
                  <div className="completion-bar">
                    <div 
                      className="completion-fill"
                      style={{ width: `${dept.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="table-cell">
                <span className={`status-indicator ${
                  dept.completion >= 80 ? 'excellent' :
                  dept.completion >= 60 ? 'good' :
                  dept.completion >= 40 ? 'average' : 'poor'
                }`}>
                  {dept.completion >= 80 ? '优秀' :
                   dept.completion >= 60 ? '良好' :
                   dept.completion >= 40 ? '一般' : '待改进'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;