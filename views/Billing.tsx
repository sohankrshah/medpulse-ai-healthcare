
import React from 'react';
import { CreditCard, DollarSign, FileText, Download, CheckCircle2, Clock, Filter, Plus } from 'lucide-react';

const Billing: React.FC = () => {
  const invoices = [
    { id: 'INV-9021', patient: 'John Doe', date: 'Oct 20, 2023', amount: 450.00, status: 'Paid', method: 'Insurance' },
    { id: 'INV-9022', patient: 'Jane Smith', date: 'Oct 22, 2023', amount: 125.50, status: 'Pending', method: 'Credit Card' },
    { id: 'INV-9023', patient: 'Robert Brown', date: 'Oct 25, 2023', amount: 2100.00, status: 'Overdue', method: 'Wire Transfer' },
    { id: 'INV-9024', patient: 'Emily Davis', date: 'Oct 26, 2023', amount: 75.00, status: 'Paid', method: 'Cash' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Payments</h1>
          <p className="text-slate-500 font-medium">Manage invoices, insurance claims, and hospital revenue</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
            <Download size={18} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
            <Plus size={18} /> New Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Revenue</p>
            <h4 className="text-2xl font-black text-slate-900">$124,500</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Collections</p>
            <h4 className="text-2xl font-black text-slate-900">$12,840</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Insurance Claims</p>
            <h4 className="text-2xl font-black text-slate-900">42</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
               <Filter size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">Invoice ID</th>
                <th className="px-8 py-4">Patient Name</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Method</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 text-sm font-bold text-blue-600">{inv.id}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-slate-900">{inv.patient}</td>
                  <td className="px-8 py-5 text-sm text-slate-500">{inv.date}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900">${inv.amount.toFixed(2)}</td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100 rounded-lg">{inv.method}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      inv.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-blue-600 group-hover:bg-white rounded-xl transition-all">
                      <Download size={18} />
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

export default Billing;
