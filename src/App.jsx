import React, { useState, useEffect } from 'react';
import GNB from './components/GNB';
import HeroSection from './components/HeroSection';
import PlantMenu from './components/PlantMenu';
import BeginnerGuide from './components/BeginnerGuide';
import PlantMBTI from './components/PlantMBTI';
import WateringReminder from './components/WateringReminder';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import PlantModal from './components/PlantModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import AdminPage from './components/AdminPage';
import { plantsData } from './data/plants';
import { supabase } from './utils/supabaseClient';

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('greenery_cart_items');
    if (savedCart) {
      try { return JSON.parse(savedCart); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // User authentication states
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('greenery_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) { console.error(e); }
    }
    return null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Admin page overlay state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamic plants list database (initially empty, loaded from Supabase or localStorage fallback)
  const [plants, setPlants] = useState([]);
  const [isSupabaseActive, setIsSupabaseActive] = useState(false);

  // Initialize/Load plants database from Supabase or LocalStorage Fallback
  useEffect(() => {
    const initPlants = async () => {
      if (supabase) {
        try {
          // Fetch from Supabase
          const { data, error } = await supabase
            .from('plants')
            .select('*')
            .order('id', { ascending: true });

          if (error) throw error;

          if (data && data.length > 0) {
            setPlants(data);
            setIsSupabaseActive(true);
            console.log("🌿 Loaded plants list from Supabase.");
          } else {
            // Database is empty, seed it with default plantsData
            console.log("🌱 Supabase plants table is empty. Seeding initial data...");
            const { error: seedError } = await supabase.from('plants').insert(plantsData);
            if (seedError) throw seedError;
            
            // Re-fetch
            const { data: refetchedData } = await supabase
              .from('plants')
              .select('*')
              .order('id', { ascending: true });
            
            if (refetchedData) {
              setPlants(refetchedData);
              setIsSupabaseActive(true);
            }
          }
        } catch (err) {
          console.warn("⚠️ Failed to connect to Supabase database. Falling back to local storage.", err);
          loadLocalStorageFallback();
        }
      } else {
        loadLocalStorageFallback();
      }
    };

    const loadLocalStorageFallback = () => {
      const savedPlants = localStorage.getItem('greenery_plants_db');
      if (savedPlants) {
        try {
          setPlants(JSON.parse(savedPlants));
        } catch (e) {
          console.error("Failed to parse plants database", e);
          setPlants(plantsData);
        }
      } else {
        setPlants(plantsData);
        localStorage.setItem('greenery_plants_db', JSON.stringify(plantsData));
      }
      setIsSupabaseActive(false);
    };

    initPlants();
  }, []);

  // Save cart helper
  const saveCart = (newCartItems) => {
    setCartItems(newCartItems);
    localStorage.setItem('greenery_cart_items', JSON.stringify(newCartItems));
  };

  // Plant database CRUD - ADD
  const handleAddPlant = async (newPlant) => {
    if (isSupabaseActive && supabase) {
      try {
        const { error } = await supabase
          .from('plants')
          .insert([newPlant]);
        
        if (error) throw error;
        setPlants([...plants, newPlant]);
      } catch (err) {
        console.error("Supabase insert error:", err);
        alert("Supabase 등록에 실패하여 로컬 임시로만 추가합니다.");
        setPlants([...plants, newPlant]);
      }
    } else {
      const updatedPlants = [...plants, newPlant];
      setPlants(updatedPlants);
      localStorage.setItem('greenery_plants_db', JSON.stringify(updatedPlants));
    }
  };

  // Plant database CRUD - UPDATE
  const handleUpdatePlant = async (updatedPlant) => {
    if (isSupabaseActive && supabase) {
      try {
        const { error } = await supabase
          .from('plants')
          .update({
            name: updatedPlant.name,
            scientificName: updatedPlant.scientificName,
            price: updatedPlant.price,
            difficulty: updatedPlant.difficulty,
            category: updatedPlant.category,
            description: updatedPlant.description,
            care: updatedPlant.care,
            tags: updatedPlant.tags
          })
          .eq('id', updatedPlant.id);
        
        if (error) throw error;
        setPlants(plants.map(p => p.id === updatedPlant.id ? updatedPlant : p));
        alert("🌿 상품 정보가 클라우드에 성공적으로 수정되었습니다.");
      } catch (err) {
        console.error("Supabase update error:", err);
        alert("Supabase 수정에 실패하여 로컬에서만 수정합니다.");
        setPlants(plants.map(p => p.id === updatedPlant.id ? updatedPlant : p));
      }
    } else {
      const updated = plants.map(p => p.id === updatedPlant.id ? updatedPlant : p);
      setPlants(updated);
      localStorage.setItem('greenery_plants_db', JSON.stringify(updated));
      alert("🌿 상품 정보가 로컬 저장소에 성공적으로 수정되었습니다.");
    }
  };

  // Plant database CRUD - DELETE
  const handleDeletePlant = async (plantId) => {
    if (isSupabaseActive && supabase) {
      try {
        const { error } = await supabase
          .from('plants')
          .delete()
          .eq('id', plantId);
        
        if (error) throw error;
        setPlants(plants.filter((p) => p.id !== plantId));
        alert("🗑️ 상품이 클라우드에서 완전히 삭제되었습니다.");
      } catch (err) {
        console.error("Supabase delete error:", err);
        alert("Supabase 삭제에 실패하여 로컬에서만 우선 제거합니다.");
        setPlants(plants.filter((p) => p.id !== plantId));
      }
    } else {
      const updatedPlants = plants.filter((p) => p.id !== plantId);
      setPlants(updatedPlants);
      localStorage.setItem('greenery_plants_db', JSON.stringify(updatedPlants));
      alert("🗑️ 상품이 로컬 저장소에서 삭제되었습니다.");
    }
  };

  // Add to cart handler
  const handleAddToCart = (plant) => {
    const existingIndex = cartItems.findIndex((item) => item.plant.id === plant.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { plant, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (plantId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(plantId);
      return;
    }
    const updated = cartItems.map((item) => 
      item.plant.id === plantId ? { ...item, quantity: newQty } : item
    );
    saveCart(updated);
  };

  // Remove single item from cart
  const handleRemoveItem = (plantId) => {
    const filtered = cartItems.filter((item) => item.plant.id !== plantId);
    saveCart(filtered);
  };

  // Clear all items in cart
  const handleClearCart = () => {
    saveCart([]);
  };

  // Modal open handler
  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  // Modal close handler
  const handleCloseModal = () => {
    setSelectedPlant(null);
    setIsModalOpen(false);
  };

  // Login success callback
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('greenery_user', JSON.stringify(userData));
    if (userData.email === 'admin@greenery.co.kr') {
      setIsAdminOpen(true);
    }
  };

  // Logout handler
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      setUser(null);
      localStorage.removeItem('greenery_user');
      setIsAdminOpen(false);
      alert("로그아웃 되었습니다. 🌿");
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col font-sans">
      {/* Global Navigation Bar */}
      <GNB 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onLoginClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Connection status toast helper */}
        <div className="bg-cream border-b border-ivory-dark/40 py-1.5 text-center text-xs text-warm-gray flex items-center justify-center gap-1.5 font-medium">
          {isSupabaseActive ? (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Supabase 클라우드 데이터베이스와 연결됨 (실시간 동기화)
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              로컬 저장소(LocalStorage) 모드로 작동 중
            </>
          )}
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Plant Menu Grid */}
        <PlantMenu 
          plants={plants}
          onSelectPlant={handleSelectPlant} 
          onAddToCart={handleAddToCart}
        />

        {/* Beginner Guide Tips */}
        <BeginnerGuide />

        {/* MBTI Quiz */}
        <PlantMBTI 
          plants={plants}
          onSelectPlant={handleSelectPlant} 
          onAddToCart={handleAddToCart}
        />

        {/* Watering D-day schedule reminder */}
        <WateringReminder plants={plants} />

        {/* About Studio */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Care Modal overlay */}
      <PlantModal
        plant={selectedPlant}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Slider Drawer overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        user={user}
      />

      {/* Login/Signup Modal overlay */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Panel Dashboard overlay */}
      <AdminPage
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        plants={plants}
        onAddPlant={handleAddPlant}
        onUpdatePlant={handleUpdatePlant}
        onDeletePlant={handleDeletePlant}
      />
    </div>
  );
}
