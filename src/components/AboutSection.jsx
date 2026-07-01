import React from 'react';

export default function AboutSection() {
  const cards = [
    {
      title: "도심 속 온실 연구소",
      desc: "그리너리는 바쁜 도심 한가운데에서 싱그러운 에너지를 나누는 온실 스튜디오입니다. 자체 생육 연구를 통해 아파트나 빌라 등 실내 공간에서도 건강하게 키울 수 있는 튼튼한 개체만을 선별하여 제안합니다.",
      emoji: "🏡"
    },
    {
      title: "지속 가능한 플랜테리어",
      desc: "단순히 예쁜 식물을 가져가는 것을 넘어, 각 식물과 사람의 건강한 공존을 생각합니다. 친환경 생분해 토분, 유기농 흙과 영양제 배합 등 가드닝에 필요한 사소한 부자재 하나까지 지구를 생각합니다.",
      emoji: "♻️"
    },
    {
      title: "1:1 평생 사후 가이드",
      desc: "그리너리에서 분양 받으신 모든 반려 식물은 전용 D-day 메이트와 1:1 케어 게시판을 통해 언제든 병충해나 물주기 상태를 진단 받으실 수 있습니다. 여러분의 식집사 생활이 실패하지 않도록 평생 케어해 드립니다.",
      emoji: "🤝"
    }
  ];

  return (
    <section id="about-greenery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Grid container */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
        {/* Left Side: Photo/Graphic Frame */}
        <div className="relative group overflow-hidden rounded-3xl bg-ivory aspect-video lg:aspect-[4/3] border border-ivory-dark/40 shadow-lg">
          <img 
            src="/images/hero_bg.png" 
            alt="그리너리 브랜드 온실"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-forest/20 mix-blend-multiply" />
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-cream/90 backdrop-blur-sm border border-ivory-dark/20 text-left shadow-md">
            <span className="font-serif italic text-forest text-xs font-bold block mb-1">Our Studio Space</span>
            <h4 className="font-serif text-charcoal font-bold text-base">그리너리 서초 플래그십 스토어</h4>
            <p className="text-xs text-warm-gray mt-1 leading-normal font-light">
              도심 속 콘크리트 빌딩 숲 사이에 위치한 그리너리 쇼룸. 약 300여 종의 다양한 희귀식물과 식물 큐레이션을 직접 만나볼 수 있는 오아시스 공간입니다.
            </p>
          </div>
        </div>

        {/* Right Side: Text & Features */}
        <div className="flex flex-col text-left">
          <span className="font-serif italic text-forest text-sm font-bold tracking-widest uppercase mb-2">
            Greenery's Philosophy
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            도심 속 나만의 작은 식물원
          </h2>
          <div className="h-1 w-12 bg-forest rounded-full mt-3 mb-6" />
          
          <p className="text-sm text-charcoal/80 leading-relaxed font-light mb-8">
            그리너리는 지친 현대인들이 삭막한 일상 속에서 자신만의 초록 메이트를 찾고, 식물을 돌보는 매일의 리츄얼을 통해 마음을 가꾸는 힐링 가드닝 커뮤니티입니다. 화분 하나가 주는 공기 정화 이상의 평온과 호흡을 선물합니다.
          </p>

          {/* Core Values Grid */}
          <div className="space-y-6">
            {cards.map((card, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 border border-forest/10 text-xl">
                  {card.emoji}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-charcoal">{card.title}</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed mt-1 font-light">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
