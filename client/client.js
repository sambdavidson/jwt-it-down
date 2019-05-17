/* JWT it down - samueldavidson@google.com */
import { JWT } from './jwt.js';

let savedJWTBase64 = '';
let SetJWT = (jwt)=>{}; // Update after load

window.addEventListener('load', function() {
    bootstrapLoginForm();
    bootstrapYourJWT();
    bootstrapActions();
    bootstrapServerInfo();
});

function bootstrapLoginForm() {
    let form = document.getElementById('newJWTForm');
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
        console.log('Login: ', JSON.stringify(reqBody));
    })
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

function bootstrapYourJWT() {
    let jwtBase64Pre = document.getElementById('jwtBase64');
    let jwtJSONPre = document.getElementById('jwtJSON');
    let jwtSaveButton = document.getElementById('jwtSave');

    SetJWT = (JWTBase64) => {
        savedJWTBase64 = JWTBase64
        let json = JSON.parse(b64DecodeUnicode(JWTBase64));
        jwtBase64Pre.innerText = JWTBase64;
        jwtJSONPre.innerText = JSON.stringify(json, null, 4);
    };

    jwtSaveButton.addEventListener('click', (e) => {
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