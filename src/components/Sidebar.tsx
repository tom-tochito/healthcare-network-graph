import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: '🔍', label: 'Search', active: true },
    { icon: '👤', label: 'Profile', active: false },
    { icon: '🔗', label: 'Connections', active: false },
    { icon: '📅', label: 'Events', active: false },
    { icon: '📊', label: 'Analytics', active: false },
    { icon: '📝', label: 'Publications', active: false },
    { icon: '🏥', label: 'Institutions', active: false },
    { icon: '💬', label: 'Messages', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ];

  return (
    <aside className="app-sidebar">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`sidebar-item ${item.active ? 'active' : ''}`}
          title={item.label}
        >
          <span className="sidebar-icon">{item.icon}</span>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;