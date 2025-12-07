const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
    public_id:String,
    url:String
    },
    benefits:[String],
    price:{
        type:Number,
        default:0
    },
    estimatedPrice:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    lessonCount:{
        type:Number,
        default:0
    },
    slug:{
        type:String,
        lowercase:true, 
        unique:true
    }
},{timestamps:true})

courseSchema.pre('save',function(next){
if(!this.isModified('title')) return next();
this.slug=this.title.toLowerCase().replace(/\s+/g,'-');
next();
})

courseSchema.pre('findOneAndDelete',async function(next){
    const course=await this.model.findOne(this.getQuery());
    if(!course)
    {
        return next();
    }
    await User.updateMany(
        {courses:course._id},
        {$pull:{courses:course._id}
    })
})

courseSchema.statics.populateCoursesWithTeacher=function(query){
return this.find(query).populate('teacherId','name email');
}

courseSchema.statics.populateCourseWithTeacher=function (id){
    return this.findById(id).populate('teacherId','name email');
}


courseSchema.index({title:'text',description:'text'})
courseSchema.index({createdAt:-1})

const Course=mongoose.model('Course',courseSchema);

module.exports=Course;