
export interface StaffLogin {
    id: string | number,
    password: string
}

interface StaffLoginData {
    id: number,
    name: string,
    image: string | null
    token: string,
    role: string,
    school: string
}

interface StaffLoginSuccess {
    code: 200,
    data: StaffLoginData;
}

interface StaffLoginError {
    code: 400,
    data: string;
}

// Union type for the return value
export type StaffLoginResponse = StaffLoginSuccess | StaffLoginError;