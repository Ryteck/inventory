import {JsonWebTokenError, NotBeforeError, TokenExpiredError} from "jsonwebtoken";
import TokenInterface from "./tokenInterface";

export default interface TranslateTokenInterface {
    error: JsonWebTokenError | NotBeforeError | TokenExpiredError | null,
    data: object | undefined | TokenInterface
}