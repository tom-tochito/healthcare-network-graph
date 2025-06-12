import React from 'react';
import './Header.css';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onCreateWeb: () => void;
  showConnections: boolean;
  onToggleConnections: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = 'Emily Carter',
  userAvatar,
  onCreateWeb,
  showConnections,
  onToggleConnections
}) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>PeerSpace</span>
        </div>
      </div>

      <div className="header-center">
        <div className="connection-stats">
          <span className="stat-label">My Peers:</span>
          <span className="stat-value">232</span>
          <span className="stat-label">Following:</span>
          <span className="stat-value">124</span>
        </div>
      </div>

      <div className="header-right">
        <button className="create-web-button" onClick={onCreateWeb}>
          Create web
        </button>
        <div className="toggle-container">
          <span className="toggle-label">Show connections</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={showConnections}
              onChange={onToggleConnections}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">Show my connections on map</span>
        </div>
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <img 
            src={userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
            alt={userName}
            className="user-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;