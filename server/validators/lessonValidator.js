const Joi=require('joi');

const createLessonSchema=Joi.object({
    courseId:Joi.string().hex().length(24).required().messages({
        'string.hex':'Invalid course id format',
        'string.length':'Invalid course id length'
    }),
    title:Joi.string().min(3).required(),
    content:Joi.string().min(10).required(),
    section:Joi.string().optional().default('General'),
    order:Joi.number().integer().required(),
    type:Joi.string().valid('notes','quiz').default('notes'),
    attachments:Joi.array().items(
        Joi.object({
            title:Joi.string(),
            url:Joi.string().uri()
        })
    ).optional()
})

const updateLessonSchema=createLessonSchema.fork(
    ['courseId','title','content','order'],
    (schema)=>schema.optional()
)

module.exports={createLessonSchema,updateLessonSchema}