(function () {
    if (void 0 == jQuery)console.log("Jquery not included!"); else if (void 0 == Modernizr.video)console.log("Modernizr not included!"); else {

        jQuery.uaMatch = function( ua ) {
            ua = ua.toLowerCase();

            var match = /(chrome)[ /]([w.]+)/.exec( ua ) ||
                /(webkit)[ /]([w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ /]([w.]+)/.exec( ua ) ||
                /(msie) ([w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([w.]+)|)/.exec( ua ) ||
                [];

            return {
                browser: match[ 1 ] || "",
                version: match[ 2 ] || "0"
            };
        };

// Don't clobber any existing jQuery.browser in case it's different
        if ( !jQuery.browser ) {
            matched = jQuery.uaMatch( navigator.userAgent );
            browser = {};

            if ( matched.browser ) {
                browser[ matched.browser ] = true;
                browser.version = matched.version;
            }

            // Chrome is Webkit, but Webkit is also Safari.
            if ( browser.chrome ) {
                browser.webkit = true;
            } else if ( browser.webkit ) {
                browser.safari = true;
            }

            jQuery.browser = browser;
        }


        var a = jQuery, h = jQuery.browser.msie, g = 0, e = 0;
        jQuery.fn.extend({
            ensureLoad: function (b) {
                return this.each(function () {
                    this.complete || 4 === this.readyState ? b.call(this) : "uninitialized" === this.readyState && 0 === this.src.indexOf("data:") ? (a(this).trigger("error"), b.call(this)) : (a(this).one("load", b), h && (void 0 != this.src && -1 == this.src.indexOf("?")) && (this.src = this.src + "?" +
                    (new Date).getTime()))
                })
            }
        });
        video_background = function (b, f) {
            this.hidden = !1;
            this.$holder = b;
            this.id = "video_background_video_" + g;
            g++;
            this.parameters = {
                position: "absolute",
                "z-index": "-1",
                video_ratio: !1,
                loop: !0,
                autoplay: !0,
                muted: !1,
                mp4: !1,
                webm: !1,
                ogg: !1,
                flv: !1,
                youtube: !1,
                priority: "html5",
                fallback_image: !1,
                sizing: "fill",
                start: 0
            };
            a.each(f, a.proxy(function (b, a) {
                this.parameters[b] = a
            }, this));
            this.$video_holder = a('<div id="' + this.id + '"></div>').appendTo(b).css({
                "z-index": this.parameters["z-index"], position: this.parameters.position,
                top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden"
            });
            this.ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
            this.supports_flash = 9 < swfobject.getFlashPlayerVersion().major && (!1 !== this.parameters.mp4 || !1 !== this.parameters.flv);
            this.supports_video = Modernizr.video && (Modernizr.video.h264 && !1 !== this.parameters.mp4 || Modernizr.video.ogg && !1 !== this.parameters.ogg || Modernizr.video.webm && !1 !== this.parameters.webm);
            this.decision = "image";
            this.ismobile || !this.supports_flash && !this.supports_video &&
            !1 === this.parameters.youtube || (this.decision = this.parameters.priority, !1 !== this.parameters.youtube ? this.decision = "youtube" : "flash" == this.parameters.priority && this.supports_flash ? this.decision = "flash" : "html5" == this.parameters.priority && this.supports_video ? this.decision = "html5" : this.supports_flash ? this.decision = "flash" : this.supports_video && (this.decision = "html5"));
            "image" == this.decision ? this.make_image() : "youtube" == this.decision ? this.make_youtube() : "html5" == this.decision ? this.make_video() : this.make_flash();
            return this
        };
        video_background.prototype = {
            make_video: function () {
                var b = '<video width="100%" height="100%" ' + ((this.parameters.autoplay ? "autoplay " : "") + (this.parameters.loop ? "loop " : "")) + ">";
                !1 !== this.parameters.mp4 && (b += '<source src="' + this.parameters.mp4 + '" type="video/mp4"></source>');
                !1 !== this.parameters.webm && (b += '<source src="' + this.parameters.webm + '" type="video/webm"></source>');
                !1 !== this.parameters.ogg && (b += '<source src="' + this.parameters.ogg + '" type="video/ogg"></source>');
                this.$video = a(b +
                "</video>").css({position: "absolute"});
                this.$video_holder.append(this.$video);
                this.video = this.$video.get(0);
                !1 !== this.parameters.video_ratio && (this.resize_timeout = !1, a(window).resize(a.proxy(function () {
                    clearTimeout(this.resize_timeout);
                    this.resize_timeout = setTimeout(a.proxy(this.video_resize, this), 10)
                }, this)), this.video_resize());
                this.parameters.muted && this.mute()
            }, video_resize: function () {

                console.log(this.$video_holder);
                var b = this.$video_holder.width(), a = this.$video_holder.height(), c = b, d = b / this.parameters.video_ratio;
                d < a && (d = a,
                    c = a * this.parameters.video_ratio);
                d = Math.ceil(d);
                c = Math.ceil(c);
                a = Math.round(a / 2 - d / 2);
                b = Math.round(b / 2 - c / 2);
                this.$video.attr("width", c);
                this.$video.attr("height", d);
                this.$video.css({top: a + "px", left: b + "px"})
            }, make_youtube: function () {
                var b = a("html");
                this.$video = a('<div id="' + this.id + '_yt"></div>').appendTo(this.$video_holder).css({position: "absolute"});
                this.youtube_ready = !1;
                if (0 == e) {
                    var f = document.createElement("script");
                    f.src = "https://www.youtube.com/iframe_api";
                    var c = document.getElementsByTagName("script")[0];
                    c.parentNode.insertBefore(f, c);
                    e = 1;
                    window.onYouTubeIframeAPIReady = a.proxy(function () {
                        b.trigger("yt_loaded");
                        this.build_youtube();
                        e = 2
                    }, this)
                } else 1 == e ? b.bind("yt_loaded", a.proxy(this.build_youtube, this)) : 2 == e && this.build_youtube()
            }, build_youtube: function () {
                var b = {
                    loop: this.parameters.loop ? 1 : 0,
                    start: this.parameters.start,
                    autoplay: this.parameters.autoplay ? 1 : 0,
                    controls: 0,
                    showinfo: 0,
                    wmode: "transparent",
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0
                };
                this.parameters.loop && (b.playlist = this.parameters.youtube);
                this.player = new YT.Player(this.id + "_yt", {
                    height: "100%",
                    width: "100%",
                    playerVars: b,
                    videoId: this.parameters.youtube,
                    events: {onReady: a.proxy(this.youtube_ready_fun, this)}
                })
            }, youtube_ready_fun: function (b) {
                this.youtube_ready = !0;
                this.$video = a("#" + this.id + "_yt");
                !1 !== this.parameters.video_ratio && (this.resize_timeout = !1, a(window).resize(a.proxy(function () {
                    clearTimeout(this.resize_timeout);
                    this.resize_timeout = setTimeout(a.proxy(this.video_resize, this), 10)
                }, this)), this.video_resize());
                this.parameters.muted &&
                this.mute()
            }, make_flash: function () {
                var b = {
                    url: !1 != this.parameters.mp4 ? this.parameters.mp4 : this.parameters.flv,
                    loop: this.parameters.loop,
                    autoplay: this.parameters.autoplay,
                    muted: this.parameters.muted
                };
                this.$video_holder.append('<div id="' + this.id + '_flash"></div>');
                swfobject.embedSWF("flash/video.swf", this.id + "_flash", "100%", "100%", "9.0", null, b, {
                    allowfullscreen: !0,
                    allowScriptAccess: "always",
                    wmode: "transparent"
                }, {name: "background-video-swf"}, a.proxy(this.flash_callback, this))
            }, flash_callback: function (b) {
                this.video =
                    a(b.target).get(0);
                this.parameters.muted && this.mute()
            }, make_image: function () {
                !1 !== this.parameters.fallback_image && (this.$img = a('<img src="' + this.parameters.fallback_image + '" alt=""/>').appendTo(this.$video_holder).css({position: "absolute"}), this.$img.ensureLoad(a.proxy(this.image_loaded, this)))
            }, image_loaded: function () {
                this.original_width = this.$img.width();
                this.original_height = this.$img.height();
                this.resize_timeout = !1;
                a(window).resize(a.proxy(function () {
                    clearTimeout(this.resize_timeout);
                    this.resize_timeout =
                        setTimeout(a.proxy(this.image_resize, this), 10)
                }, this));
                this.image_resize()
            }, image_resize: function () {
                var b = this.$video_holder.width(), a = this.$video_holder.height(), c = b, d = this.original_height / (this.original_width / b);
                if ("adjust" == this.parameters.sizing && d > a || "fill" == this.parameters.sizing && d < a)d = a, c = this.original_width / (this.original_height / a);
                d = Math.ceil(d);
                c = Math.ceil(c);
                a = Math.round(a / 2 - d / 2);
                b = Math.round(b / 2 - c / 2);
                this.$img.css({width: c + "px", height: d + "px", top: a + "px", left: b + "px"})
            }, isPlaying: function () {
                return "html5" ==
                this.decision ? !this.video.paused : "flash" == this.decision ? video.isPlaying() : "youtube" == this.decision && this.youtube_ready ? 1 === this.player.getPlayerState() : !1
            }, play: function () {
                "html5" == this.decision ? this.video.play() : "flash" == this.decision ? this.video.resume() : "youtube" == this.decision && this.youtube_ready && this.player.playVideo()
            }, pause: function () {
                "html5" == this.decision || "flash" == this.decision ? this.video.pause() : "youtube" == this.decision && this.youtube_ready && this.player.pauseVideo()
            }, toggle_play: function () {
                this.isPlaying() ?
                    this.pause() : this.play()
            }, isMuted: function () {
                return "html5" == this.decision ? !this.video.volume : "flash" == this.decision ? video.isMute() : "youtube" == this.decision && this.youtube_ready ? this.player.isMuted() : !1
            }, mute: function () {
                "html5" == this.decision ? this.video.volume = 0 : "flash" == this.decision ? this.video.mute() : "youtube" == this.decision && this.youtube_ready && this.player.mute()
            }, unmute: function () {
                "html5" == this.decision ? this.video.volume = 1 : "flash" == this.decision ? this.video.unmute() : "youtube" == this.decision && this.youtube_ready &&
                this.player.unMute()
            }, toggle_mute: function () {
                this.isMuted() ? this.unmute() : this.mute()
            }, hide: function () {
                this.pause();
                this.$video_holder.stop().fadeTo(700, 0);
                this.hidden = !0
            }, show: function () {
                this.play();
                this.$video_holder.stop().fadeTo(700, 1);
                this.hidden = !1
            }, toogle_hidden: function () {
                this.hidden ? this.show() : this.hide()
            }, rewind: function () {
                "html5" == this.decision ? this.video.currentTime = 0 : "flash" == this.decision ? this.video.rewind() : "youtube" == this.decision && this.youtube_ready && this.player.seekTo(0)
            }
        }
    }
})(void 0);
