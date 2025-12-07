const transporter=require('../config/transporter');

const sendEmail=async (options)=>{
    const mailOptions={
        from:`Methynix Support ${process.env.COMPANY_EMAIL}`,
        to:options.to,
        subject:options.subject,
        html:options.html
    };
    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;