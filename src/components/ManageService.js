// src/components/ManageService.js
import React from 'react';

const ManageService = () => {
  const services = [
    { id: 1, type: 'VPS Service', ram: '8 GB', processor: '4 cores', bandwidth: '1 TB', storage: '100 GB' },
    { id: 2, type: 'Cloud Storage', ram: '16 GB', processor: '8 cores', bandwidth: '2 TB', storage: '500 GB' },
    { id: 3, type: 'Web Hosting', ram: '4 GB', processor: '2 cores', bandwidth: '500 GB', storage: '50 GB' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-r">Service Type</th>
            <th className="py-2 px-4 border-b border-r">RAM</th>
            <th className="py-2 px-4 border-b border-r">Processor</th>
            <th className="py-2 px-4 border-b border-r">Bandwidth</th>
            <th className="py-2 px-4 border-b">Storage Space</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="py-2 px-4 border-b border-r">{service.type}</td>
              <td className="py-2 px-4 border-b border-r">{service.ram}</td>
              <td className="py-2 px-4 border-b border-r">{service.processor}</td>
              <td className="py-2 px-4 border-b border-r">{service.bandwidth}</td>
              <td className="py-2 px-4 border-b">{service.storage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageService;
