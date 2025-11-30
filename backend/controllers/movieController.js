// backend/controllers/movieController.js
// Movie Controller - Handles movie API requests
// Uses TMDb API (The Movie Database) - Free tier available

// If you're on Node < 18, install node-fetch:
// npm install node-fetch
import fetch from 'node-fetch'

const TMDB_API_KEY = process.env.TMDB_API_KEY || ''
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

// Language to region mapping for better results
const languageRegionMap = {
  English: { language: 'en', region: 'US' },
  Hindi: { language: 'hi', region: 'IN' },
  Kannada: { language: 'kn', region: 'IN' },
  Tamil: { language: 'ta', region: 'IN' },
  Telugu: { language: 'te', region: 'IN' },
}

// ✅ FULL fallback movies (your complete list with genres)
const fallbackMovies = {
  English: [
    { id: 1, title: 'Oppenheimer', duration: '180 min', rating: '8.3', poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg', genre: 'Biopic' },
    { id: 2, title: 'The Exorcist', duration: '122 min', rating: '9.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrvtomyNzlkum2SGpjiuqwiq3QcHE-ua4TdEjEEA7nJR-A7HEriCjilit4GWFhkauM23sRA&s=10', genre: 'Horror' },
    { id: 3, title: 'Jockey', duration: '106 min', rating: '7.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZPDYPpY9g4HO_z4svlv_P58JEYSOP2E2TKV1jfeNOCTeoamU4M-vq-pJf3qfUkaUV9Kn6w&s=10', genre: 'Drama' },
    { id: 4, title: 'White Bird', duration: '136 min', rating: '8.7', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmiijtaTuCh3yLnBOQLYbNqpzmUnY1MHJyfcEYq6E8fsTPSd3HUDrX3ld4fbSiLvF0Mup4w&s=10', genre: 'Drama' },
    { id: 5, title: 'Inception', duration: '148 min', rating: '9.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw&s=10', genre: 'Sci-Fi' },
    { id: 6, title: 'The Dark Knight', duration: '152 min', rating: '9.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA&s=10', genre: 'Action' },
    { id: 7, title: 'Interstellar', duration: '169 min', rating: '8.6', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX&s=10', genre: 'Sci-Fi' },
    { id: 8, title: 'The Matrix', duration: '136 min', rating: '8.7', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCWXVvfvZR3oe7PCMM0exwV0dObOTKvLfSM-bjvKpQ1VegKXuCtq6aBrxqbIgUNxMbfavy&s=10', genre: 'Sci-Fi' },
  ],
  Hindi: [
    { id: 9, title: 'Dangal', duration: '161 min', rating: '8.4', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrAj3X3l8pHj2TRRj7XL_6dz-pzxXeM6fZfKxhESWAKXnDJUMv7rA8BwMIbJSsfSHpHWrh&s=10', genre: 'Sports' },
    { id: 10, title: '3 Idiots', duration: '170 min', rating: '8.4', poster: 'https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', genre: 'Comedy' },
    { id: 11, title: 'M.S. Dhoni: The Untold Story', duration: '184 min', rating: '8.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbKsIE5vqB4SF-V-9Hj-psU0RmO5vBRPdoCHivHiooxI0Qug0Rrs_Vz3rl50y6WeRVDOzV_WvzJQ3Gi__nGiryhcMkpFLCh59oGUxvSQ&s=10', genre: 'Biopic' },
    { id: 12, title: 'Uri: The Surgical Strike', duration: '138 min', rating: '8.2', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRbHSdcu2hwzDACwEkYYTyz3HZ8b1DUQ5fQMMMCHFRoVZsSV6-f-lvS1dwUtogxAauvDVx&s=10', genre: 'Action' },
    { id: 13, title: 'Koi... Mil Gaya', duration: '166 min', rating: '7.9', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_DA0aISNHd6eWyXkKYuQJH0VW3yKIrPdvlQJrosPsSv4kL2xMc2ZnlROY2w9TljJwM6A&s=10', genre: 'Sci-Fi' },
    { id: 14, title: 'Bajrangi Bhaijaan', duration: '163 min', rating: '8.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVc1_WLmhcpTuhSUtKVMTBltUP7nAoCFA6HBQhV0YXT0ZjGSrZec3UFtCOgRu3B6PBoRD&s=10', genre: 'Drama' },
    { id: 15, title: 'Rustom', duration: '148 min', rating: '8.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtYIykV1RVI43AY5Nh4pE73KRjFmTXZa58hq9O4cdS7qlZSsoAg3TVabm6nfYSIkSHT1yEA&s=10', genre: 'Thriller' },
    { id: 16, title: 'My Name Is Khan', duration: '165 min', rating: '8.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4swi-gB89D9trD3dXqKkvOffzYuuJCzahtSjJPB6bRuTMLyRdOepxOlhUM6JsScMtlusmgg&s=10', genre: 'Drama' },
  ],
  Kannada: [
    { id: 15, title: 'KGF: Chapter 2', duration: '168 min', rating: '8.2', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5Vo2OulSEXWfroqvIjx0VvYqYjVGLaUHUsfHV7laaYxIQ7qFvkQGD_eao-dt0eIM-JJHag&s=10', genre: 'Action' },
    { id: 16, title: 'Kantara', duration: '148 min', rating: '8.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlGRn9XQGPisR-C8rnctHJnPeQTXIyV43e_aBgqXL0HIq3gV0QS5_botr-EZfnA11T72JPLQ&s=10', genre: 'Drama' },
    { id: 17, title: 'Vikrant Rona', duration: '142 min', rating: '6.9', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ns_PB5vLZ2Ns2ydZeapOkg8QUR81vPSaEjtrrVGlvRW0C3s5aqCYUmDSHRI46XKeePHs&s=10', genre: 'Mystery' },
    { id: 18, title: '777 Charlie', duration: '164 min', rating: '8.7', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbbnIXfOYAI0VyoBzmi_2FspmrtsoWvhzHsFK0ihwmnRljDXakC1UtOSr4eB8ryDHCZ3OP&s=10', genre: 'Family' },
  ],
  Tamil: [
    { id: 19, title: 'Baahubali 2', duration: '167 min', rating: '8.2', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwAZddfdsmgj84MRQyRDfNxl-swkZRxt2IQX3gnLkzHl3EEzyD3dduWibKdNCCqOTyaL3WIw&s=10', genre: 'Action' },
    { id: 20, title: 'Vikram', duration: '175 min', rating: '8.3', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVn0y7RuNHnktmebSF6Uf_bv6Ue5ZxMmrRR1I_Yz9Bvs51_P1AMV5ku8qB98PmOVTFK_oh&s=10', genre: 'Action' },
    { id: 21, title: 'Ratsasan', duration: '152 min', rating: '8.3', poster: 'https://filmfreeway-production-storage-01-connector.filmfreeway.com/attachments/files/004/172/408/original/ratsasan_ver4.jpg?1566903233', genre: 'Thriller' },
    { id: 22, title: 'Asuran', duration: '140 min', rating: '8.4', poster: 'https://m.media-amazon.com/images/M/MV5BYjgyMGFlNmMtYzkzNy00ZjgyLTljNTItMTg4MmNjYWE5NDM4XkEyXkFqcGc@._V1_.jpg', genre: 'Drama' },
  ],
  Telugu: [
    { id: 23, title: 'RRR', duration: '182 min', rating: '8.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gA25hvAzvrTHQaotqRuOVJqQbWScm5Ig5dF4ctHmnF5bUjPpUFqKTHZRqrm8CwG-98ILbA&s=10', genre: 'Action' },
    { id: 24, title: 'Pushpa', duration: '179 min', rating: '7.6', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I84wCRTf0lEnJBcXKdTnHGsKUUtptPZOKjar3x9F97SbbdInBh6aQ6j9eFo6c361C5iM&s=10', genre: 'Action' },
    { id: 25, title: 'Baahubali', duration: '159 min', rating: '8.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrzcs9qHXc4Roze-AIsfGE-PsrHIgsnXIZku3VD_GHMuEkwn-vbJl2Rtjhae8PMHvqfdR53g&s=10', genre: 'Action' },
    { id: 26, title: 'Evaru', duration: '118 min', rating: '8.1', poster: 'https://m.media-amazon.com/images/M/MV5BOGUzNDdmYjItOWRhYS00YTlmLTgwMWYtMWRmODc0ODNlZWZjXkEyXkFqcGc@._V1_.jpg', genre: 'Thriller' },
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
        message: 'Using fallback data. Add TMDB_API_KEY to .env for real-time movie data.',
      })
    }

    const langConfig = languageRegionMap[language]
    if (!langConfig) {
      const fallback = fallbackMovies[language] || []
      return res.json({
        movies: fallback,
        source: 'fallback',
        message: 'Invalid language, using fallback data.',
      })
    }

    try {
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
        total: data.total_results || 0,
      })
    } catch (apiError) {
      console.error('TMDb API error:', apiError)
      throw apiError
    }
  } catch (error) {
    console.error('Error fetching movies:', error)

    const language = req.query?.language || 'English'
    const fallback = fallbackMovies[language] || fallbackMovies['English'] || []

    return res.json({
      movies: fallback,
      source: 'fallback',
      error: error.message || 'Unknown error occurred',
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
        message: 'Add TMDB_API_KEY to .env for real-time movie data.',
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
          message: 'No movies found from TMDb',
        })
      }

      const movies = data.results.slice(0, 20).map(transformMovie)

      return res.json({
        movies,
        source: 'tmdb',
        total: data.total_results || 0,
      })
    } catch (apiError) {
      console.error('TMDb API error:', apiError)
      return res.json({
        movies: [],
        source: 'fallback',
        error: apiError.message,
      })
    }
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return res.json({
      movies: [],
      source: 'fallback',
      error: error.message || 'Unknown error occurred',
    })
  }
}
