import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Check } from 'lucide-react';

export function TeslaPurchaseModal({ car, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(car.color);
  const [step, setStep] = useState('options'); // options, checkout, confirmation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const colors = ['Solid Black', 'Pearl White', 'Deep Blue', 'Ultra Red', 'Silver Metallic'];
  const basePrice = parseInt(car.price.replace('$', '').replace(',', ''));
  const totalPrice = basePrice * quantity;

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty > 0 && newQty <= 5) {
      setQuantity(newQty);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('checkout');
  };

  const handlePayment = () => {
    // Validate payment info
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all payment details');
      return;
    }
    // In a real scenario, this would process the payment
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] rounded-3xl max-w-2xl w-full border border-white/20 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {step === 'options' && `Configure ${car.model}`}
            {step === 'checkout' && 'Shipping & Contact'}
            {step === 'confirmation' && 'Order Confirmed!'}
          </h2>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Options */}
          {step === 'options' && (
            <div className="space-y-6">
              {/* Car Image */}
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent">
                <img 
                  src={car.image} 
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Car Specs */}
              <div className="bg-[#111111] rounded-2xl p-4 border border-white/10">
                <h3 className="font-bold mb-3">{car.model} Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Range</span>
                    <p className="font-medium">{car.range}</p>
                  </div>
                  <div>
                    <span className="text-white/60">0-60</span>
                    <p className="font-medium">{car.acceleration}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Top Speed</span>
                    <p className="font-medium">{car.topSpeed}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Features</span>
                    <p className="font-medium">{car.features.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-sm font-medium mb-3 block">Choose Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        color === c
                          ? 'bg-white text-black border border-white'
                          : 'bg-white/10 text-white border border-white/20 hover:border-white/40'
                      }`}
                    >
                      {c.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="text-sm font-medium mb-3 block">Quantity (Max 5)</label>
                <div className="flex items-center gap-4 bg-[#111111] rounded-xl p-4 w-fit border border-white/10">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="text-white/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 5}
                    className="text-white/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4 border border-green-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60">Unit Price</span>
                  <span>${basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60">Quantity</span>
                  <span>x{quantity}</span>
                </div>
                <div className="border-t border-green-500/20 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-green-400">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Proceed to Checkout
              </button>
            </div>
          )}

          {/* Step 2: Checkout */}
          {step === 'checkout' && (
            <div className="space-y-6">
              <div className="bg-[#111111] rounded-2xl p-4 border border-white/10 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/60 text-sm">Order Summary</p>
                    <p className="font-bold">{quantity}x {car.model} ({color})</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-sm">Total</p>
                    <p className="text-2xl font-bold text-green-400">${totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60 block mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 block mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 block mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60 block mb-2">Delivery Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                  placeholder="Street address"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('options')}
                  className="flex-1 bg-white/10 text-white font-bold py-3 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('checkout')}
                  className="flex-1 bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2.5: Payment */}
          {step === 'checkout' && (
            <div className="space-y-6 mt-6 pt-6 border-t border-white/10">
              <h3 className="font-bold text-lg">Payment Information</h3>

              <div>
                <label className="text-sm text-white/60 block mb-2">Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 block mb-2">Expiry Date *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 block mb-2">CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-white/90 transition-all"
              >
                Complete Purchase - ${totalPrice.toLocaleString()}
              </button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center space-y-6 py-12">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500/50">
                  <Check size={48} className="text-green-400" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
                <p className="text-white/60 mb-4">Thank you for your purchase</p>
              </div>

              <div className="bg-[#111111] rounded-2xl p-6 border border-white/10 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Item</span>
                  <span className="font-medium">{quantity}x {car.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Color</span>
                  <span className="font-medium">{color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Total Amount</span>
                  <span className="font-bold text-green-400">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white/60">Order ID</span>
                  <span className="font-medium font-mono">ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
              </div>

              <p className="text-sm text-white/60">
                A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
              </p>

              <button
                onClick={onClose}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeslaPurchaseModal;
