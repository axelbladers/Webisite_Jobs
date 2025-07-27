'use client';

import { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Bell, 
  Briefcase, 
  Building, 
  Heart,
  MapPin,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
}

export default function Header({ onSearchChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-3">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold text-gray-900">
                  България <span className="text-primary-600">Стажове</span>
                </h1>
                <p className="text-xs text-gray-500">Bulgaria Internships</p>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search internships, companies, or skills..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#jobs" 
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              <Briefcase className="h-4 w-4 mr-1" />
              Jobs
            </a>
            <a 
              href="#companies" 
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              <Building className="h-4 w-4 mr-1" />
              Companies
            </a>
            <a 
              href="#saved" 
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative"
            >
              <Heart className="h-4 w-4 mr-1" />
              Saved
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </a>
                  <a href="#applications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Applications
                  </a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <hr className="my-1" />
                  <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign Out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search internships..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <a 
              href="#jobs" 
              className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <Briefcase className="h-5 w-5 mr-3" />
              Browse Jobs
            </a>
            <a 
              href="#companies" 
              className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <Building className="h-5 w-5 mr-3" />
              Companies
            </a>
            <a 
              href="#saved" 
              className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <Heart className="h-5 w-5 mr-3" />
              Saved Jobs
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
            </a>
            <a 
              href="#location" 
              className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <MapPin className="h-5 w-5 mr-3" />
              Sofia, Bulgaria
            </a>
          </div>
        )}
      </div>
    </header>
  );
}