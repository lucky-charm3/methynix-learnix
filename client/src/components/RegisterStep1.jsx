import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterStep1 = ({ register, errors, watch}) => {
  return (
    <div className={`space-y-5 animate-fadeIn `}>
      <h3 className="text-xl text-lime font-bold mb-4 flex items-center gap-2">
        <FaUser /> Personal Details
      </h3>

      <div>
        <label className="block text-textDim text-xs uppercase mb-1">Full Name</label>
        <input 
          {...register("name", { required: "Name is required", minLength: { value: 3, message: "Min 3 chars" } })}
          className="w-full bg-dark border border-grayLight rounded-lg p-3 text-white focus:border-neon outline-none"
          placeholder="e.g. Agnes C."
        />
        {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-textDim text-xs uppercase mb-1">Email Address</label>
        <div className="relative">
          <FaEnvelope className="absolute top-3.5 left-3 text-textDim" />
          <input 
            {...register("email", { 
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
            })}
            className="w-full bg-dark border border-grayLight rounded-lg p-3 pl-10 text-white focus:border-neon outline-none"
            placeholder="agnes@example.com"
          />
        </div>
        {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-textDim text-xs uppercase mb-1">Password</label>
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-textDim" />
            <input 
              type="password"
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 chars" },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~])/,
                    message: "Password must have Upper, Lower, Number & Symbol"
                }
              })}
              className="w-full bg-dark border border-grayLight rounded-lg p-3 pl-10 text-white focus:border-neon outline-none"
              placeholder="********"
            />
          </div>
          {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-textDim text-xs uppercase mb-1">Confirm Password</label>
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-textDim" />
            <input 
              type="password"
              {...register("confirmPassword", { 
                required: "Confirm your password",
                validate: (val) => {
                  if (watch('password') != val) return "Passwords do not match";
                }
              })}
              className="w-full bg-dark border border-grayLight rounded-lg p-3 pl-10 text-white focus:border-neon outline-none"
              placeholder="********"
            />
          </div>
          {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterStep1;