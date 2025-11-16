// Quick test script to verify movie controller works
import dotenv from 'dotenv'

dotenv.config()

const testLanguage = 'English'
const testUrl = `http://localhost:5000/api/movies?language=${encodeURIComponent(testLanguage)}`

console.log('Testing movie API endpoint...')
console.log(`URL: ${testUrl}`)

try {
  const response = await fetch(testUrl)
  const data = await response.json()
  
  console.log('\n✅ Response received:')
  console.log(`Status: ${response.status}`)
  console.log(`Source: ${data.source}`)
  console.log(`Movies count: ${data.movies?.length || 0}`)
  
  if (data.movies && data.movies.length > 0) {
    console.log('\n📽️ First movie:')
    console.log(JSON.stringify(data.movies[0], null, 2))
  }
  
  if (data.error) {
    console.log(`\n⚠️ Error: ${data.error}`)
  }
  
  if (data.message) {
    console.log(`\nℹ️ Message: ${data.message}`)
  }
} catch (error) {
  console.error('\n❌ Error:', error.message)
  console.log('\nMake sure the backend server is running:')
  console.log('  cd backend && npm start')
}

