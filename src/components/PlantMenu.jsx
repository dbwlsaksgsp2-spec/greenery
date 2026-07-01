import React, { useState, useMemo } from 'react';
import PlantCard from './PlantCard';

export default function PlantMenu({ plants, onSelectPlant, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');

  const categories = [
    { id: 'all', label: '전체보기' },
    { id: 'air-purifying', label: '공기정화 식물' },
    { id: 'interior', label: '인테리어 플랜트' },
    { id: 'beginner', label: '초보자용(키우기 쉬운)' }
  ];

  const difficulties = [
    { id: 'all', label: '모든 난이도' },
    { id: 'easy', label: '초급 🌱' },
    { id: 'medium', label: '중급 🌿' },
    { id: 'hard', label: '상급 🌳' }
  ];

  // Filtering logic
  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || plant.category.includes(activeCategory);

      // Difficulty match
      const matchesDifficulty =
        activeDifficulty === 'all' || plant.difficulty === activeDifficulty;

      return matchesCategory && matchesDifficulty;
    });
  }, [activeCategory, activeDifficulty]);

  return (
    <section id="plant-menu" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
          식물 둘러보기
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 bg-forest rounded-full" />
        <p className="mx-auto mt-4 max-w-2xl text-base text-warm-gray">
          난이도와 테마별로 구성된 그리너리의 식물들을 둘러보세요.<br className="hidden sm:inline"/>
          각 식물 카드를 클릭하면 상세한 맞춤 관리 꿀팁을 확인할 수 있습니다.
        </p>
      </div>

      {/* Filters Container */}
      <div className="mb-10 flex flex-col items-center gap-6 border-b border-ivory-dark/30 pb-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeCategory === tab.id
                  ? 'bg-forest text-cream shadow-md shadow-forest/10'
                  : 'bg-cream text-charcoal/80 border border-ivory-dark/40 hover:bg-ivory'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-warm-gray mr-1">
            난이도 필터:
          </span>
          <div className="flex bg-cream p-1 rounded-xl border border-ivory-dark/40">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setActiveDifficulty(diff.id)}
                className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                  activeDifficulty === diff.id
                    ? 'bg-olive text-cream font-semibold'
                    : 'text-charcoal/70 hover:text-charcoal hover:bg-ivory/50'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plants Grid */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onSelect={onSelectPlant}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-3xl bg-cream border border-dashed border-ivory-dark/60 max-w-lg mx-auto">
          <span className="text-4xl">🌵</span>
          <h3 className="mt-4 text-lg font-bold text-charcoal">검색된 식물이 없습니다.</h3>
          <p className="mt-2 text-sm text-warm-gray">
            다른 카테고리나 난이도 필터를 선택해 보세요.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveDifficulty('all');
            }}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-forest px-4 py-2 text-xs font-bold text-cream"
          >
            필터 초기화
          </button>
        </div>
      )}
    </section>
  );
}
