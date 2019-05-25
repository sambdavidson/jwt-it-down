/**
 * @fileoverview Initializes the buttons that switch between creating a JWS and JWE.
 */

 export function pageSwitcherInit() {
    console.log('Page Switcher Init');
    let jwsSection = document.getElementById('jwsSection');
    let jwsButton = document.getElementById('jwsEnableButton');

    let jweSection = document.getElementById('jweSection');
    let jweButton = document.getElementById('jweEnableButton');

    jwsButton.onclick = () => {
        jwsButton.disabled = true;
        jwsSection.hidden = false;
        jweButton.disabled = false;
        jweSection.hidden = true;
    }
    jweButton.onclick = () => {
        jweButton.disabled = true;
        jweSection.hidden = false;
        jwsButton.disabled = false;
        jwsSection.hidden = true;
    }

    jwsButton.click(); // Start the page on JWS.
 }