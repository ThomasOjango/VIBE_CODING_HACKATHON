// Intersend payment integration for Better Life app
import { Intersend } from '@intersend/js-sdk';

// Initialize Intersend with your API key
const intersend = new Intersend({
  apiKey: import.meta.env.VITE_INTERSEND_API_KEY || 'demo-key',
  environment: import.meta.env.VITE_INTERSEND_ENVIRONMENT || 'sandbox'
});

export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  metadata?: Record<string, any>;
}

export interface SubscriptionRequest {
  planId: string;
  customerEmail: string;
  customerName: string;
  metadata?: Record<string, any>;
}

export const intersendService = {
  // Create a one-time payment
  createPayment: async (paymentData: PaymentRequest) => {
    try {
      const payment = await intersend.payments.create({
        amount: paymentData.amount * 100, // Convert to cents
        currency: paymentData.currency,
        description: paymentData.description,
        customer: {
          email: paymentData.customerEmail,
          name: paymentData.customerName,
        },
        metadata: paymentData.metadata,
        success_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/cancel`,
      });

      return { success: true, payment };
    } catch (error) {
      console.error('Payment creation failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Create a subscription
  createSubscription: async (subscriptionData: SubscriptionRequest) => {
    try {
      const subscription = await intersend.subscriptions.create({
        plan_id: subscriptionData.planId,
        customer: {
          email: subscriptionData.customerEmail,
          name: subscriptionData.customerName,
        },
        metadata: subscriptionData.metadata,
        success_url: `${window.location.origin}/subscription/success`,
        cancel_url: `${window.location.origin}/subscription/cancel`,
      });

      return { success: true, subscription };
    } catch (error) {
      console.error('Subscription creation failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Get payment status
  getPaymentStatus: async (paymentId: string) => {
    try {
      const payment = await intersend.payments.retrieve(paymentId);
      return { success: true, payment };
    } catch (error) {
      console.error('Failed to get payment status:', error);
      return { success: false, error: error.message };
    }
  },

  // Get subscription status
  getSubscriptionStatus: async (subscriptionId: string) => {
    try {
      const subscription = await intersend.subscriptions.retrieve(subscriptionId);
      return { success: true, subscription };
    } catch (error) {
      console.error('Failed to get subscription status:', error);
      return { success: false, error: error.message };
    }
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId: string) => {
    try {
      const subscription = await intersend.subscriptions.cancel(subscriptionId);
      return { success: true, subscription };
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      return { success: false, error: error.message };
    }
  }
};

// Pricing plans
export const pricingPlans = {
  basic: {
    id: 'basic',
    name: 'Basic Plan',
    price: 999, // KES 9.99
    currency: 'KES',
    interval: 'month',
    features: [
      'Basic nutrition tracking',
      'Workout logging',
      'Hydration monitoring',
      'Basic AI assistance',
      'Community access'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium Plan',
    price: 2999, // KES 29.99
    currency: 'KES',
    interval: 'month',
    features: [
      'Everything in Basic',
      'Advanced AI nutrition advice',
      'Mental health AI support',
      'Progress analytics',
      'Priority support',
      '2 expert consultations/month'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro Plan',
    price: 4999, // KES 49.99
    currency: 'KES',
    interval: 'month',
    features: [
      'Everything in Premium',
      'Unlimited expert consultations',
      'Personalized meal plans',
      'Custom workout programs',
      'Advanced analytics',
      'White-label features'
    ]
  }
};

// One-time services
export const oneTimeServices = {
  expertConsultation: {
    id: 'expert-consultation',
    name: 'Expert Consultation',
    price: 1500, // KES 15.00
    currency: 'KES',
    description: 'One-on-one consultation with certified nutrition or mental health expert'
  },
  personalizedMealPlan: {
    id: 'meal-plan',
    name: 'Personalized Meal Plan',
    price: 2500, // KES 25.00
    currency: 'KES',
    description: 'Custom 30-day meal plan designed for your goals and preferences'
  },
  workoutProgram: {
    id: 'workout-program',
    name: 'Custom Workout Program',
    price: 2000, // KES 20.00
    currency: 'KES',
    description: 'Personalized 12-week workout program designed by fitness experts'
  }
};