// ==UserScript==
// @name         TV4 Nyheterna
// @namespace    https://hekestam.ekestam.net
// @author       hekestam
// @version      2026-02-07.02
// @description  Autofocus on play button
// @match        https://www.tv4play.se/nyheter
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tv4play.se
// @grant        none
// @run-at       document-end
// ==/UserScript==

const delay = ms => new Promise(res => setTimeout(res, ms));

const yourFunction = async () => {
    await delay(1500); // Wait for relevant part of DOM to be loaded
    console.log('hejhej')
    let el = document.querySelector('[nwbuttonvariant="primary"]');
    el.focus();
};

(function() {
    'use strict';
    yourFunction();
})();

