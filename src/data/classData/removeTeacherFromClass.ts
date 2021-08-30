import { teacher } from "../../types"
import connection from "../connection"

const removeTeacherFromClass = async(
    classId: number,
    teacherId: number
): Promise<any> => {
    const isTeacherInClass: teacher[] | undefined = await connection("ClassTeacher_junction")
        .select()
        .where({
            class_id: classId,
            teacher_id: teacherId
        })
    
    if (isTeacherInClass[0]){
        await connection("ClassTeacher_junction")
            .delete()
            .where({teacher_id: teacherId})
        return true
    } else {
        return false
    }
}

export default removeTeacherFromClass