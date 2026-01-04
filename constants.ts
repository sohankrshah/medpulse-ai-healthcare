
import { Patient, Appointment, Medicine, LabTest } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    history: ['Hypertension', 'Type 2 Diabetes', 'Knee Surgery (2019)'],
    vitals: { bp: '130/85', sugar: 140, bmi: 26.5, pulse: 72 },
    lastVisit: '2023-10-15'
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    bloodGroup: 'A-',
    history: ['Seasonal Allergies', 'Asthma'],
    vitals: { bp: '115/75', sugar: 95, bmi: 22.1, pulse: 68 },
    lastVisit: '2023-11-02'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'A001',
    patientId: 'P001',
    patientName: 'John Doe',
    doctorId: 'D001',
    doctorName: 'Dr. Sarah Wilson',
    date: '2023-11-20',
    time: '10:30 AM',
    status: 'Scheduled',
    type: 'In-person'
  },
  {
    id: 'A002',
    patientId: 'P002',
    patientName: 'Jane Smith',
    doctorId: 'D001',
    doctorName: 'Dr. Sarah Wilson',
    date: '2023-11-20',
    time: '11:15 AM',
    status: 'Scheduled',
    type: 'Video'
  }
];

export const MOCK_MEDICINES: Medicine[] = [
  { id: 'M001', name: 'Metformin 500mg', stock: 15, expiry: '2024-05-12', price: 12.50, dosageInstructions: 'One tablet twice a day with meals.' },
  { id: 'M002', name: 'Amlodipine 5mg', stock: 5, expiry: '2024-01-15', price: 8.00, dosageInstructions: 'One tablet daily in the morning.' },
  { id: 'M003', name: 'Paracetamol 650mg', stock: 120, expiry: '2025-08-20', price: 2.00, dosageInstructions: 'As needed for fever, max 4 tablets/day.' },
  { id: 'M004', name: 'Amoxicillin 250mg', stock: 45, expiry: '2023-12-28', price: 18.20, dosageInstructions: 'One capsule every 8 hours for 7 days.' }
];

export const MOCK_LAB_TESTS: LabTest[] = [
  {
    id: 'L001',
    patientId: 'P001',
    testName: 'Complete Blood Count',
    date: '2023-11-10',
    status: 'Ready',
    results: [
      { parameter: 'Hemoglobin', value: 14.2, range: '13.5-17.5', isAbnormal: false },
      { parameter: 'WBC Count', value: 11.5, range: '4.5-11.0', isAbnormal: true },
      { parameter: 'Platelets', value: 250, range: '150-450', isAbnormal: false }
    ]
  },
  {
    id: 'L002',
    patientId: 'P002',
    testName: 'Lipid Profile',
    date: '2023-11-15',
    status: 'Ready',
    results: [
      { parameter: 'Total Cholesterol', value: 210, range: '<200', isAbnormal: true },
      { parameter: 'HDL', value: 45, range: '>40', isAbnormal: false },
      { parameter: 'LDL', value: 135, range: '<100', isAbnormal: true }
    ]
  }
];
