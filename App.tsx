
import React, { useState } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import RoleSwitcher from './components/RoleSwitcher';
import Dashboard from './views/Dashboard';
import Chatbot from './views/Chatbot';
import DiagnosisHub from './views/DiagnosisHub';
import Telemedicine from './views/Telemedicine';
import Pharmacy from './views/Pharmacy';
import LabResults from './views/LabResults';
import PatientRecords from './views/PatientRecords';
import Appointments from './views/Appointments';
import Billing from './views/Billing';
import WardManagement from './views/WardManagement';
import RemoteMonitoring from './views/RemoteMonitoring';
import Login from './views/Login';
import { 
    Bell, 
    Search, 
    User, 
    Menu, 
    LayoutDashboard, 
    LogOut,
    MessageSquare,
    Activity
} from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.DOCTOR);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'chatbot': return <Chatbot />;
      case 'ai_diagnosis': return <DiagnosisHub />;
      case 'telemedicine': return <Telemedicine />;
      case 'inventory': return <Pharmacy />;
      case 'lab_orders': return <LabResults />;
      case 'billing': return <Billing />;
      case 'wards': return <WardManagement />;
      case 'monitoring': return <RemoteMonitoring />;
      case 'appointments': 
      case 'book_appointment':
        return <Appointments onStartTelemedicine={() => setCurrentView('telemedicine')} />;
      case 'patients':
      case 'my_records':
      case 'my_profile': return <PatientRecords />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
            <LayoutDashboard size={32} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-600">Module Available Soon</h2>
            <p className="text-sm">The <strong>{currentView.replace('_', ' ')}</strong> module is under final validation.</p>
          </div>
        </div>
      );
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-x-hidden">
      <Sidebar 
        role={role} 
        currentView={currentView} 
        onNavigate={(v) => { setCurrentView(v); setIsSidebarOpen(false); }}
        onLogout={handleLogout}
      />

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 bg-white border-b sticky top-0 z-30 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-2 w-80 border border-slate-200 focus-within:border-blue-300 transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search records, docs, wards..." 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wide border border-emerald-100">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Network Secure
            </div>
            
            <div className="relative">
              <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform">
                {role[0]}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-slate-900 leading-tight">MedPulse User</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase">{role.replace('_', ' ')}</p>
              </div>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] w-full mx-auto">
          {renderContent()}
        </div>
      </main>

      <RoleSwitcher currentRole={role} onSwitch={(r) => {
          setRole(r);
          setCurrentView('dashboard');
      }} />

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-8">
                    <Activity size={24} /> MedPulse AI
                </div>
                <nav className="space-y-2">
                    <button onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${currentView === 'dashboard' ? 'bg-blue-50 text-blue-600 font-bold' : ''}`}>
                        <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button onClick={() => { setCurrentView('chatbot'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${currentView === 'chatbot' ? 'bg-blue-50 text-blue-600 font-bold' : ''}`}>
                        <MessageSquare size={18} /> Chat
                    </button>
                </nav>
                <div className="mt-auto pt-6 border-t">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 font-bold hover:bg-rose-50 rounded-xl transition-colors">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
