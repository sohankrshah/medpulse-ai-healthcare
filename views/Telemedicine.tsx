
import React, { useEffect, useRef, useState } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, PhoneOff, User, MessageSquare, Bot, Star, Info } from 'lucide-react';

const Telemedicine: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Camera error:", err));
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [isCameraOn]);

  return (
    <div className="h-[calc(100vh-10rem)] grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 flex flex-col bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Main Video Window */}
        <div className="flex-1 flex items-center justify-center bg-slate-800 relative">
          {!isCameraOn ? (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center text-slate-500 mx-auto">
                <User size={48} />
              </div>
              <p className="text-slate-400 font-medium">Patient: Jane Smith (Waiting...)</p>
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover mirror" />
          )}
          
          {/* Picture-in-Picture Local Feed (Simulated) */}
          <div className="absolute top-6 right-6 w-48 h-32 bg-slate-700 rounded-2xl border-2 border-white/20 shadow-xl flex items-center justify-center">
             <div className="text-white/40"><User size={24} /></div>
             <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/40 px-2 py-0.5 rounded">Dr. Sarah (You)</div>
          </div>

          <div className="absolute top-6 left-6 flex gap-2">
            <div className="px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-bold animate-pulse flex items-center gap-1.5">
              <div className="w-2 h-2 bg-white rounded-full"></div> LIVE
            </div>
            <div className="px-3 py-1 bg-black/40 backdrop-blur-md text-white rounded-full text-xs font-bold">
              04:22
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-center gap-6">
          <button 
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMicOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-rose-500 text-white'}`}
          >
            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          <button 
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCameraOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-rose-500 text-white'}`}
          >
            {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
          <button className="w-16 h-12 bg-rose-600 text-white rounded-3xl flex items-center justify-center hover:bg-rose-700 transition-all">
            <PhoneOff size={20} />
          </button>
          <button className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
            <MessageSquare size={20} />
          </button>
        </div>
      </div>

      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 text-blue-600 font-bold mb-6">
            <Bot size={20} />
            AI Clinical Assistant
          </div>
          
          <div className="space-y-6">
             <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-800 leading-relaxed relative">
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                    <Star size={12} />
                </div>
                <strong>Analysis:</strong> Based on the audio feed, the patient sounds congested. Suggested question: "Have you experienced any fever or chills in the last 24 hours?"
             </div>

             <div className="space-y-3">
               <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical History Context</h5>
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-800">Asthma diagnosed 2018</p>
                  <p className="text-[10px] text-slate-500 mt-1">Last flare-up recorded 6 months ago.</p>
               </div>
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-800">Allergic to Ibuprofen</p>
                  <p className="text-[10px] text-rose-500 mt-1 font-bold italic">AVOID NSAIDs</p>
               </div>
             </div>

             <div className="pt-4 border-t border-slate-100">
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                  Generate E-Prescription
                </button>
             </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3">
           <Info className="text-amber-600 flex-shrink-0" size={18} />
           <p className="text-[10px] text-amber-800 font-medium leading-normal">
             The session is being recorded and will be summarized by MedPulse AI for the patient's EHR after the call.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;
