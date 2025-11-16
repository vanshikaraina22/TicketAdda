# 🎬 Free Movie API Setup Guide

This guide explains how to set up free movie APIs to get real-time movie data with posters, ratings, duration, and more.

## 🌟 Recommended Free APIs

### 1. **TMDb (The Movie Database) API** ⭐ RECOMMENDED
- **Free Tier**: Yes, completely free
- **Rate Limit**: 40 requests per 10 seconds
- **Features**: 
  - Movie posters, ratings, duration, overview
  - Support for multiple languages
  - Large database (500,000+ movies)
  - High-quality images

**Setup Steps:**
1. Go to https://www.themoviedb.org/
2. Create a free account
3. Go to Settings → API
4. Request an API key (automatic approval)
5. Copy your API key
6. Add to `backend/.env`:
   ```
   TMDB_API_KEY=your_api_key_here
   ```

**API Endpoints Used:**
- `GET /discover/movie` - Discover movies by language/region
- `GET /movie/popular` - Get popular movies

---

### 2. **OMDb API (Open Movie Database)**
- **Free Tier**: Yes (1,000 requests/day)
- **Paid Tier**: $1/month for unlimited
- **Features**: 
  - Movie data from IMDb
  - Posters, ratings, plot
  - Simple REST API

**Setup Steps:**
1. Go to http://www.omdbapi.com/apikey.aspx
2. Choose "FREE" tier
3. Enter email and get API key
4. Add to `backend/.env`:
   ```
   OMDB_API_KEY=your_api_key_here
   ```

**Note**: OMDb requires movie titles/IMDb IDs, not language-based discovery.

---

### 3. **RapidAPI Movie Database**
- **Free Tier**: Limited requests
- **Multiple Providers**: Various movie APIs available
- **Setup**: Requires RapidAPI account

---

## 🚀 Current Implementation

The project is **already configured** to use **TMDb API**:

### How It Works:
1. Backend fetches movies from TMDb API
2. Transforms data to our format (title, duration, rating, poster)
3. Returns movies grouped by language
4. Falls back to hardcoded movies if API fails or no key provided

### Language Support:
- **English** (en) - US region
- **Hindi** (hi) - IN region  
- **Kannada** (kn) - IN region
- **Tamil** (ta) - IN region
- **Telugu** (te) - IN region

---

## 📝 Setup Instructions

### Step 1: Get TMDb API Key
1. Visit: https://www.themoviedb.org/signup
2. Create account and verify email
3. Go to: https://www.themoviedb.org/settings/api
4. Click "Request an API Key"
5. Select "Developer" option
6. Fill form (use "Educational" or "Personal" purpose)
7. Copy your API key

### Step 2: Configure Backend
1. Create `backend/.env` file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Add your API key:
   ```
   TMDB_API_KEY=your_actual_api_key_here
   PORT=5000
   ```

3. Restart backend server:
   ```bash
   npm start
   ```

### Step 3: Test API
The frontend will automatically fetch movies when you:
- Navigate to Movie Selection page
- Switch between languages

---

## 🔧 API Response Format

### Request:
```
GET /api/movies?language=English
```

### Response:
```json
{
  "movies": [
    {
      "id": 550988,
      "title": "Free Guy",
      "duration": "115 min",
      "rating": "7.2",
      "poster": "https://image.tmdb.org/t/p/w500/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
      "overview": "A bank teller discovers...",
      "releaseDate": "2021-08-11"
    }
  ],
  "source": "tmdb",
  "total": 1000
}
```

---

## 🛡️ Fallback System

If TMDb API:
- ❌ Not configured (no API key)
- ❌ Rate limit exceeded
- ❌ Network error
- ❌ Invalid response

The system automatically uses **fallback movies** (hardcoded list) so the app always works!

---

## 📊 API Limits & Best Practices

### TMDb Free Tier:
- ✅ 40 requests per 10 seconds
- ✅ Unlimited daily requests
- ✅ No credit card required

### Best Practices:
1. **Cache results** - Movies don't change frequently
2. **Load on demand** - Only fetch when language changes
3. **Handle errors gracefully** - Always have fallback
4. **Respect rate limits** - Don't spam API

---

## 🔄 Adding More Languages

To add more languages, update:

1. **Frontend** (`frontend/src/pages/MovieSelection.jsx`):
   ```javascript
   const languages = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Malayalam']
   ```

2. **Backend** (`backend/controllers/movieController.js`):
   ```javascript
   const languageRegionMap = {
     // ... existing languages
     'Malayalam': { language: 'ml', region: 'IN' },
   }
   ```

3. **Fallback Movies** (optional):
   Add fallback movies in `movieController.js`

---

## 🐛 Troubleshooting

### "No movies showing"
- Check browser console for errors
- Verify API key in `.env` file
- Check backend logs for API errors
- System will use fallback movies automatically

### "CORS errors"
- Ensure backend is running on port 5000
- Check `backend/server.js` has CORS enabled

### "Rate limit exceeded"
- Wait 10 seconds and try again
- Implement caching (movies cached per language)

---

## 📚 Additional Resources

- **TMDb API Docs**: https://developers.themoviedb.org/3
- **TMDb API Explorer**: https://developers.themoviedb.org/3/getting-started
- **Language Codes**: https://developers.themoviedb.org/3/getting-started/languages

---

## ✅ Quick Checklist

- [ ] Created TMDb account
- [ ] Got API key
- [ ] Added to `backend/.env`
- [ ] Restarted backend server
- [ ] Tested movie loading in frontend
- [ ] Verified posters are showing
- [ ] Checked ratings and duration display

---

**Note**: The app works perfectly without an API key using fallback data. Adding TMDb API key enables real-time movie data with thousands of movies!

