const mongoose=require('mongoose');
const AppError=require('../utils/appError');

const checkId=(req,res,next)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid)
    {
        throw new AppError('Invalid id format',400)
    }
    next();
}

module.exports=checkId;