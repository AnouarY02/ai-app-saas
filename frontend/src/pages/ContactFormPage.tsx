import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { createContact, ContactCreate } from '../utils/apiClient';

const ContactFormPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data: ContactCreate) => {
    try {
      await createContact(data);
      navigate('/contacts');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create contact');
    }
  };
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">New Contact</h2>
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
};
export default ContactFormPage;
