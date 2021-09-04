import { Request, Response } from 'express';
import moment from 'moment';
import insertClass from '../data/classData/insertClass';
import { classes, date } from '../types';

const createClass = async(
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const { name, startDate, endDate, module, period } = req.body;
        const modifyStartDateFormat: string | undefined = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const modifyEndDateFormat: string | undefined = moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const stringModule: string = module.toString();

        if (!name || !startDate || !endDate || !stringModule) {
            errorCode = 422;
            throw new Error("One or more fields are empty! Please, fill 'name', 'startDate', 'endDate' and 'module' to proceed");
        }; 

        if (
            stringModule !== "0" && stringModule !== "1" && stringModule !== "2" && stringModule !== "3" &&
            stringModule !== "4" && stringModule !== "5" && stringModule !== "6" && stringModule !== "7"
        ) {
            errorCode = 422;
            throw new Error("'module' only accepts integer values from 0 to 7! Please, check input value");
        };

        if (period) {
            if(period === "noturno" && name.slice(name.length - 9) !== "-na-night") {
                errorCode = 422;
                throw new Error("Nocturne classes needs '-na-night' as last part of select class name! Please, check 'name' input");
            } else if (period === "integral" && name.slice(name.length - 9) === "-na-night") {
                errorCode = 422;
                throw new Error("'-na-night' words as last part of a class name are restricted to 'noturno' classes! Please, check 'name' input");
            };
        };

        const result: classes | null = await insertClass(name, modifyStartDateFormat, modifyEndDateFormat, stringModule, period)

        if (!result) {
            errorCode = 500;
            throw new Error("An error occurred! Please, try again!");
        };


        res.status(201).send({ message: "Class created successfully!" });
    } catch(error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message });
    };
};

export default createClass;