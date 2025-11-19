import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const seatsPerRow = 6
const seatPrice = 120

function SeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState([])
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const city = localStorage.getItem('selectedCity')
    const movieData = localStorage.getItem('selectedMovie')
    
    if (!user || !city || !movieData) {
      navigate('/login')
      return
    }
    
    setMovie(JSON.parse(movieData))
  }, [navigate])

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId)
      } else {
        return [...prev, seatId]
      }
    })
  }

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat')
      return
    }
    
    const baseAmount = selectedSeats.length * seatPrice
    const bookingData = {
      seats: selectedSeats,
      baseAmount: baseAmount,
      totalAmount: baseAmount,
      movie: movie,
      city: localStorage.getItem('selectedCity'),
      bookingId: `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      foodItems: [],
      paid: false // Will be set to true after food selection or skip
    }
    
    localStorage.setItem('bookingData', JSON.stringify(bookingData))
    navigate('/food')
  }

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const totalAmount = selectedSeats.length * seatPrice

  return (
    <div className="min-h-screen bg-gradient-to-br from-netflix-black via-netflix-gray to-netflix-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-netflix-red mb-4">Select Your Seats</h1>
          <div className="flex items-center space-x-4 bg-netflix-gray p-4 rounded-lg">
            <img src={movie.poster} alt={movie.title} className="w-20 h-28 object-cover rounded" />
            <div>
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p className="text-gray-400">{movie.duration} • ⭐ {movie.rating}</p>
            </div>
          </div>
        </div>

        <div className="bg-netflix-gray rounded-xl p-8 mb-8">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 px-4 py-2 rounded text-sm">SCREEN</div>
          </div>

          <div className="space-y-2 mb-8">
            {rows.map((row) => (
              <div key={row} className="flex items-center justify-center space-x-2">
                <div className="w-8 text-center font-bold">{row}</div>
                <div className="flex space-x-2">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`
                    const isSelected = selectedSeats.includes(seatId)
                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        className={`w-12 h-12 rounded transition-all duration-300 ${
                          isSelected
                            ? 'bg-netflix-red selected-glow transform scale-110'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        {isSelected && <span className="text-white text-xl">✓</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-netflix-red rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-500 rounded"></div>
              <span>Occupied</span>
            </div>
          </div>
        </div>

        <div className="bg-netflix-gray rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400">Selected Seats</p>
              <p className="text-2xl font-bold">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Price per seat</p>
              <p className="text-xl font-bold">₹{seatPrice}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
            <span className="text-2xl font-bold">Total Amount</span>
            <span className="text-3xl font-bold text-netflix-red">₹{totalAmount}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate('/movies')}
            className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            className="px-8 py-3 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-effect"
          >
            Continue to Food Selection
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatBooking

