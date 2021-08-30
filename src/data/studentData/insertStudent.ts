import connection from "../connection"
import { student } from "../../types"

const insertStudent = async (
    name: string,
    email: string,
    modifyBirthDateFormat: string,
): Promise<any> => {
    const result: student | null = await connection("Student")
        .insert({
            name: name,
            email: email,
            birthDate: modifyBirthDateFormat
        })
    return result
}

export default insertStudent