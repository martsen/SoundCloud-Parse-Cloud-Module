/**
 * SoundCloud Parse Cloud Module
 * @name SoundCloud
 * @namespace
 *
 * Cloud Module for using <a href="https://soundcloud.com/">SoundCloud</a>.
 *
 * <ul><li>Module Version: 0.2.0</li>
 * <li>SoundCloud API Version: 'v1'</li></ul>
 *
 * Copyright 2014 martsen.
 * This module is freely distributable under the MIT license.
 */

(function() {

  var url = 'api.soundcloud.com';

  var _accessToken = '';

  module.exports = {
    /**
     * Get the version of the module.
     * @return {String}
     */
    version: '1.0.0',

    /**
     * Initialize the SoundCloud module with the proper credentials.
     * @param {String} accessToken SoundCloud App OAuth2 access token
     */
    initialize: function(accessToken) {
      _accessToken = accessToken;
      return this;
    },

    getTracks: function(options) {
      return Parse.Cloud.httpRequest({
        method: "GET",
        url: "https://" + url + "/me/tracks.json?oauth_token=" + _accessToken,
      }).then(function(httpResponse) {
        if (options && options.success) {
          options.success(httpResponse);
        }
      }, function(httpResponse) {
          if (options && options.error) {
            options.error(httpResponse);
          }
        });
    },

    getTrack: function(id, options) {
      return Parse.Cloud.httpRequest({
        method: "GET",
        url: "https://" + url + "/tracks/" + id + ".json?oauth_token=" + _accessToken,
      }).then(function(httpResponse) {
        if (options && options.success) {
          options.success(httpResponse);
        }
      }, function(httpResponse) {
          if (options && options.error) {
            options.error(httpResponse);
          }
        });
    },

    getTrackStreanUrl: function(id, options) {
      return Parse.Cloud.httpRequest({
        method: "GET",
        url: "https://" + url + "/tracks/" + id + ".json?oauth_token=" + _accessToken,
      }).then(function(httpResponse) {
        if (options && options.success) {
          var url = httpResponse.data["stream_url"] + "?oauth_token=" + _accessToken;
          // hack from https://www.parse.com/questions/is-there-a-way-to-direct-httprequest-to-automatically-follow-redirects
          Parse.Cloud.httpRequest({
            url: url,
            error: function(response) {
              options.success(response.headers.Location);
            },
          })

        }
      }, function(httpResponse) {
          if (options && options.error) {
            options.error(httpResponse);
          }
        });
    },
  }
}());