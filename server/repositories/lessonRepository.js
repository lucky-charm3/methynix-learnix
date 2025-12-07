const Lesson=require('../models/lessonModel');
const AppError=require('../utils/appError');

const lessonRepository={
    async addLesson(lesson)
    {
        return await Lesson.create(lesson);
    },

    async getLessons(query,skip,limit)
    {
        const[totalLessons,lessons]=await Promise.all([Lesson.countDocuments(query),
                                                            Lesson.find(query).sort({order:1})
                                                            .skip(skip).limit(limit)]);
        return {totalLessons,lessons};
    },

    async getLessonById(id)
    {
        return await Lesson.findById(id);
    },

    async updateLesson(id,updateData)
    {
        return await Lesson.findByIdAndUpdate(id,updateData);
    },

    async deleteLesson(id)
    {
        return await Lesson.findByIdAndDelete(id);
        }
}

module.exports=lessonRepository;