// import React, { useState, useRef, useEffect } from 'react';
// import { FaCog } from 'react-icons/fa';
// import { Modal, Button } from 'react-bootstrap';

// const TopBar = () => {
//     const [showPopup, setShowPopup] = useState(false);
    
//     const [showSettings, setShowSettings] = useState(false);
//     const [activeSetting, setActiveSetting] = useState('receiverLanguage');
//     const popupRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (popupRef.current && !popupRef.current.contains(event.target)) {
//                 setShowPopup(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const renderSettingOptions = () => {
//         switch (activeSetting) {
//             case 'receiverLanguage':
//             case 'senderLanguage':
//                 return ['Tamil', 'English', 'Hindi'].map((lang) => (
//                     <div key={lang} className="form-check">
//                         <input className="form-check-input" type="radio" name={activeSetting} id={lang} />
//                         <label className="form-check-label" htmlFor={lang}>
//                             {lang}
//                         </label>
//                     </div>
//                 ));
//             case 'receivingFormat':
//                 return ['Text Mode', 'Audio Mode', 'Hybrid Mode'].map((mode) => (
//                     <div key={mode} className="form-check">
//                         <input className="form-check-input" type="radio" name="format" id={mode} />
//                         <label className="form-check-label" htmlFor={mode}>
//                             {mode}
//                         </label>
//                     </div>
//                 ));
//             case 'profile':
//                 return <p>Profile settings go here...</p>;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <>
//             <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light position-relative">
//                 <h5 className="m-0">ChatApp</h5>
//                 <div className="position-relative">
//                     <FaCog
//                         className="cursor-pointer"
//                         onClick={() => setShowPopup(!showPopup)}
//                     />
//                     {showPopup && (
//                         <div
//                             ref={popupRef}
//                             className="position-absolute bg-white border rounded shadow p-2"
//                             style={{ right: 0, top: '100%', zIndex: 10, minWidth: '200px' }}
//                         >
//                             {/* <div className="dropdown-item">Contact Book</div> */}
//                             <div
//                                 className="dropdown-item"
//                                 onClick={() => {
//                                     setShowContactBook(true);
//                                     setShowPopup(false); // close the settings popup
//                                 }}
//                             >
//                                 Contact Book
//                             </div>
//                             <div
//                                 className="dropdown-item"
//                                 onClick={() => {
//                                     setShowSettings(true);
//                                     setShowPopup(false);
//                                 }}
//                             >
//                                 Settings
//                             </div>
//                             <div className="dropdown-item text-danger">Log Out</div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <Modal show={showSettings} onHide={() => setShowSettings(false)} size="lg" centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Settings</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="d-flex">
//                     <div className="border-end pe-3" style={{ width: '30%' }}>
//                         <div
//                             className={`mb-2 cursor-pointer ${activeSetting === 'receiverLanguage' ? 'fw-bold' : ''}`}
//                             onClick={() => setActiveSetting('receiverLanguage')}
//                         >
//                             Receiver Language
//                         </div>
//                         <div
//                             className={`mb-2 cursor-pointer ${activeSetting === 'senderLanguage' ? 'fw-bold' : ''}`}
//                             onClick={() => setActiveSetting('senderLanguage')}
//                         >
//                             Sender Language
//                         </div>
//                         <div
//                             className={`mb-2 cursor-pointer ${activeSetting === 'receivingFormat' ? 'fw-bold' : ''}`}
//                             onClick={() => setActiveSetting('receivingFormat')}
//                         >
//                             Receiving Format
//                         </div>
//                         <div
//                             className={`mb-2 cursor-pointer ${activeSetting === 'profile' ? 'fw-bold' : ''}`}
//                             onClick={() => setActiveSetting('profile')}
//                         >
//                             Profile Settings
//                         </div>
//                     </div>
//                     <div className="ps-3" style={{ width: '70%' }}>
//                         {renderSettingOptions()}
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowSettings(false)}>
//                         Close
//                     </Button>
//                     <Button variant="primary">Save Changes</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };

// export default TopBar;


import React, { useState, useRef, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const TopBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showContactBook, setShowContactBook] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);

  const [contacts, setContacts] = useState([
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' }
  ]);

  const [newEmail, setNewEmail] = useState('');
  const [activeSetting, setActiveSetting] = useState('receiverLanguage');
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderSettingOptions = () => {
    switch (activeSetting) {
      case 'receiverLanguage':
      case 'senderLanguage':
        return ['Tamil', 'English', 'Hindi'].map((lang) => (
          <div key={lang} className="form-check">
            <input className="form-check-input" type="radio" name={activeSetting} id={lang} />
            <label className="form-check-label" htmlFor={lang}>
              {lang}
            </label>
          </div>
        ));
      case 'receivingFormat':
        return ['Text Mode', 'Audio Mode', 'Hybrid Mode'].map((mode) => (
          <div key={mode} className="form-check">
            <input className="form-check-input" type="radio" name="format" id={mode} />
            <label className="form-check-label" htmlFor={mode}>
              {mode}
            </label>
          </div>
        ));
      case 'profile':
        return <p>Profile settings go here...</p>;
      default:
        return null;
    }
  };

  const handleAddContact = () => {
    if (newEmail) {
      setContacts([...contacts, { id: Date.now(), email: newEmail }]);
      setNewEmail('');
      setShowAddContactModal(false); // Close only the inner modal
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light position-relative">
        <h5 className="m-0">ChatApp</h5>
        <div className="position-relative">
          <FaCog
            className="cursor-pointer"
            onClick={() => setShowPopup(!showPopup)}
          />
          {showPopup && (
            <div
              ref={popupRef}
              className="position-absolute bg-white border rounded shadow p-2"
              style={{ right: 0, top: '100%', zIndex: 10, minWidth: '200px' }}
            >
              <div
                className="dropdown-item"
                onClick={() => {
                  setShowContactBook(true);
                  setShowPopup(false);
                }}
              >
                Contact Book
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  setShowSettings(true);
                  setShowPopup(false);
                }}
              >
                Settings
              </div>
              <div className="dropdown-item text-danger">Log Out</div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <Modal show={showSettings} onHide={() => setShowSettings(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex">
          <div className="border-end pe-3" style={{ width: '30%' }}>
            {['receiverLanguage', 'senderLanguage', 'receivingFormat', 'profile'].map((item) => (
              <div
                key={item}
                className={`mb-2 cursor-pointer ${activeSetting === item ? 'fw-bold' : ''}`}
                onClick={() => setActiveSetting(item)}
              >
                {item.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </div>
            ))}
          </div>
          <div className="ps-3" style={{ width: '70%' }}>
            {renderSettingOptions()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSettings(false)}>Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Contact Book Modal */}
      <Modal show={showContactBook} onHide={() => setShowContactBook(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="success" onClick={() => setShowAddContactModal(true)} className="mb-3">
            Add New Contact
          </Button>
          <ul className="list-group">
            {contacts.map((contact) => (
              <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{contact.email}</span>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteContact(contact.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContactBook(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Contact Modal (Nested) */}
      <Modal show={showAddContactModal} onHide={() => setShowAddContactModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddContactModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddContact}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TopBar;
