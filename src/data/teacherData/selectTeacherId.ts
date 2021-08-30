import connection from "../connection"
import { teacher } from "../../types"

const selectTeachearId = async (
    email: string
): Promise<any> => {
    const result: teacher[] | undefined = await connection("Teacher")
     .select()
     .where({email: email})
    
    return result
}

export default selectTeachearId