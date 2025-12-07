const authController=require('../controllers/authController');
const express=require('express');
const authRouter=express.Router();
const validator=require('../middlewares/validator');
const {registerUserSchema,loginSchema}=require('../validators/userValidator')

authRouter.route('/login')
                         .post(validator(loginSchema),authController.login)

authRouter.route('/register')
                         .post(validator(registerUserSchema),authController.register)

authRouter.route('/forgotPassword')
                            .post(authController.forgotPassword)

authRouter.route('/resetPassword')
                            .post(authController.resetPassword)


module.exports=authRouter;