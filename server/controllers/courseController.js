const courseService = require('../services/courseService');
const asyncHandler = require('../middlewares/asyncHandler');
const { cloudinary } = require('../config/cloudinary'); // <--- Import Cloudinary
const AppError = require('../utils/appError');

class courseController {
    
    create = asyncHandler(async (req, res, next) => {
        // 1. Prepare the data object
        let courseData = { ...req.body };

        // 2. Check if a file was uploaded by Multer
        if (req.file) {
            courseData.thumbnail = {
                public_id: req.file.filename,
                url: req.file.path
            };
        } else {
            // Optional: Set a default image if none provided
            courseData.thumbnail = {
                public_id: 'default_assets/default_course',
                url: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/default_course.jpg'
            };
        }

        // 3. Pass the prepared data to the service
        // Note: We pass courseData instead of req.body
        const course = await courseService.addCourse(courseData, req.user);
    
        res.status(201).json({
            course,
            success: true,
            message: 'Course created successfully'
        });
    });

    getAll = asyncHandler(async (req, res, next) => {
        const { search, page = 1, limit = 10 } = req.query;
        const { totalCourses, courses } = await courseService.getCourses(search, page, limit);

        res.status(200).json({
            success: true,
            totalCourses,
            totalPages: Math.ceil(totalCourses / limit),
            courses,
            message: 'Courses fetched successfully'
        });
    });

    getById = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const course = await courseService.getCourseById(id);

        if (!course) {
            return next(new AppError('Course not found', 404));
        }

        res.status(200).json({
            success: true,
            course,
            message: 'Course fetched successfully'
        });
    });

    update = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        
        // 1. Find the existing course first (needed to delete old image)
        const oldCourse = await courseService.getCourseById(id);
        if (!oldCourse) {
            return next(new AppError('Course not found', 404));
        }

        let data = { ...req.body };

        // 2. If a new file is uploaded
        if (req.file) {
            // A. Delete the OLD image from Cloudinary to save space
            if (oldCourse.thumbnail && oldCourse.thumbnail.public_id) {
                try {
                    await cloudinary.uploader.destroy(oldCourse.thumbnail.public_id);
                } catch (err) {
                    console.error("Failed to delete old image from Cloudinary:", err);
                    // Continue anyway, don't block the update
                }
            }

            // B. Add new image data
            data.thumbnail = {
                public_id: req.file.filename,
                url: req.file.path
            };
        }

        // 3. Call Service
        const updated = await courseService.updateCourse(id, data);
        
        res.status(200).json({
            success: true,
            course: updated,
            message: 'Course updated successfully'
        });
    });

    delete = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        // 1. Find course to get image ID
        const course = await courseService.getCourseById(id);
        
        if (!course) {
            return next(new AppError('Course not found', 404));
        }

        // 2. Delete image from Cloudinary
        if (course.thumbnail && course.thumbnail.public_id) {
             try {
                await cloudinary.uploader.destroy(course.thumbnail.public_id);
            } catch (err) {
                console.error("Cloudinary delete error:", err);
            }
        }

        // 3. Delete from DB
        await courseService.deleteCourse(id);
       
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    });
}

module.exports = new courseController;