import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/axiosInstance';
import toast from 'react-hot-toast';

export const useGetUsers = (search = '', page = 1) => {
  return useQuery({
    queryKey: ['users', { search, page }],
    queryFn: async () => {
      const { data } = await api.get(`/users?search=${search}&page=${page}`);
      return data; // Expects { users, totalUsers, totalPages }
    },
    keepPreviousData: true
  });
};

export const useGetMyStudents = () => {
  return useQuery({
    queryKey: ['myStudents'],
    queryFn: async () => {
      const { data } = await api.get('/users/myStudents');
      // The controller returns { success, message, students: [] }
      // We must return data.students to the component
      return data.students; 
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete user')
  });
};