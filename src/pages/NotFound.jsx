export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="text-center">
        <div className="flex flex-row items-center p-4 ">
          <img src="/animation1.gif" alt="" />
          <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
        </div>
        <p className="text-3xl text-gray-600 mb-6">Oops! Page not found.</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}