import React, { useState } from 'react';
import './ContactModal.css';
export default function ContactModal({ show, onClose, onAddContact, contacts, onEditContact, onDeleteContact }) {
  const [activeTab, setActiveTab] = useState('add');
  const [newContact, setNewContact] = useState({ name: '', email: '' });
  const [editingContactId, setEditingContactId] = useState(null);

  const handleSave = () => {
    if (newContact.name && newContact.email) {
      onAddContact(newContact);
      setNewContact({ name: '', email: '' });
      onClose();
    }
  };

  const handleNameChange = (id, name) => onEditContact(id, name);
  const handleDelete = (id) => onDeleteContact(id);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="contact-modal">
        <div className="modal-left">
          <button className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
            Add New Contact
          </button>
          <button className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`} onClick={() => setActiveTab('edit')}>
            Edit Contact
          </button>
        </div>

        <div className="modal-right">
          {activeTab === 'add' && (
            <div>
              <h5>Add New Contact</h5>
              <input type="text" placeholder="Name" className="form-control mb-2"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
              <input type="email" placeholder="Email" className="form-control mb-2"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              />
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          )}

          {activeTab === 'edit' && (
            <div>
              <h5>Edit Contacts</h5>
              {contacts.map((contact) => (
                <div key={contact.id} className="mb-2 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={contact.name}
                    onChange={(e) => handleNameChange(contact.id, e.target.value)}
                  />
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}
