import {JsonWebTokenError, NotBeforeError, sign, TokenExpiredError, verify} from 'jsonwebtoken'

const ONEDAY = 86400;
const HASH = 'bue';

interface TokenInterface {
    secret: {
        id: string
    }
}

interface TranslateTokenInterface {
    error: JsonWebTokenError | NotBeforeError | TokenExpiredError | null,
    data: object | undefined | TokenInterface
}

const generateToken = (data: TokenInterface): string => sign(data, HASH, {expiresIn: ONEDAY});

const translateToken = (token: string): TranslateTokenInterface | void => verify(token, HASH, (error, data) => {
    return {error, data}
})

export default {generateToken, translateToken}