import { configureStore } from "@reduxjs/toolkit";
import PatientSlice from "../Slices/Patient/patientSlices";
import DoctorSlice from "../Slices/Admin/adminSlice";


// Configure the store
export const store = configureStore({
  reducer: {
    Patient: PatientSlice,
    Doctor: DoctorSlice,
  },
});

// Infer RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;