export default interface InventoryJsonInterface {
    items: [{
        id: number,
        name: string,
        userId: number,
        when: string,
        quantity: number
    }]
}