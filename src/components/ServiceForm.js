// src/components/ServiceForm.js
import React, { useState } from 'react';

const ServiceForm = () => {
  const [serviceType, setServiceType] = useState('');

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  return (
    <form className="space-y-4">
      <div className="mb-4">
        <label className="block text-gray-700"><b>Service Type</b></label>
        <select 
          className="mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          onChange={handleServiceTypeChange}
        >
          <option value="">Select a Service</option>
          <option value="VPS">VPS Service</option>
          <option value="Cloud Storage">Cloud Storage</option>
          <option value="Web Hosting">Web Hosting</option>
        </select>
      </div>

      {serviceType === 'Cloud Storage' && (
        <div className="mb-4">
          <label className="block text-gray-700">Storage Space</label>
          <input 
            type="text" 
            className="mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" 
          />
        </div>
      )}

      {(serviceType === 'VPS' || serviceType === 'Web Hosting') && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">RAM</label>
            <input 
              type="text" 
              className="mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Processor (in cores)</label>
            <input 
              type="text" 
              className="mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bandwidth</label>
            <input 
              type="text" 
              className="mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Storage Space</label>
            <input 
              type="text" 
              className="mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" 
            />
          </div>
        </>
      )}

      <button 
        className="bg-[#844ef8] text-white py-2 px-4 rounded-lg hover:bg-[#7038d5] focus:outline-none focus:ring-2 focus:ring-[#844ef8] transition duration-300"
        type="submit"
      >
        Add Service
      </button>
    </form>
  );
};

export default ServiceForm;
