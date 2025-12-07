import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetCourseById } from '../../hooks/useCourseQuery';
import { useGetLessons, useCreateLesson, useDeleteLesson, useUpdateLesson } from '../../hooks/useLessonQuery';
import { FaPlus, FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';

const ManageCourseLessons = () => {
  const { id: courseId } = useParams();
  const { data: course } = useGetCourseById(courseId);
  const { data: lessons, isLoading } = useGetLessons(courseId);
  

  const [editingLesson, setEditingLesson] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const createMutation = useCreateLesson();
  const updateMutation = useUpdateLesson();
  const deleteMutation = useDeleteLesson();


  const { register, handleSubmit, reset, setValue } = useForm();

  // Open form for Create
  const handleOpenCreate = () => {
    setEditingLesson(null);
    reset(); // Clear form
    setIsFormOpen(true);
  };

  // Open form for Edit
  const handleOpenEdit = (lesson) => {
    setEditingLesson(lesson);
    setValue('title', lesson.title);
    setValue('content', lesson.content);
    setValue('order', lesson.order);
    setValue('section', lesson.section || 'General');
    setIsFormOpen(true);
  };

  const onSubmit = (data) => {
    if (editingLesson) {
        // Update Logic
        updateMutation.mutate({ 
            id: editingLesson._id, 
            data: { ...data, courseId } 
        }, {
            onSuccess: () => setIsFormOpen(false)
        });
    } else {
        // Create Logic
        createMutation.mutate({ 
            ...data, 
            courseId: courseId, 
            type: 'notes' // Default to notes for now
        }, {
            onSuccess: () => {
                setIsFormOpen(false);
                reset();
            }
        });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/courses" className="text-textDim hover:text-neon"><FaArrowLeft /></Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Manage Content</h1>
            <p className="text-textDim text-sm">Course: <span className="text-neon">{course?.title}</span></p>
        </div>
        <button 
            onClick={handleOpenCreate}
            className="ml-auto bg-neon text-dark font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-neonHover transition-all"
        >
            <FaPlus /> Add Lesson
        </button>
      </div>

      {/* Lesson List */}
      <div className="space-y-3">
        {isLoading ? <p>Loading content...</p> : lessons?.map((lesson) => (
            <div key={lesson._id} className="bg-grayDark p-4 rounded-lg border border-grayLight flex justify-between items-center group">
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-dark rounded-full flex items-center justify-center text-neon font-bold text-sm border border-grayLight">
                        {lesson.order}
                    </span>
                    <div>
                        <h3 className="font-bold text-lg group-hover:text-neon transition-colors">{lesson.title}</h3>
                        <p className="text-xs text-textDim">Section: {lesson.section}</p>
                    </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenEdit(lesson)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded"><FaEdit /></button>
                    <button onClick={() => deleteMutation.mutate(lesson._id)} className="p-2 text-danger hover:bg-danger/10 rounded"><FaTrash /></button>
                </div>
            </div>
        ))}
        {lessons?.length === 0 && <div className="text-center p-10 text-textDim border border-dashed border-grayLight rounded-lg">No lessons yet. Click "Add Lesson" to start.</div>}
      </div>

      {/* Modal / Form Area */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-grayDark w-full max-w-lg rounded-xl border border-neon/30 p-6 shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-white">
                    {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-xs text-textDim uppercase">Title</label>
                        <input {...register('title', { required: true })} className="w-full bg-dark border border-grayLight rounded p-2 focus:border-neon outline-none" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-textDim uppercase">Order</label>
                            <input type="number" {...register('order', { required: true })} className="w-full bg-dark border border-grayLight rounded p-2 focus:border-neon outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-textDim uppercase">Section</label>
                            <input {...register('section')} className="w-full bg-dark border border-grayLight rounded p-2 focus:border-neon outline-none" placeholder="e.g. Intro" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-textDim uppercase">Content</label>
                        <textarea {...register('content', { required: true })} rows="6" className="w-full bg-dark border border-grayLight rounded p-2 focus:border-neon outline-none" placeholder="Lesson text content..."></textarea>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-textDim hover:text-white">Cancel</button>
                        <button type="submit" className="bg-neon text-dark font-bold px-6 py-2 rounded hover:bg-neonHover">
                            {editingLesson ? 'Save Changes' : 'Create Lesson'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourseLessons;