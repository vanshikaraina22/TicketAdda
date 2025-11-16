import express from 'express'
import { getMoviesByLanguage, getPopularMovies } from '../controllers/movieController.js'

const router = express.Router()

// Get movies by language
router.get('/', getMoviesByLanguage)

// Get popular movies
router.get('/popular', getPopularMovies)

export default router

