import { RowDataPacket } from "mysql2/promise";
import IceId from "iceid"
import configuration from "../../config"
import pool from "../../db";
import { PaymentEnroll } from "../interface/payment";


const key = new IceId(configuration.DATACENTER, configuration.MACHINE_ID)

export const createPayment = async (schoolId: number, data: PaymentEnroll): Promise<string> => {
    const id: string = key.generate()

    const connection = await pool.getConnection();
    const sql = 'INSERT INTO transactions (`transaction_id`, `school_id`, `transaction_amount`, `transaction_type`, `transaction_description`, `transaction_mode`) VALUES (?,?,?,?,?,?)';
    const [rows] = await connection.query(sql, [id, schoolId, data.amount, data.type, data.description, data.mode]);
    connection.release();
    return id;
}