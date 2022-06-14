import s from './Contact.module.css';

export default function Contact({ contact, onDeleteContact }) {
  return (
    <li className={s.contactsListItem}>
      <p className={s.contactsListName}>{contact.name}</p>
      <p className={s.contactsListName}>{contact.number}</p>
      <button
        className={s.contactsListBtn}
        onClick={() => onDeleteContact(contact.id)}
      >
        Удалить
      </button>
    </li>
  );
}
