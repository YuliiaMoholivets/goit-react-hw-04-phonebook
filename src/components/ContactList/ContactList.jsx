import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={styles.item} key={id}>
          <p className={styles.text}>
            {name}: {number}
          </p>
          <button
            className={styles.btn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
