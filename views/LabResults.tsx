
import React from 'react';
import { Microscope, FileText, Download, CheckCircle, AlertCircle, ChevronRight, Activity } from 'lucide-react';
import { MOCK_LAB_TESTS } from '../constants';

const LabResults: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laboratory Information System</h1>
          <p className="text-slate-500">Track pathology reports, radiology results, and diagnostic trends</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-md transition-all">
          <Microscope size={18} /> New Test Request
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_LAB_TESTS.map((test) => (
          <div key={test.id} className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{test.testName}</h3>
                    <p className="text-xs text-slate-500 font-medium">Test ID: {test.id} • Date: {test.date}</p>
                  </div>
               </div>
               <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Download size={20} />
               </button>
            </div>
            
            <div className="p-6 space-y-4">
               <div className="grid grid-cols-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                  <span>Parameter</span>
                  <span className="text-center">Reference Range</span>
                  <span className="text-right">Result</span>
               </div>
               
               <div className="space-y-2">
                  {test.results?.map((res, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${res.isAbnormal ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100'}`}>
                      <div className="w-1/3">
                        <span className="text-sm font-semibold text-slate-700">{res.parameter}</span>
                      </div>
                      <div className="w-1/3 text-center">
                        <span className="text-xs text-slate-500">{res.range}</span>
                      </div>
                      <div className="w-1/3 text-right flex items-center justify-end gap-2">
                        <span className={`text-sm font-bold ${res.isAbnormal ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {res.value}
                        </span>
                        {res.isAbnormal && <AlertCircle size={14} className="text-rose-500" />}
                        {!res.isAbnormal && <CheckCircle size={14} className="text-emerald-500" />}
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-auto p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold">
                    <Activity size={14} className="text-blue-500" />
                    <span className="text-slate-500">Auto-analyzed by MedPulse Clinical Brain</span>
                </div>
                <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                    View Doctor Remarks <ChevronRight size={14} />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResults;
