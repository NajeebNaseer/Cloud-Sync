import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assests/logo.png'; // Adjusted the path
import avatarPlaceholder from '../assests/avatarPlaceholder.png'; // Adjusted the path

function Header({ profilePhoto }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Logic to end the current session (e.g., clearing tokens)
    // For example:
    // localStorage.removeItem('authToken');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="bg-purple-900 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/client/dashboard">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </Link>
      <nav className="relative">
        <ul className="flex items-center space-x-4">
          <li>
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img
                src={profilePhoto || avatarPlaceholder}
                alt="Profile"
                className="h-10 w-10 rounded-full border border-white"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-purple-900 rounded-md shadow-lg z-10">
                <ul className="py-2">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Edit Profile</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
