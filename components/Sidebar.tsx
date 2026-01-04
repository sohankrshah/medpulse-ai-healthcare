
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Pill, 
  Microscope, 
  CreditCard, 
  Settings, 
  MessageSquare,
  Stethoscope,
  Activity,
  AlertCircle,
  Building2,
  Wifi,
  LogOut
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, currentView, onNavigate, onLogout }) => {
  const getNavItems = () => {
    const base = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'chatbot', label: 'AI Health Chat', icon: MessageSquare },
    ];

    switch (role) {
      case UserRole.ADMIN:
        return [
          ...base,
          { id: 'analytics', label: 'Advanced Analytics', icon: Activity },
          { id: 'wards', label: 'Ward Management', icon: Building2 },
          { id: 'billing', label: 'Billing & Invoices', icon: CreditCard },
          { id: 'users', label: 'Staff Management', icon: Users },
        ];
      case UserRole.DOCTOR:
        return [
          ...base,
          { id: 'patients', label: 'Patient Records', icon: Users },
          { id: 'monitoring', label: 'Remote Monitoring', icon: Wifi },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'ai_diagnosis', label: 'AI Diagnosis Hub', icon: AlertCircle },
        ];
      case UserRole.NURSE:
        return [
          ...base,
          { id: 'wards', label: 'Bed Management', icon: Building2 },
          { id: 'monitoring', label: 'Patient Vitals', icon: Wifi },
          { id: 'patients', label: 'Patient List', icon: Users },
        ];
      case UserRole.PATIENT:
        return [
          ...base,
          { id: 'my_profile', label: 'Health Profile', icon: Users },
          { id: 'monitoring', label: 'My Vitals', icon: Activity },
          { id: 'book_appointment', label: 'Book Consult', icon: Calendar },
          { id: 'my_records', label: 'Medical History', icon: FileText },
          { id: 'billing', label: 'My Invoices', icon: CreditCard },
        ];
      case UserRole.PHARMACIST:
        return [
          ...base,
          { id: 'inventory', label: 'Medicine Stocks', icon: Pill },
          { id: 'prescriptions', label: 'E-Prescriptions', icon: FileText },
          { id: 'billing', label: 'Pharma Billing', icon: CreditCard },
        ];
      case UserRole.LAB_TECH:
        return [
          ...base,
          { id: 'lab_orders', label: 'Test Requests', icon: Microscope },
          { id: 'upload_results', label: 'Result Uploads', icon: FileText },
        ];
      default:
        return base;
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0 hidden md:flex flex-col shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Activity size={20} />
          </div>
          MedPulse AI
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t bg-slate-50/50 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
            {role[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 uppercase leading-tight truncate">{role.replace('_',' ')}</p>
            <p className="text-[10px] text-slate-500 truncate">Session Active</p>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Logout System
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
