export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Internship' | 'Entry Level' | 'Graduate Program';
  workType: 'Remote' | 'On-site' | 'Hybrid';
  salary?: {
    min?: number;
    max?: number;
    currency: 'BGN' | 'EUR' | 'USD';
    period: 'month' | 'hour';
  };
  isPaid: boolean;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  category: string;
  postedDate: string;
  deadline?: string;
  applicants: number;
  featured: boolean;
  verified: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  location: string;
  size: string;
  industry: string;
  founded?: number;
  openPositions: number;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  university?: string;
  major?: string;
  graduationYear?: number;
  skills: string[];
  resume?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
}

export interface Filter {
  query?: string;
  type?: string[];
  workType?: string[];
  location?: string[];
  category?: string[];
  isPaid?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  featured?: boolean;
}

export interface SearchState {
  jobs: Job[];
  loading: boolean;
  filters: Filter;
  total: number;
  page: number;
  pageSize: number;
}