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
  updated_at: string;
}
export interface PatientState {
  loader: boolean;
  error: string | null;
  allpatients: Patient[];
  update: any[];
  complete: any[];
  deletepatient: any[];
  registerpatient?: any[];
  appointment?: any[];
  prescriptions?: any[]; // Add this line
  getappointments: {
    appointments: BaseAppointment[] | null;
    error: string | null;
  };
}
