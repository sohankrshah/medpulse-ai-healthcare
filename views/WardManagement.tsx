
import React, { useState } from 'react';
import { Layout, Bed, Users, AlertCircle, Search, Home, Building2, ChevronRight } from 'lucide-react';

const WardManagement: React.FC = () => {
  const floors = [
    { id: 'F1', name: 'General Medicine', total: 20, occupied: 15, icu: 0 },
    { id: 'F2', name: 'Surgical Ward', total: 15, occupied: 12, icu: 4 },
    { id: 'F3', name: 'Pediatrics', total: 10, occupied: 3, icu: 2 },
    { id: 'F4', name: 'ICU / Critical Care', total: 8, occupied: 7, icu: 8 },
  ];

  const [selectedFloor, setSelectedFloor] = useState(floors[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ward & Bed Management</h1>
          <p className="text-slate-500 font-medium">Real-time facility occupancy and patient allocation</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3 shadow-sm">
             <Search size={16} className="text-slate-400" />
             <input type="text" placeholder="Search Patient ID..." className="bg-transparent text-sm border-none outline-none w-40" />
          </div>
          <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all">
            Allocate Bed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Floor List */}
        <div className="lg:col-span-1 space-y-4">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Hospital Wings</h3>
           <div className="space-y-2">
              {floors.map((floor) => (
                <button
                  key={floor.id}
                  onClick={() => setSelectedFloor(floor)}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    selectedFloor.id === floor.id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 size={20} className={selectedFloor.id === floor.id ? 'text-blue-200' : 'text-slate-400 group-hover:text-blue-400'} />
                    <div className="text-left">
                      <p className="text-xs font-bold leading-tight">{floor.name}</p>
                      <p className={`text-[10px] ${selectedFloor.id === floor.id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {floor.occupied}/{floor.total} Beds Occupied
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className={selectedFloor.id === floor.id ? 'text-blue-300' : 'text-slate-200'} />
                </button>
              ))}
           </div>

           <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <AlertCircle size={18} />
                Critical Alert
              </div>
              <p className="text-xs text-amber-800 leading-normal">
                ICU occupancy on Floor 4 has reached 90%. Emergency protocols activated for new admissions.
              </p>
           </div>
        </div>

        {/* Visual Bed Grid */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                 <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedFloor.name} Layout</h2>
                    <p className="text-xs text-slate-500 font-medium">Floor {selectedFloor.id.replace('F','')}</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                       <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div> Available
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                       <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div> Occupied
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                 {Array.from({ length: selectedFloor.total }).map((_, i) => {
                   const isOccupied = i < selectedFloor.occupied;
                   return (
                     <div 
                       key={i} 
                       className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                         isOccupied 
                         ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100' 
                         : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100'
                       }`}
                     >
                       <Bed size={24} className="group-hover:scale-110 transition-transform" />
                       <div className="text-center">
                          <p className="text-[10px] font-black uppercase tracking-widest">Bed {i + 1}</p>
                          <p className="text-[8px] font-bold mt-0.5 opacity-60">
                             {isOccupied ? 'Patient: P-901' : 'Ready'}
                          </p>
                       </div>
                     </div>
                   );
                 })}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Users size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Floor Staff</p>
                    <h4 className="text-lg font-black text-slate-900">4 Nurses • 2 Doctors</h4>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex items-center gap-4">
                 <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                    <Home size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Discharges</p>
                    <h4 className="text-lg font-black text-slate-900">3 Patients Today</h4>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WardManagement;
