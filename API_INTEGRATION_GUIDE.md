# Heart Leaf Blooms - API Integration Guide

This document provides a strictly verified list of API endpoints, payloads, and integration details for the Heart Leaf Blooms application. 

**Base URL**: `http://localhost:7071`
**Authentication**: **Cookies Only**. You must include `credentials: 'include'` in all fetch requests.

---

## 1. Authentication & Headers
**CRITICAL**: The backend relies on HTTP-Only cookies. Do not attempt to read tokens from `localStorage` for authentication.
- **User Token Cookie**: `user_token`
- **Vendor Token Cookie**: `vendor_token`
- **Admin Token Cookie**: `token`

### Global Request Header Format
For all POST/PUT requests:
```javascript
headers: {
    'Content-Type': 'application/json'
},
credentials: 'include' // <--- REQUIRED for all requests
```

---

## 2. User API (`/user`)

### Register User
- **Endpoint**: `POST /user/register`
- **Request Body**:
  ```json
  {
    "username": "John Doe",
    "user_email": "john@example.com",
    "user_password": "password123",
    "user_address": [  // Optional: Can be object or array
      {
        "address": "123 Street",
        "city": "CityName",
        "state": "StateName",
        "pincode": "123456"
      }
    ]
  }
  ```
- **Response**: `{ "message": "User created successfully", "user": { ... } }`

### Login User
- **Endpoint**: `POST /user/login`
- **Request Body**:
  ```json
  {
    "user_email": "john@example.com",
    "user_password": "password123"
  }
  ```
- **Response**: `{ "message": "Login successful", "user": { ... }, "user_token": "..." }` (Browser automatically sets `user_token` cookie).

### Get User Profile
- **Endpoint**: `GET /user/:id`
- **Response**: Returns User object including `addresses`, `cart`, `wishlist`.

### Add Address
- **Endpoint**: `POST /user/:id/address`
- **Request Body**:
  ```json
  {
    "address": "New St",
    "city": "New City",
    "state": "State",
    "pincode": "000000"
  }
  ```

---

## 3. Vendor API (`/vendor`)

### Register Vendor
- **Endpoint**: `POST /vendor/register`
- **Request Body**:
  ```json
  {
    "name": "Jane Owner",
    "email": "vendor@shop.com",
    "password": "password123",
    "shopName": "Jane's Flowers",
    "shopAddress": "Market St",
    "shopDescription": "Fresh flowers daily",
    "bankName": "Bank of America",
    "accountNumber": "9876543210",
    "IFSC": "BOFA000123"
  }
  ```

### Login Vendor
- **Endpoint**: `POST /vendor/login`
- **Request Body**:
  ```json
  {
    "vendorId": "your-8-char-uuid",
    "password": "password123"
  }
  ```
- **Response**: `{ "message": "...", "vendor": { ... }, "token": "..." }` (Cookie `vendor_token` set).

### Get Vendor (Public)
- **Endpoint**: `GET /vendor/:id`
- **Response**: Vendor details.

### Get All Vendors (Public)
- **Endpoint**: `GET /vendor`
- **Response**: Array of all vendors.

---

## 4. Product API (`/product`)

### Upload Product Image
- **Endpoint**: `POST /product/upload-image`
- **Body**: `FormData` with key `image`.
- **Response**:
  ```json
  {
    "data": {
      "large": "url_L",
      "medium": "url_M",
      "small": "url_S"
    }
  }
  ```
  *Note: You must upload images one by one or in loop, collecting the URLs.*

### Create Product
- **Endpoint**: `POST /product`
- **Request Body**:
  ```json
  {
    "vendor_id": "vendor-uuid",
    "category_id": 1, // Integer
    "product_name": "Rose Bouquet",
    "product_title": "Fresh Red Roses",
    "product_description": "Description here...",
    "product_price": 500, // Number
    "discount_price": 450, // Number (Optional)
    "product_guide": "Care guide...", 
    "product_images": [
       "url_large_1", "url_medium_1", "url_small_1", 
       "url_large_2", "url_medium_2", "url_small_2"
    ] 
  }
  ```
  **Important**: `product_images` is a flat array where every 3 strings represent one image (Large, Medium, Small). Order matters!

### Update Product
- **Endpoint**: `PUT /product/:id`
- **Request Body**: Same keys as Create Product. Only send fields you want to update.
  ```json
  {
    "product_price": 600,
    "product_images": ["L_new", "M_new", "S_new"] // Appends new images
  }
  ```

### Get All Products
- **Endpoint**: `GET /product`

### Get Single Product
- **Endpoint**: `GET /product/:id`

### Get Products by Vendor
- **Endpoint**: `GET /product/vendor/:vendorId`

---

## 5. Cart & Wishlist API

### Add to Cart
- **Endpoint**: `POST /cart/:userId`
- **Request Body**:
  ```json
  {
    "product_id": "product-uuid",
    "quantity": 1
  }
  ```

### Update Cart Quantity
- **Endpoint**: `PUT /cart/:userId/:cartId`
- **Request Body**:
  ```json
  {
    "quantity": 5
  }
  ```

### Delete Cart Item
- **Endpoint**: `DELETE /cart/:userId/:cartId`

### Add to Wishlist
- **Endpoint**: `POST /wishlist/:userId`
- **Request Body**:
  ```json
  {
    "product_id": "product-uuid"
  }
  ```

---

## 6. Order & Payment API

### Initialize Payment (Step 1)
- **Endpoint**: `POST /payment/create-order`
- **Request Body**:
  ```json
  {
    "user_id": "user-uuid"
  }
  ```
- **Response**: Returns Razorpay Order Object (contains `id`, `amount` in paise).

### Verify Payment & Place Order (Step 2)
- **Endpoint**: `POST /payment/verify`
- **Request Body**:
  ```json
  {
    "razorpay_order_id": "order_Obs...",
    "razorpay_payment_id": "pay_Obs...",
    "razorpay_signature": "signature...",
    "user_id": "user-uuid"
  }
  ```
- **Response**: Order placed successfully.

### Get User Orders (Admin View)
- **Endpoint**: `GET /order/admin`

### Get Vendor Orders
- **Endpoint**: `GET /order/vendor/:vendorId`

---

## 7. Category API (`/category`)

### Create Category (Admin)
- **Endpoint**: `POST /category`
- **Request Body**:
  ```json
  {
    "category_name": "Flowers",
    "category_description": "Fresh blooms",
    "category_icon": "url_or_icon_class"
  }
  ```

### Get All Categories
- **Endpoint**: `GET /category`
