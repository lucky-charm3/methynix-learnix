const AppError=require('../utils/appError');

const errorHandler=async (err,req,res,next)=>{
    console.error('Error ',err);

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    if(err instanceof AppError)
    {
       res.status(err.statusCode).json({
        success:false,
        message:err.message
      })
    }
    
      res.status(500).json({
            success:false,
            message:'An internal server occured'
        });
}

module.exports=errorHandler;