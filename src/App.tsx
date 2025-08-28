import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import LoadingSpinner from './components/UI/LoadingSpinner';
import FloatingChatButton from './components/AI/FloatingChatButton';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route component (redirects to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" /> : <>{children}</>;
};

// Placeholder components for other routes
const Nutrition = () => (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nutrition Tracking</h1>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-600 text-lg">
          Nutrition tracking feature coming soon! Track your meals, calories, and get AI-powered nutritional advice.
        </p>
      </div>
    </div>
  </div>
);

const Workouts = () => (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Workout Tracking</h1>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-600 text-lg">
          Workout tracking feature coming soon! Log your exercises, track progress, and get personalized recommendations.
        </p>
      </div>
    </div>
  </div>
);

const Hydration = () => (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Hydration Tracking</h1>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-600 text-lg">
          Hydration tracking feature coming soon! Monitor your daily water intake and stay properly hydrated.
        </p>
      </div>
    </div>
  </div>
);

const MentalHealth = () => (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mental Health Support</h1>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-600 text-lg">
          Mental health support feature coming soon! Access AI-powered emotional support and connect with mental health experts.
        </p>
      </div>
    </div>
  </div>
);
import Pricing from './pages/Pricing';

import Experts from './pages/Experts';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <FloatingChatButton />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginForm />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignupForm />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/nutrition"
                element={
                  <ProtectedRoute>
                    <Nutrition />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workouts"
                element={
                  <ProtectedRoute>
                    <Workouts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hydration"
                element={
                  <ProtectedRoute>
                    <Hydration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mental-health"
                element={
                  <ProtectedRoute>
                    <MentalHealth />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pricing"
                element={
                  <PublicRoute>
                    <Pricing />
                  </PublicRoute>
                }
              />
              <Route
                path="/experts"
                element={
                  <ProtectedRoute>
                    <Experts />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;