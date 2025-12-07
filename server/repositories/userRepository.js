const User=require('../models/userModel');
const Course=require('../models/courseModel');

const userRepository={
    async addUser(user)
    {
        const created= await User.create(user);
        return created;
    },

    async getUsers(query,skip,limit)
    {
        const users=await User.findUsersWithCourses(query).skip(skip).limit(limit);
        const totalUsers=await User.countDocuments(query);
        return {totalUsers,users}
    },

    async getUserById(id)
    {
        return await User.findUserWithCourses(id);
    },

    async getUserByEmail(email)
    {
        return await User.findByEmail(email).select('+password');
    },

    async getUserByResetToken(token)
    {
        return await User.findOne({passwordResetToken:token});
    },

    async getStudentsByTeacherId(teacherId)
    {
      const courses=await Course.find({teacherId}).select('_id');
      const courseIds=courses.map(c=>c._id);
      const students=User.find({courses:{$in:courseIds},role:'student'});
      return students;
    },

    async updateUser(id,updateData)
    {
        return await User.findByIdAndUpdate(id,updateData,{new:true,runValidators:true})
    },

    async deleteUser(id)
    {
        return await User.findByIdAndDelete(id);
    },
}

module.exports=userRepository;