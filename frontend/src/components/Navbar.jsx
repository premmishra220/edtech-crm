import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogIn, LogOut, LayoutDashboard, Send, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">EdTech CRM</span>
              <span className="block text-xs text-gray-500 font-medium">
                {isAuthenticated ? "Admin Portal" : "Inquiry Management System"}
              </span>
            </div>
          </Link>

          <nav className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>

                <div className="h-6 w-px bg-gray-200 mx-2" />

                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Admin
                  </span>
                  <span className="text-sm font-medium text-gray-700 hidden md:inline">
                    {user?.name || user?.email}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Inquiry Form</span>
                </Link>

                <Link
                  to="/login"
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/login'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Admin Login</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
