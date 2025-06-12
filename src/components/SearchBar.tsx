import React, { useState, useEffect } from 'react';
import { HCP } from '../types/network.types';
import './SearchBar.css';

interface SearchBarProps {
  hcps: HCP[];
  onSearch: (hcp: HCP | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ hcps, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<HCP[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = hcps.filter(hcp =>
        hcp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hcp.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hcp.organization?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(results);
      setShowDropdown(true);
    } else {
      setFilteredResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm, hcps]);

  const handleSelect = (hcp: HCP) => {
    setSearchTerm(hcp.name);
    setShowDropdown(false);
    onSearch(hcp);
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowDropdown(false);
    onSearch(null);
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 19L14.65 14.65" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={handleClear} className="clear-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
      
      {showDropdown && filteredResults.length > 0 && (
        <div className="search-dropdown">
          {filteredResults.map((hcp) => (
            <div
              key={hcp.id}
              className="search-result-item"
              onClick={() => handleSelect(hcp)}
            >
              <img
                src={hcp.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${hcp.id}`}
                alt={hcp.name}
                className="result-avatar"
              />
              <div className="result-info">
                <div className="result-name">{hcp.name}</div>
                <div className="result-details">
                  {hcp.title} • {hcp.organization}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;