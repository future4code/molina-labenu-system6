import connection from "../connection"
import { teachSpecDependencies, specialty } from "../../types"

const insertSpecialtiesTeacherDependencies = async (
    specialties: specialty[],
    teacherId: number
): Promise<any> => {
    let result: teachSpecDependencies[] | undefined

    for ( let specialty of specialties ) {
        result = await connection("TeacherSpecialties_junction")
            .insert({
                teacher_id: teacherId,
                specialties_id: specialty.id
            })
    }
    return result
}

export default insertSpecialtiesTeacherDependencies