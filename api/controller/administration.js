
 /*
    *refer mysql module
 */
const teacherStuModel=require('../model/mysql')

module.exports={
    /*
    *register function
    */
    Register:async(ctx,next)=>{
        try{
                 /*
                    *check input format
                */
                if(!ctx.request.body.teacher||!ctx.request.body.students){//

                    ctx.status=404;

                    ctx.json({
                        message:"input wrong format"
                    })

                }else{
                         /*
                            *check teacher email exist or not
                        */
                        const teacherEmail=ctx.request.body.teacher;

                        const teaId=await teacherStuModel.findIdByTeacheremail(teacherEmail);
            
                        if (teaId.length<1){ 
            
                        ctx.status=404;
            
                        ctx.json({
            
                            message:"Please input correct teacher email address"
            
                        })
            
                        }else{
                                 /*
                                     *check student email exist or not and 
                                     *get all students ID
                                */
                                var studentId=[];

                                var studentEmail=[];

                                studentEmail=ctx.request.body.students;

                                for (var stu in studentEmail){

                                    const stuId= await teacherStuModel.findIdByStudentemail(studentEmail[stu]);
                                   
                                    if (stuId.length<1){ 
                                        return [ctx.status=404,ctx.json({
                                                message:"Please input correct student email address"
                                            })] 

                                    }else{

                                        const stuId= await teacherStuModel.findIdByStudentemail(studentEmail[stu]);
                                       
                                        studentId[stu]=stuId[0].id;
                                    }
                            }

                                 /*
                                    *insert data
                                */
                            const teacherId=teaId[0].id;

                            for(var stuid of studentId){
                                var  teacherStu={
                                    teacher_id:teacherId,
                                    student_id:stuid,
                                    status:"Nosuspend"
                                }

                                 /*
                                    *check information of student and teacher exist or not
                                */
                                const items=await teacherStuModel.findStudentAndTeacher(teacherId,stuid)
                                
                                if(items.length>=1){
                                    continue;
                                }

                                await teacherStuModel.insertData(teacherStu);

                            }

                            // *** return result *** //
                        
                            ctx.status=200;

                            ctx.json({
                                status:200,
                                message:"registered successfully",
                                
                            })
                        }
                }

        }catch(err){
            ctx.status=500;
            ctx.json({

                code: err.code || 'internal:unknown_error',
                message: err.message || ''
            })
        }
          
    },

    /*
    *Get_Commonstudents function
    */

    Get_Commonstudents:async(ctx,next)=>{
        try{
              /*
                *check input format
             */
            if(!ctx.query.teacher){

                ctx.status=404;

                ctx.json({
                    message:"input wrong format"
                })

            }else{
                 /*
                    *student only under one teacher
                */

                if(typeof(ctx.query.teacher)==="string"){

                    const teaId=await teacherStuModel.findIdByTeacheremail(ctx.query.teacher);
                   
                    // *** check teacher exist or not *** //
                    if (teaId.length<1){

                        ctx.status=500;
                        ctx.json({
                            message:"Please input correct email address"
                        })

                    }else{
                        var studentEmail=[]
                        const teacherId=teaId[0].id
                        const students=await teacherStuModel.findStudentsByTeacherEmail(teacherId);
                       
                        for(var stu in students){

                            studentEmail[stu]=students[stu].email;
                        }

                        studentEmail.push("student_only_under_"+ctx.query.teacher);

                        //*** return result ***//

                        ctx.status=200;

                        ctx.json({
                            status:200,
                            students:studentEmail
                        })
                    }  

                }else{
                    /*
                    * students under two or more teachers
                    */

                    //*** find all students ***//
                    var studentsEmail=[]
                    var commmonStudentEmail=[]
                   
                    for (var i of ctx.query.teacher ){

                        const teaId=await teacherStuModel.findIdByTeacheremail(i);
                        //*** check teacher exist or not ***//
                        if (teaId.length<1){
                            return [ctx.status=404,ctx.json({
                                        message:"Please input correct teacher email address"
                                    })] 

                        }else{
                            
                            var stuEmail=[]
                            const teacherId=teaId[0].id
                            const students=await teacherStuModel.findStudentsByTeacherEmail(teacherId);
    
                            for(var k in students){

                                stuEmail[k]=students[k].email

                            }
                            
                            studentsEmail=studentsEmail.concat(stuEmail) 
                            
                        }
                    }

                    //*** find common students ***//
                    studentsEmail.forEach((item)=>{
                        if(studentsEmail.indexOf(item)!=studentsEmail.lastIndexOf(item)&&commmonStudentEmail.indexOf(item)==-1){
                            commmonStudentEmail.push(item)
                        }
                    })
                    
                    //*** return result ***//
                    ctx.status=200;
                    ctx.json({
                        status:200,
                        students:commmonStudentEmail
                    })  

                }
            }
        }catch(err){
            ctx.status=500;

            ctx.json({

                code: err.code || 'internal:unknown_error',
                message: err.message || ''
            })
        } 
    },

   /*
    *Update_Status_Suspend function
    */

    Update_Status_Suspend:async(ctx,next)=>{

        try{
              /*
                 *check input format
              */
             if(!ctx.request.body.student){
 
                 ctx.status=404;
                 ctx.json({
                     message:"input wrong format"
                 })
 
             }else{
 
                 const stuId= await teacherStuModel.findIdByStudentemail(ctx.request.body.student);
                  
                 //*** check email  exist or not ***//
 
                 if (stuId.length<1){
 
                     return [ctx.status=404,ctx.json({
                             message:"Please input correct email address"
                         })] 
 
                 }else{
 
                     studentId=stuId[0].id;
 
                     await teacherStuModel.suspendStuent(["suspend",studentId]);
 
                     ctx.status=200;
                     ctx.json({
                         status:200,
                         message:"updated status successfully"
                     })
                 }  
             }
        }catch(err){
 
             ctx.status=500;
 
             ctx.json({
                
                code: err.code || 'internal:unknown_error',
                message: err.message || ''
            })
         }     
     },

     /*
    *Retrieve_for_Notifications function
    */

     Retrieve_for_Notifications:async(ctx,next)=>{

        try{
            /*
                *check input format
             */
    
            if(!ctx.request.body.teacher||!ctx.request.body.notification){ 
    
                ctx.status=404;
    
                ctx.json({
                    message:"input wrong character"
                })
    
            }else{
                /*
                *get @mentioned student email
                */
                var no1=(ctx.request.body.notification).indexOf('\@');
    
                var no3=(ctx.request.body.notification).substring((no1+1));
    
                var studentMentioned=no3.split(' @');
    
                for(var email of studentMentioned){
    
                    if((email.search('\@'))==-1){
    
                        return[ctx.status=404,ctx.json({
                            message:"please input correct format"
                            })] 
                        }
                }
    
                /*
                *get student email under teacherEmail
                */
               
                const teacherEmail=ctx.request.body.teacher;
    
                const teaId=await teacherStuModel.findIdByTeacheremail(teacherEmail);
    
                //*** check teacher email exist or not ***//
    
                if (teaId.length<1){  
    
                    ctx.status=404;
    
                    ctx.json({
    
                        message:"Please input correct teacher email address"
    
                    })
    
                }else{
    
                    var studentEmail=[];
                    var studentEmailNeedNotificated=[]
                    const teacherId=teaId[0].id;
                    const student=await teacherStuModel.findStudentsByTeacherEmailNosuapend(teacherId)
                   
                    for(var stu in student){
    
                        studentEmail[stu]=student[stu].email;
                    }
    
                    studentEmail=studentEmail.concat(studentMentioned);
                    
                    studentEmail.forEach((item)=>{
    
                        if(studentEmailNeedNotificated.indexOf(item)==-1){
                            studentEmailNeedNotificated.push(item)
                        }
                    })
    
                    studentEmailNeedNotificated.push("original_student_under_"+teacherEmail)
                      //*** return result ***//
                    ctx.status=200;
                    ctx.json({
                        status:200,
                        "recipients":studentEmailNeedNotificated
                    })
                }
            }
             
        }catch(err){
    
            ctx.status=500;
    
            ctx.json({
                
                code: err.code || 'internal:unknown_error',
                message: err.message || ''
            })
        }
    
    }

}