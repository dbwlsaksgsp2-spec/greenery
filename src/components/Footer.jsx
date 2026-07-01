import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-cream border-t border-forest-light/20 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-forest-light/20">
          
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-2 space-y-4 text-left">
            <span className="font-serif text-3xl font-bold tracking-widest text-cream block">
              Greenery
            </span>
            <p className="text-xs text-cream/70 leading-relaxed font-light max-w-md">
              그리너리는 당신의 주거 및 상업 공간에 최적화된 맞춤형 플랜테리어를 제안하고, 
              식물의 생애와 함께 호흡하는 올바른 반려 식물 라이프 스타일을 연구합니다.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full bg-forest-light/20 hover:bg-forest-light/40 text-cream transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.058 1.28-.072 1.688-.072 4.949s.014 3.669.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.67-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.261-.014-3.669-.072-4.949C23.73 2.697 21.307.272 16.953.073 15.673.014 15.265 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Menu quicklinks */}
          <div className="text-left space-y-3">
            <h4 className="font-serif font-bold text-sm text-sage-light">메뉴 바로가기</h4>
            <ul className="text-xs text-cream/70 space-y-2 font-light">
              <li><a href="#plant-menu" className="hover:text-cream transition-colors">식물 둘러보기</a></li>
              <li><a href="#beginner-guide" className="hover:text-cream transition-colors">초보자 가이드</a></li>
              <li><a href="#plant-mbti" className="hover:text-cream transition-colors">식물 MBTI 매칭</a></li>
              <li><a href="#watering-reminder" className="hover:text-cream transition-colors">물주기 D-Day 계산기</a></li>
            </ul>
          </div>

          {/* Col 3: CS / Address info */}
          <div className="text-left space-y-3">
            <h4 className="font-serif font-bold text-sm text-sage-light">스튜디오 정보</h4>
            <div className="text-xs text-cream/70 space-y-2 font-light">
              <p>📍 서울특별시 서초구 반포대로 123 그리너리</p>
              <p>📞 02-1234-5678 (평일 10:00 - 18:00)</p>
              <p>✉️ help@greenery.co.kr</p>
              <p>🏢 사업자 번호: 120-12-12345</p>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-cream/50 font-light">
          <p>© {currentYear} Greenery. All Rights Reserved. Designed for cozy plant parents.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-cream transition-colors">이용약관</a>
            <a href="#" className="hover:text-cream transition-colors font-semibold">개인정보처리방침</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
