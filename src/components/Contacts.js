import React, { useState, useEffect } from 'react';
import { FaUser, FaPhoneAlt, FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import icons
import './Contacts.css';

const Contacts = ({ userEmail }) => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); // Add phone state
    const [editIndex, setEditIndex] = useState(-1);
    const [showContacts, setShowContacts] = useState(false); // Track visibility of contacts

    // Load contacts from localStorage when the component mounts
    useEffect(() => {
        const savedContacts = localStorage.getItem(`contacts_${userEmail}`);
        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        }
    }, [userEmail]);

    // Save contacts to localStorage whenever they change
    useEffect(() => {
        if (userEmail) {
            localStorage.setItem(`contacts_${userEmail}`, JSON.stringify(contacts));
        }
    }, [contacts, userEmail]);

    const handleAddOrEditContact = () => {
        // Check for empty fields
        if (!name || !email || !phone) {
            alert("All fields are required.");
            return;
        }

        if (editIndex >= 0) {
            // Edit existing contact
            const updatedContacts = contacts.map((contact, index) =>
                index === editIndex ? { name, email, phone } : contact
            );
            setContacts(updatedContacts);
            setEditIndex(-1);
        } else {
            // Add new contact
            const newContact = { name, email, phone };
            setContacts([...contacts, newContact]);
        }

        // Clear input fields
        setName('');
        setEmail('');
        setPhone('');
    };

    const handleEdit = (index) => {
        const contact = contacts[index];
        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone); // Add phone to edit
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedContacts = contacts.filter((_, i) => i !== index);
        setContacts(updatedContacts);
    };

    // Toggle visibility of contacts
    const toggleContactsVisibility = () => {
        setShowContacts(!showContacts);
    };

    return (
        <div className="contacts-container">
            <h2>Contacts Management</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditContact(); }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} // Add phone input
                    placeholder="Phone"
                    required
                />
                <button type="submit">{editIndex >= 0 ? 'Update' : 'Add'} Contact</button>
            </form>
            <button onClick={toggleContactsVisibility}>
                {showContacts ? 'Hide Contacts' : 'View Contacts'}
            </button>
            {showContacts && (
                <ul className="contacts-list">
                    {contacts.length > 0 ? (
                        contacts.map((contact, index) => (
                            <li key={index} className="contact-item">
                                <FaUser className="contact-icon large-icon" /> {contact.name} 
                                <span className="contact-info">({contact.email})</span>
                                <FaPhoneAlt className="contact-icon large-icon" /> {contact.phone} 
                                <button onClick={() => handleEdit(index)} className="edit-button"><FaEdit /></button>
                                <button onClick={() => handleDelete(index)} className="delete-button"><FaTrashAlt /></button>
                            </li>
                        ))
                    ) : (
                        <li>No contacts available</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Contacts;
