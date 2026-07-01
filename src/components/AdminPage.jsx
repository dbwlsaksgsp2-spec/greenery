import React, { useState, useEffect } from 'react';

export default function AdminPage({ isOpen, onClose, plants, onAddPlant, onUpdatePlant, onDeletePlant }) {
  const [activeSubTab, setActiveSubTab] = useState('inventory'); // 'inventory' | 'orders' | 'users'
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Editing state
  const [editingPlantId, setEditingPlantId] = useState(null);

  // Form states for new/edit plant
  const [newName, setNewName] = useState('');
  const [newSciName, setNewSciName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDiff, setNewDiff] = useState('easy');
  const [newSun, setNewSun] = useState('반양지 (창가 안쪽, 밝은 간접광)');
  const [newWater, setNewWater] = useState('겉흙이 마르면 충분히');
  const [newWaterInterval, setNewWaterInterval] = useState('7');
  const [newTemp, setNewTemp] = useState('18~27°C');
  const [newCategory, setNewCategory] = useState('interior');
  const [newDescription, setNewDescription] = useState('');

  // Load admin data on mount or when tab changes
  useEffect(() => {
    if (isOpen) {
      // Load users
      const usersJson = localStorage.getItem('greenery_registered_users') || '[]';
      setUsers(JSON.parse(usersJson));

      // Load orders
      const ordersJson = localStorage.getItem('greenery_orders') || '[]';
      setOrders(JSON.parse(ordersJson));
    }
  }, [isOpen, activeSubTab]);

  if (!isOpen) return null;

  // Fill form fields with selected plant data for editing
  const handleEditClick = (plant) => {
    setEditingPlantId(plant.id);
    setNewName(plant.name);
    setNewSciName(plant.scientificName);
    setNewPrice(plant.price);
    setNewDiff(plant.difficulty);
    setNewSun(plant.care.sunlight);
    setNewWater(plant.care.watering);
    setNewWaterInterval(plant.care.wateringInterval.toString());
    setNewTemp(plant.care.temperature);
    setNewCategory(plant.category[0] || 'interior');
    setNewDescription(plant.description);
  };

  const handleCancelEdit = () => {
    setEditingPlantId(null);
    clearForm();
  };

  const clearForm = () => {
    setNewName('');
    setNewSciName('');
    setNewPrice('');
    setNewDescription('');
    setNewDiff('easy');
    setNewSun('반양지 (창가 안쪽, 밝은 간접광)');
    setNewWater('겉흙이 마르면 충분히');
    setNewWaterInterval('7');
    setNewTemp('18~27°C');
    setNewCategory('interior');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    if (editingPlantId) {
      // Update logic
      const targetPlant = plants.find(p => p.id === editingPlantId);
      const updatedPlantObj = {
        ...targetPlant,
        name: newName,
        scientificName: newSciName || 'Sp.',
        price: parseInt(newPrice),
        difficulty: newDiff,
        category: [newCategory],
        description: newDescription || `${newName} 식물입니다.`,
        care: {
          ...targetPlant.care,
          sunlight: newSun,
          watering: newWater,
          wateringInterval: parseInt(newWaterInterval),
          temperature: newTemp
        }
      };

      onUpdatePlant(updatedPlantObj);
      setEditingPlantId(null);
      clearForm();
    } else {
      // Add logic
      const newPlantObj = {
        id: Date.now(),
        name: newName,
        scientificName: newSciName || 'Sp.',
        price: parseInt(newPrice),
        image: '/images/monstera.jpg', // Default fallback image
        difficulty: newDiff,
        category: [newCategory],
        description: newDescription || `${newName} 식물입니다.`,
        care: {
          sunlight: newSun,
          watering: newWater,
          wateringInterval: parseInt(newWaterInterval),
          temperature: newTemp,
          humidity: '보통',
          tip: '환기가 잘되는 곳에 두세요.'
        },
        tags: ['신규', newCategory === 'air-purifying' ? '공기정화' : '인테리어']
      };

      onAddPlant(newPlantObj);
      clearForm();
      alert("🌿 신규 식물이 대시보드에 정상적으로 등록되었습니다!");
    }
  };

  const handleApproveOrder = (orderId) => {
    const updatedOrders = orders.map((order) => 
      order.id === orderId ? { ...order, status: '승인완료' } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('greenery_orders', JSON.stringify(updatedOrders));
    alert("👍 입양 신청이 승인되었습니다!");
  };

  const handleClearOrders = () => {
    if (window.confirm("모든 입양 내역을 초기화하시겠습니까?")) {
      setOrders([]);
      localStorage.removeItem('greenery_orders');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ivory p-4 md:p-8 animate-fade-in flex justify-center">
      <div className="w-full max-w-6xl bg-cream border border-ivory-dark/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-forest text-cream flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <h3 className="font-serif text-xl font-bold">그리너리 통합 관리자 센터 (Admin Dashboard)</h3>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-cream text-forest hover:bg-forest-light hover:text-cream rounded-full text-xs font-bold transition-all shadow-md"
          >
            대시보드 닫기
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-ivory border-b border-ivory-dark/30">
          <button
            onClick={() => setActiveSubTab('inventory')}
            className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
              activeSubTab === 'inventory' ? 'border-forest text-forest bg-cream' : 'border-transparent text-warm-gray hover:text-charcoal'
            }`}
          >
            📦 식물 재고 등록/수정/삭제
          </button>
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
              activeSubTab === 'orders' ? 'border-forest text-forest bg-cream' : 'border-transparent text-warm-gray hover:text-charcoal'
            }`}
          >
            📋 가상 입양 신청 현황 ({orders.length})
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
              activeSubTab === 'users' ? 'border-forest text-forest bg-cream' : 'border-transparent text-warm-gray hover:text-charcoal'
            }`}
          >
            👥 가입 회원 목록 ({users.length + 1})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* 1. Inventory Management */}
          {activeSubTab === 'inventory' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Plant Registration Form */}
              <div className="lg:col-span-1 rounded-2xl bg-ivory/50 border border-ivory-dark/30 p-5 h-fit">
                <h4 className="font-serif font-bold text-charcoal mb-4 flex items-center gap-1.5">
                  {editingPlantId ? "✏️ 식물 상품 정보 수정" : "🌱 신규 반려 식물 추가"}
                </h4>
                
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-warm-gray mb-1">식물 이름(국명)</label>
                    <input 
                      type="text" required placeholder="예: 보스턴 고사리"
                      value={newName} onChange={e => setNewName(e.target.value)}
                      className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-warm-gray mb-1">학명(Scientific Name)</label>
                    <input 
                      type="text" placeholder="예: Nephrolepis exaltata"
                      value={newSciName} onChange={e => setNewSciName(e.target.value)}
                      className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-warm-gray mb-1">분양가 (원)</label>
                      <input 
                        type="number" required placeholder="18000"
                        value={newPrice} onChange={e => setNewPrice(e.target.value)}
                        className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-warm-gray mb-1">난이도</label>
                      <select 
                        value={newDiff} onChange={e => setNewDiff(e.target.value)}
                        className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                      >
                        <option value="easy">초급 🌱</option>
                        <option value="medium">중급 🌿</option>
                        <option value="hard">상급 🌳</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-warm-gray mb-1">카테고리</label>
                      <select 
                        value={newCategory} onChange={e => setNewCategory(e.target.value)}
                        className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                      >
                        <option value="interior">인테리어 플랜트</option>
                        <option value="air-purifying">공기정화 식물</option>
                        <option value="beginner">초보자용</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-warm-gray mb-1">물주기 주기(일)</label>
                      <input 
                        type="number" placeholder="7"
                        value={newWaterInterval} onChange={e => setNewWaterInterval(e.target.value)}
                        className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-warm-gray mb-1">☀️ 햇빛 요구량</label>
                      <input 
                        type="text" placeholder="반양지 (간접광)"
                        value={newSun} onChange={e => setNewSun(e.target.value)}
                        className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-warm-gray mb-1">🌡️ 적정 온도</label>
                      <input 
                        type="text" placeholder="18~27°C"
                        value={newTemp} onChange={e => setNewTemp(e.target.value)}
                        className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-warm-gray mb-1">💧 물주기 가이드</label>
                    <input 
                      type="text" placeholder="겉흙이 마르면 듬뿍"
                      value={newWater} onChange={e => setNewWater(e.target.value)}
                      className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-warm-gray mb-1">설명 및 소개</label>
                    <textarea 
                      placeholder="식물에 대한 소개글을 적어주세요." rows="2"
                      value={newDescription} onChange={e => setNewDescription(e.target.value)}
                      className="w-full rounded-lg border border-ivory-dark/40 bg-cream p-2 text-xs text-charcoal focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    {editingPlantId && (
                      <button 
                        type="button" onClick={handleCancelEdit}
                        className="flex-1 border border-warm-gray text-warm-gray rounded-full py-2.5 text-xs font-bold transition-all"
                      >
                        취소
                      </button>
                    )}
                    <button 
                      type="submit"
                      className="flex-[2] bg-forest hover:bg-forest-light text-cream rounded-full py-2.5 text-xs font-bold transition-all shadow-md"
                    >
                      {editingPlantId ? "식물 정보 수정 완료" : "대시보드 식물 등록"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Plant Inventory List Table */}
              <div className="lg:col-span-2 overflow-x-auto">
                <h4 className="font-serif font-bold text-charcoal mb-4 flex items-center gap-1">
                  📦 등록된 식물 목록 ({plants.length})
                </h4>
                
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-ivory border-b border-ivory-dark/30 text-warm-gray font-bold">
                      <th className="p-3">식물명</th>
                      <th className="p-3">학명</th>
                      <th className="p-3">분양가격</th>
                      <th className="p-3">난이도</th>
                      <th className="p-3 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plants.map((plant) => (
                      <tr 
                        key={plant.id} 
                        className={`border-b border-ivory-dark/20 hover:bg-ivory/30 ${
                          editingPlantId === plant.id ? 'bg-forest/5 font-semibold' : ''
                        }`}
                      >
                        <td className="p-3 font-semibold text-charcoal">{plant.name}</td>
                        <td className="p-3 text-warm-gray italic">{plant.scientificName}</td>
                        <td className="p-3 font-bold text-charcoal">₩{plant.price.toLocaleString()}</td>
                        <td className="p-3">
                          {plant.difficulty === 'easy' ? '초급🌱' : plant.difficulty === 'medium' ? '중급🌿' : '상급🌳'}
                        </td>
                        <td className="p-3 text-center flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleEditClick(plant)}
                            className="text-[11px] font-bold text-forest bg-green-50 border border-green-200 px-2.5 py-1 rounded hover:bg-green-100 transition-colors"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`"${plant.name}" 식물을 삭제하시겠습니까?`)) {
                                if (editingPlantId === plant.id) {
                                  setEditingPlantId(null);
                                  clearForm();
                                }
                                onDeletePlant(plant.id);
                              }
                            }}
                            className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded hover:bg-rose-100 transition-colors"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* 2. Virtual Adoption Orders */}
          {activeSubTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-bold text-charcoal flex items-center gap-1">
                  📋 접수된 가상 분양 신청 목록 ({orders.length})
                </h4>
                {orders.length > 0 && (
                  <button
                    onClick={handleClearOrders}
                    className="text-xs font-semibold text-rose-700 hover:underline"
                  >
                    분양 내역 전체 비우기
                  </button>
                )}
              </div>

              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-ivory border-b border-ivory-dark/30 text-warm-gray font-bold">
                        <th className="p-3">주문 ID</th>
                        <th className="p-3">신청자 (닉네임)</th>
                        <th className="p-3">분양 식물 목록</th>
                        <th className="p-3">총 결제액</th>
                        <th className="p-3">신청 일시</th>
                        <th className="p-3">상태</th>
                        <th className="p-3 text-center">승인</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-ivory-dark/20 hover:bg-ivory/30">
                          <td className="p-3 text-warm-gray">{order.id}</td>
                          <td className="p-3 font-semibold text-charcoal">{order.buyer}</td>
                          <td className="p-3 text-charcoal">
                            {order.items.map(item => `${item.name} (${item.quantity}개)`).join(', ')}
                          </td>
                          <td className="p-3 font-bold text-charcoal">₩{order.totalAmount.toLocaleString()}</td>
                          <td className="p-3 text-warm-gray">{new Date(order.date).toLocaleString()}</td>
                          <td className="p-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              order.status === '대기중' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            {order.status === '대기중' ? (
                              <button
                                onClick={() => handleApproveOrder(order.id)}
                                className="text-[11px] font-bold text-forest bg-green-50 border border-green-200 px-2 py-1 rounded hover:bg-green-100 transition-colors"
                              >
                                입양 승인
                              </button>
                            ) : (
                              <span className="text-[10px] text-warm-gray font-semibold">완료됨</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-20 rounded-3xl bg-ivory/30 border border-dashed border-ivory-dark/60 max-w-md mx-auto">
                  <span className="text-4xl text-warm-gray">📋</span>
                  <h4 className="mt-4 text-sm font-bold text-charcoal">접수된 분양 내역이 없습니다.</h4>
                  <p className="mt-2 text-xs text-warm-gray">
                    장바구니에서 가상 입양 신청서를 작성하면 이곳에 등록됩니다.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 3. Registered Users */}
          {activeSubTab === 'users' && (
            <div>
              <h4 className="font-serif font-bold text-charcoal mb-4 flex items-center gap-1">
                👥 등록된 회원 프로필 리스트 ({users.length + 1})
              </h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-ivory border-b border-ivory-dark/30 text-warm-gray font-bold">
                      <th className="p-3">식집사 닉네임</th>
                      <th className="p-3">이메일 주소</th>
                      <th className="p-3">선호 식물 분류</th>
                      <th className="p-3">가입 상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Default Demo Admin */}
                    <tr className="border-b border-ivory-dark/20 bg-forest/5 font-semibold">
                      <td className="p-3 text-forest">그리너리 최고관리자 👑</td>
                      <td className="p-3 text-forest">admin@greenery.co.kr</td>
                      <td className="p-3 text-forest">전체 마스터 🔑</td>
                      <td className="p-3"><span className="text-[10px] font-bold bg-forest text-cream px-2 py-0.5 rounded-full">SYSTEM</span></td>
                    </tr>
                    {/* Default Demo User */}
                    <tr className="border-b border-ivory-dark/20">
                      <td className="p-3 font-semibold text-charcoal">초록집사</td>
                      <td className="p-3 text-warm-gray">test@greenery.co.kr</td>
                      <td className="p-3 text-charcoal">인테리어 플랜트 🪴</td>
                      <td className="p-3"><span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">ACTIVE</span></td>
                    </tr>
                    {/* Registered users */}
                    {users.map((u, i) => (
                      <tr key={i} className="border-b border-ivory-dark/20 hover:bg-ivory/30">
                        <td className="p-3 font-semibold text-charcoal">{u.nickname}</td>
                        <td className="p-3 text-warm-gray">{u.email}</td>
                        <td className="p-3 text-charcoal">
                          {u.preference === 'air-purifying' ? '공기정화 식물 🌬️' :
                           u.preference === 'interior' ? '인테리어 플랜트 🪴' :
                           u.preference === 'beginner' ? '키우기 쉬운 식물 🌱' :
                           '희귀/수집가용 식물 🦄'}
                        </td>
                        <td className="p-3"><span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">ACTIVE</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
