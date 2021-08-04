/*
    *set up CORS
 */

module.exports=()=>{
    return async (ctx, next) => {
        
        ctx.set("Access-Control-Allow-Origin", "*");
       
        ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    
        ctx.set("Access-Control-Allow-Headers", "*");
    
        ctx.set("Content-Type", "application/json;charset=utf-8;form-data");
    
        ctx.set("Access-Control-Allow-Credentials", true);
    
    
        ctx.set("Access-Control-Max-Age", 300);
        
        ctx.set("Access-Control-Expose-Headers", "myData");

        ctx.status=200;
        
        await next();
    }
}
