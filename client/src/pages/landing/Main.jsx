import { useRef } from 'react';
import Header from './Header';
import Home from './Home';
import Courses from './Courses'; // Your Public Course Showcase
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

export default function Main() {
  // We don't strictly need refs if we use IDs on the divs directly
  // But refs are cleaner for React. Let's stick to IDs for simplicity with the Header logic
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen antialiased bg-dark text-textLight">
      {/* Pass the scroller function */}
      <Header scrollToSection={scrollToSection} />

      <main className="font-sans">
        <div id="home"><Home /></div>
        <div id="courses"><Courses /></div>
        <div id="testimonials"><Testimonials /></div>
        <div id="contact"><Contact /></div>
      </main>

      <Footer />
    </div>
  );
}