import React from 'react';
import { Plus, CreditCard, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useData, Bill } from '../contexts/DataContext';

export default function Billing() {
  const { bills, updateBillStatus, loading } = useData();

  const getStatusColor = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusChange = async (billId: string, newStatus: Bill['status']) => {
    try {
      await updateBillStatus(billId, newStatus);
    } catch (error) {
      console.error('Error updating bill status:', error);
    }
  };

  const totalPaid = bills
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const totalPending = bills
    .filter(bill => bill.status === 'pending')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const totalOverdue = bills
    .filter(bill => bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-lao">ບິນ</h1>
          <p className="text-gray-600 font-inter">Manage billing and payments</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span className="font-inter">Create Bill</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 font-lao">ລາຍຮັບທັງໝົດ</p>
              <p className="text-xs text-gray-500 font-inter">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600 mt-2">₭{totalPaid.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 font-lao">ຄ້າງຈ່າຍ</p>
              <p className="text-xs text-gray-500 font-inter">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">₭{totalPending.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 font-lao">ເກີນກຳນົດ</p>
              <p className="text-xs text-gray-500 font-inter">Overdue</p>
              <p className="text-2xl font-bold text-red-600 mt-2">₭{totalOverdue.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 font-lao">ລາຍການບິນ</h3>
          <p className="text-sm text-gray-500 font-inter">All billing records</p>
        </div>

        <div className="divide-y divide-gray-200">
          {bills.length > 0 ? (
            bills.map((bill) => (
              <div key={bill.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 font-inter">
                        {bill.patient?.name || 'Unknown Patient'}
                      </h4>
                      <p className="text-sm text-gray-600 font-inter">{bill.description}</p>
                      <p className="text-xs text-gray-500 font-inter">
                        Due: {new Date(bill.due_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 font-inter">
                        ₭{bill.amount.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                        {getStatusIcon(bill.status)}
                        <span className="ml-1 capitalize font-inter">{bill.status}</span>
                      </span>

                      {bill.status !== 'paid' && (
                        <button
                          onClick={() => handleStatusChange(bill.id, 'paid')}
                          className="text-green-600 hover:text-green-700 text-sm font-medium font-inter"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-inter">No bills found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}