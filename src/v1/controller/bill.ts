import { BillDetails, BillItem, BillStatus, BillWithStudent, BillWithStudentAndSchool, FetchBillResponse, FetchBillSuccess, PosBillItem, PreBillItem } from "../interface/bill";
import { Fee } from "../interface/fee";
import { createBill, createBillItems, fetch_Bill_Student__Service, fetchAllBills, fetchBill, fetchBillItems, updateBill_confirm } from "../service/bill";
import { posSellUpdate_Inventory } from "./inventory";



export const createPOSBill = async (schoolId: number, studentId: number, staffId: number, items: PosBillItem[]) => {

    const totalAmount = items.reduce((sum, item): number => {
        return sum + (item.price * item.count);
    }, 0);
    const billId = await createBill(schoolId, studentId, staffId, totalAmount);
    const bill_items: any[] = []
    items.forEach((item) => {
        bill_items.push([billId, item.name, item.count, item.count * item.price])
    })
    posSellUpdate_Inventory(items)
    createBillItems(bill_items)
    return billId;
}

export const updateBillConfirmation = async (billId: number, transactionId: string, status: string) => {
    updateBill_confirm(billId, transactionId, status)
}

export const createAdmissionBill = async (schoolId: number, studentId: number, staffId: number, fee: Fee): Promise<number> => {
    const billId = await createBill(schoolId, studentId, staffId, fee.admission);
    const bill_items: any[] = [[billId, "Admission fee", 1, fee.admission]]
    createBillItems(bill_items)
    return billId;
}

export const fetch_Bill_Student__Controller = async (student_id: number): Promise<BillWithStudent[]> => {
    return await fetch_Bill_Student__Service(student_id)
}

export const getBills = async (schoolId: number): Promise<BillWithStudent[]> => {
    return await fetchAllBills(schoolId)
}

export const getBillById = async (billId: number, schoolId: number): Promise<FetchBillResponse> => {
    const bill: BillWithStudentAndSchool | null = await fetchBill(billId, schoolId)

    if (bill === null) {
        return { code: 404, data: "Bill not found" }
    } else {
        const items: BillItem[] = await fetchBillItems(billId)

        const d: BillDetails = {
            ...bill, items: items
        }
        const finalData: FetchBillSuccess = { code: 200, data: d }
        return finalData
    }
}