
import React from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', patients: 45, revenue: 2400 },
  { name: 'Tue', patients: 52, revenue: 3100 },
  { name: 'Wed', patients: 48, revenue: 2800 },
  { name: 'Thu', patients: 61, revenue: 3900 },
  { name: 'Fri', patients: 55, revenue: 3200 },
  { name: 'Sat', patients: 30, revenue: 1800 },
  { name: 'Sun', patients: 15, revenue: 900 },
];

const diseaseData = [
  { name: 'Flu', value: 400 },
  { name: 'Diabetes', value: 300 },
  { name: 'Hypertension', value: 300 },
  { name: 'Cardio', value: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <div className={`mt-2 text-xs font-semibold ${change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
        {change} <span className="text-slate-400 font-normal">from last month</span>
      </div>
    </div>
    <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Health Overview</h1>
          <p className="text-slate-500">Real-time statistics for the hospital ecosystem</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value="12,842" change="+12.5%" icon={Users} color="blue" />
        <StatCard title="Appointments" value="1,240" change="+3.2%" icon={Calendar} color="amber" />
        <StatCard title="Total Revenue" value="$42,500" change="+8.1%" icon={DollarSign} color="emerald" />
        <StatCard title="Active Alerts" value="14" change="-2.4%" icon={AlertCircle} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Patient Traffic vs Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Common Pathologies</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/3 space-y-2">
              {diseaseData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}} />
                  <span className="text-xs text-slate-600 font-medium">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Appointments</h3>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">P{item}</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Johnathan Miller</p>
                        <p className="text-xs text-slate-500">UID: MED-92381</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">Dr. Emily Blunt</p>
                    <p className="text-xs text-slate-500">Neurology</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={14} />
                      <span className="text-sm">10:45 AM</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 uppercase">Confirmed</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600">
                      <CheckCircle2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
