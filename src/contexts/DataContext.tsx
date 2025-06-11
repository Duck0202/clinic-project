import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
  emergency_contact?: string;
  medical_history?: string;
  created_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  email?: string;
  license_number: string;
  schedule?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  created_at: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface Bill {
  id: string;
  patient_id: string;
  appointment_id?: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'overdue';
  due_date: string;
  created_at: string;
  patient?: Patient;
}

interface DataContextType {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  bills: Bill[];
  loading: boolean;
  refreshData: () => Promise<void>;
  addPatient: (patient: Omit<Patient, 'id' | 'created_at'>) => Promise<void>;
  addDoctor: (doctor: Omit<Doctor, 'id' | 'created_at'>) => Promise<void>;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'created_at'>) => Promise<void>;
  addBill: (bill: Omit<Bill, 'id' | 'created_at'>) => Promise<void>;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => Promise<void>;
  updateBillStatus: (id: string, status: Bill['status']) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [patientsRes, doctorsRes, appointmentsRes, billsRes] = await Promise.all([
        supabase.from('patients').select('*').order('created_at', { ascending: false }),
        supabase.from('doctors').select('*').order('created_at', { ascending: false }),
        supabase.from('appointments').select(`
          *,
          patient:patients(*),
          doctor:doctors(*)
        `).order('appointment_date', { ascending: true }),
        supabase.from('bills').select(`
          *,
          patient:patients(*)
        `).order('created_at', { ascending: false })
      ]);

      if (patientsRes.data) setPatients(patientsRes.data);
      if (doctorsRes.data) setDoctors(doctorsRes.data);
      if (appointmentsRes.data) setAppointments(appointmentsRes.data);
      if (billsRes.data) setBills(billsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addPatient = async (patient: Omit<Patient, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('patients').insert([patient]);
    if (error) throw error;
    await refreshData();
  };

  const addDoctor = async (doctor: Omit<Doctor, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('doctors').insert([doctor]);
    if (error) throw error;
    await refreshData();
  };

  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('appointments').insert([appointment]);
    if (error) throw error;
    await refreshData();
  };

  const addBill = async (bill: Omit<Bill, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('bills').insert([bill]);
    if (error) throw error;
    await refreshData();
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);
    if (error) throw error;
    await refreshData();
  };

  const updateBillStatus = async (id: string, status: Bill['status']) => {
    const { error } = await supabase
      .from('bills')
      .update({ status })
      .eq('id', id);
    if (error) throw error;
    await refreshData();
  };

  const value = {
    patients,
    doctors,
    appointments,
    bills,
    loading,
    refreshData,
    addPatient,
    addDoctor,
    addAppointment,
    addBill,
    updateAppointmentStatus,
    updateBillStatus,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}