import { NavLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { 
    FaBook, 
    FaChalkboardTeacher, 
    FaHome, 
    FaSignOutAlt, 
    FaUserShield, 
    FaPlusCircle,
    FaLayerGroup
} from 'react-icons/fa';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const NavItem = ({ to, icon, text }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-3 p-3 rounded-lg transition-all mb-1 font-medium ${
          isActive 
            ? 'bg-neon/10 text-neon border-l-4 border-neon shadow-[0_0_10px_rgba(57,255,20,0.1)]' 
            : 'text-textDim hover:bg-grayLight hover:text-white'
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </NavLink>
  );

  return (
    <aside className="w-64 h-screen bg-grayDark border-r border-grayLight flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-grayLight/50">
        <h1 className="text-2xl font-bold tracking-wider text-white">
          LEA<span className="text-neon">.DEV</span>
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        
        <div className="mb-6">
            <p className="text-xs font-bold text-textDim uppercase tracking-widest mb-3 ml-3">Menu</p>
            <NavItem to="/dashboard" icon={<FaHome />} text="Dashboard" />
            <NavItem to="/courses" icon={<FaBook />} text="Explore Courses" />
        </div>

        {/* TEACHER SECTION */}
        {['teacher', 'admin'].includes(user?.role) && (
          <div className="mb-6">
             <p className="text-xs font-bold text-textDim uppercase tracking-widest mb-3 ml-3">Instructor</p>
             <NavItem to="/create-course" icon={<FaPlusCircle />} text="Create Course" />
             {/* Ideally, "My Courses" would list courses where the user is the teacher */}
             <NavItem to="/my-students" icon={<FaChalkboardTeacher />} text="My Students" />
          </div>
        )}

        {/* ADMIN SECTION */}
        {user?.role === 'admin' && (
          <div className="mb-6">
             <p className="text-xs font-bold text-textDim uppercase tracking-widest mb-3 ml-3">Admin</p>
             <NavItem to="/users" icon={<FaUserShield />} text="Manage Users" />
             <NavItem to="/all-logs" icon={<FaLayerGroup />} text="System Logs" />
          </div>
        )}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-grayLight/50 bg-dark/20">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-neon text-dark font-bold flex items-center justify-center text-lg uppercase shadow-lg shadow-neon/20">
                {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                <p className="text-xs text-neon capitalize font-medium">{user?.role}</p>
            </div>
        </div>
        <button 
            onClick={logout} 
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-danger hover:bg-danger/10 transition-colors text-sm font-bold"
        >
            <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;