# Ndejs-Assignments

>>## link  https://koa-mysql-restfulapi.herokuapp.com

|  HTTP Verb |      PATH                    |  Description   |
| -----------|:----------------------------:| --------------:|
| POST       | /api/register                | register one or more students to a specified teacher. The teacher and students must exist in teachers table and students table |
| GET        | /api/commonstudents          | retrieve a list of students |
|POST        | /api/suspend                 | suspend a specified student |
|POST        | /api/retrievefornotifications| retrieve all student emails that can receive notifications from a teacher's email |
>>>### Test Data

>>>>>#### Table teachers

|id | name    |  email  |
| - |:-------:| -------------------------:|
| 1 | vero    | jesus.tremblay@example.net|
| 2 | est	    | chelsea.adams@example.org |
| 3 |  nem    | zlowe@example.net|
| 4 | necessi | roa.hilario@example.net |
| 5 | sto     | shields.maci@example.org|

>>>>>#### Table students

|id | name           |  email              |
|-- |:--------------:| -------------------:|
| 1 | aut	           | chris03@example.net |
| 2 | maxime         | cortez48@example.org |
| 3 | nemo           | jerde.lorna@example.org |
| 4 | necessitatibus | rossie75@example.net |
| 5 | iusto	         | xbuckridge@example.com |

>>>>>#### Table teachers_students

|id | teacher_id | student_id | status    |
| - |:----------:| ----------:|----------:|
| 1 | 5	         | 5          | Nosuspend |
| 2 | 5          | 4          | Nosuspend |
| 3 | 4          | 5          | Nosuspend |
| 4 | 4          | 4          | Nosuspend |
| 5 | 3          | 5          | Nosuspend |


