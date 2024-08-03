import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './footer'; // Corrected import name for Footer component
import { Link } from 'react-router-dom';

function ClientDashboard() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const mockData = [
        { name: 'Web Hosting', type: 'Premium', renewalDate: '2024-07-30' },
        { name: 'VPS', type: 'Standard', renewalDate: '2024-08-15' },
        { name: 'Cloud Storage', type: 'Basic', renewalDate: '2024-07-30' }
      ];
      setServices(mockData);
    };

    fetchServices();
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">Dashboard</h2>

        {/* Second Section - Services Bought */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="bg-white p-4 rounded-3xl shadow-md border border-purple-800 transition-transform duration-500 ease-in-out transform">
            <h3 className="text-lg font-semibold text-purple-800">Services Bought</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md transition-opacity duration-500 ease-in-out">
                <thead className="bg-purple-800 text-white">
                  <tr>
                    <th className="w-1/2 py-2 px-4">Service Name</th>
                    <th className="w-1/4 py-2 px-4">Service Type</th>
                    <th className="w-1/4 py-2 px-4">Renewal Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {services.map((service, index) => (
                    <tr key={index} className="hover:bg-gray-200 transition-colors duration-300 ease-in-out">
                      <td className="border px-4 py-2">{service.name}</td>
                      <td className="border px-4 py-2">{service.type}</td>
                      <td className="border px-4 py-2">{service.renewalDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* New Section - Packages */}
        <div className="bg-white p-4 rounded-3xl shadow-md border border-purple-800 mb-8">
          <h3 className="text-lg font-semibold text-purple-800 text-center">Packages</h3>
          <div className="mt-4 space-y-4">
            {/* VPS Sub-Card */}
            <div className={`bg-gray-200 p-4 rounded-3xl shadow-md transition-all duration-500 ease-in-out ${expandedSection === 'vps' ? 'animate-fade-in' : 'animate-fade-out'}`}>
              <h4 
                className="text-lg font-semibold text-purple-800 mb-2 text-center cursor-pointer"
                onClick={() => toggleSection('vps')}
              >
                VPS
              </h4>
              {expandedSection === 'vps' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">VPS Basic</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$5.50/ month</p>
                    <p className="text-gray-700">4 vCPU Cores</p>
                    <p className="text-gray-700">6 GB RAM</p>
                    <p className="text-gray-700">100 GB NVMe or 400 GB SSD</p>
                    <p className="text-gray-700">32 TB Traffic</p>
                    <Link to="/VPSBasic">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose VPS Basic</button>
                    </Link>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">VPS Standard</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$12.50/ month</p>
                    <p className="text-gray-700">6 vCPU Cores</p>
                    <p className="text-gray-700">16 GB RAM</p>
                    <p className="text-gray-700">200 GB NVMe or 400 GB SSD</p>
                    <p className="text-gray-700">32 TB Traffic</p>
                    <Link to="/VPSStandard">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose VPS Standard</button>
                    </Link>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">VPS Premium</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$17.50/ month</p>
                    <p className="text-gray-700">8 vCPU Cores</p>
                    <p className="text-gray-700">24 GB RAM</p>
                    <p className="text-gray-700">300 GB NVMe or 1.2 TB SSD</p>
                    <p className="text-gray-700">32 TB Traffic</p>
                    <Link to="/VPSPremium">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose VPS Premium</button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cloud Storage Sub-Card */}
            <div className={`bg-gray-200 p-4 rounded-3xl shadow-md transition-all duration-500 ease-in-out ${expandedSection === 'cloudStorage' ? 'animate-fade-in' : 'animate-fade-out'}`}>
              <h4 
                className="text-lg font-semibold text-purple-800 mb-2 text-center cursor-pointer"
                onClick={() => toggleSection('cloudStorage')}
              >
                Cloud Storage
              </h4>
              {expandedSection === 'cloudStorage' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">Cloud Storage Basic</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$2.50/ month</p>
                    <p className="text-gray-700">50 GB Storage</p>
                    <p className="text-gray-700">1 TB Traffic</p>
                    <Link to="/CloudStorageBasic">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose Cloud Storage Basic</button>
                    </Link>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">Cloud Storage Standard</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$5.00/ month</p>
                    <p className="text-gray-700">100 GB Storage</p>
                    <p className="text-gray-700">2 TB Traffic</p>
                    <Link to="/CloudStorageStandard">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose Cloud Storage Standard</button>
                    </Link>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">Cloud Storage Premium</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$7.50/ month</p>
                    <p className="text-gray-700">200 GB Storage</p>
                    <p className="text-gray-700">4 TB Traffic</p>
                    <Link to="/CloudStoragePremium">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose Cloud Storage Premium</button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Web Hosting Sub-Card */}
            <div className={`bg-gray-200 p-4 rounded-3xl shadow-md transition-all duration-500 ease-in-out ${expandedSection === 'webHosting' ? 'animate-fade-in' : 'animate-fade-out'}`}>
              <h4 
                className="text-lg font-semibold text-purple-800 mb-2 text-center cursor-pointer"
                onClick={() => toggleSection('webHosting')}
              >
                Web Hosting
              </h4>
              {expandedSection === 'webHosting' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">Web Hosting Basic</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$3.50/ month</p>
                    <p className="text-gray-700">10 GB Storage</p>
                    <p className="text-gray-700">100 GB Traffic</p>
                    <Link to="/WebHostingBasic">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose Web Hosting Basic</button>
                    </Link>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">Web Hosting Standard</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$6.00/ month</p>
                    <p className="text-gray-700">25 GB Storage</p>
                    <p className="text-gray-700">250 GB Traffic</p>
                    <Link to="/WebHostingStandard">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose Web Hosting Standard</button>
                    </Link>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-md flex flex-col items-center text-center">
                    <div className="bg-red-500 text-white p-2 rounded-lg mb-2">No Setup Fee</div>
                    <h5 className="text-4xl font-semibold text-purple-800 mb-2">Web Hosting Premium</h5>
                    <p className="text-3xl font-semibold text-purple-800 mb-2">$9.00/ month</p>
                    <p className="text-gray-700">50 GB Storage</p>
                    <p className="text-gray-700">500 GB Traffic</p>
                    <Link to="/WebHostingPremium">
                      <button className="mt-2 bg-purple-800 text-white px-4 py-1 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">Choose Web Hosting Premium</button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ClientDashboard;
