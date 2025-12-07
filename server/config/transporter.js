const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'Gmail',
    port:465,
    secure:true,
    auth:{
        user:process.env.COMPANY_EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})

module.exports=transporter;

