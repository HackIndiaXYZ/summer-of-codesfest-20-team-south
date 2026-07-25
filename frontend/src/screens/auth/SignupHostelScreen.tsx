import React, { useState } from 'react';
import { UserRole, ROLES } from '../../utils/constants/roles';
import { ArrowLeft, ChevronLeft, Building2, PhoneCall, UserCheck, Shield, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Dropdown from '../../components/common/Dropdown';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';
import Snackbar from '../../components/common/Snackbar';
import { SignupBasicData } from './SignupBasicScreen';
import { isValidPhone } from '../../utils/helpers/validators';

export interface SignupHostelData {
  hostelBlock: string;
  floorNumber: string;
  roomNumber: string;
  emergencyName: string;
  emergencyNumber: string;
}

export interface SignupHostelScreenProps {
  onNavigate: (route: string) => void;
  selectedRole: UserRole;
  basicData: SignupBasicData;
  onCompleteSignup: (role: UserRole, hostelData: SignupHostelData) => void;
}

export const SignupHostelScreen: React.FC<SignupHostelScreenProps> = ({
  onNavigate,
  selectedRole,
  basicData,
  onCompleteSignup,
}) => {
  const roleConfig = ROLES[selectedRole || 'resident'];

  const [formData, setFormData] = useState<SignupHostelData>({
    hostelBlock: '',
    floorNumber: '',
    roomNumber: '',
    emergencyName: '',
    emergencyNumber: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignupHostelData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ isOpen: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

  const handleChange = (field: keyof SignupHostelData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof SignupHostelData, string>> = {};

    if (!formData.hostelBlock) newErrors.hostelBlock = 'Please select a hostel block';
    if (!formData.floorNumber.trim()) newErrors.floorNumber = 'Floor number is required';
    if (!formData.roomNumber.trim()) newErrors.roomNumber = 'Room number / office code is required';

    if (!formData.emergencyName.trim()) newErrors.emergencyName = 'Emergency contact name is required';
    if (!formData.emergencyNumber) {
      newErrors.emergencyNumber = 'Emergency contact number is required';
    } else if (!isValidPhone(formData.emergencyNumber)) {
      newErrors.emergencyNumber = 'Enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      onCompleteSignup(selectedRole, formData);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FAF8F2] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('signup-step-1')}
            className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-semibold text-[#666666] hover:text-[#996E7D] transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Step 1
          </button>

          <Logo variant="navbar" size="sm" />
        </div>

        {/* Step Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-[#666666] mb-2">
            <span>Step 3 of 3: Campus & Hostel Assignment</span>
            <span className="text-[#996E7D]">100% Completed</span>
          </div>
          <div className="w-full h-2 bg-[#E7E4DF] rounded-full overflow-hidden">
            <div className="h-full bg-[#996E7D] w-full transition-all duration-300 rounded-full" />
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)]">
          <div className="mb-6 pb-4 border-b border-[#E7E4DF]">
            <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-[#1A1A1A]">
              Hostel & Emergency Details
            </h1>
            <p className="font-body text-xs text-[#666666] mt-1">
              Finalizing registration for <span className="font-bold text-[#1A1A1A]">{basicData.firstName || 'User'} {basicData.lastName}</span> ({roleConfig.title})
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Hostel Block Dropdown */}
            <Dropdown
              label="Hostel Block"
              value={formData.hostelBlock}
              onChange={(val) => handleChange('hostelBlock', val)}
              error={errors.hostelBlock}
              placeholder="Select Hostel Block"
              leftIcon={<Building2 className="w-4 h-4 text-[#8E8E93]" />}
              options={[
                { label: 'Vaigai Block A (Senior Resident)', value: 'vaigai-block-a' },
                { label: 'Kaveri Block B (Junior Resident)', value: 'kaveri-block-b' },
                { label: 'Bhavani Block C (Postgraduate)', value: 'bhavani-block-c' },
                { label: 'Amaravathi Block D (International)', value: 'amaravathi-block-d' },
                { label: 'Tamiraparani Block E (Staff Quarter)', value: 'tamiraparani-block-e' },
              ]}
              required
            />

            {/* Floor & Room Number (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Floor Number"
                placeholder="Enter floor number"
                value={formData.floorNumber}
                onChange={(e) => handleChange('floorNumber', e.target.value)}
                error={errors.floorNumber}
                required
              />

              <Input
                label={selectedRole === 'resident' ? 'Room Number' : 'Office / Station Code'}
                placeholder={selectedRole === 'resident' ? 'Enter room number' : 'Enter office code'}
                value={formData.roomNumber}
                onChange={(e) => handleChange('roomNumber', e.target.value)}
                error={errors.roomNumber}
                required
              />
            </div>

            {/* Emergency Contact Header */}
            <div className="pt-2">
              <label className="font-heading text-xs font-bold text-[#996E7D] uppercase tracking-wider block mb-1">
                Emergency Contact Details
              </label>
              <p className="font-body text-xs text-[#666666] mb-3">
                Used for instant safety broadcasts during Emergency SOS triggers.
              </p>
            </div>

            {/* Emergency Contact Name & Phone (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Name"
                placeholder="Enter contact name"
                value={formData.emergencyName}
                onChange={(e) => handleChange('emergencyName', e.target.value)}
                error={errors.emergencyName}
                leftIcon={<UserCheck className="w-4 h-4 text-[#8E8E93]" />}
                required
              />

              <Input
                label="Contact Phone Number"
                type="tel"
                placeholder="Enter mobile number"
                value={formData.emergencyNumber}
                onChange={(e) => handleChange('emergencyNumber', e.target.value)}
                error={errors.emergencyNumber}
                leftIcon={<PhoneCall className="w-4 h-4 text-[#8E8E93]" />}
                required
              />
            </div>

            {/* Role Verification Notice */}
            <div className="bg-[#FAF8F2] border border-[#E7E4DF] p-3.5 rounded-[12px] flex items-start gap-3 my-2">
              <Shield className="w-5 h-5 text-[#996E7D] shrink-0 mt-0.5" />
              <div className="text-xs text-[#666666] leading-relaxed">
                {selectedRole === 'resident' ? (
                  <p>
                    <strong className="text-[#1A1A1A]">Resident Fast-Track:</strong> Student accounts are instantly created and activated upon submission.
                  </p>
                ) : (
                  <p>
                    <strong className="text-[#1A1A1A]">Administrative Verification:</strong> As a {roleConfig.title}, your account will be placed in <span className="text-[#D97706] font-semibold">Pending Approval</span> mode until verified by the Super Admin.
                  </p>
                )}
              </div>
            </div>

            {/* Submit CTA */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              rightIcon={<CheckCircle2 className="w-5 h-5" />}
              className="mt-2"
            >
              Create Account
            </Button>

          </form>
        </Card>

      </div>

      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
      />
    </div>
  );
};

export default SignupHostelScreen;
