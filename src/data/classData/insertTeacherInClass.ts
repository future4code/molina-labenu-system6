import { classes, classTeachDependencies, teacher } from "../../types"
import connection from "../connection"

const insertTeacherInClass = async(
    classId: number,
    teacherId: number
): Promise<any> => {
    const hasTeacher: teacher[] | undefined = await connection("Teacher")
        .select()
        .where({id: teacherId})
    
    const hasClass: classes[] | undefined = await connection("Class")
        .select()
        .where({id: classId})
    
    const alreadyTeacherInClass: classTeachDependencies[] | undefined = await connection("ClassTeacher_junction")
        .select()
        .where({teacher_id: teacherId})

    const result: classTeachDependencies | false = hasClass[0] && hasTeacher[0] && !alreadyTeacherInClass[0]
    && await connection("ClassTeacher_junction")
        .insert({
            class_id: classId,
            teacher_Id: teacherId
        })
    return result
}

export default insertTeacherInClass