export interface RegisterFormData {
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

export interface RegisterProps {
  show: boolean;
  onPatientAdded?: () => void;
}

export interface RegistercomponentProps {
  onPatientAdded?: () => void;
}

