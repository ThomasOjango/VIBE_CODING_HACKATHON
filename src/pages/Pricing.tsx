import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Check, 
  Star, 
  CreditCard, 
  Shield, 
  Zap,
  Users,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { pricingPlans, oneTimeServices } from '../lib/intersend';
import Button from '../components/UI/Button';
import SubscriptionModal from '../components/Payment/SubscriptionModal';
import PaymentModal from '../components/Payment/PaymentModal';

const Pricing = () => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof pricingPlans>('premium');
  const [selectedService, setSelectedService] = useState<any>(null);
  const { user } = useAuth();

  const handleSubscribe = (planKey: keyof typeof pricingPlans) => {
    if (!user) {
      alert('Please log in to subscribe');
      return;
    }
    setSelectedPlan(planKey);
    setShowSubscriptionModal(true);
  };

  const handleBuyService = (service: any) => {
    if (!user) {
      alert('Please log in to purchase');
      return;
    }
    setSelectedService(service);
    setShowPaymentModal(true);
  };

  const planIcons = {
    basic: <Users className="w-8 h-8" />,
    premium: <Star className="w-8 h-8" />,
    pro: <Crown className="w-8 h-8" />
  };

  const planColors = {
    basic: 'from-blue-500 to-blue-600',
    premium: 'from-green-500 to-green-600',
    pro: 'from-purple-500 to-purple-600'
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Health Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock premium features and get personalized support from certified experts. 
            All plans include secure payments via M-Pesa and major payment methods.
          </p>
        </motion.div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {Object.entries(pricingPlans).map(([key, plan], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                key === 'premium' ? 'ring-2 ring-green-500 transform scale-105' : ''
              }`}
            >
              {key === 'premium' && (
                <div className="bg-green-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${planColors[key as keyof typeof planColors]} text-white flex items-center justify-center mx-auto mb-4`}>
                    {planIcons[key as keyof typeof planIcons]}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {plan.currency} {(plan.price / 100).toFixed(2)}
                  </div>
                  <div className="text-gray-500">per {plan.interval}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSubscribe(key as keyof typeof pricingPlans)}
                  className={`w-full ${key === 'premium' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  variant={key === 'premium' ? 'primary' : 'outline'}
                  size="large"
                >
                  {key === 'basic' ? 'Start Free Trial' : `Choose ${plan.name}`}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* One-time Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              One-Time Services
            </h2>
            <p className="text-xl text-gray-600">
              Get expert help when you need it most
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(oneTimeServices).map(([key, service], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {key === 'expert-consultation' && <Users className="w-6 h-6" />}
                    {key === 'meal-plan' && <Zap className="w-6 h-6" />}
                    {key === 'workout-program' && <TrendingUp className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {service.currency} {(service.price / 100).toFixed(2)}
                  </div>
                </div>

                <p className="text-gray-600 text-center mb-6">{service.description}</p>

                <Button
                  onClick={() => handleBuyService(service)}
                  variant="outline"
                  className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                  icon={<CreditCard className="w-4 h-4" />}
                >
                  Purchase Now
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8"
        >
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Secure & Convenient Payments
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use Intersend's secure payment platform to ensure your transactions are safe and convenient. 
              Pay with M-Pesa, bank transfer, or international cards.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Bank-level Security</h4>
              <p className="text-sm text-gray-600">256-bit SSL encryption</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Multiple Payment Options</h4>
              <p className="text-sm text-gray-600">M-Pesa, cards, bank transfer</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Instant Activation</h4>
              <p className="text-sm text-gray-600">Access features immediately</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Money-back Guarantee</h4>
              <p className="text-sm text-gray-600">7-day refund policy</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        selectedPlan={selectedPlan}
        onSuccess={(subscriptionId) => {
          console.log('Subscription successful:', subscriptionId);
          setShowSubscriptionModal(false);
        }}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        service={selectedService}
        onSuccess={(paymentId) => {
          console.log('Payment successful:', paymentId);
          setShowPaymentModal(false);
        }}
      />
    </div>
  );
};

export default Pricing;