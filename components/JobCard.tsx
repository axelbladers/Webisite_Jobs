'use client';

import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Heart, 
  ExternalLink, 
  Users, 
  Calendar,
  Badge,
  Bookmark,
  Share,
  Verified
} from 'lucide-react';
import { Job } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  onShare?: (jobId: string) => void;
  isSaved?: boolean;
}

export default function JobCard({ job, onApply, onSave, onShare, isSaved = false }: JobCardProps) {
  const formatSalary = (salary: Job['salary']) => {
    if (!salary) return null;
    const { min, max, currency, period } = salary;
    const minStr = min ? min.toLocaleString() : '';
    const maxStr = max ? max.toLocaleString() : '';
    const range = min && max ? `${minStr} - ${maxStr}` : minStr || maxStr;
    return `${range} ${currency}/${period}`;
  };

  const getJobTypeBadgeColor = (type: Job['type']) => {
    switch (type) {
      case 'Internship':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Entry Level':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Graduate Program':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWorkTypeBadgeColor = (workType: Job['workType']) => {
    switch (workType) {
      case 'Remote':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Hybrid':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'On-site':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="card p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Featured Badge */}
      {job.featured && (
        <div className="absolute -right-8 top-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-1 text-xs font-semibold transform rotate-12 shadow-lg">
          FEATURED
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            {job.companyLogo ? (
              <img 
                src={job.companyLogo} 
                alt={job.company} 
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <span className="text-primary-600 font-bold text-lg">
                {job.company.charAt(0)}
              </span>
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 truncate">
                {job.title}
              </h3>
              {job.verified && (
                <Verified className="h-4 w-4 text-primary-600 flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-600 font-medium">{job.company}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSave?.(job.id)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isSaved 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onShare?.(job.id)}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
          >
            <Share className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeBadgeColor(job.type)}`}>
          {job.type}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getWorkTypeBadgeColor(job.workType)}`}>
          {job.workType}
        </span>
        {job.isPaid && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            Paid
          </span>
        )}
        {!job.isPaid && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            Unpaid
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags.slice(0, 4).map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-primary-50 text-primary-700 rounded-md text-xs font-medium hover:bg-primary-100 transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
        {job.tags.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
            +{job.tags.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {/* Salary */}
          {job.salary && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="font-medium text-gray-700">{formatSalary(job.salary)}</span>
            </div>
          )}
          
          {/* Posted Date */}
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDistanceToNow(new Date(job.postedDate))} ago</span>
          </div>

          {/* Applicants */}
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{job.applicants} applicants</span>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={() => onApply?.(job.id)}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex items-center space-x-2 group"
        >
          <span>Apply Now</span>
          <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>

      {/* Deadline Warning */}
      {job.deadline && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center text-sm text-amber-800">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              Application deadline: {new Date(job.deadline).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}