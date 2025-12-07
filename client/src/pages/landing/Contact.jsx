import {useState} from 'react';
import {FaEnvelope} from 'react-icons/fa';

export default function Contact () {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    e.target.reset(); 
  };

  return (
    <section id="contact" className="py-20 bg-grayDark px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-4 text-lime">
          Ready to <span className="text-neon">Connect</span>?
        </h2>
        <p className="text-center text-xl text-gray-400 mb-12">
          Reach out to us! We'd love to hear about your learning goals.
        </p>

        <div className="bg-dark p-8 sm:p-12 rounded-3xl shadow-2xl shadow-grayDark/50 border border-dark">
          {isSubmitted ? (
            <div className="text-center p-10">
              <FaEnvelope className="w-12 h-12 text-neon mx-auto mb-4" />
              <p className="text-2xl font-bold text-lime mb-2">Message Sent!</p>
              <p className="text-gray-400">Thank you for reaching out to Methynix Learnix. We'll be in touch soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-lime mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-grayDark border border-dark rounded-xl text-white focus:ring-neon focus:border-neon transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-lime mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 bg-grayDark border border-dark rounded-xl text-white focus:ring-neon focus:border-neon transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-lime mb-2">Message / Inquiry</label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 bg-grayDark border border-dark rounded-xl text-white focus:ring-neon focus:border-neon transition-all duration-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-dark bg-lime hover:bg-neon transition-all duration-300 transform hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
