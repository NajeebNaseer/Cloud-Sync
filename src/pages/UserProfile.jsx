import React, { useState } from 'react';
import Modal from 'react-modal';
import Header from './Header';
import Footer from './footer'; // Corrected import name for Footer component
import avatarPlaceholder from '../assests/avatarPlaceholder.png'; // Corrected path for avatar placeholder

Modal.setAppElement('#root');

function UserProfile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('Web Developer and Designer');
  const [phone, setPhone] = useState('+1234567890');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalEmail] = useState(email); // Store the original email

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return re.test(email);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    setIsEmailValid(true);

    // Check if email has been updated
    if (email !== originalEmail) {
      // Send verification link logic here
      console.log("Sending verification link to:", email);
      setIsModalOpen(true); // Open modal if email is different
    } else {
      // No need to show alert if email hasn't changed
      console.log("No email update necessary.");
    }

    // Log profile update (this can include sending data to your backend)
    console.log("Profile updated:", { name, email, bio, phone, profilePhoto });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1 p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">User Profile</h2>
        <div className="bg-white p-6 rounded-3xl shadow-md border border-purple-800">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-center">
              <label htmlFor="profilePhoto" className="cursor-pointer">
                <img
                  src={profilePhoto || avatarPlaceholder}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border border-purple-800"
                />
                <input
                  type="file"
                  id="profilePhoto"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                className="bg-purple-800 text-white rounded-md px-4 py-2 mt-2 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => document.getElementById('profilePhoto').click()}
              >
                Upload Photo
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-md p-2 ${!isEmailValid ? 'border-red-500' : ''}`}
                required
              />
              {!isEmailValid && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border rounded-md p-2"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-purple-800 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Update Profile
            </button>
          </form>
        </div>
      </main>
      <Footer />

      {/* Modal for alert message */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Email Verification"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-3xl shadow-md border border-purple-800 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-purple-800">Verification Email Sent</h2>
          <p className="mb-4">A verification link has been sent to the entered email. Your email will be updated as soon as you click on the link.</p>
          <button
            onClick={closeModal}
            className="bg-purple-800 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

export default UserProfile;
