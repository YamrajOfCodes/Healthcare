export interface BasePatient {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  }
  
  export interface BaseAppointment {
    id: string;
    patient_id: string;
    doctor_id: string;
    appointment_date: string;
    status: "confirmed" | "pending" | "cancelled";
    mode: string;
    patient?: {
      name: string;
    };
  }
  