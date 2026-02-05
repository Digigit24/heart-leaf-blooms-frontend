# Wishlist Debugging Guide

## Common Issues and Solutions

### Issue 1: Wishlist button not working

**Symptoms:**
- Clicking the heart icon does nothing
- No console errors or warnings

**Possible Causes:**
1. **User not logged in** - Check if `user` exists in auth store
2. **Product ID missing** - Check if `product.id` exists
3. **API endpoint not responding** - Check network tab in browser

**How to Debug:**

1. **Open Browser Console** (F12)
2. **Click the wishlist heart icon**
3. **Check for console messages:**
   - "User must be logged in to add to wishlist" → You need to login
   - "Added to wishlist successfully" → It's working!
   - "Failed to add to wishlist" → API error

4. **Check Network Tab:**
   - Look for `POST /wishlist/{userId}` request
   - Check if it returns 200 (success) or error code
   - Check the request payload has `product_id`

### Issue 2: GET endpoint doesn't exist

**Symptoms:**
- Console shows "Failed to fetch wishlist (GET endpoint might not exist)"
- Wishlist doesn't load on login

**Solution:**
This is expected if your backend doesn't have a GET endpoint yet. The wishlist will still work with just POST and DELETE endpoints. Items will be added/removed but won't persist across page refreshes until you implement the GET endpoint.

### Issue 3: Wishlist items disappear on refresh

**Cause:**
The GET endpoint doesn't exist or isn't returning data correctly.

**Temporary Solution:**
The wishlist will work within the current session but won't persist. Implement the GET endpoint on the backend to fix this.

### Issue 4: "Failed to add to wishlist" alert

**Possible Causes:**
1. **Backend server not running** - Check if `http://localhost:7071` is accessible
2. **Wrong user ID format** - Backend expects integer but receiving string (or vice versa)
3. **Authentication error** - Token not being sent or invalid
4. **CORS error** - Backend not allowing requests from frontend

**How to Fix:**
1. Check backend server is running
2. Check network tab for exact error message
3. Verify token is being sent in Authorization header
4. Check backend CORS settings

## Testing Checklist

Run through these steps to test wishlist:

1. ✅ **Login** to your account
2. ✅ **Go to a product detail page**
3. ✅ **Click the heart icon**
4. ✅ **Check console** for success/error messages
5. ✅ **Open wishlist sidebar** (click heart in header)
6. ✅ **Verify item appears** in wishlist
7. ✅ **Click X to remove** item
8. ✅ **Verify item disappears**

## Console Commands for Debugging

Open browser console and run these commands:

```javascript
// Check if user is logged in
useAuthStore.getState().user

// Check wishlist items
useWishlistStore.getState().items

// Check if product is in wishlist (replace '123' with actual product ID)
useWishlistStore.getState().isInWishlist('123')

// Manually add to wishlist (for testing)
const user = useAuthStore.getState().user;
const product = { id: '123', name: 'Test Product', price: 100 };
useWishlistStore.getState().addToWishlist(product, user.id);
```

## API Endpoint Requirements

Your backend must support these endpoints:

### 1. Add to Wishlist
```
POST /wishlist/{userId}
Body: { "product_id": "string" }
Response: { "wishlist": { "id": "string", "product_id": "string", ... } }
```

### 2. Remove from Wishlist
```
DELETE /wishlist/{userId}/{wishlistId}
Response: Success message
```

### 3. Get Wishlist (Optional but recommended)
```
GET /wishlist/{userId}
Response: { "wishlist": [ { "id": "string", "product_id": "string", ... } ] }
```

## Next Steps

If wishlist still doesn't work after checking all the above:

1. **Share the console error message** - Copy the exact error from browser console
2. **Share the network request** - Copy the request/response from Network tab
3. **Check backend logs** - See if the request is reaching the backend
4. **Verify API endpoint** - Test the endpoint directly with Postman/Thunder Client
