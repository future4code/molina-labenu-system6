import { Request, Response } from 'express';
import removeTeacherFromClass from '../data/classData/removeTeacherFromClass';

const deleteTeacherFromClass = async(
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const { classId, teacherId } = req.params;
        const classIdInNumbers: number | undefined = Number(classId);
        const teacherIdInNumbers: number | undefined = Number(teacherId);

        if (!classId || !teacherId) {
            errorCode = 422;
            throw new Error("Expected receive 'classId' and 'teacherId' params! Please, check input´s values");
        };

        if (!classIdInNumbers ||  classIdInNumbers <= 0 || classId.split(".").length > 1 ||
            !teacherIdInNumbers || teacherIdInNumbers <= 0 || teacherId.split(".").length > 1) {
            errorCode = 422;
            throw new Error(`'classId' and 'teacherId' was expected as a string of valid integer
             positive and not null numbers! Please, check params`);
        };

        const isRemoved: boolean = await removeTeacherFromClass(classIdInNumbers, teacherIdInNumbers);

        if (!isRemoved){
            errorCode = 422;
            throw new Error ("Teacher selected isn´t in class chosen! Please, check teachers from class first");
        }

        res.status(201).send("Teacher has been removed from class successfully!");
    } catch(error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message });
    };
};

export default deleteTeacherFromClass;