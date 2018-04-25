// ==UserScript==
// @name         Twitch Chatroom Essential
// @namespace    https://wiki.gslin.org/wiki/TwitchChatroomEssential
// @version      0.2018.0426
// @description  Show users with badge only.
// @author       Gea-Suan Lin <darkkiller@gmail.com>
// @match        https://www.twitch.tv/*
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
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

    let opt_done = false;
    let opt = document.createElement('div');
    opt.setAttribute('id', 'toggle_essential');
    opt.innerHTML = '<input id="toggle_essential_checkbox" type="checkbox"> <label for="toggle_essential_checkbox">Show essential messages only</label>';
    jQuery('#toggle_essential_checkbox', opt).on('change', function(){
        if (this.checked) {
            toggle_css.innerHTML = '.notessential {display:none;visibility:hidden;}';
        } else {
            toggle_css.innerHTML = '';
        }
    });

    let ctx = document.getElementById('root');

    let ob = new window.MutationObserver(function(events){
        if (!opt_done) {
            let el = jQuery('div.chat-input.tw-pd-b-2.tw-pd-x-2');
            if (el.length) {
                opt_done = true;
                el.append(opt);
            }
        }

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

    ob.observe(ctx, {
        childList: true,
        subtree: true,
    });
})();
