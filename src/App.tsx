import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import NetworkGraph from './components/NetworkGraph';
import ProfilePanel from './components/ProfilePanel';
import { HCP, NetworkNode, NetworkLink } from './types/network.types';
import { mockHCPs, generateNetworkData } from './data/mockData';
import './App.css';

function App() {
  const [selectedHCP, setSelectedHCP] = useState<HCP | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [hoveredLink, setHoveredLink] = useState<NetworkLink | null>(null);
  const [showConnections, setShowConnections] = useState(true);
  const [showProfilePanel, setShowProfilePanel] = useState(false);

  const [networkData, setNetworkData] = useState(() => generateNetworkData('emily-carter'));

  const handleSearch = useCallback((hcp: HCP | null) => {
    setSelectedHCP(hcp);
    if (hcp) {
      setShowProfilePanel(true);
      setNetworkData(generateNetworkData(hcp.id));
    }
  }, []);

  const handleNodeClick = useCallback((node: NetworkNode) => {
    setSelectedHCP(node);
    setShowProfilePanel(true);
  }, []);

  const handleNodeHover = useCallback((node: NetworkNode | null) => {
    setHoveredNode(node);
  }, []);

  const handleLinkClick = useCallback((link: NetworkLink) => {
    console.log('Link clicked:', link);
  }, []);

  const handleLinkHover = useCallback((link: NetworkLink | null) => {
    setHoveredLink(link);
  }, []);

  const handleCreateWeb = useCallback(() => {
    console.log('Create web clicked');
  }, []);

  const handleToggleConnections = useCallback(() => {
    setShowConnections(prev => !prev);
  }, []);

  const handleCloseProfile = useCallback(() => {
    setShowProfilePanel(false);
  }, []);

  return (
    <div className="app">
      <Header
        userName="Emily Carter"
        onCreateWeb={handleCreateWeb}
        showConnections={showConnections}
        onToggleConnections={handleToggleConnections}
      />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <div className="main-header">
            <SearchBar hcps={mockHCPs} onSearch={handleSearch} />
            <div className="view-filters">
              <button className="filter-button">
                <span>Filter</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="graph-container">
            {showProfilePanel && (
              <ProfilePanel hcp={selectedHCP} onClose={handleCloseProfile} />
            )}
            <NetworkGraph
              data={networkData}
              selectedNode={selectedHCP?.id || null}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              onLinkClick={handleLinkClick}
              onLinkHover={handleLinkHover}
            />
            {hoveredLink && (
              <div className="link-tooltip">
                {hoveredLink.label}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;