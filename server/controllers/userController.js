const userService=require('../services/userService');
const asyncHandler=require('../middlewares/asyncHandler');
const AppError=require('../utils/appError')

class userController{
    create= asyncHandler(async (req,res,next)=>{
    const user=await userService.addUser(req.body);

    res.status(201).json({
        success:true,
        user,
        message:'User added succesfully',
    })
    });

    getAll=asyncHandler(async (req,res,next)=>{
    const {course='',role='',search='',page=1,limit=10}=req.query;
    const {users,usersCount}=await userService.getUsers(course,role,search,page,limit);

    res.status(200).json({
        success:true,
        users,
        totalUsers:usersCount,
        totalPages:Math.ceil(usersCount/limit),
        message:'Users fetched succesfully'
    })
       
    });

    getMe=asyncHandler(async(req,res,next)=>{
        const id=req.user._id;
        const user=await userService.getById(id);

        if(!user)
        {
            throw new AppError('User not found!',404);
        }

        res.status(200).json({
            success:true,
            user,
            message:'User data fetched succesfully'
        })
    })

    getById=asyncHandler(async (req,res,next)=>{
        const {id}=req.params;
        const user=await userService.getById(id);

        res.status(200).json({
            success:true,
            user,
            message:'User fetched succesfully'
        })
    });

    getStudentsOfTeacher=asyncHandler(async(req,res,next)=>{
        const id=req.user._id;
        const students=await userService.getStudentsByTeacherId(id);
        
        res.status(200).json({
            success:true,
            message:'Students fetched succesfully',
            students
        })
    })
    
    update=asyncHandler(async (req,res,next)=>{
        const {id}=req.params;
        const updated=await userService.updateUser(id,req.body,req.user._id)

        res.status(200).json({
            success:true,
            user:updated,
            message:'User updated succesfully'
        })
    });

    delete=asyncHandler(async (req,res,next)=>{
        const {id}=req.params;
        const deleted=await userService.deleteUser(id)

        res.status(200).json({
            success:true,
            user:deleted,
            message:'User deleted succesfully'
        })
    })
}

module.exports=new userController;