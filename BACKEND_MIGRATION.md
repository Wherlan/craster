# Backend Migration Guide

This document provides instructions for migrating from localStorage to a real backend (MongoDB + Node.js/Express).

## Architecture Overview

- **Frontend**: React app (existing)
- **Backend**: Node.js/Express API server
- **Database**: MongoDB
- **Authentication**: JWT tokens

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# Then start the MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/luxury-giveaway`
5. Update `.env` file with your connection string

### Step 3: Configure Environment Variables

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luxury-giveaway
JWT_SECRET=change-this-to-a-strong-random-key
NODE_ENV=development
```

### Step 4: Start the Backend Server

```bash
cd backend
npm run dev  # For development with nodemon
# OR
npm start    # For production
```

The server will run on `http://localhost:5000`

### Step 5: Update Frontend Configuration

Create or update `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Or for production:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Step 6: Update Frontend Service Imports

Replace imports in `src/App.js`:
```javascript
// OLD
import { authService, entryService } from './services/backend';

// NEW
import { authService, entryService, giveawayService } from './services/backendAPI';
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)

### Giveaways
- `GET /api/giveaways` - Get all giveaways

### Entries
- `POST /api/entries` - Enter a giveaway (requires token)
- `GET /api/entries` - Get user's entries (requires token)

## Migration Steps

1. **Backup Data**: Export localStorage data before migration
2. **Install Backend**: Follow setup steps above
3. **Update Frontend**: Use new `backendAPI.js` service
4. **Test Locally**: Run frontend and backend locally
5. **Deploy Backend**: Deploy to production server (Heroku, Railway, etc.)
6. **Update Frontend**: Point to production API URL
7. **Deploy Frontend**: Redeploy to Vercel

## Deployment Options

### Backend Hosting
- **Heroku** (easiest for Node.js)
- **Railway** (modern alternative)
- **Render** (good free tier)
- **AWS EC2** (more control, costs)
- **DigitalOcean** (affordable)

### Database Hosting
- **MongoDB Atlas** (cloud, recommended)
- **Your own server**

## Example: Deploy to Heroku

```bash
cd backend
heroku create your-app-name
heroku addons:create mongolab:sandbox
git push heroku main
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, whitelist your IP address

### "CORS errors"
- Backend CORS is already configured for `http://localhost:3000`
- Update CORS origins in `server.js` for production

### "401 Unauthorized"
- Ensure JWT token is being sent in Authorization header
- Check JWT_SECRET is same on backend

## Data Migration Script (Optional)

If you need to migrate existing localStorage data:

```javascript
// In your frontend, run in browser console
const users = JSON.parse(localStorage.getItem('giveaway_users'));
const entries = JSON.parse(localStorage.getItem('giveaway_entries'));

// POST this data to your backend migration endpoint
fetch('http://localhost:5000/api/migrate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ users, entries })
});
```

## Security Notes

- Change JWT_SECRET in production
- Use HTTPS in production
- Don't commit `.env` files
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add input validation and sanitization
- Use HTTPS/SSL certificates

## Next Steps

1. Set up automated backups for MongoDB
2. Implement error logging (Sentry)
3. Add monitoring (New Relic, Datadog)
4. Set up CI/CD pipeline
5. Add more API endpoints as needed
6. Implement admin dashboard for giveaway management
