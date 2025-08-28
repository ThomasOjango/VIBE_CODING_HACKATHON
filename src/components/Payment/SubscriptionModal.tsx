import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Crown, Check, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { intersendService, pricingPlans, SubscriptionRequest } from '../../lib/intersend';
import Button from '../UI/Button';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: keyof typeof pricingPlans;
  onSuccess?: (subscriptionId: string) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  selectedPlan = 'premium',
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPlan, setCurrentPlan] = useState(selectedPlan);
  const { userProfile } = useAuth();

  const plan = pricingPlans[currentPlan];

  const handleSubscription = async () => {
    if (!userProfile) {
      setError('Please log in to subscribe');
      return;
    }

    setLoading(true);
    setError('');

    const subscriptionData: SubscriptionRequest = {
      planId: plan.id,
      customerEmail: userProfile.email,
      customerName: userProfile.full_name,
      metadata: {
        userId: userProfile.id,
        planName: plan.name
      }
    };

    try {
      const result = await intersendService.createSubscription(subscriptionData);
      
      if (result.success && result.subscription) {
        // Redirect to Intersend checkout
        window.location.href = result.subscription.checkout_url;
      } else {
        setError(result.error || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Choose Your Plan</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {Object.entries(pricingPlans).map(([key, planData]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02 }}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                currentPlan === key
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setCurrentPlan(key as keyof typeof pricingPlans)}
            >
              <div className="text-center">
                {key === 'pro' && (
                  <Crown className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                )}
                <h4 className="font-bold text-gray-900 mb-2">{planData.name}</h4>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {planData.currency} {(planData.price / 100).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">per {planData.interval}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Plan Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {plan.currency} {(plan.price / 100).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">per {plan.interval}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="font-medium text-gray-800 mb-3">What's included:</h5>
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 flex items-center"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </motion.div>
        )}

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-800 mb-2">Subscription Benefits</h5>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Cancel anytime - no long-term commitment</li>
              <li>• Secure payments via M-Pesa, bank transfer, or card</li>
              <li>• Instant access to premium features</li>
              <li>• 7-day money-back guarantee</li>
            </ul>
          </div>

          <Button
            onClick={handleSubscription}
            loading={loading}
            className="w-full"
            size="large"
            icon={loading ? <Loader className="w-5 h-5 animate-spin" /> : <Crown className="w-5 h-5" />}
          >
            {loading ? 'Processing...' : `Subscribe to ${plan.name}`}
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
            disabled={loading}
          >
            Maybe Later
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionModal;