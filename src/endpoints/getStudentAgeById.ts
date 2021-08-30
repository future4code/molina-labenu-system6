import { Request, Response } from 'express';
import selectStudentAgeById from '../data/studentData/selectStudentAgeById';

const getStudentAgeById = async(
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const { studentId } = req.params;
        const numberStudentId: number | undefined = Number(studentId);

        if (!numberStudentId || numberStudentId <= 0 || studentId.split(".").length > 1) {
            errorCode = 422;
            throw new Error("'studentId' was expected as a string of valid integer positive and not null numbers! Please, try again");
        };

        const result: number | [] = await selectStudentAgeById(numberStudentId);

        if (typeof result !== "number") {
            errorCode = 404;
            throw new Error("Student hasn´t been found! Please, try again!");
        };

        res.status(200).send({ age: result });
    } catch(error) {
        res.status(errorCode).send({ message: error.message ? error.message : error.sqlMessage });
    };
};

export default getStudentAgeById;