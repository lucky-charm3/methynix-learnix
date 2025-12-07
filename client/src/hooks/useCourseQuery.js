import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/axiosInstance';
import { toast } from 'react-hot-toast'; 

export const useGetCourses = (page = 1, search = '') => {
  return useQuery({
    queryKey: ['courses', { page, search }], 
    queryFn: async () => {
      const { data } = await api.get(`/courses?page=${page}&search=${search}`);
      return data; 
    },
    keepPreviousData: true, 
  });
};

export const useGetCourseById = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${id}`);
      return data.course;
    },
    enabled: !!id, 
  });
};


export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCourseData) => api.post('/courses', newCourseData),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      toast.success('Course created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create course');
    }
  });
};