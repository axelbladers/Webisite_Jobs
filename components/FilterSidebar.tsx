'use client';

import { useState } from 'react';
import { 
  Filter as FilterIcon, 
  X, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Briefcase, 
  DollarSign,
  Building,
  RefreshCw
} from 'lucide-react';
import { Filter } from '@/types';
import { jobCategories, locations } from '@/data/mockData';

interface FilterSidebarProps {
  filters: Filter;
  onFiltersChange: (filters: Filter) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FilterSidebar({ filters, onFiltersChange, isOpen, onToggle }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    workType: true,
    location: true,
    category: true,
    salary: true,
    other: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key: keyof Filter, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleMultiSelectChange = (key: keyof Filter, value: string, checked: boolean) => {
    const currentValues = (filters[key] as string[]) || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    handleFilterChange(key, newValues);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.type?.length) count += filters.type.length;
    if (filters.workType?.length) count += filters.workType.length;
    if (filters.location?.length) count += filters.location.length;
    if (filters.category?.length) count += filters.category.length;
    if (filters.isPaid !== undefined) count += 1;
    if (filters.featured) count += 1;
    if (filters.salaryMin || filters.salaryMax) count += 1;
    return count;
  };

  const FilterSection = ({ 
    title, 
    icon: Icon, 
    sectionKey, 
    children 
  }: { 
    title: string; 
    icon: any; 
    sectionKey: keyof typeof expandedSections; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const CheckboxOption = ({ 
    value, 
    label, 
    checked, 
    onChange 
  }: { 
    value: string; 
    label: string; 
    checked: boolean; 
    onChange: (checked: boolean) => void;
  }) => (
    <label className="flex items-center space-x-2 py-1 cursor-pointer hover:text-primary-600 transition-colors duration-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-5 w-5 text-gray-600" />
            <h2 className="font-semibold text-gray-900">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center space-x-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Clear</span>
            </button>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-0">
          {/* Job Type */}
          <FilterSection title="Job Type" icon={Briefcase} sectionKey="jobType">
            <div className="space-y-2">
              {['Internship', 'Entry Level', 'Graduate Program'].map((type) => (
                <CheckboxOption
                  key={type}
                  value={type}
                  label={type}
                  checked={(filters.type || []).includes(type)}
                  onChange={(checked) => handleMultiSelectChange('type', type, checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Work Type */}
          <FilterSection title="Work Type" icon={Building} sectionKey="workType">
            <div className="space-y-2">
              {['Remote', 'On-site', 'Hybrid'].map((workType) => (
                <CheckboxOption
                  key={workType}
                  value={workType}
                  label={workType}
                  checked={(filters.workType || []).includes(workType)}
                  onChange={(checked) => handleMultiSelectChange('workType', workType, checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Location */}
          <FilterSection title="Location" icon={MapPin} sectionKey="location">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {locations.map((location) => (
                <CheckboxOption
                  key={location}
                  value={location}
                  label={location}
                  checked={(filters.location || []).includes(location)}
                  onChange={(checked) => handleMultiSelectChange('location', location, checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Category */}
          <FilterSection title="Category" icon={Briefcase} sectionKey="category">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {jobCategories.map((category) => (
                <CheckboxOption
                  key={category}
                  value={category}
                  label={category}
                  checked={(filters.category || []).includes(category)}
                  onChange={(checked) => handleMultiSelectChange('category', category, checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Salary */}
          <FilterSection title="Salary Range" icon={DollarSign} sectionKey="salary">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum (BGN/month)
                </label>
                <input
                  type="number"
                  value={filters.salaryMin || ''}
                  onChange={(e) => handleFilterChange('salaryMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum (BGN/month)
                </label>
                <input
                  type="number"
                  value={filters.salaryMax || ''}
                  onChange={(e) => handleFilterChange('salaryMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="10000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </FilterSection>

          {/* Other Options */}
          <FilterSection title="Other Options" icon={FilterIcon} sectionKey="other">
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.isPaid === true}
                  onChange={(e) => handleFilterChange('isPaid', e.target.checked ? true : undefined)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700">Paid positions only</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.featured || false}
                  onChange={(e) => handleFilterChange('featured', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700">Featured jobs only</span>
              </label>
            </div>
          </FilterSection>
        </div>

        {/* Quick Filters */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Filters</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange('type', ['Internship'])}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors duration-200"
            >
              Internships
            </button>
            <button
              onClick={() => handleFilterChange('workType', ['Remote'])}
              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium hover:bg-orange-200 transition-colors duration-200"
            >
              Remote
            </button>
            <button
              onClick={() => handleFilterChange('isPaid', true)}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-green-200 transition-colors duration-200"
            >
              Paid Only
            </button>
            <button
              onClick={() => handleFilterChange('category', ['Technology'])}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors duration-200"
            >
              Tech Jobs
            </button>
          </div>
        </div>
      </div>
    </>
  );
}