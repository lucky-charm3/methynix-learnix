const lessonRepository=require('../repositories/lessonRepository');
const courseRepository=require('../repositories/courseRepository');
const AppError=require('../utils/appError');

const lessonService={
    async addLesson(lesson, currentUser) {
        let course = null;
        if (courseRepository.findById) {
            course = await courseRepository.findById(lesson.courseId);
        } else {
            course = await Course.findById(lesson.courseId);
        }

        if (!course) {
            throw new AppError('Course not found', 404);
        }

        const teacherId = course.teacherId._id 
            ? course.teacherId._id.toString() 
            : course.teacherId.toString();  

        const currentUserId = currentUser._id.toString();

        if (currentUser.role !== 'admin' && teacherId !== currentUserId) {
            throw new AppError('Not authorized to add lessons to this course', 403);
        }

        return await lessonRepository.addLesson(lesson);
    },

    async getLessons(courseId,search,page,limit){
        let query={};

        if(courseId)
        {
        query.courseId=courseId    
        }

        if(search)
        {
            query.$text={$search:search}
        }
        const skip=(page-1)*limit;
        return lessonRepository.getLessons(query,skip,limit)
    },

    async getLessonById(id){
     const lesson=await lessonRepository.getLessonById(id)
     return lesson;
    },

    async updateLesson(id,updateData,currentUser){
        const lesson=await lessonRepository.getLessonById(id);
        if(!lesson)
        {
            throw new AppError("Lesson not found",404);
        }

        const teacherId=lesson.courseId.teacherId;
        if(currentUser.role!=='admin'&&teacherId.toString()!==currentUser._id.toString())
        {
            throw new Error('You do not own this course!',403);
        }

        const allowedUpdates=['title', 'content', 'section', 'order', 'type', 'attachments'];
        const updates={};

        Object.keys(updateData).forEach(key=>{
            if(allowedUpdates.includes(key))
            {
                updates[key]=updateData[key]
            }
        })
        return lessonRepository.updateLesson(id,updates)
    },

    async deleteLesson(id,currentUser){
        const lesson=await lessonRepository.getLessonById(id);

        if(!lesson)
        {
            throw new AppError('Lesson not fucking found',404)
        }
        const teacherId=lesson.courseId.teacherId.toString();
        if(currentUser.role!=='admin'&&teacherId!==currentUser._id.toString())
        {
            throw new AppError("You do not own this course",403)
        }
        return await lessonRepository.deleteLesson(id)
    }
}

module.exports=lessonService;