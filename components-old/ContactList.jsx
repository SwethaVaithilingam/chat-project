import React from 'react';

const contacts = ['Alice', 'Bob', 'Charlie'];

const ContactList = () => {
  return (
    <div className="list-group list-group-flush overflow-auto h-100">
      {contacts.map((name, idx) => (
        <button key={idx} className="list-group-item list-group-item-action">
          {name}
        </button>
      ))}
    </div>
  );
};

export default ContactList;
