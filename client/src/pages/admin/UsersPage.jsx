import { useState } from 'react';
import { useGetUsers, useDeleteUser } from '../../hooks/useUserQuery';
import { FaTrash, FaSearch, FaUserShield, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetUsers(search, page);
  const deleteMutation = useDeleteUser();

  const getRoleIcon = (role) => {
    switch(role) {
        case 'admin': return <FaUserShield className="text-red-500" />;
        case 'teacher': return <FaChalkboardTeacher className="text-neon" />;
        default: return <FaUserGraduate className="text-blue-400" />;
    }
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
        deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-neon">User Management</h1>
        <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-textDim" />
            <input 
                type="text" 
                placeholder="Search users..." 
                className="bg-grayDark pl-10 pr-4 py-2 rounded-lg border border-grayLight focus:border-neon outline-none text-textLight"
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </div>

      <div className="bg-grayDark rounded-xl border border-grayLight overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-dark/50 text-textDim uppercase text-xs">
                <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-grayLight/20">
                {isLoading ? (
                    <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>
                ) : data?.users?.map(user => (
                    <tr key={user._id} className="hover:bg-dark/30 transition-colors">
                        <td className="p-4 font-medium">{user.name}</td>
                        <td className="p-4 text-textDim">{user.email}</td>
                        <td className="p-4">
                            <span className="flex items-center gap-2 capitalize bg-dark/50 py-1 px-3 rounded-full text-xs w-fit border border-grayLight">
                                {getRoleIcon(user.role)} {user.role}
                            </span>
                        </td>
                        <td className="p-4">
                            {user.role !== 'admin' && (
                                <button 
                                    onClick={() => handleDelete(user._id)}
                                    className="text-danger hover:text-red-400 p-2 rounded hover:bg-danger/10 transition-colors"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* Pagination Controls could go here */}
    </div>
  );
};

export default UsersPage;