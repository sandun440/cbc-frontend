import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-medium text-center text-gray-800 mb-6">Sign Up</h1>
        
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
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
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account? {' '}
          <Link to="/login" className="font-medium text-accent hover:text-accent-light">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

