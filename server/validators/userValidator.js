const Joi=require('joi');

const userSchema=Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().lowercase().required(),
    password:Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_\\-+=[\\]{};:"\\|,.<>/?`~])[A-Za-z\\d!@#$%^&*()_\\-+=[\\]{};:"\\|,.<>/?`~]{8,}$')).required()
    .min(8)
    .required()
    .messages({
        'string.pattern.base': 'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.'
    }),
    role:Joi.string().valid('admin','teacher','student').messages({
        'any.only':'Please enter a valid role'
    }).default('student'),
    headline:Joi.string().max(100).allow(''),
    bio:Joi.string().max(500).allow(''),
    courses: Joi.array()
        .items(Joi.string().hex().length(24))
        .default([])
        .optional()
})

const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

const getUpdateSchema=(loggedInRole)=>{
 const schema= userSchema.fork(['name','password','email','role'],(field)=>field.optional());

  if(loggedInRole!=='admin')
  {
    schema.fork(['role'],(field)=>field.forbidden());
  }
  return schema;
}



module.exports={registerUserSchema:userSchema,getUpdateSchema,loginSchema}