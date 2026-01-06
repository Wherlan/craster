import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Gift, Trophy, ShoppingCart, User, LogOut, Globe, Menu, X, Circle, Plus, Check } from 'lucide-react';
import LoginPage from './components/LoginPage';
import { authService, giveawayService, entryService, transactionService, winnerService } from './services/backend';

// Mock Data
const stockData = [
  { symbol: "TSLA", name: "Tesla, Inc.", price: 242.65, change: "+3.45%", volume: "112M", sentiment: "Very Positive", positive: true },
  { symbol: "AAPL", name: "Apple Inc.", price: 189.12, change: "-0.22%", volume: "54M", sentiment: "Neutral", positive: false },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 376.01, change: "+1.12%", volume: "28M", sentiment: "Positive", positive: true },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 495.22, change: "+5.67%", volume: "89M", sentiment: "Very Positive", positive: true },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: "+0.89%", volume: "32M", sentiment: "Positive", positive: true }
];

const investmentPlans = [
  { name: "Tesla Growth Fund", return: "+12.4%", risk: "High", minInvest: "$5,000", color: "bg-red-500/10 text-red-400" },
  { name: "Sustainable Energy ETF", return: "+8.1%", risk: "Medium", minInvest: "$1,000", color: "bg-yellow-500/10 text-yellow-400" },
  { name: "Autopilot AI Alpha", return: "+24.8%", risk: "High", minInvest: "$10,000", color: "bg-red-500/10 text-red-400" }
];

const inventory = [
  { model: "Model X", range: "348mi", acceleration: "3.1s", topSpeed: "155mph", color: "Deep Blue" },
  { model: "Model 3 Long Range", range: "358mi", acceleration: "4.2s", topSpeed: "145mph", color: "Pearl White" },
  { model: "Model S Plaid", range: "396mi", acceleration: "1.99s", topSpeed: "200mph", color: "Solid Black" }
];

const cryptoOptions = [
  { name: "Bitcoin", symbol: "BTC", icon: "₿" },
  { name: "Ethereum", symbol: "ETH", icon: "Ξ" },
  { name: "Litecoin", symbol: "LTC", icon: "Ł" }
];

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [depositAmount, setDepositAmount] = useState('1000');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');


  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'investments', icon: TrendingUp, label: 'Investments' },
    { id: 'stocks', icon: BarChart3, label: 'Stocks' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'account', icon: User, label: 'Account' }
  ];

  const processingFee = (parseFloat(depositAmount) * 0.005).toFixed(2);
  const totalAmount = (parseFloat(depositAmount) + parseFloat(processingFee)).toFixed(2);

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',sans-serif] antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <svg className="h-6 w-24" viewBox="0 0 342 35" fill="white">
              <path d="M0 .1a9.7 9.7 0 007 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 007-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 006-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 00-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 13.8h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 14.1h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zM308.5 7h26a9.6 9.6 0 007-7h-40a9.6 9.6 0 007 7z"/>
            </svg>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#0a0a0a] border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black font-bold text-sm">
                JD
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <Circle size={6} fill="currentColor" />
                  KYC Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-[#0a0a0a] border-r border-white/10 transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <nav className="flex flex-col h-full py-6">
          <div className="flex-1 px-3 space-y-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  activeView === item.id 
                    ? 'bg-white text-black font-medium' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeView === item.id && <div className="absolute left-0 w-0.5 h-8 bg-white rounded-r" />}
                <item.icon size={20} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="px-3 space-y-2 border-t border-white/10 pt-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Globe size={20} />
              <span className="text-sm">Language</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : ''}`}>
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                  Invest. Trade. <span className="text-white/40">Drive.</span>
                </h1>
                <p className="text-xl text-white/60 max-w-2xl">
                  The future of automotive investment is here. Build your portfolio with Tesla's revolutionary ecosystem.
                </p>
              </div>

              {/* Available Inventory */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Available Inventory</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  {inventory.map((car, idx) => (
                    <div key={idx} className="flex-none w-[400px] bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 snap-start hover:border-white/20 transition-all">
                      <div className="h-48 bg-gradient-to-br from-white/5 to-transparent rounded-xl mb-4 flex items-center justify-center">
                        <div className="text-6xl font-bold text-white/10">{car.model}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{car.model}</h3>
                      <div className="flex items-center justify-between text-sm text-white/60 mb-4 pb-4 border-b border-white/10">
                        <span>{car.range} Range</span>
                        <span className="border-l border-white/10 pl-3">{car.acceleration} 0-60</span>
                        <span className="border-l border-white/10 pl-3">{car.topSpeed} Top Speed</span>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 bg-white text-black font-medium py-3 rounded-full hover:bg-white/90 transition-all">
                          Learn More
                        </button>
                        <button className="flex-1 border border-white/20 font-medium py-3 rounded-full hover:bg-white/5 transition-all">
                          Order Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Plans Grid */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Investment Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {investmentPlans.map((plan, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold">{plan.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${plan.color}`}>
                          {plan.risk}
                        </span>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-baseline">
                          <span className="text-white/60 text-sm">1Y Return</span>
                          <span className="text-2xl font-bold text-green-400">{plan.return}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-white/60 text-sm">Min. Investment</span>
                          <span className="font-medium">{plan.minInvest}</span>
                        </div>
                      </div>
                      <button className="w-full bg-white text-black font-medium py-3 rounded-full hover:bg-white/90 transition-all">
                        Invest Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stocks View */}
          {activeView === 'stocks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">Stock Market</h1>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Circle size={8} fill="currentColor" className="animate-pulse" />
                    <span>Live</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Symbol</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Name</th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Price</th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-white/60">24h Change</th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Volume</th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Sentiment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockData.map((stock, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-bold">{stock.symbol}</td>
                        <td className="px-6 py-4 text-white/60">{stock.name}</td>
                        <td className="px-6 py-4 text-right font-medium tracking-wider">${stock.price}</td>
                        <td className={`px-6 py-4 text-right font-medium ${stock.positive ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change}
                        </td>
                        <td className="px-6 py-4 text-right text-white/60">{stock.volume}</td>
                        <td className="px-6 py-4 text-right text-white/60">{stock.sentiment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Wallet View */}
          {activeView === 'wallet' && (
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-3xl font-bold">Wallet</h1>
              
              {/* Deposit Section */}
              <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-6">Deposit Funds</h2>
                
                {/* Crypto Selection */}
                <div className="mb-6">
                  <label className="text-sm text-white/60 mb-3 block">Select Cryptocurrency</label>
                  <div className="grid grid-cols-3 gap-3">
                    {cryptoOptions.map((crypto) => (
                      <button
                        key={crypto.symbol}
                        onClick={() => setSelectedCrypto(crypto.symbol)}
                        className={`p-4 rounded-2xl border transition-all ${
                          selectedCrypto === crypto.symbol
                            ? 'bg-white text-black border-white'
                            : 'bg-[#111111] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="text-2xl mb-2">{crypto.icon}</div>
                        <div className="font-medium text-sm">{crypto.name}</div>
                        <div className="text-xs opacity-60">{crypto.symbol}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="text-sm text-white/60 mb-3 block">Amount (USD)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl px-6 py-4 text-2xl font-medium focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="0.00"
                  />
                </div>

                {/* Fee Breakdown */}
                <div className="bg-[#111111] rounded-2xl p-6 mb-6 space-y-3">
                  <h3 className="font-medium mb-4">Fee Breakdown</h3>
                  <div className="flex justify-between text-white/60">
                    <span>Deposit Amount</span>
                    <span className="font-medium text-white">${depositAmount}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Processing Fee (0.5%)</span>
                    <span className="font-medium text-white">${processingFee}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="text-xs text-white/40 pt-2">
                    Processing Time: Instant
                  </div>
                </div>

                <button className="w-full bg-white text-black font-medium py-4 rounded-full hover:bg-white/90 transition-all">
                  Confirm Deposit
                </button>
              </div>
            </div>
          )}

          {/* Investments View */}
          {activeView === 'investments' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Investment Portfolio</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investmentPlans.map((plan, idx) => (
                  <div key={idx} className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${plan.color}`}>
                        {plan.risk}
                      </span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-baseline">
                        <span className="text-white/60 text-sm">1Y Return</span>
                        <span className="text-2xl font-bold text-green-400">{plan.return}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-white/60 text-sm">Min. Investment</span>
                        <span className="font-medium">{plan.minInvest}</span>
                      </div>
                    </div>
                    <button className="w-full bg-white text-black font-medium py-3 rounded-full hover:bg-white/90 transition-all">
                      Invest Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Views Placeholder */}
          {['portfolio', 'inventory', 'orders', 'account'].includes(activeView) && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 capitalize">{activeView}</h2>
                <p className="text-white/60">This section is under development</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;