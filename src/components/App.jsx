import React from 'react';
import { useState, useEffect } from 'react';
import shortid from 'shortid';
import ContactForm from './Form/ContactForm';
import ContactList from './ContactList/ContactList';
import Container from './Container/Container';
import ContactFilter from './ContactFilter/ContactFilter';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    if (
      contacts.some(
        ({ contact }) =>
          contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      ...newContact,
    };
    if (
      contacts.some(
        ({ contact }) => contact.number === newContact.contact.number
      )
    ) {
      alert(`${newContact.number} is already in contacts.`);
      return;
    } else {
      setContacts(prevContacts => [contact, ...prevContacts]);
    }
  };

  const deleteContact = contactid => {
    setContacts(contacts.filter(({ id }) => id !== contactid));
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <ContactFilter value={filter} onChange={changeFilter} />
      )}
      {contacts.length > 0 ? (
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>Please add first contact</p>
      )}
    </Container>
  );
}
export default App;
