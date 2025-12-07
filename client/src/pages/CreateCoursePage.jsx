import { useForm } from 'react-hook-form';
import { useCreateCourse } from '../hooks/useCourseQuery';

const CreateCoursePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const createMutation = useCreateCourse();

  const onSubmit = (data) => {
    // Convert string inputs to correct types
    const payload = { ...data, price: Number(data.price), estimatedPrice: Number(data.estimatedPrice) };
    createMutation.mutate(payload);
  };

  return (
    <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-neon">Create New Course</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-grayDark p-8 rounded-xl border border-grayLight space-y-6">
            
            <div>
                <label className="block text-textDim mb-2">Title</label>
                <input {...register("title", { required: true })} className="w-full bg-dark border border-grayLight rounded p-3 focus:border-neon outline-none"/>
            </div>

            <div>
                <label className="block text-textDim mb-2">Description</label>
                <textarea {...register("description", { required: true, minLength: 20 })} className="w-full bg-dark border border-grayLight rounded p-3 h-32 focus:border-neon outline-none"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-textDim mb-2">Price ($)</label>
                    <input type="number" {...register("price", { min: 0 })} className="w-full bg-dark border border-grayLight rounded p-3 focus:border-neon outline-none" defaultValue={0}/>
                </div>
                <div>
                    <label className="block text-textDim mb-2">Estimated Price ($)</label>
                    <input type="number" {...register("estimatedPrice")} className="w-full bg-dark border border-grayLight rounded p-3 focus:border-neon outline-none"/>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <input type="checkbox" {...register("isPublished")} className="w-5 h-5 accent-neon"/>
                <label>Publish Immediately</label>
            </div>

            <button type="submit" disabled={createMutation.isLoading} className="w-full bg-neon text-dark font-bold py-3 rounded hover:bg-neonHover">
                {createMutation.isLoading ? 'Creating...' : 'Create Course'}
            </button>
        </form>
    </div>
  );
};

export default CreateCoursePage;