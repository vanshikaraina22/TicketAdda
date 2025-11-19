# 🧪 Food Selection Feature - QA Checklist

## Manual Testing Steps

### 1. Navigation Flow
- [ ] **Seat Selection → Food Selection**
  - Select seats on SeatBooking page
  - Click "Continue to Food Selection"
  - Verify redirect to `/food` route
  - Verify booking data is preserved

- [ ] **Food Selection → Confirmation**
  - Select food items
  - Click "Proceed to Confirmation"
  - Verify redirect to `/confirmation`
  - Verify food items appear in confirmation

- [ ] **Skip Functionality**
  - On FoodSelection page, click "Skip for now"
  - Verify redirect to confirmation
  - Verify no food items shown
  - Verify total equals seats subtotal only

### 2. Food Item Selection
- [ ] **Toggle Selection**
  - Click a food item → should show selected state (glow, checkmark)
  - Click again → should deselect
  - Verify multiple items can be selected simultaneously

- [ ] **Visual States**
  - Hover over unselected item → should show ring glow and scale
  - Selected item → should show red background, ring, and checkmark
  - Verify smooth transitions

- [ ] **Price Calculation**
  - Select 0 items → Food total: ₹0
  - Select 1 item → Food total: ₹100
  - Select 3 items → Food total: ₹300
  - Verify grand total = baseAmount + foodTotal

### 3. Data Persistence
- [ ] **LocalStorage**
  - Select food items
  - Refresh page → selections should persist
  - Verify `selectedFoods` in localStorage

- [ ] **Booking Data**
  - After proceeding, check localStorage `bookingData`
  - Verify `foodItems` array contains selected items
  - Verify `baseAmount` is seats subtotal
  - Verify `totalAmount` = baseAmount + foodTotal

### 4. Confirmation Page
- [ ] **Food Items Display**
  - If food items selected → should show food section
  - If no food items → food section should not appear
  - Verify each food item shows name and price

- [ ] **Price Breakdown**
  - Verify seats subtotal shown
  - Verify food subtotal shown (if items selected)
  - Verify grand total = seats + food

- [ ] **Edge Cases**
  - No food items → only seats subtotal shown
  - With food items → both subtotals + grand total shown

### 5. Accessibility
- [ ] **Keyboard Navigation**
  - Tab through food items → focus visible
  - Press Enter/Space on focused item → toggles selection
  - Verify focus rings visible

- [ ] **Screen Reader**
  - Verify `aria-label` on food cards
  - Verify `aria-pressed` state changes
  - Verify alt text on images

### 6. Responsive Design
- [ ] **Mobile (2 columns)**
  - Resize to mobile viewport
  - Verify 2-column grid
  - Verify buttons stack vertically

- [ ] **Desktop (4 columns)**
  - Resize to desktop viewport
  - Verify 4-column grid
  - Verify buttons in horizontal row

### 7. Edge Cases
- [ ] **Refresh on FoodSelection**
  - Select items
  - Refresh page
  - Verify selections restored

- [ ] **Direct URL Access**
  - Navigate directly to `/food` without booking data
  - Should redirect to `/login`

- [ ] **Empty Selection**
  - Don't select any items
  - Click "Proceed" → should work (empty foodItems array)
  - Click "Skip" → should work (empty foodItems array)

### 8. UI/UX
- [ ] **Animations**
  - Hover effects smooth
  - Selection transitions smooth
  - No janky animations

- [ ] **Theme Consistency**
  - Colors match Netflix-style theme
  - Typography consistent
  - Spacing consistent

## Expected Behavior Summary

### Booking Object Structure
```javascript
{
  movie: {...},
  seats: ['A1', 'A2'],
  baseAmount: 240,        // seats subtotal
  totalAmount: 440,        // baseAmount + foodTotal
  foodItems: [
    { id: 'food1', name: 'Popcorn', price: 100, image: '...' },
    { id: 'food2', name: 'Coke', price: 100, image: '...' }
  ],
  city: 'Mumbai',
  bookingId: 'BK...',
  paid: true
}
```

### Price Calculation
- **Base Amount**: `seats.length * 120`
- **Food Total**: `selectedFoods.length * 100`
- **Grand Total**: `baseAmount + foodTotal`

## Known Issues / Notes

- Food images use placeholder service (picsum.photos)
- Each food item costs ₹100 (fixed price)
- Selection is binary (one per item, no quantity)
- Food selection persists in localStorage until booking completes

## Browser Testing

Test on:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

## Performance

- [ ] Page loads quickly
- [ ] Images lazy load
- [ ] No console errors
- [ ] Smooth animations (60fps)

---

**Test Date**: ___________  
**Tester**: ___________  
**Status**: ☐ Pass  ☐ Fail  ☐ Needs Fix

