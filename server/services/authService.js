const userRepository=require('../repositories/userRepository');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const AppError=require('../utils/appError')

const authService={
    async login(userData){
    const user=await userRepository.getUserByEmail(userData.email);
    const isValid=await bcrypt.compare(userData.password,user.password);

    if(!isValid)
    {
        throw new AppError('The credentials dont match',400)
    }

    const generatedToken=jwt.sign({
        id:user._id
    },
    process.env.SECRET_KEY,
    {expiresIn:'3h'}
)

return {user,generatedToken};
    },


    async register(userData){
     const userExists=await userRepository.getUserByEmail(userData.email)
     if(userExists)
     {
        throw new AppError('This user already exists',409)
     }
     const user=await userRepository.addUser(userData);
     return user;
    }
}

module.exports=authService