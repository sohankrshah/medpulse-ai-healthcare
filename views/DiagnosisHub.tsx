
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Stethoscope, 
  FlaskConical, 
  Activity, 
  ChevronRight,
  Loader2,
  FileText,
  Users
} from 'lucide-react';
import { geminiService } from '../services/geminiService';

const DiagnosisHub: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handlePredict = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const result = await geminiService.predictDisease(symptoms);
      setPrediction(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI Diagnostic Hub</h1>
        <p className="text-slate-500 font-medium">Advanced symptom analysis and clinical decision support system (CDSS)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="text-blue-600" size={20} />
              Input Symptoms
            </h3>
            <p className="text-xs text-slate-500">Provide detailed patient observations, onset time, and severity for higher accuracy.</p>
            <textarea
              className="w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
              placeholder="e.g., Patient reports severe fatigue, polyuria, increased thirst, and unintentional weight loss over the last 3 weeks..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <button
              onClick={handlePredict}
              disabled={loading || !symptoms.trim()}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
              {loading ? 'Analyzing Data...' : 'Generate Prediction'}
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold">
              <AlertTriangle size={20} />
              Warning
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              This tool uses Large Language Models to suggest clinical paths. It is intended to assist medical professionals and should not replace clinical judgment or official laboratory results.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!prediction && !loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                <Activity size={32} />
              </div>
              <h3 className="font-bold text-slate-900">Waiting for Data</h3>
              <p className="text-sm text-slate-500 max-w-xs mt-2">Enter patient symptoms to see AI-powered diagnosis suggestions and recommended tests.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-6 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-white rounded-3xl border border-slate-100 shadow-sm"></div>
                ))}
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      prediction.riskLevel === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {prediction.riskLevel} Risk Case
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 mt-3">{prediction.possibleDiagnosis}</h2>
                    <p className="text-slate-500 mt-1 font-medium">Confidence: {prediction.confidence}</p>
                  </div>
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Activity size={28} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                      <FlaskConical className="text-blue-500" size={18} />
                      Recommended Lab Tests
                    </h4>
                    <div className="space-y-2">
                      {prediction.recommendedTests.map((test: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl group hover:bg-blue-50 transition-colors">
                          <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:text-blue-500 text-xs font-bold">
                            {i + 1}
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{test}</span>
                          <ChevronRight size={14} className="ml-auto text-slate-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                      <FileText className="text-amber-500" size={18} />
                      Clinical Reasoning
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
                      {prediction.explanation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        {/* Users icon imported correctly now */}
                        <Users size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Similar Cases</h4>
                        <p className="text-xs text-slate-500">12 other patients with similar profile</p>
                    </div>
                    <button className="ml-auto text-slate-400 hover:text-blue-600">
                        <ChevronRight size={20} />
                    </button>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Treatment Plan</h4>
                        <p className="text-xs text-slate-500">Auto-generated roadmap</p>
                    </div>
                    <button className="ml-auto text-slate-400 hover:text-blue-600">
                        <ChevronRight size={20} />
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHub;
