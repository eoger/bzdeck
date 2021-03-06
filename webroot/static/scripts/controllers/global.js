/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

BzDeck.controllers.Global = function GlobalController () {
  this.on('BugModel:AnnotationUpdated', data => {
    if (data.type === 'unread') {
      this.toggle_unread();
    }
  }, true);
};

BzDeck.controllers.Global.prototype = Object.create(BzDeck.controllers.Base.prototype);
BzDeck.controllers.Global.prototype.constructor = BzDeck.controllers.Global;

BzDeck.controllers.Global.prototype.notifications = new Set();
BzDeck.controllers.Global.prototype.timers = new Map();

BzDeck.controllers.Global.prototype.init = function () {
  // This should be called after prefs are retrieved
  this.view = BzDeck.views.global = new BzDeck.views.Global();
};

BzDeck.controllers.Global.prototype.toggle_unread = function (loaded = false) {
  if (!BzDeck.controllers.homepage) {
    return;
  }

  let bugs = new Map([for (bug of BzDeck.collections.bugs.get_all().values()) if (bug.unread) [bug.id, bug]]),
      status = bugs.size > 1 ? `You have ${bugs.size} unread bugs` : 'You have 1 unread bug', // l10n
      extract = [for (bug of [...bugs.values()].slice(0, 3)) `${bug.id} - ${bug.summary}`].join('\n'),
      unread_num = [for (bug of BzDeck.controllers.homepage.data.bugs.values()) if (bug.unread) bug].length;

  // Update View
  this.view.toggle_unread([...bugs.values()], loaded, unread_num);

  // Select Inbox when the notification is clicked
  // this.show_notification(status, extract).then(event => BzDeck.router.navigate('/home/inbox'));
};

BzDeck.controllers.Global.prototype.show_notification = function (title, body) {
  if (BzDeck.prefs.get('notifications.show_desktop_notifications') === false) {
    return;
  }

  // Firefox OS requires a complete URL for the icon
  let icon = location.origin + '/static/images/logo/icon-128.png',
      notification = new Notification(title, { body, icon });

  this.notifications.add(notification);

  return new Promise(resolve => notification.addEventListener('click', event => resolve(event)));
};

BzDeck.controllers.Global.prototype.register_activity_handler = function () {
  // Match BMO's bug detail pages.
  // TODO: Implement a handler for attachments
  let re = /^https?:\/\/(?:bugzilla\.mozilla\.org\/show_bug\.cgi\?id=|bugzil\.la\/)(\d+)$/;

  // Not implemented yet on Firefox OS nor Firefox for Android
  if (typeof navigator.mozRegisterActivityHandler === 'function') {
    navigator.mozRegisterActivityHandler({
      name: 'view',
      filters: {
        type: 'url',
        url: {
          required: true,
          regexp: re
        }
      }
    });
  }

  if (typeof navigator.mozSetMessageHandler === 'function') {
    navigator.mozSetMessageHandler('activity', req => {
      let match = req.source.url.match(re);

      if (match) {
        BzDeck.router.navigate('/bug/' + match[1]);
      }
    });
  }
};
