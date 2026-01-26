import React from 'react';
import { LogOut, Film } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#141414]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="w-8 h-8 text-red-600" />
          <h1 className="text-2xl font-bold text-white">MovieFlix</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-gray-300 text-sm hidden sm:inline" data-testid="user-name">
              Welcome, {user.name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            data-testid="logout-btn"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
