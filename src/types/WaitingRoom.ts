export interface WaitingRoomPatient {
    id: string;
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
  }
  
  export interface WaitingRoomState {
    waitingRoom: WaitingRoomPatient[] | null;
    error: string | null;
    loading: boolean;
  } 