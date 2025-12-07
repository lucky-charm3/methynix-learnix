import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuthQuery';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import RegisterStep1 from '../components/RegisterStep1';
import RegisterStep2 from '../components/RegisterStep2';
import RegisterStep3 from '../components/RegisterStep3';

const RegisterParent = () => {
  const [step, setStep] = useState(1);
  const { mutate: registerUser, isLoading } = useRegister();
  
  const { 
    register, 
    trigger, 
    watch, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    mode: 'onChange',
    shouldUnregister: false 
  });

  const formData = watch();

  const nextStep = async () => {
    let valid = false;
    
    if (step === 1) {
        valid = await trigger(['name', 'email', 'password', 'confirmPassword']);
    } else if (step === 2) {
        valid = await trigger(['headline', 'bio', 'selectedCourseId']);
    }

    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    const { confirmPassword, selectedCourseId, ...rest } = data;
    
    const payload = {
        ...rest,
        role: 'student',
        courses: selectedCourseId ? [selectedCourseId] : []
    };

    registerUser(payload);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

        <div className="w-full max-w-2xl bg-grayDark rounded-2xl border border-grayLight shadow-2xl relative z-10 overflow-hidden">
            
            <div className="bg-dark/50 p-6 border-b border-grayLight">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <span className="text-neon text-sm font-bold">Step {step} of 3</span>
                </div>
                <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-neon transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className={step === 1 ? 'block' : 'hidden'}>
                           <RegisterStep1 register={register} errors={errors} watch={watch} />
                     </div>
                     <div className={step === 2 ? 'block' : 'hidden'}>
                            <RegisterStep2 register={register} errors={errors} watch={watch} />
                      </div>
                        <div className={step === 3 ? 'block' : 'hidden'}>
                                <RegisterStep3 formData={formData} />
                         </div>

                    <div className="flex justify-between mt-8 pt-6 border-t border-grayLight">
                        {step > 1 ? (
                            <button 
                                type="button" 
                                onClick={prevStep}
                                className="flex items-center gap-2 text-textDim hover:text-white px-4 py-2 transition-colors"
                            >
                                <FaArrowLeft /> Back
                            </button>
                        ) : (
                            <div className="text-sm text-textDim pt-2">
                                Have an account? <Link to="/login" className="text-neon hover:underline">Login</Link>
                            </div>
                        )}

                        {step < 3 ? (
                            <button 
                                type="button" 
                                onClick={nextStep}
                                className="bg-white text-dark font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-all ml-auto"
                            >
                                Next <FaArrowRight />
                            </button>
                        ) : (
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="bg-neon text-dark font-bold px-8 py-3 rounded-lg hover:bg-neonHover transition-all ml-auto shadow-lg shadow-neon/20 hover:shadow-neon/40"
                            >
                                {isLoading ? 'Creating...' : 'Create Account'}
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </div>
    </div>
  );
};

export default RegisterParent;