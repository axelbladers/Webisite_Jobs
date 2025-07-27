'use client';

import { useState } from 'react';
import { Search, MapPin, Briefcase, Users, Building, TrendingUp, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onSearch?: (query: string, location: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Sofia');

  const handleSearch = () => {
    onSearch?.(searchQuery, location);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '1,200+', color: 'text-primary-600' },
    { icon: Building, label: 'Partner Companies', value: '300+', color: 'text-secondary-600' },
    { icon: Users, label: 'Students Placed', value: '5,000+', color: 'text-accent-600' },
    { icon: TrendingUp, label: 'Success Rate', value: '85%', color: 'text-purple-600' },
  ];

  const popularSearches = [
    'Frontend Developer',
    'Marketing Intern',
    'Data Science',
    'UX Designer',
    'Backend Developer',
    'Business Analyst'
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-40"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-8 animate-bounce-gentle">
            <TrendingUp className="h-4 w-4 mr-2" />
            Over 1,200 opportunities available now!
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Kickstart Your
            <span className="block bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Career Journey
            </span>
            in Bulgaria
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Connect with top Bulgarian companies and find the perfect internship or entry-level position. 
            Start building your future today with opportunities designed for young professionals.
          </p>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Job Search Input */}
                <div className="md:col-span-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Job title, skills, or company..."
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Location Input */}
                <div className="md:col-span-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-8 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg transition-all duration-200 appearance-none bg-white"
                    >
                      <option value="Sofia">Sofia</option>
                      <option value="Plovdiv">Plovdiv</option>
                      <option value="Varna">Varna</option>
                      <option value="Burgas">Burgas</option>
                      <option value="Remote">Remote</option>
                      <option value="All">All Locations</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:col-span-2">
                  <button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
                  >
                    <span className="mr-2">Search</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="px-3 py-1 bg-gray-100 hover:bg-primary-100 hover:text-primary-700 text-gray-600 rounded-full text-sm transition-all duration-200 hover:scale-105"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
              For Students
            </button>
            <button className="px-8 py-4 bg-transparent text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
              For Employers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}