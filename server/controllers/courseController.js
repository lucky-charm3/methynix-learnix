const courseService=require('../services/courseService')
const asyncHandler=require('../middlewares/asyncHandler')
const courseValidator=require('../validators/courseValidator')
const AppError=require('../utils/appError')

class courseController{
    create=asyncHandler(async (req,res,next)=>{
     const course=await courseService.addCourse(req.body,req.user);
   
     res.status(201).json({
        course,
        success:true,
        message:'Course created succesfully'
     })
    });

    getAll=asyncHandler(async (req,res,next)=>{
    const {search,page=1,limit=10}=req.query;

    const {totalCourses,courses}=await courseService.getCourses(search,page,limit);

    res.status(200).json({
    success:true,
    totalCourses,
    totalPages:Math.ceil(totalCourses/limit),
    courses,
    message:'Courses fetched succesfully'
    })
    });

    getById=asyncHandler(async (req,res,next)=>{
        const {id}=req.params;
        const course=await courseService.getCourseById(id);

       res.status(200).json({
        success:true,
        course,
        message:'Course fetched successfully'
       })
 
    });

    update=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    

    const updated=await courseService.updateCourse(id,data);
    res.status(200).json({
        success:true,
        course:updated,
        message:'Course updated succesfully'
    })
    });

    delete=asyncHandler(async (req,res,next)=>{
        const {id}=req.params;

        await courseService.deleteCourse(id);
       
        res.status(200).json({
            success:true,
           message:'Course deleted succefully'
        })
})
}

module.exports=new courseController;