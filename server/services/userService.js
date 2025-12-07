const userRepository=require('../repositories/userRepository');
const AppError=require('../utils/appError')

const userService={
async addUser(userData){
     const userExists=await userRepository.findUserByEmail(userData.email)
    if(userExists)
    {
        throw new AppError('This user already exists',409)
    }
    const user=await userRepository.addUser(userData);
    return user;
},

async getUsers(courseId,role,search,page,limit){
    let query={};

   if(courseId)
   {
    query.courses=courseId;
   }
   if(role)
   {
    query.role=role
   }
   if(search)
   {
    query.$text={$search:search}
   }
   const skip=(page-1)*limit;
    return userRepository.getUsers(query,skip,limit);
},

async getUserById(id){
const user= await userRepository.findUserById(id);
if(!user)
{
    throw new AppError('Get user error: User not found',404)
}
return user;
},

async getStudentsByTeacherId(teacherId){
return  userRepository.getStudentsByTeacherId(teacherId)
},

async updateUser(id,updateData,currentUser){
   const user=await userRepository.findUserById(id);

   if(!user)
   {
    throw new AppError('User not found',404);
   }

   if(currentUser._id.toString()!==id.toString()&&currentUser.role!=='admin')
   {
    throw new AppError('FORBIDDEN',403)
   }

  const allowedUpdates=['name','email','password','headline','bio'];
   if(currentUser.role==='admin') allowedUpdates.push('role')

   Object.keys(updateData).forEach(key => {
        if (allowedUpdates.includes(key)) {
            user[key] = updateData[key];
        }
    });

    await user.save(); 
    
    return user;
},

async deleteUser(id){
 return await userRepository.deleteUser(id);
}
}

module.exports=userService