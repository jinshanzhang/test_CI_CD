/*
    *home router
 */
const Router=require('koa-router')
const router=new Router();

router
    .get('/',async(ctx,next)=>{

        ctx.status=200;

        ctx.json({

            message:"welcome azure"
        })
    })

    module.exports=router