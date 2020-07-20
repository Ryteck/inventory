const toJSON = (text: string): object => JSON.parse(text);

const toString = (obj: object): string => JSON.stringify(obj);

export default {toJSON, toString}
