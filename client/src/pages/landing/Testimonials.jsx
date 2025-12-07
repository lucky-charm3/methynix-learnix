import {FaUser,FaStar} from 'react-icons/fa'

export default function Testimonials () {
  const testimonials = [
    {
      quote: "Methynix Learnix transformed my coding skills. The MERN course was practical, challenging, and perfectly structured. I got my first developer job right after finishing the program!",
      name: "Ayman C.",
      role: "Full-Stack Developer",
    },
    {
      quote: "I was struggling with design concepts, but the graphic design module helped me understand aesthetics and UI/UX instantly. My projects look 10x better now!",
      name: "Ian Kapela",
      role: "Aspiring Web Designer",
    },
    {
      quote: "The combination of technical skills and animation/video editing is unmatched. It truly prepared me for the multifaceted world of tech and media.",
      name: "Abigael C.",
      role: "Tech YouTuber & Animator",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-dark px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-4 text-lime">
          Hear From Our <span className="text-neon">Learners</span>
        </h2>
        <p className="text-center text-xl text-gray-400 mb-16">
          Real stories, real success. See how Methynix Learnix is making an impact.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-grayDark p-8 rounded-3xl shadow-xl border border-grayDark/50 transition-all duration-300 hover:border-lime/30 hover:shadow-neon/20">
              <FaStar className="w-6 h-6 text-neon mb-4 fill-neon" />
              <p className="italic text-gray-300 text-lg mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center space-x-3 border-t border-dark pt-4">
                <FaUser className="w-8 h-8 text-lime" />
                <div>
                  <p className="font-semibold text-lime">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
