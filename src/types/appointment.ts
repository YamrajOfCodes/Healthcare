import { BaseAppointment, BasePatient } from "./shared";

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  mode: string;
  appointment_date: string;
  status: string;
  patient?: {
    name: string;
  };
}

export interface AppointmentsState {
  appointments: BaseAppointment[] | null;
  error: string | null;
}

export type AppointmentStatus = 'booked' | 'full' | 'completed' | 'pending' | 'cancelled' | 'available';

export interface FormattedAppointment {
  date: string;
  time: string;
  patient: string;
  status: AppointmentStatus;
  priority: string;
  details: string;
}

export interface DashCalenderProps {
  className?: string;
}

export interface AppointmentDetails {
  id: string;
  status: string;
  appointment: {
    id: string;
    mode: string;
    appointment_date: string;
    type: string;
  };
  patient: {
    name: string;
    email: string;
    phone: string;
    visit_count: number;
  };
  doctor: {
    name: string;
    specialization: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
}

export interface AppointmentFormData {
  patient_id: string;
  doctor_id: string;
  mode: string;
  appointment_date: string;
}
