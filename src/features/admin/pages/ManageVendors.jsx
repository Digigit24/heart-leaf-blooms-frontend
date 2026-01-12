import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Store, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import { adminApi } from '@/features/admin/api/admin.api';

export default function ManageVendors() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ['adminVendors'],
    queryFn: async () => {
      const res = await adminApi.getAllVendors();
      return res.data || [];
    }
  });

  const filteredVendors = vendors.filter(v =>
    v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.shopName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Vendors</h1>
        <p className="text-text/60 mt-2">Manage registered vendors</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" size={18} />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Vendors List - Responsive Views */}
      <div className="space-y-4">

        {/* Mobile View: Compact Cards */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {isLoading ? (
            <div className="p-8 text-center text-text/60">Loading vendors...</div>
          ) : filteredVendors.length === 0 ? (
            <div className="p-8 text-center text-text/60">No vendors found.</div>
          ) : (
            filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white p-4 rounded-xl shadow-sm border border-border/50 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                      <Store size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-text">{vendor.shopName}</p>
                        {vendor.isFeatured && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-100 text-yellow-800 font-medium border border-yellow-200">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text/50">{vendor.name}</p>
                    </div>
                  </div>
                  <button className="p-2 text-text/50 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors -mr-2 -mt-2">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm border-t border-border/40 pt-3">
                  <div>
                    <span className="text-xs text-text/40 uppercase tracking-wider font-semibold block mb-0.5">Contact</span>
                    <p className="text-text/80 truncate">{vendor.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-text/40 uppercase tracking-wider font-semibold block mb-0.5">Status</span>
                    {vendor.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                        <CheckCircle size={12} /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500">
                        <XCircle size={12} /> Unverified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white">
              <thead className="bg-surface-2 text-text/60 text-xs uppercase tracking-wider font-semibold border-b border-border">
                <tr>
                  <th className="p-4 pl-6">Vendor / Shop</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Bank Details</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-text/60">Loading vendors...</td>
                  </tr>
                ) : filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-text/60">No vendors found.</td>
                  </tr>
                ) : (
                  filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-bg/50 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                            <Store size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-text">{vendor.shopName}</p>
                              {vendor.vendorTag && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-accent/20 text-text/80 font-medium border border-accent/20">
                                  {vendor.vendorTag}
                                </span>
                              )}
                              {vendor.isFeatured && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-100 text-yellow-800 font-medium border border-yellow-200">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-text/50">{vendor.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        <p className="text-text/80">{vendor.email}</p>
                        <p className="text-xs text-text/50">{vendor.shopAddress}</p>
                      </td>
                      <td className="p-4 text-sm">
                        <div className="flex flex-col">
                          <span className="text-text/80 font-medium">{vendor.bankName}</span>
                          <span className="text-xs text-text/50 font-mono">AC: ...{vendor.accountNumber?.slice(-4)}</span>
                          <span className="text-xs text-text/50">IFSC: {vendor.IFSC}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 items-start">
                          {vendor.isVerified ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              <CheckCircle size={12} /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                              <XCircle size={12} /> Unverified
                            </span>
                          )}
                          {vendor.status && (
                            <span className="text-[10px] uppercase font-bold text-text/40 tracking-wider ml-1">{vendor.status}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <button className="p-2 text-text/50 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}