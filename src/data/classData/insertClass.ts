import connection from "../connection"
import { classes } from "../../types"

const insertClass = async(
    name: string,
    startDate: string,
    endDate: string,
    module: string,
    period?: string
): Promise<any> => {
    const result: classes | null = await connection("Class")
        .insert({
            name: name,
            startDate: startDate,
            endDate: endDate,
            module: module,
            period: period
        })
    return result
}

export default insertClass