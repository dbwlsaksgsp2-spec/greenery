import React, { useState } from 'react';

export default function GNB({ cartCount, onCartClick, user, onLoginClick, onLogout, onAdminClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: '식물 둘러보기', targetId: 'plant-menu' },
    { label: '초보자 가이드', targetId: 'beginner-guide' },
    { label: '🌱 식물 MBTI', targetId: 'plant-mbti' },
    { label: '💧 물주기 알림', targetId: 'watering-reminder' },
    { label: '식물원 소개', targetId: 'about-greenery' }
  ];

  const handleNavClick = (targetId) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ivory-dark/40 bg-cream/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="font-serif text-2xl font-bold tracking-wider text-forest hover:text-forest-light transition-colors">
            Greenery
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.targetId}
              onClick={() => handleNavClick(item.targetId)}
              className="text-sm font-medium text-charcoal/80 hover:text-forest transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          
          {/* Admin Dashboard Gear (Visible to Admin or for direct demo access) */}
          <button
            onClick={onAdminClick}
            className="p-2 text-charcoal/60 hover:text-forest hover:bg-ivory/50 rounded-full transition-colors"
            title="관리자 센터 대시보드"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-xs font-semibold text-charcoal bg-forest/15 px-3 py-1.5 rounded-full border border-forest/10">
                {user.nickname}님 🌿
              </span>
              <button
                onClick={onLogout}
                className="text-xs font-medium text-warm-gray hover:text-rose-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="hidden md:block text-xs font-semibold text-forest hover:text-forest-light border border-forest/30 hover:border-forest px-4 py-2 rounded-full transition-all"
            >
              로그인 / 가입
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={onCartClick}
            className="relative p-2 text-charcoal/80 hover:text-forest transition-colors rounded-full hover:bg-ivory/50"
            aria-label="장바구니 보기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5h6.75"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-[11px] font-bold text-cream animate-scale-up">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal/80 hover:text-forest transition-colors rounded-full hover:bg-ivory/50"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-ivory-dark/40 bg-cream animate-slide-down">
          <nav className="flex flex-col space-y-3 px-4 py-5 sm:px-6">
            {menuItems.map((item) => (
              <button
                key={item.targetId}
                onClick={() => handleNavClick(item.targetId)}
                className="text-left py-2 text-base font-medium text-charcoal/80 hover:text-forest transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Admin Link */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onAdminClick();
              }}
              className="text-left py-2 text-base font-semibold text-forest-light hover:text-forest transition-colors"
            >
              ⚙️ 관리자 센터 대시보드
            </button>

            {/* Mobile User Profile Section */}
            <div className="border-t border-ivory-dark/30 pt-4 mt-2">
              {user ? (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-semibold text-charcoal bg-forest/15 px-3 py-1.5 rounded-full">
                    {user.nickname}님 🌿
                  </span>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-xs font-semibold text-rose-700"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLoginClick();
                  }}
                  className="w-full text-center text-sm font-bold text-cream bg-forest py-2.5 rounded-xl hover:bg-forest-light transition-all"
                >
                  로그인 / 회원가입
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
