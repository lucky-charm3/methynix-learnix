const courseRepository=require('../repositories/courseRepository');
const AppError=require('../utils/appError');

const courseService={
    async addCourse(course,currentUser){
        const data={...course,teacherId:currentUser._id}
        return await courseRepository.addCourse(data);
    },

    async getCourses(search,page,limit){
        let query={}
       if(search)
       {
        query.$text={$search:search}
    }

    query.isPublished=true;
       
       const skip=(page-1)*limit
       return await courseRepository.getCourses(query,skip,limit);
    },

    async getCourseById(id)
    {
        const course=await courseRepository.getCourseById(id);
        if(!course)
        {
            throw new AppError("Course not fucking found",404);
        }
        return course;
    },

    async updateCourse(id,updateData,currentUser){
        const course=await courseRepository.findById(id);

        if(!course)
        {
            throw new AppError('Course not fucking found',404);
        }

        if(currentUser.role!=='admin'&&course.teacherId.toString()!==currentUser._id)
        {
            throw new AppError('Not authorized to update this course',403)
        }

        const allowedUpdates=['title','description','price','estimatedPrice','thumbnail','benefits','isPublished'];
        const updates={}

        Object.keys(updateData).forEach(key=>{
            if(allowedUpdates.includes(key))
            {
                updates[key]=updateData[key]
            }
        })

        if(Object.keys(updates).length===0)
        {
            throw new AppError('No valid fields to update',400);
        }
          return await courseRepository.updateCourse(id,updates)
    },

     async deleteCourse(id){
        const course=await courseRepository.findById(id);

        if(!course)
        {
            throw new AppError("Course not found",404);
        }

        return await courseRepository.deleteCourse(id);
     }   
}

module.exports=courseService;