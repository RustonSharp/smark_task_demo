import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin, Edit, Trash2 } from 'lucide-react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: '项目启动会议',
      date: '2024-01-15',
      time: '09:00',
      duration: '2小时',
      attendees: ['张三', '李四', '王五'],
      location: '会议室A',
      type: 'meeting'
    },
    {
      id: 2,
      title: '代码评审',
      date: '2024-01-15',
      time: '14:00',
      duration: '1小时',
      attendees: ['开发团队'],
      location: '线上',
      type: 'review'
    },
    {
      id: 3,
      title: '产品演示',
      date: '2024-01-16',
      time: '10:00',
      duration: '1.5小时',
      attendees: ['产品团队', '客户'],
      location: '演示厅',
      type: 'demo'
    }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    attendees: '',
    location: '',
    type: 'meeting'
  });

  // 获取当前月份的天数
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // 添加上个月的日期
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // 添加当前月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // 添加下个月的日期
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  // 获取指定日期的事件
  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  // 处理日期点击
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // 处理添加事件
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        ...newEvent,
        id: Date.now(),
        attendees: newEvent.attendees.split(',').map(a => a.trim())
      };
      setEvents([...events, event]);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        duration: '',
        attendees: '',
        location: '',
        type: 'meeting'
      });
      setShowEventModal(false);
    }
  };

  // 删除事件
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div className="header-left">
          <CalendarIcon className="page-icon" />
          <div>
            <h1>日程安排</h1>
            <p>管理您的日程和会议安排</p>
          </div>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowEventModal(true)}
        >
          <Plus size={16} />
          添加事件
        </button>
      </div>

      <div className="calendar-content">
        <div className="calendar-main">
          <div className="calendar-nav">
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="nav-btn"
            >
              ‹
            </button>
            <h2>{currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}</h2>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="nav-btn"
            >
              ›
            </button>
          </div>

          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {weekDays.map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {days.map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                const isSelected = selectedDate.toDateString() === day.date.toDateString();
                const isToday = new Date().toDateString() === day.date.toDateString();
                
                return (
                  <div 
                    key={index}
                    className={`calendar-day ${
                      day.isCurrentMonth ? 'current-month' : 'other-month'
                    } ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => handleDateClick(day.date)}
                  >
                    <span className="day-number">{day.date.getDate()}</span>
                    {dayEvents.length > 0 && (
                      <div className="day-events">
                        {dayEvents.slice(0, 2).map(event => (
                          <div key={event.id} className={`event-dot ${event.type}`}>
                            {event.title.substring(0, 6)}...
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="more-events">+{dayEvents.length - 2}</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="selected-date">
            <h3>{selectedDate.toLocaleDateString('zh-CN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}</h3>
          </div>

          <div className="events-list">
            <h4>今日事件 ({selectedDateEvents.length})</h4>
            {selectedDateEvents.length === 0 ? (
              <p className="no-events">暂无事件安排</p>
            ) : (
              selectedDateEvents.map(event => (
                <div key={event.id} className={`event-item ${event.type}`}>
                  <div className="event-header">
                    <h5>{event.title}</h5>
                    <div className="event-actions">
                      <button className="action-btn edit">
                        <Edit size={14} />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="event-details">
                    <div className="event-time">
                      <Clock size={14} />
                      {event.time} ({event.duration})
                    </div>
                    <div className="event-location">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                    <div className="event-attendees">
                      <Users size={14} />
                      {Array.isArray(event.attendees) ? event.attendees.join(', ') : event.attendees}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 添加事件模态框 */}
      {showEventModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>添加新事件</h3>
              <button 
                className="close-btn"
                onClick={() => setShowEventModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>事件标题</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="输入事件标题"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>日期</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>时间</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>持续时间</label>
                  <input
                    type="text"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    placeholder="如：2小时"
                  />
                </div>
                <div className="form-group">
                  <label>类型</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  >
                    <option value="meeting">会议</option>
                    <option value="review">评审</option>
                    <option value="demo">演示</option>
                    <option value="training">培训</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>地点</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  placeholder="输入地点"
                />
              </div>
              <div className="form-group">
                <label>参与者</label>
                <input
                  type="text"
                  value={newEvent.attendees}
                  onChange={(e) => setNewEvent({...newEvent, attendees: e.target.value})}
                  placeholder="用逗号分隔多个参与者"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowEventModal(false)}
              >
                取消
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddEvent}
              >
                添加事件
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;