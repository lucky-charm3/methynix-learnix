const Joi = require('joi');

const createCourseSchema = Joi.object({
    title: Joi.string().required().min(3).trim(),
    description: Joi.string().required().min(10),
    
    price: Joi.number().min(0).default(0), 
    estimatedPrice: Joi.number().min(0).allow(null, ''),
    
    benefits: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string()
    ),
    
    isPublished: Joi.boolean(), 
    
    thumbnail: Joi.any().optional() 
});

const updateCourseSchema = Joi.object({
    title: Joi.string().min(3).trim(),
    description: Joi.string().min(10),
    price: Joi.number().min(0),
    estimatedPrice: Joi.number().min(0).allow(null, ''),
    benefits: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string()
    ),
    isPublished: Joi.boolean(),
    thumbnail: Joi.any().optional()
});

module.exports = { createCourseSchema, updateCourseSchema };