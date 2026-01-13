# Quick Start: Light Mode & Backend Migration

## What's New

### 1. ✅ Light Mode Improvements
- Fixed contrast issues in light mode
- All text is now readable in both light and dark themes
- Updated colors for cards, buttons, and backgrounds
- Smooth transitions between themes

### 2. ✅ Backend Infrastructure Ready
- Node.js/Express server setup
- MongoDB database integration  
- JWT authentication
- RESTful API endpoints
- Migration guide included

---

## How to Set Up the Backend

### Step 1: Install MongoDB

**Option A: Local (Easiest for testing)**
```bash
# Download and install from: https://www.mongodb.com/try/download/community
# Start MongoDB service (it runs automatically on Windows)
```

**Option B: MongoDB Atlas (Cloud - Recommended for production)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Copy connection string
4. Add to `backend/.env` as `MONGODB_URI`

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Start Backend Server

```bash
cd backend
npm run dev
```

You'll see: `Server running on http://localhost:5000`

### Step 4: Update Frontend API URL (if needed)

Create `.env` in root folder:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Or for production, update to your deployed backend URL.

### Step 5: Test the Backend

```bash
# Initialize database
curl -X POST http://localhost:5000/api/initialize

# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","fullName":"Test User"}'
```

---

## How to Switch to API Backend

The system currently still uses localStorage as fallback. To fully migrate:

1. **In `src/App.js`**, change imports from:
   ```javascript
   import { authService, entryService } from './services/backend';
   ```
   
   To:
   ```javascript
   import { authService, entryService, giveawayService } from './services/backendAPI';
   ```

2. **The app will automatically detect the backend** and use the API instead of localStorage

3. **If backend is down**, it gracefully falls back to cached data

---

## Backend API Endpoints

### Authentication
```
POST   /api/auth/signup           - Register user
POST   /api/auth/login            - Login user
GET    /api/auth/me               - Get current user (needs token)
PUT    /api/auth/profile          - Update profile (needs token)
```

### Giveaways
```
GET    /api/giveaways             - Get all giveaways
```

### Entries
```
POST   /api/entries               - Enter giveaway (needs token)
GET    /api/entries               - Get user entries (needs token)
```

---

## Deploying Backend to Production

### Option 1: Heroku (Recommended)
```bash
# Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
heroku login
cd backend
heroku create your-app-name
heroku addons:create mongolab:sandbox
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: Railway
1. Go to https://railway.app
2. Connect GitHub repo
3. Deploy main branch
4. Add MongoDB addon
5. Set environment variables

### Option 3: Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub
4. Add MongoDB Atlas connection string

---

## File Structure

```
luxury-giveaway/
├── src/
│   ├── services/
│   │   ├── backend.js          (OLD - localStorage)
│   │   └── backendAPI.js       (NEW - API client)
│   ├── App.js                  (Light mode fixes)
│   └── components/
├── backend/
│   ├── server.js               (Express API server)
│   ├── package.json            (Dependencies)
│   └── .env                    (Configuration)
├── BACKEND_MIGRATION.md        (Detailed guide)
└── BUILD_SUMMARY.md
```

---

## Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongod`
- Check port 5000 is free
- Verify `backend/.env` exists

### CORS errors
- Backend already allows localhost:3000 and localhost:5000
- Update `server.js` CORS for production URLs

### Login not working
- Ensure JWT_SECRET is set in `.env`
- Clear browser localStorage
- Check network tab in browser dev tools

### No entries saving
- Confirm MongoDB is connected
- Check backend console for errors
- Verify token is being sent in requests

---

## Next Steps

1. ✅ Light mode is ready - test it out!
2. ⏳ Set up MongoDB (local or cloud)
3. ⏳ Run backend server
4. ⏳ Update frontend to use API (switch imports)
5. ⏳ Deploy backend to production
6. ⏳ Update frontend API URL
7. ⏳ Redeploy frontend to Vercel

---

## Support

Check `BACKEND_MIGRATION.md` for detailed documentation and troubleshooting steps.
