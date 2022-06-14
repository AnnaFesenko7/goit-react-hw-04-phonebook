import s from './ContactsList.module.css';
// import React, { Component } from 'react';

import Contact from 'components/Contact/Contact';

function ContactsList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.contactsList}>
      {contacts.map(contact => (
        <Contact
          contact={contact}
          key={contact.id}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
}

export default ContactsList;
