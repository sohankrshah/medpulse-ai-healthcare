
import React from 'react';
import { Clock, Stethoscope, Pill, FileText, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { MOCK_PATIENTS } from '../constants';

const PatientRecords: React.FC = () => {
  const patient = MOCK_PATIENTS[0];

  const timeline = [
    { type: 'visit', title: 'Cardiology Consultation', date: 'Oct 15, 2023', doc: 'Dr. Emily Blunt', desc: 'Routine checkup for hypertension management.', icon: Stethoscope, color: 'blue' },
    { type: 'med', title: 'New Prescription Issued', date: 'Sep 12, 2023', doc: 'Dr. Sarah Wilson', desc: 'Metformin 500mg, twice daily.', icon: Pill, color: 'emerald' },
    { type: 'lab', title: 'Blood Test Results', date: 'Aug 30, 2023', doc: 'Central Lab', desc: 'HbA1c: 6.8% (Stable).', icon: FileText, color: 'amber' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200">
           {patient.name[0]}
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{patient.name}</h2>
              <p className="text-slate-500 font-medium">UID: PAT-923812 • {patient.age} years old • {patient.gender}</p>
            </div>
            <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
              Edit Profile
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
             {patient.history.map((h, i) => (
               <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wide">
                 {h}
               </span>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(patient.vitals).map(([key, value]) => (
          <div key={key} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</p>
            <p className="text-xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <Clock className="text-blue-600" size={24} />
          Medical History Timeline
        </h3>
        
        <div className="space-y-4 relative">
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-100"></div>
          
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6 group">
              <div className={`relative z-10 w-12 h-12 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center border-2 border-white shadow-sm ring-4 ring-slate-50 transition-all group-hover:scale-110`}>
                 <item.icon size={20} />
              </div>
              <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                   <h4 className="font-bold text-slate-900">{item.title}</h4>
                   <span className="text-xs font-medium text-slate-400">{item.date}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{item.desc}</p>
                <div className="flex items-center justify-between text-xs">
                   <div className="flex items-center gap-2 font-bold text-slate-700">
                      <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center"><User size={12} /></div>
                      {item.doc}
                   </div>
                   <button className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
                      Full Record <ChevronRight size={14} />
                   </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex gap-6">
             <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border-2 border-white z-10 shadow-sm ring-4 ring-slate-50">
                <CheckCircle2 size={24} />
             </div>
             <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                Patient Registered
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
