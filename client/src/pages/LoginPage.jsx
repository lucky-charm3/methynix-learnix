import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useAuthQuery';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const loginMutation = useLogin();

  const onSubmit = (data) => loginMutation.mutate(data);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="bg-grayDark p-8 rounded-xl border border-grayLight w-full max-w-md z-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-textDim mb-6">Login to continue learning.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm text-textDim">Email</label>
            <input 
              {...register('email', { required: 'Email is required' })}
              className="w-full bg-dark border border-grayLight rounded p-3 text-white focus:border-neon outline-none" 
            />
            {errors.email && <span className="text-danger text-xs">{errors.email.message}</span>}
          </div>

          <div>
            <label className="text-sm text-textDim">Password</label>
            <input 
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full bg-dark border border-grayLight rounded p-3 text-white focus:border-neon outline-none" 
            />
            {errors.password && <span className="text-danger text-xs">{errors.password.message}</span>}
          </div>

          <button 
            disabled={loginMutation.isLoading}
            className="w-full bg-neon hover:bg-neonHover text-dark font-bold py-3 rounded transition-all mt-4"
          >
            {loginMutation.isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;