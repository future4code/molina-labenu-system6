import connection from "../connection"
import { student } from "../../types"

const selectCreatedStudent = async (
    email: string
): Promise<any> => {
    const result: student[] | undefined = await connection("Student")
        .select()
        .where({email: email})
    return result
}

export default selectCreatedStudent