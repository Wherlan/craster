import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Gift, Trophy, ShoppingCart, User, LogOut, Globe, Menu, X, Circle, Plus, Check, Moon, Sun } from 'lucide-react';
import LoginPage from './components/LoginPage';
import GiftBoxPopup from './components/GiftBoxPopup';
import { TermsAndConditions } from './components/TermsAndConditions';
import { MyEntries } from './components/MyEntries';
import { Footer } from './components/Footer';
import { FAQ } from './components/FAQ';
import { IDVerification } from './components/IDVerification';
import { KYCVerification } from './components/KYCVerification';
import { TeslaPurchaseModal } from './components/TeslaPurchaseModal';
import { ToastContainer } from './components/Toast';
import { authService, entryService } from './services/backend';

// Tesla Cars Data
const TESLA_CARS = [
  {
    model: 'Model S Plaid',
    range: '396 mi',
    acceleration: '1.99s',
    topSpeed: '200 mph',
    color: 'Solid Black',
    price: '$104,990',
    features: ['3 Motors', 'All-Wheel Drive', 'Tri Motor'],
    image: '/images/ModelSPlaid.jpg'
  },
  {
    model: 'Model 3 Long Range',
    range: '358 mi',
    acceleration: '4.2s',
    topSpeed: '145 mph',
    color: 'Pearl White',
    price: '$49,990',
    features: ['Dual Motor', 'All-Wheel Drive'],
    image: '/images/Model3LR.jpg'
  },
  {
    model: 'Model X Plaid',
    range: '348 mi',
    acceleration: '2.5s',
    topSpeed: '163 mph',
    color: 'Deep Blue',
    price: '$104,990',
    features: ['Tri Motor', 'Falcon Wing Doors'],
    image: '/images/ModelXPlaid.jpg'
  },
  {
    model: 'Model Y Long Range',
    range: '330 mi',
    acceleration: '3.5s',
    topSpeed: '155 mph',
    color: 'Ultra White',
    price: '$65,990',
    features: ['Dual Motor', 'All-Wheel Drive'],
    image: '/images/ModelYLR.jpg'
  }
];

// Giveaway Items Data
const GIVEAWAY_ITEMS = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'Latest Apple flagship smartphone',
    image: '/images/iphone15.jpg',
    value: 1299,
    totalParticipants: 2543,
    drawDate: '2026-02-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    description: 'M3 Max processor with 48GB RAM',
    image: '/images/macbook16.jpg',
    value: 3499,
    totalParticipants: 1876,
    drawDate: '2026-02-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Apple Watch Ultra',
    description: 'Premium smartwatch with action button',
    image: '/images/AppleWatch.jpg',
    value: 799,
    totalParticipants: 5234,
    drawDate: '2026-02-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation',
    image: '/images/sonyheadphones.jpg',
    value: 399,
    totalParticipants: 8932,
    drawDate: '2026-02-12',
    status: 'active'
  },
  {
    id: '5',
    name: 'DJI Air 3S Drone',
    description: '4K camera drone with 46-min flight time',
    image: '/images/djidrone.jpg',
    value: 1299,
    totalParticipants: 1243,
    drawDate: '2026-02-25',
    status: 'active'
  },
  {
    id: '6',
    name: 'GoPro Hero 12',
    description: 'Professional action camera',
    image: '/images/goprohero12.jpg',
    value: 499,
    totalParticipants: 3421,
    drawDate: '2026-03-01',
    status: 'active'
  },
  {
    id: '7',
    name: 'Xbox Series X',
    description: 'Next-gen gaming console',
    image: '/images/xboxseriesx.jpg',
    value: 499,
    totalParticipants: 4156,
    drawDate: '2026-03-05',
    status: 'active'
  },
  {
    id: '8',
    name: 'Nintendo Switch OLED',
    description: 'Premium gaming handheld console',
    image: '/images/nintendoswitcholed.jpg',
    value: 349,
    totalParticipants: 5890,
    drawDate: '2026-03-10',
    status: 'active'
  }
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [giveaways, setGiveaways] = useState([]);
  const [userEntries, setUserEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [featuredGiveaway, setFeaturedGiveaway] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedTeslaCar, setSelectedTeslaCar] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast notification function
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Initialize app
  useEffect(() => {
    authService.initialize();
    setGiveaways(GIVEAWAY_ITEMS);
    setFeaturedGiveaway(GIVEAWAY_ITEMS[0] || null);
    setShowGiftBox(true);
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Load giveaways and user entries
  const loadGiveaways = () => {
    setGiveaways(GIVEAWAY_ITEMS);
    setFeaturedGiveaway(GIVEAWAY_ITEMS[0] || null);
    
    const user = authService.getCurrentUser();
    if (user) {
      const entries = entryService.getUserEntries(user.id);
      setUserEntries(entries);
    }
  };

  // Handle login
  const handleLogin = (user) => {
    setCurrentUser(user);
    loadGiveaways();
    addToast(`Welcome back, ${user.fullName}!`, 'success');
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setUserEntries([]);
    setGiveaways([]);
    addToast('Successfully logged out', 'success');
  };

  // Enter giveaway
  const handleEnterGiveaway = (giveawayId) => {
    setLoading(true);
    try {
      const result = entryService.enterGiveaway(currentUser.id, giveawayId, 1);
      if (result.success) {
        loadGiveaways();
        // Update current user data
        const updatedUser = authService.getCurrentUser();
        setCurrentUser(updatedUser);
        addToast('Successfully entered giveaway!', 'success');
      } else {
        addToast('Already entered this giveaway', 'warning');
      }
    } catch (error) {
      addToast('Failed to enter giveaway', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Menu items
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'giveaways', icon: Gift, label: 'Giveaways' },
    { id: 'portfolio', icon: Trophy, label: 'Portfolio' },
    { id: 'entries', icon: ShoppingCart, label: 'My Entries' },
    { id: 'account', icon: User, label: 'Account' }
  ];

  // Show login page if not authenticated
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

  return (
    <div className={`min-h-screen antialiased transition-colors duration-300 ${
      darkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        darkMode
          ? 'bg-black/80 border-b border-white/10'
          : 'bg-white/80 border-b border-black/10'
      } backdrop-blur-md`}>
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="text-white hover:text-white/60 transition active:scale-95"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <svg className="h-5 w-20 sm:h-6 sm:w-24" viewBox="0 0 342 35" fill="white">
              <path d="M0 .1a9.7 9.7 0 007 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 007-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 006-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 00-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 13.8h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 14.1h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zM308.5 7h26a9.6 9.6 0 007-7h-40a9.6 9.6 0 007 7z"/>
            </svg>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors duration-300 border ${
            darkMode
              ? 'bg-[#0a0a0a] border-white/10'
              : 'bg-gray-100 border-black/10'
          }`}>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black font-bold text-xs sm:text-sm flex-shrink-0">
                {currentUser.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="text-xs sm:text-sm font-medium truncate">{currentUser.fullName}</div>
                <div className={`text-xs flex items-center gap-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  <Circle size={5} fill="currentColor" />
                  Active
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className={`p-2 transition-colors duration-300 ${
                darkMode
                  ? 'text-white/60 hover:text-white hover:bg-white/5'
                  : 'text-black/60 hover:text-black hover:bg-black/5'
              } rounded-full active:scale-95`}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-14 sm:top-16 bottom-0 w-56 sm:w-64 transition-all duration-300 ease-in-out z-40 border-r ${
        darkMode
          ? 'bg-[#0a0a0a] border-white/10'
          : 'bg-gray-50 border-black/10'
      } ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col h-full py-4 sm:py-6">
          <div className="flex-1 px-2 sm:px-3 space-y-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  // Auto-close sidebar on mobile when navigating
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
                  activeView === item.id 
                    ? darkMode
                      ? 'bg-white text-black font-semibold'
                      : 'bg-black text-white font-semibold'
                    : darkMode
                    ? 'text-white/60 hover:text-white hover:bg-white/5'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                {activeView === item.id && <div className="absolute left-0 w-0.5 h-8 bg-white rounded-r" />}
                <item.icon size={18} className="sm:size-[20px]" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className={`px-2 sm:px-3 space-y-1 sm:space-y-2 transition-colors duration-300 ${
            darkMode
              ? 'border-t border-white/10 pt-3 sm:pt-4'
              : 'border-t border-black/10 pt-3 sm:pt-4'
          }`}>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
                darkMode
                  ? 'text-white/60 hover:text-white hover:bg-white/5'
                  : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              {darkMode ? <Sun size={18} className="sm:size-[20px]" /> : <Moon size={18} className="sm:size-[20px]" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
              darkMode
                ? 'text-white/60 hover:text-white hover:bg-white/5'
                : 'text-black/60 hover:text-black hover:bg-black/5'
            }`}>
              <Globe size={18} className="sm:size-[20px]" />
              <span>Language</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-14 sm:pt-16 transition-all duration-300 ${sidebarOpen ? 'pl-56 sm:pl-64' : ''}`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-full lg:max-w-[1600px] mx-auto">
          
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Hero Section with Tesla Cars */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-h1 mb-1 sm:mb-2">
                      Welcome, {currentUser.fullName.split(' ')[0]}.
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-white/60">
                      Explore premium Tesla vehicles and enter exclusive giveaways.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20">
                  <div className="text-white/60 text-xs sm:text-sm mb-1">Entries</div>
                  <div className="text-2xl sm:text-3xl font-bold">{currentUser.entriesCount || 0}</div>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20">
                  <div className="text-white/60 text-xs sm:text-sm mb-1">Winnings</div>
                  <div className="text-2xl sm:text-3xl font-bold">${currentUser.totalWinnings || 0}</div>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20">
                  <div className="text-white/60 text-sm mb-1">Active</div>
                  <div className="text-3xl font-bold">{userEntries.length}</div>
                </div>
                <button onClick={() => setActiveView('account')} className={`rounded-2xl p-5 border transition-all cursor-pointer hover:scale-105 ${currentUser.kycVerified ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                  <div className="text-white/60 text-sm mb-1">KYC Status</div>
                  <div className={`font-bold ${currentUser.kycVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                    {currentUser.kycVerified ? 'Verified' : 'Pending'}
                  </div>
                </button>
              </div>

              {/* Featured Tesla Cars */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Featured Vehicles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {TESLA_CARS.map((car, idx) => (
                    <div key={idx} className="bg-gradient-to-b from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group">
                      <div className="h-40 bg-gradient-to-br from-white/10 to-transparent overflow-hidden relative">
                        <img 
                          src={car.image} 
                          alt={car.model}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="font-bold text-lg mb-1">{car.model}</h3>
                        <p className="text-xs text-white/40 mb-4">{car.color}</p>
                        <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">Range</span>
                            <span className="font-medium">{car.range}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">0-60</span>
                            <span className="font-medium">{car.acceleration}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">Top Speed</span>
                            <span className="font-medium">{car.topSpeed}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-green-400 font-bold text-sm">{car.price}</p>
                          <button
                            onClick={() => setSelectedTeslaCar(car)}
                            className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-white/90 transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            Purchase
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Giveaway Cards */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Active Giveaways</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {giveaways.map((giveaway) => {
                    const userEntry = userEntries.find(e => e.giveawayId === giveaway.id);
                    return (
                      <div key={giveaway.id} className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer" onClick={() => {setFeaturedGiveaway(giveaway); setShowGiftBox(true);}}>
                        <div className="h-40 bg-gradient-to-br from-white/10 to-transparent overflow-hidden relative flex items-center justify-center">
                          <img 
                            src={giveaway.image} 
                            alt={giveaway.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 sm:p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Gift size={40} className="text-red-500" />
                            {userEntry && <Check size={20} className="text-green-400" />}
                          </div>
                          <h3 className="font-bold text-lg mb-2">{giveaway.name}</h3>
                          <p className="text-xs text-white/60 mb-4">{giveaway.description}</p>
                          <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                            <div className="flex justify-between text-xs">
                              <span className="text-white/60">Prize</span>
                              <span className="font-medium text-green-400">${giveaway.value}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-white/60">Participants</span>
                              <span className="font-medium">{giveaway.totalParticipants.toLocaleString()}</span>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEnterGiveaway(giveaway.id);
                            }}
                            disabled={loading || !!userEntry}
                            className={`w-full py-2 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-medium ${
                              userEntry 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-white text-black hover:bg-white/90'
                            }`}
                          >
                            {userEntry ? (
                              <>
                                <Check size={16} />
                                Entered
                              </>
                            ) : (
                              <>
                                <Plus size={16} />
                                Enter
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <FAQ />
              </div>
            </div>
          )}

          {/* Giveaways View */}
          {activeView === 'giveaways' && (
            <div className="space-y-6">
              {/* Tesla Gift Award Notification */}
              <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/10 to-red-500/20 rounded-2xl p-6 border border-yellow-500/30 backdrop-blur-sm">
                <div className="flex gap-4">
                  <div className="text-3xl">🎉</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-yellow-300 mb-2">Congratulations to our selected recipients!</h2>
                    <p className="text-white/80 text-sm mb-3">
                      A special group of 50 supporters from our Facebook community has been chosen for a unique recognition initiative inspired by <span className="font-semibold">Tesla's mission of innovation and efficiency.</span>
                    </p>
                    <p className="text-white/80 text-sm mb-3">
                      Selected recipients are being honored with an exclusive <span className="font-bold text-yellow-300">Tesla gift award</span>, including a <span className="font-semibold">$450,000 cash gift</span>, an <span className="font-semibold">iPhone 17 Pro Max</span>, and a <span className="font-semibold">brand new Tesla vehicle of any desired choice.</span> 🚗⚡
                    </p>
                    <p className="text-white/80 text-sm mb-3">
                      Thank you for being part of a community that believes in progress and possibility.
                    </p>
                    <p className="text-white/80 text-sm font-medium">
                      Kindly confirm & indicate your acceptance to proceed.
                    </p>
                    <p className="text-white/60 text-xs mt-3 italic">
                      Terms and conditions apply.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-2">All Giveaways</h1>
                <p className="text-white/60">Browse and enter all available giveaways</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {giveaways.map((giveaway) => {
                  const userEntry = userEntries.find(e => e.giveawayId === giveaway.id);
                  return (
                    <div key={giveaway.id} className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                      <div className="h-40 bg-gradient-to-br from-white/5 to-transparent overflow-hidden relative flex items-center justify-center">
                        <img 
                          src={giveaway.image} 
                          alt={giveaway.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg font-bold mb-2">{giveaway.name}</h3>
                        <p className="text-sm text-white/60 mb-4">{giveaway.description}</p>
                        <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Prize Value</span>
                            <span className="font-medium">${giveaway.value}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Total Entries</span>
                            <span className="font-medium">{giveaway.totalParticipants.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Draw Date</span>
                            <span className="font-medium">{new Date(giveaway.drawDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleEnterGiveaway(giveaway.id)}
                          disabled={loading || !!userEntry}
                          className={`w-full font-medium py-3 rounded-full transition-all flex items-center justify-center gap-2 ${
                            userEntry 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-white text-black hover:bg-white/90'
                          }`}
                        >
                          {userEntry ? (
                            <>
                              <Check size={18} />
                              Entered
                            </>
                          ) : (
                            <>
                              <Plus size={18} />
                              Enter
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <FAQ />
              </div>
            </div>
          )}

          {/* Portfolio View */}
          {activeView === 'portfolio' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Portfolio</h1>
                <p className="text-white/60">Your giveaway entries and winnings</p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
                  <div className="text-white/60 text-sm mb-2">Total Entries</div>
                  <div className="text-4xl font-bold">{currentUser.entriesCount || 0}</div>
                </div>
                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
                  <div className="text-white/60 text-sm mb-2">Total Winnings</div>
                  <div className="text-4xl font-bold">${currentUser.totalWinnings || 0}</div>
                </div>
                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
                  <div className="text-white/60 text-sm mb-2">Active Giveaways</div>
                  <div className="text-4xl font-bold">{userEntries.length}</div>
                </div>
              </div>

              {/* Entries List */}
              <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Prize</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Entries</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Participants</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Draw Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userEntries.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center text-white/60">
                            No entries yet. Enter a giveaway to get started!
                          </td>
                        </tr>
                      ) : (
                        userEntries.map((entry) => {
                          const giveaway = giveaways.find(g => g.id === entry.giveawayId);
                          return giveaway ? (
                            <tr key={entry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 font-medium">{giveaway.name}</td>
                              <td className="px-6 py-4 text-white/60">{entry.entryCount}</td>
                              <td className="px-6 py-4 text-white/60">{giveaway.totalParticipants.toLocaleString()}</td>
                              <td className="px-6 py-4 text-white/60">{new Date(giveaway.drawDate).toLocaleDateString()}</td>
                            </tr>
                          ) : null;
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* My Entries View */}
          {activeView === 'entries' && (
            <MyEntries currentUser={currentUser} userEntries={userEntries} giveaways={giveaways} />
          )}

          {/* Account View */}
          {activeView === 'account' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-3xl font-bold">Account Settings</h1>
                <p className="text-white/60">Manage your profile and preferences</p>
              </div>

              {/* KYC Verification Section */}
              {!currentUser.kycVerified && (
                <KYCVerification 
                  user={currentUser} 
                  onUpdateUser={(user) => setCurrentUser(user)}
                  onViewTerms={() => setActiveView('terms')}
                />
              )}

              {/* ID.me Verification Section */}
              <IDVerification 
                user={currentUser} 
                onVerify={() => {
                  const updatedUser = authService.getCurrentUser();
                  setCurrentUser({...updatedUser, kycVerified: true});
                  addToast('Identity verified successfully!', 'success');
                }}
              />

              {/* Profile Section */}
              <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60 block mb-2">Full Name</label>
                    <div className="bg-[#111111] rounded-2xl px-4 py-3 text-white">
                      {currentUser.fullName}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60 block mb-2">Email Address</label>
                    <div className="bg-[#111111] rounded-2xl px-4 py-3 text-white">
                      {currentUser.email}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60 block mb-2">Account Created</label>
                    <div className="bg-[#111111] rounded-2xl px-4 py-3 text-white">
                      {new Date(currentUser.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-6">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-white/60 text-sm mb-2">Total Entries</div>
                    <div className="text-3xl font-bold">{currentUser.entriesCount || 0}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-2">Total Winnings</div>
                    <div className="text-3xl font-bold">${currentUser.totalWinnings || 0}</div>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="w-full bg-red-500/10 border border-red-500/30 text-red-400 font-medium py-3 rounded-full hover:bg-red-500/20 transition-all"
              >
                Logout
              </button>
            </div>
          )}

          {activeView === 'terms' && (
            <TermsAndConditions />
          )}

        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Gift Box Popup */}
      {showGiftBox && featuredGiveaway && (
        <GiftBoxPopup 
          giveaway={featuredGiveaway}
          onNavigateToGiveaways={() => {
            setActiveView('giveaways');
            setShowGiftBox(false);
            if (window.innerWidth < 1024) {
              setSidebarOpen(false);
            }
          }}
          onClose={() => setShowGiftBox(false)}
        />
      )}

      {/* Tesla Purchase Modal */}
      {selectedTeslaCar && (
        <TeslaPurchaseModal 
          car={selectedTeslaCar}
          onClose={() => setSelectedTeslaCar(null)}
        />
      )}
    </div>
  );
}

export default App;
