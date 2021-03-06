/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

BzDeck.controllers.SettingsPage = function SettingsPageController () {
  let tab_id = history.state ? history.state.tab_id : undefined,
      account = BzDeck.models.account,
      prefs = new Map();

  for (let [name, value] of Iterator(BzDeck.config.prefs)) {
    value.user = BzDeck.prefs.get(name);
    prefs.set(name, value);
  }

  BzDeck.views.toolbar.open_tab({
    page_category: 'settings',
    page_constructor: BzDeck.views.SettingsPage,
    page_constructor_args: [tab_id, prefs],
    tab_label: 'Settings',
  }, this);

  this.on('V:PrefValueChanged', data => {
    let { name, value } = data;

    BzDeck.prefs.set(name, value);

    if (name === 'ui.theme.selected') {
      this.helpers.theme.selected = value;
    }

    if (name === 'ui.date.timezone') {
      this.helpers.datetime.options.timezone = value;
    }

    if (name === 'ui.date.relative') {
      this.helpers.datetime.options.relative = value
    }

    if (name === 'notifications.show_desktop_notifications') {
      if (value === true && Notification.permission === 'default') {
        this.helpers.app.auth_notification();
      }
    }
  });
};

BzDeck.controllers.SettingsPage.route = '/settings';

BzDeck.controllers.SettingsPage.prototype = Object.create(BzDeck.controllers.Base.prototype);
BzDeck.controllers.SettingsPage.prototype.constructor = BzDeck.controllers.SettingsPage;
