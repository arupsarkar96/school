import { generatePassword, hashPassword } from "../../utils/password";
import { Staff } from "../interface/staff";
import { staff_Account_Create_SMS_Service } from "../service/sms";
import { getAllStaffsService, insertStaffService } from "../service/staff";



export const insertStaffController = async (schoolId: number, data: Staff): Promise<number> => {
    const password = generatePassword(6)
    const hashedPassword = await hashPassword(password)
    data.staff_password = hashedPassword
    const staffId = await insertStaffService(schoolId, data)
    staff_Account_Create_SMS_Service(staffId, password, data.staff_phone)
    console.log(staffId, password)
    return staffId
}


export const getAllStaffController = async (schoolId: number): Promise<Staff[]> => {
    return await getAllStaffsService(schoolId)
}