import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#00c19c] hover:bg-[#008a73] transition duration-300">
      <div className="max-w-4xl w-full sm:p-8 bg-white shadow-2xl rounded-lg flex flex-col sm:space-x-4 border border-gray-200">
        <div className="flex flex-col justify-center items-center p-8">
          <h1 className="text-6xl font-bold text-[#00c19c] mb-4">404</h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8">
            Page Not Found
          </p>
          <div className="mt-6 w-full max-w-md text-center">
            <h3 className="text-xl font-semibold mb-2">
              How can we help? Our team is standing by to assist you with any
              questions:
            </h3>
            <p className="text-gray-800 mb-1">
              <strong>Email:</strong> {"info@liferxtelemd.com"}
            </p>
            <p className="text-gray-800">
              <strong>Phone:</strong> {"(609) 201-0119"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;