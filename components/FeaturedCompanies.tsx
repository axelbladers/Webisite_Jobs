'use client';

import { Building, ExternalLink, MapPin, Users, Verified } from 'lucide-react';
import { Company } from '@/types';
import { mockCompanies } from '@/data/mockData';

export default function FeaturedCompanies() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Partner Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students who have launched their careers with Bulgaria's top companies
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {/* Company Logos */}
        <div className="border-t border-gray-200 pt-12">
          <p className="text-center text-gray-500 mb-8 font-medium">
            Trusted by leading Bulgarian companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {/* Additional company logos */}
            <div className="flex items-center justify-center h-16">
              <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Epam</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16">
              <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">SBTech</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16">
              <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Luxoft</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16">
              <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Playtech</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16">
              <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Paysafe</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16">
              <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Postinor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CompanyCardProps {
  company: Company;
}

function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {company.logo ? (
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <Building className="h-6 w-6 text-primary-600" />
          )}
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors duration-200">
              {company.name}
            </h3>
            {company.verified && (
              <Verified className="h-4 w-4 text-primary-600 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-500">{company.industry}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {company.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          {company.location}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          {company.size}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Building className="h-4 w-4 mr-2" />
          Founded {company.founded}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm">
          <span className="font-medium text-primary-600">{company.openPositions}</span>
          <span className="text-gray-500"> open positions</span>
        </div>
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
        >
          <span>View</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}