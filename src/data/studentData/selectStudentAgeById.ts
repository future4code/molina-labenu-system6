import moment from "moment"
import { studentBirth, date } from "../../types"
import connection from "../connection"

const getStudentAgeById = async (
    numberStudentId: number 
): Promise<any> => {
    let result: number | [] = []

    const birth: studentBirth[] | [] = await connection("Student")
        .select("birthDate")
        .where({ id: numberStudentId })
    
    if (!birth[0]) {
        return result
    } else {
        const studentAgeFormatArray: string[] = moment(birth[0].birthDate,"YYYY-MM-DD")
            .format("DD/MM/YYYY").split("/")
        
        const studentAgeInNumbers: date = {
            day: Number(studentAgeFormatArray[0]),
            month: Number(studentAgeFormatArray[1]),
            year: Number(studentAgeFormatArray[2]) 
        }
        const actualDate: date = {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        }
        const yearDiff = actualDate.year - studentAgeInNumbers.year
        
        if (studentAgeInNumbers.month < actualDate.month){
            return result = yearDiff
        } else if (studentAgeInNumbers.month === actualDate.month){
            if (studentAgeInNumbers.day <= actualDate.day) {
                return result = yearDiff
            } else {
                return result = yearDiff - 1
            }
        } else {
            return result = yearDiff -1
        }
    }
}

export default getStudentAgeById