import React from 'react';
import TopBar from './TopBar';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';

const ChatLayout = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <TopBar />
      <div className="row flex-grow-1 overflow-hidden">
        <div className="col-md-3 border-end p-0">
          <ContactList />
        </div>
        <div className="col-md-9 p-0">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;