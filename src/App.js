import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LanguageSelector from './components/LanguageSelector';
import FilePicker from './components/FilePicker';
import SearchBar from './components/SearchBar';
import AudioRecorder from './components/AudioRecorder';
import DropDownMenu from './components/DropDownMenu';
import ContactModal from './components/ContactModal';



const initialMessages = {
  1: [{ text: 'Hello Alice!', sender: 'me' }, { text: 'Hey there!', sender: 'them' }],
  2: [{ text: 'Yo Bob', sender: 'me' }, { text: 'What’s up?', sender: 'them' }],
  3: [{ text: 'Meeting at 5?', sender: 'me' }, { text: 'See you soon.', sender: 'them' }],
};

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com', lastMessage: 'Hey there!' },
    { id: 2, name: 'Bob', email: 'bob@example.com', lastMessage: 'What’s up?' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', lastMessage: 'See you soon.' },
  ]);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
 
  const handleAddContact = (newContact) => {
    const newId = Math.max(...contacts.map(c => c.id)) + 1;
    const updated = [...contacts, { ...newContact, id: newId, lastMessage: '' }];
    setContacts(updated);
  };
  const handleEditContact = (id, updatedName) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, name: updatedName } : contact
    ));
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    if (selectedContact?.id === id && contacts.length > 1) {
      setSelectedContact(contacts.find(c => c.id !== id));
    }
  };


  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { text: input, sender: 'me' };
    const updated = [...(messages[selectedContact.id] || []), newMessage];
    setMessages({ ...messages, [selectedContact.id]: updated });
    setInput('');
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        {/* Sidebar */}
        <div className="col-4 border-end bg-light overflow-auto d-flex flex-column">
          {/* <h4 className="p-3 border-bottom">Chats</h4> */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h4 className="mb-0">Chats</h4>
            <DropDownMenu onOpenContact={() => setShowContactModal(true)} />
            {/* <ContactModal
              show={showContactModal}
              onClose={() => setShowContactModal(false)}
              onAddContact={handleAddContact}
            /> */}
            <ContactModal
              show={showContactModal}
              onClose={() => setShowContactModal(false)}
              onAddContact={handleAddContact}
              onEditContact={handleEditContact}
              onDeleteContact={handleDeleteContact}
              contacts={contacts}
            />

          </div>


          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="flex-grow-1 overflow-auto">
            {contacts
              .filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((contact) => (
                <div
                  key={contact.id}
                  className={`p-3 cursor-pointer ${selectedContact.id === contact.id ? 'bg-secondary text-white' : 'bg-light'
                    }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedContact(contact)}
                >
                  <strong>{contact.name}</strong>
                  <div className="text-muted small">{contact.lastMessage}</div>
                </div>
              ))}
          </div>
        </div>


        {/* Chat Window */}
        <div className="col-8 d-flex flex-column">
          {/* Chat Header */}
          <div className="p-3 border-bottom bg-white">
            <h5 className="mb-0">{selectedContact.name}</h5>
          </div>

          {/* Messages */}
          <div className="flex-grow-1 p-3 overflow-auto bg-light">
            {(messages[selectedContact.id] || []).map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex mb-2 ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'
                  }`}
              >
                <div
                  className={`p-2 rounded ${msg.sender === 'me' ? 'bg-success text-white' : 'bg-white border'
                    }`}
                  style={{ maxWidth: '70%' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-top bg-white d-flex">
            <FilePicker onFileSelect={(file) => {
              const newMessage = { text: `📎 File: ${file.name}`, sender: 'me' };
              const updated = [...(messages[selectedContact.id] || []), newMessage];
              setMessages({ ...messages, [selectedContact.id]: updated });
            }} />

            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <LanguageSelector />

            <AudioRecorder
              onSendAudio={(audioURL) => {
                const newMessage = {
                  text: <audio controls src={audioURL} />,
                  sender: 'me',
                };
                const updated = [...(messages[selectedContact.id] || []), newMessage];
                setMessages({ ...messages, [selectedContact.id]: updated });
              }}
            />

            <button className="btn btn-success" onClick={sendMessage}>
              <i className="bi bi-send"></i>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
