import { classes, classStudDependencies, student } from "../../types";
import connection from "../connection";

const insertStudentInClass = async (
    classId: number,
    studentId: number
): Promise<any> => {
    const hasStudent: student[] | undefined = await connection("Student")
        .select()
        .where({ id: studentId});

    const hasClass: classes[] | undefined = await connection("Class")
        .select()
        .where({ id: classId});

    const alreadyStudentInClass: classStudDependencies[] | undefined = await connection("ClassStudent_junction")
        .select()
        .where({student_id: studentId});

    const result: classStudDependencies | false | undefined = hasClass[0] && hasStudent[0] && !alreadyStudentInClass[0]
        && await connection("ClassStudent_junction")
            .insert({
                class_id: classId,
                student_id: studentId
            });

    return result;
};

export default insertStudentInClass;