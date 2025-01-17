import { RootState } from "@/Redux/App/store";
import { AppointmentDetails } from "./appointment";
import { Patient, WaitingRoomPatient } from "./patient";

export interface PatientState {
  deletepatient: string[];
  allpatients: Patient[];
  error: string | null;
  loader: boolean;
}
export interface DoctorState {
  waitingroom: (AppointmentDetails | WaitingRoomPatient)[][];
  loader: boolean;
  error: string | null;
}
