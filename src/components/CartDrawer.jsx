import React from 'react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, user }) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.plant.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Save order details to localStorage for the Admin page
    const ordersJson = localStorage.getItem('greenery_orders') || '[]';
    const orders = JSON.parse(ordersJson);

    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      buyer: user ? user.nickname : '비회원 식집사',
      items: cartItems.map(item => ({
        id: item.plant.id,
        name: item.plant.name,
        quantity: item.quantity,
        price: item.plant.price
      })),
      totalAmount: totalAmount,
      date: new Date().toISOString(),
      status: '대기중'
    };

    orders.push(newOrder);
    localStorage.setItem('greenery_orders', JSON.stringify(orders));

    alert("🎉 가상 입양 신청이 접수되었습니다!\n관리자 센터 [가상 입양 신청 현황]에서 접수 내역을 확인하고 승인받으실 수 있습니다. 🌿");
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        {/* Panel Content */}
        <div className="w-screen max-w-md bg-cream border-l border-ivory-dark/40 flex flex-col shadow-2xl h-full animate-slide-up">
          
          {/* Drawer Header */}
          <div className="px-4 py-6 bg-forest text-cream flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold flex items-center gap-2">
              🛒 나의 장바구니
              <span className="rounded-full bg-cream/20 px-2 py-0.5 text-xs text-cream font-medium">
                {cartItems.length}개 식물
              </span>
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-cream/10 text-cream transition-colors"
              aria-label="장바구니 닫기"
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
          </div>

          {/* Drawer Body (Items list) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={item.plant.id}
                  className="flex items-center bg-cream border border-ivory-dark/30 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-ivory flex-shrink-0">
                    <img
                      src={item.plant.image}
                      alt={item.plant.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Info details */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-serif font-bold text-charcoal text-sm">{item.plant.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.plant.id)}
                        className="text-xs text-warm-gray hover:text-rose-700 transition-colors"
                        title="삭제"
                      >
                        삭제
                      </button>
                    </div>
                    <span className="text-[10px] text-warm-gray block italic">
                      {item.plant.scientificName}
                    </span>
                    
                    {/* Quantity controller & Price */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center bg-ivory rounded-lg border border-ivory-dark/40 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-charcoal hover:bg-ivory-dark/20 font-bold transition-all"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs text-charcoal font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-charcoal hover:bg-ivory-dark/20 font-bold transition-all"
                        >
                          +
                        </button>
                      </div>
                      
                      <span className="font-bold text-charcoal text-sm">
                        ₩{(item.plant.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24">
                <span className="text-4xl">🛒</span>
                <h4 className="mt-4 text-sm font-bold text-charcoal">장바구니가 비어 있습니다.</h4>
                <p className="mt-2 text-xs text-warm-gray max-w-[200px] mx-auto leading-relaxed">
                  마음에 드는 초록 반려 식물을 장바구니에 담아 함께 키우기 시작해보세요.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-full bg-forest hover:bg-forest-light text-cream px-5 py-2 text-xs font-bold transition-all"
                >
                  식물 쇼핑 계속하기
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer (Summary & Checkout) */}
          {cartItems.length > 0 && (
            <div className="border-t border-ivory-dark/40 bg-cream p-4 space-y-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between text-charcoal">
                <span className="text-xs font-semibold text-warm-gray">총 합계액</span>
                <span className="font-serif text-xl font-bold">
                  ₩{totalAmount.toLocaleString()}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={onClearCart}
                  className="flex-1 rounded-full border border-warm-gray text-warm-gray hover:bg-warm-gray/10 py-3 text-xs font-bold transition-all"
                >
                  장바구니 비우기
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-[2] rounded-full bg-forest hover:bg-forest-light text-cream py-3 text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  가상 입양 계약서 작성
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
