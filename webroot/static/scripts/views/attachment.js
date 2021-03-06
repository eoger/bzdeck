/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*
 * Initialize the Attachment View.
 *
 * [argument] attachment (Proxy) AttachmentModel instance
 * [argument] $placeholder (Element) node to show the attachment
 * [return] view (Object) AttachmentView instance, when called with `new`
 */
BzDeck.views.Attachment = function AttachmentView (attachment, $placeholder) {
  let att = this.attachment = attachment,
      get_person = name => BzDeck.collections.users.get(name, { name }).properties;

  this.$placeholder = $placeholder;

  this.$attachment = this.fill(this.get_template('details-attachment-content'), {
    description: att.summary,
    name: att.file_name,
    contentSize: `${(att.size / 1024).toFixed(2)} KB`, // l10n
    encodingFormat: att.is_patch ? 'text/x-patch' : att.content_type,
    is_obsolete: !!att.is_obsolete,
    dateCreated: att.creation_time,
    dateModified: att.last_change_time,
    creator: get_person(att.creator),
    flag: [for (flag of att.flags || []) {
      creator: get_person(flag.setter),
      name: flag.name,
      status: flag.status,
      requestee: flag.requestee ? get_person(flag.requestee) : {},
    }],
  }, {
    'data-att-id': att.id || att.hash,
    'data-content-type': att.is_patch ? 'text/x-patch' : att.content_type,
  });

  this.$outer = this.$attachment.querySelector('.body');

  this.render();
};

BzDeck.views.Attachment.prototype = Object.create(BzDeck.views.Base.prototype);
BzDeck.views.Attachment.prototype.constructor = BzDeck.views.Attachment;

/*
 * Render the attachment on the placeholder.
 *
 * [argument] none
 * [return] none
 */
BzDeck.views.Attachment.prototype.render = function () {
  let media_type = this.attachment.content_type.split('/')[0];

  this.$attachment.itemProp.add('attachment');
  this.$placeholder.innerHTML = '';
  this.$placeholder.appendChild(this.$attachment);

  if (media_type === 'image') {
    this.$media = new Image();
    this.$media.alt = '';
  }

  if (media_type === 'audio' || media_type === 'video') {
    this.$media = document.createElement(media_type);
    this.$media.controls = true;

    if (this.$media.canPlayType(this.attachment.content_type) === '') {
      delete this.$media; // Cannot play the media
    }
  }

  if (this.$media) {
    this.render_media();
  } else if (this.attachment.is_patch) {
    this.render_patch();
  } else {
    this.render_link();
  }
};

/*
 * Render the image, video or audio.
 *
 * [argument] none
 * [return] none
 */
BzDeck.views.Attachment.prototype.render_media = function () {
  this.$outer.setAttribute('aria-busy', 'true');

  this.attachment.get_data().then(result => {
    this.$media.src = URL.createObjectURL(result.blob);
    this.$media.itemProp.add('url');
    this.$outer.appendChild(this.$media);
    this.$attachment.classList.add('media');
  }, error => {
    this.render_error(error);
  }).then(() => {
    this.$outer.removeAttribute('aria-busy');
  });
};

/*
 * Render the patch with the Patch Viewer.
 *
 * [argument] none
 * [return] none
 */
BzDeck.views.Attachment.prototype.render_patch = function () {
  this.$outer.setAttribute('aria-busy', 'true');

  this.attachment.get_data('text').then(result => {
    this.helpers.event.async(() => this.$outer.appendChild(new BzDeck.views.PatchViewer(result.text)));
    this.$attachment.classList.add('patch');
  }, error => {
    this.render_error(error);
  }).then(() => {
    this.$outer.removeAttribute('aria-busy');
  });
};

/*
 * Render a link to the file.
 *
 * [argument] none
 * [return] none
 */
BzDeck.views.Attachment.prototype.render_link = function () {
  let $link = document.createElement('a');

  $link.href = `${BzDeck.models.server.url}/attachment.cgi?id=${this.attachment.id || this.attachment.hash}`;
  $link.text = {
    'text/x-github-pull-request': 'See the GitHub pull request',
    'text/x-review-board-request': 'See the Review Board request',
    'application/pdf': 'Open the PDF file',
    'application/msword': 'Open the Word file',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Open the Word file',
    'application/vnd.ms-excel': 'Open the Excel file',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Open the Excel file',
    'application/vnd.ms-powerpoint': 'Open the PowerPoint file',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'Open the PowerPoint file',
    'application/zip': 'Open the zip archive',
    'application/gzip': 'Open the gzip archive',
    'application/x-gzip': 'Open the gzip archive',
    'application/x-bzip2': 'Open the bzip2 archive',
  }[this.attachment.content_type] || 'Open the file';

  this.$outer.appendChild($link);
  this.$attachment.classList.add('link');
};

/*
 * Render an error message when the attachment cannot be retrieved.
 *
 * [argument] error (Error) error object
 * [return] none
 */
BzDeck.views.Attachment.prototype.render_error = function (error) {
  let $error = document.createElement('p');

  $error.textContent = error.message;
  this.$outer.appendChild($error);
  this.$attachment.classList.add('error');
};
