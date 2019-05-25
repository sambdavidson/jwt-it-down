/**
 * @fileoverview Description of this file.
 */
import { base64EncodeUnicode, base64DecodeUnicode } from './base_64.js';

export class JWS {

    constructor(joseHeader, payload, encSignature) {
        this.joseHeader = joseHeader;
        this.payload = payload;
        this.encSignature = encSignature;
    }

    ToBase64String() {
        let enc = (o) => base64EncodeUnicode(JSON.stringify(o));
        return [
            enc(this.joseHeader),
            enc(this.payload),
            this.encSignature
        ].join('.');
    }

    static FromBase64Encoding(b64String) {
        let parts = b64String.split('.');
        let dec = (i) => JSON.parse(base64DecodeUnicode(parts[i]));
        if(parts.length !== 3) {
            throw `JWSs are expected to have 3 parts but instead it has ${parts.length}`;
        }
        return new JWS(dec(0), dec(1), parts[2]);
    }
}