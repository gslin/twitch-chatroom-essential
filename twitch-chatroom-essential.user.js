// ==UserScript==
// @name         Twitch Chatroom Essential
// @namespace    https://wiki.gslin.org/wiki/TwitchChatroomEssential
// @version      0.20190427.0
// @description  Show users with badge only.
// @author       Gea-Suan Lin <darkkiller@gmail.com>
// @match        https://www.twitch.tv/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let toggle_css = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(toggle_css);

    let sheet = document.createElement('style');
    sheet.innerHTML = '#toggle_essential {padding-left:0.5em;width: 100%;}\n#toggle_essential input {vertical-align: middle;}';
    document.getElementsByTagName('head')[0].appendChild(sheet);

    let opt = document.createElement('div');
    opt.setAttribute('id', 'toggle_essential');
    opt.innerHTML = '<input id="toggle_essential_checkbox" type="checkbox"> <label for="toggle_essential_checkbox">Show essential messages only</label>';
    opt.querySelector('#toggle_essential_checkbox').addEventListener('change', function() {
        if (this.checked) {
            toggle_css.innerHTML = '.notessential {display:none;visibility:hidden;}';
        } else {
            toggle_css.innerHTML = '';
        }
    });

    let ctx = document.getElementById('root');

    let ob = new window.MutationObserver(events => {
        if (null === document.getElementById('toggle_essential')) {
            let el = document.querySelector('div.chat-input.tw-pd-b-2.tw-pd-x-2');
            if (el) {
                el.appendChild(opt);
            }
        }

        events.forEach(ev => {
            ev.addedNodes.forEach(node => {
                if (!node.classList.contains('chat-line__message')) {
                    return;
                }

                if (null === node.querySelector('.chat-badge')) {
                    node.classList.add('notessential');
                }
            });
        });
    });

    ob.observe(ctx, {
        childList: true,
        subtree: true,
    });
})();
