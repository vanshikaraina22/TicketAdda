// Movie Service - Fetches movies from backend API
// The backend proxies requests to TMDb API

export const fetchMoviesByLanguage = async (language) => {
  try {
    const response = await fetch(`/api/movies?language=${encodeURIComponent(language)}`)
    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }
    const data = await response.json()
    return data.movies || []
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

export const fetchPopularMovies = async (language = 'en') => {
  try {
    const response = await fetch(`/api/movies/popular?language=${language}`)
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies')
    }
    const data = await response.json()
    return data.movies || []
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return []
  }
}

// Language mapping for TMDb
export const languageMap = {
  'English': 'en',
  'Hindi': 'hi',
  'Kannada': 'kn',
  'Tamil': 'ta',
  'Telugu': 'te',
}

// Reverse mapping
export const languageCodeMap = {
  'en': 'English',
  'hi': 'Hindi',
  'kn': 'Kannada',
  'ta': 'Tamil',
  'te': 'Telugu',
}

