import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isEmailUnique, setIsEmailUnique] = useState(true); // Simulated email check
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => emailRegex.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      return;
    }
    if (!isEmailUnique) {
      setIsEmailUnique(false);
      return;
    }
    if (!isTermsAccepted) {
      return; // Prevent form submission if terms are not accepted
    }

    setIsEmailValid(true);
    setIsPasswordMatch(true);
    setIsEmailUnique(true);

    // Logic to handle signup (send data to backend)
    console.log("Signing up with:", { name, email, password, phone });

    // Open modal after successful signup
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4 py-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-purple-600">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-lg ${!isEmailValid || !isEmailUnique ? 'border-red-500' : ''}`}
              required
            />
            {!isEmailValid && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
            )}
            {!isEmailUnique && (
              <p className="text-red-500 text-sm mt-1">This email is already in use.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-lg ${!isPasswordMatch ? 'border-red-500' : ''}`}
              required
            />
            {!isPasswordMatch && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-lg"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
              className="mr-2 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              required
            />
            <label className="text-lg font-medium text-gray-700">
              I agree to the <Link to="/TermsAndConditions" className="text-purple-600 hover:underline">Terms and Conditions</Link>.
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 font-medium text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
          >
            Sign Up
          </button>
          <br />
          <Link
            to="/Login"
            className="w-full bg-purple-600 font-medium text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 text-center block mt-4"
          >
            Already have an account? Sign In
          </Link>
        </form>
      </div>

      {/* Modal for alert message */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Signup Confirmation"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-3xl shadow-md border border-purple-800 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-purple-800">Signup Successful</h2>
          <p className="mb-4">Thank you for signing up! A confirmation email has been sent to your email address.</p>
          <button
            onClick={closeModal}
            className="bg-purple-800 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SignUpPage;
