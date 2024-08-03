// src/components/DeleteService.js
import React from 'react';

const DeleteService = () => {
  return (
    <form className="space-y-4">
      <div className="mb-4">
        <label className="block text-gray-700">
          <input type="checkbox" className="mr-2" />
          I agree to the terms and conditions
        </label>
      </div>
      <button className="bg-red-500 text-white py-2 px-4 rounded">Confirm Deletion</button>
    </form>
  );
};

export default DeleteService;
