// ==UserScript==
// @name         Twitch Chatroom Essential
// @namespace    https://wiki.gslin.org/wiki/TwitchChatroomEssential
// @version      0.20240716.1
// @description  Show users with essential badge(s) only.
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

  // Install checkbox.
  let ob = new window.MutationObserver(events => {
    if (null === document.getElementById('toggle_essential')) {
      let el = document.querySelector('div.chat-input__buttons-container');
      if (el) {
        el.insertAdjacentElement('afterend', opt);
        console.debug('toggle_essential installed');
      }
    }

    events.forEach(ev => {
      ev.addedNodes.forEach(node => {
        if (!node.classList || !node.classList.contains('chat-line__message')) {
          return;
        }

        // Add .notessential class.
        let n = 0;
        for (let img of node.querySelectorAll('.chat-badge')) {
          const al = img.getAttribute('aria-label');
          if ('GLHF Pledge badge' === al) {
            continue;
          }
          if ('GlitchCon 2020 badge' === al) {
            continue;
          }
          if ('Twitch Recap 2023 badge' === al) {
            continue;
          }
          if ('Watching without audio badge' === al) {
            continue;
          }
          if ('Watching without video badge' === al) {
            continue;
          }

          n++;
        }

        if (0 === n) {
          node.classList.add('notessential');
        }
      });
    });
  });

  ob.observe(document.getElementById('root'), {
    childList: true,
    subtree: true,
  });
})();
