/* JWT it down - samueldavidson@google.com */

let savedJWTBase64 = "";
let SetJWT = (jwt)=>{}; // Update after load

window.addEventListener("load", function() {
    bootstrapLoginForm();
    bootstrapYourJWT();
    bootstrapActions();
    bootstrapServerInfo();
});

function bootstrapLoginForm() {
    let form = document.getElementById("newJWTForm");
    let username = document.getElementById("username");
    let claims = document.getElementById("claims");
    let ttl = document.getElementById("ttl");
    let hmac = document.getElementById("hmac");
    let enc = document.getElementById("enc");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let reqBody = {
            "username": username.value,
            "claims": claims.value,
            "ttl": ttl.value,
            "hmac": hmac.checked,
            "enc": enc.checked
        };
        console.log('Login: ', JSON.stringify(reqBody));
        SetJWT('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM1NiJ9'); // TODO replace with response
    })
}

function bootstrapYourJWT() {
    let jwtBase64Pre = document.getElementById("jwtBase64");
    let jwtJSONPre = document.getElementById("jwtJSON");
    let jwtSaveButton = document.getElementById("jwtSave");

    SetJWT = (JWTBase64) => {
        savedJWTBase64 = JWTBase64
        let json = JSON.parse(b64DecodeUnicode(JWTBase64));
        jwtBase64Pre.innerText = JWTBase64;
        jwtJSONPre.innerText = JSON.stringify(json, null, 4);
    };

    jwtSaveButton.addEventListener("click", (e) => {
        let s = JSON.stringify(JSON.parse(jwtJSONPre.textContent));
        SetJWT(b64EncodeUnicode(s));
    });
}

function bootstrapActions() {

}

function bootstrapServerInfo() {
    let timePre = document.getElementById('time');

    let updateTime = () => {
        timePre.innerText = Math.floor((new Date()) / 1000);
        setTimeout(updateTime, 1000);
    }
    updateTime();
}

function JWT(base64String) {
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

    let parts = base64String.split('.');
    if (parts.length < 2) {
        throw 'JWT has too few parts';
    }

    this.JOSEHeader = JSON.parse(b64DecodeUnicode(parts[0]));
    this.body = JSON.parse(b64DecodeUnicode(parts[1]));
    this.base64 = base64String;

}