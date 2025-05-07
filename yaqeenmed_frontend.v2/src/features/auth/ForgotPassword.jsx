import React, { useState } from 'react';
import { sendPasswordResetLink } from '../../utilities/auth-api'; // Import the new service
// import './ForgotPassword.css'; // Optional: add styles for your component

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state
    try {
      await sendPasswordResetLink(email); // Call the service function
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
       <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}> {/* Disable button during loading */}
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
