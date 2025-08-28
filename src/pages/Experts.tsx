import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Star, 
  MessageCircle, 
  Calendar, 
  Award, 
  Globe, 
  Filter,
  Search,
  Clock,
  CheckCircle,
  CreditCard
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/UI/Button';
import { Expert } from '../types';
import PaymentModal from '../components/Payment/PaymentModal';
import { oneTimeServices } from '../lib/intersend';

const Experts = () => {
  const { t } = useLanguage();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<'all' | 'nutrition' | 'mental_health'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mock experts data
  useEffect(() => {
    const mockExperts: Expert[] = [
      {
        id: '1',
        name: 'Dr. Sarah Wanjiku',
        specialty: 'nutrition',
        bio: 'Certified Sports Nutritionist with 10+ years experience working with Kenyan athletes. Specializes in endurance sports nutrition and traditional Kenyan foods.',
        experience: '10+ years in sports nutrition, Former nutritionist for Kenya Athletics team',
        languages: ['English', 'Swahili', 'Kikuyu'],
        rating: 4.9,
        image_url: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: '2',
        name: 'Dr. James Kiplagat',
        specialty: 'mental_health',
        bio: 'Licensed Clinical Psychologist specializing in sports psychology and athlete mental health. Helps athletes overcome performance anxiety and build mental resilience.',
        experience: '8 years in sports psychology, PhD in Clinical Psychology from University of Nairobi',
        languages: ['English', 'Swahili', 'Kalenjin'],
        rating: 4.8,
        image_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: '3',
        name: 'Dr. Grace Achieng',
        specialty: 'nutrition',
        bio: 'Registered Dietitian focusing on weight management and metabolic health. Expert in creating sustainable meal plans using local Kenyan ingredients.',
        experience: '12 years in clinical nutrition, Masters in Nutrition and Dietetics',
        languages: ['English', 'Swahili', 'Luo'],
        rating: 4.7,
        image_url: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: '4',
        name: 'Dr. Michael Mwangi',
        specialty: 'mental_health',
        bio: 'Counseling Psychologist with expertise in stress management and mindfulness techniques. Helps athletes develop coping strategies for competitive pressure.',
        experience: '6 years in counseling psychology, Certified mindfulness instructor',
        languages: ['English', 'Swahili'],
        rating: 4.6,
        image_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: '5',
        name: 'Dr. Ruth Nyong\'o',
        specialty: 'nutrition',
        bio: 'Sports Nutrition Specialist with focus on hydration strategies and recovery nutrition. Works with marathon runners and cyclists.',
        experience: '9 years in sports nutrition, Former athlete turned nutritionist',
        languages: ['English', 'Swahili', 'Luo'],
        rating: 4.8,
        image_url: 'https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: '6',
        name: 'Dr. Peter Kamau',
        specialty: 'mental_health',
        bio: 'Psychiatric Nurse Practitioner specializing in anxiety and depression management for athletes. Provides both therapy and medication management.',
        experience: '11 years in psychiatric care, Board certified psychiatric nurse practitioner',
        languages: ['English', 'Swahili', 'Kikuyu'],
        rating: 4.9,
        image_url: 'https://images.pexels.com/photos/5327532/pexels-photo-5327532.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ];

    setExperts(mockExperts);
    setFilteredExperts(mockExperts);
  }, []);

  // Filter experts based on specialty and search term
  useEffect(() => {
    let filtered = experts;

    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(expert => expert.specialty === selectedSpecialty);
    }

    if (searchTerm) {
      filtered = filtered.filter(expert =>
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExperts(filtered);
  }, [experts, selectedSpecialty, searchTerm]);

  const handleBookConsultation = (expert: Expert) => {
    // Show payment modal first
    setSelectedExpert(expert);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    console.log('Payment successful:', paymentId);
    setShowPaymentModal(false);
    setShowBooking(true);
  };

  const BookingModal = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [consultationType, setConsultationType] = useState('video');
    const [notes, setNotes] = useState('');

    const handleBooking = () => {
      // In a real app, this would make an API call to book the consultation
      alert(`Consultation booked with ${selectedExpert?.name} on ${selectedDate} at ${selectedTime}`);
      setShowBooking(false);
      setSelectedExpert(null);
    };

    if (!showBooking || !selectedExpert) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Book Consultation with {selectedExpert.name}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Type
              </label>
              <select
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="video">Video Call</option>
                <option value="phone">Phone Call</option>
                <option value="chat">Text Chat</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe what you'd like to discuss..."
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="flex-1"
            >
              Book Consultation
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowBooking(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect with Health Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized guidance from certified nutrition and mental health professionals 
            who understand the unique needs of Kenyan athletes and sports enthusiasts.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search experts by name or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSpecialty('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSpecialty === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Experts
              </button>
              <button
                onClick={() => setSelectedSpecialty('nutrition')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSpecialty === 'nutrition'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Nutrition
              </button>
              <button
                onClick={() => setSelectedSpecialty('mental_health')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSpecialty === 'mental_health'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Mental Health
              </button>
            </div>
          </div>
        </motion.div>

        {/* Experts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6"
            >
              <div className="text-center mb-6">
                <img
                  src={expert.image_url}
                  alt={expert.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {expert.name}
                </h3>
                <div className="flex items-center justify-center mb-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    expert.specialty === 'nutrition'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {expert.specialty === 'nutrition' ? 'Nutrition Expert' : 'Mental Health Expert'}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {expert.rating} rating
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {expert.bio}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{expert.experience}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{expert.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleBookConsultation(expert)}
                  className="w-full"
                  icon={<CreditCard className="w-4 h-4" />}
                >
                  Book Consultation - KES 15.00
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  icon={<MessageCircle className="w-4 h-4" />}
                >
                  Start Chat
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No experts found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or browse all experts.
            </p>
          </motion.div>
        )}

        {/* How it Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How Expert Consultation Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Choose Your Expert</h3>
              <p className="text-gray-600 text-sm">
                Browse our verified experts and select based on specialty, rating, and languages spoken.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Book Your Session</h3>
              <p className="text-gray-600 text-sm">
                Schedule a convenient time for video call, phone call, or text chat consultation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Get Personalized Guidance</h3>
              <p className="text-gray-600 text-sm">
                Receive tailored advice and ongoing support to achieve your health and fitness goals.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BookingModal />
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        service={oneTimeServices.expertConsultation}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Experts;