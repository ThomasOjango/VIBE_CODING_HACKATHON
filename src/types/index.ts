export interface User {
  id: string;
  email: string;
  full_name: string;
  age?: number;
  weight?: number;
  height?: number;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goals: string[];
  language: 'en' | 'sw';
  location: string;
  created_at: string;
}

export interface MealEntry {
  id: string;
  user_id: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food_items: FoodItem[];
  date: string;
  calories: number;
  created_at: string;
}

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  quantity: string;
}

export interface WorkoutEntry {
  id: string;
  user_id: string;
  exercise_type: string;
  duration: number;
  intensity: 'low' | 'moderate' | 'high';
  calories_burned: number;
  date: string;
  notes?: string;
  created_at: string;
}

export interface HydrationEntry {
  id: string;
  user_id: string;
  amount: number; // in ml
  date: string;
  created_at: string;
}

export interface Expert {
  id: string;
  name: string;
  specialty: 'nutrition' | 'mental_health';
  bio: string;
  experience: string;
  languages: string[];
  rating: number;
  image_url: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  expert_id?: string;
  message: string;
  response?: string;
  type: 'diet' | 'mental_health' | 'expert_consultation';
  created_at: string;
}