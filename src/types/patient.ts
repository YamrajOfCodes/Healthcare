import { Appointment } from "./appointment";
import { PrescriptionResponse } from "./prescription";
import { BaseAppointment } from "./shared";

export interface ProfileProps {
  id: string | number;
  name: string;
  age?: number;
  gender?: string;
  address?: string;
  phone?: string;
  addedBy?: string;
  visits?: number;
  entryTime: string;
  waitingTime?: string;
  updated_at: string;
  created_at?: string;
  onOPDClick: () => void;
  onHealthClick: () => void;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  visit_count: number;
  email?: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
  age?: number;
}

export interface PatientData {
  id?: string;
  name?: string;
  dob?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface EditPatientProps {
  patientdata: PatientData;
  onClose: () => void;
}

export interface PatientFormData {
  fullname: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
}

export interface WaitingRoomPatient {
  id: string;
  appointment_id: string;
  patient: {
    name: string;
    address: string;
    phone: string;
    visit_count: number;
    gender: string;
    dob: string;
  };
  doctor: {
    name: string;
    specialization: string;
  };
  appointment: {
    id: string;
    mode: string;
    appointment_date: string;
    type: string;
  };
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  status: string;
  lastUpdated: string;
  updated_at: string;
}

export interface PatientState {
  loader: boolean;
  error: string | null;
  allpatients: Patient[];
  update: string[];
  complete: unknown[];
  deletepatient: string[];
  registerpatient?: unknown[];
  appointment?: Appointment[];
  prescriptions?: PrescriptionResponse[];
  healthrecord: unknown[];
  getappointments: {
    appointments: BaseAppointment[] | null;
    error: string | null;
  };
  transactions: unknown[];
}
