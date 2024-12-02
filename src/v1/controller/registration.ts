import { generatePassword, hashPassword } from "../../utils/password";
import { RegistrationSuccess, SchoolEnroll } from "../interface/registration";
import { schoolRegistration } from "../service/school";
import { staff_Account_Create_SMS_Service } from "../service/sms";
import { registerAdmin } from "../service/staff";



const enrollSchoolAndAdmin = async (data: SchoolEnroll): Promise<RegistrationSuccess> => {
    const password = generatePassword(6)
    const hashedPassword = await hashPassword(password)
    const schoolId = await schoolRegistration(data.sname, data.saddress, data.state, data.district)
    const adminId = await registerAdmin(schoolId, data.name, data.phone, hashedPassword)
    console.log(adminId, password)
    staff_Account_Create_SMS_Service(adminId, password, data.phone)
    return { id: adminId }
};

export { enrollSchoolAndAdmin };
