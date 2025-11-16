import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'

function BookingConfirmation() {
  const [bookingData, setBookingData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('bookingData')
    if (!data) {
      navigate('/login')
      return
    }
    
    const parsed = JSON.parse(data)
    setBookingData(parsed)

    // Confetti animation
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }, [navigate])

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(bookingData.bookingId)
    alert('Booking ID copied to clipboard!')
  }

  const handleBookAnother = () => {
    localStorage.removeItem('selectedMovie')
    localStorage.removeItem('bookingData')
    navigate('/movies')
  }

  if (!bookingData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-netflix-black via-netflix-gray to-netflix-black py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-netflix-gray rounded-xl p-8 shadow-2xl animate-glow relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-red/20 via-transparent to-netflix-red/20 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-netflix-red mb-2">Booking Confirmed!</h1>
              <p className="text-gray-400">Your tickets are ready</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-netflix-black rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Booking ID</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-netflix-red">{bookingData.bookingId}</p>
                  <button
                    onClick={handleCopyBookingId}
                    className="px-4 py-2 bg-netflix-gray hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex space-x-4 bg-netflix-black rounded-lg p-4">
                <img
                  src={bookingData.movie.poster}
                  alt={bookingData.movie.title}
                  className="w-24 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{bookingData.movie.title}</h2>
                  <p className="text-gray-400 mb-1">{bookingData.movie.duration}</p>
                  <p className="text-gray-400">⭐ {bookingData.movie.rating}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-netflix-black rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">City</p>
                  <p className="text-xl font-bold">{bookingData.city}</p>
                </div>
                <div className="bg-netflix-black rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Seats</p>
                  <p className="text-xl font-bold">{bookingData.seats.join(', ')}</p>
                </div>
              </div>

              <div className="bg-netflix-black rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-lg">Total Amount Paid</p>
                  <p className="text-3xl font-bold text-netflix-red">₹{bookingData.totalAmount}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleBookAnother}
                className="flex-1 py-3 bg-netflix-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              >
                Book Another Movie
              </button>
              <button
                onClick={() => navigate('/location')}
                className="flex-1 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                Change Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation

