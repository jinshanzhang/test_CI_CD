
 /*
    *adminster router
 */
const Router=require('koa-router')
const administrateController=require('../controller/administration')
const router=new Router({prefix:'/api'});

//*** design router ***//
router

    .post('/register', administrateController.Register)

    .get('/commonstudents',administrateController.Get_Commonstudents)

    .post('/suspend',administrateController.Update_Status_Suspend)

    .post('/retrievefornotifications',administrateController.Retrieve_for_Notifications)

module.exports=router