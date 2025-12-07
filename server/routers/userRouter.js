const userController=require('../controllers/userController');
const express=require('express');
const userRouter=express.Router();
const authMiddleware=require('../middlewares/authMiddleware')
const checkId=require('../middlewares/checkId');
const validator=require('../middlewares/validator');
const {registerUserSchema,
                getUpdateSchema,
                }=require('../validators/userValidator')

userRouter.use(authMiddleware.authenticate);

userRouter.route('/myStudents',authMiddleware.authorize('teacher'))
                         .get(userController.getStudentsOfTeacher)

userRouter.route('/me',userController.getMe);

userRouter.use(authMiddleware.authorize('admin'));

userRouter.route('/')
                           .get(userController.getAll)
                          .post(validator(registerUserSchema),userController.create)

userRouter.route('/:id')
                        .get(checkId,userController.getById)
                       .delete(checkId,userController.delete)
                       .patch(validator(getUpdateSchema),
                                     checkId,userController.update)


 module.exports=userRouter;
