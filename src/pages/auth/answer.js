import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

const RegisterApp = () => {
  const [serverResponse, setServerResponse] = useState(null);
  const history = useHistory();

  const handleRegister = async () => {

    if (response.ok) {
      setServerResponse('Registration successful');
    } else {
      setServerResponse('Registration failed');
    }
  };

  const handleBackToLogin = () => {
    history.push('/login');
  };

  const handleTryAgain = () => {
    setServerResponse(null);
  };

  return (
    <div>
      {serverResponse ? (
        <div>
          <p>{serverResponse}</p>
          <Button onClick={handleBackToLogin}>Back to Login</Button>
          {serverResponse.includes('failed') && <Button onClick={handleTryAgain}>Try Again</Button>}
        </div>
      ) : (
        <Button onClick={handleRegister}>Register</Button>
      )}
    </div>
  );
};

export default RegisterApp;