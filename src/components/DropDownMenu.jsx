// src/components/DropDownMenu.jsx
import React, { useState, useRef, useEffect } from 'react';

const DropDownMenu = ({ onOpenContact }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="btn btn-light"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>

      {showDropdown && (
        <div
          className="dropdown-menu show"
          style={{ right: 0, left: 'auto', top: '100%', position: 'absolute' }}
        >
          <button
            className="dropdown-item"
            onClick={() => {
              onOpenContact?.();
              setShowDropdown(false);
            }}
          >
            📇 Contact Book
          </button>
          <button className="dropdown-item" onClick={() => alert('Settings')}>
            ⚙️ Settings
          </button>
          <button className="dropdown-item text-danger" onClick={() => alert('Logged out')}>
            🔓 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
