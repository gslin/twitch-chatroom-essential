// ==UserScript==
// @name         Twitch Chatroom Essential
// @namespace    https://wiki.gslin.org/wiki/TwitchChatroomEssential
// @version      0.2018.0425
// @description  Show users with badge only.
// @author       Gea-Suan Lin <darkkiller@gmail.com>
// @match        https://www.twitch.tv/*
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let sheet = document.createElement('style');
    sheet.setAttribute('id', 'essential-style');
    sheet.innerHTML = '.notessential {display:none;visibility:hidden;}';
    document.getElementsByTagName('head')[0].appendChild(sheet);

    let ctx = document.getElementById('root');

    let ob = new window.MutationObserver(function(events){
        events.forEach(function(ev){
            ev.addedNodes.forEach(function(node){
                let el = jQuery(node);
                if (!el.hasClass('chat-line__message')) {
                    return;
                }
                if (0 === el.has('a[data-a-target="chat-badge"]').length) {
                    el.addClass('notessential');
                }
            });
        });
    });

    // TODO: Add element into the end of div.chat-input.tw-pd-b-2.tw-pd-x-2

    ob.observe(ctx, {
        childList: true,
        subtree: true,
    });
})();
