import { FaCheckCircle } from 'react-icons/fa';

const RegisterStep3 = ({ formData}) => {

  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl text-lime font-bold mb-6 flex items-center gap-2">
        <FaCheckCircle /> Review Details
      </h3>

      <div className="bg-dark/50 p-6 rounded-xl border border-grayLight/50 space-y-4">
        <div className="flex justify-between border-b border-grayLight/30 pb-2">
          <span className="text-textDim">Name</span>
          <span className="text-white font-medium">{formData.name}</span>
        </div>

        <div className="flex justify-between border-b border-grayLight/30 pb-2">
          <span className="text-textDim">Email</span>
          <span className="text-white font-medium">{formData.email}</span>
        </div>
        
        <div className="flex justify-between border-b border-grayLight/30 pb-2">
            <span className="text-textDim">Selected Course</span>
            <span className={`font-medium ${formData.selectedCourseId ? 'text-neon' : 'text-textDim'}`}>
                {formData.selectedCourseId ? 'Pending Enrollment' : 'None Selected'}
            </span>
        </div>
        
        <div>
           <span className="text-textDim block mb-1">Bio</span>
           <p className="text-white text-sm bg-dark p-3 rounded border border-grayLight/20">
             {formData.bio || 'No bio provided.'}
           </p>
        </div>
      </div>

      <p className="text-textDim text-xs text-center mt-6">
        Clicking submit will create your <span className="text-neon">Student Account</span> and log you in.
      </p>
    </div>
  );
};

export default RegisterStep3;