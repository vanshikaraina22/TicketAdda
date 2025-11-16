// Movie Controller - Handles movie API requests
// Uses TMDb API (The Movie Database) - Free tier available

const TMDB_API_KEY = process.env.TMDB_API_KEY || ''
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

// Language to region mapping for better results
const languageRegionMap = {
  'English': { language: 'en', region: 'US' },
  'Hindi': { language: 'hi', region: 'IN' },
  'Kannada': { language: 'kn', region: 'IN' },
  'Tamil': { language: 'ta', region: 'IN' },
  'Telugu': { language: 'te', region: 'IN' },
}

// Fallback movies if API fails or no key provided
const fallbackMovies = {
  English: [
    { id: 1, title: 'Oppenheimer', duration: '180 min', rating: '8.3', poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg' },
    { id: 2, title: 'The Exorcist', duration: '122 min', rating: '9.0', poster: 'https://upload.wikimedia.org/wikipedia/en/d/d9/The_Exorcist_ver1.jpg' },
    { id: 3, title: 'Jockey', duration: '106 min', rating: '7.1', poster: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Jockey_film_poster.jpg' },
    { id: 4, title: 'White Bird', duration: '136 min', rating: '8.7', poster: 'https://upload.wikimedia.org/wikipedia/en/2/24/White_Bird_2025_film_poster.jpg' },
  ],
  Hindi: [
    { id: 5, title: 'Dangal', duration: '161 min', rating: '8.4', poster: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg' },
    { id: 6, title: '3 Idiots', duration: '170 min', rating: '8.4', poster: 'https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
    { id: 7, title: 'Lagaan', duration: '224 min', rating: '8.1', poster: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
    { id: 8, title: 'Taare Zameen Par', duration: '165 min', rating: '8.4', poster: 'https://m.media-amazon.com/images/M/MV5BMDhjZWViN2MtNzgxOS00NmI4LThiZDQtNDhlNmFiYmEwYmFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
  ],
  Kannada: [
    { id: 9, title: 'KGF: Chapter 2', duration: '168 min', rating: '8.2', poster: 'https://m.media-amazon.com/images/M/MV5BMjMwMDgyOGQtMWZjNC00MDUwLTllZDYtZDM3YzM1N2Q1MmI4XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg' },
    { id: 10, title: 'Kantara', duration: '148 min', rating: '8.3', poster: 'https://m.media-amazon.com/images/M/MV5BN2IwYzI4YmYtNTI3ZS00NGM5LTllMDktNjA2ZmY1MWM4MGY3XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_.jpg' },
    { id: 11, title: 'Vikrant Rona', duration: '142 min', rating: '7.5', poster: 'https://m.media-amazon.com/images/M/MV5BZDU2YzU2YzUtYzY2ZC00YjY3LWE3YzItYjY3YzY3YzY3YzY3XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg' },
  ],
  Tamil: [
    { id: 12, title: 'Baahubali 2', duration: '167 min', rating: '8.2', poster: 'https://m.media-amazon.com/images/M/MV5BYmJhM2E4YzAtY2NhZC00YjY3LWE3YzItYjY3YzY3YzY3YzY3XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg' },
    { id: 13, title: 'Vikram', duration: '175 min', rating: '8.4', poster: 'https://m.media-amazon.com/images/M/MV5BZDU2YzU2YzUtYzY2ZC00YjY3LWE3YzItYjY3YzY3YzY3YzY3XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg' },
    { id: 14, title: 'Ponniyin Selvan', duration: '164 min', rating: '7.8', poster: 'https://m.media-amazon.com/images/M/MV5BZDU2YzU2YzUtYzY2ZC00YjY3LWE3YzItYjY3YzY3YzY3YzY3XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg' },
  ],
  Telugu: [
    { id: 15, title: 'RRR', duration: '182 min', rating: '8.0', poster: 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyNjEtYWYzYzY2YzY3YzY3XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg' },
    { id: 16, title: 'Pushpa', duration: '179 min', rating: '7.6', poster: 'https://m.media-amazon.com/images/M/MV5BZDU2YzU2YzUtYzY2ZC00YjY3LWE3YzItYjY3YzY3YzY3YzY3XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg' },
    { id: 17, title: 'Baahubali', duration: '159 min', rating: '8.1', poster: 'https://m.media-amazon.com/images/M/MV5BZDU2YzU2YzUtYzY2ZC00YjY3LWE3YzItYjY3YzY3YzY3YzY3XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg' },
  ],
}

// Transform TMDb movie to our format
const transformMovie = (tmdbMovie) => {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title || tmdbMovie.original_title,
    duration: tmdbMovie.runtime ? `${tmdbMovie.runtime} min` : 'N/A',
    rating: tmdbMovie.vote_average ? tmdbMovie.vote_average.toFixed(1) : 'N/A',
    poster: tmdbMovie.poster_path 
      ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}`
      : 'https://via.placeholder.com/300x450?text=No+Poster',
    overview: tmdbMovie.overview || '',
    releaseDate: tmdbMovie.release_date || '',
  }
}

export const getMoviesByLanguage = async (req, res) => {
  try {
    const { language } = req.query

    if (!language) {
      return res.status(400).json({ error: 'Language parameter is required' })
    }

    // If no API key, return fallback movies
    if (!TMDB_API_KEY) {
      const fallback = fallbackMovies[language] || []
      return res.json({ 
        movies: fallback,
        source: 'fallback',
        message: 'Using fallback data. Add TMDB_API_KEY to .env for real-time movie data.'
      })
    }

    const langConfig = languageRegionMap[language]
    if (!langConfig) {
      // Return fallback for invalid language
      const fallback = fallbackMovies[language] || []
      return res.json({ 
        movies: fallback,
        source: 'fallback',
        message: 'Invalid language, using fallback data.'
      })
    }

    try {
      // Fetch popular movies for the language/region
      const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=${langConfig.language}&region=${langConfig.region}&sort_by=popularity.desc&page=1&with_original_language=${langConfig.language}`

      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.results || data.results.length === 0) {
        throw new Error('No movies found from TMDb')
      }

      const movies = data.results.slice(0, 20).map(transformMovie)

      return res.json({ 
        movies,
        source: 'tmdb',
        total: data.total_results || 0
      })
    } catch (apiError) {
      console.error('TMDb API error:', apiError)
      // Fall through to return fallback movies
      throw apiError
    }
  } catch (error) {
    console.error('Error fetching movies:', error)
    
    // Always return fallback on error - never return 500
    const language = req.query?.language || 'English'
    const fallback = fallbackMovies[language] || fallbackMovies['English'] || []
    
    return res.json({ 
      movies: fallback,
      source: 'fallback',
      error: error.message || 'Unknown error occurred'
    })
  }
}

export const getPopularMovies = async (req, res) => {
  try {
    const { language = 'en' } = req.query

    if (!TMDB_API_KEY) {
      return res.json({ 
        movies: [],
        source: 'fallback',
        message: 'Add TMDB_API_KEY to .env for real-time movie data.'
      })
    }

    try {
      const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=${language}&page=1`

      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.results || data.results.length === 0) {
        return res.json({ 
          movies: [],
          source: 'fallback',
          message: 'No movies found from TMDb'
        })
      }

      const movies = data.results.slice(0, 20).map(transformMovie)

      return res.json({ 
        movies,
        source: 'tmdb',
        total: data.total_results || 0
      })
    } catch (apiError) {
      console.error('TMDb API error:', apiError)
      return res.json({ 
        movies: [],
        source: 'fallback',
        error: apiError.message
      })
    }
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return res.json({ 
      movies: [],
      source: 'fallback',
      error: error.message || 'Unknown error occurred'
    })
  }
}

