import { Appointment } from "./appointment";
import { Patient } from "./patient";

export interface PrescriptionResponse {
  id: string;
  patient: Patient;
  appointment: Appointment;
  medications: any[];
  diagnosis: string;
  notes: string;
}
