import { FaIdCard, FaBookOpen } from 'react-icons/fa';
import { useGetCourses } from '../hooks/useCourseQuery';

const RegisterStep2 = ({ register, errors, watch }) => {
  const { data, isLoading } = useGetCourses();

  return (
    <div className={`space-y-5 animate-fadeIn`}>
      <h3 className="text-xl text-lime font-bold mb-4 flex items-center gap-2">
        <FaIdCard /> Profile & Education
      </h3>
      
      <div>
        <label className="block text-textDim text-xs uppercase mb-1">Professional Headline</label>
        <input 
          {...register("headline", { maxLength: { value: 50, message: "Max 50 chars" } })}
          className="w-full bg-dark border border-grayLight rounded-lg p-3 text-white focus:border-neon outline-none"
          placeholder="e.g. Student | React Enthusiast"
        />
        {errors.headline && <p className="text-danger text-xs mt-1">{errors.headline.message}</p>}
      </div>

      <div>
        <label className=" text-textDim text-xs uppercase mb-1 flex items-center gap-2">
           <FaBookOpen className="text-neon"/> Primary Course Interest
        </label>
        {isLoading ? (
            <div className="text-xs text-neon animate-pulse">Loading courses...</div>
        ) : (
            <div className="relative">
                <select 
                    {...register("selectedCourseId")} 
                    className="w-full bg-dark border border-grayLight rounded-lg p-3 text-white focus:border-neon outline-none appearance-none cursor-pointer hover:border-neon transition-colors"
                >
                    <option value="">-- I'm not ready to enroll yet --</option>
                    {data?.courses?.map(course => (
                        <option key={course._id} value={course._id}>
                            {course.title} {course.price === 0 ? '(Free)' : `($${course.price})`}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-4 pointer-events-none text-neon text-xs">▼</div>
            </div>
        )}
        <p className="text-[10px] text-textDim mt-1">You can always enroll in more courses later from your dashboard.</p>
      </div>

      <div>
        <label className="block text-textDim text-xs uppercase mb-1">Bio</label>
        <textarea 
          rows="4"
          {...register("bio", { maxLength: { value: 300, message: "Max 300 chars" } })}
          className="w-full bg-dark border border-grayLight rounded-lg p-3 text-white focus:border-neon outline-none resize-none"
          placeholder="Tell us about your learning goals..."
        ></textarea>
        <div className="text-right text-xs text-textDim mt-1">
          {watch('bio')?.length || 0}/300
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;