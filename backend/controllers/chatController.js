// backend/controllers/chatController.js
// Rule-based movie assistant using your 28-movie list only

// ------------------------------------
// MOVIE DATA (language + genre + details)
// ------------------------------------
const moviesByLanguage = {
  English: [
    {
      id: 1,
      title: 'Oppenheimer',
      duration: '180 min',
      rating: '8.3',
      genre: 'Biopic',
      language: 'English',
      description:
        'A biographical drama about physicist J. Robert Oppenheimer, who leads the secret Manhattan Project to build the first atomic bomb and later faces the moral consequences of his work.',
      cast: ['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.'],
    },
    {
      id: 2,
      title: 'The Exorcist',
      duration: '122 min',
      rating: '9.0',
      genre: 'Horror',
      language: 'English',
      description:
        'A young girl shows terrifying signs of demonic possession, forcing her desperate mother to turn to two priests to perform a risky exorcism.',
      cast: ['Linda Blair', 'Ellen Burstyn', 'Max von Sydow'],
    },
    {
      id: 3,
      title: 'Jockey',
      duration: '106 min',
      rating: '7.1',
      genre: 'Drama',
      language: 'English',
      description:
        'An aging jockey, whose body is failing him after decades of racing, attempts one last championship with a promising new horse and confronts a young rider who may be his son.',
      cast: ['Clifton Collins Jr.', 'Molly Parker', 'Moises Arias'],
    },
    {
      id: 4,
      title: 'White Bird',
      duration: '136 min',
      rating: '8.7',
      genre: 'Drama',
      language: 'English',
      description:
        'Julian’s grandmother shares her childhood story of surviving Nazi-occupied France, where a boy risked everything to hide and protect her from persecution.',
      cast: ['Helen Mirren', 'Gillian Anderson', 'Bryce Gheisar'],
    },
    {
      id: 5,
      title: 'Inception',
      duration: '148 min',
      rating: '9.0',
      genre: 'Sci-Fi',
      language: 'English',
      description:
        'A skilled thief who steals secrets by entering people’s dreams is offered a chance at redemption if he can plant an idea inside a target’s mind instead of stealing one.',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    },
    {
      id: 6,
      title: 'The Dark Knight',
      duration: '152 min',
      rating: '9.0',
      genre: 'Action',
      language: 'English',
      description:
        'Batman, Commissioner Gordon and Harvey Dent fight organized crime in Gotham until the Joker, a chaotic criminal mastermind, pushes them into a deadly moral struggle.',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    },
    {
      id: 7,
      title: 'Interstellar',
      duration: '169 min',
      rating: '8.6',
      genre: 'Sci-Fi',
      language: 'English',
      description:
        'On a dying Earth, a former pilot joins a team of astronauts who travel through a wormhole in search of a new habitable planet for humanity.',
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    },
    {
      id: 8,
      title: 'The Matrix',
      duration: '136 min',
      rating: '8.7',
      genre: 'Sci-Fi',
      language: 'English',
      description:
        'A hacker discovers that the reality he knows is a computer simulation controlled by machines, and he joins a group of rebels to free humanity.',
      cast: ['Keanu Reeves', 'Carrie-Anne Moss', 'Laurence Fishburne'],
    },
  ],
  Hindi: [
    {
      id: 9,
      title: 'Dangal',
      duration: '161 min',
      rating: '8.4',
      genre: 'Sports',
      language: 'Hindi',
      description:
        'Based on a true story, a former wrestler trains his daughters to become world-class wrestlers, fighting against social norms and personal struggles.',
      cast: ['Aamir Khan', 'Fatima Sana Shaikh', 'Sanya Malhotra'],
    },
    {
      id: 10,
      title: '3 Idiots',
      duration: '170 min',
      rating: '8.4',
      genre: 'Comedy',
      language: 'Hindi',
      description:
        'Two friends search for their missing college buddy and recall their engineering days with a brilliant, unconventional student who challenged the education system.',
      cast: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi', 'Kareena Kapoor'],
    },
    {
      id: 11,
      title: 'M.S. Dhoni: The Untold Story',
      duration: '184 min',
      rating: '8.1',
      genre: 'Biopic',
      language: 'Hindi',
      description:
        'A biographical drama tracing Mahendra Singh Dhoni’s journey from a small-town ticket collector to one of India’s most successful cricket captains.',
      cast: ['Sushant Singh Rajput', 'Kiara Advani', 'Disha Patani'],
    },
    {
      id: 12,
      title: 'Uri: The Surgical Strike',
      duration: '138 min',
      rating: '8.2',
      genre: 'Action',
      language: 'Hindi',
      description:
        'A dramatized account of the Indian Army’s surgical strike on terrorist launchpads across the Line of Control after a deadly attack in Uri.',
      cast: ['Vicky Kaushal', 'Yami Gautam', 'Paresh Rawal'],
    },
    {
      id: 13,
      title: 'Koi... Mil Gaya',
      duration: '166 min',
      rating: '7.9',
      genre: 'Sci-Fi',
      language: 'Hindi',
      description:
        'A developmentally delayed young man befriends a stranded alien, and the encounter transforms his life with new abilities and confidence.',
      cast: ['Hrithik Roshan', 'Preity Zinta', 'Rekha'],
    },
    {
      id: 14,
      title: 'Bajrangi Bhaijaan',
      duration: '163 min',
      rating: '8.1',
      genre: 'Drama',
      language: 'Hindi',
      description:
        'A kind-hearted devotee of Hanuman helps a mute Pakistani girl, lost in India, find her way back home across the border.',
      cast: ['Salman Khan', 'Harshaali Malhotra', 'Kareena Kapoor'],
    },
    {
      id: 15,
      title: 'Rustom',
      duration: '148 min',
      rating: '8.0',
      genre: 'Thriller',
      language: 'Hindi',
      description:
        'Inspired by real events, a decorated naval officer is tried in court for shooting his wife’s lover, leading to a sensational public trial.',
      cast: ['Akshay Kumar', 'Ileana D’Cruz', 'Esha Gupta'],
    },
    {
      id: 16,
      title: 'My Name Is Khan',
      duration: '165 min',
      rating: '8.0',
      genre: 'Drama',
      language: 'Hindi',
      description:
        'A man with Asperger’s syndrome travels across the United States to deliver a simple message to the President after being wrongly associated with terrorism.',
      cast: ['Shah Rukh Khan', 'Kajol'],
    },
  ],
  Kannada: [
    {
      id: 17,
      title: 'KGF: Chapter 2',
      duration: '168 min',
      rating: '8.2',
      genre: 'Action',
      language: 'Kannada',
      description:
        'Rocky continues his bloody rise as a feared don while protecting the Kolar Gold Fields and facing powerful enemies who want control of the mines.',
      cast: ['Yash', 'Sanjay Dutt', 'Raveena Tandon'],
    },
    {
      id: 18,
      title: 'Kantara',
      duration: '148 min',
      rating: '8.1',
      genre: 'Drama',
      language: 'Kannada',
      description:
        'Set in a coastal village, a stubborn young man becomes entangled in a land dispute and local folklore involving a powerful spirit deity.',
      cast: ['Rishab Shetty', 'Sapthami Gowda', 'Kishore'],
    },
    {
      id: 19,
      title: 'Vikrant Rona',
      duration: '142 min',
      rating: '6.9',
      genre: 'Mystery',
      language: 'Kannada',
      description:
        'A mysterious cop arrives at a remote village plagued by unexplained deaths that villagers blame on a supernatural presence.',
      cast: ['Sudeep', 'Nirup Bhandari', 'Neetha Ashok', 'Jacqueline Fernandez'],
    },
    {
      id: 20,
      title: '777 Charlie',
      duration: '164 min',
      rating: '8.7',
      genre: 'Family',
      language: 'Kannada',
      description:
        'A lonely, short-tempered man’s life changes when a playful Labrador dog named Charlie enters his world and becomes his closest companion.',
      cast: ['Rakshit Shetty', 'Sangeetha Sringeri', 'Raj B. Shetty'],
    },
  ],
  Tamil: [
    {
      id: 21,
      title: 'Baahubali 2',
      duration: '167 min',
      rating: '8.2',
      genre: 'Action',
      language: 'Tamil',
      description:
        'The epic final chapter reveals why Amarendra Baahubali was betrayed and how his son Mahendra returns to reclaim the kingdom of Mahishmati.',
      cast: ['Prabhas', 'Anushka Shetty', 'Rana Daggubati'],
    },
    {
      id: 22,
      title: 'Vikram',
      duration: '175 min',
      rating: '8.3',
      genre: 'Action',
      language: 'Tamil',
      description:
        'A covert Black Ops team hunts masked killers linked to a massive drug syndicate, while an older, seemingly retired man hides his own lethal identity.',
      cast: ['Kamal Haasan', 'Vijay Sethupathi', 'Fahadh Faasil'],
    },
    {
      id: 23,
      title: 'Ratsasan',
      duration: '152 min',
      rating: '8.3',
      genre: 'Thriller',
      language: 'Tamil',
      description:
        'An aspiring filmmaker becomes a police officer and investigates a serial killer targeting schoolgirls, leading to a tense cat-and-mouse chase.',
      cast: ['Vishnu Vishal', 'Amala Paul'],
    },
    {
      id: 24,
      title: 'Asuran',
      duration: '140 min',
      rating: '8.4',
      genre: 'Drama',
      language: 'Tamil',
      description:
        'A quiet farmer with a violent past is forced to protect his family when a clash with powerful landlords turns deadly.',
      cast: ['Dhanush', 'Manju Warrier'],
    },
  ],
  Telugu: [
    {
      id: 25,
      title: 'RRR',
      duration: '182 min',
      rating: '8.0',
      genre: 'Action',
      language: 'Telugu',
      description:
        'A fictional tale of two freedom fighters with different paths who join forces against the British Raj, filled with large-scale action and emotion.',
      cast: ['N. T. Rama Rao Jr.', 'Ram Charan', 'Alia Bhatt', 'Ajay Devgn'],
    },
    {
      id: 26,
      title: 'Pushpa',
      duration: '179 min',
      rating: '7.6',
      genre: 'Action',
      language: 'Telugu',
      description:
        'A coolie working in the red sanders smuggling syndicate climbs the ranks, making ruthless enemies while trying to claim his own identity.',
      cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil'],
    },
    {
      id: 27,
      title: 'Baahubali',
      duration: '159 min',
      rating: '8.1',
      genre: 'Action',
      language: 'Telugu',
      description:
        'A young man raised in a village discovers his royal heritage and the tragic story of his father while fighting to free his kingdom.',
      cast: ['Prabhas', 'Anushka Shetty', 'Rana Daggubati'],
    },
    {
      id: 28,
      title: 'Evaru',
      duration: '118 min',
      rating: '8.1',
      genre: 'Thriller',
      language: 'Telugu',
      description:
        'A corrupt cop investigates a murder case involving a woman who claims self-defence, but each new revelation twists the truth again.',
      cast: ['Adivi Sesh', 'Regina Cassandra', 'Naveen Chandra'],
    },
  ],
}

// Flatten with language info
const flatMovies = Object.values(moviesByLanguage).flatMap((list) => list)

// -------------------------
// Helper functions
// -------------------------

// 1) detect if message contains a specific movie title
const findMovieFromMessage = (message) => {
  const lower = message.toLowerCase()
  return flatMovies.find((m) => lower.includes(m.title.toLowerCase()))
}

// 2) detect a genre in free text
const extractGenreFromMessage = (message) => {
  const text = message.toLowerCase()

  if (text.includes('action')) return 'Action'
  if (text.includes('comedy') || text.includes('funny') || text.includes('laugh'))
    return 'Comedy'
  if (text.includes('drama') || text.includes('emotional') || text.includes('story'))
    return 'Drama'
  if (text.includes('sci') || text.includes('space') || text.includes('future'))
    return 'Sci-Fi'
  if (text.includes('thriller') || text.includes('suspense')) return 'Thriller'
  if (text.includes('horror') || text.includes('scary') || text.includes('ghost'))
    return 'Horror'
  if (text.includes('sports') || text.includes('sport')) return 'Sports'
  if (text.includes('biopic') || text.includes('based on real')) return 'Biopic'
  if (text.includes('family') || text.includes('feel good')) return 'Family'
  if (text.includes('mystery') || text.includes('detective')) return 'Mystery'

  return null
}

// 3) all movies of a specific genre (exact match across languages)
const getMoviesByGenre = (genre) => {
  const g = genre.toLowerCase()
  return flatMovies.filter((m) => m.genre.toLowerCase() === g)
}

// 4) popular fallback list (top rating)
const getPopularMovies = () => {
  const sorted = [...flatMovies].sort(
    (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
  )
  return sorted.slice(0, 5).map((m) => m.title)
}

// -------------------------
// MAIN CONTROLLER
// -------------------------

export const chatController = (req, res) => {
  try {
    const { message } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const text = message.trim()

    // 1️⃣ If user mentioned a specific movie → ONLY description, NO list
    const movie = findMovieFromMessage(text)
    if (movie) {
      const { title, genre, rating, duration, language, description, cast } = movie

      const castText =
        cast && cast.length ? cast.join(', ') : 'Cast information not available'

      const reply =
        `Here’s some info about '${title}':\n\n` +
        `• Genre: ${genre} (${language})\n` +
        `• Rating: ${rating}\n` +
        `• Duration: ${duration}\n\n` +
        `Storyline: ${description}\n\n` +
        `Main cast: ${castText}.`

      // 👉 IMPORTANT: no recommendations list when showing details
      return res.json({ reply, recommendations: [] })
    }

    // 2️⃣ If user asked for a genre like "action", "thriller", "drama"…
    const genre = extractGenreFromMessage(text)
    if (genre) {
      const moviesOfGenre = getMoviesByGenre(genre)

      if (moviesOfGenre.length > 0) {
        const recommendations = moviesOfGenre.map((m) => m.title)
        const names = recommendations.map((n) => `'${n}'`).join(', ')
        const reply = `Here are some ${genre} movies you can watch: ${names}.`
        return res.json({ reply, recommendations })
      }

      // genre found but no movies
      const fallbackRecs = getPopularMovies()
      const reply =
        `I couldn’t find any ${genre} movies in the current list, ` +
        `but here are some popular options you can try.`
      return res.json({ reply, recommendations: fallbackRecs })
    }

    // 3️⃣ No movie title + no clear genre → generic helper
    const popular = getPopularMovies()
    const reply =
      "I’d love to help you pick a movie! You can:\n" +
      "• Ask for a genre (e.g. 'action movie', 'thriller', 'sci-fi')\n" +
      "• Or type a movie name like 'Tell me about Inception' or 'Tell me about Dangal'."

    return res.json({ reply, recommendations: popular })
  } catch (error) {
    console.error('Chat controller error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      reply: 'Sorry, I encountered an error. Please try again.',
      recommendations: [],
    })
  }
}
