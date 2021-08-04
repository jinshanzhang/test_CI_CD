
/*
    *refer module and middleware
 */
const koa=require('koa');

const routers=require('./api/routers/routers');

const middleware=require('./api/middleware/index');

const bodyparser=require('koa-bodyparser');

    app=new koa();
    
    // *** middleware *** //
    app.use(middleware.errorHandler());//can not finds url

    app.use(middleware.cors());

    app.use(bodyparser());

    app.use(middleware.jsonFormat());

    // *** api routes *** //
    app.use(routers.homeRouter.routes());
    app.use(routers.adiminsterRouter.routes());
   
    //***deal with all kinds of error***//
    
    app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500||ctx.status===500) {
    ctx.status=err.status||500
      ctx.json({
         error:{
           
             code: err.code || 'internal:unknown_error',
             message:err.message
         }
      })
    }
  }) 

  module.exports=app