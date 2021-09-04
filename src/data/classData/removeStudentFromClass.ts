import { student } from "../../types"
import connection from "../connection"

const removeStudentFromClass = async(
    classId: number,
    studentId: number
): Promise<any> => {
    const isStudentInClass: student[] | undefined = await connection("ClassStudent_junction")
        .select()
        .where({
            class_id: classId,
            student_id: studentId
        })
    if (isStudentInClass[0]){
        await connection("ClassStudent_junction")
            .delete()
            .where({student_id: studentId})
        return true
    } else {
        return false
    }
}

export default removeStudentFromClass