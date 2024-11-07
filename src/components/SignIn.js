// src/components/SignIn.js

import React, { useState } from 'react';
import axios from 'axios';

function SignIn({ onSignInSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('https://example.com/signin', { email, password });
      alert('Signin successful!');
      onSignInSuccess();  // Callback to update parent component's state
    } catch (error) {
      console.error('Error during signin:', error);
      alert('Signin failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignIn;
