import {createAsyncThunk,createSlice,PayloadAction} from "@reduxjs/toolkit"
import { addPatientAppointmentAPI, CompletePatientAPI, deletePatientsAPI, getPatientAppointmentAPI, getPatientsAPI, PatientAPI, patientPrescAPI, updatePatientsAPI } from "../../../APIS/Patient/PatientAPI"
import toast from "react-hot-toast"




type AppointmentsState = {
    appointments: Appointment[]; // Array of appointments
    error: string | null;
  };

// Define types for the Appointment and other states
type Appointment = {
  patient_id: string;
  doctor_id: string;
  mode: string;
  appointment_date: string;
};

type Patient = {
  id: string;
  name: string;
  // Add any other properties you expect
};

type PatientState = {
  registerpatient: Patient[];
  allpatients: Patient[];
  deletepatient: string[]; // Assuming delete returns a message or confirmation
  update: string[]; // Assuming update returns a message or confirmation
  appointment: Appointment[];
  getappointments: Appointment[];
  prescriptions: any[]; // Define the structure if known
  complete: any[]; // Define the structure if known
  error: string | null;
  loader: boolean;
};

// Define the async thunks
export const RegisterPatient = createAsyncThunk("register", async (data: any) => {
  try {
    console.log(data);
    const response = await PatientAPI(data);
    if (response.status === 200) {
      toast.success("patient registration successful");
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getallPatients = createAsyncThunk("getallpatients", async () => {
  try {
    const response = await getPatientsAPI();
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const Addappointment = createAsyncThunk(
  "appointment/addAppointment",
  async (appointment: Appointment, { rejectWithValue }) => {
    try {
      const response = await addPatientAppointmentAPI(appointment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppointments = createAsyncThunk("getallappointments", async () => {
  try {
    const response = await getPatientAppointmentAPI();
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Error while fetching appointments");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const patientPrescription = createAsyncThunk("patientsprescription", async () => {
  try {
    const response = await patientPrescAPI();
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Error while fetching prescriptions");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const deletePatient = createAsyncThunk("deletepatient", async (data: string) => {
  try {
    const response = await deletePatientsAPI(data);
    if (response.status === 200) {
      toast.success("Patient deleted");
      return "Patient deleted";
    } else {
      toast.success("Failed to delete patient");
      return "Failed to delete patient";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updatePatient = createAsyncThunk("updatepatient", async (data: any) => {
  try {
    const response = await updatePatientsAPI(data);
    if (response.status === 200) {
      toast.success("Patient updated");
      return "Patient updated";
    } else {
      toast.success("Failed to update patient");
      return "Failed to update patient";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const completePatient = createAsyncThunk("completePatient", async (data: any) => {
  try {
    const response = await CompletePatientAPI(data);
    if (response.status === 200) {
      toast.success("Patient consultation completed");
      return response.data;
    } else {
      toast.success("Failed to complete consultation");
      return "Failed to complete consultation";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Define the initial state
const initialState: PatientState = {
  registerpatient: [],
  allpatients: [],
  deletepatient: [],
  update: [],
  appointment: [],
  getappointments: [],
  prescriptions: [],
  complete: [],
  error: null,
  loader: false,
};

// Create the slice
export const PatientSlice = createSlice({
  name: "Patientslice",
   initialState:   {
    registerpatient: [],
    allpatients: [],
    deletepatient: [],
    update: [],
    appointment: [],
    getappointments:{ appointments: [], error: null },
    prescriptions: [],
    complete: [],
    error: null,
    loader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register Patient
      .addCase(RegisterPatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(RegisterPatient.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.registerpatient = [action.payload];
      })
      .addCase(RegisterPatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Get All Patients
      .addCase(getallPatients.pending, (state) => {
        state.loader = true;
      })
      .addCase(getallPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.loader = false;
        state.allpatients = action.payload;
      })
      .addCase(getallPatients.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Delete Patient
      .addCase(deletePatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(deletePatient.fulfilled, (state, action: PayloadAction<string>) => {
        state.loader = false;
        state.deletepatient = [action.payload];
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Add Appointment
      .addCase(Addappointment.pending, (state) => {
        state.loader = true;
      })
      .addCase(Addappointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.loader = false;
        state.appointment = [action.payload];
      })
      .addCase(Addappointment.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Get Appointments
      .addCase(getAppointments.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAppointments.fulfilled, (state, action: PayloadAction<AppointmentsState>) => {
        state.loader = false;
        state.getappointments = action.payload;  // Directly assign the payload (AppointmentsState)
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Get Prescriptions
      .addCase(patientPrescription.pending, (state) => {
        state.loader = true;
      })
      .addCase(patientPrescription.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loader = false;
        state.prescriptions = action.payload;
      })
      .addCase(patientPrescription.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Update Patient
      .addCase(updatePatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(updatePatient.fulfilled, (state, action: PayloadAction<string>) => {
        state.loader = false;
        state.update = [action.payload];
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Complete Patient Consultation
      .addCase(completePatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(completePatient.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.complete = [action.payload];
      })
      .addCase(completePatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });
  },
});

export default PatientSlice.reducer;
