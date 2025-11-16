// server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai' // optional, used only if OPENAI_API_KEY is set

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Root route
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Movie booking backend running' })
})

// Helper: mock recommender (used if no OpenAI key)
function mockRecommend(message) {
  const m = (message || '').toLowerCase()
  if (!m) {
    return {
      reply: "Tell me what kind of movie you want (genre, mood, actor). I'll recommend.",
      recommendations: []
    }
  }
  if (m.includes('action')) {
    return { reply: 'Here are some action picks.', recommendations: ['Andhra Blaze', 'Veera'] }
  }
  if (m.includes('romance') || m.includes('love')) {
    return { reply: 'Here are romantic picks.', recommendations: ['Dil Ki Dastaan', 'Udaan'] }
  }
  if (m.includes('comedy')) {
    return { reply: 'Try these comedies.', recommendations: ['Chiguru', 'Neon City'] }
  }
  return { reply: 'Here are popular picks across languages.', recommendations: ['Starlight Odyssey', 'Rangrez', 'Marina Moon'] }
}

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  const { message } = req.body || {}

  // If an OpenAI API key is configured, use it. Otherwise fall back to the mock.
  const OPENAI_KEY = process.env.OPENAI_API_KEY

  if (!OPENAI_KEY) {
    // no key — return mock response
    const result = mockRecommend(message)
    return res.json(result)
  }

  try {
    // initialize client
    const client = new OpenAI({ apiKey: OPENAI_KEY })

    // NOTE: model names/parameters change over time. Pick a chat-capable model available to you.
    // This example uses the chat completions approach.
    const prompt = `User asked: "${message || ''}"\nGive a short reply and 3 movie recommendations (comma-separated).`
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini', // change to a model you have access to (or 'gpt-4o'/'gpt-4o-mini' etc.)
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200
    })

    const replyText = completion?.choices?.[0]?.message?.content || 'Sorry, could not generate a reply.'
    // Try to parse recommendations if the model returns them in a simple format
    // (You can refine the prompt to return JSON for easier parsing.)
    let recommendations = []
    // simple heuristic: look for lines like "Recommendations: A, B, C"
    const recMatch = replyText.match(/recommend(?:ations)?:\s*([^\n]+)/i)
    if (recMatch) {
      recommendations = recMatch[1].split(',').map(s => s.trim()).filter(Boolean)
    }

    return res.json({ reply: replyText, recommendations })
  } catch (err) {
    console.error('OpenAI error:', err?.message || err)
    // fallback to mock if OpenAI call fails
    const result = mockRecommend(message)
    return res.json({ reply: 'AI service unavailable — returning recommendations from fallback.', recommendations: result.recommendations })
  }
})

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
  if (!process.env.OPENAI_API_KEY) {
    console.log('OPENAI_API_KEY not found — /api/chat will use a mock recommender. To enable AI, set OPENAI_API_KEY in .env')
  } else {
    console.log('OpenAI configured — /api/chat will use OpenAI for responses.')
  }
})
