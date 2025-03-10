import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-medium text-center text-gray-800 mb-6">Login</h1>
        
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account? {' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

