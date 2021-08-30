import { Request, Response } from 'express';
import changeModuleFromClass from '../data/classData/changeModuleFromClass';

const updateModuleFromClass = async(
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 422;

    try {
        const { classId } = req.params;
        const { module } = req.body;
        const classIdInNumbers: number | undefined = Number(classId);
        const stringModule: string = module.toString();

        if (!classId) {
            errorCode = 422;
            throw new Error("'classId' has expected a value! Please, check param´s input");
        };

        if (!classIdInNumbers ||  classIdInNumbers <= 0 || classId.split(".").length > 1) {
            errorCode = 422;
            throw new Error(`'classId' was expected as a string of valid integer
             positive and not null numbers! Please, check param`);
        };

        if (
            stringModule !== "0" && stringModule !== "1" && stringModule !== "2" && stringModule !== "3" &&
            stringModule !== "4" && stringModule !== "5" && stringModule !== "6" && stringModule !== "7"
        ) {
            errorCode = 422;
            throw new Error("'module' only accepts integer values from 0 to 7! Please, check input value");
        };

        const hasChanged: boolean = await changeModuleFromClass(classIdInNumbers, stringModule);

        if (!hasChanged) {
            errorCode = 422;
            throw new Error("Module selected is already actual module! Please, check input value");
        };

        res.status(200).send({ message: "Module from class updated successfully!" });

    } catch(error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message });
    };
};

export default updateModuleFromClass;