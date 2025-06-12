import React from 'react';
import { HCP } from '../types/network.types';
import './ProfilePanel.css';

interface ProfilePanelProps {
  hcp: HCP | null;
  onClose: () => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ hcp, onClose }) => {
  if (!hcp) return null;

  return (
    <div className="profile-panel">
      <div className="profile-header">
        <div className="profile-main-info">
          <img 
            src={hcp.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${hcp.id}`} 
            alt={hcp.name}
            className="profile-avatar"
          />
          <div className="profile-details">
            <h2 className="profile-name">{hcp.name}</h2>
            <p className="profile-title">{hcp.title}</p>
            <p className="profile-org">{hcp.organization}</p>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-label">Peers</div>
          <div className="stat-value">{hcp.peers}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Following</div>
          <div className="stat-value">{hcp.following}</div>
        </div>
      </div>

      <button className="view-profile-button">View Profile</button>
      <button className="resume-button">Resume</button>

      {hcp.successRate && (
        <div className="metrics-section">
          <div className="metric-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="metric-icon">
              <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.81 18L10 15.27L5.19 18L6 12.14L2 8.27L7.91 7.26L10 2Z" fill="#10B981"/>
            </svg>
            <div className="metric-info">
              <div className="metric-label">Success rate</div>
              <div className="metric-value">{hcp.successRate}%</div>
              <div className="metric-change">+15%</div>
            </div>
          </div>
          
          {hcp.patientServed && (
            <div className="metric-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="metric-icon">
                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#6366F1"/>
                <path d="M10 12C5.58172 12 2 15.5817 2 20H18C18 15.5817 14.4183 12 10 12Z" fill="#6366F1"/>
              </svg>
              <div className="metric-info">
                <div className="metric-label">Patient Served</div>
                <div className="metric-value">{hcp.patientServed}</div>
                <div className="metric-change">+20</div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="about-section">
        <h3>About</h3>
        <p className="about-text">
          {hcp.specialization ? `Specializing in ${hcp.specialization}. ` : ''}
          Experienced healthcare professional with a strong background in patient care and medical research.
          {hcp.location ? ` Based in ${hcp.location}.` : ''}
        </p>
      </div>

      {hcp.education && hcp.education.length > 0 && (
        <div className="education-section">
          <h3>Education</h3>
          {hcp.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 14L21 9L12 4L3 9L12 14Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14L18.16 10.58C18.69 10.29 19.34 10.52 19.57 11.06C19.68 11.31 19.69 11.59 19.6 11.85L17.44 18.27C17.21 18.94 16.59 19.4 15.89 19.4H8.11C7.41 19.4 6.79 18.94 6.56 18.27L4.4 11.85C4.21 11.29 4.49 10.69 5.05 10.5C5.31 10.41 5.59 10.42 5.84 10.53L12 14Z" fill="#EBF5FF"/>
                </svg>
              </div>
              <div className="education-details">
                <h4>{edu.institution}</h4>
                <p className="education-degree">{edu.degree}</p>
                <p className="education-field">{edu.field}</p>
                <p className="education-year">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePanel;