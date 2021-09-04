import { teacher } from "../../types"
import connection from "../connection"

const selectTeachersByClass = async(
    classId: number
): Promise<any> => {
    const result: teacher[] | undefined = await connection.raw(`
        SELECT Teacher.id AS "id", name
        FROM Teacher
        INNER JOIN ClassTeacher_junction
        ON teacher_id = Teacher.id
        WHERE class_id = ${classId}
    `)

    if (result === undefined){
        return result
    } else {
        return result [0]
    }
}

export default selectTeachersByClass