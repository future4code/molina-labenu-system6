import { Request, Response } from 'express';
import removeStudentFromClass from '../data/classData/removeStudentFromClass';

const deleteStudentFromClass = async(
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const { classId, studentId } = req.params;
        const classIdInNumbers: number | undefined = Number(classId);
        const studentIdInNumbers: number | undefined = Number(studentId);

        if (!classId || !studentId) {
            errorCode = 422;
            throw new Error("Expected receive 'classId' and 'studentId' params! Please, check input´s values");
        };

        if (!classIdInNumbers ||  classIdInNumbers <= 0 || classId.split(".").length > 1 ||
            !studentIdInNumbers || studentIdInNumbers <= 0 || studentId.split(".").length > 1) {
            errorCode = 422;
            throw new Error(`'classId' and 'studentId' was expected as a string of valid integer
             positive and not null numbers! Please, check params`);
        };

        const isRemoved: boolean = await removeStudentFromClass(classIdInNumbers, studentIdInNumbers);

        if (!isRemoved){
            errorCode = 422;
            throw new Error ("Student selected isn´t in class chosen! Please, check students from class first");
        }

        res.status(201).send({ message: "Student has been removed from class successfully!" });
    } catch(error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message });
    };
};

export default deleteStudentFromClass;