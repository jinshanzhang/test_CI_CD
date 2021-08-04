/*
    *json format
 */

function jsonFormat(ctx,next){
    return async function(ctx,next){
        ctx.set({"Content-Type":"application/json"})
        ctx.json=(obj)=>{
           ctx.body= JSON.stringify(obj);
           return ctx.body
        }
        await next();
      }
}

module.exports=jsonFormat