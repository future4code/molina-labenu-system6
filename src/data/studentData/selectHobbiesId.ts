import connection from "../connection"
import { hobby } from "../../types"

const selectHobbiesId = async (
    hobbies: hobby[],
): Promise<any> => {
    let result: hobby[] = []
    for (let hobby of hobbies){
        const hobbyWithId: hobby[] = await connection("Hobbies")
            .select()
            .where({ description: hobby.description })

        result.push(hobbyWithId[0])
    }

    return result
}

export default selectHobbiesId