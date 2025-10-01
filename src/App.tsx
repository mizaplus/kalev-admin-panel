import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";

// Simple dummy page component
function DummyPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Admin Dashboard</h1>
      <p className="text-gray-700 mb-4">Welcome to the secure admin area!</p>
      <Link
        to="/"
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

// Home component
function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Kalev Admin Panel
      </h1>
      <p className="text-gray-700 mb-4">You are successfully authenticated!</p>
      <Link
        to="/dashboard"
        className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen bg-gray-50 overflow-x-hidden">
        <nav className="bg-white shadow-md p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Dashboard
              </Link>
            </div>
            <Authenticator>
              {({ signOut, user }) => (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user?.username}</span>
                  <button 
                    onClick={signOut}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </Authenticator>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DummyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
