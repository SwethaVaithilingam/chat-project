import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const ContactBookModal = ({ show, onHide }) => {
  const [contacts, setContacts] = useState([
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleAddContact = () => {
    if (newEmail) {
      setContacts([...contacts, { id: Date.now(), email: newEmail }]);
      setNewEmail('');
      setShowAddModal(false); // Close only the inner modal
    }
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <>
      {/* Main Contact Book Modal */}
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>
            Add New Contact
          </Button>
          <Table bordered>
            <thead>
              <tr>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.email}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2">Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(contact.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      {/* Add Contact Nested Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddContact}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactBookModal;
