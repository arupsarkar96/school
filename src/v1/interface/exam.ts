export interface Exam {
    exam_id: number
    exam_name: string,
    exam_status: string
}

export interface Mark {
    fm: string; // Full marks
    mo: string; // Marks obtained
    uid: number; // User ID
}

export interface ExamData {
    examId: number;
    sessionId: number;
    classId: number;
    subjectId: number;
    marks: Mark[];
}