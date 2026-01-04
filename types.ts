
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  ADMIN = 'ADMIN',
  LAB_TECH = 'LAB_TECH',
  PHARMACIST = 'PHARMACIST'
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  history: string[];
  vitals: {
    bp: string;
    sugar: number;
    bmi: number;
    pulse: number;
  };
  lastVisit: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  type: 'In-person' | 'Video';
}

export interface Medicine {
  id: string;
  name: string;
  stock: number;
  expiry: string;
  price: number;
  dosageInstructions: string;
}

export interface LabTest {
  id: string;
  patientId: string;
  testName: string;
  date: string;
  status: 'Pending' | 'Ready';
  results?: {
    parameter: string;
    value: number;
    range: string;
    isAbnormal: boolean;
  }[];
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}
