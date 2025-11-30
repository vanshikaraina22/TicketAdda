import { useState, useRef, useEffect } from 'react'

function AIChatbot({ movies }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi! I can help you find the perfect movie. Ask me anything!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage = { role: 'user', content: trimmed }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: trimmed })
      })

      if (!response.ok) {
        console.error('Chat API error status:', response.status)
        throw new Error('Non-200 response from API')
      }

      const data = await response.json()

      const assistantMessage = {
        role: 'assistant',
        content:
          data.reply ||
          "Hmm, I couldn't think of a suggestion. Try asking in a different way!",
        recommendations: data.recommendations || []
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error calling chat API:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleRecommendationClick = movieName => {
    setInput(`Tell me about ${movieName}`)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 md:w-96 bg-netflix-gray border-l border-gray-700 flex flex-col shadow-2xl z-50 hidden lg:flex">
      <div className="bg-netflix-red p-4">
        <h2 className="text-xl font-bold">AI Movie Assistant</h2>
        <p className="text-sm text-gray-200">Ask me for recommendations!</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-netflix-red text-white'
                  : 'bg-netflix-black text-gray-200'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.content}</p>

              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-2 space-y-1">
                  {msg.recommendations.map((rec, recIdx) => (
                    <button
                      key={recIdx}
                      onClick={() => handleRecommendationClick(rec)}
                      className="block w-full text-left text-xs bg-netflix-gray hover:bg-gray-600 rounded p-2 transition-colors"
                    >
                      🎬 {rec}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-netflix-black rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about movies..."
            className="flex-1 px-4 py-2 bg-netflix-black border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-6 py-2 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChatbot
