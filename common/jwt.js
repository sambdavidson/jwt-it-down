/**
 * @fileoverview JWT Class
 */

export class JWT {

    constructor(header, claims, hmac) {
        let parts = base64String.split('.');
        if (parts.length < 2) {
            throw 'JWT has too few parts';
        }

        this.joseHeader = JSON.parse(b64DecodeUnicode(parts[0]));
        this.body = JSON.parse(b64DecodeUnicode(parts[1]));
        
    }

    ToBase64String() {
        let hEnc = b64EncodeUnicode(JSON.stringify(this.joseHeader));
        let bEnc = b64EncodeUnicode(JSON.stringify(this.joseHeader))
    }

    static FromBase64Encoding(s) {
        let parts = base64String.split('.');
        let dec = (i) => JSON.parse(b64DecodeUnicode(parts[i]));
        let header = dec(0);
        switch(header['alg']) {
        case 'none', 'hs256':
            if(parts.length !== 3) {
                throw `JWT of alg ${header['alg']} is expected to have 3 parts but instead has ${parts.length}`;
            }
            return new JWT(header, dec(1), dec(2));
            break;
        case 'rsa1_5':
            

        }
        return new JWT(dec(0), dec(1));
    }
}

function b64EncodeUnicode(str) {
    // First we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
