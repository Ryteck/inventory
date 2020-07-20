import {JsonWebTokenError, NotBeforeError, sign, TokenExpiredError, verify} from 'jsonwebtoken'

import TokenInterface from "../interfaces/tokenInterface";
import TranslateTokenInterface from "../interfaces/translateTokenInterface";

const ONEDAY = 86400;
const HASH = 'bue';

const generateToken = (data: TokenInterface): string => sign(data, HASH, {expiresIn: ONEDAY});

const translateToken = (token: string): TranslateTokenInterface | void => verify(token, HASH, (error, data) => {
    return {error, data}
})

export default {generateToken, translateToken}
