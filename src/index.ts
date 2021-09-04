import app from './app';

import getStudentsByClass from './endpoints/getStudentsByClass';
import getTeachersByClass from './endpoints/getTeachersByClass';
import getStudentAgeById from './endpoints/getStudentAgeById';
import getStudentsByHobby from './endpoints/getStudentsByHobby';

import createStudent from './endpoints/createStudent';
import createTeacher from './endpoints/createTeacher';
import createClass from './endpoints/createClass';
import createStudentInClass from './endpoints/createStudentInClass';
import createTeacherInClass from './endpoints/createTeacherInClass';

import updateModuleFromClass from './endpoints/updateModuleFromClass';

import deleteStudentFromClass from './endpoints/deleteStudentFromClass';
import deleteTeacherFromClass from './endpoints/deleteTeacherFromClass';



app.get("/class/:classId/student", getStudentsByClass);
app.get("/class/:classId/teacher", getTeachersByClass);
app.get("/student/age/:studentId", getStudentAgeById);
app.get("/student/hobby", getStudentsByHobby);

app.post("/student", createStudent);
app.post("/teacher", createTeacher);
app.post("/class", createClass);
app.post("/class/student", createStudentInClass);
app.post("/class/teacher", createTeacherInClass);

app.put("/class/:classId/module", updateModuleFromClass);

app.delete("/class/:classId/student/:studentId", deleteStudentFromClass);
app.delete("/class/:classId/teacher/:teacherId", deleteTeacherFromClass)