const asyncHandler=require('../middlewares/asyncHandler');
const AppError=require('../utils/appError');
const userRepository=require('../repositories/userRepository');
const authService=require('../services/authService');
const sendEmail=require('../services/emailService');

class authController{
    login=asyncHandler(async (req,res,next)=>{
    const {user,generatedToken}=await authService.login(req.body)

    res.status(200).json({
        success:true,
        user,
        message:'User logged in succesfully',
        token:generatedToken
    })
    });

    register=asyncHandler(async (req,res,next)=>{
    const user=await authService.register(req.body)

    res.status(201).json({
        success:true,
        user,
        message:'User registered succesfully'
    })
    });

    forgotPassword = asyncHandler(async (req, res) => {
    const user = await userRepository.getUserByEmail( req.body.email);
    
    const resetToken = user.createPasswordResetToken();
    
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    const message=`Forgot your password, click here ${resetUrl}`

    try{
        await sendEmail({to:user.email,subject:'Your password reset token',html:message});
        res.status(200).json({success:true,message:'Token sent to email'})
    }
    catch(error)
    {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an error sending the email.', 500));
    }
});

 resetPassword = asyncHandler(async (req, res, next) => {
    const { token } = req.params;
    const { password} = req.body;

    if (!password) {
        return next(new AppError("Please provide new password", 400));
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userRepository.getUserByResetToken(hashedToken);

    if (!user || user.passwordResetExpires < Date.now()) {
        return next(new AppError("Token is invalid or has expired", 400));
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save(); 

    res.status(200).json({
        success: true,
        message: "Password has been reset successfully"
    });
});

};

module.exports=new authController;