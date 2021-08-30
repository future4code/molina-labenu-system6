import connection from "../connection"

const selectStudentsByHobby = async(
    description: string | undefined
): Promise<any> => {
    let result: Array<number | string> | undefined = []

    const hobbyId: any[] | undefined = await connection.raw(`
        SELECT id
        FROM Hobbies
        WHERE description = '${description}'
    `)
    if(hobbyId !== undefined) {
        result = await connection.raw(`
            SELECT Student.id AS "id", name
            FROM Student
            INNER JOIN StudentHobbies_junction
            ON student_id = Student.id
            WHERE hobbies_id = '${hobbyId[0][0].id}'
        `)

    } else {
        result = undefined
    }
    if ( result !== undefined ) {
        return result[0]
    } else {
        return result
    }
}

export default selectStudentsByHobby