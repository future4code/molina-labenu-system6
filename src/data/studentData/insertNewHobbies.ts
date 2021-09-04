import connection from "../connection"
import { hobby } from "../../types"

const insertNewHobbies = async (
    hobbies: hobby[]

): Promise<any> => {
    let result: hobby[] = []

    for (let hobby of hobbies){
        const hasHobby: hobby[] = await connection("Hobbies")
            .select()
            .where({description: hobby.description})
        
        if (!hasHobby[0]) {
            await connection("Hobbies")
                .insert({description: hobby.description})
            result.push(hasHobby[0])
        }
    }

    return result
}

export default insertNewHobbies