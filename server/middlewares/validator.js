const AppError = require('../utils/appError');
const Joi = require('joi');

const validatorMiddleware = (schema) => {
    return (req, res, next) => {
        const validationSchema = (typeof schema === 'function') 
            ? schema(req.user ? req.user.role : null) 
            : schema;

        const { error, value } = validationSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown:true
        });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message.replace(/"/g, ''))
                .join(', ');

            return next(new AppError(errorMessage, 400));
        }

        req.body = value;
        next();
    };
};

module.exports = validatorMiddleware;