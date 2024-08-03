import React, { useState } from 'react';
import Header from '../../Header';
import Footer from '../../footer';
import PaymentForm from '../../../components/PaymentForm'; // Import the PaymentForm component

function VPSBasic() {
  const [formData, setFormData] = useState({
    termsAccepted: false,
  });

  const [fullName, setFullName] = useState(''); // Manage full name state here

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Purchase confirmed!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-purple-800 mb-4 text-center">Buy VPS Basic</h2>
          <div className="bg-purple-800 text-white p-4 rounded-lg mb-6 text-center">
            <h3 className="text-2xl font-semibold">VPS Basic Package</h3>
            <p className="text-xl">4 vCPU Cores | 6 GB RAM | 100 GB NVMe or 400 GB SSD | 32 TB Traffic</p>
            <p className="text-2xl font-bold">$5.50/ month</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentForm fullName={fullName} setFullName={setFullName} />
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
                  I accept the <a href="#" className="text-purple-600 hover:text-purple-800">terms and conditions</a>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Confirm Purchase
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default VPSBasic;
