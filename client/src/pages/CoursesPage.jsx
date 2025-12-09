import { useGetCourses } from '../hooks/useCourseQuery';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { FaUserTie, FaEdit, FaPlay } from 'react-icons/fa';
import { useAuth } from '../providers/AuthProvider'; // Import Auth to check roles

const CoursesPage = () => {
  const { data, isLoading } = useGetCourses();
  const { user } = useAuth(); // Get current user
  const navigate = useNavigate();

  if (isLoading) return <div className="text-neon animate-pulse p-8">Loading courses...</div>;

  // Helper to check if current user is the course owner or admin
  const canManage = (course) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    // Check if teacherId is an object (populated) or string
    const teacherId = typeof course.teacherId === 'object' ? course.teacherId?._id : course.teacherId;
    return user.role === 'teacher' && teacherId === user._id;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Explore Courses</h1>
        <input 
            placeholder="Search..." 
            className="bg-grayDark border border-grayLight p-2 rounded text-sm w-64 focus:border-neon outline-none text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.courses?.map((course) => (
          <div key={course._id} className="bg-grayDark rounded-xl overflow-hidden border border-grayLight group hover:border-neon transition-all flex flex-col h-full">
            
            {/* Thumbnail Area */}
            <div className="h-40 bg-grayLight flex items-center justify-center text-textDim relative">
                {course.thumbnail?.url ? (
                    <img src={course.thumbnail.url} className="w-full h-full object-cover"/>
                ) : (
                    <span className="text-4xl">📚</span>
                )}
                
                {/* Overlay Badge for Price */}
                <div className="absolute top-2 right-2 bg-dark/80 backdrop-blur text-neon text-xs font-bold px-2 py-1 rounded">
                    {course.price === 0 ? 'FREE' : `$${course.price}`}
                </div>
            </div>
            
            {/* Content Area */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white truncate mb-2">{course.title}</h3>
                <p className="text-textDim text-sm line-clamp-2 mb-4 flex-1">{course.description}</p>
                
                <div className="flex items-center gap-2 text-xs text-textDim mb-4">
                    <FaUserTie className="text-neon"/> 
                    {course.teacherId?.name || 'Unknown Teacher'}
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-auto flex gap-3">
                    {/* If User is the Teacher/Admin: Show Manage Button */}
                    {canManage(course) ? (
                        <button 
                            onClick={() => navigate(`/course/${course._id}/manage`)}
                            className="flex-1 bg-grayLight hover:bg-white/10 text-white py-2 rounded flex items-center justify-center gap-2 transition-colors border border-grayLight"
                        >
                            <FaEdit className="text-neon" /> Manage
                        </button>
                    ) : null}

                    {/* View/Play Button for everyone */}
                    <Link 
                        to={`/course/${course._id}`} 
                        className={`flex-1 ${canManage(course) ? 'bg-neon text-dark' : 'bg-grayLight text-white hover:bg-neon hover:text-dark'} font-bold py-2 rounded flex items-center justify-center gap-2 transition-all`}
                    >
                       <FaPlay /> {canManage(course) ? 'Preview' : 'Start'}
                    </Link>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;