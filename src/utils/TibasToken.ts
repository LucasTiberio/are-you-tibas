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
        const decryptedValueObject = JSON.parse(valueBase64Decoded);
        return decryptedValueObject;
    }

    public encrypt(valueToEncrypt?: any) {
        if (!this.value && !valueToEncrypt) return ''

        const value = valueToEncrypt || this.value || ''
        const valueStringified = JSON.stringify(value);
        const encryptedInBase64 = btoa(valueStringified)

        return encryptedInBase64
    }

    public generate(data: Record<string, any>): string {
        const encrypted = this.encrypt(data);
        return encrypted
    }
}

export default TibasToken