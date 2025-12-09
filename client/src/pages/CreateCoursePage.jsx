import { useForm } from 'react-hook-form';
import { useCreateCourse } from '../hooks/useCourseQuery';
import { FaCloudUploadAlt } from 'react-icons/fa';

const CreateCoursePage = () => {
  const { register, handleSubmit, watch } = useForm();
  const createMutation = useCreateCourse();

  // Watch for file selection to show preview (optional)
  const thumbnailFile = watch('thumbnail'); 

  const onSubmit = (data) => {
    // 1. Create FormData object
    const formData = new FormData();

    // 2. Append text fields
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('estimatedPrice', data.estimatedPrice);
    formData.append('isPublished', data.isPublished);

    // 3. Append the File (The crucial part)
    // data.thumbnail is a FileList array, we need the first item
    if (data.thumbnail && data.thumbnail[0]) {
        formData.append('thumbnail', data.thumbnail[0]);
    }

    // 4. Send FormData instead of JSON
    createMutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-neon">Create New Course</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-grayDark p-8 rounded-xl border border-grayLight space-y-6">
            
            <div>
                <label className="block text-textDim mb-2">Title</label>
                <input {...register("title", { required: true })} className="w-full bg-dark border border-grayLight rounded p-3 focus:border-neon outline-none text-white"/>
            </div>

            <div>
                <label className="block text-textDim mb-2">Description</label>
                <textarea {...register("description", { required: true })} className="w-full bg-dark border border-grayLight rounded p-3 h-32 focus:border-neon outline-none text-white"></textarea>
            </div>

            <div>
                <label className="block text-textDim mb-2">Course Thumbnail</label>
                <div className="border-2 border-dashed border-grayLight rounded-lg p-6 text-center hover:border-neon transition-colors relative">
                    <input 
                        type="file" 
                        accept="image/*"
                        {...register("thumbnail", { required: true })} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center pointer-events-none">
                        <FaCloudUploadAlt className="text-4xl text-neon mb-2" />
                        <span className="text-textDim text-sm">Click to upload course thumbnail</span>
                        {thumbnailFile && thumbnailFile[0] && (
                            <span className="text-neon text-xs mt-2">Selected: {thumbnailFile[0].name}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-textDim mb-2">Price ($)</label>
                    <input type="number" {...register("price", { min: 0 })} className="w-full bg-dark border border-grayLight rounded p-3 focus:border-neon outline-none text-white" defaultValue={0}/>
                </div>
                <div>
                    <label className="block text-textDim mb-2">Estimated Price ($)</label>
                    <input type="number" {...register("estimatedPrice")} className="w-full bg-dark border border-grayLight rounded p-3 focus:border-neon outline-none text-white"/>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <input type="checkbox" {...register("isPublished")} className="w-5 h-5 accent-neon"/>
                <label className="text-textDim">Publish Immediately</label>
            </div>

            <button type="submit" disabled={createMutation.isLoading} className="w-full bg-neon text-dark font-bold py-3 rounded hover:bg-neonHover">
                {createMutation.isLoading ? 'Uploading & Creating...' : 'Create Course'}
            </button>
        </form>
    </div>
  );
};

export default CreateCoursePage;