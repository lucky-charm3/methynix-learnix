const courseController = require('../controllers/courseController');
const express = require('express');
const courseRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const validator = require('../middlewares/validator');
const { createCourseSchema, updateCourseSchema } = require('../validators/courseValidator');
const checkId = require('../middlewares/checkId');
const { upload } = require('../config/cloudinary'); // Import Multer

courseRouter.get('/', courseController.getAll);
courseRouter.get('/:id', checkId, courseController.getById);

courseRouter.use(authMiddleware.authenticate);

courseRouter.route('/')
    .post(
        authMiddleware.authorize('admin', 'teacher'),
        upload.single('thumbnail'),       // <--- 1. PARSE DATA FIRST
        validator(createCourseSchema),    // <--- 2. VALIDATE DATA SECOND
        courseController.create           // <--- 3. EXECUTE CONTROLLER
    );

courseRouter.route('/:id')
    .patch(
        checkId,
        authMiddleware.authorize('admin', 'teacher'),
        upload.single('thumbnail'),       // <--- 1. PARSE
        validator(updateCourseSchema),    // <--- 2. VALIDATE
        courseController.update
    )
    .delete(
        checkId, 
        authMiddleware.authorize('admin'), 
        courseController.delete
    );

module.exports = courseRouter;