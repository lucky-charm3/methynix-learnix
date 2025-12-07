import { useGetMyStudents } from '../../hooks/useUserQuery';
import { FaUserGraduate, FaEnvelope, FaBookOpen, FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const MyStudents = () => {
  // Now 'data' is the actual array of students
  const { data: studentsList, isLoading, isError } = useGetMyStudents();
  const [searchTerm, setSearchTerm] = useState('');

  // Safe check for array before filtering
  const students = Array.isArray(studentsList) ? studentsList : [];

  const filteredStudents = students.filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="p-8 text-neon animate-pulse">Loading students...</div>;
  if (isError) return <div className="p-8 text-danger">Error loading students.</div>;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FaUserGraduate className="text-neon" /> My Students
          </h1>
          <p className="text-textDim mt-1">
            Total Active Students: <span className="text-white font-bold">{students.length}</span>
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-textDim" />
          <input 
            type="text" 
            placeholder="Search name or email..." 
            className="w-full bg-grayDark border border-grayLight rounded-full py-2 pl-10 pr-4 text-sm focus:border-neon outline-none transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      {filteredStudents.length === 0 ? (
        <div className="bg-grayDark border border-dashed border-grayLight rounded-xl p-12 text-center">
          <FaUserGraduate className="text-4xl text-textDim mx-auto mb-4" />
          <h3 className="text-xl text-white font-bold">No Students Found</h3>
          <p className="text-textDim">
            {searchTerm ? "No results match your search." : "No students enrolled yet."}
          </p>
        </div>
      ) : (
        <div className="bg-grayDark rounded-xl border border-grayLight overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 text-textDim text-xs uppercase tracking-wider border-b border-grayLight">
                  <th className="p-4 font-semibold">Student Name</th>
                  <th className="p-4 font-semibold">Contact</th>
                  <th className="p-4 font-semibold">Enrolled Courses</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grayLight/30">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-grayLight flex items-center justify-center text-neon font-bold">
                          {student.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-neon transition-colors">
                            {student.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-textDim">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-xs" />
                        {student.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {student.courses && student.courses.length > 0 ? (
                          student.courses.map((course, idx) => (
                            <span key={idx} className="flex items-center gap-1 text-xs bg-neon/10 text-neon px-2 py-1 rounded border border-neon/20">
                              <FaBookOpen className="text-[10px]" />
                              {/* Check if course is populated object or just ID string */}
                              {typeof course === 'object' ? course.title : 'Course ID: ' + course.substring(0,6)}
                            </span>
                          ))
                        ) : (
                          <span className="text-textDim italic text-sm">No enrollments</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <a 
                        href={`mailto:${student.email}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-sm rounded transition-all border border-transparent hover:border-grayLight"
                      >
                        <FaEnvelope className="text-neon" /> Email
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStudents;