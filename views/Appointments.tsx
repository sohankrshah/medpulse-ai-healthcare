
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search, 
  Video, 
  MapPin, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  Play,
  Mail,
  Smartphone,
  Check,
  AlertCircle
} from 'lucide-react';
import { MOCK_APPOINTMENTS, MOCK_PATIENTS } from '../constants';
import { Appointment } from '../types';

const Appointments: React.FC<{ onStartTelemedicine: () => void }> = ({ onStartTelemedicine }) => {
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list');
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'completed'>('all');
  const [isBooking, setIsBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastBooked, setLastBooked] = useState<Appointment | null>(null);

  const filteredAppointments = MOCK_APPOINTMENTS.filter(app => {
    if (activeTab === 'scheduled') return app.status === 'Scheduled';
    if (activeTab === 'completed') return app.status === 'Completed';
    return true;
  });

  const handleConfirmBooking = () => {
    // Simulate booking process
    const newApp: Appointment = {
      id: `A-${Math.floor(Math.random() * 9000) + 1000}`,
      patientId: 'P001',
      patientName: 'John Doe',
      doctorId: 'D001',
      doctorName: 'Dr. Sarah Wilson',
      date: '2023-11-25',
      time: '02:00 PM',
      status: 'Scheduled',
      type: 'Video'
    };
    setLastBooked(newApp);
    setIsBooking(false);
    setShowConfirmation(true);
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      // Logic could go here to hide the toast, but we keep the modal for user review
    }, 5000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointment Management</h1>
          <p className="text-slate-500 font-medium">Schedule and track patient consultations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex shadow-sm">
            <button 
              onClick={() => setViewType('list')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${viewType === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              List
            </button>
            <button 
              onClick={() => setViewType('calendar')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${viewType === 'calendar' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Calendar
            </button>
          </div>
          <button 
            onClick={() => setIsBooking(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus size={18} /> Book New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">November 2023</h3>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><ChevronLeft size={16} /></button>
                <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><ChevronRight size={16} /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: 30 }).map((_, i) => (
                <button 
                  key={i} 
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${i + 1 === 20 ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Load</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">Morning Slots</span>
                  <span className="text-xs font-bold text-emerald-500">85% Free</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[15%]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">Evening Slots</span>
                  <span className="text-xs font-bold text-rose-500">10% Free</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[90%]" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-200">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="font-bold">Next Milestone</h4>
             </div>
             <p className="text-sm text-blue-100 leading-relaxed mb-4">You have 4 back-to-back consultations starting at 2:00 PM today.</p>
             <button className="w-full py-2.5 bg-white text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all">
                Prepare Records
             </button>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-200">
            <button 
              onClick={() => setActiveTab('all')}
              className={`pb-4 text-sm font-bold transition-all px-2 relative ${activeTab === 'all' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              All Appointments
              {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('scheduled')}
              className={`pb-4 text-sm font-bold transition-all px-2 relative ${activeTab === 'scheduled' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Scheduled
              {activeTab === 'scheduled' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`pb-4 text-sm font-bold transition-all px-2 relative ${activeTab === 'completed' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Past
              {activeTab === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
            </button>
          </div>

          <div className="space-y-4">
            {filteredAppointments.map((app) => (
              <div key={app.id} className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-32 flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                    <span className="text-xs font-bold text-slate-400 uppercase">{app.date.split('-')[1] === '11' ? 'Nov' : 'Oct'}</span>
                    <span className="text-2xl font-black text-slate-900 leading-tight">{app.date.split('-')[2]}</span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase mt-1">{app.time}</span>
                  </div>

                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-lg">
                      {app.patientName[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{app.patientName}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${app.type === 'Video' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                          {app.type === 'Video' ? <Video size={12} /> : <MapPin size={12} />}
                          {app.type} Visit
                        </span>
                        <span className="text-xs text-slate-400 font-medium italic">ID: {app.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:border-l md:pl-6 border-slate-100">
                    <div className="hidden sm:block text-right mr-2">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                       <p className="text-sm font-bold text-slate-900">{app.status}</p>
                    </div>
                    {app.status === 'Scheduled' && (
                      <div className="flex items-center gap-2">
                        {app.type === 'Video' && (
                          <button 
                            onClick={onStartTelemedicine}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                          >
                            <Play size={16} fill="white" /> Join
                          </button>
                        )}
                        <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all">
                          Reschedule
                        </button>
                        <button className="px-3 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all">
                          Cancel
                        </button>
                      </div>
                    )}
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsBooking(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black text-slate-900">Book Appointment</h2>
                   <button onClick={() => setIsBooking(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all"><XCircle size={24} /></button>
                </div>
                
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient</label>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">J</div>
                         <span className="font-bold text-slate-900">John Doe</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Date</label>
                         <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:border-blue-300 transition-all">
                            <CalendarIcon size={16} className="text-blue-600" />
                            <span className="text-sm font-bold text-slate-700">Nov 25, 2023</span>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Slot</label>
                         <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:border-blue-300 transition-all">
                            <Clock size={16} className="text-blue-600" />
                            <span className="text-sm font-bold text-slate-700">02:00 PM</span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visit Type</label>
                      <div className="flex gap-3">
                         <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-50 border-2 border-blue-600 rounded-2xl text-blue-600 font-bold text-sm">
                            <Video size={18} /> Video
                         </button>
                         <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-500 font-bold text-sm hover:bg-slate-100 transition-all">
                            <MapPin size={18} /> In-person
                         </button>
                      </div>
                   </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                   <div className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      Patient will receive instant SMS & Email confirmation.
                   </div>
                   <button 
                     onClick={handleConfirmBooking}
                     className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                   >
                     Confirm Appointment
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Confirmation Step / Success Notification */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={() => setShowConfirmation(false)}></div>
           <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl border border-blue-50 p-10 text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-inner">
                 <Check size={40} strokeWidth={3} />
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
              <p className="text-slate-500 font-medium mb-8">Appointment #{lastBooked?.id} successfully scheduled.</p>
              
              <div className="space-y-4 mb-10">
                 <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-3 text-left">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                          <Mail size={18} />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Email Sent</p>
                          <p className="text-xs font-bold text-slate-700">john.doe@email.com</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 text-left">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                          <Smartphone size={18} />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">SMS Sent</p>
                          <p className="text-xs font-bold text-slate-700">+1 (555) 902-1234</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all">
                       Reschedule
                    </button>
                    <button className="flex-1 py-3 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold hover:bg-rose-100 transition-all">
                       Cancel visit
                    </button>
                 </div>
              </div>

              <button 
                onClick={() => setShowConfirmation(false)}
                className="w-full py-4 border-2 border-slate-100 text-slate-500 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all"
              >
                Return to Dashboard
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
