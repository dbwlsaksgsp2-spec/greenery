import React, { useState } from 'react';
import { mbtiQuestions, mbtiResults } from '../data/mbtiQuestions';

export default function PlantMBTI({ plants, onSelectPlant, onAddToCart }) {
  const [step, setStep] = useState('intro'); // 'intro' | 'quiz' | 'result'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // Array of characters: ['G', 'L', 'P', 'B'] etc

  const handleStart = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setStep('quiz');
  };

  const handleAnswer = (optionType) => {
    const nextAnswers = [...answers, optionType];
    setAnswers(nextAnswers);

    if (currentIndex < mbtiQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate final code
      setStep('result');
    }
  };

  const handleRestart = () => {
    setStep('intro');
  };

  // Get result code and details
  const resultKey = answers.join('');
  const resultData = mbtiResults[resultKey] || mbtiResults['GLPS']; // fallback

  // Find actual recommended plant objects
  const recommendedPlants = resultData.recommendedPlantIds.map(id => 
    plants.find(plant => plant.id === id)
  ).filter(Boolean);

  const progressPercentage = ((currentIndex) / mbtiQuestions.length) * 100;

  return (
    <section id="plant-mbti" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-cream border border-ivory-dark/30 shadow-xl overflow-hidden">
        
        {/* Header decoration */}
        <div className="bg-forest px-6 py-4 flex items-center justify-between">
          <span className="font-serif text-sm font-bold text-cream">🌿 Greenery MBTI Matching</span>
          <span className="rounded-full bg-cream/20 px-2 py-0.5 text-xs text-cream font-medium">나만의 찰떡식물 찾기</span>
        </div>

        {/* Render Intro */}
        {step === 'intro' && (
          <div className="p-8 md:p-12 text-center flex flex-col items-center">
            <span className="text-5xl mb-4">🪴</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">
              식물 MBTI 테스트
            </h2>
            <p className="mt-4 max-w-md text-sm text-warm-gray leading-relaxed font-light">
              나의 일상 습관, 취향, 환경을 바탕으로 나와 평생을 함께할 반려 식물을 찾아드려요. 4개의 간단한 질문에 답해보세요!
            </p>
            <button
              onClick={handleStart}
              className="mt-8 rounded-full bg-forest hover:bg-forest-light text-cream px-8 py-3.5 font-bold shadow-md hover:shadow-lg transition-all"
            >
              테스트 시작하기
            </button>
          </div>
        )}

        {/* Render Quiz */}
        {step === 'quiz' && (
          <div className="p-8 md:p-12">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs text-warm-gray mb-1.5 font-semibold">
                <span>질문 {currentIndex + 1} / {mbtiQuestions.length}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-ivory h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-forest h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="min-h-[100px] flex items-center justify-center text-center">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-charcoal leading-relaxed max-w-xl">
                {mbtiQuestions[currentIndex].question}
              </h3>
            </div>

            {/* Options */}
            <div className="mt-10 flex flex-col gap-4 max-w-md mx-auto">
              {mbtiQuestions[currentIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.type)}
                  className="w-full text-left rounded-2xl border border-ivory-dark/40 bg-cream p-5 text-sm md:text-base font-medium text-charcoal hover:border-forest hover:bg-forest/5 hover:text-forest transition-all"
                >
                  <span className="inline-block mr-2 text-forest/40">●</span> {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Render Result */}
        {step === 'result' && (
          <div className="p-8 md:p-12 text-center animate-fade-in">
            <span className="text-xs font-bold text-forest uppercase tracking-widest block mb-1">식물 MBTI 분석 결과</span>
            <span className="text-sm font-semibold text-warm-gray">유형 코드: {resultKey}</span>
            
            <h3 className="font-serif text-3xl font-bold text-charcoal mt-3">
              "{resultData.title}"
            </h3>
            
            <p className="mt-5 max-w-2xl mx-auto text-sm text-charcoal/80 leading-relaxed font-light bg-ivory/40 rounded-2xl p-5 border border-ivory-dark/20">
              {resultData.description}
            </p>

            {/* Recommended Plant cards list */}
            <div className="mt-10">
              <h4 className="font-serif text-lg font-bold text-charcoal mb-6 flex items-center justify-center gap-2">
                🌟 당신에게 어울리는 반려 식물
              </h4>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
                {recommendedPlants.map((plant) => (
                  <div 
                    key={plant.id}
                    className="flex flex-col bg-cream border border-ivory-dark/30 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-44 w-full overflow-hidden bg-ivory">
                      <img 
                        src={plant.image} 
                        alt={plant.name}
                        className="w-full h-full object-cover object-center" 
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="text-left mb-4">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-charcoal text-base">{plant.name}</span>
                          <span className="text-[10px] bg-forest/10 text-forest font-bold px-2 py-0.5 rounded-full">
                            ₩{plant.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-warm-gray italic">{plant.scientificName}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => onSelectPlant(plant)}
                          className="flex-1 text-center py-2 text-xs font-semibold rounded-lg bg-ivory text-charcoal border border-ivory-dark/30 hover:bg-ivory-dark/20 transition-all"
                        >
                          가이드 보기
                        </button>
                        <button
                          onClick={() => onAddToCart(plant)}
                          className="flex-1 text-center py-2 text-xs font-semibold rounded-lg bg-forest text-cream hover:bg-forest-light transition-all"
                        >
                          장바구니 담기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="mt-12 rounded-full border border-forest text-forest hover:bg-forest hover:text-cream px-8 py-3 text-sm font-semibold transition-all"
            >
              테스트 다시하기
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
