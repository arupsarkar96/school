import configuration, { ENV_TYPE } from "../config/serverconf"



export const account_Create_SMS_Service = async (id: string, password: string, phone: string) => {
    if (configuration.ENV === ENV_TYPE.PROD) {
        const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${configuration.SMS_API_KEY}&route=dlt&sender_id=MESANT&message=174793&variables_values=${id}|${password}&flash=0&numbers=${phone}`
        const network = await fetch(url)
        const body = await network.json()
        console.log(body)
    } else {
        console.log("Code works perfectly --- Skipping SMS Gateway Hit")
    }
}