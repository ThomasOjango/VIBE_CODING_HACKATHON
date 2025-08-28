import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe,
  ChevronRight,
  Star
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/UI/Button';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Comprehensive Tracking",
      description: "Track meals, workouts, hydration, and progress with detailed analytics",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mental Health Support",
      description: "Access personalized mental health experts and AI-powered emotional support",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Consultation",
      description: "Connect with verified nutrition and mental health professionals",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "AI-powered insights and recommendations tailored to your goals",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Kenyan Focused",
      description: "Localized content, food database, and expert network for Kenya",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const testimonials = [
    {
      name: "Mary Wanjiku",
      role: "Marathon Runner, Nairobi",
      content: "Better Life transformed my training. The local food recommendations and expert guidance helped me achieve my personal best.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "David Kiplagat",
      role: "Football Player, Eldoret",
      content: "The mental health support feature was a game-changer. Having access to professionals who understand athlete pressures is invaluable.",
      rating: 5,
      image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Grace Achieng",
      role: "Fitness Enthusiast, Kisumu",
      content: "I love how the app speaks Swahili and understands our local foods. It makes healthy eating so much easier and more relatable.",
      rating: 5,
      image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('hero.title')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  with AI
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('hero.subtitle')}. Get personalized nutrition, mental health support, and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="large" className="px-8 py-4 text-lg">
                  <Link to="/signup" className="flex items-center">
                    {t('hero.cta')} <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="large" className="px-8 py-4 text-lg">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
                <img
                  src="https://images.pexels.com/photos/1552108/pexels-photo-1552108.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Kenyan athlete training"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Join 10,000+ Kenyan Athletes
                  </h3>
                  <p className="text-gray-600">
                    Transform your health journey today
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl transform -rotate-3"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and expert support designed specifically for Kenyan athletes and sports enthusiasts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Active Users" },
              { number: "500+", label: "Expert Consultations" },
              { number: "50,000+", label: "Workouts Tracked" },
              { number: "98%", label: "User Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from Kenyan athletes and fitness enthusiasts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of Kenyan athletes who trust Better Life for their health and fitness journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="large"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                <Link to="/signup" className="flex items-center">
                  Get Started Free <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;