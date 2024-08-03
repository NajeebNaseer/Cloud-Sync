import React, { useState, useEffect } from 'react';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // Fetch users from a mock API or service
  useEffect(() => {
    async function fetchUsers() {
      // Mock API call - replace with actual API call
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Implement user deletion logic here
    console.log(`Deleting user with ID: ${userId}`);
    // Mock API call to delete user
    await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleEditSubmit = async () => {
    // Implement user update logic here
    console.log(`Updating user with ID: ${editUser.id}`);
    // Mock API call to update user
    await fetch(`/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editName, email: editEmail }),
    });
    setUsers(users.map(user => 
      user.id === editUser.id ? { ...user, name: editName, email: editEmail } : user
    ));
    setEditUser(null);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-purple-800 mb-2">User Management</h3>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-purple-800 text-white">
          <tr>
            <th className="w-1/5 py-2 px-4">User ID</th>
            <th className="w-1/5 py-2 px-4">Name</th>
            <th className="w-1/5 py-2 px-4">Email</th>
            <th className="w-1/5 py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {editUser && (
        <div className="mt-4 p-4 bg-gray-200 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-purple-800 mb-2">Edit User</h4>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
          <button
            onClick={handleEditSubmit}
            className="bg-purple-800 text-white py-2 px-4 rounded-md mt-2"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditUser(null)}
            className="bg-gray-500 text-white py-2 px-4 rounded-md mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
