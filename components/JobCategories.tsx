'use client';

import { 
  Code, 
  Megaphone, 
  Palette, 
  TrendingUp, 
  DollarSign, 
  Video, 
  Heart, 
  GraduationCap,
  ShoppingCart,
  Settings
} from 'lucide-react';
import { jobCategories } from '@/data/mockData';

interface JobCategoriesProps {
  onCategorySelect?: (category: string) => void;
}

export default function JobCategories({ onCategorySelect }: JobCategoriesProps) {
  const categoryIcons: Record<string, any> = {
    'Technology': Code,
    'Marketing': Megaphone,
    'Design': Palette,
    'Business': TrendingUp,
    'Finance': DollarSign,
    'Media': Video,
    'Healthcare': Heart,
    'Education': GraduationCap,
    'Sales': ShoppingCart,
    'Operations': Settings,
  };

  const categoryColors: Record<string, string> = {
    'Technology': 'from-blue-500 to-blue-600',
    'Marketing': 'from-green-500 to-green-600',
    'Design': 'from-purple-500 to-purple-600',
    'Business': 'from-orange-500 to-orange-600',
    'Finance': 'from-emerald-500 to-emerald-600',
    'Media': 'from-red-500 to-red-600',
    'Healthcare': 'from-pink-500 to-pink-600',
    'Education': 'from-indigo-500 to-indigo-600',
    'Sales': 'from-amber-500 to-amber-600',
    'Operations': 'from-gray-500 to-gray-600',
  };

  const categoryJobCounts: Record<string, number> = {
    'Technology': 487,
    'Marketing': 142,
    'Design': 98,
    'Business': 156,
    'Finance': 87,
    'Media': 34,
    'Healthcare': 76,
    'Education': 45,
    'Sales': 123,
    'Operations': 67,
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find opportunities in your field of interest. From tech startups to established corporations, discover your perfect match.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {jobCategories.map((category) => {
            const IconComponent = categoryIcons[category] || Code;
            const gradient = categoryColors[category] || 'from-gray-500 to-gray-600';
            const jobCount = categoryJobCounts[category] || 0;

            return (
              <div
                key={category}
                onClick={() => onCategorySelect?.(category)}
                className="group cursor-pointer"
              >
                <div className="card p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {jobCount.toLocaleString()} open positions
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Popular Categories Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">
                Most Popular Categories This Month
              </h3>
              <p className="text-primary-100 mb-6">
                Join the thousands of students who have found their dream internships in these trending fields.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Technology', 'Marketing', 'Business'].map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategorySelect?.(category)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200 text-sm font-medium"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">487</div>
                <div className="text-primary-200 text-sm">Tech Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">142</div>
                <div className="text-primary-200 text-sm">Marketing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">156</div>
                <div className="text-primary-200 text-sm">Business</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">98</div>
                <div className="text-primary-200 text-sm">Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}