import { FaCheck } from 'react-icons/fa';
import { BookOpen, DollarSign, Zap } from 'lucide-react';

function CourseCard({ icon: Icon, title, description, features, price, isFree }) {
  return (
    <div className={`p-8 rounded-3xl transition-all duration-500 transform hover:scale-[1.02] 
      ${isFree ? 'bg-grayDark border-4 border-forest shadow-2xl shadow-forest/20' : 'bg-grayDark border-4 border-neon shadow-2xl shadow-neon/30'}`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Icon className={`w-8 h-8 ${isFree ? 'text-forest' : 'text-neon'}`} />
        <h3 className="text-3xl font-bold text-lime">{title}</h3>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <p key={index} className="flex items-start text-lime">
            <FaCheck className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${isFree ? 'text-forest' : 'text-neon'}`} />
            <span className="text-gray-200">{feature}</span>
          </p>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-dark/50">
        <span className={`text-4xl font-extrabold ${isFree ? 'text-forest' : 'text-neon'}`}>{price}</span>
        {/* <button className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 
          ${isFree 
            ? 'bg-forest text-dark hover:bg-lime hover:text-dark' 
            : 'bg-neon text-dark hover:bg-lime hover:shadow-lg hover:shadow-neon/40'}`}
        >
          {isFree ? 'Enroll Now' : 'Get Access'}
        </button> */}
      </div>
    </div>
  );
}

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-grayDark px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-4 text-lime">
          Our Cutting-Edge <span className="text-neon">Courses</span>
        </h2>
        <p className="text-center text-xl text-gray-400 mb-16">
          From full-stack development to creative design—master the skills the industry demands.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <CourseCard
            icon={BookOpen}
            title="Foundations"
            description="Start your journey with essential programming and design concepts, completely free!"
            features={[
              "HTML/CSS/JS Basics",
              "Intro to Git & GitHub",
              "Character Design Basics (Moho)",
              "Fundamentals of DaVinci Resolve",
            ]}
            price="FREE"
            isFree={true}
          />

          <CourseCard
            icon={DollarSign}
            title="The Developer Path"
            description="Deep dive into MERN stack and Java, becoming a robust, job-ready software engineer."
            features={[
              "Advanced MERN Stack & Deployment",
              "Java for Backend Development",
              "Data Structures and Algorithms",
              "Practical Project Portfolio Building",
            ]}
            price="$49/mo"
            isFree={false}
          />

          <CourseCard
            icon={Zap}
            title="AI & Creative Pro"
            description="Blend programming mastery with high-demand skills in AI, animation, and graphic design."
            features={[
              "Python & Data Science for AI/ML",
              "Professional Animation (Moho)",
              "Advanced GIMP/Graphic Design",
              "Video Editing & YouTube Strategy",
            ]}
            price="$79/mo"
            isFree={false}
          />
        </div>
      </div>
    </section>
  );
}