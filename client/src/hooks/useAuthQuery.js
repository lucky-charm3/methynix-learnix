import { useMutation } from '@tanstack/react-query';
import api from '../services/axiosInstance';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => api.post('/auth/login', data),
    onSuccess: (res) => {
      login(res.data.user, res.data.token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Login failed')
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => api.post('/auth/register', data),
    onSuccess: () => {
      toast.success('Account created! Please login.');
      navigate('/login');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Registration failed')
  });
};