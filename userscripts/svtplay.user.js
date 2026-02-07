// ==UserScript==
// @name         SVT Nyheter
// @namespace    https://hekestam.ekestam.net
// @author       hekestam
// @version      2026-02-07.01
// @description  Autofocus on play button
// @match        https://www.svtplay.se/aktuellt
// @match        https://www.svtplay.se/rapport
// @match        https://www.svtplay.se/lokala-nyheter-stockholm
// @icon         https://www.google.com/s2/favicons?sz=64&domain=svtplay.se
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let el = document.querySelector('[data-rt="top-area-play-button"]');
    el.focus();
})();