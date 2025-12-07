import { useAuth } from '../providers/AuthProvider';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Hello, <span className="text-neon">{user.name}</span> 👋
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-grayDark p-6 rounded-lg border border-grayLight">
            <h3 className="text-textDim text-sm uppercase">Role</h3>
            <p className="text-2xl font-bold capitalize mt-1">{user.role}</p>
        </div>
        <div className="bg-grayDark p-6 rounded-lg border border-grayLight">
            <h3 className="text-textDim text-sm uppercase">Enrolled Courses</h3>
            <p className="text-2xl font-bold mt-1">{user.courses?.length || 0}</p>
        </div>

        <div className="bg-grayDark p-6 rounded-lg border border-grayLight">
            <h3 className="text-textDim text-sm uppercase">Lessons Completed</h3>
            <p className="text-2xl font-bold mt-1 text-neon">0</p>
        </div>
      </div>
      

    </div>
  );
};

export default Dashboard;