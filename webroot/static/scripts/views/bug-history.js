/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

BzDeck.views.BugHistory = function BugHistoryView (view_id, $container) {
  this.id = view_id;
  this.history = [];

  this.$container = $container;
  this.$tbody = this.$container.querySelector('tbody');

  // Remove the table rows
  this.$tbody.innerHTML = '';
};

BzDeck.views.BugHistory.prototype = Object.create(BzDeck.views.Base.prototype);
BzDeck.views.BugHistory.prototype.constructor = BzDeck.views.BugHistory;

BzDeck.views.BugHistory.prototype.render = function (history) {
  let conf_field = BzDeck.models.server.data.config.field,
      $row = this.get_template('details-change');

  for (let hist of history) {
    this.history.push(hist);

    for (let [i, change] of hist.changes.entries()) {
      let { field_name, added, removed } = change,
          $_row = $row.cloneNode(true),
          $cell = field => $_row.querySelector(`[data-field="${field}"]`);

      if (i === 0) {
        $cell('who').innerHTML = hist.who.replace('@', '&#8203;@');
        $cell('who').rowSpan = $cell('when').rowSpan = hist.changes.length;
        this.helpers.datetime.fill_element($cell('when').appendChild(document.createElement('time')),
                                           hist.when, { relative: false });
      } else {
        $cell('when').remove();
        $cell('who').remove();
      }

      let _field = conf_field[field_name] ||
                   // Bug 909055 - Field name mismatch in history: group vs groups
                   conf_field[field_name.replace(/s$/, '')] ||
                   // Bug 1078009 - Changes/history now include some wrong field names
                   conf_field[{
                     'flagtypes.name': 'flag',
                     'attachments.description': 'attachment.description',
                     'attachments.ispatch': 'attachment.is_patch',
                     'attachments.isobsolete': 'attachment.is_obsolete',
                     'attachments.isprivate': 'attachment.is_private',
                     'attachments.mimetype': 'attachment.content_type',
                   }[field_name]] ||
                   // If the Bugzilla config is outdated, the field name can be null
                   change;

      $cell('what').textContent = _field.description || _field.field_name;
      $cell('removed').innerHTML = this.get_cell_content(field_name, removed);
      $cell('added').innerHTML = this.get_cell_content(field_name, added);

      this.$tbody.appendChild($_row);
    }
  }
};

BzDeck.views.BugHistory.prototype.get_cell_content = function (field, content) {
  if (['blocks', 'depends_on'].includes(field)) {
    return content.replace(/(\d+)/g, '<a href="/bug/$1" data-bug-id="$1">$1</a>');
  }

  return this.helpers.string.sanitize(content).replace('@', '&#8203;@'); // ZERO WIDTH SPACE
};
