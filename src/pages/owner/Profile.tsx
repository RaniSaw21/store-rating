import { useAuthStore } from '../../store/authStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function OwnerProfile() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
            <p className="text-gray-900">{user.name}</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
            <p className="text-gray-900">{user.address || 'Not provided'}</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Role</label>
            <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
              {user.role}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Change Password</h2>
        <form className="space-y-4">
          <Input id="currentPassword" label="Current Password" type="password" />
          <Input id="newPassword" label="New Password" type="password" />
          <Input id="confirmPassword" label="Confirm Password" type="password" />
          <Button>Update Password</Button>
        </form>
      </div>
    </div>
  );
}
