import { student } from "../../types";
import connection from "../connection";

const selectStudentsByClass = async(
    classId: number
): Promise<any> => {
    const result: student[] | undefined = await connection.raw(`
        SELECT Student.id AS "id", name
        FROM Student
        INNER JOIN ClassStudent_junction
        ON student_id = Student.id
        WHERE class_id = ${classId}
    `);

    if (result === undefined){
        return result;
    } else {
        return result[0];
    };
};

export default selectStudentsByClass;