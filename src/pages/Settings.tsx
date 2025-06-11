import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-lao">ຕັ້ງຄ່າ</h1>
        <p className="text-gray-600 font-inter">System settings and configuration</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-lao">ໂປຣໄຟລ໌</h3>
              <p className="text-sm text-gray-500 font-inter">Profile Settings</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 font-inter">Full Name</label>
              <input
                type="text"
                defaultValue="Admin User"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-inter">Email</label>
              <input
                type="email"
                defaultValue="admin@clinic.com"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 font-inter"
              />
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-inter">
              Update Profile
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-lao">ການແຈ້ງເຕືອນ</h3>
              <p className="text-sm text-gray-500 font-inter">Notification Settings</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 font-inter">Email Notifications</p>
                <p className="text-sm text-gray-500 font-inter">Receive email alerts</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 font-inter">Appointment Reminders</p>
                <p className="text-sm text-gray-500 font-inter">Daily appointment notifications</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 font-inter">Payment Alerts</p>
                <p className="text-sm text-gray-500 font-inter">Overdue payment notifications</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-lao">ຄວາມປອດໄພ</h3>
              <p className="text-sm text-gray-500 font-inter">Security Settings</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <p className="font-medium text-gray-900 font-inter">Change Password</p>
              <p className="text-sm text-gray-500 font-inter">Update your account password</p>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <p className="font-medium text-gray-900 font-inter">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500 font-inter">Add extra security to your account</p>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <p className="font-medium text-gray-900 font-inter">Login History</p>
              <p className="text-sm text-gray-500 font-inter">View recent login activity</p>
            </button>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-lao">ລະບົບ</h3>
              <p className="text-sm text-gray-500 font-inter">System Settings</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 font-inter">Clinic Name</label>
              <input
                type="text"
                defaultValue="ຄລີນິກສຸຂະພາບ"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 font-lao"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-inter">Time Zone</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 font-inter">
                <option>Asia/Vientiane</option>
                <option>Asia/Bangkok</option>
                <option>UTC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-inter">Language</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 font-inter">
                <option>ລາວ (Lao)</option>
                <option>English</option>
                <option>ไทย (Thai)</option>
              </select>
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-inter">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}