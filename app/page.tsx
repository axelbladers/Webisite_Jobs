'use client';

import { useState, useMemo } from 'react';
import { Filter as FilterIcon, Grid, List, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import JobCard from '@/components/JobCard';
import FilterSidebar from '@/components/FilterSidebar';
import FeaturedCompanies from '@/components/FeaturedCompanies';
import JobCategories from '@/components/JobCategories';
import { Job, Filter } from '@/types';
import { mockJobs } from '@/data/mockData';

export default function HomePage() {
  const [jobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState<Filter>({});
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'salary' | 'applicants'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      // Text search
      if (filters.query) {
        const searchTerms = filters.query.toLowerCase();
        const searchableText = `${job.title} ${job.company} ${job.description} ${job.tags.join(' ')}`.toLowerCase();
        if (!searchableText.includes(searchTerms)) return false;
      }

      // Job type filter
      if (filters.type?.length && !filters.type.includes(job.type)) return false;

      // Work type filter
      if (filters.workType?.length && !filters.workType.includes(job.workType)) return false;

      // Location filter
      if (filters.location?.length) {
        const jobLocation = job.location.split(',')[0].trim();
        if (!filters.location.includes(jobLocation)) return false;
      }

      // Category filter
      if (filters.category?.length && !filters.category.includes(job.category)) return false;

      // Paid filter
      if (filters.isPaid !== undefined && job.isPaid !== filters.isPaid) return false;

      // Featured filter
      if (filters.featured && !job.featured) return false;

      // Salary filter
      if (filters.salaryMin && job.salary && job.salary.min && job.salary.min < filters.salaryMin) return false;
      if (filters.salaryMax && job.salary && job.salary.max && job.salary.max > filters.salaryMax) return false;

      return true;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case 'salary':
          const aSalary = a.salary?.max || a.salary?.min || 0;
          const bSalary = b.salary?.max || b.salary?.min || 0;
          return bSalary - aSalary;
        case 'applicants':
          return a.applicants - b.applicants;
        default:
          return 0;
      }
    });

    return filtered;
  }, [jobs, filters, sortBy]);

  const handleSearch = (query: string, location?: string) => {
    setFilters(prev => ({
      ...prev,
      query,
      ...(location && location !== 'All' ? { location: [location] } : {})
    }));
  };

  const handleCategorySelect = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: [category]
    }));
  };

  const handleHeaderSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
  };

  const handleApply = (jobId: string) => {
    // In a real app, this would open an application modal or redirect
    console.log('Applying to job:', jobId);
    alert('Application feature coming soon!');
  };

  const handleSave = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleShare = (jobId: string) => {
    // In a real app, this would open a share modal
    console.log('Sharing job:', jobId);
    if (navigator.share) {
      navigator.share({
        title: 'Job Opportunity',
        text: 'Check out this job opportunity!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={handleHeaderSearch} />
      
      <HeroSection onSearch={handleSearch} />

      <JobCategories onCategorySelect={handleCategorySelect} />

      <FeaturedCompanies />

      {/* Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Latest Opportunities
            </h2>
            <p className="text-gray-600">
              {filteredAndSortedJobs.length} jobs found
              {Object.keys(filters).length > 0 && ' with current filters'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="salary">Highest Salary</option>
                <option value="applicants">Fewest Applicants</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* Mobile Sidebar */}
          <div className="lg:hidden">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* Job Grid */}
          <div className="flex-1 min-w-0">
            {filteredAndSortedJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FilterIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 xl:grid-cols-2 gap-6' 
                  : 'space-y-4'
                }
              `}>
                {filteredAndSortedJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onSave={handleSave}
                    onShare={handleShare}
                    isSaved={savedJobs.includes(job.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">БС</span>
                </div>
                <span className="text-xl font-display font-bold">България Стажове</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Connecting young professionals with top Bulgarian companies. 
                Start your career journey with us and find the perfect internship or entry-level position.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Instagram
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Career Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Interview Tips</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Post a Job</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Talent Pool</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Sales</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 България Стажове. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}