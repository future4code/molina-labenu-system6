import { Request, Response } from 'express';
import selectClassNameById from '../data/classData/selectClassNameById';
import selectStudentsByClass from '../data/studentData/selectStudentsByClass';
import { student } from '../types';

const getStudentsByClass = async(
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const { classId } =  req.params;
        const classIdInNumbers: number | undefined = Number(classId);
    
        if (!classIdInNumbers || classIdInNumbers <= 0 || classId.split(".").length > 1) {
            errorCode = 422;
            throw new Error("'studentId' was expected as a string of valid integer positive and not null numbers! Please, try again");
        };

        const result: student[] | undefined = await selectStudentsByClass(classIdInNumbers);

        const className: string | undefined = await selectClassNameById(classIdInNumbers);

        if (result === undefined) {
            errorCode = 500;
            throw new Error("An error occurred! Please, try again!");
        };

        res.status(200).send({ className: className, students: result });  
    } catch(error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message });
    };
};

export default getStudentsByClass;