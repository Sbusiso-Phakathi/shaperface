// src/components/SignUp.js

import React, { useState } from 'react';
import axios from 'axios';

function SignUp({ onSignUpSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('https://shaperface-m7pi7y8xz-phaks323s-projects.vercel.app/signup', { email, password });
      alert('Signup successful!');
      onSignUpSuccess();  // Callback to update parent component's state
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
