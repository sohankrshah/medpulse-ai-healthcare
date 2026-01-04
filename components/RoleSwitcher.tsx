
import React from 'react';
import { UserRole } from '../types';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onSwitch: (role: UserRole) => void;
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onSwitch }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white shadow-2xl rounded-2xl p-4 border border-blue-100 flex flex-col gap-2">
      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Preview Role</p>
      <div className="grid grid-cols-2 gap-2">
        {Object.values(UserRole).map((role) => (
          <button
            key={role}
            onClick={() => onSwitch(role)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              currentRole === role 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
            }`}
          >
            {role.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitcher;
