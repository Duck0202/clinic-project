import React, { useState } from 'react';
import { Plus, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useData, Appointment } from '../contexts/DataContext';

export default function Appointments() {
  const { appointments, updateAppointmentStatus, loading } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredAppointments = appointments.filter(apt => 
    apt.appointment_date === selectedDate
  );

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'no-show':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusChange = async (appointmentId: string, newStatus: Appointment['status']) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900 font-lao">ນັດໝາຍ</h1>
          <p className="text-gray-600 font-inter">Manage appointments</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span className="font-inter">New Appointment</span>
        </button>
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <label className="text-sm font-medium text-gray-700 font-inter">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter"
          />
          <span className="text-sm text-gray-500 font-inter">
            {filteredAppointments.length} appointments
          </span>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 font-lao">
            ນັດໝາຍວັນທີ {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <p className="text-sm text-gray-500 font-inter">
            Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAppointments.length > 0 ? (
            filteredAppointments
              .sort((a, b) => a.appointment_time.localeCompare(b.appointment_time))
              .map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-inter">
                          {appointment.patient?.name || 'Unknown Patient'}
                        </h4>
                        <p className="text-sm text-gray-600 font-inter">
                          Dr. {appointment.doctor?.name || 'Unknown Doctor'}
                        </p>
                        <p className="text-sm text-gray-500 font-inter">
                          {appointment.appointment_time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize font-inter">{appointment.status}</span>
                      </span>

                      {appointment.status === 'scheduled' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'completed')}
                            className="text-green-600 hover:text-green-700 p-1 rounded"
                            title="Mark as completed"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                            className="text-red-600 hover:text-red-700 p-1 rounded"
                            title="Cancel appointment"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'no-show')}
                            className="text-gray-600 hover:text-gray-700 p-1 rounded"
                            title="Mark as no-show"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-3 ml-16">
                      <p className="text-sm text-gray-600 font-inter bg-gray-50 p-2 rounded">
                        <strong>Notes:</strong> {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-inter">No appointments scheduled for this date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}