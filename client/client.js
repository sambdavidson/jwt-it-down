/* JWT it down - samueldavidson@google.com */

import { pageSwitcherInit } from './page_switcher.js';
import { jwsUIInit } from './jws_ui.js';
import { jweUIInit } from './jwe_ui.js';

window.addEventListener('load', function() {
    pageSwitcherInit();
    jwsUIInit();
    jweUIInit();
});