const AppError = require('../utils/appError');
const { cloudinary } = require('../config/cloudinary'); 

const validatorMiddleware = (schema) => {
    return async (req, res, next) => {
        
        try {
            const validationSchema = (typeof schema === 'function') 
                ? schema(req.user ? req.user.role : null) 
                : schema;

            const { error, value } = validationSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true
            });

            if (error) {
                if (req.file && req.file.filename) {
                    try {
                        await cloudinary.uploader.destroy(req.file.filename);
                    } 
                    catch (cleanupError) {
                        console.error('Failed to delete image after validation error:', cleanupError);
                    }
                }

                const errorMessage = error.details
                    .map((detail) => detail.message.replace(/"/g, ''))
                    .join(', ');

                return next(new AppError(errorMessage, 400));
            }

            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = validatorMiddleware;