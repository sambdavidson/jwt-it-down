import { JWS } from "/common/jws.js";

/**
 * @fileoverview Sets up all the UI/JS stuff for the JWS flow.
 */

let myJWS = null;
let SetJWS = (jws)=>{}; // Update after load

export function jwsUIInit() {
    console.log('JWS UI Init');
    initNewJWS();
    initJWSDisplay();
    initServerInfo();
}

function initNewJWS() {
    let form = document.getElementById('newJWSForm');
    let username = document.getElementById('username');
    let claims = document.getElementById('claims');
    let ttl = document.getElementById('ttl');
    

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let reqBody = {
            'username': username.value,
            'claims': claims.value,
            'ttl': ttl.value,
            'alg': getCheckedAlgorithmValue(),
        };
        console.log('New JWS: ', JSON.stringify(reqBody));
        // Temp Code
        let tmpJWS = 'eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
        SetJWS(JWS.FromBase64Encoding(tmpJWS));
    })
}

function initJWSDisplay() {
    let jwsJOSEHeader = document.getElementById('jwsJOSEHeader');
    let jwsClaims = document.getElementById('jwsClaims');
    let jwsSignature = document.getElementById('jwsSignature');
    let jwsBase64 = document.getElementById('jwsBase64');
    let jwsSaveButton = document.getElementById('jwsSave');

    SetJWS = (jws) => {
        if(!(jws instanceof JWS)) {
            throw "Passed jws is not an instace of a JWS class.";
        }
        let s = (o) => JSON.stringify(o, null, 4);
        myJWS = jws
        jwsJOSEHeader.innerText = s(jws.joseHeader);
        jwsClaims.innerText = s(jws.payload);
        jwsSignature.innerText = jws.encSignature;
        jwsBase64.innerText = jws.ToBase64String();
    };

    jwsSaveButton.addEventListener('click', (e) => {
        myJWS.joseHeader = JSON.parse(jwsJOSEHeader.innerText);
        myJWS.payload = JSON.parse(jwsClaims.innerText);
        myJWS.encSignature = jwsSignature.innerText;
        jwsBase64.innerText = myJWS.ToBase64String();
    });
}

function initServerInfo() {
    let timePre = document.getElementById('time');

    let updateTime = () => {
        timePre.innerText = Math.floor((new Date()) / 1000);
        setTimeout(updateTime, 1000);
    }
    updateTime();
}

function getCheckedAlgorithmValue() {
    let radios = document.getElementsByName('alg');
    for(let i = 0; i < radios.length; i++ ) {
        if( radios[i].checked ) {
            return radios[i].value;
        }
    }
    return null;
}