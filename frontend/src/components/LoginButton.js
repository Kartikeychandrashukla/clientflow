// src/components/LoginButton.jsx
import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google'; // Your backend OAuth start URL
  };

  return (
    <button onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default LoginButton;
