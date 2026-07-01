import React from 'react';

export default function PlantCard({ plant, onSelect, onAddToCart }) {
  // Difficulty levels localized and styled
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
            난이도: 하 🌱
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/20">
            난이도: 중 🌿
          </span>
        );
      case 'hard':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/20">
            난이도: 상 🌳
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-cream border border-ivory-dark/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Plant Image Container */}
      <div 
        onClick={() => onSelect(plant)}
        className="aspect-square w-full overflow-hidden bg-ivory cursor-pointer relative"
      >
        <img
          src={plant.image}
          alt={plant.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        
        {/* Quick Tags overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {plant.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="bg-forest/80 text-cream text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        {/* Name and Scientific Name */}
        <div className="mb-2 cursor-pointer" onClick={() => onSelect(plant)}>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-forest transition-colors">
              {plant.name}
            </h3>
            {getDifficultyBadge(plant.difficulty)}
          </div>
          <p className="mt-1 text-xs italic text-warm-gray">
            {plant.scientificName}
          </p>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-charcoal/70 line-clamp-2 mb-4 flex-1">
          {plant.description}
        </p>

        {/* Footer: Price & Actions */}
        <div className="flex items-center justify-between border-t border-ivory-dark/20 pt-4 mt-auto">
          <div>
            <span className="text-xs text-warm-gray block">분양가</span>
            <span className="font-bold text-charcoal text-base">
              ₩{plant.price.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Care Guide button */}
            <button
              onClick={() => onSelect(plant)}
              className="text-xs font-semibold px-3 py-2 rounded-lg text-olive border border-olive-light/30 hover:bg-olive/10 hover:text-olive-dark transition-all"
            >
              가이드
            </button>

            {/* Add to Cart button */}
            <button
              onClick={() => onAddToCart(plant)}
              className="p-2 rounded-lg bg-forest hover:bg-forest-light text-cream shadow-sm hover:shadow-md transition-all duration-200"
              title="장바구니에 담기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
