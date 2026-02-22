# Google OAuth Integration Setup Guide

## 📋 Prerequisites

Before you begin, make sure you have:
- Google Cloud Console access
- Node.js and pnpm installed
- Python 3.x installed
- Virtual environment set up

---

## 🔐 Step 1: Set Up Google Cloud Project

### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter a project name (e.g., "Student Performance Predictor")
5. Click "CREATE"

### 1.2 Enable Google+ API (or Google Identity Services)
1. In your project, go to **APIs & Services** > **Library**
2. Search for "Google+ API" or "Google Identity"
3. Click on it and click **ENABLE**

### 1.3 Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in app name: "Student Performance Predictor"
   - Add your email as support email
   - Add your email under Developer contact information
   - Click "SAVE AND CONTINUE" through the rest
4. Back in Create OAuth client ID:
   - Application type: **Web application**
   - Name: "Student Performance Web Client"
   
5. **Authorized JavaScript origins:**
   ```
   http://localhost:5173
   http://127.0.0.1:5173
   http://localhost:3000
   ```

6. **Authorized redirect URIs:**
   ```
   http://localhost:5173
   http://127.0.0.1:5173
   http://localhost:8000/api/auth/google/callback
   ```

7. Click **CREATE**
8. **IMPORTANT:** Copy the **Client ID** and **Client Secret**

---

## ⚙️ Step 2: Configure Backend (.env file)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Open the `.env` file and update with your credentials:
   ```env
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=YOUR_ACTUAL_CLIENT_SECRET
   
   # JWT Configuration (generate a random secret key)
   JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-to-random-string
   
   # Django Settings
   SECRET_KEY=django-insecure-change-this-in-production-abc123xyz
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   
   # Frontend URL
   FRONTEND_URL=http://localhost:5173
   ```

3. Replace `YOUR_ACTUAL_CLIENT_ID` and `YOUR_ACTUAL_CLIENT_SECRET` with the values from Google Cloud Console

---

## 🎨 Step 3: Configure Frontend (.env file)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Open the `.env` file and update:
   ```env
   # Google OAuth Configuration
   VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com
   
   # API Configuration
   VITE_API_URL=http://localhost:8000/api
   ```

3. Replace `YOUR_ACTUAL_CLIENT_ID` with your Google Client ID (same as backend)

---

## 🚀 Step 4: Start the Application

### 4.1 Start Backend
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

The backend should now be running at `http://localhost:8000`

### 4.2 Start Frontend (in a new terminal)
```bash
cd frontend
pnpm dev
```

The frontend should now be running at `http://localhost:5173`

---

## ✅ Step 5: Test Google OAuth

1. Open your browser and go to `http://localhost:5173`
2. You should see a login page with a "Sign in with Google" button
3. Click the button
4. Select your Google account
5. If successful, you'll be redirected to the main application
6. Your profile picture and email should appear in the top right corner

---

## 🔍 Troubleshooting

### Issue: "Client ID not found"
- Make sure you've updated both `.env` files with your actual Client ID
- Restart both backend and frontend servers after updating `.env` files

### Issue: "Redirect URI mismatch"
- Go back to Google Cloud Console > Credentials
- Make sure `http://localhost:5173` is listed in Authorized JavaScript origins
- Make sure redirect URIs are correctly configured

### Issue: "Invalid token"
- Make sure your Google Client ID in backend `.env` matches the one in frontend `.env`
- Check that the Google+ API is enabled

### Issue: Backend not receiving requests
- Make sure CORS is properly configured (already done in settings.py)
- Check that backend is running on port 8000

---

## 📝 What Happens After Login?

1. User clicks "Sign in with Google"
2. Google handles authentication
3. Google sends a credential token to your frontend
4. Frontend sends this token to backend at `/api/auth/google/`
5. Backend verifies the token with Google
6. Backend creates or updates user in database
7. Backend generates JWT tokens (access & refresh)
8. Frontend stores tokens in localStorage
9. Frontend uses access token for authenticated API requests
10. User is logged in!

---

## 🎯 Testing Checklist

- [ ] Google Cloud project created
- [ ] OAuth credentials configured
- [ ] Both `.env` files updated with correct Client ID
- [ ] Backend running without errors
- [ ] Frontend running without errors
- [ ] Login button appears on login page
- [ ] Can click "Sign in with Google"
- [ ] Can select Google account
- [ ] Successfully redirected after login
- [ ] User info appears in header
- [ ] Can make predictions while logged in

---

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong, random secrets for JWT_SECRET_KEY
- In production, use HTTPS and update allowed origins
- Keep your Google Client Secret secure

---

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Django REST Framework JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- [React OAuth Google](https://www.npmjs.com/package/@react-oauth/google)

---

## 💡 Next Steps

After successful setup, you can:
- Customize the login page design
- Add user profile page
- Implement role-based access control
- Add more OAuth providers (Facebook, GitHub, etc.)
- Set up refresh token rotation
- Add logout functionality to all pages

---

Need help? Check the console logs in both browser and terminal for detailed error messages!
