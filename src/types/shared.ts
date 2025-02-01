export interface BasePatient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  visit_count: number;
  gender: string;
  dob: string;
}

export interface BaseAppointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  status: "completed" | "pending" | "cancelled";
  mode: string;
  type: string;
  patient?: {
    name: string;
    email: string;
    phone: string;
    visit_count: number;
  };
  doctor?: {
    name: string;
    specialization: string;
  };
}
