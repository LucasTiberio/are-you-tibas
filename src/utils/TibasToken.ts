import CryptoJS from 'crypto-js'
import { AES_KEY } from './commons';

export class TibasToken {
    private value?: string

    constructor(token?: string) {
        this.value = token;
    }

    public decrypt() {
        if (!this.value) return ''

        const valueBase64Decoded = atob(this.value.toString())

        const bytes  = CryptoJS.AES.decrypt(valueBase64Decoded, AES_KEY);
        const decryptedValueStringified = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedValueObject = JSON.parse(decryptedValueStringified);
        return decryptedValueObject;
    }

    public encrypt(valueToEncrypt?: any) {
        if (!this.value && !valueToEncrypt) return ''

        const value = valueToEncrypt || this.value || ''
        const valueStringified = JSON.stringify(value);
        const encryptedValue = CryptoJS.AES.encrypt(valueStringified, AES_KEY);

        const encryptedInBase64 = btoa(encryptedValue.toString())

        return encryptedInBase64
    }

    public generate(data: Record<string, any>): string {
        const encrypted = this.encrypt(data);
        return encrypted
    }
}

export default TibasToken