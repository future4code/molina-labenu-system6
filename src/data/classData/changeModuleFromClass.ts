import { classes } from "../../types"
import connection from "../connection"

const changeModuleFromClass = async (
    classId: number,
    module: string
): Promise<any> => {
    const classToModify: classes [] = await connection("Class")
        .select()
        .where({id: classId})
    const actualModule: string = classToModify [0].module

    if ( actualModule === module ) {
        return false
    } else {
        await connection("Class")
            .update({module: module})
            .where({id: classId})

        return true
    }
}

export default changeModuleFromClass