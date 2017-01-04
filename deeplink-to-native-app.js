/**
 *
 * @author
 *  Prabeen Giri.
 *
 * @return object
 *  Javascript object with 'init' method to initialize
 *  NativeAppLauncher
 */
var NativeAppLauncher = (function($) {

    "use strict";
    var Settings = {};
    /**
     * This is Base StrategyParameter
     *
     * This object acts as an Adapter which is created to achieve
     * parameterized Strategy Pattern.
     * This is implemented, so that AppLaunchStrategies can share same interface
     * as they accepts different arguments to run. So strategies don't have to worry about the
     * arguments as Strategy Parameters contains all the parameters required by all the strategies.
     */
    var AppLaunchStrategyParameters =  {
        // On desktop, we don't know what to do.
        getAppUri : function() {
            return "#";
        },
        getAppLauncherEl : function() {
            if (!Settings.appLauncherElId) {
                throw new Error('Settings does not have valid appLauncherElId');
            }
            return $('#' + Settings.appLauncherElId);
        },
        // This message is displayed if any browser does not support deep linking.
        getNotSupportedMessage : function() {
            if (!Settings.appLauncherElId) {
                throw new Error('Settings does not have valid NotSupportedMessage');
            }
            return Settings.notSupportedMessage;
        },
        //TODO: Campaign can be created as separate decorator/proxy object
        getCampaignValue: function() {
            return Settings.campaignCode;
        },
        // Default Store URI, not sure where to go :).
        getAppStoreURI: function() {
            return "#";
        }

    };

    /**
     * @inherits AppLaunchStrategyParameters
     * Extends Base App Launch Strategy Parameters which are required for
     * Android App Launch Strategies.
     */
    var AndroidAppLaunchStrategyParameters = $.extend({}, AppLaunchStrategyParameters, {
        getIntentURI: function() {
            return "intent://m/#Intent;scheme=" + Settings.appUri + ";package="+ Settings.androidAppId +";end";
        },
        getAppUri: function () {
            return Settings.appUri;
        },
        getAppStoreURI: function () {
            var campaignString = this.getCampaignValue() ? "&referrer=utm_source%3Dother%26utm_campaign%3D" + this.getCampaignValue() : "";
            return "https://play.google.com/store/apps/details?id=" + Settings.androidAppId + campaignString ;
        }
    });

    /**
     * Extends Base App Launch Strategy Parameters which are required for
     * Ios App Launch Strategies.
     */
    var IOSAppLaunchStrategyParameters = $.extend({}, AppLaunchStrategyParameters, {
        getAppStoreURI: function () {
            return  this.getCampaignValue() ?
                Utils.appendQueryParameter(Settings.iOsAppStore, 'ct', this.getCampaignValue()) : Settings.iOsAppStore;
        },
        getUniversalLinkingUrl : function() {
            return Settings.universalLinkUrl;
        },
        getAppUri : function() {
            if (!Settings.appUri) {
                throw new Error('Settings does not have valid AppURI')
            }
            return Settings.appUri;
        },
    });


    /**
     * Base AppLaunch Strategy.
     * @param strategyParameters
     * @constructor
     */
    var AppLaunchStrategy = function (strategyParameters) {
        this.strategyParameters = strategyParameters;
        this.init = function(){};
    };

    /**
     * This just tries to redirect to app, not to the app store, as
     * twitter io8 browser does open both app and app store which is not
     * a good user experience. If user does not have app installed, they will just
     * they will have to click to download app button manually to go to app store.
     *
     * Eg, Quora does the same.
     */
    var DirectAppOnlyLaunchStrategy = function(strategyParameters) {
        this.init = function () {
            var el = strategyParameters.getAppLauncherEl();
            var appURI = strategyParameters.getAppUri();
            el.click(function(e){
                e.preventDefault();
                window.location.reload();
            });
            window.location = appURI;
        }
    };

    /**
     * This method works with most of the old devices and browsers.
     * This first tries to launch App using custom uri scheme(twitter://). If app is not installed,
     * then after few milliseconds, it redirects to app store as browser does not provide api to
     * detect if app is installed or not.
     *
     * @param strategyParameters
     * @constructor
     */
    var DirectAppLaunchStrategy = function(strategyParameters) {
        AppLaunchStrategy.call(this, strategyParameters);
        // Events that gets executed if page is transitioning away.
        var events = ["pagehide", "blur", "beforeunload"];
        var timeout = null;
        var preventDialog = function () {
            clearTimeout(timeout);
            timeout = null;
            $(window).unbind(events.join(" "));
        };

        var el = strategyParameters.getAppLauncherEl();
        var self = this;

        this.init = function() {
            redirect();
            // If user navigates back to browser and clicks the button,
            // try redirecting again.
            el.unbind('click').on('click', function(e) {
                e.preventDefault();
                redirect();
            });
        };

        var redirect = function () {
            window.location = strategyParameters.getAppUri();
            $(window).bind(events.join(" "), preventDialog);

            timeout = setTimeout(function() {
                window.top.location = strategyParameters.getAppStoreURI();
            }, 1500);
        }
    };

    /**
     * This is Call to Action. Modern and recent browsers are moving towards this approach.
     * They are requiring user action to deep link to the app. First is assigns click event
     * to 'watch in app' link which will ultimately invoke DirectAppLaunchStrategy().
     *
     * @param strategyParameters
     * @constructor
     */
    var CTAAppLaunchStrategy = function(strategyParameters) {
        AppLaunchStrategy.call(this, strategyParameters);

        this.init = function() {
            var directStrategy = new DirectAppLaunchStrategy(strategyParameters);
            var el = strategyParameters.getAppLauncherEl();
            var id = el.attr('id');
            $("body").on('click',  '#' + id, function(e) {
                e.preventDefault();
                directStrategy.init();
            });
        }
    };

    /**
     * This is only used for android devices as, they understand the "Intent" URI
     * which automatically resolves the app installation state and redirects users accordingly.
     * With This strategy, we cannot pass the campaign id, if user is being redirect to app store.

     * @param strategyParameters
     * @constructor
     */
    var CTAIntentAppLaunchStrategy = function(strategyParameters) {
        AppLaunchStrategy.call(this, strategyParameters);

        this.init = function() {
            var el = strategyParameters.getAppLauncherEl();
            var id = el.attr('id');
            el.attr('href', strategyParameters.getIntentURI());
        }
    };

    /**
     * There are few browsers on Android which does not support both app launch
     * with 'intent' or 'custom uri scheme'. Not even CTA works on those browser.
     *
     * This just displays browser alert dialog box when 'Watch In App' button is clicked.
     * @param strategyParameters
     * @constructor
     */
    var AppLaunchNotSupportedStrategy = function(strategyParameters) {
        AppLaunchStrategy.call(this, strategyParameters);
        this.init = function () {
            var id = strategyParameters.getAppLauncherEl().attr('id');
            $("body").on('click',  '#' + id, function(e) {
                e.preventDefault();
                alert(strategyParameters.getNotSupportedMessage());
            })
        }
    };

    /**
     * This is new deep linking technique introduced on IOS9. Same url is used to open app or in browser.
     * If app is installed and configured to work with universal link, then automatically opens the app from
     * browser, ios message app and other.
     *
     * For this to work:
     * 1. Website should have valid Universal Link(json file in root of website) which defines path will be used for
     * universal linking. Eg /deeplink/*, *
     * 2. App should be specify the domains that can be used for universal linking to the app. Eg.
     * https://www.linkedin.com, https://www.twitter.com.
     * While app is installing it invokes the Universal like present on the domain specified and registers those path
     * for universal linking.
     *
     * This technique will just change the url of 'Watch In App' button, to the url that does universal linking.
     *
     * To test if, universal linking is working for IosApp, tap the universal link from message app on Ios.
     * If it does not open the app, then it means universal link is not configured properly.
     *
     * https://dev.branch.io/recipes/branch_universal_links/ios/#which-appsbrowsers-support-universal-links
     *
     * @param strategyParameters
     * @constructor
     */
    var UniversalLinkingAppLaunchStrategy = function(strategyParameters) {
        AppLaunchStrategy.call(this, strategyParameters);

        this.init = function() {
            if (!strategyParameters.getUniversalLinkingUrl()) {
                //throw new Error('Universal Linking: Invalid url provided: ' + strategyParameters.getUniversalLinkingUrl());
                console.log("Error: Universal Linking: Invalid url provided: " + strategyParameters.getUniversalLinkingUrl());
            }
            var el = strategyParameters.getAppLauncherEl();

            var $cookieName = 'ul-app-detection-flag';

            var $location = strategyParameters.getUniversalLinkingUrl();

            if (appNotInstalled()) {
                window.location = strategyParameters.getAppStoreURI();
                eraseCookie();
            }
            el.attr('href', $location);

            // If user navigates away/closes Fb Browser.
            $(window).on('blur', function() {
                eraseCookie($cookieName);
            });

            setCookie();
            el.click(function() {
                setCookie();
            });

            // If cookie value is greater than 1, that means user does not have app installed.
            function appNotInstalled() {
                return readCookie($cookieName) > 1;
            }

            // On blur will always clear the cookie, or when trying to
            // navigate to the app store, however, if user closes the fb directly,
            // then it assumes for 1 min that user does not have app installed if
            // app is not detected earlier and installed. If that happens within 1min
            // if user directly closes the fb, which means cookie still resides.
            function setCookie() {
                var $cookieValue = readCookie($cookieName);
                if (!$cookieValue || isNaN($cookieValue)) {
                    // set for 1 min.
                    createCookie($cookieName, 1, 60)
                } else {
                    // set for 1 min.
                    createCookie($cookieName, 2, 60);
                }
            }
        };

        function createCookie(name, value, second) {
            var date = new Date();
            date.setTime(date.getTime()+(second * 1000));
            var expires = "; expires="+date.toGMTString();
            document.cookie = name+"="+value+expires+"; path=/";
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        function eraseCookie(name) {
            createCookie(name,"",-1);
        }
    };

    /**
     *  Creates the Strategy Parameter object required for the Strategy
     *  based on the type of the OS.
     *
     *  @return AppLaunchStrategyParameters Object
     */
    var AppLaunchStrategyParameterFactory = function() {
        var strategyParameters = AppLaunchStrategyParameters;
        var parameterType;

        if (BrowserChecker().isIOS) {
            parameterType = 'ios';
            strategyParameters = IOSAppLaunchStrategyParameters;
        } else if (BrowserChecker().isAndroid) {
            parameterType = 'android';
            strategyParameters = AndroidAppLaunchStrategyParameters;
        } else {
            parameterType = 'desktop or default';
            strategyParameters = AppLaunchStrategyParameters;
        }

        if (Settings.debug && strategyParameters) {
            __debug("AppLaunchParameter" , parameterType);
        }
        return strategyParameters;
    };

    /**
     * This is a factory which creates the deep linking/App Launch Strategy/Technique based on the parameter.
     * As each deep linking strategy requires different parameters, so parameter object should be provided
     * based on the type of deeplinking strategy.
     *
     * @param strategyType
     * @returns {*}
     */
    var AppLaunchStrategyFactory = function (strategyType) {
        var strategyParameters = AppLaunchStrategyParameterFactory();
        var appLaunchStrategy;

        if (strategyType == 'cta' || strategyType == undefined) {
            appLaunchStrategy = new CTAAppLaunchStrategy(strategyParameters);
        } else if(strategyType == 'direct') {
            appLaunchStrategy = new DirectAppLaunchStrategy(strategyParameters);
        } else if (strategyType == 'ul') {

            appLaunchStrategy =  new UniversalLinkingAppLaunchStrategy(strategyParameters);
        } else if (strategyType == 'notsupported') {
            appLaunchStrategy =  new AppLaunchNotSupportedStrategy(strategyParameters);
        } else if (strategyType == 'directapponly') {
            appLaunchStrategy =  new DirectAppOnlyLaunchStrategy(strategyParameters);
        } else if (strategyType == 'intent_cta') {
            appLaunchStrategy =  new CTAIntentAppLaunchStrategy(strategyParameters);
        } else {
            throw new Error('Deeplinking: Unsupported deeplinking strategy type');
        }

        if (Settings.debug && appLaunchStrategy) {
            __debug("AppLaunchStrategyType",  strategyType);
        }
        return appLaunchStrategy;

    };

    /**
     * This is just a utility object which checks device OS, current browser and versions.
     */
    var BrowserChecker = function() {
        var userAgent = window.navigator.userAgent.toLowerCase();
        var iOSVersion = function() {
            return isIOS() ? parseInt(userAgent.match(/os\s+(\d)_/)[1], 10) : false;
        };
        var isIOS = function() {
            return /(?:i(?:phone|p(?:o|a)d))/.test(userAgent);
        };

        var isFacebook = function () {
            return !!userAgent.match(/FBAV/i);
        };

        var isChrome = function () {
            return userAgent.indexOf('chrome') > -1;
        };

        var chromeVersion = function () {
            var raw = userAgent.match(/chrom(e|ium)\/([0-9]+)\./);
            return raw ? parseInt(raw[2], 10) : false;
        };

        var isTwitter = function () {
            return userAgent.indexOf('twitter') > -1;
        };

        var isAndroid = function () {
            /**
             // This is to check Android Mobile.
             return userAgent.indexOf('android') > -1
             && userAgent.indexOf('Mozilla/5.0') > -1
             && userAgent.indexOf('AppleWebKit') > -1;
             */
            return userAgent.indexOf('android') > -1;
        };

        var androidVersion = function() {
            var match = userAgent.match(/android\s([0-9\.]*)/);
            return match ? parseFloat(match[1]) : false;
        };

        // Downloaded from the Android Google play store.
        var isAndroidStockBrowser = function() {
            return isAndroid()
                && isChrome()
                && hasVersion()
                && !isFacebook(); // FB uses this browser, but deep links with custom URI scheme.

        };

        // Default browser for old Android and android Apps.
        var isAndroidNativeBrowser = function() {
            // Facebook in Anroid 4.4 uses this browser, by default but does the deep linking,
            // so lets check for facebook.
            return !isFacebook()
                && (isAndroid() && (appleWebKitVersion() && appleWebKitVersion() < 537)
                ||
                (chromeVersion() && chromeVersion() < 37));
        };

        var hasVersion = function() {
            return userAgent.indexOf('version') > -1;
        };

        /**
         * @return
         *  Returns object with following property
         *  - boolean : If AppleKit Browser
         *  - version : AppleKit Browser Version.
         */
        var appleWebKitVersion = function() {
            var match = userAgent.match(/AppleWebKit\/([\d.]+)/);
            return match ? parseFloat(match[1]) : false;
        };

        return {
            isIOS: isIOS(),
            iOSVersion: iOSVersion(),
            isAndroid: isAndroid(),
            androidVersion: androidVersion(),
            isAndroidStockBrowser: isAndroidStockBrowser(),
            isAndroidNativeBrowser: isAndroidNativeBrowser(),
            isFacebook: isFacebook(),
            isChrome: isChrome(),
            isTwitter: isTwitter()
        }
    };

    /**
     * This is the main factory which creates the deeplinking strategy object based
     * on the type of browser and its versions. Multiple instances of strategy will be created
     * as we will require just one, but we don't have to worry about Garbage collection.
     *
     * @returns {AppLaunchStrategyFactory}
     * @constructor
     */
    var AppLauncherFactory = function() {
        var settings = Settings;
        var browser = BrowserChecker();

        // Default strategy.
        var deepLinkingStrategy = new AppLaunchStrategyFactory('cta');

        if (browser.isIOS) {
            //deepLinkingStrategy = new AppLaunchStrategyFactory('cta');
            if (browser.iOSVersion < 9) {
                deepLinkingStrategy = new AppLaunchStrategyFactory('direct');
                if (browser.isTwitter) {
                    deepLinkingStrategy = new AppLaunchStrategyFactory('directapponly');
                }
            }
            // If IOS >= 9.
            else {
                deepLinkingStrategy = new AppLaunchStrategyFactory('direct');
                //deepLinkingStrategy = new AppLaunchStrategyFactory('ul');

                // Other strategy does not work on FB, other than ul.
                if (browser.isFacebook) {
                    deepLinkingStrategy = new AppLaunchStrategyFactory('ul');
                }
            }
        }
        else if (browser.isAndroid) {
            deepLinkingStrategy = new AppLaunchStrategyFactory('intent_cta');
            if (browser.isAndroidNativeBrowser || browser.isAndroidStockBrowser) {
                deepLinkingStrategy = new AppLaunchStrategyFactory('notsupported');
            }
        }

        if (Settings.debug == true) {
            __debug('browser', browser);
        }
        return deepLinkingStrategy;
    };

    /**
     * This is Facade which initialized settings and App Launcher.
     * This is the only method that is invoked externally.
     *
     * Check if cmp exists in the query string
     *
     * @param settings
     *  Entire settings info which NativeAppLauncher is dependent on.
     */
    var Init = function (settings) {
        Settings = settings;
        // Let all the page render finish.
        setTimeout(function() {
            return AppLauncherFactory().init();
        }, 1000);

    };

    /**
     * Print objects as string on console. Useful for debugging.
     * @param name
     * @param object
     * @private
     */
    function __debug(name, object) {
        console.log(name + ":" + JSON.stringify(object, null, 4));
    };

    /**
     * Various utility functions.
     */
    var Utils = {
        /**
         * Returns query string into key/pair array.
         * @param queryString string
         *  Raw Query string.
         * @returns []
         */
        getQueryString: function (queryString) {
            if (queryString == undefined) {
                queryString = window.location.search;
            }

            queryString = queryString.split('+').join(' ');
            var params = {}, tokens,
                re = /[?&]?([^=]+)=([^&]*)/g;
            while (tokens = re.exec(queryString)) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }
            return params;
        },
        appendQueryParameter: function (url, key, value) {
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = url.indexOf('?') !== -1 ? "&" : "?";
            if (url.match(re)) {
                return url.replace(re, '$1' + key + "=" + value + '$2');
            }
            //TODO  Filter value against XSS.
            return url + separator + key + "=" + value;
        },
    };

    return {
        init: Init,
        browserChecker: BrowserChecker,
        util: Utils,
        androidParameters: AndroidAppLaunchStrategyParameters,
        iOSParameters:IOSAppLaunchStrategyParameters
    };
})(jQuery);
