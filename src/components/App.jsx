import s from './App.module.css';
// import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import ContactsList from './ContactsList/ContactsList';
import Form from './Form/Form';
import Filter from './Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      // {
      //   name: 'Anna Fesenko',
      //   number: '359-79-39',
      //   id: '2P2njwuGQH7Ii253QN4R6',
      // },
      // {
      //   name: 'Ivan Khorokhor',
      //   number: '123-85-97',
      //   id: '9JVdbo866LiW0sGNNHBRM',
      // },
      // {
      //   name: 'Nataly Shtukina',
      //   number: '785-269-79',
      //   id: 'sXQj5y5_iz8ZzJJdN94Xv',
      // },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  saveContact = newContact => {
    this.state.contacts.find(contact => contact.name === newContact.name)
      ? this.showAlert(newContact.name)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };
  showAlert = name => {
    const message = `${name} is already in contacts`;
    alert(message);
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 18,
        }}
      >
        <h2 className={s.title}>Phonebook</h2>
        <div className={s.wrapper__phonebook}>
          <Form saveContact={this.saveContact} />
        </div>

        <h2 className={s.title}>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <div className={s.wrapper__contacts}>
          {contacts.length !== 0 ? (
            <ContactsList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
