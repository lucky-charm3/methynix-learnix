import { useState } from 'react';
import { FaCode, FaBars, FaTimes, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Router hooks

export default function Header({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logoShadow = 'shadow-lime/50 drop-shadow-lg';

  const navItems = [
    { id: "home", name: "Home" },
    { id: "courses", name: "Courses" },
    { id: "testimonials", name: "Testimonials" },
    { id: "contact", name: "Contact Us" }
  ];

  // Helper: If on home page, scroll. If elsewhere, go home then scroll (simple version just goes home)
  const handleNavClick = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      // In a real app, you might use a URL param to trigger scroll after load
      // For now, we just navigate to home
      setTimeout(() => {
        const element = document.getElementById(id);
        if(element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      scrollToSection(id);
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-grayDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <div className={`w-8 h-8 rounded-full bg-lime border border-neon ${logoShadow} flex items-center justify-center`}>
            <FaCode className="w-5 h-5 text-dark" />
          </div>
          <span className="text-2xl font-extrabold text-lime tracking-wider">
            Methynix <span className="text-neon">Learnix</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-lime hover:text-neon transition-colors duration-300 font-medium relative group"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </button>
          ))}
          
          {/* LOGIN BUTTON */}
          <Link 
            to="/login"
            className="flex items-center gap-2 bg-neon text-dark font-bold px-5 py-2 rounded-full hover:bg-lime hover:shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FaSignInAlt /> Login
          </Link>
          <Link 
        to="/register"
        className="flex items-center gap-2 bg-neon text-dark font-bold px-5 py-2 rounded-full hover:bg-lime hover:shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all duration-300"
    >
        Get Started
    </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/login" className="text-neon font-bold text-sm border border-neon px-3 py-1 rounded-full">
            Login
          </Link>
           <Link 
        to="/register"
        className="flex items-center gap-2 bg-neon text-dark font-bold px-5 py-2 rounded-full hover:bg-lime hover:shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all duration-300"
    >
        Get Started
    </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="text-lime hover:text-neon p-2 transition-colors">
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-grayDark border-t border-dark p-4 transition-all duration-300 ease-in-out">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-lime hover:text-neon text-left font-semibold py-2 transition-colors border-b border-dark last:border-b-0"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};