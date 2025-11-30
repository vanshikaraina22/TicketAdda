import { Router } from 'express'
import { getMoviesByLanguage, getPopularMovies } from '../controllers/movieController.js'

const router = Router()

// GET /api/movies?language=English
router.get('/', getMoviesByLanguage)

// GET /api/movies/popular?language=en
router.get('/popular', getPopularMovies)

export default router
