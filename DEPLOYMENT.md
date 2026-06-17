# Portfolio Deployment Guide

## 📋 Prerequisites

- Node.js v16+ installed
- MongoDB Atlas account (for cloud database)
- Git installed
- Vercel or Netlify account (for frontend)
- Render, Railway, or Fly.io account (for backend)

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Log in to your account
3. Click "Create" → Create a new project
4. Click "Create Deployment" → Select "M0 Free Tier"
5. Choose your region (closest to your audience)
6. Click "Create Deployment"

### Step 2: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for development) or add specific IPs
4. Click "Confirm"

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Create username and password (store securely)
4. Click "Add User"

### Step 4: Get Connection String
1. Go to "Databases" → Click "Connect"
2. Select "Drivers" → Node.js
3. Copy the connection string
4. Replace `<username>`, `<password>`, and `<database>` with your actual values
5. Example: `mongodb+srv://username:password@cluster.mongodb.net/ubaid-portfolio?retryWrites=true&w=majority`

---

## 🖥️ Backend Deployment

### Option 1: Render.com (Recommended)

#### Step 1: Prepare Backend
```bash
cd backend
npm install
npm run start  # Test locally first
```

#### Step 2: Create Render Service
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your GitHub repository
5. Configure settings:
   - **Name**: ubaid-portfolio-api
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Free Plan**: Yes (sleep after 15 min inactivity)

#### Step 3: Set Environment Variables
In Render dashboard:
1. Go to "Environment" tab
2. Add variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ubaid-portfolio
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
API_URL=https://ubaid-portfolio-api.onrender.com
```

#### Step 4: Deploy
- Push to GitHub → Render auto-deploys
- Backend URL: `https://ubaid-portfolio-api.onrender.com`

---

### Option 2: Railway.app

#### Step 1: Create Railway Project
1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your repository

#### Step 2: Add MongoDB
1. Click "Add"
2. Select "MongoDB"
3. Configure as needed

#### Step 3: Configure Environment
Add the same environment variables as above in Railway dashboard

---

### Option 3: Fly.io

#### Step 1: Install Fly CLI
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex
```

#### Step 2: Deploy
```bash
cd backend
flyctl launch
# Follow prompts to configure
flyctl deploy
```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Build Frontend
```bash
cd frontend
npm install
npm run build
```

#### Step 2: Deploy to Vercel
```bash
# Option A: Using Vercel CLI
npm install -g vercel
vercel

# Option B: Using GitHub
# Connect GitHub repo at vercel.com
```

#### Step 3: Configure Environment
In Vercel dashboard → Settings → Environment Variables:
```
VITE_API_BASE_URL=https://ubaid-portfolio-api.onrender.com
```

#### Step 4: Update Frontend Code
In `src/App.jsx` or API service, use:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
```

---

### Option 2: Netlify

#### Step 1: Build Frontend
```bash
cd frontend
npm run build
```

#### Step 2: Deploy
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Step 3: Configure
- Netlify Site Settings → Environment
- Add `VITE_API_BASE_URL`

---

### Option 3: GitHub Pages

#### Step 1: Update vite.config.js
```javascript
export default defineConfig({
  base: '/ubaid-portfolio/',  // if hosted as subdirectory
  // ... rest of config
})
```

#### Step 2: Build & Deploy
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

---

## 🔧 Local Development Setup

### Backend
```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start MongoDB locally (if using local)
# MongoDB must be running on localhost:27017

# Run server
npm start
# or for development with auto-reload
npm run dev  # if script exists
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Access at http://localhost:5173
```

---

## 📊 Database Backup & Maintenance

### Backup MongoDB Atlas Data
1. Go to MongoDB Atlas Dashboard
2. Click Deployment → Backup
3. Click "Backup Now"
4. Download backup when ready

### Restore Data
```bash
# Using mongorestore tool
mongorestore --uri "mongodb+srv://username:password@cluster.mongodb.net/ubaid-portfolio"
```

---

## 🚀 Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify contact form sends emails
- [ ] Check admin login works
- [ ] Test project/skills CRUD operations
- [ ] Verify JWT tokens expire correctly
- [ ] Test CORS is working
- [ ] Check image loading
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active
- [ ] Database backups scheduled
- [ ] Error logging configured
- [ ] Performance monitoring setup

---

## 🔐 Security Best Practices

### Production Environment
```env
# NEVER commit .env file
# Always use strong JWT_SECRET
# Enable HTTPS only
# Use environment-specific configs
JWT_SECRET=use_a_random_64_character_string_here
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com  # specify exact domain
```

### Database Security
- [ ] Use strong MongoDB password (20+ characters)
- [ ] Enable IP whitelist on Atlas
- [ ] Use connection string with authentication
- [ ] Enable encryption at rest
- [ ] Regular backups

### API Security
- [ ] JWT tokens set to expire
- [ ] Rate limiting enabled
- [ ] Input validation on all fields
- [ ] CORS properly configured
- [ ] Security headers set (implemented in server.js)

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Node version
node --version  # Should be v16+

# Check MongoDB connection
# Verify MONGODB_URI in .env
# Test connection locally first
```

### Frontend not connecting to API
```javascript
// Check API_BASE_URL configuration
// Verify CORS is enabled in backend
// Check ALLOWED_ORIGINS includes frontend domain
```

### Images not loading
- [ ] Verify image path is correct
- [ ] Check public folder exists
- [ ] Verify CORS allows image requests
- [ ] Use absolute URLs for external images

### Database connection timeout
- [ ] Check IP whitelist on MongoDB Atlas
- [ ] Verify connection string is correct
- [ ] Check network connectivity
- [ ] Increase timeout in db.js if needed

---

## 📈 Performance Optimization

### Frontend
```bash
# Build optimization
npm run build  # Vite creates optimized dist/

# Check bundle size
npm list
```

### Backend
- Use MongoDB indexes on frequently queried fields
- Implement caching for static data
- Use gzip compression (Express middleware)

---

## 🌐 Custom Domain Setup

### For Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records per Vercel instructions

### For Render
1. Go to Settings → Custom Domain
2. Follow DNS configuration steps

### For Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

---

## 📞 Support & Resources

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Render Deployment: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Express.js Guide: https://expressjs.com/
- React Documentation: https://react.dev/

---

## 🎉 You're All Set!

Your portfolio is now deployed and accessible to the world. Keep your code updated, monitor your applications, and regularly backup your database.

For any issues, check the platform-specific documentation or reach out to support.
