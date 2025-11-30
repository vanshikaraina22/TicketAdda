import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.js'
import moviesRouter from './routes/movies.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/api/chat', chatRouter)
app.use('/api/movies', moviesRouter)

app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
