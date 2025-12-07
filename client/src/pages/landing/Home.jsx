import {useEffect,useState} from 'react';
import {FaArrowRight} from 'react-icons/fa';

export default function Home ()  {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { 
    setIsVisible(true);
 }, []); 

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-dark text-lime py-20 px-4">
      <div className={`max-w-4xl text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-xl text-forest mb-4 font-semibold animate-pulse">
          Welcome to Methynix Learnix!
        </p>
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-lime to-neon">
          Code Your Future.
          <span className="block text-lime">Design Your Destiny.</span>
        </h1>
        <p className="text-lg sm:text-xl mb-10 text-gray-300">
          The cutting-edge platform for mastering MERN, Java, AI/ML, and creative arts, founded by CEO Helen Method James.
        </p>
        <a href="#courses" className="inline-flex items-center px-8 py-4 text-dark font-bold text-lg rounded-xl bg-neon hover:bg-lime transition-all duration-300 ease-in-out transform hover:scale-105 shadow-2xl shadow-neon/40 group">
          Start Learning Today
          <FaArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};