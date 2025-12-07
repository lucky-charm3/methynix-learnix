const Joi=require('joi');

const createCourseSchema=Joi.object({
title:Joi.string().min(5).max(100).required,
description:Joi.string().min(20).required(),
price:Joi.number().min(0).default(0),
estimatedPrice:Joi.number().min(0).allow(null),
isPublished:Joi.boolean().default(false),
benefits:Joi.array().items(Joi.string()).min(1),
thumbnail:Joi.object({
    public_id:Joi.string(),
    url:Joi.string()
}).optional()
});

const updateCourseSchema=createCourseSchema.fork(
    ['title','description','price'],(schema)=>schema.optional()
)
module.exports={createCourseSchema,updateCourseSchema};