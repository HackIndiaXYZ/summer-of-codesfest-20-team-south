/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole } from './utils/constants/roles';
import Navbar from './components/layout/Navbar';
import LandingScreen from './screens/auth/LandingScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RoleSelectionScreen from './screens/auth/RoleSelectionScreen';
import SignupBasicScreen, { SignupBasicData } from './screens/auth/SignupBasicScreen';
import SignupHostelScreen, { SignupHostelData } from './screens/auth/SignupHostelScreen';
import PendingApprovalScreen from './screens/auth/PendingApprovalScreen';
import ResidentDashboard from './screens/app/ResidentDashboard';
import WardenDashboard from './screens/app/WardenDashboard';
import MaintenanceDashboard from './screens/app/MaintenanceDashboard';
import SecurityDashboard from './screens/app/SecurityDashboard';
import SuperAdminDashboard from './screens/app/SuperAdminDashboard';
import { Shield, Sparkles, Layers } from 'lucide-react';
import { ToastProvider } from './context/ToastContext';
import { WorkPassProvider } from './context/WorkPassContext';
import { CircleProvider } from './context/CircleContext';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<
    'landing' | 'login' | 'role-selection' | 'signup-step-1' | 'signup-step-2' | 'pending-approval' | 'resident-dashboard' | 'warden-dashboard' | 'maintenance-dashboard' | 'security-dashboard' | 'superadmin-dashboard'
  >('landing');

  const [selectedRole, setSelectedRole] = useState<UserRole>('resident');

  const [basicData, setBasicData] = useState<SignupBasicData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [hostelData, setHostelData] = useState<SignupHostelData>({
    hostelBlock: '',
    floorNumber: '',
    roomNumber: '',
    emergencyName: '',
    emergencyNumber: '',
  });

  // Handle Signup completion according to specification logic:
  // - If Resident -> Account Created -> Simulated Dashboard / Success Preview
  // - If Warden, Maintenance, Security -> Pending Approval Screen!
  const handleCompleteSignup = (role: UserRole, data: SignupHostelData) => {
    setHostelData(data);
    if (role === 'resident') {
      setActiveRoute('resident-dashboard');
    } else {
      setActiveRoute('pending-approval');
    }
  };

  return (
    <ToastProvider>
      <WorkPassProvider>
        <CircleProvider>
          <div className="min-h-screen bg-[#FAF8F2] flex flex-col font-body antialiased">
        
        {/* Dev / Phase 1 Screen Navigator Switcher */}
      <div className="bg-[#1A1A1A] text-white text-xs px-4 py-2 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#996E7D]" />
          <span className="font-heading font-extrabold tracking-tight text-white">
            Project <span className="text-[#996E7D]">Vaigai</span>
          </span>
          <span className="text-gray-400 font-mono text-[11px] hidden sm:inline">
            Phase 1 Frontend Architecture
          </span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => setActiveRoute('landing')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'landing' ? 'bg-[#996E7D] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            1. Landing
          </button>

          <button
            onClick={() => setActiveRoute('login')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'login' ? 'bg-[#996E7D] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            2. Login
          </button>

          <button
            onClick={() => setActiveRoute('role-selection')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'role-selection' ? 'bg-[#996E7D] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            3. Role Selection
          </button>

          <button
            onClick={() => setActiveRoute('signup-step-1')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'signup-step-1' ? 'bg-[#996E7D] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            4. Signup Step 1
          </button>

          <button
            onClick={() => setActiveRoute('signup-step-2')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'signup-step-2' ? 'bg-[#996E7D] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            5. Signup Step 2
          </button>

          <button
            onClick={() => setActiveRoute('pending-approval')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'pending-approval' ? 'bg-[#996E7D] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            6. Pending Approval
          </button>

          <button
            onClick={() => setActiveRoute('resident-dashboard')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'resident-dashboard' ? 'bg-[#A73FD3] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Resident Portal
          </button>

          <button
            onClick={() => setActiveRoute('warden-dashboard')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'warden-dashboard' ? 'bg-[#2A5C8A] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Warden Portal
          </button>

          <button
            onClick={() => setActiveRoute('maintenance-dashboard')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'maintenance-dashboard' ? 'bg-[#2E7D32] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Maintenance Portal
          </button>

          <button
            onClick={() => setActiveRoute('security-dashboard')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              activeRoute === 'security-dashboard' ? 'bg-[#D9534F] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Security Portal
          </button>

          <button
            onClick={() => setActiveRoute('superadmin-dashboard')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors shrink-0 ${
              activeRoute === 'superadmin-dashboard' ? 'bg-[#2A5C8A] text-white ring-1 ring-white/50' : 'text-[#996E7D] hover:text-white hover:bg-white/10'
            }`}
          >
            ⚡ Super Admin Portal
          </button>
        </div>
      </div>

      {/* Global Top Navbar on Public Pages */}
      {activeRoute !== 'resident-dashboard' && activeRoute !== 'warden-dashboard' && activeRoute !== 'maintenance-dashboard' && activeRoute !== 'security-dashboard' && activeRoute !== 'superadmin-dashboard' && (
        <Navbar
          onNavigate={(r) => setActiveRoute(r as any)}
          activeRoute={activeRoute}
        />
      )}

      {/* Active Screen View */}
      <div className="flex-1">
        {activeRoute === 'landing' && (
          <LandingScreen
            onNavigate={(r) => setActiveRoute(r as any)}
          />
        )}

        {activeRoute === 'login' && (
          <LoginScreen
            onNavigate={(r) => setActiveRoute(r as any)}
            onLoginSuccess={(email) => {
              if (email.toLowerCase().includes('super') || email.toLowerCase().includes('superadmin')) {
                setActiveRoute('superadmin-dashboard');
              } else if (email.toLowerCase().includes('warden') || email.toLowerCase().includes('priya') || email.toLowerCase().includes('admin')) {
                setActiveRoute('warden-dashboard');
              } else if (email.toLowerCase().includes('maintenance') || email.toLowerCase().includes('tech') || email.toLowerCase().includes('manoj') || email.toLowerCase().includes('electrician')) {
                setActiveRoute('maintenance-dashboard');
              } else if (email.toLowerCase().includes('security') || email.toLowerCase().includes('suresh') || email.toLowerCase().includes('gate') || email.toLowerCase().includes('guard')) {
                setActiveRoute('security-dashboard');
              } else {
                setActiveRoute('resident-dashboard');
              }
            }}
          />
        )}

        {activeRoute === 'role-selection' && (
          <RoleSelectionScreen
            onNavigate={(r) => setActiveRoute(r as any)}
            selectedRole={selectedRole}
            onSelectRole={(role) => setSelectedRole(role)}
          />
        )}

        {activeRoute === 'signup-step-1' && (
          <SignupBasicScreen
            onNavigate={(r) => setActiveRoute(r as any)}
            selectedRole={selectedRole}
            initialData={basicData}
            onNext={(data) => {
              setBasicData(data);
              setActiveRoute('signup-step-2');
            }}
          />
        )}

        {activeRoute === 'signup-step-2' && (
          <SignupHostelScreen
            onNavigate={(r) => setActiveRoute(r as any)}
            selectedRole={selectedRole}
            basicData={basicData}
            onCompleteSignup={handleCompleteSignup}
          />
        )}

        {activeRoute === 'pending-approval' && (
          <PendingApprovalScreen
            onNavigate={(r) => setActiveRoute(r as any)}
            userRole={selectedRole === 'warden' ? 'Warden / Administrator' : selectedRole === 'maintenance' ? 'Maintenance Technician' : selectedRole === 'security' ? 'Security Personnel' : 'Hostel Staff'}
            userEmail={basicData.email || 'staff@college.edu'}
          />
        )}

        {activeRoute === 'resident-dashboard' && (
          <ResidentDashboard
            userName={`${basicData.firstName} ${basicData.lastName}`}
            roomNumber={hostelData.roomNumber}
            hostelBlock="Vaigai Block A"
            onLogout={() => setActiveRoute('login')}
          />
        )}

        {activeRoute === 'warden-dashboard' && (
          <WardenDashboard
            userName="Dr. Priya Raman"
            onLogout={() => setActiveRoute('login')}
          />
        )}

        {activeRoute === 'maintenance-dashboard' && (
          <MaintenanceDashboard
            userName="Manoj Kumar"
            onLogout={() => setActiveRoute('login')}
          />
        )}

        {activeRoute === 'security-dashboard' && (
          <SecurityDashboard
            userName="Suresh Kumar"
            onLogout={() => setActiveRoute('login')}
          />
        )}

        {activeRoute === 'superadmin-dashboard' && (
          <SuperAdminDashboard
            userName="Super Administrator"
            onLogout={() => setActiveRoute('login')}
          />
        )}
      </div>
    </div>
        </CircleProvider>
      </WorkPassProvider>
    </ToastProvider>
  );
}
