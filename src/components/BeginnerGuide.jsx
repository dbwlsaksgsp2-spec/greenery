import React from 'react';

export default function BeginnerGuide() {
  const steps = [
    {
      step: "01",
      title: "내 공간의 햇빛 측정하기",
      desc: "하루에 햇빛이 직접적으로 들어오는 시간이 몇 시간인지 확인하세요. 남향(6시간 이상), 동/서향(2~4시간), 북향(거의 안 들어옴)에 따라 선택해야 할 식물이 다릅니다.",
      emoji: "☀️"
    },
    {
      step: "02",
      title: "가장 쉬운 식물로 시작하기",
      desc: "몬스테라, 스투키, 스킨답서스 같은 강인한 생명력을 지닌 '하' 난이도 식물부터 시작해 보세요. 작은 성공들이 훌륭한 가드닝 지식으로 축적됩니다.",
      emoji: "🌱"
    },
    {
      step: "03",
      title: "물주기의 핵심은 '겉흙 확인'",
      desc: "캘린더에 적힌 '일주일에 한 번'은 평균적인 가이드일 뿐입니다. 가장 정확한 것은 손가락 한 마디를 흙에 찔러보아 흙이 바짝 말라 있을 때 한 번에 듬뿍 주는 것입니다.",
      emoji: "💧"
    },
    {
      step: "04",
      title: "식물도 숨을 쉽니다, 통풍 필수",
      desc: "많은 초보 집사들이 물주기보다 놓치기 쉬운 것이 바로 '통풍'입니다. 바람이 통하지 않으면 과습이 오고 곰팡이가 생기기 쉬우니 하루 한 번 창문을 열어 환기해 주세요.",
      emoji: "💨"
    }
  ];

  const tips = [
    {
      title: "과습(Overwatering) 구별법",
      desc: "잎이 노랗게 변하고 축 처지거나, 화분 흙 주변에서 쾌쾌한 냄새가 나고 날파리가 날아다닌다면 과습 신호입니다. 즉시 물주기를 중단하고 통풍이 잘되는 그늘로 화분을 옮기세요.",
      icon: "⚠️"
    },
    {
      title: "물주는 골든 타임",
      desc: "한여름에는 해가 뜨거운 한낮에 물을 주면 흙 속 온도가 올라가 뿌리가 삶아질 수 있습니다. 아침 일찍 혹은 해가 진 저녁에 온도가 내려갔을 때 미지근한 물을 주는 것이 이상적입니다.",
      icon: "⏰"
    },
    {
      title: "공중 습도 높이기",
      desc: "대다수 열대 관엽식물은 건조한 아파트 환경을 힘들어합니다. 분무기를 이용하여 잎 주변 공기에 가볍게 물을 뿌려주거나, 가습기를 틀어 공기 습도를 50~60%로 높여주면 윤기가 납니다.",
      icon: "🌫️"
    }
  ];

  return (
    <section id="beginner-guide" className="bg-cream/40 py-20 border-y border-ivory-dark/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center mb-16">
          <span className="font-serif italic text-forest text-sm md:text-base tracking-widest uppercase block mb-2">
            Beginner's Handbook
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            초보 식집사 성장 가이드
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 bg-forest rounded-full" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-warm-gray">
            식물을 죽이는 원인의 90%는 잘못된 물주기와 통풍입니다.<br/>
            그리너리가 제안하는 4단계 기본 수칙으로 행복한 식집사 라이프를 시작해보세요.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {steps.map((item, index) => (
            <div 
              key={index}
              className="relative flex flex-col justify-between rounded-2xl bg-cream border border-ivory-dark/30 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold font-serif text-olive/30">{item.step}</span>
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Tip Cards */}
        <div className="rounded-3xl bg-forest/5 border border-forest/10 p-8 md:p-12">
          <h3 className="font-serif text-2xl font-bold text-forest mb-8 text-center md:text-left">
            💡 식집사 실전 꿀팁
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tip.icon}</span>
                  <h4 className="font-serif text-base font-bold text-charcoal">{tip.title}</h4>
                </div>
                <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
