// ContactUs.js

import React from 'react';
import '../stylesheets/Contact.css'; // Import CSS file for styles

const ContactUs = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:example@example.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+11234567890';
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>Feel free to reach out to us via the following methods:</p>
      <ul>
        <li onClick={handleEmailClick}>
          Email 📥: <span className="contact-info">sabindahal@gmail.com</span>
        </li>
        <li onClick={handlePhoneClick}>
          Phone ☎️: <span className="contact-info">+977 9812345678</span>
        </li>
        <li>Address: Kathmandu | Nepal 🇳🇵</li>
      </ul>
    </div>
  );
};

export default ContactUs;
