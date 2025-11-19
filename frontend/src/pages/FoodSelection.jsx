import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FoodCard from '../components/FoodCard'

const foodItems = [
  { id: 'food1', name: 'Popcorn', price: 100, image: 'https://www.sharmispassions.com/wp-content/uploads/2022/07/popcorn-recipe1.jpg' },
  { id: 'food2', name: 'Coke', price: 100, image: 'https://i.pinimg.com/474x/6a/36/3d/6a363d922a951cb4669c12c0e5da128a.jpg' },
  { id: 'food3', name: 'Chai & Samosa', price: 100, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPJFplfIciDndqSNzty4lLHWv5oRBogT-AQ&s' },
  { id: 'food4', name: 'Burger', price: 100, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKyxw0_aJcEnpuGDBHP_4RMHnel4GCytdBoA&s' },
  { id: 'food5', name: 'Nachos', price: 100, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShNmVOUha3x6cfNZP5WsautAGfXl0cvfqGfw&s' },
  { id: 'food6', name: 'Pizza', price: 100, image: 'https://media.istockphoto.com/id/184946701/photo/pizza.jpg?s=612x612&w=0&k=20&c=97rc0VIi-s3mn4xe4xDy9S-XJ_Ohbn92XaEMaiID_eY=' },
  { id: 'food7', name: 'Fries', price: 100, image: 'https://thumbs.dreamstime.com/b/golden-crispy-french-fries-flavorful-seasoning-basket-tempting-close-up-sprinkled-served-wire-perfect-showcasing-396310467.jpg' },
  { id: 'food8', name: 'Cupcake', price: 100, image: 'https://thumbs.dreamstime.com/b/delicious-pink-cupcake-sprinkles-tempting-viewers-purple-background-close-up-colorful-surrounded-other-cupcakes-385891945.jpg' },
]

function FoodSelection() {
  const [selectedFoods, setSelectedFoods] = useState([])
  const [bookingData, setBookingData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Load preliminary booking data from localStorage
    const data = localStorage.getItem('bookingData')
    if (!data) {
      navigate('/login')
      return
    }

    const parsed = JSON.parse(data)
    setBookingData(parsed)

    // Restore selected foods from localStorage if available
    const savedFoods = localStorage.getItem('selectedFoods')
    if (savedFoods) {
      try {
        setSelectedFoods(JSON.parse(savedFoods))
      } catch (e) {
        console.error('Error parsing saved foods:', e)
      }
    }
  }, [navigate])

  const toggleFood = (foodId) => {
    setSelectedFoods(prev => {
      const newSelection = prev.includes(foodId)
        ? prev.filter(id => id !== foodId)
        : [...prev, foodId]
      
      // Save to localStorage immediately
      localStorage.setItem('selectedFoods', JSON.stringify(newSelection))
      return newSelection
    })
  }

  const handleProceed = () => {
    if (!bookingData) return

    // Calculate food total
    const foodTotal = selectedFoods.length * 100
    const baseAmount = bookingData.totalAmount || bookingData.baseAmount || 0
    const finalAmount = baseAmount + foodTotal

    // Get selected food items with details
    const selectedFoodItems = foodItems.filter(food => selectedFoods.includes(food.id))

    // Update booking data
    const updatedBooking = {
      ...bookingData,
      foodItems: selectedFoodItems,
      baseAmount: baseAmount,
      totalAmount: finalAmount,
      paid: true
    }

    // Save to localStorage
    localStorage.setItem('bookingData', JSON.stringify(updatedBooking))
    localStorage.removeItem('selectedFoods') // Clear temporary food selection

    // Navigate to confirmation
    navigate('/confirmation')
  }

  const handleSkip = () => {
    if (!bookingData) return

    // Ensure baseAmount is set
    const baseAmount = bookingData.totalAmount || bookingData.baseAmount || 0
    const updatedBooking = {
      ...bookingData,
      foodItems: [],
      baseAmount: baseAmount,
      totalAmount: baseAmount,
      paid: true
    }

    localStorage.setItem('bookingData', JSON.stringify(updatedBooking))
    localStorage.removeItem('selectedFoods')
    navigate('/confirmation')
  }

  if (!bookingData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const foodTotal = selectedFoods.length * 100
  const baseAmount = bookingData.totalAmount || bookingData.baseAmount || 0
  const grandTotal = baseAmount + foodTotal

  return (
    <div className="min-h-screen bg-gradient-to-br from-netflix-black via-netflix-gray to-netflix-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-netflix-red mb-2">Add Snacks & Drinks</h1>
          <p className="text-gray-400 text-lg">Optional - Select items to add to your order</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {foodItems.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              isSelected={selectedFoods.includes(food.id)}
              onToggle={() => toggleFood(food.id)}
            />
          ))}
        </div>

        <div className="bg-netflix-gray rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="space-y-2">
              <p className="text-gray-400">
                Selected items: <span className="text-white font-semibold">{selectedFoods.length}</span>
              </p>
              <p className="text-gray-400">
                Food total: <span className="text-white font-semibold">₹{foodTotal}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Grand Total</p>
              <p className="text-3xl font-bold text-netflix-red">₹{grandTotal}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleSkip}
            className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Skip for now
          </button>
          <button
            onClick={handleProceed}
            className="px-8 py-3 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 glow-effect focus:outline-none focus:ring-2 focus:ring-netflix-red"
          >
            Proceed to Confirmation
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodSelection

