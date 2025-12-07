const mongoose=require('mongoose');
const Course=require('../models/courseModel')

const lessonSchema=new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    section:{
        type:String,
        default:'General'
    },
    order:{
        type:Number,
        required:true
    },
    attachments:[{
        title:String,
        url:String
    }],
    type: {
        type: String,
        enum: ['notes', 'quiz'],
        default: 'notes'
    },
    slug:{
        type:String,
        unique:true
    }
},{timestamps:true});

lessonSchema.pre('save',function(next){
    if(!this.isModified('title')) return next();
    this.slug=this.title.toLowerCase().replace(/\s+/g,'-');
    next();
})

lessonSchema.post('save', async function(doc, next) {
    await Course.findByIdAndUpdate(doc.courseId, {
        $inc: { lessonCount: 1 }
    });
    next();
});

lessonSchema.pre('findOneAndDelete',async function(doc,next){
    if(doc)
    {
         await Course.findByIdAndUpdate(lesson.courseId,{
        $inc:{lessonCount:-1}
    })
    next();
    }
})

lessonSchema.index({courseId:1,order:1});
lessonSchema.index({text:"text"})

const Lesson=mongoose.model('Lesson',lessonSchema)

module.exports=Lesson;