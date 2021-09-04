import  connection  from "./connection"
import students from "./initialData/students.json"
import hobbies from "./initialData/hobbies.json"
import teachers from "./initialData/teachers.json"
import specialties from "./initialData/specialties.json"
import classes from "./initialData/classes.json"
import studentHobbies from "./initialData/studentHobbies.json"
import teacherSpecialties from "./initialData/teacherSpecialties.json"
import classStudent from "./initialData/classStudent.json"
import classTeacher from "./initialData/classTeacher.json"


const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
    .raw(`
        CREATE TABLE IF NOT EXISTS Student (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            birthDate DATE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Hobbies (
            id INT PRIMARY KEY AUTO_INCREMENT,
            description VARCHAR(255) UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS StudentHobbies_junction (
            student_id INT NOT NULL,
            hobbies_id INT NOT NULL,
            PRIMARY KEY (student_id, hobbies_id),
            FOREIGN KEY (student_id) REFERENCES Student(id),
            FOREIGN KEY (hobbies_id) REFERENCES Hobbies(id)
        );

        CREATE TABLE IF NOT EXISTS Teacher (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            birthDate DATE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Specialties (
            id INT PRIMARY KEY AUTO_INCREMENT,
            description ENUM("Backend", "CSS", "Programação Orientada a Objetos", "React", "Redux", "Testes", "Typescript") UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS TeacherSpecialties_junction (
            teacher_id INT NOT NULL,
            specialties_id INT NOT NULL,
            PRIMARY KEY (teacher_id, specialties_id),
            FOREIGN KEY (teacher_id) REFERENCES Teacher(id),
            FOREIGN KEY (specialties_id) REFERENCES Specialties(id)
        );

        CREATE TABLE IF NOT EXISTS Class (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) UNIQUE NOT NULL,
            startDate DATE NOT NULL,
            endDate DATE NOT NULL,
            module ENUM("0","1","2","3","4","5","6","7") NOT NULL,
            period ENUM("integral", "noturno") DEFAULT "integral"
        );

        CREATE TABLE IF NOT EXISTS ClassStudent_junction (
            class_id INT NOT NULL,
            student_id INT PRIMARY KEY NOT NULL,
            FOREIGN KEY (class_id) REFERENCES Class(id),
            FOREIGN KEY (student_id) REFERENCES Student(id)
        );

        CREATE TABLE IF NOT EXISTS ClassTeacher_junction (
            class_id INT NOT NULL,
            teacher_id INT PRIMARY KEY NOT NULL,
            FOREIGN KEY (class_id) REFERENCES Class(id),
            FOREIGN KEY (teacher_id) REFERENCES Teacher(id)
        );
    `)
    .then(() => { console.log("Tables created!") })
    .catch(printError);

const insertStudents = () => connection("Student")
    .insert(students)
    .then(() => { console.log("Students populated!") })
    .catch(printError);

const insertHobbies = () => connection("Hobbies")
    .insert(hobbies)
    .then(() => { console.log("Hobbies populated!") })
    .catch(printError);

const insertTeachers = () => connection("Teacher")
    .insert(teachers)
    .then(() => { console.log("Teachers populated!") })
    .catch(printError);

const insertSpecialties = () => connection("Specialties")
    .insert(specialties)
    .then(() => { console.log("Specialties populated!") })
    .catch(printError);

const insertClasses = () => connection("Class")
    .insert(classes)
    .then(() => { console.log("Teachers populated!") })
    .catch(printError);

const insertStudentHobbies = () => connection("StudentHobbies_junction")
    .insert(studentHobbies)
    .then(() => { console.log("Junction Student-Hobbies populated!") })
    .catch(printError);

const insertTeacherSpecialties = () => connection("TeacherSpecialties_junction")
    .insert(teacherSpecialties)
    .then(() => { console.log("Junction Teacher-Specialties populated!") })
    .catch(printError);

const insertClassStudent = () => connection("ClassStudent_junction")
    .insert(classStudent)
    .then(() => { console.log("Junction Class-Student populated!") })
    .catch(printError);

const insertClassTeacher = () => connection("ClassTeacher_junction")
    .insert(classTeacher)
    .then(() => { console.log("Junction Class-Teacher populated!") })
    .catch(printError);

const closeConnection = () => { connection.destroy() };

createTables()
    .then(insertStudents)
    .then(insertHobbies)
    .then(insertTeachers)
    .then(insertSpecialties)
    .then(insertClasses)
    .then(insertStudentHobbies)
    .then(insertTeacherSpecialties)
    .then(insertClassStudent)
    .then(insertClassTeacher)
    .finally(closeConnection);