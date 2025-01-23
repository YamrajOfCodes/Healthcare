import { Appointment } from "./appointment";
import { Patient } from "./patient";

export interface PrescriptionResponse {
  id: string;
  appointment: {
    id: string;
    mode: string;
    patient: {
      name: string;
      dob: string;
      address: string;
    };
  };
  medications: any[];
  diagnosis: string;
  notes: string;
  prescription_details: string;
}
