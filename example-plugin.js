(function (window, document, vjs, undefined) {
  "use strict";
  var registerPlugin = vjs.registerPlugin || vjs.plugin;

  registerPlugin('exampleAds', function (options) {
    var
      player = this,
      state = {},
      playPreroll = options && (options.playPreroll || true)

    var playAd = function () {
      player.ads.startLinearAdMode();
      state.adPlaying = true;

      player.src('ad.mp4');
      player.trigger('ads-ad-started');

      player.one('adended', function () {
        player.trigger('ads-ad-ended');
        player.ads.endLinearAdMode();
        state.adPlaying = false;
      });
    };

    player.ads();
    player.trigger('adsready');

    player.on('adsready', function () {
      if (!playPreroll) {
        player.trigger('nopreroll');
      }
    });

    player.on('readyforpreroll', function () {
      if (!state.prerollPlayed && playPreroll) {
        state.prerollPlayed = true;
        playAd();
      }
    });
  });

})(window, document, videojs);
