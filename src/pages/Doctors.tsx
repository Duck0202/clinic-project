import React from 'react';
import { Plus, Phone, Mail, Award } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Doctors() {
  const { doctors, loading } = useData();

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
          <h1 className="text-2xl font-bold text-gray-900 font-lao">ແພດ</h1>
          <p className="text-gray-600 font-inter">Manage doctors and medical staff</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span className="font-inter">Add Doctor</span>
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-lg">
                    Dr
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 font-inter">Dr. {doctor.name}</h3>
                  <p className="text-sm text-primary-600 font-inter">{doctor.specialization}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="font-inter">{doctor.phone}</span>
              </div>
              {doctor.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="font-inter">{doctor.email}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="w-4 h-4" />
                <span className="font-inter">License: {doctor.license_number}</span>
              </div>
            </div>

            {doctor.schedule && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600 font-inter">
                  <strong>Schedule:</strong> {doctor.schedule}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-inter">No doctors registered</p>
        </div>
      )}
    </div>
  );
}