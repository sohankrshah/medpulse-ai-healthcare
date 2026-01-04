
import React from 'react';
import { Pill, AlertTriangle, Package, Calendar, Search, Filter } from 'lucide-react';
import { MOCK_MEDICINES } from '../constants';

const Pharmacy: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pharmacy Inventory</h1>
          <p className="text-slate-500">Manage medicine stocks, expiry dates, and e-prescriptions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50">
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700">
            <Package size={18} /> Add Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Pill size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Medicines</p>
            <h4 className="text-xl font-bold">248</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Low Stock Alert</p>
            <h4 className="text-xl font-bold">12 Items</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Expiring Soon</p>
            <h4 className="text-xl font-bold">5 Items</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <Search className="text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by medicine name or ID..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Medicine Name</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_MEDICINES.map((med) => {
                const isLow = med.stock < 20;
                const isExpiring = new Date(med.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                return (
                  <tr key={med.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{med.name}</div>
                      <div className="text-[10px] text-slate-400">ID: {med.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${Math.min(med.stock, 100)}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${isLow ? 'text-rose-600' : 'text-slate-600'}`}>
                          {med.stock} units
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${isExpiring ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>
                        {med.expiry}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      ${med.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {isLow ? (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-rose-50 text-rose-600 uppercase border border-rose-100">Low Stock</span>
                      ) : (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 uppercase border border-emerald-100">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 text-sm font-bold hover:underline">Update</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
