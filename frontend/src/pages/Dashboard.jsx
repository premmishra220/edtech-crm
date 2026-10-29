import React, { useState, useEffect, useCallback } from 'react';
import { inquiryService } from '../services/api';
import {
  Search,
  Filter,
  RefreshCw,
  Users,
  CheckCircle,
  Clock,
  Inbox,
  AlertCircle,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

  // Filter States
  const [category, setCategory] = useState('');
  const [userType, setUserType] = useState('');
  const [search, setSearch] = useState('');

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (category) params.category = category;
      if (userType) params.userType = userType;
      if (search.trim()) params.search = search.trim();

      const response = await inquiryService.getInquiries(params);
      setInquiries(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to fetch inquiries. Please verify your authentication.'
      );
    } finally {
      setLoading(false);
    }
  }, [category, userType, search]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchInquiries();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [fetchInquiries]);

  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdatingId(id);
    try {
      const response = await inquiryService.updateStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleResetFilters = () => {
    setCategory('');
    setUserType('');
    setSearch('');
  };

  const stats = {
    total: inquiries.length,
    newCount: inquiries.filter((i) => i.status === 'NEW').length,
    inProgress: inquiries.filter((i) => i.status === 'IN_PROGRESS' || i.status === 'CONTACTED').length,
    resolved: inquiries.filter((i) => i.status === 'RESOLVED').length
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'CONTACTED':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'IN_PROGRESS':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'RESOLVED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getUserTypeBadge = (type) => {
    switch (type) {
      case 'STUDENT':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'PARENT':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'SCHOOL':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-5 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inquiry Management Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            View, filter, search, and update status of all submitted public inquiries
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          className="inline-flex items-center space-x-2 px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Inquiries</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-lg">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">New Inquiries</p>
            <p className="text-2xl font-bold text-sky-600">{stats.newCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">In Progress</p>
            <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.resolved}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 mb-6">
        <div className="flex items-center space-x-2 text-sm font-semibold text-gray-800 mb-4">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filters & Search</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone number..."
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="SCHOLARSHIP">Scholarship</option>
              <option value="CONCERT">Concert</option>
              <option value="ADMISSION">Admission</option>
              <option value="GENERAL_QUERY">General Query</option>
            </select>
          </div>

          <div>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All User Types</option>
              <option value="STUDENT">Student</option>
              <option value="PARENT">Parent</option>
              <option value="SCHOOL">School</option>
            </select>
          </div>
        </div>

        {(category || userType || search) && (
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
            <span>
              Active filters applied. Showing {inquiries.length} results.
            </span>
            <button
              onClick={handleResetFilters}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
          <div className="flex-1 text-sm text-red-700">{error}</div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User Type
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {loading && inquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                    <span>Loading inquiries...</span>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-base font-medium text-gray-900">No inquiries found</p>
                    <p className="text-xs text-gray-500 mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{inquiry.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{inquiry.email}</div>
                      <div className="text-xs font-mono text-gray-600 mt-0.5">{inquiry.phone}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getUserTypeBadge(inquiry.userType)}`}>
                        {inquiry.userType}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md">
                        {inquiry.category?.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-gray-700 line-clamp-2 max-w-xs" title={inquiry.message}>
                        {inquiry.message}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {formatDate(inquiry.createdAt)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative inline-block text-left">
                        <select
                          value={inquiry.status}
                          disabled={statusUpdatingId === inquiry.id}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          className={`text-xs font-semibold rounded-md border px-2.5 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatusBadge(inquiry.status)}`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
