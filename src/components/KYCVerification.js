import React, { useState } from 'react';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { authService } from '../services/backend';

export function KYCVerification({ user, onUpdateUser, onViewTerms }) {
  const [step, setStep] = useState(user.kycVerified ? 'verified' : 'intro');
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    age: '',
    gender: '',
    occupation: '',
    deliveryAddress: '',
    country: '',
    state: '',
    mobileNumber: '',
    emailAddress: user.email || '',
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.fullName || !formData.age || !formData.gender || !formData.occupation || !formData.deliveryAddress || !formData.country || !formData.state || !formData.mobileNumber || !formData.emailAddress || !formData.termsAccepted) {
        setError('Please fill in all required fields and accept terms & conditions');
        setLoading(false);
        return;
      }

      // Validate age is a number
      if (isNaN(formData.age) || formData.age < 18) {
        setError('You must be at least 18 years old');
        setLoading(false);
        return;
      }

      // Validate mobile number format
      if (!/^[\d\s\+\-\(\)]{10,}$/.test(formData.mobileNumber)) {
        setError('Please enter a valid mobile number');
        setLoading(false);
        return;
      }

      // Simulate KYC verification
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update user KYC status
      const result = authService.updateUserProfile(user.id, { kycVerified: true });
      
      if (result.success) {
        setSuccess('KYC verification completed successfully!');
        onUpdateUser(result.user);
        setStep('verified');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verified') {
    return (
      <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-8 border border-green-500/20">
        <div className="flex items-start gap-4">
          <CheckCircle size={32} className="text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-2 text-green-400">KYC Verification Complete</h3>
            <p className="text-white/60 mb-4">Your account has been fully verified. You can now claim any prizes you win from giveaways.</p>
            <div className="bg-[#111111] rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Verification Status:</span>
                <span className="text-green-400 font-medium">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Verified Name:</span>
                <span className="font-medium">{formData.fullName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">KYC Verification</h3>
        <p className="text-white/60">Complete your KYC verification to unlock the ability to claim prizes from giveaways</p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-gap-3">
          <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
          <span className="text-green-400 text-sm">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Acceptance Notice */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
          <p className="text-white/80 leading-relaxed mb-4">
            To proceed, please confirm your acceptance by replying "I Accept" and providing the required information. All submissions are subject to our <span className="font-bold text-blue-400">Terms & Conditions.</span>
          </p>
        </div>

        {/* Required Information List */}
        <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
          <h4 className="font-bold mb-4 text-white">Required Information:</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-white/40 mt-1">–</span>
              <span>Full Name</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/40 mt-1">–</span>
              <span>Full Delivery Address</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/40 mt-1">–</span>
              <span>Country & State</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/40 mt-1">–</span>
              <span>Age</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/40 mt-1">–</span>
              <span>Gender</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/40 mt-1">–</span>
              <span>Occupation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/40 mt-1">–</span>
              <span>Active Mobile/Text Number</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/40 mt-1">–</span>
              <span>Active Email Address</span>
            </li>
          </ul>
        </div>

        {/* Community Message */}
        <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
          <p className="text-white/70 leading-relaxed">
            Thank you for being part of our community and for celebrating innovation with us!
          </p>
        </div>

        {/* Form Fields */}
        <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/60 block mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                placeholder="Your full name"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/60 block mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                  placeholder="18+"
                  min="18"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                  disabled={loading}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-2">Occupation *</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                placeholder="Your occupation"
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-2">Full Delivery Address *</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                placeholder="Street address, building, apartment, etc."
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/60 block mb-2">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                  placeholder="Country"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-2">State/Province *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                  placeholder="State/Province"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-2">Active Mobile/Text Number *</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                placeholder="+1 (555) 123-4567"
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-2">Active Email Address *</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full bg-[#111111] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
                placeholder="your.email@example.com"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
              disabled={loading}
              className="mt-1 w-4 h-4 cursor-pointer"
            />
            <span className="text-xs text-white/60">
              I hereby confirm that I accept and agree to the{' '}
              {onViewTerms ? (
                <button
                  type="button"
                  onClick={onViewTerms}
                  className="text-white hover:underline font-medium"
                >
                  Terms & Conditions
                </button>
              ) : (
                <span className="font-medium">Terms & Conditions</span>
              )}
              . I understand that all submissions are subject to the terms provided.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-bold py-4 rounded-full hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Confirm & Complete KYC'}
        </button>
      </form>
    </div>
  );
}

export default KYCVerification;
