import { PosBillItem } from "../interface/bill";
import { Inventory } from "../interface/inventory";
import { fetchInventoriesService, insert_inventory__service, sellUpdate__Inventory, update_inventory__service } from "../service/inventory"

export const fetchInventories = async (schoolId: number): Promise<Inventory[]> => {
    const inventories: Inventory[] = await fetchInventoriesService(schoolId)
    return inventories;
}

export const posSellUpdate_Inventory = async (items: PosBillItem[]) => {
    items.forEach(item => {
        sellUpdate__Inventory(item.id, item.count)
    });
}

export const update_inventory__controller = async (data: Inventory) => {
    update_inventory__service(data)
}

export const insert_inventory__Controller = async (data: Inventory) => {
    insert_inventory__service(data)
}