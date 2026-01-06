# Quick Setup & Usage Guide

## 🎬 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```
The app will open at `http://localhost:3001`

### 3. Login with Demo Account
- **Email**: `demo@example.com`
- **Password**: `demo123`
- Or click "Auto-fill Demo Credentials" button

## 🎯 Features Overview

### Dashboard
- Overview of your stats (entries, winnings, available giveaways)
- Featured giveaways carousel
- Quick entry buttons

### Giveaways Tab
- Browse all available giveaways
- View prize amounts and participant counts
- Enter any giveaway with one click
- Visual indicator when you've already entered

### Portfolio Tab
- View all your entries at a glance
- See entry statistics
- Track giveaway information
- Participant counts

### My Entries Tab
- Card-based view of giveaways you've entered
- Your win probability percentage for each
- Total participants
- Draw dates

### Account Tab
- View your profile information
- Check verification status
- View your statistics
- Logout

## 🛠️ Behind the Scenes

### Backend Service (`src/services/backend.js`)
The app uses a **localStorage-based backend** that provides:
- User authentication (signup/login/logout)
- Giveaway management
- Entry tracking
- Transaction logging
- Winner management

All data persists in your browser's localStorage automatically.

### Demo Data
The app comes pre-loaded with:
- 5 Premium giveaways
- Demo user account
- Sample entry data (populate by entering giveaways)

## 📱 Responsive Design

- **Mobile**: Full responsive layout with collapsible sidebar
- **Tablet**: Optimized grid layouts
- **Desktop**: Full sidebar visible, multi-column grids

Toggle sidebar on mobile with the ☰ menu button in the header.

## 🔐 Account Management

### Create New Account
1. On login page, click "Sign Up"
2. Enter your full name, email, and password (min 6 characters)
3. Click "Create Account"
4. You're automatically logged in

### Logout
- Click logout button in header
- Or click "Logout" in sidebar footer
- Or go to Account tab and click "Logout"

## 💾 Data Storage

All your data is stored locally in your browser:
- User accounts
- Giveaway entries
- Transaction history
- Winner information

**No server needed** - everything works offline!

## 🎮 Testing the App

### Test Entry System
1. Go to Giveaways tab
2. Click "Enter" on any giveaway
3. Button changes to "Entered" (green)
4. Entry count increases
5. Giveaway appears in "My Entries" tab

### Test Account Creation
1. Click "Sign Up" on login page
2. Create account with:
   - Name: Your name
   - Email: any@email.com
   - Password: anything123
3. Account is created and you're logged in

### Test Sidebar
1. On mobile/tablet, click ☰ in header
2. Sidebar slides in from left
3. Click a menu item (automatically closes on mobile)
4. Toggle again to see it slide out

## ❓ Frequently Asked Questions

**Q: Where is my data saved?**
A: In your browser's localStorage. Clear your browser data and it's gone.

**Q: Can I export my data?**
A: Open browser DevTools → Application → Local Storage and export the values.

**Q: How many giveaways can I enter?**
A: All of them! One entry per giveaway per user.

**Q: Will I actually win something?**
A: This is a demo with no real prizes. The winner selection is not implemented yet.

**Q: What happens if I clear my browser data?**
A: All accounts and entries will be deleted. App will reset to initial state.

**Q: Can I change my password?**
A: Not in this version. Feature coming soon!

**Q: Is my password secure?**
A: No - passwords are base64 encoded for demo only. Never use real passwords in demo apps!

## 🚀 Next Steps

You can now:
1. **Test the login system** with the demo account
2. **Browse and enter giveaways** to test the entry system
3. **Check out each section** to explore all features
4. **Create new accounts** to test signup
5. **Review the code** in `src/services/backend.js` to understand the data flow

## 📞 Support

If you encounter any issues:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart the dev server (Ctrl+C, then npm start)
3. Check browser console for errors (F12)
4. Make sure you're using the correct demo credentials

---

**Happy testing!** 🎉
