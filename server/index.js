/**
 * @fileoverview Description of this file.
 */

const express = require('express');
const app = express();
const port = 3000;

const serverIssuer = "JWTItDown"

console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile('client/index.html', {root: __dirname + '/../'});
});
app.use('/client', express.static('client', {root: __dirname}));
app.use('/common', express.static('common', {root: __dirname}));

app.get('/new_jws', (req, res) => {
    console.log(req.body);
    res.status(200);
    res.send({
        "iss": serverIssuer,
        "sub": "todo",
        "iat": new Date(),
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function encodeJWTToBase64(JOSEHeader, claims) {
    
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
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