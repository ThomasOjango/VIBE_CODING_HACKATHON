// Mock Intersend payment integration for Better Life app
// This is a demonstration implementation - replace with actual Intersend SDK when available

// Mock Intersend class to simulate the SDK
class MockIntersend {
  private config: { apiKey: string; environment: string };

  constructor(config: { apiKey: string; environment: string }) {
    this.config = config;
  }

  payments = {
    create: async (paymentData: any) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful payment creation
      return {
        id: `pay_${Date.now()}`,
        status: 'pending',
        amount: paymentData.amount,
        currency: paymentData.currency,
        checkout_url: `https://checkout.intersend.co/pay_${Date.now()}`,
        ...paymentData
      };
    },

    retrieve: async (paymentId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: paymentId,
        status: 'completed',
        amount: 1000,
        currency: 'KES'
      };
    }
  };

  subscriptions = {
    create: async (subscriptionData: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: `sub_${Date.now()}`,
        status: 'active',
        plan_id: subscriptionData.plan_id,
        checkout_url: `https://checkout.intersend.co/sub_${Date.now()}`,
        ...subscriptionData
      };
    },

    retrieve: async (subscriptionId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: subscriptionId,
        status: 'active',
        plan_id: 'premium'
      };
    },

    cancel: async (subscriptionId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: subscriptionId,
        status: 'cancelled'
      };
    }
  };
}

// Initialize mock Intersend
const intersend = new MockIntersend({
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
      return { success: false, error: (error as Error).message };
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
      return { success: false, error: (error as Error).message };
    }
  },

  // Get payment status
  getPaymentStatus: async (paymentId: string) => {
    try {
      const payment = await intersend.payments.retrieve(paymentId);
      return { success: true, payment };
    } catch (error) {
      console.error('Failed to get payment status:', error);
      return { success: false, error: (error as Error).message };
    }
  },

  // Get subscription status
  getSubscriptionStatus: async (subscriptionId: string) => {
    try {
      const subscription = await intersend.subscriptions.retrieve(subscriptionId);
      return { success: true, subscription };
    } catch (error) {
      console.error('Failed to get subscription status:', error);
      return { success: false, error: (error as Error).message };
    }
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId: string) => {
    try {
      const subscription = await intersend.subscriptions.cancel(subscriptionId);
      return { success: true, subscription };
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      return { success: false, error: (error as Error).message };
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