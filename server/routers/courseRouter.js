const courseController=require('../controllers/courseController');
const express=require('express');
const courseRouter=express.Router();
const authMiddleware=require('../middlewares/authMiddleware.js');
const validator=require('../middlewares/validator');
const {createCourseSchema,updateCourseSchema}=require('../validators/courseValidator')
const checkId=require('../middlewares/checkId');

courseRouter.get('/',courseController.getAll);
courseRouter.get('/:id',checkId,courseController.getById);

courseRouter.use(authMiddleware.authenticate);

courseRouter.route('/')
                               .post(validator(createCourseSchema),authMiddleware.authenticate,
                                            authMiddleware.authorize('admin','teacher'),
                                            courseController.create
                                        );

courseRouter.route('/:id')
                                .patch(validator(updateCourseSchema),checkId,
                                    authMiddleware.authorize('admin'),
                                    courseController.update)
                                .delete(checkId,authMiddleware.authorize('admin'),
                                courseController.delete)

module.exports=courseRouter