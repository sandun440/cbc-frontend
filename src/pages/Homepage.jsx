import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-indigo-600">MyApp</div>
            <div className="space-x-4">
              <a href="#" className="text-gray-900 font-medium">Home</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Logout</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Simple Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-600">
            Thank you for logging in. This is your personal dashboard where you can manage all your activities and track your progress. We're glad to have you here!
          </p>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2025 MyApp, Inc.</p>
        </div>
      </footer>
    </div>
  );
}

