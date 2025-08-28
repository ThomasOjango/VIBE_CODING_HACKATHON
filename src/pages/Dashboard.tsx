import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Droplets, 
  Utensils, 
  Brain, 
  TrendingUp,
  Calendar,
  Target,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ProgressChart from '../components/Charts/ProgressChart';

const Dashboard = () => {
  const { userProfile } = useAuth();
  const { t } = useLanguage();
  const [todayStats, setTodayStats] = useState({
    calories: 1250,
    calorieGoal: 2200,
    water: 1800,
    waterGoal: 3000,
    workouts: 1,
    workoutGoal: 2,
  });

  const [weeklyData, setWeeklyData] = useState({
    calories: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Calories Consumed',
          data: [2100, 1950, 2300, 2000, 1800, 2400, 1250],
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          tension: 0.4,
        },
      ],
    },
    hydration: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Water Intake (ml)',
          data: [3200, 2800, 3500, 3000, 2600, 3800, 1800],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
        },
      ],
    },
    workouts: {
      labels: ['Strength', 'Cardio', 'Flexibility', 'Sports'],
      datasets: [
        {
          data: [4, 3, 2, 1],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(249, 115, 22, 0.8)',
          ],
        },
      ],
    },
  });

  const statCards = [
    {
      title: t('dashboard.calories'),
      current: todayStats.calories,
      goal: todayStats.calorieGoal,
      unit: 'kcal',
      icon: <Utensils className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: t('dashboard.water'),
      current: todayStats.water,
      goal: todayStats.waterGoal,
      unit: 'ml',
      icon: <Droplets className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: t('dashboard.workouts'),
      current: todayStats.workouts,
      goal: todayStats.workoutGoal,
      unit: 'sessions',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  const achievements = [
    {
      title: '7-Day Streak',
      description: 'Completed workouts for 7 consecutive days',
      icon: <Award className="w-6 h-6" />,
      earned: true,
    },
    {
      title: 'Hydration Hero',
      description: 'Met water intake goals for 30 days',
      icon: <Droplets className="w-6 h-6" />,
      earned: true,
    },
    {
      title: 'Nutrition Master',
      description: 'Tracked meals for 2 weeks straight',
      icon: <Utensils className="w-6 h-6" />,
      earned: false,
    },
    {
      title: 'Mental Wellness',
      description: 'Completed 5 mental health check-ins',
      icon: <Brain className="w-6 h-6" />,
      earned: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}, {userProfile?.full_name || 'User'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your health overview for today. Keep up the great work!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center ${stat.textColor}`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.current}
                    <span className="text-sm text-gray-500 ml-1">/ {stat.goal}</span>
                  </div>
                  <div className="text-sm text-gray-500">{stat.unit}</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{stat.title}</span>
                  <span>{Math.round((stat.current / stat.goal) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                    style={{ width: `${Math.min((stat.current / stat.goal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ProgressChart
              type="line"
              data={weeklyData.calories}
              title="Weekly Calorie Intake"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ProgressChart
              type="bar"
              data={weeklyData.hydration}
              title="Weekly Hydration"
            />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workout Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1"
          >
            <ProgressChart
              type="doughnut"
              data={weeklyData.workouts}
              title="Workout Types This Week"
            />
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                Achievements
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          achievement.earned
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <h4
                        className={`font-semibold ${
                          achievement.earned ? 'text-green-800' : 'text-gray-600'
                        }`}
                      >
                        {achievement.title}
                      </h4>
                    </div>
                    <p
                      className={`text-sm ${
                        achievement.earned ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Log Meal', icon: <Utensils className="w-5 h-5" />, href: '/nutrition' },
              { label: 'Track Workout', icon: <Activity className="w-5 h-5" />, href: '/workouts' },
              { label: 'Add Water', icon: <Droplets className="w-5 h-5" />, href: '/hydration' },
              { label: 'Mental Check-in', icon: <Brain className="w-5 h-5" />, href: '/mental-health' },
            ].map((action, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
              >
                <div className="text-gray-600 group-hover:text-green-600">
                  {action.icon}
                </div>
                <span className="font-medium text-gray-700 group-hover:text-green-700">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Fix missing import
import { Trophy } from 'lucide-react';

export default Dashboard;