const loggingMiddleware=(req,res,next)=>{
    const start=Date.now();

    const originalSend=res.send;
    const originalJson=res.json;

      let responseBody;

    res.send=function(body){
        responseBody=body;
        return originalSend.call(this,body)
    }

    res.json=function(body){
        responseBody=JSON.stringify(body);
        return originalJson.call(this,body)
    }

    res.on('finish',()=>{
        const duration=Date.now()-start;
        const timestamps=new Date().toISOString();

        const userId=req.user?req.user._id:'Anonymus';
        const userEmail=req.user?req.user.email:'No auth';

        const logEntry={
            timestamps,
            duration:`${duration} ms`,
            method:req.method,
            url:req.url,
            status:res.statusCode,
            user:{
                id:userId,
                email:userEmail
            },
            userAgent:req.get('User-Agent'),
            ip:req.ip||req.connection.remoteAddress
        }

        if(req.method!=='GET')
        {
            const safeBody={...req.body}
            if (safeBody.password) delete safeBody.password;
            logEntry.requestBody=safeBody;

            if(res.statusCode>=400)
            {
                logEntry.response=responseBody;
            }

            if(res.statusCode>=500)
            {
                console.error(`SERVER ERROR: ${logEntry}`)
            }
        }
        console.log(JSON.stringify(logEntry,null,2));
    })

   next();
}

module.exports=loggingMiddleware;