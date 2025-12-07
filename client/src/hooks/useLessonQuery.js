import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/axiosInstance';
import toast from 'react-hot-toast';

export const useGetLessons = (courseId) => {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: async () => {
      const { data } = await api.get(`/lessons?courseId=${courseId}`);
      return data.lessons;
    },
    enabled: !!courseId
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/lessons', data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['lessons', variables.courseId]);
      toast.success('Lesson added!');
    },
    onError: (err) => toast.error(err.response?.data?.message)
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`/lessons/${id}`, data),
    onSuccess: (_, variables) => {
      // Invalidate specific lesson and the list
      queryClient.invalidateQueries(['lessons']); 
      toast.success('Lesson updated!');
    },
    onError: (err) => toast.error(err.response?.data?.message)
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/lessons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['lessons']);
      toast.success('Lesson deleted');
    }
  });
};