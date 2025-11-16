# 🚀 Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- npm or yarn

## Setup Steps

### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 2. Install Backend Dependencies
```bash
cd ../backend
npm install
```

### 3. (Optional) Configure OpenAI API
If you want to use real OpenAI API:
1. Create a `.env` file in the `backend` directory
2. Add: `OPENAI_API_KEY=your_api_key_here`
3. If you skip this, the system will use a smart mock AI recommender

### 4. Start Backend Server
```bash
cd backend
npm start
```
Server runs on `http://localhost:5000`

### 5. Start Frontend (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:3000`

## Usage
1. Open `http://localhost:3000` in your browser
2. Fill in the login form
3. Select your city
4. Browse movies and chat with AI assistant
5. Select seats and complete booking!

## Troubleshooting

### Port Already in Use
- Frontend: Change port in `frontend/vite.config.js`
- Backend: Set `PORT=5001` in `backend/.env`

### CORS Errors
- Ensure backend is running before frontend
- Check that backend is on port 5000

### OpenAI API Issues
- The system works without OpenAI API key
- Mock AI will handle all requests if API key is missing

## Development Mode
- Frontend: `npm run dev` (auto-reloads on changes)
- Backend: `npm run dev` (if using node --watch) or `npm start`

