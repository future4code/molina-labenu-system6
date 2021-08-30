import connection from "../connection";
import { specialty } from "../../types";

const selectSpecialtiesId = async (
    specialties: specialty[],
): Promise<any> => {
    const allSpeciatlies: specialty[] = await connection("Specialties")
        .select();
    
    let result: specialty[] | undefined = [];
    for (let specialty of specialties){
        const element: specialty | undefined = allSpeciatlies[0] 
        && allSpeciatlies.find((existSpecialty: specialty) => 
        existSpecialty.description === specialty.description);

        if (element) {
            result.push(element)
        };
    };
    
    return result;
};

export default selectSpecialtiesId;