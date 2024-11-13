import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

import './EmailForm.css';  

function EmailForm({ setOtpSent, setEmail }) {
  const [emailInput, setEmailInput] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(emailInput);

    try {
      const response = await axios.post('http://localhost:4000/api/otp/generate', { email: emailInput });
      if (response.status === 200) {
        setOtpSent(true);
        
        navigate('/otp-verification');  
      } else {
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending the OTP.');
    }
  };

  return (
    <div className="email-form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Enter Your Email</h2>
        <form onSubmit={handleSubmit} className="email-form">
          <label className="email-label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="email-input"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <button type="submit" className="submit-button">Send OTP</button>
        </form>
      </div>
    </div>
  );
}

export default EmailForm;
