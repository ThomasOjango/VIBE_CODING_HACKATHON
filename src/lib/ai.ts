// Using free AI responses with fallback to mock responses
const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export const aiService = {
  getDietAdvice: async (query: string, userProfile: any) => {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        {
          headers: {
            'Authorization': `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: `As a nutrition expert for Kenyan athletes, provide advice for: ${query}. Consider local foods and cultural preferences.`,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error('AI service unavailable');
      }
      
      const result = await response.json();
      return result[0]?.generated_text || "I'm here to help with your nutrition questions. Could you provide more specific details about your dietary needs?";
    } catch (error) {
      return "I apologize, but I'm having trouble connecting right now. Please try again later or consult with our nutrition experts.";
    }
  },

  getMentalHealthSupport: async (query: string) => {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        {
          headers: {
            'Authorization': `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: `As a supportive mental health assistant for athletes, provide empathetic guidance for: ${query}. Focus on wellness and suggest professional help when appropriate.`,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error('AI service unavailable');
      }
      
      const result = await response.json();
      return result[0]?.generated_text || "I understand you're reaching out for support. Would you like to connect with one of our mental health experts for personalized assistance?";
    } catch (error) {
      return "I'm here to listen and support you. If you're in crisis, please reach out to a mental health professional immediately.";
    }
  }
};

// Smart fallback responses based on query content
const getDietFallbackResponse = (query: string, userProfile: any): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('weight') || lowerQuery.includes('lose') || lowerQuery.includes('gain')) {
    return "For healthy weight management, focus on balanced meals with local Kenyan foods like ugali, sukuma wiki, and lean proteins. Consider your training schedule and eat 3-4 hours before intense workouts. Would you like to connect with one of our nutrition experts for a personalized plan?";
  }
  
  if (lowerQuery.includes('hydration') || lowerQuery.includes('water') || lowerQuery.includes('drink')) {
    return "Hydration is crucial in Kenya's climate! Aim for 3-4 liters of water daily, more during training. Start your day with water, drink regularly during workouts, and include natural electrolytes from coconut water or diluted fruit juices.";
  }
  
  if (lowerQuery.includes('energy') || lowerQuery.includes('tired') || lowerQuery.includes('fatigue')) {
    return "For sustained energy, include complex carbohydrates like sweet potatoes, brown rice, and traditional grains. Combine with proteins like beans, fish, or lean meat. Eat small, frequent meals and don't skip breakfast!";
  }
  
  if (lowerQuery.includes('muscle') || lowerQuery.includes('protein') || lowerQuery.includes('strength')) {
    return "For muscle building, aim for 1.6-2.2g protein per kg body weight. Great local sources include fish, chicken, beans, groundnuts, and milk. Spread protein intake throughout the day and include it in post-workout meals.";
  }
  
  if (lowerQuery.includes('recovery') || lowerQuery.includes('after workout') || lowerQuery.includes('post')) {
    return "Post-workout nutrition is key! Within 30 minutes, have a snack with carbs and protein like a banana with groundnut butter, or milk with honey. Follow with a balanced meal within 2 hours including local foods like fish with ugali and vegetables.";
  }
  
  return "I'm here to help with your nutrition questions! For Kenyan athletes, I recommend focusing on local, whole foods like ugali, sukuma wiki, sweet potatoes, beans, and fresh fruits. What specific aspect of nutrition would you like to discuss?";
};

const getMentalHealthFallbackResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('stress') || lowerQuery.includes('pressure') || lowerQuery.includes('anxious')) {
    return "It's normal to feel stressed as an athlete. Try deep breathing exercises: breathe in for 4 counts, hold for 4, exhale for 6. Regular meditation, even 5 minutes daily, can help. Remember, pressure is a privilege - it means you're competing at a level that matters!";
  }
  
  if (lowerQuery.includes('motivation') || lowerQuery.includes('unmotivated') || lowerQuery.includes('lazy')) {
    return "Motivation comes and goes, but discipline stays. Set small, achievable daily goals. Remember why you started - write it down and read it when motivation is low. Connect with your training partners or coach for support. Every champion has days like this!";
  }
  
  if (lowerQuery.includes('confidence') || lowerQuery.includes('doubt') || lowerQuery.includes('believe')) {
    return "Self-doubt is part of growth. Focus on your preparation and past achievements. Use positive self-talk: 'I am prepared,' 'I belong here.' Visualize successful performances. Remember, confidence comes from competence - trust your training!";
  }
  
  if (lowerQuery.includes('sleep') || lowerQuery.includes('tired') || lowerQuery.includes('rest')) {
    return "Quality sleep is crucial for athletes! Aim for 7-9 hours nightly. Create a bedtime routine: no screens 1 hour before bed, keep your room cool and dark. If racing thoughts keep you awake, try writing them down or gentle stretching.";
  }
  
  if (lowerQuery.includes('injury') || lowerQuery.includes('hurt') || lowerQuery.includes('pain')) {
    return "Dealing with injury is tough mentally. It's normal to feel frustrated or sad. Focus on what you CAN do - maybe it's time to work on other skills, study your sport, or support teammates. This setback can become a comeback story!";
  }
  
  if (lowerQuery.includes('competition') || lowerQuery.includes('performance') || lowerQuery.includes('race')) {
    return "Pre-competition nerves are normal and can actually help performance! Use them as energy. Stick to your routine, focus on your process rather than outcomes. Remember: you've trained for this moment. Trust your preparation and enjoy competing!";
  }
  
  return "I'm here to support you! Remember that seeking help shows strength, not weakness. Mental health is just as important as physical health for athletes. If you're struggling, consider speaking with one of our mental health experts who understand athlete challenges.";
};