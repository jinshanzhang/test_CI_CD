
const expect = require('chai').expect;
const chai = require('chai')
const chaiHttp = require('chai-http');
const server=require('../server');
chai.use(chaiHttp);

describe('Test API',function(){
    
     /*
    *test path register
    */

    it('should return HTTP Code 204 for path register',(done)=>{

        chai.request(server)

            .post('/api/register')

            .send({

                "teacher":"jesus.tremblay@example.net",
                "students":["chris03@example.net"]
            })

            .end(function(err,ctx,next) {

                expect(ctx).to.have.status(204);   

            });

         done();
    });

    /*
    *test path commonstudents
    */

     //*** one teacher ***/

     it('should return array for path commonstudents under one teacher',(done)=>{

        chai.request(server)

            .get('/api/commonstudents?teacher=shields.maci@example.org')

            .end(function(err,ctx,next) {
               
                expect(ctx.body).to.have.property('students').with.match('student_only_under_brooks.stehr@example.org')
                expect(ctx).to.have.status(200); 
            });

        done();
    });

     //*** two or more teachers ***//

     it('should return array for path commonstudents under two or more teachers',(done)=>{

        chai.request(server)

            .get('/api/commonstudents?teacher=shields.maci@example.org&teacher=roa.hilario@example.net')
            .end(function(err,ctx,next) {

                expect(ctx).to.have.status(200); 
            });

        done();
    })

    /*
    *test path suspend
    */

    it('should return HTTP Code 204 for path suspend',(done)=>{

        chai.request(server)

            .post('/api/suspend')

            .send({

                    "student":"chris03@example.net"
            })
            .end(function(err,ctx,next) {

                expect(ctx).to.have.status(204); 
            });

        done();
    })

    
    /*
    *test path retrievefornotifications
    */

    it('should return array for path retrievefornotifications',(done)=>{

        chai.request(server)

            .post('/api/retrievefornotifications')

            .send({

                "teacher":  "shields.maci@example.org",
                "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
            })

            .end(function(err,ctx,next) {

                expect(ctx.body).to.have.property('recipients');

                expect(ctx).to.have.status(200); 
            });

        done();
    })

})



