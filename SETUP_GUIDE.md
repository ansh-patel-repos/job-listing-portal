# Job Portal - Complete Setup Guide

## Project Structure

```
job-listing-portal/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js       # MongoDB connection
│   │   │   └── oauth.js          # Google OAuth setup
│   │   ├── controllers/
│   │   │   └── authController.js # Auth logic
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT verification & RBAC
│   │   ├── models/
│   │   │   └── User.js           # User schema
│   │   ├── routes/
│   │   │   └── auth.js           # Auth endpoints
│   │   ├── utils/
│   │   │   ├── jwt.js            # JWT utilities
│   │   │   └── validators.js     # Input validation
│   │   └── index.js              # Server entry point
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── Frontend/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx    # Auth state management
    │   ├── services/
    │   │   └── api.js             # API client
    │   ├── utils/
    │   │   └── auth.js            # Auth utilities
    │   ├── pages/
    │   │   ├── Registration.jsx   # Sign up page
    │   │   ├── Login.jsx          # Sign in page
    │   │   ├── Dashboard.jsx      # Protected dashboard
    │   │   ├── AuthSuccess.jsx    # OAuth callback handler
    │   │   └── ErrorPage.jsx      # Error page
    │   ├── App.jsx                # Routes & providers
    │   └── main.jsx
    ├── .env.example
    ├── package.json
    └── vite.config.js
```

## Backend Setup

### 1. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the Backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/job_portal

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Session
SESSION_SECRET=your_session_secret_change_in_production
```

### 3. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized JavaScript origins:
     - `http://localhost:5000`
     - `http://localhost:5173`
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
5. Copy the Client ID and Client Secret to `.env`

### 4. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Then start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Copy connection string
4. Update `MONGODB_URI` in `.env`

### 5. Start Backend Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

## Frontend Setup

### 1. Install Frontend Dependencies

```bash
cd Frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### 3. Start Frontend Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## Features Implemented

### Backend Features

✅ **User Registration**
- Email validation
- Password hashing with bcrypt
- Role selection (Job Seeker / Employer)
- Duplicate email prevention

✅ **User Login**
- Email & password authentication
- JWT token generation
- Session management

✅ **Google OAuth 2.0**
- Google login integration
- Automatic user creation
- Account linking for existing users
- Profile picture sync

✅ **JWT Authentication**
- Token-based authentication
- Token refresh mechanism
- Automatic token expiration

✅ **Role-Based Access Control (RBAC)**
- Job Seeker role
- Employer role
- Role-specific middleware
- Protected routes

✅ **User Profile**
- Basic info (name, email, phone, location)
- Job Seeker specifics (skills, experience, resume)
- Employer specifics (company, company size, industry)
- Profile update endpoint

### Frontend Features

✅ **Authentication Pages**
- Modern registration page with role selection
- Login page with email/password
- Persistent login state
- Form validation with error messages

✅ **Protected Routes**
- Dashboard accessible only to authenticated users
- Auto-redirect based on authentication status
- Auth context for global state management

✅ **User Dashboard**
- Welcome message with user info
- Role-specific content
- User profile display
- Logout functionality

✅ **OAuth Integration**
- Google login button ready (via @react-oauth/google)
- OAuth callback handling
- Seamless account linking

---

## API Endpoints

### Public Endpoints

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "job_seeker" or "employer"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker"
  }
}
```

**Login User**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker"
  }
}
```

**Google OAuth Login**
```
GET /api/auth/google

Redirects to Google consent screen
```

**Google OAuth Callback**
```
GET /api/auth/google/callback?code=...

Redirects to:
http://localhost:5173/auth-success?token=jwt_token_here&role=job_seeker
```

### Protected Endpoints (Require JWT Token)

All protected routes require the Authorization header:
```
Authorization: Bearer <jwt_token>
```

**Get Current User**
```
GET /api/auth/me

Response:
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker",
    "avatar": "image_url",
    "profile": {...},
    "authProvider": "local" or "google",
    "createdAt": "2024-01-18T..."
  }
}
```

**Logout**
```
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logout successful"
}
```

**Update Profile**
```
PUT /api/auth/profile
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+1234567890",
  "location": "New York, USA",
  "bio": "Experienced developer",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": "5 years",
  "company": "Tech Corp",
  "companySize": "201-500",
  "industry": "Technology"
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {...}
}
```

**Refresh Token**
```
POST /api/auth/refresh

Response:
{
  "success": true,
  "message": "Token refreshed successfully",
  "token": "new_jwt_token"
}
```

---

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ("job_seeker" | "employer"),
  avatar: String,
  googleId: String (optional),
  isEmailVerified: Boolean,
  authProvider: String ("local" | "google"),
  profile: {
    bio: String,
    phone: String,
    location: String,
    // Job Seeker only
    skills: [String],
    experience: String,
    resume: String,
    // Employer only
    company: String,
    companySize: String,
    industry: String
  },
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Authentication Flow

### Registration Flow

```
1. User fills registration form
2. Frontend validates input
3. Sends POST /api/auth/register
4. Backend validates and creates user
5. Backend hashes password with bcrypt
6. Generates JWT token
7. Frontend stores token & user in localStorage
8. Redirects to dashboard
```

### Login Flow

```
1. User enters email & password
2. Frontend validates input
3. Sends POST /api/auth/login
4. Backend finds user by email
5. Compares password hash
6. Generates JWT token
7. Frontend stores token & user in localStorage
8. Redirects to dashboard
```

### Google OAuth Flow

```
1. User clicks "Login with Google"
2. Redirects to Google consent screen
3. User grants permission
4. Google redirects to /api/auth/google/callback
5. Backend receives user profile from Google
6. Creates or updates user in database
7. Generates JWT token
8. Redirects to frontend with token
9. Frontend stores token
10. Redirects to dashboard
```

### Protected Route Access

```
1. User navigates to /dashboard
2. Frontend checks if token exists
3. If no token: redirects to /login
4. If token: renders Dashboard
5. Dashboard makes API calls with JWT token
6. Backend verifies token in middleware
7. If invalid/expired: returns 401
8. Frontend redirects to /login
```

---

## Security Features

✅ Password Hashing
- Using bcrypt with 10 salt rounds
- Passwords never stored in plain text

✅ JWT Authentication
- Secure token-based authentication
- Token expiration (7 days by default)
- Signed with secret key

✅ CORS Protection
- Restricted to frontend origin
- Credentials allowed

✅ HTTP Security Headers
- Helmet.js middleware
- XSS protection
- Clickjacking protection

✅ Input Validation
- Email format validation
- Password strength validation
- Role validation

✅ Database Security
- MongoDB with authentication
- Unique email index
- Data type validation

---

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongoDB connection error`

**Solutions**:
1. Ensure MongoDB is running: `mongod`
2. Check `MONGODB_URI` in `.env`
3. Verify MongoDB is installed
4. Check network connectivity

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Update `FRONTEND_URL` in Backend `.env`
2. Ensure frontend URL matches exactly
3. Check CORS middleware in `index.js`

### Google OAuth Issues

**Error**: `Invalid OAuth Client`

**Solutions**:
1. Verify Client ID and Secret in `.env`
2. Check callback URL in Google Cloud Console
3. Ensure redirect URI matches exactly
4. Verify authorized origins

### Token Expiration

**Error**: `Invalid or expired token`

**Solutions**:
1. Call `/api/auth/refresh` to get new token
2. Re-login to get fresh token
3. Check token expiration time in `.env`

---

## Next Steps

### Recommended Additions

1. **Email Verification**
   - Send verification emails
   - Verify email before account activation

2. **Password Reset**
   - Forgot password endpoint
   - Reset token generation
   - Email verification

3. **Two-Factor Authentication**
   - SMS/Email OTP
   - Authenticator app support

4. **Role-Specific Features**
   - Job listings for employers
   - Job applications for job seekers
   - Profile views and search

5. **Rate Limiting**
   - Prevent brute force attacks
   - Limit API requests per user

6. **Logging & Monitoring**
   - Request logging
   - Error tracking
   - User activity logging

7. **File Upload**
   - Resume upload for job seekers
   - Profile picture upload
   - Company logo upload

---

## Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Update `.env` with production values
2. Set `NODE_ENV=production`
3. Use production database URI
4. Deploy with git push

### Frontend Deployment (Vercel, Netlify)

1. Update `VITE_API_BASE_URL` to production API
2. Run `npm run build`
3. Deploy `dist/` folder

---

## Support

For issues or questions, please refer to the individual README files:
- Backend: `/Backend/README.md`
- Frontend: `/Frontend/README.md`
