import React from 'react';
import { Users, Calendar, CreditCard, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Dashboard() {
  const { patients, appointments, bills, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.appointment_date === today;
  });

  const pendingBills = bills.filter(bill => bill.status === 'pending');
  const totalRevenue = bills
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const stats = [
    {
      name: 'ຄົນເຈັບທັງໝົດ',
      name_en: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'ນັດໝາຍມື້ນີ້',
      name_en: "Today's Appointments",
      value: todayAppointments.length,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      name: 'ບິນຄ້າງຈ່າຍ',
      name_en: 'Pending Bills',
      value: pendingBills.length,
      icon: AlertCircle,
      color: 'bg-yellow-500',
      change: '-8%',
      changeType: 'negative'
    },
    {
      name: 'ລາຍຮັບລວມ',
      name_en: 'Total Revenue',
      value: `₭${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+23%',
      changeType: 'positive'
    }
  ];

  const recentAppointments = appointments
    .filter(apt => apt.status === 'scheduled')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-lao">ແດັສບອດ</h1>
          <p className="text-gray-600 font-inter">Dashboard Overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 font-inter">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-lao">{stat.name}</p>
                <p className="text-xs text-gray-500 font-inter">{stat.name_en}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2 font-inter">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 font-lao">ນັດໝາຍຫຼ້າສຸດ</h3>
            <p className="text-sm text-gray-500 font-inter">Recent Appointments</p>
          </div>
          <div className="space-y-4">
            {recentAppointments.length > 0 ? (
              recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 font-inter">
                        {appointment.patient?.name || 'Unknown Patient'}
                      </p>
                      <p className="text-sm text-gray-500 font-inter">
                        {appointment.doctor?.name || 'Unknown Doctor'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 font-inter">
                      {appointment.appointment_time}
                    </p>
                    <p className="text-xs text-gray-500 font-inter">
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 font-inter">No recent appointments</p>
            )}
          </div>
        </div>

        {/* Pending Bills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 font-lao">ບິນຄ້າງຈ່າຍ</h3>
            <p className="text-sm text-gray-500 font-inter">Pending Bills</p>
          </div>
          <div className="space-y-4">
            {pendingBills.length > 0 ? (
              pendingBills.slice(0, 5).map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 font-inter">
                        {bill.patient?.name || 'Unknown Patient'}
                      </p>
                      <p className="text-sm text-gray-500 font-inter">
                        {bill.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 font-inter">
                      ₭{bill.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-yellow-600 font-inter">
                      Due: {new Date(bill.due_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 font-inter">No pending bills</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}