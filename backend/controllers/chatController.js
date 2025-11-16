import OpenAI from 'openai'

// Initialize OpenAI client (will use mock if API key not provided)
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

// Mock movie database for recommendations
const movieDatabase = {
  action: ['Inception', 'The Dark Knight', 'Interstellar', 'The Matrix', 'RRR', 'KGF: Chapter 2', 'Vikram'],
  comedy: ['3 Idiots', 'Taare Zameen Par', 'Pushpa'],
  drama: ['Dangal', 'Lagaan', 'Baahubali', 'Ponniyin Selvan'],
  thriller: ['Vikram', 'Vikrant Rona', 'The Dark Knight'],
  sciFi: ['Inception', 'Interstellar', 'The Matrix'],
  romance: ['Baahubali 2', 'Ponniyin Selvan'],
  adventure: ['RRR', 'KGF: Chapter 2', 'Baahubali', 'Interstellar'],
}

const extractKeywords = (message) => {
  const lowerMessage = message.toLowerCase()
  const keywords = []
  
  Object.keys(movieDatabase).forEach(genre => {
    if (lowerMessage.includes(genre)) {
      keywords.push(genre)
    }
  })
  
  // Check for common movie-related terms
  if (lowerMessage.includes('action') || lowerMessage.includes('fight') || lowerMessage.includes('thriller')) {
    keywords.push('action', 'thriller')
  }
  if (lowerMessage.includes('funny') || lowerMessage.includes('comedy') || lowerMessage.includes('laugh')) {
    keywords.push('comedy')
  }
  if (lowerMessage.includes('drama') || lowerMessage.includes('emotional') || lowerMessage.includes('story')) {
    keywords.push('drama')
  }
  if (lowerMessage.includes('sci') || lowerMessage.includes('space') || lowerMessage.includes('future')) {
    keywords.push('sciFi')
  }
  if (lowerMessage.includes('adventure') || lowerMessage.includes('epic') || lowerMessage.includes('journey')) {
    keywords.push('adventure')
  }
  
  return [...new Set(keywords)]
}

const getRecommendations = (keywords) => {
  if (keywords.length === 0) {
    // Return popular movies if no specific keywords
    return ['Inception', 'The Dark Knight', 'Dangal', 'RRR', 'KGF: Chapter 2']
  }
  
  const recommendations = new Set()
  keywords.forEach(keyword => {
    if (movieDatabase[keyword]) {
      movieDatabase[keyword].forEach(movie => recommendations.add(movie))
    }
  })
  
  return Array.from(recommendations).slice(0, 5)
}

export const chatController = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    let reply = ''
    let recommendations = []

    if (openai) {
      // Use OpenAI API if available
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful movie recommendation assistant. Provide brief, friendly recommendations for movies. Keep responses under 150 words.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
        })

        reply = completion.choices[0].message.content
      } catch (error) {
        console.error('OpenAI API error:', error)
        // Fall back to mock response
        reply = generateMockResponse(message)
      }
    } else {
      // Use mock AI response
      reply = generateMockResponse(message)
    }

    // Extract recommendations based on message
    const keywords = extractKeywords(message)
    recommendations = getRecommendations(keywords)

    res.json({
      reply,
      recommendations
    })
  } catch (error) {
    console.error('Chat controller error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      reply: 'Sorry, I encountered an error. Please try again.',
      recommendations: []
    })
  }
}

const generateMockResponse = (message) => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('action') || lowerMessage.includes('thriller') || lowerMessage.includes('fight')) {
    return "Great choice! For action movies, I'd recommend 'Inception' for mind-bending action, 'The Dark Knight' for superhero thrills, or 'RRR' and 'KGF: Chapter 2' for epic Indian action. These movies have incredible action sequences and gripping storylines!"
  }
  
  if (lowerMessage.includes('comedy') || lowerMessage.includes('funny') || lowerMessage.includes('laugh')) {
    return "For comedy, '3 Idiots' is a classic that combines humor with meaningful messages. 'Taare Zameen Par' has heartwarming moments. If you want something lighter, check out these options!"
  }
  
  if (lowerMessage.includes('drama') || lowerMessage.includes('emotional') || lowerMessage.includes('story')) {
    return "For powerful dramas, 'Dangal' tells an inspiring true story, 'Lagaan' is a sports drama masterpiece, and 'Baahubali' offers epic storytelling. These movies have strong emotional impact and great narratives!"
  }
  
  if (lowerMessage.includes('sci') || lowerMessage.includes('space') || lowerMessage.includes('future')) {
    return "For sci-fi fans, 'Interstellar' is a mind-bending space epic, 'Inception' explores dreams and reality, and 'The Matrix' is a classic sci-fi action film. These are must-watch for science fiction enthusiasts!"
  }
  
  if (lowerMessage.includes('adventure') || lowerMessage.includes('epic') || lowerMessage.includes('journey')) {
    return "For epic adventures, 'RRR' is a grand spectacle, 'KGF: Chapter 2' offers intense action, 'Baahubali' is a cinematic masterpiece, and 'Interstellar' takes you on a cosmic journey. These movies are visual treats!"
  }
  
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('best')) {
    return "Based on popular choices, I'd recommend 'Inception' for mind-bending action, 'The Dark Knight' for superhero excellence, 'Dangal' for inspiring drama, 'RRR' for epic Indian cinema, and 'KGF: Chapter 2' for intense action. What genre interests you most?"
  }
  
  // Default response
  return "I'd be happy to help you find the perfect movie! We have great options across genres - action, comedy, drama, sci-fi, and more. What type of movie are you in the mood for? I can suggest specific titles based on your preferences!"
}

