const lessonController=require('../controllers/lessonController');
const express=require('express');
const checkId=require('../middlewares/checkId')
const lessonRouter=express.Router();
const validator=require('../middlewares/validator')
const {createLessonSchema,updateLessonSchema}=require('../validators/lessonValidator');
const authMiddleware=require('../middlewares/authMiddleware')

lessonRouter.use(authMiddleware.authenticate);

lessonRouter.get('/',lessonController.getAll);
lessonRouter.get('/:id',checkId,lessonController.getById);

lessonRouter.post('/',validator(createLessonSchema),
                                            authMiddleware.authorize('admin','teacher'),
                                            lessonController.create
                                            );
                              

lessonRouter.route('/:id')
    .patch(
        validator(updateLessonSchema),
        checkId,
        authMiddleware.authorize('admin', 'teacher'),
        lessonController.update
    )
    .delete(
        checkId,
        authMiddleware.authorize('admin', 'teacher'),
        lessonController.delete
    );

module.exports=lessonRouter;