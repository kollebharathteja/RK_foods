# RK Food - Food Ordering Website

A complete food ordering system built with Spring Boot, MongoDB, and React, featuring PhonePay QR payment integration.

## 🚀 Quick Start

### Option 1: Automated Startup (Windows)
```bash
# Simply run the startup script
start.bat
```

This will automatically:
- Check prerequisites (Java, Node.js, MongoDB)
- Start MongoDB service
- Start backend server on port 8080
- Start frontend server on port 3000
- Open the application in your browser

### Option 2: Manual Startup

#### Prerequisites
- Java 17+
- MongoDB (local or cloud)
- Node.js 18+
- npm or yarn

#### Backend Setup
```bash
cd backend
# Update MongoDB connection in src/main/resources/application.properties if needed
mvn spring-boot:run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Access the Application
- Customer view: http://localhost:5173
- Admin dashboard: http://localhost:5173/admin
- Backend API: http://localhost:8080/api

## 🌐 Cloud Deployment

### Production Deployment

For production deployment, we recommend:
- **Backend**: Railway (Spring Boot + MongoDB)
- **Frontend**: Vercel (React + Vite)

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deployment Steps

1. **Backend (Railway)**:
   - Push code to GitHub
   - Create new project on Railway from GitHub repo
   - Add environment variable: `SPRING_DATA_MONGODB_URI=mongodb+srv://RK_foods:RKFoods123@smart-campus.abcde.mongodb.net/rkfood?retryWrites=true&w=majority`
   - Deploy and note the Railway URL

2. **Frontend (Vercel)**:
   - Push code to GitHub
   - Create new project on Vercel from GitHub repo
   - Add environment variable: `VITE_API_BASE_URL=https://your-railway-url.up.railway.app/api`
   - Deploy and access your live application

## Tech Stack

### Backend
- **Spring Boot 3.2.0** - Java framework
- **MongoDB** - NoSQL database
- **Spring Data MongoDB** - Database interaction
- **Maven** - Build tool

### Frontend
- **React 19** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

## Features

### Customer Features
- Browse available food products
- Search products by name
- Filter products by category
- Add products to cart
- View cart and manage quantities
- Place orders with PhonePay QR payment
- Upload payment screenshots
- Track order status

### Admin Features
- **Product Management**
  - Add new products with images
  - Edit existing products
  - Delete products
  - Toggle product availability
  - Manage product quantities
  - Categorize products

- **Order Management**
  - View all customer orders
  - Filter orders by status
  - View order details
  - Update order status (Pending, Confirmed, Preparing, Delivered, Cancelled)
  - Verify payment screenshots
  - Update payment status (Pending, Verified, Rejected)
  - Delete orders

## Setup Instructions

### Prerequisites
- Java 17 or higher
- MongoDB (local or cloud instance)
- Node.js 18 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Update MongoDB connection in `src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/rkfood
```

3. Build and run the backend:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### PhonePay QR Setup

1. Place your PhonePay QR code image in the frontend public directory:
```bash
frontend/public/phonepay-qr.png
```

2. The QR code will be displayed during the checkout process for customers to scan and pay.

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/available` - Get available products
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?name={name}` - Search products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product (multipart/form-data)
- `PUT /api/products/{id}` - Update product (multipart/form-data)
- `DELETE /api/products/{id}` - Delete product
- `PATCH /api/products/{id}/toggle-availability` - Toggle product availability

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/status/{orderStatus}` - Get orders by status
- `GET /api/orders/payment-status/{paymentStatus}` - Get orders by payment status
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order (multipart/form-data)
- `PATCH /api/orders/{id}/status?orderStatus={status}` - Update order status
- `PATCH /api/orders/{id}/payment-status?paymentStatus={status}` - Update payment status
- `DELETE /api/orders/{id}` - Delete order

## Database Schema

### Product Collection
```json
{
  "_id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "imageUrl": "string",
  "available": "boolean",
  "quantity": "number",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Order Collection
```json
{
  "_id": "string",
  "customerName": "string",
  "customerPhone": "string",
  "customerAddress": "string",
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "quantity": "number",
      "price": "number",
      "subtotal": "number"
    }
  ],
  "totalAmount": "number",
  "paymentMethod": "string",
  "paymentStatus": "string",
  "paymentScreenshot": "string",
  "orderStatus": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Usage

### For Customers
1. Visit `http://localhost:3000`
2. Browse available products
3. Add items to cart
4. Proceed to checkout
5. Scan PhonePay QR code to pay
6. Upload payment screenshot
7. Fill in delivery details
8. Place order

### For Admins
1. Visit `http://localhost:3000/admin`
2. Choose Product Management or Order Management
3. Manage products or orders as needed

## File Upload Configuration

- Max file size: 10MB
- Supported formats: Images for products and payment screenshots
- Upload directories:
  - Product images: `backend/uploads/`
  - Payment screenshots: `backend/uploads/payments/`

## Security Notes

- This is a demo application
- Add authentication/authorization for production use
- Implement secure file upload validation
- Add rate limiting for API endpoints
- Use environment variables for sensitive configuration
- Implement proper error handling and logging

## Future Enhancements

- User authentication and authorization
- Order tracking for customers
- Email notifications
- Multiple payment gateways
- Advanced search and filtering
- Product reviews and ratings
- Inventory management
- Analytics dashboard
- Mobile app version

## License

This project is for demonstration purposes.