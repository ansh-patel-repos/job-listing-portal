# Quick Start Guide

## Prerequisites
- Node.js 14+ installed
- MongoDB (local or Atlas)
- Google account (for OAuth setup)

---

## Backend Setup (5 minutes)

```bash
# 1. Navigate to backend
cd Backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env and add:
# - MONGODB_URI (your MongoDB connection)
# - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
# - Other credentials

# 5. Start development server
npm run dev
```

**Backend ready at:** http://localhost:5000

---

## Frontend Setup (3 minutes)

```bash
# 1. Navigate to frontend
cd Frontend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Start development server
npm run dev
```

**Frontend ready at:** http://localhost:5173

---

## Features Available Now

### 👤 Authentication
- ✅ Email/Password registration
- ✅ Email/Password login
- ✅ Google OAuth 2.0
- ✅ JWT token management
- ✅ Auto logout on expired token

### 🔐 Authorization
- ✅ Role-based access control (Job Seeker / Employer)
- ✅ Protected routes
- ✅ Role-specific content on dashboard

### 📊 User Management
- ✅ User registration
- ✅ User login
- ✅ User profile viewing
- ✅ User profile updating
- ✅ User logout

---

## Test the System

### 1. Test Registration
1. Go to http://localhost:5173
2. Fill form with:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Role: Job Seeker or Employer
3. Click Register
4. Should redirect to dashboard

### 2. Test Login
1. Go to http://localhost:5173/login
2. Enter your credentials
3. Click Login
4. Should redirect to dashboard

### 3. Test Protected Route
1. Try accessing http://localhost:5173/dashboard without token
2. Should redirect to login page

### 4. Test Logout
1. Click Logout on dashboard
2. Should redirect to login page
3. Token removed from localStorage

---

## Google OAuth Setup

### Get Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 ID
5. Configure:
   - Authorized JavaScript origins: `http://localhost:5000`, `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Secret

### Add to Backend

```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### Test OAuth

When frontend is ready with Google button:
1. Click "Login with Google"
2. Choose Google account
3. Should redirect to dashboard

---

## File Locations

### Backend Files
- Controllers: `Backend/src/controllers/authController.js`
- Routes: `Backend/src/routes/auth.js`
- Models: `Backend/src/models/User.js`
- Middleware: `Backend/src/middleware/auth.js`
- Config: `Backend/src/config/`

### Frontend Files
- Auth Context: `Frontend/src/context/AuthContext.jsx`
- API Service: `Frontend/src/services/api.js`
- Pages: `Frontend/src/pages/`
- App Routes: `Frontend/src/App.jsx`

---

## Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
mongod

# Check port 5000 is free
# or change PORT in .env
```

### Frontend API errors
- Check `VITE_API_BASE_URL` in `.env`
- Ensure backend is running
- Check CORS in backend `index.js`

### Google OAuth not working
- Verify Client ID/Secret in `.env`
- Check callback URL matches in Google Console
- Verify authorized origins are correct

### MongoDB connection error
- Start MongoDB: `mongod`
- Or use MongoDB Atlas and update connection string

---

## Next Steps

1. ✅ **System is ready!** Register and login to test

2. **Add Google OAuth button** - Implement in Registration.jsx/Login.jsx
   ```jsx
   import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
   ```

3. **Add Job Listings** - Create jobs collection and endpoints

4. **Add Job Search** - Filter and search functionality

5. **Add User Profiles** - Extend profile update features

6. **Add Notifications** - Real-time updates

---

## Useful Commands

### Backend
```bash
# Development
npm run dev

# Production
npm start

# Install packages
npm install <package-name>
```

### Frontend
```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

## Environment Variables Checklist

### Backend (.env)
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET
- [ ] GOOGLE_CALLBACK_URL
- [ ] FRONTEND_URL
- [ ] SESSION_SECRET

### Frontend (.env)
- [ ] VITE_API_BASE_URL
- [ ] VITE_GOOGLE_CLIENT_ID (optional for later)

---

## Default Ports
- Backend API: http://localhost:5000
- Frontend: http://localhost:5173
- MongoDB: localhost:27017

---

## Architecture

```
Client Browser
    ↓
Frontend (React)
    ↓ (HTTP)
Backend API (Express)
    ↓ (Mongoose)
MongoDB
```

### Auth Flow
```
User Registration/Login
    ↓
Form Submission
    ↓
API Call with axios
    ↓
Backend Validation & Processing
    ↓
JWT Token Generation
    ↓
Frontend Stores Token
    ↓
Protected Routes Accessible
    ↓
Dashboard Displayed
```

---

## Security Notes

⚠️ **Development only:**
- Secrets in `.env` are for development
- Change all secrets before production
- Enable HTTPS in production
- Use environment variable management service

---

**Ready to go!** 🚀

For detailed documentation, see:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- [Backend/README.md](./Backend/README.md)
