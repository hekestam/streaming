// ==UserScript==
// @name         SVT Play Live
// @namespace    https://hekestam.ekestam.net
// @author       hekestam
// @version      2026-02-17.01
// @description  Focus on content for SVT Play live channels
// @match        https://www.svtplay.se/kanaler/svt1*
// @match        https://www.svtplay.se/kanaler/svt2*
// @match        https://www.svtplay.se/kanaler/svtbarn*
// @match        https://www.svtplay.se/kanaler/kunskapskanalen*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=svtplay.se
// @grant        none
// @run-at       document-end
// ==/UserScript==

const delay = ms => new Promise(res => setTimeout(res, ms));

const yourFunction = async () => {
    console.log('hejhej')
    let el = document.getElementById('play_main-content');
    el.style.cssText += 'margin-left:15px;margin-right:15px';

    await delay(200); // Wait for relevant part of DOM to be loaded
    let el2 = document.getElementsByTagName('video')[0];
    el2.scrollIntoView()
};

(function() {
    'use strict';
    yourFunction();
})();

