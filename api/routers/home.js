/*
    *home router
 */
const Router=require('koa-router')
const router=new Router();

router
    .get('/',async(ctx,next)=>{

        ctx.status=200;

        ctx.json({

            message:"welcome azure Devops1"
        })
    })

    module.exports=router