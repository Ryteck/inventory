export default interface UserJsonInterface {
    userObject: { id: number; name: string; username?: string | undefined; password?: string | undefined; disable?: true | undefined; }[];
    users: [{
        id: number,
        name: string,
        username?: string,
        password?: string,
        disable?: true
    }]
}