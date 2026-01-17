# Job Listing Portal Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the Backend directory with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/job_portal

# JWT
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Session
SESSION_SECRET=your_session_secret_here_change_in_production
```

### 3. Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Set Authorized redirect URIs to: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

### 4. MongoDB Setup
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in `.env`

### 5. Run Development Server
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh JWT token

### Protected Routes
All routes require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── oauth.js
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Role.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── routes/
│   │   └── auth.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── validators.js
│   └── index.js
├── .env
└── package.json
```

## Features

- ✅ User Registration with role selection (Job Seeker / Employer)
- ✅ JWT-based Authentication
- ✅ Google OAuth 2.0 Integration
- ✅ Role-Based Access Control
- ✅ Password Hashing with bcrypt
- ✅ Email validation
- ✅ Secure HTTP headers with Helmet
- ✅ CORS support

## Role Types
- **Job Seeker**: User looking for job opportunities
- **Employer**: User hiring candidates

## Security Features
- JWT token expiration
- Password hashing with bcrypt
- CORS protection
- HTTP headers security with Helmet
- Input validation and sanitization
- Secure cookie handling
