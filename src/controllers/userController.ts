import files from './../settings/files.json';
import UserJsonInterface from "../interfaces/userJsonInterface";
import dataManager from "../services/dataManager";
import jsonConvert from "../helpers/jsonConvert";

const {path} = files[1];

const index = (): UserJsonInterface => <UserJsonInterface>jsonConvert.toJSON(dataManager.read(path) as string)

const show = (id: number) => {
    const {users} = index()
    return users.find(value => value.id === id)
}

const create = (name: string, username: string, password: string) => {
    const usersObject = index()
    const {users} = usersObject
    const id = users.length
    usersObject.users.push({id, name, username, password})
    dataManager.write(path, jsonConvert.toString(usersObject))
}

const update = (id: number, name: string, username: string, password: string) => {
    const userObject = index()
    const {users} = userObject
    const parseUsers = users.map(value => {
        if (value.id === id) {
            const parseValue = value
            parseValue.name = name
            parseValue.username = username
            parseValue.password = password
            return parseValue
        } else {
            return value
        }
    })
    dataManager.write(path, jsonConvert.toString({users: parseUsers}))
}

const destroy = (id: number) => {
    const userObject = index()
    const {users} = userObject
    const parseUsers = users.map(value => {
        if (value.id === id) {
            const parseValue = value
            parseValue.disable = true
            return parseValue
        } else {
            return value
        }
    })
    dataManager.write(path, jsonConvert.toString({users: parseUsers}))
}

export default {index, show, create, update, destroy}