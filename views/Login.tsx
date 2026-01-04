
import React, { useState } from 'react';
import { 
  Activity, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Stethoscope, 
  Building2, 
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PATIENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  const roles = [
    { id: UserRole.PATIENT, label: 'Patient', icon: User, desc: 'Access your records & book calls' },
    { id: UserRole.DOCTOR, label: 'Doctor', icon: Stethoscope, desc: 'Manage patients & consultations' },
    { id: UserRole.ADMIN, label: 'Admin', icon: Building2, desc: 'Hospital operations & analytics' },
    { id: UserRole.PHARMACIST, label: 'Pharmacist', icon: ShieldCheck, desc: 'Inventory & prescriptions' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate 2FA step
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl border border-white flex flex-col md:flex-row overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-700">
        {/* Left Side: Illustration & Branding */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-white font-black text-2xl mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-xl">
                <Activity size={24} strokeWidth={3} />
              </div>
              MedPulse AI
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-6">
              The Future of <br /> Healthcare Management.
            </h1>
            <p className="text-blue-100 font-medium leading-relaxed max-w-sm">
              Connect patients, doctors, and clinics with our AI-driven ecosystem. Secure, intelligent, and seamless.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                <div className="w-10 h-10 bg-emerald-400 rounded-2xl flex items-center justify-center text-white">
                   <ShieldCheck size={20} />
                </div>
                <div className="text-xs">
                   <p className="text-white font-bold uppercase tracking-wider">HIPAA Compliant</p>
                   <p className="text-blue-100">End-to-end encrypted medical data</p>
                </div>
             </div>
             <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest text-center">Version 3.1.0-PREVIEW</p>
          </div>

          {/* Abstract circles */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full"></div>
          <div className="absolute top-40 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
          {step === 'credentials' ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
                <p className="text-slate-500 font-medium">Please select your role and enter credentials</p>
              </div>

              {/* Role Selector Grid */}
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      className={`p-4 rounded-3xl border-2 text-left transition-all ${
                        selectedRole === r.id 
                        ? 'bg-blue-50 border-blue-600 ring-4 ring-blue-50' 
                        : 'bg-white border-slate-100 hover:border-blue-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                        selectedRole === r.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <p className={`font-bold text-sm ${selectedRole === r.id ? 'text-blue-600' : 'text-slate-700'}`}>{r.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium leading-tight mt-1">{r.desc}</p>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@medpulse.ai" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs text-slate-500 font-medium">Remember me</span>
                  </label>
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Forgot Password?</button>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-2xl py-4 font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group active:scale-95 mt-4"
                >
                  Continue <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
               <button 
                onClick={() => setStep('credentials')}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs flex items-center gap-2 mb-4"
               >
                 <ChevronRight size={16} className="rotate-180" /> Back to roles
               </button>

               <div>
                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[20px] flex items-center justify-center mb-6">
                    <Smartphone size={32} />
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 mb-2">Two-Factor Auth</h2>
                 <p className="text-slate-500 font-medium leading-relaxed">
                   We've sent a 6-digit verification code to your registered device.
                 </p>
               </div>

               <div className="flex gap-3 justify-between">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input 
                      key={i}
                      type="text" 
                      maxLength={1}
                      className="w-12 h-14 bg-slate-50 border border-slate-100 rounded-xl text-center text-xl font-bold text-blue-600 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none"
                    />
                  ))}
               </div>

               <div className="space-y-4">
                  <button 
                    onClick={handleVerifyOtp}
                    className="w-full bg-blue-600 text-white rounded-2xl py-4 font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Verify & Sign In
                  </button>
                  <p className="text-center text-xs text-slate-500 font-medium">
                    Didn't receive code? <button className="text-blue-600 font-bold hover:underline">Resend OTP</button>
                  </p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
