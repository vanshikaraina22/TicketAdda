import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AIChatbot from '../components/AIChatbot'
import { fetchMoviesByLanguage } from '../services/movieService'

const languages = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu']

function MovieSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [movies, setMovies] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    const city = localStorage.getItem('selectedCity')
    if (!user || !city) {
      navigate('/login')
    }
  }, [navigate])

  // Fetch movies when language changes
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const fetchedMovies = await fetchMoviesByLanguage(selectedLanguage)
        setMovies(prev => {
          // Only update if we don't already have movies for this language
          if (prev[selectedLanguage]) {
            return prev
          }
          return {
            ...prev,
            [selectedLanguage]: fetchedMovies
          }
        })
      } catch (err) {
        setError('Failed to load movies. Please try again.')
        console.error('Error loading movies:', err)
      } finally {
        setLoading(false)
      }
    }

    // Only load if we don't have movies for this language
    if (!movies[selectedLanguage]) {
      loadMovies()
    } else {
      setLoading(false)
    }
  }, [selectedLanguage, movies])

  const handleBook = (movie) => {
    localStorage.setItem('selectedMovie', JSON.stringify(movie))
    navigate('/seats')
  }

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-netflix-black via-netflix-gray to-netflix-black">
      <AIChatbot movies={movies} />
      
      <div className="lg:mr-96 pr-4">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold text-netflix-red mb-4">Select a Movie</h1>
            <p className="text-gray-400 text-lg">
              City: <span className="text-white font-semibold">{localStorage.getItem('selectedCity')}</span>
            </p>
          </div>

          <div className="mb-8 flex space-x-4 overflow-x-auto pb-4">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedLanguage === lang
                    ? 'bg-netflix-red text-white selected-glow'
                    : 'bg-netflix-gray text-gray-300 hover:bg-gray-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red mb-4"></div>
                <p className="text-gray-400">Loading movies...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && movies[selectedLanguage] && movies[selectedLanguage].length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No movies found for {selectedLanguage}</p>
            </div>
          )}

          {!loading && movies[selectedLanguage] && movies[selectedLanguage].length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies[selectedLanguage].map((movie) => (
              <div
                key={movie.id}
                className="bg-netflix-gray rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 glow-effect group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-125"
                  />
                  <div className="absolute top-2 right-2 bg-netflix-red px-2 py-1 rounded text-sm font-bold">
                    ⭐ {movie.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">Duration: {movie.duration}</p>
                  <button
                    onClick={() => handleBook(movie)}
                    className="w-full py-2 bg-netflix-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieSelection

