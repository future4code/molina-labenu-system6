export type date = {
   day: number,
   month: number,
   year: number
}

export type student = {
   id: number,
   name: string,
   email: string,
   birthDate: string
};

export type studentBirth = {
   birthDate: string
}

export type teacher = {
   id: number,
   name: string,
   email: string,
   birthDate: string
};

export type classes = {
   id: number,
   name: string,
   startDate: string,
   endDate: string,
   module: string,
   period?: string
}

export type hobby = {
   id: number,
   description: string
};

export type specialty = {
   id: number,
   description: string
};

export type studHobDependencies = {
   student_id: number,
   hobbies_id: number
};

export type teachSpecDependencies = {
   teacher_id: number,
   specialties_id: number
};

export type classStudDependencies = {
   class_id: number,
   student_id: number
};

export type classTeachDependencies = {
   class_id: number,
   teacher_id: number
};