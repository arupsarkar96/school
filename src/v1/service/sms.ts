import configuration from "../../config"


export const staff_Account_Create_SMS_Service = async (id: number, password: string, phone: string) => {
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${configuration.SMS_API_KEY}&route=dlt&sender_id=MESANT&message=174793&variables_values=${id}|${password}&flash=0&numbers=${phone}`
    const network = await fetch(url)
    const body = await network.json()
    console.log(body)
}