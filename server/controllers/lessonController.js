const lessonService=require('../services/lessonService');
const asyncHandler=require('../middlewares/asyncHandler');
const AppError=require('../utils/appError');

class lessonController{
    create=asyncHandler(async (req,res,next)=>{
        const lesson=await lessonService.addLesson(req.body,req.user);

        res.status(201).json({
            success:true,
            lesson,
            message:'Lesson created succesfully'
        })
    });

    getAll=asyncHandler(async (req,res,next)=>{
        const{search='',page=1,limit=10}=req.query;
        const {totalLessons,lessons}=await lessonService.getLessons(search,page,limit);

        res.status(200).json({
            success:true,
            lessons,
            totalLessons,
            totalPages:Math.ceil(totalLessons/limit),
            message:'Lessons fetched succesfully'
        })
    });

    getById=asyncHandler(async (req,res,next)=>{
        const {id}=req.params;
        const lesson=await lessonService.getLessonById(id);

        res.status(200).json({
            success:true,
            lesson,
            message:'Lesson fetched succesfully'
        })
    });

    update=asyncHandler(async(req,res,next)=>{
        const {error}=lessonValidator.validate(req.body);
        const {id}=req.params;

        if(error)
        {
            throw new AppError(error.details[0].message,400)
        }

        const lesson=await lessonService.updateLesson(id,req.body,req.user);

        res.status(200).json({
            success:true,
            lesson,
            message:'Lesson updated succesfully'
        })
    });

    delete=asyncHandler(async (req,res,next)=>{
        const {id}=req.params;
       await lessonService.deleteLesson(id,req.user);

        res.status(200).json({
            success:true,
            message:'Lesson deleted succesfully'
        })
    })
}

module.exports=new lessonController;