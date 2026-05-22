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

// Training & Batch Operations
import BatchCreation from './pages/training/BatchCreation';
import TrainingSchedule from './pages/training/TrainingSchedule';
import CoachAssignment from './pages/training/CoachAssignment';
import GroundAllocation from './pages/training/GroundAllocation';

// Coach Management
import CoachProfiles from './pages/coach/CoachProfiles';
import CoachAttendancePage from './pages/coach/CoachAttendance';
import AssignedBatches from './pages/coach/AssignedBatches';

// Reports & Analytics
import AdmissionReports from './pages/reports/AdmissionReports';
import FeeAnalytics from './pages/reports/FeeReports';
import AttendanceAnalytics from './pages/reports/AttendanceAnalytics';
import PerformanceReports from './pages/reports/PerformanceReports';

// Fee Management
import AdmissionFee from './pages/fees/AdmissionFee';
import MonthlyCollection from './pages/fees/MonthlyCollection';
import PendingFees from './pages/fees/PendingFees';
import PaymentReceipts from './pages/fees/PaymentReceipts';
import FeeReports from './pages/fees/FeeReports';

// Settings
import UserRoles from './pages/settings/UserRoles';
import Permissions from './pages/settings/Permissions';
import AcademySettings from './pages/settings/AcademySettings';
import SystemConfig from './pages/settings/SystemConfig';

// Admin Management
import AdminUsers from './pages/admin/AdminUsers';
import ActivityLogs from './pages/admin/ActivityLogs';
import AccessControl from './pages/admin/AccessControl';

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
          <Route path="training">
            <Route path="batch-creation" element={<BatchCreation />} />
            <Route path="schedule" element={<TrainingSchedule />} />
            <Route path="coach-assignment" element={<CoachAssignment />} />
            <Route path="ground-allocation" element={<GroundAllocation />} />
          </Route>
          <Route path="coach">
            <Route path="profiles" element={<CoachProfiles />} />
            <Route path="attendance" element={<CoachAttendancePage />} />
            <Route path="assigned-batches" element={<AssignedBatches />} />
          </Route>
          <Route path="reports">
            <Route path="admissions" element={<AdmissionReports />} />
            <Route path="fees" element={<FeeAnalytics />} />
            <Route path="attendance" element={<AttendanceAnalytics />} />
            <Route path="performance" element={<PerformanceReports />} />
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
          <Route path="settings">
            <Route path="roles" element={<UserRoles />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="academy" element={<AcademySettings />} />
            <Route path="system" element={<SystemConfig />} />
          </Route>
          <Route path="admin">
            <Route path="users" element={<AdminUsers />} />
            <Route path="activity-logs" element={<ActivityLogs />} />
            <Route path="access-control" element={<AccessControl />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
