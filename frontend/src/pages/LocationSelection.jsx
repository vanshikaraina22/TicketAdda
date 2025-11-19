import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const cities = [
  { name: 'Chandigarh', 'icon': '🏛️', monument: 'Rock Garden' },
  { name: 'Delhi', icon: '🕌', monument: 'Red Fort' },
  { name: 'Gurgaon', icon: '🏢', monument: 'Cyber Hub' },
  { name: 'Pune', icon: '🏰', monument: 'Shaniwar Wada' },
  { name: 'Mumbai', icon: '🌉', monument: 'Gateway of India' },
  { name: 'Bangalore', icon: '🌳', monument: 'Lalbagh' },
  { name: 'Mysore', icon: '🏯', monument: 'Mysore Palace' },
  { name: 'Chennai', icon: '🏛️', monument: 'Marina Beach' },
]

function LocationSelection() {
  const [selectedCity, setSelectedCity] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      navigate('/login')
    }
  }, [navigate])

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    localStorage.setItem('selectedCity', city.name)
    setTimeout(() => {
      navigate('/movies')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-netflix-black via-netflix-gray to-netflix-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-netflix-red mb-4">Select Your City</h1>
          <p className="text-gray-400 text-lg">Choose where you want to watch movies</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cities.map((city, index) => (
            <div
              key={city.name}
              className={`relative bg-netflix-gray rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-110 glow-effect ${
                selectedCity?.name === city.name ? 'selected-glow bg-netflix-red' : ''
              }`}
              onClick={() => handleCitySelect(city)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{city.icon}</div>
                <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                <p className="text-sm text-gray-400">{city.monument}</p>
              </div>
              
              {selectedCity?.name === city.name && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl animate-pulse">✓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationSelection

