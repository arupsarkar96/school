import { Fee } from "./fee";
import { Subject } from "./subject";

export interface Class {
    class_id: number,
    school_id: number,
    class_name: string
}


export interface ClassSubjectWithFees {
    subjects: Subject[],
    fee: Fee
}