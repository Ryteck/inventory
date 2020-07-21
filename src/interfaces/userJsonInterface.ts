export default interface UserJsonInterface {
    users: [{
        id: number,
        name: string,
        username?: string,
        password?: string,
        disable?: true
    }]
}