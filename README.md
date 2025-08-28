# Better Life - Health and Dietary App for Kenyan Athletes

A comprehensive health and fitness application designed specifically for Kenyan athletes and sports enthusiasts, featuring AI-powered nutrition advice, mental health support, and expert consultations.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure login/signup with Supabase
- **Multilingual Support**: English and Swahili language options
- **Responsive Design**: Optimized for all device sizes
- **Kenyan Localization**: Tailored content for Kenyan athletes

### Health Tracking
- **Nutrition Tracking**: Log meals, track calories, and monitor macronutrients
- **Workout Management**: Record exercises, duration, and intensity
- **Hydration Monitoring**: Track daily water intake with visual goals
- **Progress Analytics**: Interactive charts showing health trends

### AI-Powered Features
- **Smart Diet Advice**: AI-powered nutrition recommendations using Hugging Face API
- **Mental Health Support**: Emotional wellness assistance with AI chatbot
- **Personalized Insights**: Tailored recommendations based on user profile

### Expert Services
- **Nutrition Experts**: Connect with verified nutritionists
- **Mental Health Professionals**: Access to qualified mental health experts
- **Expert Matching**: Choose professionals based on specialization and ratings

### Data Visualization
- **Interactive Charts**: Progress tracking with Chart.js
- **Achievement System**: Gamified health goals and milestones
- **Real-time Statistics**: Live updates of daily health metrics

## 🚀 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animation**: Framer Motion for smooth interactions
- **Charts**: Chart.js with React integration
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: Hugging Face Inference API
- **Form Handling**: React Hook Form with Yup validation
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Charts/         # Data visualization components
│   ├── Layout/         # Navigation and layout components
│   └── UI/             # Generic UI components
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state management
│   └── LanguageContext.tsx # Multi-language support
├── lib/                # Utility libraries
│   ├── supabase.ts     # Supabase client configuration
│   └── ai.ts           # AI service integration
├── pages/              # Application pages
│   ├── Home.tsx        # Landing page
│   └── Dashboard.tsx   # Main dashboard
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Supabase account
- Hugging Face account (for AI features)

### Environment Configuration

1. **Create Environment File**:
   ```bash
   cp .env.example .env
   ```

2. **Configure Supabase**:
   - Create a new Supabase project
   - Add your project URL and anon key to `.env`
   - Set up the required database tables (see Database Schema below)

3. **Configure AI Features**:
   - Sign up for Hugging Face
   - Generate an API token
   - Add your token to `.env`

4. **Install Dependencies**:
   ```bash
   npm install
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Database Schema

The application requires the following Supabase tables:

```sql
-- User profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT NOT NULL,
  age INTEGER,
  weight DECIMAL,
  height DECIMAL,
  activity_level TEXT,
  goals TEXT[],
  language TEXT DEFAULT 'en',
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meal tracking
CREATE TABLE meal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  meal_type TEXT NOT NULL,
  food_items JSONB NOT NULL,
  date DATE NOT NULL,
  calories INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workout tracking
CREATE TABLE workout_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  exercise_type TEXT NOT NULL,
  duration INTEGER NOT NULL,
  intensity TEXT,
  calories_burned INTEGER,
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hydration tracking
CREATE TABLE hydration_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  amount INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expert profiles
CREATE TABLE experts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT,
  experience TEXT,
  languages TEXT[],
  rating DECIMAL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  expert_id UUID REFERENCES experts,
  message TEXT NOT NULL,
  response TEXT,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🌍 Localization

The app supports both English and Swahili languages with context-aware translations for Kenyan users. Key features include:

- Dynamic language switching
- Cultural adaptation of content
- Local food database integration
- Region-specific health recommendations

## 🔐 Security Features

- **Row Level Security**: Supabase RLS policies protect user data
- **Secure Authentication**: Email/password with proper validation
- **API Key Protection**: Environment variables for sensitive tokens
- **Data Encryption**: All data encrypted at rest and in transit

## 🚀 Deployment

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Deploy to Hosting Service**:
   - Vercel (recommended)
   - Netlify
   - Firebase Hosting

3. **Configure Environment Variables**:
   - Set production environment variables on your hosting platform
   - Ensure Supabase URLs are configured for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@betterlife-app.com
- Community Discord: [Join our community]

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Basic authentication and user profiles
- [x] Dashboard with health statistics
- [x] Multilingual support (EN/SW)
- [x] Responsive design

### Phase 2 (Upcoming)
- [ ] Complete nutrition tracking system
- [ ] Advanced workout planning
- [ ] Expert consultation booking
- [ ] Real-time chat with AI and experts
- [ ] Mobile app development

### Phase 3 (Future)
- [ ] Community features and social sharing
- [ ] Wearable device integration
- [ ] Advanced AI recommendations
- [ ] Offline mode support

---

Built with ❤️ for the Kenyan athletic community