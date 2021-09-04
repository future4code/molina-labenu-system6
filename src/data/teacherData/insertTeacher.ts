import connection from "../connection"
import { teacher } from "../../types"

const insertTeacher = async (
    name: string, 
    email: string,
    modifyBirthDateFormat: string,
): Promise<any> => {
    const result: teacher | null = await connection("Teacher")
        .insert({
            name: name,
            email: email,
            birthDate: modifyBirthDateFormat
        })
    return result
}

export default insertTeacher