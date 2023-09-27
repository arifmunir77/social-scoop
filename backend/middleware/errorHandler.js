const errorHandeler=(req,res,next)=>
{
   const error=new Error(`Not Found - ${req.originalUrl}`)
   res.status(404);
   next(error);
}

// Not Found Middlerwere
 const notFound=(err,req,res,next)=>
 {
     const statusCode= res.statusCode==200?500:res.statusCode;
    //  console.log(statusCode);
     res.status(statusCode);
      res.json({
              message:err.message,
              stack:process.env.NODE_ENV=='production'?null:err.stack 
          }
      ) 
 }
 export {errorHandeler,notFound}