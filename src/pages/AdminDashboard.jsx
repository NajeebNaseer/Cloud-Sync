import React from 'react';
import Header from './Header';
import Footer from './footer'; // Corrected import name for Footer component
import ManageUsers from '../components/ManageUsers';
import ServiceManagement from '../components/ServiceManagement'; // New import

function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">Admin Dashboard</h2>

        {/* Existing Sections */}
        <ManageUsers />
        <br />
        <ServiceManagement /> {/* New section for service management */}
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
