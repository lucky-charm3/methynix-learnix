import { useGetCourses } from '../hooks/useCourseQuery';
import { Link } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';

const CoursesPage = () => {
  const { data, isLoading } = useGetCourses();

  if (isLoading) return <div className="text-neon animate-pulse">Loading courses...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Explore Courses</h1>
        <input placeholder="Search..." className="bg-grayDark border border-grayLight p-2 rounded text-sm w-64 focus:border-neon outline-none"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.courses?.map((course) => (
          <Link key={course._id} to={`/course/${course._id}`} className="group block bg-grayDark rounded-xl overflow-hidden border border-grayLight hover:border-neon transition-all">
            <div className="h-40 bg-grayLight flex items-center justify-center text-textDim group-hover:bg-grayLight/80">
                {course.thumbnail ? <img src={course.thumbnail.url} className="w-full h-full object-cover"/> : <span className="text-4xl">📚</span>}
            </div>
            
            <div className="p-5">
                <h3 className="text-xl font-bold truncate group-hover:text-neon">{course.title}</h3>
                <p className="text-textDim text-sm line-clamp-2 mt-2">{course.description}</p>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-grayLight/50">
                    <div className="flex items-center gap-2 text-xs text-textDim">
                        <FaUserTie className="text-neon"/> 
                        {course.teacherId?.name || 'Unknown Teacher'}
                    </div>
                    <span className="font-bold text-white">
                        {course.price === 0 ? 'FREE' : `$${course.price}`}
                    </span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;