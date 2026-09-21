# Deployment Guide - RK Foods

This guide will help you deploy the RK Foods application:
- **Backend**: Railway (Spring Boot + MongoDB)
- **Frontend**: Vercel (React + Vite)

## Prerequisites

- GitHub account with your code pushed to a repository
- Railway account (free tier available)
- Vercel account (free tier available)
- MongoDB Atlas account (your database is already set up)

---

## Part 1: Backend Deployment on Railway

### Step 1: Prepare Your Backend

1. Ensure your backend code is pushed to GitHub
2. The following files have been created for you:
   - `railway.toml` (root) - Main Railway configuration that points to backend directory
   - `backend/Dockerfile` - Docker configuration (fallback option)
   - `backend/railway.toml` - Backend-specific Railway configuration
   - `backend/Procfile` - Process file for Railway
   - `backend/.env.example` - Environment variables template
   - `backend/.railwayignore` - Files to exclude from Railway build

**Important**: The root `railway.toml` file tells Railway to build from the `backend/` directory since this is a monorepo with both frontend and backend.

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will detect the `railway.toml` file and `Dockerfile`
5. Click "Deploy"

### Step 3: Configure Environment Variables

1. After deployment, go to your project settings in Railway
2. Navigate to "Variables" tab
3. Add the following environment variable:

```
SPRING_DATA_MONGODB_URI=mongodb+srv://RK_foods:RKFoods123@smart-campus.abcde.mongodb.net/rkfood?retryWrites=true&w=majority
```

4. Railway automatically sets `PORT` to 8080 (or another available port)

### Step 4: Get Your Backend URL

1. Once deployed, Railway will provide a URL like:
   `https://your-project-name.up.railway.app`
2. Note this URL - you'll need it for the frontend configuration
3. Test your backend by visiting: `https://your-project-name.up.railway.app/api/products`

---

## Part 2: Frontend Deployment on Vercel

### Step 1: Prepare Your Frontend

1. Ensure your frontend code is pushed to GitHub
2. The following files have been created for you:
   - `frontend/vercel.json` - Vercel configuration
   - `frontend/.env.example` - Environment variables template
   - Updated `frontend/src/services/api.js` to use environment variables
   - Updated image URLs in components to use environment variables

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project" → "Continue with GitHub"
3. Select your repository
4. Vercel will detect it's a Vite project automatically
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if monorepo) or leave as is
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Step 3: Configure Environment Variables

1. After deployment, go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variable:

```
VITE_API_BASE_URL=https://your-railway-backend-url.up.railway.app/api
```

Replace `your-railway-backend-url` with your actual Railway backend URL.

4. Redeploy your Vercel project to apply the environment variable

### Step 4: Get Your Frontend URL

1. Once deployed, Vercel will provide a URL like:
   `https://your-project-name.vercel.app`
2. Your application is now live!

---

## Part 3: Verification

### Test Your Deployment

1. Visit your Vercel frontend URL
2. Try the following:
   - Browse products
   - Add items to cart
   - Place an order
   - Access admin dashboard at `/admin`
   - Manage products and orders

### Check Backend API

1. Visit your Railway backend URL with `/api/products`
2. You should see a JSON response with product data

### Check MongoDB Connection

1. In Railway, view your deployment logs
2. Look for successful MongoDB connection messages
3. Check for any errors in the logs

---

## Part 4: Important Notes

### File Uploads

The current setup stores uploaded files in the container's filesystem:
- Product images: `/app/uploads/products/`
- Payment screenshots: `/app/uploads/payments/`

**Important**: These files will be lost when Railway rebuilds your container. For production, consider:
- Using object storage (AWS S3, Cloudinary, etc.)
- Configuring Railway volumes for persistent storage

### CORS Configuration

Your backend has CORS configured to allow requests from any origin. For production:
- Update `backend/src/main/java/com/rkfood/config/CorsConfig.java`
- Add your specific Vercel domain instead of `/*`

### Security Considerations

1. **MongoDB Credentials**: Your connection string contains credentials. Consider:
   - Using Railway's secret management
   - Rotating credentials regularly
   - Using IP whitelisting in MongoDB Atlas

2. **Admin Authentication**: The current admin authentication is basic (localStorage). For production:
   - Implement proper JWT authentication
   - Add password hashing
   - Use secure HTTP-only cookies

3. **HTTPS**: Both Railway and Vercel provide HTTPS automatically

### Environment Variables

**Backend (Railway)**:
- `SPRING_DATA_MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (set by Railway automatically)
- `SPRING_PROFILES_ACTIVE` - Spring profile (set to "production")

**Frontend (Vercel)**:
- `VITE_API_BASE_URL` - Backend API URL

---

## Part 5: Troubleshooting

### Backend Issues

**Problem**: Backend fails to start
- Check Railway logs for errors
- Verify MongoDB connection string is correct
- Ensure port 8080 is available

**Problem**: MongoDB connection fails
- Verify your MongoDB Atlas credentials
- Check IP whitelist in MongoDB Atlas (allow Railway's IP)
- Ensure the database name is correct

### Frontend Issues

**Problem**: Frontend can't connect to backend
- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Check browser console for CORS errors
- Ensure backend is running and accessible

**Problem**: Images not loading
- Verify image URLs are using the correct backend URL
- Check backend logs for file upload errors
- Ensure uploads directory exists and has proper permissions

### Build Issues

**Problem**: Railpack build fails on Railway
- Railway may fail with Dockerfile configuration
- Solution: The project now uses Nixpacks (default Railway builder)
- `railway.toml` is configured to use Nixpacks with Maven support
- If Dockerfile is needed, you can change `builder = "DOCKERFILE"` in `railway.toml`

**Problem**: Docker build fails on Railway
- Check `Dockerfile` syntax
- Verify Maven dependencies are correct
- Ensure Java version compatibility (Java 17)
- Check if the jar file name matches what's specified in `Procfile`

**Problem**: Vercel build fails
- Check `vercel.json` configuration
- Verify `package.json` scripts are correct
- Ensure all dependencies are installed

---

## Part 6: Updating Your Deployment

### To Update Backend

1. Push changes to GitHub
2. Railway will automatically redeploy
3. Monitor logs for any issues

### To Update Frontend

1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Environment variables persist across deployments

### To Update Environment Variables

**Railway**:
1. Go to project settings → Variables
2. Update the variable
3. Railway will automatically redeploy

**Vercel**:
1. Go to project settings → Environment Variables
2. Update the variable
3. Trigger a new deployment

---

## Part 7: Cost Summary

### Railway (Backend)
- Free tier: $5/month credit
- Includes: 1 service, 512MB RAM, 1GB storage
- Suitable for development and small production apps

### Vercel (Frontend)
- Free tier: Unlimited personal projects
- Includes: 100GB bandwidth, 6GB build output
- Suitable for most small to medium applications

### MongoDB Atlas
- Free tier: 512MB storage
- Suitable for development and small production apps

---

## Support

If you encounter issues:
- Railway documentation: https://docs.railway.app
- Vercel documentation: https://vercel.com/docs
- MongoDB Atlas documentation: https://docs.atlas.mongodb.com

---

## Next Steps

1. Deploy both backend and frontend following this guide
2. Test all functionality thoroughly
3. Consider implementing the security improvements mentioned
4. Set up monitoring and error tracking
5. Configure custom domains if needed
