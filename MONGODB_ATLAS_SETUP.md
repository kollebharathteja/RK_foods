# MongoDB Atlas Setup Guide for RK Foods

## 🌐 Complete MongoDB Atlas Setup Instructions

### **Step 1: Create MongoDB Atlas Account**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up using:
   - Google account
   - GitHub account  
   - Email (verify your email)

### **Step 2: Create a New Cluster**

1. After logging in, click **"Build a Database"**
2. Choose **"M0" (Free Tier)** - completely free for development
3. Select cloud provider and region:
   - **Provider:** AWS (recommended)
   - **Region:** Choose region closest to you
     - For India: Mumbai (ap-south-1) or Singapore (ap-southeast-1)
4. Name your cluster: `rkfoods-cluster`
5. Click **"Create"**
6. Wait for cluster creation (takes 2-5 minutes)

### **Step 3: Create Database User**

1. When prompted to create a user:
   - **Username:** `rkfoods_admin` (or your preferred username)
   - **Password:** Create a strong password (minimum 8 characters)
     - ⚠️ **IMPORTANT:** Save this password securely!
   - **Authentication Method:** Choose "Password"
2. Click **"Create User"**

### **Step 4: Network Access (Whitelist IP)**

**Option A: Allow your current IP only (Recommended for production)**
1. Choose **"My Local Environment"**
2. Your current IP will be auto-detected
3. Click **"Add My Current IP Address"**

**Option B: Allow all IPs (Easier for development)**
1. Add IP: `0.0.0.0/0` (allows all IPs)
2. ⚠️ **WARNING:** Only use this for development!
3. Click **"Add IP Address"**

### **Step 5: Get Connection String**

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **"Java"** as your driver
4. Select **"3.2 or later"** as your version
5. Copy the connection string

Your connection string will look like:
```
mongodb+srv://rkfoods_admin:YOUR_PASSWORD@rkfoods-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### **Step 6: Update Spring Boot Configuration**

1. Open: `backend/src/main/resources/application.properties`
2. Replace the MongoDB URI with your connection string
3. Format should be:
   ```
   spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/database_name
   ```

**Example:**
```properties
spring.data.mongodb.uri=mongodb+srv://rkfoods_admin:YourSecurePassword123@rkfoods-cluster.abc123.mongodb.net/rkfood?retryWrites=true&w=majority
```

### **Step 7: Test the Connection**

1. Restart your Spring Boot backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. Check the logs for successful MongoDB connection:
   - Look for: "MongoClient with metadata created successfully"
   - If you see connection errors, check:
     - Username/password are correct
     - IP is whitelisted
     - Connection string format is correct

### **Step 8: Verify Database Creation**

1. Log in to MongoDB Atlas
2. Go to your cluster
3. Click **"Browse Collections"**
4. You should see:
   - `products` collection (created automatically)
   - `orders` collection (created automatically)

## 🔧 **Troubleshooting**

### **Common Issues & Solutions**

**Issue 1: "Connection refused" or "Authentication failed"**
- ✅ Check username and password are correct
- ✅ Ensure IP is whitelisted in Network Access
- ✅ Verify connection string format

**Issue 2: "IP not whitelisted"**
- ✅ Go to Network Access in MongoDB Atlas
- ✅ Add your current IP address
- ✅ Or use `0.0.0.0/0` for development (not recommended for production)

**Issue 3: "Connection timeout"**
- ✅ Check your internet connection
- ✅ Verify cluster is running (should show green status)
- ✅ Try selecting a different region closer to you

**Issue 4: "Cluster not ready"**
- ✅ Wait for cluster creation to complete (can take 5-10 minutes)
- ✅ Cluster status should show green before connecting

## 📱 **MongoDB Atlas Dashboard Features**

Once connected, you can:
- **Browse Collections:** View your products and orders
- **Add Data:** Manually add documents to collections
- **Query Data:** Use MongoDB Query Language (MQL)
- **Monitor Performance:** See cluster performance metrics
- **Set Alerts:** Get notified about performance issues

## 🔒 **Security Best Practices**

1. **Strong Passwords:** Use complex passwords for database users
2. **IP Whitelisting:** Only whitelist necessary IPs (not `0.0.0.0/0` for production)
3. **Least Privilege:** Create users with minimum required permissions
4. **Enable Atlas Security:** Enable encryption and audit logs
5. **Regular Updates:** Keep MongoDB Atlas and drivers updated

## 📊 **Free Tier Limitations**

MongoDB Atlas Free Tier (M0) includes:
- 512 MB storage
- Shared RAM (with other free clusters)
- No SLA (Service Level Agreement)
- Good for development and small projects

**When to upgrade:**
- More than 512 MB storage needed
- Better performance required
- Production environment with SLA needs

## 🎯 **Next Steps After Setup**

1. ✅ Add your premix products to the database
2. ✅ Test the ordering system
3. ✅ Monitor performance in Atlas dashboard
4. ✅ Set up backup and monitoring alerts
5. ✅ Consider upgrading for production use

## 📞 **Need Help?**

- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- MongoDB University: https://university.mongodb.com/
- Community Forums: https://www.mongodb.com/community/forums

---

**Quick Reference Connection String Format:**
```
mongodb+srv://[username:password@][cluster-name].[random].mongodb.net/[database-name]?retryWrites=true&w=majority
```