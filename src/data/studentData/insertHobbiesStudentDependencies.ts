import connection from "../connection"
import { studHobDependencies, hobby } from "../../types"

const insertHobbiesStudentDependencies = async (
    hobbies: hobby[],
    studentId: number
): Promise<any> => {
    let result: studHobDependencies[] | undefined

    for (let hobby of hobbies){
        result = await connection("StudentHobbies_junction")
        .insert({
            student_id: studentId,
            hobbies_id: hobby.id
        })
    }
    return result
}

export default insertHobbiesStudentDependencies