
/*
    *mysql configuration
    *design table
    *query function
 */
const mysql=require('koa-mysql');

const config=require('../config')

//*** set up parameters ***//

var pool  = mysql.createPool({
    host     : config.database.HOST,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE,
    port     : config.database.PORT
  });

  //*** define query function ***//

  const query = ( sql, values ) => {

    return new Promise(( resolve, reject ) => {
      pool.getConnection( (err, connection) => {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  
  }

//*** create table function ***//

  const createTable = ( sql ) => {
    return query( sql, [] )
  }
 
  //*** design table ***//

  const teachers =
    `create table if not exists teachers(
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
           name VARCHAR(100) NOT NULL,
           email VARCHAR(100) NOT NULL UNIQUE,
           PRIMARY KEY (id)
      ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`
    
    const students=
    `create table if not exists students(
      id int(11) NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      PRIMARY KEY (id)
     );`

     const teachers_students=
    `create table if not exists teachers_students(
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      teacher_id  INT UNSIGNED NOT NULL,
      student_id  INT UNSIGNED NOT NULL,
      status VARCHAR(100) NOT NULL,
      PRIMARY KEY ( id ),
      constraint teacher_fk foreign key(teacher_id) references teachers(id) on update cascade on delete cascade,
      constraint student_fk foreign key(student_id) references students(id) on update cascade on delete cascade
     ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`

    //*** produce table ***//

    createTable(students);
    createTable(teachers);
    createTable(teachers_students);

    //*** insert data into teachers_students table ***//

    exports.insertData = (value) => {

      let _sql = "insert into teachers_students set ?;"
      return query( _sql, value )

    }

    //*** find teacher id through teacher email ***//
    
    exports.findIdByTeacheremail=(value)=>{

      let _sql=`select id from teachers where email="${value}";`
      return query(_sql);

    }

    //*** find student id through student email ***//

    exports.findIdByStudentemail=(value)=>{

      const _sql=`select id from students  where email="${value}";`
      return query(_sql);

    }

    //*** find students emails by teacher email ***//

    exports.findStudentsByTeacherEmail=(value)=>{

      const _sql=`select email from students inner join 
      teachers_students on students.id=teachers_students.student_id 
      where teacher_id="${value}"`;
      return query(_sql);

    }

    //*** change status of stuent in teachers_students table ***//

    exports.suspendStuent=(value)=>{

      let _sql = "update teachers_students set status=? where student_id=?"
      return query( _sql, value )
     
    }

    //*** find students who status is NoSuspend by teacher email ***//

    exports.findStudentsByTeacherEmailNosuapend=(value)=>{

      const _sql=`select email from students inner join 
      teachers_students on students.id=teachers_students.student_id 
      where teacher_id="${value}" and status="NoSuspend"`;
      return query(_sql);

    }

    //*** find student and teacher by student id and teacher id in teachers_students ***//
    exports.findStudentAndTeacher=(teacherId,studentId)=>{

      const _sql=`select id from teachers_students where teacher_id="${teacherId}" and student_id="${studentId}";`
      return query(_sql);

    }