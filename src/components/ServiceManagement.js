import React, { useState, useEffect } from 'react';

function ServiceManagement() {
  const [services, setServices] = useState([]);

  // Fetch services from a mock API or service
  useEffect(() => {
    async function fetchServices() {
      // Mock API call - replace with actual API call
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    }

    fetchServices();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold text-purple-800 mb-2">Service Management</h3>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-purple-800 text-white">
          <tr>
            <th className="w-1/5 py-2 px-4">User ID</th>
            <th className="w-1/5 py-2 px-4">Service ID</th>
            <th className="w-1/5 py-2 px-4">Service Name</th>
            <th className="w-1/5 py-2 px-4">Service Type</th>
            <th className="w-1/5 py-2 px-4">Package Type</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {services.length > 0 ? (
            services.map(service => (
              <tr key={service.serviceId}>
                <td className="border px-4 py-2">{service.userId}</td>
                <td className="border px-4 py-2">{service.serviceId}</td>
                <td className="border px-4 py-2">{service.serviceName}</td>
                <td className="border px-4 py-2">{service.serviceType}</td>
                <td className="border px-4 py-2">{service.packageType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center">No services found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceManagement;
