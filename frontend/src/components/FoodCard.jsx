function FoodCard({ food, isSelected, onToggle }) {
  return (
    <button
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      className={`relative bg-netflix-gray rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:ring-offset-2 focus:ring-offset-netflix-black ${
        isSelected
          ? 'bg-red-600/80 ring-4 ring-red-400/40 shadow-lg scale-105'
          : 'hover:ring-2 hover:ring-red-400/40'
      }`}
      aria-label={`${food.name} - ₹${food.price}${isSelected ? ' (selected)' : ''}`}
      aria-pressed={isSelected}
    >
      <div className="relative">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-netflix-red rounded-full p-2 shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{food.name}</h3>
        <p className="text-netflix-red font-semibold">₹{food.price}</p>
      </div>
    </button>
  )
}

export default FoodCard

