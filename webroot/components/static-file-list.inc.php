<?php
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*
 * Stylesheets
 */
$styles = [
  // Vendor
  '/vendor/flaretail.js/styles/widgets.css',
  // General
  '/static/styles/base/fonts.css',
  '/static/styles/base/base.css',
  '/static/styles/base/widgets.css',
  '/static/styles/base/animations.css',
  // Views
  '/static/styles/views/app-body.css',
  '/static/styles/views/attachment-page.css',
  '/static/styles/views/attachment.css',
  '/static/styles/views/bug-attachments.css',
  '/static/styles/views/bug-comment-form.css',
  '/static/styles/views/bug-details.css',
  '/static/styles/views/bug-history.css',
  '/static/styles/views/bug-participant-list.css',
  '/static/styles/views/bug-preview.css',
  '/static/styles/views/bug-timeline.css',
  '/static/styles/views/bug-timeline-entry.css',
  '/static/styles/views/bug.css',
  '/static/styles/views/header.css',
  '/static/styles/views/home.css',
  '/static/styles/views/login-form.css',
  '/static/styles/views/main.css',
  '/static/styles/views/person-finder.css',
  '/static/styles/views/profile-page.css',
  '/static/styles/views/qrcode-auth-overlay.css',
  '/static/styles/views/search-page.css',
  '/static/styles/views/settings-page.css',
  '/static/styles/views/sidebar.css',
  '/static/styles/views/thread.css',
  '/static/styles/views/tooltip.css',
  // Themes cannot go here, because those require the title attribute on <link>
];

/*
 * Scripts
 * For each section, base.js should go first
 */
$scripts = [
  // Vendor
  '/vendor/JavaScript-MD5/scripts/md5.min.js',
  '/vendor/flaretail.js/scripts/helpers.js',
  '/vendor/flaretail.js/scripts/widgets.js',
  '/vendor/flaretail.js/scripts/app.js',
  // Config
  '/static/scripts/config/app.js',
  // Datasources
  '/static/scripts/datasources/base.js',
  '/static/scripts/datasources/account.js',
  '/static/scripts/datasources/global.js',
  // Models
  '/static/scripts/models/base.js',
  '/static/scripts/models/account.js',
  '/static/scripts/models/attachment.js',
  '/static/scripts/models/bug.js',
  '/static/scripts/models/server.js',
  '/static/scripts/models/user.js',
  // Collections
  '/static/scripts/collections/base.js',
  '/static/scripts/collections/accounts.js',
  '/static/scripts/collections/attachments.js',
  '/static/scripts/collections/bugs.js',
  '/static/scripts/collections/prefs.js',
  '/static/scripts/collections/servers.js',
  '/static/scripts/collections/subscriptions.js',
  '/static/scripts/collections/users.js',
  // Views
  '/static/scripts/views/base.js',
  '/static/scripts/views/attachment.js',
  '/static/scripts/views/attachment-page.js',
  '/static/scripts/views/bug.js',
  '/static/scripts/views/bug-attachments.js',
  '/static/scripts/views/bug-comment-form.js',
  '/static/scripts/views/bug-details.js', // extends bug.js
  '/static/scripts/views/bug-history.js',
  '/static/scripts/views/bug-participant-list.js',
  '/static/scripts/views/bug-timeline.js',
  '/static/scripts/views/bug-timeline-entry.js',
  '/static/scripts/views/details-page.js',
  '/static/scripts/views/global.js',
  '/static/scripts/views/home-page.js',
  '/static/scripts/views/login-form.js',
  '/static/scripts/views/patch-viewer.js',
  '/static/scripts/views/person-finder.js',
  '/static/scripts/views/profile-page.js',
  '/static/scripts/views/search-page.js',
  '/static/scripts/views/session.js',
  '/static/scripts/views/settings-page.js',
  '/static/scripts/views/sidebar.js',
  '/static/scripts/views/statusbar.js',
  '/static/scripts/views/thread.js',
  '/static/scripts/views/toolbar.js',
  '/static/scripts/views/tooltip.js',
  // Helpers
  '/static/scripts/helpers/base.js',
  // Controllers
  '/static/scripts/controllers/base.js',
  '/static/scripts/controllers/attachment-page.js',
  '/static/scripts/controllers/bug.js',
  '/static/scripts/controllers/bugzfeed.js',
  '/static/scripts/controllers/details-page.js',
  '/static/scripts/controllers/global.js',
  '/static/scripts/controllers/home-page.js',
  '/static/scripts/controllers/profile-page.js',
  '/static/scripts/controllers/search-page.js',
  '/static/scripts/controllers/session.js',
  '/static/scripts/controllers/settings-page.js',
  '/static/scripts/controllers/sidebar.js',
  '/static/scripts/controllers/statusbar.js',
  '/static/scripts/controllers/toolbar.js',
];
