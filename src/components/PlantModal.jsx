import React from 'react';

export default function PlantModal({ plant, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !plant) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-cream shadow-2xl animate-scale-up border border-ivory-dark/40 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/80 hover:bg-cream text-charcoal shadow-md border border-ivory-dark/30 transition-transform hover:scale-105"
          aria-label="닫기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Plant Image */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full bg-ivory">
          <img
            src={plant.image}
            alt={plant.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Right Side: Plant Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh] flex flex-col justify-between">
          <div>
            {/* Tag/Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                plant.difficulty === 'easy' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' :
                plant.difficulty === 'medium' ? 'bg-amber-50 text-amber-800 ring-1 ring-amber-600/20' :
                'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
              }`}>
                {plant.difficulty === 'easy' ? '초급 난이도 🌱' :
                 plant.difficulty === 'medium' ? '중급 난이도 🌿' :
                 '상급 난이도 🌳'}
              </span>
              {plant.tags.map((tag, i) => (
                <span key={i} className="text-xs text-olive font-semibold">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Names */}
            <h3 className="font-serif text-3xl font-bold text-charcoal">{plant.name}</h3>
            <p className="mt-1 text-sm italic text-warm-gray">{plant.scientificName}</p>

            {/* Description */}
            <p className="mt-4 text-sm text-charcoal/80 leading-relaxed font-light">
              {plant.description}
            </p>

            {/* Care Guide Grid */}
            <div className="mt-6 space-y-4 border-t border-ivory-dark/30 pt-6">
              <h4 className="font-serif text-base font-bold text-charcoal">🌿 가이드 & 키우기 핵심 가이드</h4>
              
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Sunlight */}
                <div className="flex items-start gap-3 rounded-2xl bg-ivory/50 p-3.5 border border-ivory-dark/20">
                  <span className="text-xl">☀️</span>
                  <div>
                    <span className="text-xs font-semibold text-warm-gray block">햇빛</span>
                    <span className="text-xs text-charcoal/90 leading-tight block mt-0.5">{plant.care.sunlight}</span>
                  </div>
                </div>

                {/* Watering */}
                <div className="flex items-start gap-3 rounded-2xl bg-ivory/50 p-3.5 border border-ivory-dark/20">
                  <span className="text-xl">💧</span>
                  <div>
                    <span className="text-xs font-semibold text-warm-gray block">물주기</span>
                    <span className="text-xs text-charcoal/90 leading-tight block mt-0.5">권장 주기: 약 {plant.care.wateringInterval}일<br/>{plant.care.watering}</span>
                  </div>
                </div>

                {/* Temperature */}
                <div className="flex items-start gap-3 rounded-2xl bg-ivory/50 p-3.5 border border-ivory-dark/20">
                  <span className="text-xl">🌡️</span>
                  <div>
                    <span className="text-xs font-semibold text-warm-gray block">적정 온도</span>
                    <span className="text-xs text-charcoal/90 leading-tight block mt-0.5">{plant.care.temperature}</span>
                  </div>
                </div>

                {/* Humidity */}
                <div className="flex items-start gap-3 rounded-2xl bg-ivory/50 p-3.5 border border-ivory-dark/20">
                  <span className="text-xl">✨</span>
                  <div>
                    <span className="text-xs font-semibold text-warm-gray block">적정 습도</span>
                    <span className="text-xs text-charcoal/90 leading-tight block mt-0.5">{plant.care.humidity}</span>
                  </div>
                </div>
              </div>

              {/* Special Tip */}
              {plant.care.tip && (
                <div className="rounded-2xl bg-forest/5 p-4 border border-forest/10 mt-3 flex items-start gap-2.5">
                  <span className="text-forest text-lg">💡</span>
                  <p className="text-xs text-forest-dark leading-normal">
                    <strong className="font-semibold block mb-0.5">식집사 전용 Honey Tip</strong>
                    {plant.care.tip}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Price & Add to Cart Action */}
          <div className="mt-8 border-t border-ivory-dark/30 pt-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-warm-gray block">분양 가격</span>
              <span className="font-serif text-2xl font-bold text-charcoal">
                ₩{plant.price.toLocaleString()}
              </span>
            </div>
            
            <button
              onClick={() => {
                onAddToCart(plant);
                onClose();
              }}
              className="flex items-center gap-2 rounded-full bg-forest hover:bg-forest-light text-cream px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5h6.75"
                />
              </svg>
              장바구니 담기
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
