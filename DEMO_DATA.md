# Demo Data for RK Food

## Sample Products to Add

Use these sample products to test the system:

### Main Course
1. **Butter Chicken**
   - Description: Tender chicken pieces in a rich, creamy tomato-based curry with butter
   - Price: 350.00
   - Category: Main Course
   - Quantity: 20

2. **Paneer Tikka Masala**
   - Description: Grilled paneer cubes in a spiced tomato and onion gravy
   - Price: 280.00
   - Category: Main Course
   - Quantity: 15

3. **Biryani**
   - Description: Fragrant basmati rice cooked with aromatic spices and your choice of meat/vegetables
   - Price: 320.00
   - Category: Main Course
   - Quantity: 25

### Appetizers
4. **Samosa (2 pieces)**
   - Description: Crispy pastry filled with spiced potatoes and peas
   - Price: 60.00
   - Category: Appetizers
   - Quantity: 50

5. **Onion Pakora**
   - Description: Crispy fritters made with gram flour and sliced onions
   - Price: 80.00
   - Category: Appetizers
   - Quantity: 40

### Breads
6. **Naan**
   - Description: Soft, leavened flatbread baked in a tandoor
   - Price: 40.00
   - Category: Breads
   - Quantity: 100

7. **Garlic Naan**
   - Description: Naan topped with minced garlic and coriander
   - Price: 50.00
   - Category: Breads
   - Quantity: 80

### Beverages
8. **Mango Lassi**
   - Description: Refreshing yogurt-based drink with mango pulp
   - Price: 90.00
   - Category: Beverages
   - Quantity: 30

9. **Masala Chai**
   - Description: Traditional Indian spiced tea
   - Price: 40.00
   - Category: Beverages
   - Quantity: 100

### Desserts
10. **Gulab Jamun (4 pieces)**
    - Description: Deep-fried milk solids soaked in sugar syrup
    - Price: 120.00
    - Category: Desserts
    - Quantity: 25

11. **Rasmalai**
    - Description: Soft paneer dumplings in sweetened, flavored milk
    - Price: 150.00
    - Category: Desserts
    - Quantity: 20

## Sample Order Test

### Test Customer Details
- Name: John Doe
- Phone: 9876543210
- Address: 123 Main Street, City, State - 123456

### Test Order Flow
1. Add Butter Chicken, Naan, and Mango Lassi to cart
2. Total should be: 350 + 40 + 90 = ₹480.00
3. Proceed to payment
4. Upload any image as payment screenshot (for testing)
5. Fill in customer details
6. Place order

### Admin Order Management
1. Go to Admin Dashboard → Order Management
2. View the new order
3. Check payment screenshot
4. Update payment status to "Verified"
5. Update order status to "Confirmed"
6. Progress through: Preparing → Delivered

## Image Upload Tips

For product images, you can use:
- Actual food photos from your restaurant
- Stock food images (ensure proper licensing)
- Placeholder images from services like unsplash.com

Recommended image specifications:
- Format: JPG or PNG
- Size: Under 2MB for faster loading
- Dimensions: 800x600 or similar (4:3 aspect ratio)
- Quality: Clear, well-lit photos of food

## PhonePay QR Code Setup

1. Open PhonePay app on your phone
2. Go to "My QR Code" or "Scan & Pay"
3. Take a screenshot of your QR code
4. Save it as `phonepay-qr.png` in `frontend/public/` directory
5. The QR code will be displayed during checkout

Alternative: Use any payment QR code image as placeholder for testing