import { Request, Response } from 'express';
import moment from 'moment';
import insertStudent from '../data/studentData/insertStudent';
import insertNewHobbies from '../data/studentData/insertNewHobbies';
import insertHobbiesStudentDependencies from '../data/studentData/insertHobbiesStudentDependencies';
import selectHobbiesId from '../data/studentData/selectHobbiesId';
import selectCreatedStudent from '../data/studentData/selectCreatedStudent';
import { student, hobby, date } from '../types';

const createStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;
    const regExValidateEmail: RegExp = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;

    try {
        const { name, email, birthDate, hobbies } = req.body;
        const modifyBirthDateFormat: string | undefined = moment(birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

        const birthDateSplit = birthDate.split("/");
        const studentAgeInNumbers: date = {
            day: Number(birthDateSplit[0]),
            month: Number(birthDateSplit[1]),
            year: Number(birthDateSplit[2])
        };
        const actualDate: date = {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        };

        if (!name || !email || !birthDate) {
            errorCode = 422;
            throw new Error("One or more fields are empty! Please, fill 'name', 'email' and 'birthDate' to proceed");
        };

        if (!regExValidateEmail.test(email)) {
            errorCode = 422;
            throw new Error("Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
        };

        if(studentAgeInNumbers.year > actualDate.year){
            errorCode = 422;
            throw new Error("Student age insert is a future date! Please, check input´s value");
        } else if(actualDate.year === studentAgeInNumbers.year){
            if(studentAgeInNumbers.month > actualDate.month){
                errorCode = 422;
                throw new Error("Student age insert is a future date! Please, check input´s value");
            } else if (studentAgeInNumbers.month === actualDate.month){
                if (studentAgeInNumbers.day >= actualDate.day){
                    errorCode = 422;
                    throw new Error("Student age insert is a future date! Please, check input´s value");
                };
            };
        };
        

        if (actualDate.year - studentAgeInNumbers.year < 18) {
            errorCode = 422;
            throw new Error("Student should be at least 18 years old!");
        } else if (actualDate.year - studentAgeInNumbers.year === 18) {
            if (studentAgeInNumbers.month > actualDate.month) {
                errorCode = 422;
                throw new Error("Student should be at least 18 years old!");
            } else if(studentAgeInNumbers.month === actualDate.month) {
                if (studentAgeInNumbers.day > actualDate.day){
                    errorCode = 422;
                    throw new Error("Student should be at least 18 years old!");
                };
            };
        };

        if (hobbies) {
            for (let hobby of hobbies) {
                if (!hobby.description){
                    errorCode = 422;
                    throw new Error("Each 'hobby' must received only a 'description' property! Please, check input´s values");
                };
            };
        };

        const result: student | null = await insertStudent(name, email, modifyBirthDateFormat);

        if (!result) {
            errorCode = 500;
            throw new Error("An error occurred! Please, try again!");
        };

        if (hobbies !== undefined) {
            await insertNewHobbies(hobbies);

            const studentCreated: student[] | undefined = await selectCreatedStudent(email);

            if (studentCreated !== undefined) {
                const studentId: number = studentCreated[0].id;
                const hobbiesWithId: hobby[] = await selectHobbiesId(hobbies);

                await insertHobbiesStudentDependencies(hobbiesWithId, studentId);
            } else {
                errorCode = 500;
                throw new Error("An error occurred! Please, try again!");
            };
        };

        res.status(201).send({ message: "Student created successfully!" });
    } catch (error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message });
    };
};

export default createStudent;