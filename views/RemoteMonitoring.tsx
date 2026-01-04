
import React from 'react';
import { Activity, Heart, Thermometer, Wind, AlertTriangle, TrendingUp, Clock, Info } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const RemoteMonitoring: React.FC = () => {
  const liveData = [
    { time: '10:00', heartRate: 72, spO2: 98 },
    { time: '10:05', heartRate: 75, spO2: 97 },
    { time: '10:10', heartRate: 82, spO2: 98 },
    { time: '10:15', heartRate: 78, spO2: 99 },
    { time: '10:20', heartRate: 74, spO2: 98 },
    { time: '10:25', heartRate: 70, spO2: 98 },
    { time: '10:30', heartRate: 72, spO2: 97 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Remote Patient Monitoring</h1>
          <p className="text-slate-500 font-medium">Real-time IoT wearable data & critical vitals tracking</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-3 py-1.5 bg-rose-100 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div> Live Monitoring
           </div>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all">
              Add Patient Device
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
             <Heart className="text-rose-500" size={24} />
             <span className="text-[10px] font-bold text-emerald-500 uppercase">Normal</span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900">72 <span className="text-sm font-medium text-slate-400">BPM</span></h4>
            <p className="text-xs text-slate-500 mt-1">Average Heart Rate</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
             <Wind className="text-blue-500" size={24} />
             <span className="text-[10px] font-bold text-emerald-500 uppercase">Excellent</span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900">98 <span className="text-sm font-medium text-slate-400">%</span></h4>
            <p className="text-xs text-slate-500 mt-1">Blood Oxygen (SpO2)</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
             <Thermometer className="text-amber-500" size={24} />
             <span className="text-[10px] font-bold text-amber-500 uppercase">Slightly High</span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900">99.1 <span className="text-sm font-medium text-slate-400">°F</span></h4>
            <p className="text-xs text-slate-500 mt-1">Body Temperature</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
             <Activity className="text-indigo-500" size={24} />
             <span className="text-[10px] font-bold text-slate-400 uppercase">No Alerts</span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900">12.5 <span className="text-sm font-medium text-slate-400">RR</span></h4>
            <p className="text-xs text-slate-500 mt-1">Respiratory Rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Vital Trends (Last 30 Min)</h3>
                <p className="text-xs text-slate-500 font-medium">Patient: John Doe • Device: MedPulse Watch v2</p>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                 <Clock size={20} />
              </button>
           </div>
           
           <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={liveData}>
                    <defs>
                      <linearGradient id="colorHR" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorHR)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                 <AlertTriangle size={20} className="text-amber-500" />
                 Alert History
              </h3>
              <div className="space-y-4">
                 <div className="flex gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                    <div className="w-1.5 h-full bg-rose-500 rounded-full"></div>
                    <div>
                       <p className="text-xs font-bold text-rose-700">Tachycardia Warning</p>
                       <p className="text-[10px] text-rose-600 mt-1 leading-normal">Heart rate exceeded 100 BPM during sleep (02:15 AM).</p>
                    </div>
                 </div>
                 <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-1.5 h-full bg-blue-500 rounded-full"></div>
                    <div>
                       <p className="text-xs font-bold text-blue-700">Device Low Battery</p>
                       <p className="text-[10px] text-blue-600 mt-1 leading-normal">Patient wearable battery at 15%. Notification sent.</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 flex flex-col items-center text-center">
              <TrendingUp size={40} className="text-indigo-200 mb-4" />
              <h4 className="font-bold mb-2">AI Health Summary</h4>
              <p className="text-xs text-indigo-100 leading-relaxed">
                John's vitals are 92% stable compared to last week. Sleep quality has improved by 14% since prescribing Melatonin.
              </p>
              <button className="mt-6 w-full py-2.5 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-all">
                 Generate Detailed Analytics
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteMonitoring;
