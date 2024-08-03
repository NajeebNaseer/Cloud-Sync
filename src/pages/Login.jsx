import React from 'react';
import { Link } from 'react-router-dom';


function LoginPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-10 rounded shadow-md w-96">
        <h2 className="text-4xl font-bold mb-6 text-center text-purple-600">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-lg"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <Link to="/ForgotPassword" className="font-medium text-purple-600 hover:text-purple-500">Forgot your password?</Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 font-medium text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
          >
            Sign in
          </button>
          <br />
          <br />
          <Link
            to="/SignUp" // Adjust the path if necessary
            className="w-full bg-purple-600 font-medium text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 text-center block"
          >
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
