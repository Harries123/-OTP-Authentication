import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

function OtpForm({ email }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/otp/verify`,
        { email, otp }
      );

      if (res.data.message === 'OTP verified successfully') {
        alert('OTP verified! Welcome!');
        setOtp('');  

       
        navigate('/welcome');  
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while verifying OTP. Please try again later.');
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <label>Enter OTP:</label>
      <input 
        type="text" 
        value={otp} 
        onChange={(e) => setOtp(e.target.value)} 
        required 
        pattern="\d{6}"  
        title="OTP should be a 6-digit number"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}  
    </form>
  );
}

export default OtpForm;
