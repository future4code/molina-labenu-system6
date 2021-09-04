import { Request, Response } from 'express';
import selectStudentsByHobby from '../data/studentData/selectStudentsByHobby';
import { student } from '../types';

const getStudentsByHobby = async(
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const description: string | undefined = req.query.description as string;
        
        const result: student[] | undefined = await selectStudentsByHobby(description);

        if (result === undefined) {
            errorCode = 500;
            throw new Error("An error occurred! Please, try again!");
        }

        res.status(200).send({ hobby: description, students:  result});
    } catch(error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message });
    };
};

export default getStudentsByHobby;