export default function Footer ()  {
    
  return (
    <footer className="bg-dark border-t border-grayDark">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">

          <a href="#" className="text-lime hover:text-neon transition-colors">Twitter</a>
          <a href="#" className="text-lime hover:text-neon transition-colors">LinkedIn</a>
          <a href="#" className="text-lime hover:text-neon transition-colors">GitHub</a>
        </div>
        
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Methynix Learnix. All rights reserved.
        </p>
        <p className="text-lime text-xs mt-2">
          A vision powered by CEO & Software Administrator: <span className="font-semibold text-neon">Helen Method James</span>.
        </p>
      </div>
    </footer>
  );
};