import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseById } from '../hooks/useCourseQuery';
import { useGetLessons } from '../hooks/useLessonQuery';
import { FaCheckCircle, FaPlayCircle } from 'react-icons/fa';

const CoursePlayerPage = () => {
  const { id } = useParams();
  const { data: course } = useGetCourseById(id);
  const { data: lessons, isLoading } = useGetLessons(id);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Default to first lesson when loaded
  if (lessons && lessons.length > 0 && !selectedLesson) {
    setSelectedLesson(lessons[0]);
  }

  if (isLoading) return <div>Loading Class...</div>;

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6">
      {/* Left: Content Area */}
      <div className="flex-1 overflow-y-auto pr-4">
        {selectedLesson ? (
            <div className="bg-grayDark p-8 rounded-xl border border-grayLight">
                <h1 className="text-3xl font-bold mb-4">{selectedLesson.title}</h1>
                <div className="prose prose-invert max-w-none text-textDim">
                    {/* Render Text Content (In real app, use Markdown parser) */}
                    <div className="whitespace-pre-wrap">{selectedLesson.content}</div>
                </div>
            </div>
        ) : (
            <div className="flex items-center justify-center h-full text-textDim">Select a lesson to start</div>
        )}
      </div>

      {/* Right: Playlist Sidebar */}
      <div className="w-80 bg-grayDark border border-grayLight rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-grayLight bg-grayLight/50">
            <h3 className="font-bold">{course?.title}</h3>
            <p className="text-xs text-textDim">{lessons?.length} Lessons</p>
        </div>
        <div className="flex-1 overflow-y-auto">
            {lessons?.map((lesson, index) => (
                <button 
                    key={lesson._id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left p-4 border-b border-grayLight/50 flex items-start gap-3 hover:bg-dark/50 transition-colors ${selectedLesson?._id === lesson._id ? 'bg-neon/10 border-l-4 border-l-neon' : ''}`}
                >
                    <span className="mt-1 text-neon"><FaPlayCircle /></span>
                    <div>
                        <p className={`text-sm font-medium ${selectedLesson?._id === lesson._id ? 'text-neon' : 'text-textLight'}`}>
                            {index + 1}. {lesson.title}
                        </p>
                        <p className="text-[10px] text-textDim mt-1">Text Lesson</p>
                    </div>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;