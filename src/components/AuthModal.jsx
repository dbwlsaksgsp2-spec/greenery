import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [preference, setPreference] = useState('air-purifying');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setEmail('');
    setPassword('');
    setNickname('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Input Validation
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    // Load registered users database from localStorage
    const usersJson = localStorage.getItem('greenery_registered_users') || '[]';
    const users = JSON.parse(usersJson);

    if (activeTab === 'login') {
      // Login Logic
      // Check for a special default user for easy testing
      if (email === 'test@greenery.co.kr' && password === '1234') {
        const demoUser = { email, nickname: '초록집사', preference: 'interior' };
        onLoginSuccess(demoUser);
        onClose();
        return;
      }

      if (email === 'admin@greenery.co.kr' && password === 'admin123') {
        const adminUser = { email, nickname: '최고관리자 👑', preference: 'rare' };
        onLoginSuccess(adminUser);
        onClose();
        return;
      }

      const matchedUser = users.find(u => u.email === email && u.password === password);
      if (matchedUser) {
        onLoginSuccess({
          email: matchedUser.email,
          nickname: matchedUser.nickname,
          preference: matchedUser.preference
        });
        onClose();
      } else {
        setError('이메일 혹은 비밀번호가 일치하지 않습니다. (테스트용: test@greenery.co.kr / 1234)');
      }
    } else {
      // Sign Up Logic
      if (!nickname) {
        setError('닉네임을 입력해 주세요.');
        return;
      }

      // Check if email already registered
      const emailExists = users.some(u => u.email === email);
      if (emailExists || email === 'test@greenery.co.kr') {
        setError('이미 등록된 이메일 주소입니다.');
        return;
      }

      const newUser = {
        email,
        password,
        nickname,
        preference
      };

      // Save user to registry DB
      users.push(newUser);
      localStorage.setItem('greenery_registered_users', JSON.stringify(users));

      // Auto login after sign up
      onLoginSuccess({
        email: newUser.email,
        nickname: newUser.nickname,
        preference: newUser.preference
      });
      alert(`🎉 반가워요, ${nickname}님! 그리너리의 회원이 되신 것을 진심으로 환영합니다. 이제 물주기 메이트를 등록해보세요! 🌿`);
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-cream border border-ivory-dark/40 shadow-2xl p-6 md:p-8 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-warm-gray hover:text-charcoal p-2 rounded-full hover:bg-ivory/50 transition-all"
          aria-label="닫기"
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

        {/* Logo Icon Decoration */}
        <div className="text-center mb-6">
          <span className="text-3xl">🌿</span>
          <h3 className="font-serif text-2xl font-bold text-charcoal mt-2">Greenery 식사 등록</h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-ivory-dark/40 mb-6">
          <button
            onClick={() => handleTabChange('login')}
            className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
              activeTab === 'login'
                ? 'border-forest text-forest'
                : 'border-transparent text-warm-gray hover:text-charcoal'
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => handleTabChange('signup')}
            className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
              activeTab === 'signup'
                ? 'border-forest text-forest'
                : 'border-transparent text-warm-gray hover:text-charcoal'
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label htmlFor="auth-email" className="block text-xs font-semibold text-warm-gray mb-1.5">
              이메일 주소
            </label>
            <input
              id="auth-email"
              type="email"
              placeholder="example@greenery.co.kr"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-ivory-dark/40 bg-cream p-3 text-sm text-charcoal focus:border-forest focus:outline-none"
            />
          </div>

          {/* Nickname field for Sign Up */}
          {activeTab === 'signup' && (
            <div>
              <label htmlFor="auth-nickname" className="block text-xs font-semibold text-warm-gray mb-1.5">
                식집사 닉네임 (활동명)
              </label>
              <input
                id="auth-nickname"
                type="text"
                placeholder="예: 초록정원사, 몬순이엄마"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full rounded-xl border border-ivory-dark/40 bg-cream p-3 text-sm text-charcoal focus:border-forest focus:outline-none"
              />
            </div>
          )}

          {/* Password field */}
          <div>
            <label htmlFor="auth-password" className="block text-xs font-semibold text-warm-gray mb-1.5">
              비밀번호
            </label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-ivory-dark/40 bg-cream p-3 text-sm text-charcoal focus:border-forest focus:outline-none"
            />
          </div>

          {/* Plant Preference dropdown for Sign Up */}
          {activeTab === 'signup' && (
            <div>
              <label htmlFor="auth-preference" className="block text-xs font-semibold text-warm-gray mb-1.5">
                선호하는 식물 성향
              </label>
              <select
                id="auth-preference"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full rounded-xl border border-ivory-dark/40 bg-cream p-3 text-sm text-charcoal focus:border-forest focus:outline-none"
              >
                <option value="air-purifying">공기정화 식물 🌬️</option>
                <option value="interior">인테리어 플랜트 🪴</option>
                <option value="beginner">키우기 쉬운 식물 🌱</option>
                <option value="rare">희귀/수집가용 식물 🦄</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-forest hover:bg-forest-light text-cream py-3 font-semibold shadow-md hover:shadow-lg transition-all mt-6"
          >
            {activeTab === 'login' ? '그리너리 로그인' : '가입 및 가이드북 받기'}
          </button>
        </form>

        {/* Demo login helper */}
        {activeTab === 'login' && (
          <div className="mt-5 text-center bg-ivory/50 rounded-xl p-3 border border-ivory-dark/20 text-[11px] leading-relaxed">
            <span className="text-[10px] text-warm-gray font-bold block mb-1">데모 테스트용 계정:</span>
            <p className="text-charcoal"><strong className="text-forest">일반 집사:</strong> test@greenery.co.kr / 1234</p>
            <p className="text-charcoal"><strong className="text-forest">관리자:</strong> admin@greenery.co.kr / admin123</p>
          </div>
        )}
      </div>
    </div>
  );
}
