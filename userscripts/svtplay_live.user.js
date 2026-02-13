// ==UserScript==
// @name         SVT Play Live
// @namespace    https://hekestam.ekestam.net
// @author       hekestam
// @version      2026-02-13.05
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
    await delay(1750); // Wait for relevant part of DOM to be loaded
    console.log('hejhej')
    let el = document.getElementById('play_main-content');
    el.style.cssText += 'margin-left:15px;margin-right:15px';

    let el2 = document.querySelector('[data-rt="video-player-channels"]');
    el2.scrollIntoView()
};

(function() {
    'use strict';
    yourFunction();
})();

