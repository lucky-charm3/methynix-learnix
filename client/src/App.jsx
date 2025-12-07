import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/Sidebar';
import { useAuth } from './providers/AuthProvider';

import Main from './pages/landing/Main'; 
import LoginPage from './pages/LoginPage';
import RegisterParent from './pages/RegisterParent'

import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage'; 
import CreateCoursePage from './pages/CreateCoursePage';
import CoursePlayerPage from './pages/CoursePlayerPage';
import ManageCourseLessons from './pages/teacher/ManageCourseLessons';
import MyStudents from './pages/teacher/MyStudents';
import UsersPage from './pages/admin/UsersPage';

const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-dark text-textLight font-sans">
            <Sidebar />
            <main className="ml-64 flex-1 p-8 overflow-x-hidden bg-dark">
                <Outlet />
            </main>
        </div>
    );
};

const ProtectedRoute = ({ allowedRoles ,children}) => {
    const { user, token, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-dark text-neon animate-pulse">
                Loading Application...
            </div>
        );
    }
    
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-dark text-center px-4">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-4">403</h1>
                <h2 className="text-2xl font-bold text-white mb-2">Access Forbidden</h2>
                <p className="text-textDim mb-8">You do not have the required permissions ({user.role}) to view this page.</p>
                <a 
                    href="/dashboard" 
                    className="px-6 py-2 bg-neon text-dark font-bold rounded hover:bg-lime transition-all"
                >
                    Return to Dashboard
                </a>
            </div>
        );
    }

   return children ? children : <AppLayout />;
};


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main /> 
    },
    { 
        path: "/login", 
        element: <LoginPage /> 
    },
     { 
        path: "/register",
       element: <RegisterParent /> 
      },

    {
        element: <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']} />,
        children: [
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/courses", element: <CoursesPage /> }, 
            { path: "/course/:id", element: <CoursePlayerPage /> }, 

            { 
                path: "/create-course", 
                element: <ProtectedRoute allowedRoles={['teacher', 'admin']}><CreateCoursePage /></ProtectedRoute>
            },
            {
                path: "/course/:id/manage",
                element: <ProtectedRoute allowedRoles={['teacher', 'admin']}><ManageCourseLessons /></ProtectedRoute>
            },
            {
                path: "/my-students",
                element: <div className="text-neon p-10 font-bold border border-neon rounded-lg m-10"><MyStudents/></div>
            },
            { 
                path: "/users", 
                element: <ProtectedRoute allowedRoles={['admin']}><UsersPage /></ProtectedRoute> 
            },
            {
                path: "/all-logs",
                element: <div className="text-neon p-10 font-bold border border-neon rounded-lg m-10">System Logs (Coming Soon)</div>
            }
        ]
    },
    {
        path: "*",
        element: (
            <div className="h-screen bg-dark flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-8xl font-bold text-grayDark mb-4">404</h1>
                <p className="text-2xl text-textLight mb-8">Page Not Found</p>
                <a href="/" className="text-neon hover:underline">Go Home</a>
            </div>
        )
    }
]);


const App = () => {
  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{ 
            style: { 
                background: '#1f1f1f', 
                color: '#fff', 
                border: '1px solid #333',
                padding: '16px',
                borderRadius: '8px'
            },
            success: { 
                iconTheme: { primary: '#39FF14', secondary: '#0a0a0a' },
                duration: 4000
            },
            error: { 
                iconTheme: { primary: '#ff4d4d', secondary: '#fff' },
                duration: 5000
            }
        }}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;