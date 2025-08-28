import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Utensils, Brain } from 'lucide-react';
import ChatBot from './ChatBot';

const FloatingChatButton: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeChatType, setActiveChatType] = useState<'diet' | 'mental_health' | null>(null);

  const handleChatTypeSelect = (type: 'diet' | 'mental_health') => {
    setActiveChatType(type);
    setShowOptions(false);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-40">
        {/* Chat Options */}
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 space-y-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChatTypeSelect('diet')}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition-colors"
            >
              <Utensils className="w-4 h-4" />
              <span className="text-sm font-medium">Nutrition AI</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChatTypeSelect('mental_health')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">Mental Health AI</span>
            </motion.button>
          </motion.div>
        )}

        {/* Main Chat Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowOptions(!showOptions)}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Chat Bot */}
      {activeChatType && (
        <ChatBot
          type={activeChatType}
          isOpen={true}
          onClose={() => setActiveChatType(null)}
        />
      )}
    </>
  );
};

export default FloatingChatButton;