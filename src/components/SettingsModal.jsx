import React, { useState } from 'react';
import './SettingsModal.css';

export default function SettingsModal({ show, onClose, settings, onSave }) {
  const [activeTab, setActiveTab] = useState('language');
  const [sendingLang, setSendingLang] = useState(settings.sendingLang || 'English');
  const [receivingLang, setReceivingLang] = useState(settings.receivingLang || 'English');
  const [chatFormat, setChatFormat] = useState(settings.chatFormat || 'Text');

  const handleSave = () => {
    onSave({ sendingLang, receivingLang, chatFormat });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <div className="settings-left">
          <button className={`tab-btn ${activeTab === 'language' ? 'active' : ''}`} onClick={() => setActiveTab('language')}>
            Default Language
          </button>
          <button className={`tab-btn ${activeTab === 'format' ? 'active' : ''}`} onClick={() => setActiveTab('format')}>
            Chat Format
          </button>
        </div>

        <div className="settings-right">
          {activeTab === 'language' && (
            <div>
              <h5>Sending Language</h5>
              <select value={sendingLang} onChange={(e) => setSendingLang(e.target.value)}>
                <option>Tamil</option>
                <option>English</option>
                <option>Hindi</option>
              </select>

              <h5 className="mt-3">Receiving Language</h5>
              <select value={receivingLang} onChange={(e) => setReceivingLang(e.target.value)}>
                <option>Tamil</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          )}

          {activeTab === 'format' && (
            <div>
              <h5>Receiving Chat Format Mode</h5>
              <select value={chatFormat} onChange={(e) => setChatFormat(e.target.value)}>
                <option>Audio Mode</option>
                <option>Text Mode</option>
                <option>Hybrid Mode</option>
              </select>
            </div>
          )}

          <button className="btn-save" onClick={handleSave}>Save</button>
        </div>

        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}
