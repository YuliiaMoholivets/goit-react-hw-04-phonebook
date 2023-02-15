import React, { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './Form/ContactForm';
import ContactList from './ContactList/ContactList';
import Container from './Container/Container';
import ContactFilter from './ContactFilter/ContactFilter';

export default class App extends Component {
  state = {
    contacts: [
      { id: shortid.generate(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: shortid.generate(), name: 'Hermione Kline', number: '443-89-12' },
      { id: shortid.generate(), name: 'Eden Clements', number: '645-17-79' },
      { id: shortid.generate(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    if (contacts.some(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length > 0 && (
          <ContactFilter value={filter} onChange={this.changeFilter} />
        )}
        {contacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>Please add first contact</p>
        )}
      </Container>
    );
  }
}
