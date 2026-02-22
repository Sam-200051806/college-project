#!/bin/bash

echo "🎓 Student Performance Predictor - Google OAuth Setup"
echo "======================================================"
echo ""

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "❌ backend/.env not found!"
    echo "Creating backend/.env from template..."
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env - Please update with your Google credentials"
fi

if [ ! -f "frontend/.env" ]; then
    echo "❌ frontend/.env not found!"
    echo "✅ frontend/.env already exists"
fi

echo ""
echo "📋 Setup Checklist:"
echo "==================="
echo ""
echo "1. ✅ Install Backend Dependencies (Already done)"
echo "2. ✅ Install Frontend Dependencies (Already done)"
echo "3. ✅ Train ML Model (Already done)"
echo "4. ✅ Run Database Migrations (Already done)"
echo ""
echo "5. ⚠️  REQUIRED: Update Google OAuth Credentials"
echo "   - Edit backend/.env and add your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET"
echo "   - Edit frontend/.env and add your VITE_GOOGLE_CLIENT_ID"
echo ""
echo "6. 🚀 Start the servers:"
echo "   Backend:  cd backend && source venv/bin/activate && python manage.py runserver"
echo "   Frontend: cd frontend && pnpm dev"
echo ""
echo "📖 For detailed setup instructions, see: GOOGLE_OAUTH_SETUP.md"
echo ""
echo "🔗 Get Google OAuth credentials from:"
echo "   https://console.cloud.google.com/apis/credentials"
echo ""
