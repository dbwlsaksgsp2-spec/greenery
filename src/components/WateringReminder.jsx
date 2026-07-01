import React, { useState, useEffect } from 'react';

export default function WateringReminder({ plants }) {
  const [reminders, setReminders] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [customName, setCustomName] = useState('');
  const [lastWateredDate, setLastWateredDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('greenery_watering_reminders');
    if (saved) {
      try {
        setReminders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse watering reminders", e);
      }
    }
  }, []);

  // Save to localStorage
  const saveReminders = (newReminders) => {
    setReminders(newReminders);
    localStorage.setItem('greenery_watering_reminders', JSON.stringify(newReminders));
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!selectedPlantId) return;

    const plant = plants.find((p) => p.id === parseInt(selectedPlantId));
    if (!plant) return;

    const newReminder = {
      id: Date.now().toString(),
      plantId: plant.id,
      plantName: plant.name,
      customName: customName.trim() || plant.name,
      image: plant.image,
      lastWatered: lastWateredDate,
      intervalDays: plant.care.wateringInterval,
    };

    saveReminders([...reminders, newReminder]);
    
    // Reset Form
    setSelectedPlantId('');
    setCustomName('');
    setLastWateredDate(new Date().toISOString().substring(0, 10));
  };

  const handleDeleteReminder = (id) => {
    const filtered = reminders.filter((rem) => rem.id !== id);
    saveReminders(filtered);
  };

  // Helper to calculate D-Day
  const getDDayInfo = (reminder) => {
    const lastDate = new Date(reminder.lastWatered);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + reminder.intervalDays);
    
    // Set hours to midnight for consistent calculations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    nextDate.setHours(0, 0, 0, 0);

    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return {
        label: `D-${diffDays}`,
        desc: `${diffDays}일 뒤 물주기`,
        colorClass: 'bg-green-100 text-green-800 border-green-200',
        alert: false
      };
    } else if (diffDays === 0) {
      return {
        label: 'D-Day',
        desc: '오늘 물을 주세요! 💧',
        colorClass: 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse',
        alert: true
      };
    } else {
      const overdue = Math.abs(diffDays);
      return {
        label: `D+${overdue}`,
        desc: `${overdue}일 지연되었습니다 ⚠️`,
        colorClass: 'bg-rose-100 text-rose-800 border-rose-300',
        alert: true
      };
    }
  };

  return (
    <section id="watering-reminder" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
          물주기 D-Day 계산기
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 bg-forest rounded-full" />
        <p className="mx-auto mt-4 max-w-2xl text-base text-warm-gray">
          반려 식물들의 물주기 스케줄을 손쉽게 관리하세요.<br/>
          마지막 물 준 날짜를 기록하면 똑똑하게 D-Day를 알려드립니다. (브라우저 저장)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Form Container */}
        <div className="rounded-3xl bg-cream border border-ivory-dark/30 p-6 md:p-8 h-fit shadow-sm">
          <h3 className="font-serif text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
            🌱 새로운 식물 등록
          </h3>
          
          <form onSubmit={handleAddReminder} className="space-y-4">
            {/* Select Plant */}
            <div>
              <label htmlFor="plant-select" className="block text-xs font-semibold text-warm-gray mb-1.5">
                식물 종류 선택
              </label>
              <select
                id="plant-select"
                required
                value={selectedPlantId}
                onChange={(e) => setSelectedPlantId(e.target.value)}
                className="w-full rounded-xl border border-ivory-dark/40 bg-cream p-3 text-sm text-charcoal focus:border-forest focus:outline-none"
              >
                <option value="">식물을 선택해 주세요</option>
                {plants.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (물주기: 약 {p.care.wateringInterval}일 간격)
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Name */}
            <div>
              <label htmlFor="custom-name" className="block text-xs font-semibold text-warm-gray mb-1.5">
                식물 애칭 (생략 시 기본명 사용)
              </label>
              <input
                id="custom-name"
                type="text"
                placeholder="예: 초록이, 몬순이"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full rounded-xl border border-ivory-dark/40 bg-cream p-3 text-sm text-charcoal focus:border-forest focus:outline-none"
              />
            </div>

            {/* Last Watered Date */}
            <div>
              <label htmlFor="last-watered" className="block text-xs font-semibold text-warm-gray mb-1.5">
                마지막 물 준 날짜
              </label>
              <input
                id="last-watered"
                type="date"
                required
                value={lastWateredDate}
                onChange={(e) => setLastWateredDate(e.target.value)}
                className="w-full rounded-xl border border-ivory-dark/40 bg-cream p-3 text-sm text-charcoal focus:border-forest focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-forest hover:bg-forest-light text-cream py-3 font-semibold shadow-md hover:shadow-lg transition-all mt-2"
            >
              물주기 메이트에 추가
            </button>
          </form>
        </div>

        {/* Reminders List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-bold text-charcoal flex items-center gap-2">
              💧 나의 물주기 메이트
              <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs text-forest font-bold">
                {reminders.length}
              </span>
            </h3>
            
            {reminders.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm("모든 스케줄을 삭제하시겠습니까?")) {
                    saveReminders([]);
                  }
                }}
                className="text-xs font-semibold text-warm-gray hover:text-rose-700 transition-colors"
              >
                전체 삭제
              </button>
            )}
          </div>

          {reminders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reminders.map((rem) => {
                const dDay = getDDayInfo(rem);
                return (
                  <div
                    key={rem.id}
                    className="flex bg-cream border border-ivory-dark/30 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
                  >
                    {/* Plant Thumbnail */}
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-ivory flex-shrink-0">
                      <img
                        src={rem.image}
                        alt={rem.plantName}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Plant details */}
                    <div className="ml-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pr-6">
                          <h4 className="font-serif font-bold text-charcoal text-sm leading-tight">
                            {rem.customName}
                          </h4>
                        </div>
                        <span className="text-[10px] text-warm-gray leading-none">
                          {rem.plantName !== rem.customName && `(${rem.plantName})`} · {rem.intervalDays}일 간격
                        </span>
                      </div>
                      
                      {/* D-Day badge & last date */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="text-[10px] text-warm-gray">
                          최근 물준날: {rem.lastWatered}
                        </div>
                        <div className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${dDay.colorClass}`}>
                          {dDay.label}
                        </div>
                      </div>
                    </div>

                    {/* Delete reminder button */}
                    <button
                      onClick={() => handleDeleteReminder(rem.id)}
                      className="absolute top-2 right-2 p-1.5 text-warm-gray hover:text-rose-700 opacity-60 hover:opacity-100 transition-all rounded-full hover:bg-ivory/50"
                      title="메이트 삭제"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 rounded-3xl bg-cream/50 border border-dashed border-ivory-dark/60">
              <span className="text-4xl">💧</span>
              <h4 className="mt-4 text-sm font-bold text-charcoal">등록된 물주기 메이트가 없습니다.</h4>
              <p className="mt-2 text-xs text-warm-gray max-w-xs mx-auto">
                좌측 폼에서 기르는 반려 식물을 등록하고 겉흙이 마르는 스케줄링을 시작하세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
