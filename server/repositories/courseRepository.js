const Course=require('../models/courseModel');
const AppError=require('../utils/appError');

const courseRepository={

    async addCourse(course){
        const created= new Course(course)
        return await created.save()     
    },

    async getCourses(query,skip,limit){
        const [totalCourses,courses]=await Promise.all([Course.countDocuments(query),
                                                                    Course.populateCoursesWithTeacher(query).skip(skip).limit(limit)]);
        return {totalCourses,courses}
    },

    async getCourseById(id){
        const course= await Course.populateCourseWithTeacher(id);
        return course;
    },

    async findById(id){
        return await Course.findById(id);
    },

    async updateCourse(id,updateData){
        const course= await Course.findByIdAndUpdate(id,updateData,{new:true,runValidators:true});
        return course;
    },

    async deleteCourse(id){
      return await Course.findByIdAndDelete(id);
}
}

module.exports=courseRepository;