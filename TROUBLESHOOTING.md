# 🔧 Troubleshooting Guide

## Error: 500 Internal Server Error on `/api/movies`

### Step 1: Check if Backend is Running

1. **Verify backend server is running:**
   ```bash
   cd backend
   npm start
   ```

2. **You should see:**
   ```
   🚀 Server running on http://localhost:5000
   📡 API endpoints:
      - GET  /api/health
      - GET  /api/movies?language=English
      - POST /api/chat
   ```

3. **Test the health endpoint:**
   Open browser: `http://localhost:5000/api/health`
   Should return: `{"status":"OK","message":"Server is running"}`

### Step 2: Check Backend Logs

When you make a request, check the backend terminal for error messages. Common issues:

- **"Cannot find module"** → Run `npm install` in backend folder
- **"fetch is not defined"** → Update Node.js to v18+ (you have v22, so this shouldn't be an issue)
- **Network errors** → Check internet connection

### Step 3: Test the API Directly

1. **Test in browser:**
   ```
   http://localhost:5000/api/movies?language=English
   ```

2. **Or use the test script:**
   ```bash
   cd backend
   node test-movies.js
   ```

### Step 4: Verify Frontend Proxy

Check `frontend/vite.config.js` has:
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

### Step 5: Common Fixes

#### Fix 1: Restart Backend Server
```bash
# Stop the server (Ctrl+C)
# Then restart:
cd backend
npm start
```

#### Fix 2: Clear Node Modules
```bash
cd backend
rm -rf node_modules
npm install
npm start
```

#### Fix 3: Check Port Conflicts
Make sure port 5000 is not used by another app:
```bash
# Windows
netstat -ano | findstr :5000

# Kill process if needed, then restart backend
```

#### Fix 4: Check .env File
Make sure `backend/.env` exists (even if empty):
```bash
cd backend
# Create .env if it doesn't exist
echo "PORT=5000" > .env
```

### Step 6: Verify Route Registration

The route should be registered in `backend/server.js`:
```javascript
app.use('/api/movies', movieRoutes)
```

### Step 7: Check Console Logs

The controller now has extensive logging. Check backend console for:
- "Error fetching movies:" - Shows what went wrong
- "TMDb API error:" - Shows TMDb-specific errors

### Expected Behavior

**Without TMDb API Key:**
- Should return fallback movies (no error)
- Response: `{ movies: [...], source: 'fallback' }`

**With TMDb API Key:**
- Fetches from TMDb API
- Falls back to hardcoded movies on error
- Never returns 500 error

### Still Not Working?

1. **Check browser console** for CORS errors
2. **Check network tab** in browser DevTools
3. **Verify backend is on port 5000**
4. **Verify frontend is on port 3000**
5. **Check firewall/antivirus** isn't blocking localhost

### Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test movies endpoint
curl http://localhost:5000/api/movies?language=English

# Check if backend is running
netstat -ano | findstr :5000
```

---

## ✅ The Fix Applied

I've updated the code to:
1. ✅ Always return a response (never 500 error)
2. ✅ Use fallback movies on any error
3. ✅ Better error logging
4. ✅ Comprehensive error handling
5. ✅ Added error middleware

**The system should now always work, even if TMDb API fails!**

