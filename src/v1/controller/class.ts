import { Class, ClassSubjectWithFees } from "../interface/class";
import { Fee } from "../interface/fee";
import { Subject } from "../interface/subject";
import { getClasses, insertClass } from "../service/class";
import { defaultFeeGenerate, getFee } from "../service/fee";
import { getClassSubject } from "../service/subject";


export const getClassCompleteDetails = async (schoolId: number, classId: number): Promise<ClassSubjectWithFees> => {
    const subjects: Subject[] = await getClassSubject(schoolId, classId)
    const fee: Fee = await getFee(classId)
    return { subjects: subjects, fee: fee }
}

export const fetch_Class__Controller = async (schoolId: number): Promise<Class[]> => {
    return await getClasses(schoolId)
}

export const createClass = async (schoolId: number, name: string): Promise<Class> => {
    const id: number = await insertClass(schoolId, name)
    defaultFeeGenerate(id)
    const _class: Class = { class_id: id, class_name: name, school_id: schoolId }
    return _class
}