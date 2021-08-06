/*
    *home router
 */
const Router=require('koa-router')
const router=new Router();

router
    .get('/',async(ctx,next)=>{

        ctx.status=200;

        ctx.json({

            message:"welcome second4"
        })
    })

    module.exports=router