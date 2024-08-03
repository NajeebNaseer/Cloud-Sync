import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => re.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    setIsEmailValid(true);
    // Logic to handle password reset request (send data to backend)
    console.log("Password reset request for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4 py-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-purple-600">Forgot Password</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-lg ${!isEmailValid ? 'border-red-500' : ''}`}
                required
              />
              {!isEmailValid && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 font-medium text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
            >
              Send Password Reset Link
            </button>
            <br />
            <Link
              to="/Login"
              className="w-full bg-purple-600 font-medium text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 text-center block mt-4"
            >
              Back to Login
            </Link>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-purple-600">Email Sent</h3>
            <p className="mb-4">A password reset link has been sent to your email address.</p>
            <Link
              to="/Login"
              className="bg-purple-600 font-medium text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 text-center block"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
