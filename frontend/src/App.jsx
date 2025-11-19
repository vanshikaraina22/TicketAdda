import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import LocationSelection from './pages/LocationSelection'
import MovieSelection from './pages/MovieSelection'
import SeatBooking from './pages/SeatBooking'
import FoodSelection from './pages/FoodSelection'
import BookingConfirmation from './pages/BookingConfirmation'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/location" element={<LocationSelection />} />
        <Route path="/movies" element={<MovieSelection />} />
        <Route path="/seats" element={<SeatBooking />} />
        <Route path="/food" element={<FoodSelection />} />
        <Route path="/confirmation" element={<BookingConfirmation />} />
      </Routes>
    </Router>
  )
}

export default App

