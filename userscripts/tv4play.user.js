// ==UserScript==
// @name         TV4 Nyheterna
// @namespace    https://hekestam.ekestam.net
// @author       hekestam
// @version      2026-02-17.05
// @description  Autofocus on play button
// @match        https://www.tv4play.se/nyheter
// @match        https://www.tv4play.se/program/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tv4play.se
// @grant        none
// @run-at       document-end
// ==/UserScript==

const delay = ms => new Promise(res => setTimeout(res, ms));

const yourFunction = async () => {
    await delay(1000); // Wait for relevant part of DOM to be loaded
    console.log('hejhej')
    //let el = document.querySelector('[nwbuttonvariant="primary"]');
    //el.focus();
    let foundSomething = false;
    while (!foundSomething) {
        await delay(100); // Wait for relevant part of DOM to be loaded
        for (const a of document.querySelectorAll("a")) {
            if (a.textContent.includes("Titta nu")) {
                 console.log(a.textContent);
                 //a.focus();
                 foundSomething = true;
                 break;
             }
        }
    }
    await delay(500);
    for (const a of document.querySelectorAll("a")) {
        if (a.textContent.includes("Titta nu")) {
            console.log(a.textContent);
            a.focus();
            foundSomething = true;
            break;
        }
    }
};

(function() {
    'use strict';
    yourFunction();
})();


function callback(mutationList) {
    console.log('TaDA!!')
}

const userListElement = document.querySelector('[nwbuttonvariant="primary"]');

const observer = new MutationObserver(callback);
//observer.observe(document, {
//  attributeFilter: ['nwbuttonvariant="primary"'],
//  subtree: true,
//  childList: true,
//});