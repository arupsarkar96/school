import { comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/token";
import { StaffLogin, StaffLoginResponse } from "../interface/login";
import { Staff, StaffWithSchool } from "../interface/staff";
import { getStaffData } from "../service/staff";


export const loginStaff = async (data: StaffLogin): Promise<StaffLoginResponse> => {
    const staffdata: StaffWithSchool | null = await getStaffData(data.id)

    if (staffdata === null) {
        return { code: 400, data: "Oops! We couldn't find a staff member with that ID." }
    } else {
        const match = await comparePassword(data.password, staffdata.staff_password)
        if (!match) {
            return { code: 400, data: "The password you entered is incorrect !" }
        } else {
            const token = generateToken({ id: staffdata.staff_id, role: staffdata.role, school: staffdata.school_id }, "1d")
            return { code: 200, data: { id: staffdata.staff_id, name: staffdata.staff_name, image: staffdata.staff_image, role: staffdata.role, token: token, school: staffdata.school_name } }
        }
    }
}