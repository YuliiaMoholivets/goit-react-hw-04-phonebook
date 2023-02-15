import PropTypes from 'prop-types';
import styles from './ContactFilter.module.css';

function ContactFilter({ value, onChange }) {
  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

ContactFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ContactFilter;
