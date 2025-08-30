import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Plus, 
  Target, 
  TrendingUp,
  Clock,
  Award,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/UI/Button';
import ProgressChart from '../components/Charts/ProgressChart';

interface HydrationEntry {
  id: string;
  amount: number;
  time: string;
  type: string;
}

const Hydration = () => {
  const { userProfile } = useAuth();
  const { t } = useLanguage();
  const [todayIntake, setTodayIntake] = useState(1800);
  const [dailyGoal] = useState(3000);
  const [entries, setEntries] = useState<HydrationEntry[]>([
    {
      id: '1',
      amount: 500,
      time: '07:30',
      type: 'Water'
    },
    {
      id: '2',
      amount: 300,
      time: '10:15',
      type: 'Green Tea'
    },
    {
      id: '3',
      amount: 250,
      time: '12:45',
      type: 'Coconut Water'
    },
    {
      id: '4',
      amount: 400,
      time: '15:20',
      type: 'Water'
    },
    {
      id: '5',
      amount: 350,
      time: '18:00',
      type: 'Herbal Tea'
    }
  ]);
  const [newAmount, setNewAmount] = useState('');
  const [selectedType, setSelectedType] = useState('Water');

  const drinkTypes = [
    'Water',
    'Green Tea',
    'Herbal Tea',
    'Coconut Water',
    'Sports Drink',
    'Fresh Juice',
    'Other'
  ];

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Water Intake (ml)',
        data: [3200, 2800, 3500, 3000, 2600, 3800, 1800],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
      {
        label: 'Goal (ml)',
        data: [3000, 3000, 3000, 3000, 3000, 3000, 3000],
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  const addHydrationEntry = () => {
    if (!newAmount || parseInt(newAmount) <= 0) return;

    const amount = parseInt(newAmount);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newEntry: HydrationEntry = {
      id: Date.now().toString(),
      amount,
      time: timeString,
      type: selectedType
    };

    setEntries(prev => [...prev, newEntry]);
    setTodayIntake(prev => prev + amount);
    setNewAmount('');
  };

  const progressPercentage = Math.min((todayIntake / dailyGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hydration Tracking
          </h1>
          <p className="text-xl text-gray-600">
            Stay properly hydrated for optimal performance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-blue-600" />
                Today's Goal
              </h3>
              
              {/* Progress Circle */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}
                    className="text-blue-500 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Droplets className="w-8 h-8 text-blue-500 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{todayIntake}ml</div>
                  <div className="text-sm text-gray-500">of {dailyGoal}ml</div>
                  <div className="text-lg font-semibold text-blue-600 mt-1">
                    {Math.round(progressPercentage)}%
                  </div>
                </div>
              </div>

              {/* Quick Add */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Quick Add</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[250, 500, 750, 1000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setTodayIntake(prev => prev + amount);
                        const now = new Date();
                        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const newEntry: HydrationEntry = {
                          id: Date.now().toString(),
                          amount,
                          time: timeString,
                          type: 'Water'
                        };
                        setEntries(prev => [...prev, newEntry]);
                      }}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      +{amount}ml
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add Custom Entry */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Add Custom Entry</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (ml)
                  </label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drink Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {drinkTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={addHydrationEntry}
                  className="w-full"
                  icon={<Plus className="w-4 h-4" />}
                >
                  Add Entry
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Today's Entries and Weekly Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Entries */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-green-600" />
                Today's Hydration Log
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Droplets className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{entry.amount}ml</div>
                        <div className="text-sm text-gray-500">{entry.type}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{entry.time}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ProgressChart
                type="bar"
                data={weeklyData}
                title="Weekly Hydration Progress"
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 4000,
                      ticks: {
                        callback: function(value: any) {
                          return value + 'ml';
                        }
                      }
                    }
                  }
                }}
              />
            </motion.div>

            {/* Hydration Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-blue-600" />
                Hydration Tips for Kenyan Athletes
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">
                      <strong>Pre-workout:</strong> Drink 500ml of water 2 hours before training
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">
                      <strong>During exercise:</strong> 150-250ml every 15-20 minutes
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">
                      <strong>Post-workout:</strong> 150% of fluid lost through sweat
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">
                      <strong>Hot climate:</strong> Increase intake by 500-750ml in Kenya's heat
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">
                      <strong>Natural electrolytes:</strong> Add coconut water or diluted fruit juice
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">
                      <strong>Monitor urine:</strong> Pale yellow indicates good hydration
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hydration Tracking Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Hydration Tracking Examples
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Example 1: Marathon Runner */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Marathon Runner"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Mary Wanjiku</h3>
                  <p className="text-sm text-gray-600">Marathon Runner - Training Day</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Daily Progress</span>
                  <span className="text-sm text-blue-600 font-semibold">4,200ml / 4,000ml</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ width: '105%' }}
                  ></div>
                </div>
                <p className="text-xs text-green-600 mt-1 font-medium">Goal exceeded! 🎉</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 text-sm">Today's Intake:</h4>
                {[
                  { time: '05:30', amount: 500, type: 'Water', note: 'Pre-run hydration' },
                  { time: '06:00', amount: 250, type: 'Sports Drink', note: 'During 21km run' },
                  { time: '06:30', amount: 250, type: 'Sports Drink', note: 'Mid-run refuel' },
                  { time: '07:00', amount: 300, type: 'Coconut Water', note: 'Post-run recovery' },
                  { time: '09:00', amount: 400, type: 'Water', note: 'Breakfast hydration' },
                  { time: '12:00', amount: 350, type: 'Water', note: 'Lunch time' },
                  { time: '15:30', amount: 300, type: 'Green Tea', note: 'Afternoon boost' },
                  { time: '18:00', amount: 400, type: 'Water', note: 'Dinner prep' },
                  { time: '20:30', amount: 250, type: 'Herbal Tea', note: 'Evening wind-down' },
                  { time: '22:00', amount: 200, type: 'Water', note: 'Before bed' }
                ].map((entry, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Droplets className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{entry.amount}ml</div>
                        <div className="text-xs text-gray-500">{entry.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{entry.time}</div>
                      <div className="text-xs text-gray-400">{entry.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example 2: Football Player */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Football Player"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">David Kiplagat</h3>
                  <p className="text-sm text-gray-600">Football Player - Match Day</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Daily Progress</span>
                  <span className="text-sm text-blue-600 font-semibold">3,750ml / 3,500ml</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ width: '107%' }}
                  ></div>
                </div>
                <p className="text-xs text-green-600 mt-1 font-medium">Excellent hydration! 💪</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 text-sm">Today's Intake:</h4>
                {[
                  { time: '06:00', amount: 400, type: 'Water', note: 'Morning hydration' },
                  { time: '08:00', amount: 300, type: 'Green Tea', note: 'With breakfast' },
                  { time: '10:30', amount: 500, type: 'Water', note: 'Pre-training' },
                  { time: '11:00', amount: 250, type: 'Sports Drink', note: 'During warm-up' },
                  { time: '12:00', amount: 300, type: 'Sports Drink', note: 'Half-time break' },
                  { time: '13:00', amount: 400, type: 'Coconut Water', note: 'Post-match recovery' },
                  { time: '15:00', amount: 350, type: 'Water', note: 'Lunch hydration' },
                  { time: '17:30', amount: 300, type: 'Fresh Juice', note: 'Afternoon snack' },
                  { time: '19:00', amount: 400, type: 'Water', note: 'Dinner time' },
                  { time: '21:00', amount: 250, type: 'Herbal Tea', note: 'Evening relaxation' },
                  { time: '22:30', amount: 300, type: 'Water', note: 'Before sleep' }
                ].map((entry, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Droplets className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{entry.amount}ml</div>
                        <div className="text-xs text-gray-500">{entry.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{entry.time}</div>
                      <div className="text-xs text-gray-400">{entry.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hydration;