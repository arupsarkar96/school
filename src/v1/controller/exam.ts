import { Exam, ExamData } from "../interface/exam";
import { getActiveExamService, getAllExamService, insertExamService, insertMarksData, updateExamStatusService } from "../service/exam";



export const insertMarksController = (data: ExamData) => {
    insertMarksData(data)
}

export const updateExamStatus = (schoolId: number, examId: string | number, status: boolean) => {
    updateExamStatusService(schoolId, examId, status)
}


export const insertExamController = async (schoolId: number, examName: string): Promise<number> => {
    const examId = await insertExamService(schoolId, examName)
    return examId
}

export const getActiveExams = async (schoolId: number): Promise<Exam[]> => {
    return await getActiveExamService(schoolId)
}

export const getAllExams = async (schoolId: number): Promise<Exam[]> => {
    return await getAllExamService(schoolId)
}