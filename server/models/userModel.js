const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please input a valid email"
        ],
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        match:
        [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~]{8,}$/,
            "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
        ],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:['student','teacher','admin'],
        default:'student'
    },
    headline:{
     type:String,
     trim:true,
     maxLength:100
    },
    bio:{
        type:String,
        trim:true,
        maxLength:500
    },
    isActive:{
     type:Boolean,
     default:true,
     select:false,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    progress:[{
        lessonId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Lesson'
        },
        completed:{
            type:Boolean,
            default:false
        },
        completedAt:{
            type:Date
        }
    }]
},{timestamps:true})


userSchema.pre('save',async function(next){
if(!this.isModified('password'))
{
    return next();
}
this.password=await bcrypt.hash(this.password,12)
next();
})

userSchema.methods.comparePassword=async function(userPassword){
return await bcrypt.compare(userPassword,this.password)
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

userSchema.statics.findByEmail=function(email){
    return this.findOne({email:email})
}

userSchema.statics.findUsersWithCourses=function(query){
    return this.find(query).populate('courses',  'title');
}

userSchema.statics.findUserWithCourses=function(id){
    return this.findById(id).populate('courses' ,'title')
}

userSchema.index({role:1});
userSchema.index({role:1,courses:1})
userSchema.index({name:'text'});


const User=mongoose.model('User',userSchema)

module.exports=User;