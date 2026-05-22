import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewAdmission from './pages/NewAdmission';
import TrialRegistrations from './pages/TrialRegistrations';
import AdmissionApproval from './pages/AdmissionApproval';
import DocumentVerification from './pages/DocumentVerification';
import StudentProfiles from './pages/students/StudentProfiles';
import ParentGuardianDetails from './pages/students/ParentGuardianDetails';
import MedicalInformation from './pages/students/MedicalInformation';
import BatchAllocation from './pages/students/BatchAllocation';
import StudentAttendance from './pages/attendance/StudentAttendance';
import CoachAttendance from './pages/attendance/CoachAttendance';
import LeaveManagement from './pages/attendance/LeaveManagement';
import AttendanceReports from './pages/attendance/AttendanceReports';

// Fee Management
import AdmissionFee from './pages/fees/AdmissionFee';
import MonthlyCollection from './pages/fees/MonthlyCollection';
import PendingFees from './pages/fees/PendingFees';
import PaymentReceipts from './pages/fees/PaymentReceipts';
import FeeReports from './pages/fees/FeeReports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admission">
            <Route path="new" element={<NewAdmission />} />
            <Route path="trial" element={<TrialRegistrations />} />
            <Route path="approval" element={<AdmissionApproval />} />
            <Route path="documents" element={<DocumentVerification />} />
          </Route>
          <Route path="students">
            <Route path="profiles" element={<StudentProfiles />} />
            <Route path="parents" element={<ParentGuardianDetails />} />
            <Route path="medical" element={<MedicalInformation />} />
            <Route path="batch-allocation" element={<BatchAllocation />} />
          </Route>
          <Route path="attendance">
            <Route path="students" element={<StudentAttendance />} />
            <Route path="coaches" element={<CoachAttendance />} />
            <Route path="leave" element={<LeaveManagement />} />
            <Route path="reports" element={<AttendanceReports />} />
          </Route>
          <Route path="fees">
            <Route path="admission" element={<AdmissionFee />} />
            <Route path="monthly" element={<MonthlyCollection />} />
            <Route path="pending" element={<PendingFees />} />
            <Route path="receipts" element={<PaymentReceipts />} />
            <Route path="reports" element={<FeeReports />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
