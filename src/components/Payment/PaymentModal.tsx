import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { intersendService, PaymentRequest, INTERSEND_ACCOUNT } from '../../lib/intersend';
import Button from '../UI/Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    name: string;
    price: number;
    currency: string;
    description: string;
  };
  onSuccess?: (paymentId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  service,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { userProfile } = useAuth();

  const handlePayment = async () => {
    if (!userProfile) {
      setError('Please log in to make a payment');
      return;
    }

    setLoading(true);
    setError('');

    const paymentData: PaymentRequest = {
      amount: service.price / 100, // Convert from cents
      currency: service.currency,
      description: service.description,
      customerEmail: userProfile.email,
      customerName: userProfile.full_name,
      metadata: {
        serviceId: service.id,
        userId: userProfile.id
      }
    };

    try {
      const result = await intersendService.createPayment(paymentData);
      
      if (result.success && result.payment) {
        // Redirect to Intersend checkout
        window.location.href = result.payment.checkout_url;
      } else {
        setError(result.error || 'Payment failed. Please try again.');
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
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Complete Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Payment Successful!
            </h4>
            <p className="text-gray-600">
              Your payment has been processed successfully.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Amount:</span>
                <span className="text-xl font-bold text-green-600">
                  {service.currency} {(service.price / 100).toFixed(2)}
                </span>
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
                <div className="flex items-center mb-2">
                  <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Secure Payment</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Your payment will be processed securely through Intersend to {INTERSEND_ACCOUNT.businessName} 
                  (Account: {INTERSEND_ACCOUNT.phoneNumber}). We support M-Pesa, bank transfers, and major credit cards.
                </p>
              </div>

              <Button
                onClick={handlePayment}
                loading={loading}
                className="w-full"
                size="large"
                icon={<CreditCard className="w-5 h-5" />}
              >
                {loading ? 'Processing...' : `Pay ${service.currency} ${(service.price / 100).toFixed(2)}`}
              </Button>

              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentModal;