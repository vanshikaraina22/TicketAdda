import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
  
    // Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
  
    // Phone: Indian mobile - 10 digits, starts with 6-9
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number'
    }
  
    // Email: only @gmail.com allowed
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email.trim())) {
      newErrors.email = 'Only valid @gmail.com addresses are allowed'
    }
  
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      localStorage.setItem('user', JSON.stringify(formData))
      navigate('/location')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-netflix-black via-netflix-gray to-netflix-black">
      <div className="w-full max-w-md p-8 bg-netflix-gray rounded-lg shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-netflix-red mb-2">MovieFlix</h1>
          <p className="text-gray-400">AI-Powered Movie Booking</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-netflix-black border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-netflix-red'
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 animate-slide-up">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-netflix-black border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.phone 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-netflix-red'
              }`}
              placeholder="10 digit valid phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500 animate-slide-up">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-netflix-black border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-netflix-red'
              }`}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 animate-slide-up">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-netflix-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 glow-effect"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

