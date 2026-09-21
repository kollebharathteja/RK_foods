# RK Food - Setup Guide

## Prerequisites Installation

### 1. MongoDB Installation & Setup

#### Option A: Local MongoDB Installation
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install MongoDB for Windows
3. Start MongoDB service:
```powershell
# Start MongoDB service
Start-Service MongoDB

# Or run MongoDB manually
mongod --dbpath "C:\data\db"
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update the connection string in `backend/src/main/resources/application.properties`

### 2. Java Installation
1. Download Java 17+ from https://adoptium.net/
2. Install Java
3. Verify installation:
```powershell
java -version
```

### 3. Node.js Installation
1. Download Node.js from https://nodejs.org/
2. Install Node.js (LTS version recommended)
3. Verify installation:
```powershell
node -version
npm -version
```

## Application Setup

### Backend Setup

1. Navigate to backend directory:
```powershell
cd backend
```

2. Update MongoDB connection in `src/main/resources/application.properties`:
```properties
# For local MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/rkfood

# For MongoDB Atlas (replace with your connection string)
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/rkfood
```

3. Build the project:
```powershell
mvn clean install
```

4. Run the backend:
```powershell
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The frontend will start on `http://localhost:5173`

### PhonePay QR Code Setup

1. Get your PhonePay QR code from the PhonePay app
2. Save it as `phonepay-qr.png` in the `frontend/public/` directory
3. The QR code will be displayed during checkout

## Directory Structure

```
RK_foods/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/rkfood/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   └── RkFoodApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── uploads/           # Created automatically for file uploads
│   └── pom.xml
├── frontend/
│   ├── public/
│   │   └── phonepay-qr.png    # Add your PhonePay QR code here
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
└── README.md
```

## Testing the Application

### 1. Start MongoDB
```powershell
# If using local MongoDB
Start-Service MongoDB

# Or run manually
mongod --dbpath "C:\data\db"
```

### 2. Start Backend
```powershell
cd backend
mvn spring-boot:run
```

### 3. Start Frontend (in new terminal)
```powershell
cd frontend
npm run dev
```

### 4. Access the Application
- Customer view: http://localhost:5173
- Admin dashboard: http://localhost:5173/admin
- Backend API: http://localhost:8080/api

## First-Time Setup Steps

### 1. Add Initial Products
1. Go to http://localhost:5173/admin
2. Click on "Product Management"
3. Click "Add New Product"
4. Fill in product details and upload images
5. Add several products across different categories

### 2. Test Customer Flow
1. Go to http://localhost:5173
2. Browse available products
3. Add items to cart
4. Proceed to checkout
5. Scan QR code (demo - you can skip actual payment)
6. Upload a dummy payment screenshot
7. Fill in customer details
8. Place order

### 3. Manage Orders
1. Go to http://localhost:5173/admin/orders
2. View the placed order
3. Verify payment screenshot
4. Update order status
5. Update payment status

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in application.properties
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change backend port in application.properties: `server.port=8081`
- Change frontend port in vite.config: add `server: { port: 3001 }`

### Build Errors
- Ensure Java 17+ is installed
- Run `mvn clean install` to rebuild
- Check for dependency conflicts in pom.xml

### Frontend Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check browser console for errors
- Ensure backend is running on port 8080

## Security Notes for Production

- Add authentication/authorization
- Use environment variables for sensitive data
- Implement HTTPS
- Add input validation and sanitization
- Use secure file upload handling
- Add rate limiting
- Implement proper logging and monitoring
- Regular security updates

## Features Implemented

✅ Product management (CRUD operations)
✅ Image upload for products
✅ Category-based filtering
✅ Product search functionality
✅ Shopping cart system
✅ PhonePay QR payment integration
✅ Order management system
✅ Payment screenshot upload
✅ Order status tracking
✅ Admin dashboard
✅ Responsive design
✅ MongoDB integration
✅ REST API endpoints