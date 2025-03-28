import { Request, Response } from "express"
import { CartItems, create_cart_items__service, create_pos_cart__service, delete_cart_items__service, delete_pos_cart__service, fetch_pos_cart__service, fetch_pos_cart_items__service, update_cart_items__service } from "../services/pos-service";
import { fetch_student__service } from "../services/student-service";
import { create_bill__service, create_bulk_bill_items__service } from "../services/bill-service";
import { sell_update_inventory__service } from "../services/inventory-service";



export const checkOutCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const cartId: number = parseInt(req.params.id);
        const staffId: string = req.headers["x-id"] as string;

        // Fetch cart items and cart details in parallel (using Promise.all for concurrent fetching)
        const [items, cart] = await Promise.all([
            fetch_pos_cart_items__service(cartId),
            fetch_pos_cart__service(cartId),
        ]);

        // Calculate totalAmount
        const totalAmount = items.reduce((sum, item): number => sum + (item.product_price * item.product_quantity), 0);

        // Create bill
        const today = new Date().toISOString().split('T')[0];
        const billId = await create_bill__service(cart?.school_id!!, cart?.student_id!!, staffId, totalAmount, 0, today);

        // Prepare bulk insert for bill items
        const bill_items: any[] = items.map((item) => [
            billId,
            item.product_id,
            item.product_name,
            item.product_quantity,
            item.product_price
        ]);

        // Bulk insert all bill items at once
        await create_bulk_bill_items__service(bill_items);

        // Update inventory in parallel for all items
        await Promise.all(
            items.map(async (item) => {
                await sell_update_inventory__service(item.product_id, item.product_quantity);
            })
        );

        // Delete the cart after everything is done
        await delete_pos_cart__service(cartId);

        // Send response with the invoice id
        res.status(200).json({
            invoice_id: billId
        });
    } catch (error) {
        console.error('Error checking out cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




export const updateItemInCart = async (req: Request, res: Response): Promise<void> => {
    const cartId: number = parseInt(req.params.id)
    const body: CartItems = req.body

    update_cart_items__service(body)

    res.status(200).json({
        status: "success",
        message: "Product updated in cart"
    })

}

export const deleteItemInCart = async (req: Request, res: Response): Promise<void> => {
    const cartId: number = parseInt(req.params.id)
    const product: number = parseInt(req.params.product)

    delete_cart_items__service(cartId, product)

    res.status(200).json({
        status: "success",
        message: "Product deleted from cart"
    })

}

export const createItemInCart = async (req: Request, res: Response): Promise<void> => {
    const cartId: number = parseInt(req.params.id)
    const body: CartItems = req.body

    create_cart_items__service(body)

    res.status(201).json({
        status: "success",
        message: "Product added to cart"
    })

}

export const fetchCart = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const cartId: number = parseInt(req.params.id)
    const cartItems = await fetch_pos_cart_items__service(cartId)

    res.status(200).json({
        items: cartItems
    })
}

export const createPosCart = async (req: Request, res: Response): Promise<void> => {
    const schoolId: string = req.headers["x-school"] as string;
    const staffId: string = req.headers["x-id"] as string;
    const { student_id } = req.body

    if (!student_id) {
        res.status(400).json({ status: "error", message: "Student ID required" })
        return
    }

    const student = await fetch_student__service(student_id)

    if (student == null) {
        res.status(400).json({ status: "error", message: "Student ID not found" })
        return
    }

    const createCart = await create_pos_cart__service(student_id, schoolId)

    if (createCart == null) {
        res.status(400).json({ status: "error", message: "Try after sometimes" })
    } else {
        res.status(201).json({ cart_id: createCart, student_name: student?.student_name, student_photo: student?.photo })
    }
}