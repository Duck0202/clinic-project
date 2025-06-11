import React from 'react';
import { BarChart3, TrendingUp, Users, Calendar, CreditCard } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Reports() {
  const { patients, appointments, bills, doctors } = useData();

  // Calculate statistics
  const totalPatients = patients.length;
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;
  const totalRevenue = bills.filter(bill => bill.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0);
  const pendingRevenue = bills.filter(bill => bill.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0);

  // Monthly data (simplified)
  const currentMonth = new Date().getMonth();
  const monthlyAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date).getMonth() === currentMonth
  ).length;

  const monthlyRevenue = bills.filter(bill => 
    bill.status === 'paid' && new Date(bill.created_at).getMonth() === currentMonth
  ).reduce((sum, bill) => sum + bill.amount, 0);

  const reports = [
    {
      title: 'ລາຍງານຄົນເຈັບ',
      title_en: 'Patient Report',
      value: totalPatients,
      icon: Users,
      color: 'bg-blue-500',
      description: 'Total registered patients'
    },
    {
      title: 'ລາຍງານນັດໝາຍ',
      title_en: 'Appointment Report',
      value: `${completedAppointments}/${totalAppointments}`,
      icon: Calendar,
      color: 'bg-green-500',
      description: 'Completed/Total appointments'
    },
    {
      title: 'ລາຍງານລາຍຮັບ',
      title_en: 'Revenue Report',
      value: `₭${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      description: 'Total revenue collected'
    },
    {
      title: 'ລາຍງານເດືອນນີ້',
      title_en: 'Monthly Report',
      value: `${monthlyAppointments} apt`,
      icon: BarChart3,
      color: 'bg-orange-500',
      description: `₭${monthlyRevenue.toLocaleString()} revenue`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-lao">ລາຍງານ</h1>
        <p className="text-gray-600 font-inter">Analytics and reports</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report, index) => (
          <div
            key={report.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 font-lao">{report.title}</p>
                <p className="text-xs text-gray-500 font-inter">{report.title_en}</p>
              </div>
              <div className={`${report.color} p-3 rounded-lg`}>
                <report.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{report.value}</p>
            <p className="text-sm text-gray-500 font-inter">{report.description}</p>
          </div>
        ))}
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Status Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 font-lao mb-4">ສະຖານະນັດໝາຍ</h3>
          <p className="text-sm text-gray-500 font-inter mb-4">Appointment Status Breakdown</p>
          
          <div className="space-y-3">
            {['scheduled', 'completed', 'cancelled', 'no-show'].map(status => {
              const count = appointments.filter(apt => apt.status === status).length;
              const percentage = totalAppointments > 0 ? (count / totalAppointments * 100).toFixed(1) : 0;
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      status === 'scheduled' ? 'bg-blue-500' :
                      status === 'completed' ? 'bg-green-500' :
                      status === 'cancelled' ? 'bg-red-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize font-inter">{status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                    <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 font-lao mb-4">ລາຍຮັບ</h3>
          <p className="text-sm text-gray-500 font-inter mb-4">Revenue Breakdown</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800 font-lao">ຈ່າຍແລ້ວ</p>
                <p className="text-xs text-green-600 font-inter">Paid</p>
              </div>
              <p className="text-lg font-bold text-green-800">₭{totalRevenue.toLocaleString()}</p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-yellow-800 font-lao">ຄ້າງຈ່າຍ</p>
                <p className="text-xs text-yellow-600 font-inter">Pending</p>
              </div>
              <p className="text-lg font-bold text-yellow-800">₭{pendingRevenue.toLocaleString()}</p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-800 font-lao">ລວມທັງໝົດ</p>
                <p className="text-xs text-blue-600 font-inter">Total Expected</p>
              </div>
              <p className="text-lg font-bold text-blue-800">₭{(totalRevenue + pendingRevenue).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 font-lao mb-4">ສະຖິຕິດ່ວນ</h3>
        <p className="text-sm text-gray-500 font-inter mb-4">Quick Statistics</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            <p className="text-sm text-gray-600 font-lao">ແພດ</p>
            <p className="text-xs text-gray-500 font-inter">Doctors</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{totalPatients}</p>
            <p className="text-sm text-gray-600 font-lao">ຄົນເຈັບ</p>
            <p className="text-xs text-gray-500 font-inter">Patients</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{monthlyAppointments}</p>
            <p className="text-sm text-gray-600 font-lao">ນັດໝາຍເດືອນນີ້</p>
            <p className="text-xs text-gray-500 font-inter">This Month</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">
              {totalAppointments > 0 ? Math.round(completedAppointments / totalAppointments * 100) : 0}%
            </p>
            <p className="text-sm text-gray-600 font-lao">ອັດຕາສຳເລັດ</p>
            <p className="text-xs text-gray-500 font-inter">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}