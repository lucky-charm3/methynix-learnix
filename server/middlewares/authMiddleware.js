const jsonwebtoken=require('jsonwebtoken');
const User=require('../models/userModel.js')

const authMiddleware={
    authenticate:async (req,res,next)=>{
        try{
      const authHeader=req.headers?.authorization;

      if(!authHeader||!authHeader.startsWith('Bearer '))
      {
        return res.status(401).json({success:false,message:'Invalid token format'})
      }

      const token=authHeader.split(' ')[1];

      const decoded=jsonwebtoken.verify(token,process.env.SECRET_KEY);

      const user=await User.findById(decoded.id);

      if(!user)
      {
        return res.status(401).json({
          success:true,
          message:'User not found'
        })
      }

      req.user=user;
      next();
        }
        catch(error)
        {
    res.status(401).json({message:`${process.env.NODE_ENV==='PRODUCTION'?
        'Internal server error':error.message}`})
        }
    },

    authorize: (...roles)=>{
      return (req,res,next)=>{
        try{
       const userRole=req.user.role;
       if(!roles.includes(userRole))
       {
        return res.status(403).json({message:'Unauthorized'})
       }
       next();
        }
        catch(error)
        {
       res.status(500).json({message:'Internal server error'})
        }
    }
  }
}

module.exports=authMiddleware;