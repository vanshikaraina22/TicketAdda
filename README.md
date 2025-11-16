# 🎬 AI Movie Ticket Booking System

A complete production-ready AI-powered movie ticket booking system with a Netflix-like UI, built with React, Tailwind CSS, and Node.js.

## ✨ Features

- **User Authentication**: Login with name, phone, and email validation
- **Location Selection**: Choose from 8 major Indian cities with beautiful city cards
- **Movie Selection**: Browse movies by language (English, Hindi, Kannada, Tamil, Telugu)
- **AI Chatbot**: Get personalized movie recommendations via AI-powered chat assistant
- **Seat Booking**: Interactive seat selection with real-time price calculation
- **Booking Confirmation**: Beautiful confirmation page with confetti animation
- **Netflix-like UI**: Modern, responsive design with smooth animations and glow effects

## 🚀 Tech Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS
- React Router
- canvas-confetti
- LocalStorage for session persistence

### Backend
- Node.js + Express
- OpenAI API integration (optional - falls back to mock AI)
- TMDb API integration (optional - falls back to hardcoded movies)
- CORS enabled

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend will run on `http://localhost:5000`

### Optional: API Setup

1. Copy `.env.example` to `.env` in the backend directory:
```bash
cd backend
cp .env.example .env
```

2. Add your API keys to `.env`:
```
# OpenAI API (for AI chatbot - optional)
OPENAI_API_KEY=your_openai_api_key_here

# TMDb API (for real movie data - optional but recommended)
# Get free key from: https://www.themoviedb.org/settings/api
TMDB_API_KEY=your_tmdb_api_key_here
```

**Note**: 
- The system works without OpenAI API key - it uses a smart mock AI recommender
- The system works without TMDb API key - it uses fallback movie data
- See `API_SETUP.md` for detailed setup instructions

## 🎯 Usage Flow

1. **Login** → Enter name, phone, and email
2. **Select Location** → Choose your city
3. **Browse Movies** → Filter by language, use AI chatbot for recommendations
4. **Select Seats** → Choose seats from the interactive grid
5. **Confirm Booking** → View confirmation with booking ID

## 📁 Project Structure

```
project/
 ├─ frontend/
 │   ├─ src/
 │   │   ├─ pages/
 │   │   │   ├─ Login.jsx
 │   │   │   ├─ LocationSelection.jsx
 │   │   │   ├─ MovieSelection.jsx
 │   │   │   ├─ SeatBooking.jsx
 │   │   │   └─ BookingConfirmation.jsx
 │   │   ├─ components/
 │   │   │   └─ AIChatbot.jsx
 │   │   ├─ App.jsx
 │   │   └─ main.jsx
 │   ├─ package.json
 │   └─ vite.config.js
 │
 └─ backend/
     ├─ server.js
     ├─ routes/
     │    └─ chat.js
     └─ controllers/
          └─ chatController.js
```

## 🎨 Features in Detail

### Login Page
- Form validation for name, phone (10 digits), and email
- Smooth animations and error handling
- Data persisted in LocalStorage

### Location Selection
- 8 cities: Chandigarh, Delhi, Gurgaon, Pune, Mumbai, Bangalore, Mysore, Chennai
- Each city card shows icon and monument
- Hover effects and selection glow

### Movie Selection
- Movies organized by language
- Each movie shows poster, title, duration, and rating
- Hover zoom effect on posters
- AI Chatbot sidebar for recommendations

### AI Chatbot
- Real-time chat interface
- Calls `/api/chat` endpoint
- Provides movie recommendations
- Clickable recommendation buttons

### Seat Booking
- Interactive grid (A-H rows, 6 seats per row)
- Visual seat selection with glow effects
- Real-time price calculation (₹120 per seat)
- Total amount display

### Booking Confirmation
- Displays booking ID, movie details, seats, and amount
- Confetti animation on load
- Glow animation around confirmation card
- Options to book another or change location

## 🔧 API Endpoints

### POST `/api/chat`
Request:
```json
{
  "message": "suggest an action movie"
}
```

Response:
```json
{
  "reply": "Here are some good action movies...",
  "recommendations": ["Movie 1", "Movie 2"]
}
```

## 🎭 Customization

- **Movies**: Edit the `movies` object in `frontend/src/pages/MovieSelection.jsx`
- **Cities**: Modify the `cities` array in `frontend/src/pages/LocationSelection.jsx`
- **Seat Price**: Change `seatPrice` constant in `frontend/src/pages/SeatBooking.jsx`
- **Colors**: Update Tailwind config in `frontend/tailwind.config.js`

## 📝 Notes

- All data is stored in browser LocalStorage (no database required for demo)
- Movie data can come from TMDb API (real-time) or fallback data
- The system works offline for the frontend once loaded
- Backend requires internet only for API calls (OpenAI/TMDb if enabled)
- See `API_SETUP.md` for free movie API setup guide

## 🚀 Production Deployment

For production:
1. Build frontend: `cd frontend && npm run build`
2. Serve backend with process manager (PM2, etc.)
3. Configure environment variables
4. Set up proper CORS for your domain

## 📄 License

MIT License - Feel free to use this project for learning and development!

---

**Built with ❤️ for movie lovers**

