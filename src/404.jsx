import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-600">404</h1>
        <p className="text-2xl font-medium mt-4">Oops! Page not found.</p>
        <p className="mt-2 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 text-white bg-purple-600 rounded-md shadow hover:bg-purple-700 transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
