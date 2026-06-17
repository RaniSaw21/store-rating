import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Store } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { toast } from 'sonner';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name must be at most 60 characters'),
    email: z.string().email('Invalid email address'),
    address: z.string().max(400, 'Address must be at most 400 characters').optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be at most 16 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    role: z.enum(['USER', 'STORE_OWNER']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'USER' },
  });

  const registerUser = useAuthStore((state) => state.register);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser({ ...registerData, address: registerData.address || '' });
      toast.success('Registration successful! Please login.');
      navigate('/auth/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <Store className="h-12 w-12 text-primary" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="name"
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            id="address"
            label="Address"
            placeholder="123 Main St, City"
            error={errors.address?.message}
            {...register('address')}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Role</label>
            <select
              {...register('role')}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="USER">User</option>
              <option value="STORE_OWNER">Store Owner</option>
            </select>
          </div>
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
}
