import React from 'react';

export default function HeroSection() {
  const handleScrollToPlants = () => {
    const element = document.getElementById('plant-menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-forest-dark py-20 text-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-overlay"
        style={{ backgroundImage: `url('/images/hero_bg.png')` }}
      />
      
      {/* Soft color gradient overlay to make text highly readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-transparent to-transparent opacity-80" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <span className="mb-3 font-serif italic text-sage-light text-lg md:text-xl tracking-wider animate-fade-in">
          Urban Oasis, Greenery
        </span>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-cream sm:text-5xl lg:text-6xl leading-tight md:leading-snug max-w-3xl mb-6 animate-slide-up">
          당신의 공간에 <br className="sm:hidden" />
          <span className="text-sage-light">초록빛 숨결</span>을 불어넣으세요
        </h1>
        <p className="mx-auto max-w-2xl text-base md:text-lg text-cream/80 mb-10 leading-relaxed animate-slide-up font-light">
          지친 일상에 편안한 휴식을 주는 나만의 반려 식물.<br/>
          초보자를 위한 이지 플랜트부터 난이도별 가이드와 D-day 물주기 도우미까지,<br/>
          그리너리가 당신의 행복한 식집사 여정을 함께합니다.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <button
            onClick={handleScrollToPlants}
            className="group flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-3.5 text-base font-semibold text-forest shadow-lg hover:bg-forest-light hover:text-cream hover:shadow-forest/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            반려 식물 입양하기
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              stroke="currentColor" 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              const element = document.getElementById('plant-mbti');
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="flex items-center justify-center rounded-full border border-cream/40 bg-transparent px-8 py-3.5 text-base font-semibold text-cream hover:bg-cream/10 transition-all duration-300"
          >
            내 맞춤식물 찾기 (MBTI)
          </button>
        </div>
      </div>
      
      {/* Decorative wave at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory to-transparent pointer-events-none" />
    </section>
  );
}
