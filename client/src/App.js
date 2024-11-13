import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';  
import EmailForm from './components/EmailForm';
import OtpForm from './components/OtpForm';
import Welcome from './components/Welcome'; 

function App() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div>
      <Routes>
        {/* Route for EmailForm */}
        <Route 
          path="/" 
          element={<EmailForm setOtpSent={setOtpSent} setEmail={setEmail} />} 
        />
        
        {/* Route for OtpForm */}
        <Route 
          path="/otp-verification" 
          element={<OtpForm email={email} />} 
        />
        
        {/* Route for Welcome page */}
        <Route 
          path="/welcome" 
          element={<Welcome />} 
        />
      </Routes>
    </div>
  );
}

export default App;
