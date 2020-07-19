import crypto from 'crypto'

const encrypt = (text: string): string => {
    let element = text
    for (let index = 0; index < 10; index++){
        element = crypto
            .createHash('sha256')
            .update(element)
            .digest('hex')
    }
    return element
}

const compare = (text: string, hash: string) => (encrypt(text) === hash)

export default {encrypt, compare}
