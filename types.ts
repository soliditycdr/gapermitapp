export type StateCode = 'GA' | 'CA' | 'TX' | 'FL' | 'NY';

export interface StateConfig {
  code: StateCode;
  name: string;
  agency: string; // e.g., "DDS" or "DMV"
  comingSoon?: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  category: string;
  explanation?: string;
  image?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string; // New field for discount/beta logic
  period?: string;
  features: string[];
  recommended?: boolean;
}

export interface QuizResult {
  score: number;
  total: number;
  weakness: string[];
}

export interface PremiumExam {
  id: string;
  title: string;
  questionCount: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed?: boolean;
  score?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Premium' | 'Family';
  status: 'Active' | 'Expired';
  joinedDate: string;
}