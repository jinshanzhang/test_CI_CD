
/*
    *error handler function
 */

module.exports=(()=>{
    return async(ctx,next)=>{
        try {
            await next();
            if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
          } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
            ctx.app.emit('error', err, ctx);
          }
    }
})