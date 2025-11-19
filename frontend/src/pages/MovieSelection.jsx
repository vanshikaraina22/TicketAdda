import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AIChatbot from '../components/AIChatbot'

const movies = {
  English: [
    { id: 1, title: 'Oppenheimer', duration: '180 min', rating: '8.3', poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg' },
    { id: 2, title: 'The Exorcist', duration: '122 min', rating: '9.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrvtomyNzlkum2SGpjiuqwiq3QcHE-ua4TdEjEEA7nJR-A7HEriCjilit4GWFhkauM23sRA&s=10' },
    { id: 3, title: 'Jockey', duration: '106 min', rating: '7.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZPDYPpY9g4HO_z4svlv_P58JEYSOP2E2TKV1jfeNOCTeoamU4M-vq-pJf3qfUkaUV9Kn6w&s=10' },
    { id: 4, title: 'White Bird', duration: '136 min', rating: '8.7', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmiijtaTuCh3yLnBOQLYbNqpzmUnY1MHJyfcEYq6E8fsTPSd3HUDrX3ld4fbSiLvF0Mup4w&s=10' },
    { id: 5, title: 'Inception', duration: '148 min', rating: '9.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw&s=10' },
    { id: 6, title: 'The Dark Knight', duration: '152 min', rating: '9.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA&s=10' },
    { id: 7, title: 'Interstellar', duration: '169 min', rating: '8.6', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX&s=10' },
    { id: 8, title: 'The Matrix', duration: '136 min', rating: '8.7', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCWXVvfvZR3oe7PCMM0exwV0dObOTKvLfSM-bjvKpQ1VegKXuCtq6aBrxqbIgUNxMbfavy&s=10' },
  ],
  Hindi: [
    { id: 9, title: 'Dangal', duration: '161 min', rating: '8.4', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrAj3X3l8pHj2TRRj7XL_6dz-pzxXeM6fZfKxhESWAKXnDJUMv7rA8BwMIbJSsfSHpHWrh&s=10' },
    { id: 10, title: '3 Idiots', duration: '170 min', rating: '8.4', poster: 'https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { id: 11, title: 'M.S. Dhoni: The Untold Story', duration: '184 min', rating: '8.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbKsIE5vqB4SF-V-9Hj-psU0RmO5vBRPdoCHivHiooxI0Qug0Rrs_Vz3rl50y6WeRVDOzV_WvzJQ3Gi__nGiryhcMkpFLCh59oGUxvSQ&s=10' },
    { id: 12, title: 'Uri: The Surgical Strike', duration: '138 min', rating: '8.2', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRbHSdcu2hwzDACwEkYYTyz3HZ8b1DUQ5fQMMMCHFRoVZsSV6-f-lvS1dwUtogxAauvDVx&s=10' },
    { id: 13, title: 'Koi... Mil Gaya', duration: '166 min', rating: '7.9', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_DA0aISNHd6eWyXkKYuQJH0VW3yKIrPdvlQJrosPsSv4kL2xMc2ZnlROY2w9TljJwM6A&s=10' },
    { id: 14, title: 'Bajrangi Bhaijaan', duration: '163 min', rating: '8.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVc1_WLmhcpTuhSUtKVMTBltUP7nAoCFA6HBQhV0YXT0ZjGSrZec3UFtCOgRu3B6PBoRD&s=10' },
    { id: 15, title: 'Rustom', duration: '148 min', rating: '8.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtYIykV1RVI43AY5Nh4pE73KRjFmTXZa58hq9O4cdS7qlZSsoAg3TVabm6nfYSIkSHT1yEA&s=10' },
    { id: 16, title: 'My Name Is Khan', duration: '165 min', rating: '8.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4swi-gB89D9trD3dXqKkvOffzYuuJCzahtSjJPB6bRuTMLyRdOepxOlhUM6JsScMtlusmgg&s=10' },
  ],
  Kannada: [
    { id: 15, title: 'KGF: Chapter 2', duration: '168 min', rating: '8.2', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5Vo2OulSEXWfroqvIjx0VvYqYjVGLaUHUsfHV7laaYxIQ7qFvkQGD_eao-dt0eIM-JJHag&s=10' },
    { id: 16, title: 'Kantara', duration: '148 min', rating: '8.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlGRn9XQGPisR-C8rnctHJnPeQTXIyV43e_aBgqXL0HIq3gV0QS5_botr-EZfnA11T72JPLQ&s=10' },
    { id: 17, title: 'Vikrant Rona', duration: '142 min', rating: '6.9', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ns_PB5vLZ2Ns2ydZeapOkg8QUR81vPSaEjtrrVGlvRW0C3s5aqCYUmDSHRI46XKeePHs&s=10' },
    { id: 18, title: '777 Charlie', duration: '164 min', rating: '8.7', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbbnIXfOYAI0VyoBzmi_2FspmrtsoWvhzHsFK0ihwmnRljDXakC1UtOSr4eB8ryDHCZ3OP&s=10' },
  ],
  Tamil: [
    { id: 19, title: 'Baahubali 2', duration: '167 min', rating: '8.2', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwAZddfdsmgj84MRQyRDfNxl-swkZRxt2IQX3gnLkzHl3EEzyD3dduWibKdNCCqOTyaL3WIw&s=10' },
    { id: 20, title: 'Vikram', duration: '175 min', rating: '8.3', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVn0y7RuNHnktmebSF6Uf_bv6Ue5ZxMmrRR1I_Yz9Bvs51_P1AMV5ku8qB98PmOVTFK_oh&s=10' },
    { id: 21, title: 'Ratsasan', duration: '152 min', rating: '8.3', poster: 'https://filmfreeway-production-storage-01-connector.filmfreeway.com/attachments/files/004/172/408/original/ratsasan_ver4.jpg?1566903233' },
    { id: 22, title: 'Asuran', duration: '140 min', rating: '8.4', poster: 'https://m.media-amazon.com/images/M/MV5BYjgyMGFlNmMtYzkzNy00ZjgyLTljNTItMTg4MmNjYWE5NDM4XkEyXkFqcGc@._V1_.jpg' },
  ],
  Telugu: [
    { id: 23, title: 'RRR', duration: '182 min', rating: '8.0', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gA25hvAzvrTHQaotqRuOVJqQbWScm5Ig5dF4ctHmnF5bUjPpUFqKTHZRqrm8CwG-98ILbA&s=10' },
    { id: 24, title: 'Pushpa', duration: '179 min', rating: '7.6', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I84wCRTf0lEnJBcXKdTnHGsKUUtptPZOKjar3x9F97SbbdInBh6oQ6j9eFo6c361C5iM&s=10' },
    { id: 25, title: 'Baahubali', duration: '159 min', rating: '8.1', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrzcs9qHXc4Roze-AIsfGE-PsrHIgsnXIZku3VD_GHMuEkwn-vbJl2Rtjhae8PMHvqfdR53g&s=10' },
    { id: 26, title: 'Evaru', duration: '118 min', rating: '8.1', poster: 'https://m.media-amazon.com/images/M/MV5BOGUzNDdmYjItOWRhYS00YTlmLTgwMWYtMWRmODc0ODNlZWZjXkEyXkFqcGc@._V1_.jpg' },
  ],
}

function MovieSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    const city = localStorage.getItem('selectedCity')
    if (!user || !city) {
      navigate('/login')
    }
  }, [navigate])

  const handleBook = (movie) => {
    localStorage.setItem('selectedMovie', JSON.stringify(movie))
    navigate('/seats')
  }

  const languages = Object.keys(movies)

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
                onClick={() => setSelectedLanguage(lang)}
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
        </div>
      </div>
    </div>
  )
}

export default MovieSelection

