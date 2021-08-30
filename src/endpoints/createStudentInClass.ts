import { Request, Response } from 'express';
import insertStudentInClass from '../data/classData/insertStudentInClass';
import { classStudDependencies } from '../types';

const createStudentInClass = async(
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const { classId, studentId } = req.body;

        if (!classId || !studentId) {
            errorCode = 422;
            throw new Error("One or more fields aren´t filled! Please, check if 'classId' and 'studentId' input´s exist");
        }

        if (typeof classId !== "number" || typeof studentId !== "number") {
            errorCode = 422;
            throw new Error("'classId' and 'studentId' should be a number type! Please, check input´s values");
        };

        const result: classStudDependencies | undefined = await insertStudentInClass(classId, studentId);

        if(!result) {
            if (result === undefined) {
                errorCode = 422;
                throw new Error("'classId' and/or 'studentId' doesn´t exist! Please, check input´s values");
            } else if (result === false) {
                errorCode = 422;
                throw new Error("Student already exist in some class! Please, try another student");
            }; 
        };

        res.status(201).send({ message: "Student associated to class successfully!" });
    } catch(error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message });
    }
};

export default createStudentInClass;