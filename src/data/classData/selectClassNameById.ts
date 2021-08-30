import { classes } from "../../types"
import connection from "../connection"

const selectClassNameById = async(
    classId: number
): Promise<any> => {
    const className: classes[] | undefined = await connection("Class")
        .select("name")
        .where({id: classId})
    
    return className[0].name
}

export default selectClassNameById