var deeplinkToNativeApp =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function BrowserChecker() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var iOSVersion = function () {
        if (!isIOS()) {
            return false;
        }
        var match = userAgent.match(/os\s+(\d+)_/);
        if (!match) {
            return false;
        }
        return parseInt(match[1], 10);
    };
    var isIOS = function () {
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
    var androidVersion = function () {
        var match = userAgent.match(/android\s([0-9\.]*)/);
        return match ? parseFloat(match[1]) : false;
    };
    // Downloaded from the Android Google play store.
    var isAndroidStockBrowser = function () {
        return isAndroid()
            && isChrome()
            && hasVersion()
            && !isFacebook(); // FB uses this browser, but deep links with custom URI scheme.
    };
    // Default browser for old Android and android Apps.
    var isAndroidNativeBrowser = function () {
        // Facebook in Anroid 4.4 uses this browser, by default but does the deep linking,
        // so lets check for facebook.
        return !isFacebook()
            && (isAndroid() && (appleWebKitVersion() && appleWebKitVersion() < 537)
                ||
                    (chromeVersion() && chromeVersion() < 37));
    };
    var hasVersion = function () {
        return userAgent.indexOf('version') > -1;
    };
    /**
     * @return
     *  Returns object with following property
     *  - boolean : If AppleKit Browser
     *  - version : AppleKit Browser Version.
     */
    var appleWebKitVersion = function () {
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
    };
}
exports.BrowserChecker = BrowserChecker;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BrowserChecker_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(2);
var CTAAppLaunchStrategy_1 = __webpack_require__(6);
var DirectAppLaunchStrategy_1 = __webpack_require__(3);
var UniversalLinkingAppLaunchStrategy_1 = __webpack_require__(7);
var AppLaunchNotSupportedStrategy_1 = __webpack_require__(8);
var DirectAppOnlyLaunchStrategy_1 = __webpack_require__(9);
var CTAIntentAppLaunchStrategy_1 = __webpack_require__(10);
var StrategyEnum;
(function (StrategyEnum) {
    StrategyEnum[StrategyEnum["cta"] = 0] = "cta";
    StrategyEnum[StrategyEnum["direct"] = 1] = "direct";
    StrategyEnum[StrategyEnum["ul"] = 2] = "ul";
    StrategyEnum[StrategyEnum["notsupported"] = 3] = "notsupported";
    StrategyEnum[StrategyEnum["directapponly"] = 4] = "directapponly";
    StrategyEnum[StrategyEnum["intent_cta"] = 5] = "intent_cta";
})(StrategyEnum = exports.StrategyEnum || (exports.StrategyEnum = {}));
function AppLaunchStrategyFactory(strategyType, settings) {
    var strategyParameters = AppLaunchStrategyParameterFactory(settings);
    var appLaunchStrategy;
    if (strategyType == StrategyEnum.cta || strategyType == undefined) {
        appLaunchStrategy = new CTAAppLaunchStrategy_1.CTAAppLaunchStrategy(strategyParameters);
    }
    else if (strategyType == StrategyEnum.direct) {
        appLaunchStrategy = new DirectAppLaunchStrategy_1.DirectAppLaunchStrategy(strategyParameters);
    }
    else if (strategyType == StrategyEnum.ul) {
        appLaunchStrategy = new UniversalLinkingAppLaunchStrategy_1.UniversalLinkingAppLaunchStrategy(strategyParameters);
    }
    else if (strategyType == StrategyEnum.notsupported) {
        appLaunchStrategy = new AppLaunchNotSupportedStrategy_1.AppLaunchNotSupportedStrategy(strategyParameters);
    }
    else if (strategyType == StrategyEnum.directapponly) {
        appLaunchStrategy = new DirectAppOnlyLaunchStrategy_1.DirectAppOnlyLaunchStrategy(strategyParameters);
    }
    else if (strategyType == StrategyEnum.intent_cta) {
        appLaunchStrategy = new CTAIntentAppLaunchStrategy_1.CTAIntentAppLaunchStrategy(strategyParameters);
    }
    else {
        throw new Error('Deeplinking: Unsupported deeplinking strategy type');
    }
    // if (Settings.debug && appLaunchStrategy) {
    //   __debug("AppLaunchStrategyType", strategyType);
    // }
    return appLaunchStrategy;
}
exports.AppLaunchStrategyFactory = AppLaunchStrategyFactory;
function AppLaunchStrategyParameterFactory(settings) {
    var strategyParameters = new AppLaunchStrategyParameters(settings);
    // let parameterType;
    var browserChecker = BrowserChecker_1.BrowserChecker();
    if (browserChecker.isIOS) {
        // parameterType = 'ios';
        strategyParameters = new IOSAppLaunchStrategyParameters(settings);
    }
    else if (browserChecker.isAndroid) {
        // parameterType = 'android';
        strategyParameters = new AndroidAppLaunchStrategyParameters(settings);
    }
    else {
        // parameterType = 'desktop or default';
        // strategyParameters = AppLaunchStrategyParameters;
    }
    // if (Settings.debug && strategyParameters) {
    //   __debug("AppLaunchParameter", parameterType);
    // }
    return strategyParameters;
}
exports.AppLaunchStrategyParameterFactory = AppLaunchStrategyParameterFactory;
;
var AppLaunchStrategyParameters = /** @class */ (function () {
    function AppLaunchStrategyParameters(settings) {
        this.settings = settings;
    }
    // On desktop, we don't know what to do.
    AppLaunchStrategyParameters.prototype.getAppUri = function () {
        return "#";
    };
    AppLaunchStrategyParameters.prototype.getAppLauncherEl = function () {
        if (!this.settings.appLauncherElId) {
            throw new Error('Settings does not have valid appLauncherElId');
        }
        return window.document.getElementById(this.settings.appLauncherElId);
    };
    // This message is displayed if any browser does not support deep linking.
    AppLaunchStrategyParameters.prototype.getNotSupportedMessage = function () {
        if (this.settings.appLauncherElId) {
            throw new Error('Settings does not have valid NotSupportedMessage');
        }
        return this.settings.notSupportedMessage;
    };
    //TODO: Campaign can be created as separate decorator/proxy object
    AppLaunchStrategyParameters.prototype.getCampaignValue = function () {
        return this.settings.campaignCode;
    };
    // Default Store URI, not sure where to go :).
    AppLaunchStrategyParameters.prototype.getAppStoreURI = function () {
        return "#";
    };
    AppLaunchStrategyParameters.prototype.getIntentURI = function () { return null; };
    AppLaunchStrategyParameters.prototype.getUniversalLinkingUrl = function () { return null; };
    return AppLaunchStrategyParameters;
}());
exports.AppLaunchStrategyParameters = AppLaunchStrategyParameters;
/**
 * @inherits AppLaunchStrategyParameters
 * Extends Base App Launch Strategy Parameters which are required for
 * Android App Launch Strategies.
 */
var AndroidAppLaunchStrategyParameters = /** @class */ (function (_super) {
    __extends(AndroidAppLaunchStrategyParameters, _super);
    function AndroidAppLaunchStrategyParameters(settings) {
        return _super.call(this, settings) || this;
    }
    AndroidAppLaunchStrategyParameters.prototype.getIntentURI = function () {
        return "intent://m/#Intent;scheme=" + this.settings.appUri + ";package=" + this.settings.androidAppId + ";end";
    };
    AndroidAppLaunchStrategyParameters.prototype.getAppUri = function () {
        return this.settings.appUri;
    };
    AndroidAppLaunchStrategyParameters.prototype.getAppStoreURI = function () {
        var campaignString = this.getCampaignValue() ? "&referrer=utm_source%3Dother%26utm_campaign%3D" + this.getCampaignValue() : "";
        return "https://play.google.com/store/apps/details?id=" + this.settings.androidAppId + campaignString;
    };
    return AndroidAppLaunchStrategyParameters;
}(AppLaunchStrategyParameters));
exports.AndroidAppLaunchStrategyParameters = AndroidAppLaunchStrategyParameters;
/**
 * Extends Base App Launch Strategy Parameters which are required for
 * Ios App Launch Strategies.
 */
var IOSAppLaunchStrategyParameters = /** @class */ (function (_super) {
    __extends(IOSAppLaunchStrategyParameters, _super);
    function IOSAppLaunchStrategyParameters(settings) {
        return _super.call(this, settings) || this;
    }
    IOSAppLaunchStrategyParameters.prototype.getAppStoreURI = function () {
        return this.getCampaignValue() ?
            Utils_1.appendQueryParameter(this.settings.iOsAppStore, 'ct', this.getCampaignValue()) : this.settings.iOsAppStore;
    };
    IOSAppLaunchStrategyParameters.prototype.getUniversalLinkingUrl = function () {
        return this.settings.universalLinkUrl;
    };
    IOSAppLaunchStrategyParameters.prototype.getAppUri = function () {
        if (!this.settings.appUri) {
            throw new Error('Settings does not have valid AppURI');
        }
        return this.settings.appUri;
    };
    return IOSAppLaunchStrategyParameters;
}(AppLaunchStrategyParameters));
exports.IOSAppLaunchStrategyParameters = IOSAppLaunchStrategyParameters;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Returns query string into key/pair array.
 * @param queryString string
 *  Raw Query string.
 * @returns []
 */
function getQueryString(queryString) {
    if (queryString == undefined) {
        queryString = window.location.search;
    }
    queryString = queryString.split('+').join(' ');
    var params = {};
    var tokens;
    var re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(queryString)) {
        var key = decodeURIComponent(tokens[1]);
        var value = decodeURIComponent(tokens[2]);
        params[key] = value;
    }
    return params;
}
exports.getQueryString = getQueryString;
function appendQueryParameter(url, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = url.indexOf('?') !== -1 ? "&" : "?";
    if (url.match(re)) {
        return url.replace(re, '$1' + key + "=" + value + '$2');
    }
    //TODO  Filter value against XSS.
    return url + separator + key + "=" + value;
}
exports.appendQueryParameter = appendQueryParameter;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var DirectAppLaunchStrategy = /** @class */ (function () {
    function DirectAppLaunchStrategy(strategyParameters) {
        this.events = ["pagehide", "blur", "beforeunload"];
        this.timeout = null;
        this.strategyParameters = strategyParameters;
        this.el = this.strategyParameters.getAppLauncherEl();
    }
    // Events that gets executed if page is transitioning away.
    DirectAppLaunchStrategy.prototype.preventDialog = function () {
        var _this = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = null;
        this.events.forEach(function (evname) {
            window.removeEventListener(evname, _this.preventDialog);
        });
    };
    DirectAppLaunchStrategy.prototype.init = function () {
        var _this = this;
        this.redirect();
        // If user navigates back to browser and clicks the button,
        // try redirecting again.
        // this.el.removeEventListener(click);
        this.el.addEventListener('click', function (e) {
            e.preventDefault();
            _this.redirect();
        });
    };
    DirectAppLaunchStrategy.prototype.redirect = function () {
        var _this = this;
        window.location.href = this.strategyParameters.getAppUri();
        this.events.forEach(function (evname) {
            window.addEventListener(evname, _this.preventDialog);
        });
        this.timeout = setTimeout(function () {
            window.top.location.href = _this.strategyParameters.getAppStoreURI();
        }, 1500);
    };
    return DirectAppLaunchStrategy;
}());
exports.DirectAppLaunchStrategy = DirectAppLaunchStrategy;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AppLauncherFactory_1 = __webpack_require__(5);
var BrowserChecker_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(2);
var AppLaunchStrategyFactory_1 = __webpack_require__(1);
var NativeAppLauncher = /** @class */ (function () {
    function NativeAppLauncher() {
    }
    NativeAppLauncher.prototype.init = function (settings) {
        this.Settings = settings;
        this.browserChecker = BrowserChecker_1.BrowserChecker();
        this.androidParameters = new AppLaunchStrategyFactory_1.AndroidAppLaunchStrategyParameters(this.Settings);
        this.iOSParameters = new AppLaunchStrategyFactory_1.IOSAppLaunchStrategyParameters(this.Settings);
        this.util = {
            getQueryString: Utils_1.getQueryString,
            appendQueryParameter: Utils_1.appendQueryParameter
        };
        // TODO: is this true?
        // Let all the page render finish.
        return new AppLauncherFactory_1.AppLauncherFactory(this.Settings).init();
    };
    return NativeAppLauncher;
}());
exports.NativeAppLauncher = NativeAppLauncher;
// TODO: no needed anymore probably.
// Element.prototype.matches =
//   Element.prototype.matches ||
//   Element.prototype.matchesSelector ||
//   Element.prototype.mozMatchesSelector ||
//   Element.prototype.msMatchesSelector ||
//   Element.prototype.oMatchesSelector ||
//   Element.prototype.webkitMatchesSelector ||
//   function (s) {
//     var matches = (this.document || this.ownerDocument).querySelectorAll(s),
//       i = matches.length;
//     while (--i >= 0 && matches.item(i) !== this) { }
//     return i > -1;
//   };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var BrowserChecker_1 = __webpack_require__(0);
var AppLaunchStrategyFactory_1 = __webpack_require__(1);
/**
* This is the main factory which creates the deeplinking strategy object based
* on the type of browser and its versions. Multiple instances of strategy will be created
* as we will require just one, but we don't have to worry about Garbage collection.
*
* @returns {AppLaunchStrategyFactory}
* @constructor
*/
var AppLauncherFactory = /** @class */ (function () {
    function AppLauncherFactory(settings) {
        this.settings = settings;
        this.browser = BrowserChecker_1.BrowserChecker();
        this.deepLinkingStrategy = this.assignStrategy(); // just to satisfy the compiler
        return this.deepLinkingStrategy;
    }
    AppLauncherFactory.prototype.assignStrategy = function () {
        // Default strategy.
        this.deepLinkingStrategy = AppLaunchStrategyFactory_1.AppLaunchStrategyFactory(AppLaunchStrategyFactory_1.StrategyEnum.cta, this.settings);
        if (this.browser.isIOS) {
            //deepLinkingStrategy = new AppLaunchStrategyFactory('cta');
            if (this.browser.iOSVersion < 9) {
                this.deepLinkingStrategy = AppLaunchStrategyFactory_1.AppLaunchStrategyFactory(AppLaunchStrategyFactory_1.StrategyEnum.direct, this.settings);
                if (this.browser.isTwitter) {
                    this.deepLinkingStrategy = AppLaunchStrategyFactory_1.AppLaunchStrategyFactory(AppLaunchStrategyFactory_1.StrategyEnum.directapponly, this.settings);
                }
            }
            else {
                this.deepLinkingStrategy = AppLaunchStrategyFactory_1.AppLaunchStrategyFactory(AppLaunchStrategyFactory_1.StrategyEnum.direct, this.settings);
                //this.deepLinkingStrategy = new AppLaunchStrategyFactory('ul');
                // Other strategy does not work on FB, other than ul.
                if (this.browser.isFacebook) {
                    this.deepLinkingStrategy = AppLaunchStrategyFactory_1.AppLaunchStrategyFactory(AppLaunchStrategyFactory_1.StrategyEnum.ul, this.settings);
                }
            }
        }
        else if (this.browser.isAndroid) {
            this.deepLinkingStrategy = AppLaunchStrategyFactory_1.AppLaunchStrategyFactory(AppLaunchStrategyFactory_1.StrategyEnum.intent_cta, this.settings);
            if (this.browser.isAndroidNativeBrowser || this.browser.isAndroidStockBrowser) {
                this.deepLinkingStrategy = AppLaunchStrategyFactory_1.AppLaunchStrategyFactory(AppLaunchStrategyFactory_1.StrategyEnum.notsupported, this.settings);
            }
        }
        return this.deepLinkingStrategy;
        // if (this.settings.debug == true) {
        //   __debug('browser', browser);
        // }
    };
    return AppLauncherFactory;
}());
exports.AppLauncherFactory = AppLauncherFactory;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var DirectAppLaunchStrategy_1 = __webpack_require__(3);
/**
 * This is Call to Action. Modern and recent browsers are moving towards this approach.
 * They are requiring user action to deep link to the app. First is assigns click event
 * to 'watch in app' link which will ultimately invoke DirectAppLaunchStrategy().
 *
 * @param strategyParameters
 * @constructor
 */
var CTAAppLaunchStrategy = /** @class */ (function () {
    function CTAAppLaunchStrategy(strategyParameters) {
        this.strategyParameters = strategyParameters;
    }
    CTAAppLaunchStrategy.prototype.init = function () {
        var directStrategy = new DirectAppLaunchStrategy_1.DirectAppLaunchStrategy(this.strategyParameters);
        var el = this.strategyParameters.getAppLauncherEl();
        var id = el.getAttribute('id');
        var body = window.document.querySelector('body');
        body.addEventListener('click', function (ev) {
            var el = ev.target;
            if (id) {
                if (el.matches("#" + id)) {
                    ev.preventDefault();
                    directStrategy.init();
                }
            }
        });
    };
    return CTAAppLaunchStrategy;
}());
exports.CTAAppLaunchStrategy = CTAAppLaunchStrategy;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var UniversalLinkingAppLaunchStrategy = /** @class */ (function () {
    function UniversalLinkingAppLaunchStrategy(strategyParameters) {
        this.strategyParameters = strategyParameters;
    }
    UniversalLinkingAppLaunchStrategy.prototype.init = function () {
        var _this = this;
        if (!this.strategyParameters.getUniversalLinkingUrl()) {
            //throw new Error('Universal Linking: Invalid url provided: ' + strategyParameters.getUniversalLinkingUrl());
            console.log("Error: Universal Linking: Invalid url provided: " + this.strategyParameters.getUniversalLinkingUrl());
        }
        var el = this.strategyParameters.getAppLauncherEl();
        var $cookieName = 'ul-app-detection-flag';
        var $location = this.strategyParameters.getUniversalLinkingUrl();
        if (this.appNotInstalled($cookieName)) {
            window.location.href = this.strategyParameters.getAppStoreURI();
            this.eraseCookie($cookieName);
        }
        el.setAttribute('href', $location);
        // If user navigates away/closes Fb Browser.
        window.addEventListener('blur', function () {
            _this.eraseCookie($cookieName);
        });
        this.setCookie($cookieName);
        el.addEventListener('click', function () {
            _this.setCookie($cookieName);
        });
    };
    // On blur will always clear the cookie, or when trying to
    // navigate to the app store, however, if user closes the fb directly,
    // then it assumes for 1 min that user does not have app installed if
    // app is not detected earlier and installed. If that happens within 1min
    // if user directly closes the fb, which means cookie still resides.
    UniversalLinkingAppLaunchStrategy.prototype.setCookie = function ($cookieName) {
        var $cookieValue = this.readCookie($cookieName);
        if (!$cookieValue || isNaN($cookieValue)) {
            // set for 1 min.
            this.createCookie($cookieName, 1, 60);
        }
        else {
            // set for 1 min.
            this.createCookie($cookieName, 2, 60);
        }
    };
    // If cookie value is greater than 1, that means user does not have app installed.
    UniversalLinkingAppLaunchStrategy.prototype.appNotInstalled = function ($cookieName) {
        return this.readCookie($cookieName) > 1;
    };
    UniversalLinkingAppLaunchStrategy.prototype.createCookie = function (name, value, second) {
        var date = new Date();
        date.setTime(date.getTime() + (second * 1000));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    UniversalLinkingAppLaunchStrategy.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return parseInt(c.substring(nameEQ.length, c.length));
            }
        }
        return 0;
    };
    UniversalLinkingAppLaunchStrategy.prototype.eraseCookie = function (name) {
        if (name === void 0) { name = ''; }
        this.createCookie(name, 0, -1);
    };
    return UniversalLinkingAppLaunchStrategy;
}());
exports.UniversalLinkingAppLaunchStrategy = UniversalLinkingAppLaunchStrategy;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * There are few browsers on Android which does not support both app launch
 * with 'intent' or 'custom uri scheme'. Not even CTA works on those browser.
 *
 * This just displays browser alert dialog box when 'Watch In App' button is clicked.
 * @param strategyParameters
 * @constructor
 */
var AppLaunchNotSupportedStrategy = /** @class */ (function () {
    function AppLaunchNotSupportedStrategy(strategyParameters) {
        this.strategyParameters = strategyParameters;
    }
    AppLaunchNotSupportedStrategy.prototype.init = function () {
        var _this = this;
        var el = this.strategyParameters.getAppLauncherEl();
        // const id = el.getAttribute('id');
        el.addEventListener('click', function (e) {
            e.preventDefault();
            var message = _this.strategyParameters.getNotSupportedMessage() ?
                _this.strategyParameters.getNotSupportedMessage() : 'Not Supported';
            alert(message);
        });
    };
    return AppLaunchNotSupportedStrategy;
}());
exports.AppLaunchNotSupportedStrategy = AppLaunchNotSupportedStrategy;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * This just tries to redirect to app, not to the app store, as
 * twitter io8 browser does open both app and app store which is not
 * a good user experience. If user does not have app installed, they will just
 * they will have to click to download app button manually to go to app store.
 *
 * Eg, Quora does the same.
 */
var DirectAppOnlyLaunchStrategy = /** @class */ (function () {
    function DirectAppOnlyLaunchStrategy(strategyParameters) {
        this.strategyParameters = strategyParameters;
    }
    DirectAppOnlyLaunchStrategy.prototype.init = function () {
        var el = this.strategyParameters.getAppLauncherEl();
        var appURI = this.strategyParameters.getAppUri();
        el.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.reload();
        });
        window.location.href = appURI;
    };
    return DirectAppOnlyLaunchStrategy;
}());
exports.DirectAppOnlyLaunchStrategy = DirectAppOnlyLaunchStrategy;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * This is only used for android devices as, they understand the "Intent" URI
 * which automatically resolves the app installation state and redirects users accordingly.
 * With This strategy, we cannot pass the campaign id, if user is being redirect to app store.

 * @param strategyParameters
 * @constructor
 */
var CTAIntentAppLaunchStrategy = /** @class */ (function () {
    function CTAIntentAppLaunchStrategy(strategyParameters) {
        this.strategyParameters = strategyParameters;
    }
    CTAIntentAppLaunchStrategy.prototype.init = function () {
        var el = this.strategyParameters.getAppLauncherEl();
        el.setAttribute('href', this.strategyParameters.getIntentURI());
    };
    return CTAIntentAppLaunchStrategy;
}());
exports.CTAIntentAppLaunchStrategy = CTAIntentAppLaunchStrategy;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzM0YWQzYjllNzgzMTU5ZGY1Y2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9Ccm93c2VyQ2hlY2tlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL0FwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL1V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZXAtbGluay10by1uYXRpdmUtYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvQXBwTGF1bmNoZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvQ1RBQXBwTGF1bmNoU3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9Vbml2ZXJzYWxMaW5raW5nQXBwTGF1bmNoU3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9BcHBMYXVuY2hOb3RTdXBwb3J0ZWRTdHJhdGVneS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL0RpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL0NUQUludGVudEFwcExhdW5jaFN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7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Q0gsaUNBQUM7QUFBRCxDQUFDO0FBTlksZ0VBQTBCIiwiZmlsZSI6ImRlZXBsaW5rVG9OYXRpdmVBcHAtZnJvbS10eXBlc2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzM0YWQzYjllNzgzMTU5ZGY1Y2UiLCJleHBvcnQgZnVuY3Rpb24gQnJvd3NlckNoZWNrZXIoKSB7XG4gICAgdmFyIHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGlPU1ZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaXNJT1MoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9vc1xccysoXFxkKylfLyk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKVxuICAgIH07XG4gICAgdmFyIGlzSU9TID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gLyg/OmkoPzpwaG9uZXxwKD86b3xhKWQpKS8udGVzdCh1c2VyQWdlbnQpO1xuICAgIH07XG5cbiAgICB2YXIgaXNGYWNlYm9vayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEhdXNlckFnZW50Lm1hdGNoKC9GQkFWL2kpO1xuICAgIH07XG5cbiAgICB2YXIgaXNDaHJvbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB1c2VyQWdlbnQuaW5kZXhPZignY2hyb21lJykgPiAtMTtcbiAgICB9O1xuXG4gICAgdmFyIGNocm9tZVZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYXcgPSB1c2VyQWdlbnQubWF0Y2goL2Nocm9tKGV8aXVtKVxcLyhbMC05XSspXFwuLyk7XG4gICAgICAgIHJldHVybiByYXcgPyBwYXJzZUludChyYXdbMl0sIDEwKSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICB2YXIgaXNUd2l0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdXNlckFnZW50LmluZGV4T2YoJ3R3aXR0ZXInKSA+IC0xO1xuICAgIH07XG5cbiAgICB2YXIgaXNBbmRyb2lkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgIC8vIFRoaXMgaXMgdG8gY2hlY2sgQW5kcm9pZCBNb2JpbGUuXG4gICAgICAgICByZXR1cm4gdXNlckFnZW50LmluZGV4T2YoJ2FuZHJvaWQnKSA+IC0xXG4gICAgICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xXG4gICAgICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xO1xuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHVzZXJBZ2VudC5pbmRleE9mKCdhbmRyb2lkJykgPiAtMTtcbiAgICB9O1xuXG4gICAgdmFyIGFuZHJvaWRWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL2FuZHJvaWRcXHMoWzAtOVxcLl0qKS8pO1xuICAgICAgICByZXR1cm4gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzFdKSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICAvLyBEb3dubG9hZGVkIGZyb20gdGhlIEFuZHJvaWQgR29vZ2xlIHBsYXkgc3RvcmUuXG4gICAgdmFyIGlzQW5kcm9pZFN0b2NrQnJvd3NlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzQW5kcm9pZCgpXG4gICAgICAgICAgICAmJiBpc0Nocm9tZSgpXG4gICAgICAgICAgICAmJiBoYXNWZXJzaW9uKClcbiAgICAgICAgICAgICYmICFpc0ZhY2Vib29rKCk7IC8vIEZCIHVzZXMgdGhpcyBicm93c2VyLCBidXQgZGVlcCBsaW5rcyB3aXRoIGN1c3RvbSBVUkkgc2NoZW1lLlxuXG4gICAgfTtcblxuICAgIC8vIERlZmF1bHQgYnJvd3NlciBmb3Igb2xkIEFuZHJvaWQgYW5kIGFuZHJvaWQgQXBwcy5cbiAgICB2YXIgaXNBbmRyb2lkTmF0aXZlQnJvd3NlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gRmFjZWJvb2sgaW4gQW5yb2lkIDQuNCB1c2VzIHRoaXMgYnJvd3NlciwgYnkgZGVmYXVsdCBidXQgZG9lcyB0aGUgZGVlcCBsaW5raW5nLFxuICAgICAgICAvLyBzbyBsZXRzIGNoZWNrIGZvciBmYWNlYm9vay5cbiAgICAgICAgcmV0dXJuICFpc0ZhY2Vib29rKClcbiAgICAgICAgICAgICYmIChpc0FuZHJvaWQoKSAmJiAoYXBwbGVXZWJLaXRWZXJzaW9uKCkgJiYgYXBwbGVXZWJLaXRWZXJzaW9uKCkgPCA1MzcpXG4gICAgICAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICAoY2hyb21lVmVyc2lvbigpICYmIGNocm9tZVZlcnNpb24oKSA8IDM3KSk7XG4gICAgfTtcblxuICAgIHZhciBoYXNWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdXNlckFnZW50LmluZGV4T2YoJ3ZlcnNpb24nKSA+IC0xO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuXG4gICAgICogIFJldHVybnMgb2JqZWN0IHdpdGggZm9sbG93aW5nIHByb3BlcnR5XG4gICAgICogIC0gYm9vbGVhbiA6IElmIEFwcGxlS2l0IEJyb3dzZXJcbiAgICAgKiAgLSB2ZXJzaW9uIDogQXBwbGVLaXQgQnJvd3NlciBWZXJzaW9uLlxuICAgICAqL1xuICAgIHZhciBhcHBsZVdlYktpdFZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oW1xcZC5dKykvKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoID8gcGFyc2VGbG9hdChtYXRjaFsxXSkgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNJT1M6IGlzSU9TKCksXG4gICAgICAgIGlPU1ZlcnNpb246IGlPU1ZlcnNpb24oKSxcbiAgICAgICAgaXNBbmRyb2lkOiBpc0FuZHJvaWQoKSxcbiAgICAgICAgYW5kcm9pZFZlcnNpb246IGFuZHJvaWRWZXJzaW9uKCksXG4gICAgICAgIGlzQW5kcm9pZFN0b2NrQnJvd3NlcjogaXNBbmRyb2lkU3RvY2tCcm93c2VyKCksXG4gICAgICAgIGlzQW5kcm9pZE5hdGl2ZUJyb3dzZXI6IGlzQW5kcm9pZE5hdGl2ZUJyb3dzZXIoKSxcbiAgICAgICAgaXNGYWNlYm9vazogaXNGYWNlYm9vaygpLFxuICAgICAgICBpc0Nocm9tZTogaXNDaHJvbWUoKSxcbiAgICAgICAgaXNUd2l0dGVyOiBpc1R3aXR0ZXIoKVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvQnJvd3NlckNoZWNrZXIudHMiLCJpbXBvcnQgeyBCcm93c2VyQ2hlY2tlciB9IGZyb20gJy4vQnJvd3NlckNoZWNrZXInO1xuaW1wb3J0IHsgYXBwZW5kUXVlcnlQYXJhbWV0ZXIgfSBmcm9tICcuL1V0aWxzJztcbmltcG9ydCB7IENUQUFwcExhdW5jaFN0cmF0ZWd5IH0gZnJvbSAnLi9DVEFBcHBMYXVuY2hTdHJhdGVneSc7XG5pbXBvcnQgeyBEaXJlY3RBcHBMYXVuY2hTdHJhdGVneSB9IGZyb20gJy4vRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3knO1xuaW1wb3J0IHsgVW5pdmVyc2FsTGlua2luZ0FwcExhdW5jaFN0cmF0ZWd5IH0gZnJvbSAnLi9Vbml2ZXJzYWxMaW5raW5nQXBwTGF1bmNoU3RyYXRlZ3knO1xuaW1wb3J0IHsgQXBwTGF1bmNoTm90U3VwcG9ydGVkU3RyYXRlZ3kgfSBmcm9tICcuL0FwcExhdW5jaE5vdFN1cHBvcnRlZFN0cmF0ZWd5JztcbmltcG9ydCB7IERpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneSB9IGZyb20gJy4vRGlyZWN0QXBwT25seUxhdW5jaFN0cmF0ZWd5JztcbmltcG9ydCB7IENUQUludGVudEFwcExhdW5jaFN0cmF0ZWd5IH0gZnJvbSAnLi9DVEFJbnRlbnRBcHBMYXVuY2hTdHJhdGVneSc7XG5leHBvcnQgZW51bSBTdHJhdGVneUVudW0ge1xuICBjdGEsXG4gIGRpcmVjdCxcbiAgdWwsXG4gIG5vdHN1cHBvcnRlZCxcbiAgZGlyZWN0YXBwb25seSxcbiAgaW50ZW50X2N0YVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5KHN0cmF0ZWd5VHlwZTogU3RyYXRlZ3lFbnVtLCBzZXR0aW5nczogYW55KSB7XG4gIGNvbnN0IHN0cmF0ZWd5UGFyYW1ldGVycyA9IEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVyRmFjdG9yeShzZXR0aW5ncyk7XG4gIGxldCBhcHBMYXVuY2hTdHJhdGVneTtcblxuICBpZiAoc3RyYXRlZ3lUeXBlID09IFN0cmF0ZWd5RW51bS5jdGEgfHwgc3RyYXRlZ3lUeXBlID09IHVuZGVmaW5lZCkge1xuICAgIGFwcExhdW5jaFN0cmF0ZWd5ID0gbmV3IENUQUFwcExhdW5jaFN0cmF0ZWd5KHN0cmF0ZWd5UGFyYW1ldGVycyk7XG4gIH0gZWxzZSBpZiAoc3RyYXRlZ3lUeXBlID09IFN0cmF0ZWd5RW51bS5kaXJlY3QpIHtcbiAgICBhcHBMYXVuY2hTdHJhdGVneSA9IG5ldyBEaXJlY3RBcHBMYXVuY2hTdHJhdGVneShzdHJhdGVneVBhcmFtZXRlcnMpO1xuICB9IGVsc2UgaWYgKHN0cmF0ZWd5VHlwZSA9PSBTdHJhdGVneUVudW0udWwpIHtcbiAgICBhcHBMYXVuY2hTdHJhdGVneSA9IG5ldyBVbml2ZXJzYWxMaW5raW5nQXBwTGF1bmNoU3RyYXRlZ3koc3RyYXRlZ3lQYXJhbWV0ZXJzKTtcbiAgfSBlbHNlIGlmIChzdHJhdGVneVR5cGUgPT0gU3RyYXRlZ3lFbnVtLm5vdHN1cHBvcnRlZCkge1xuICAgIGFwcExhdW5jaFN0cmF0ZWd5ID0gbmV3IEFwcExhdW5jaE5vdFN1cHBvcnRlZFN0cmF0ZWd5KHN0cmF0ZWd5UGFyYW1ldGVycyk7XG4gIH0gZWxzZSBpZiAoc3RyYXRlZ3lUeXBlID09IFN0cmF0ZWd5RW51bS5kaXJlY3RhcHBvbmx5KSB7XG4gICAgYXBwTGF1bmNoU3RyYXRlZ3kgPSBuZXcgRGlyZWN0QXBwT25seUxhdW5jaFN0cmF0ZWd5KHN0cmF0ZWd5UGFyYW1ldGVycyk7XG4gIH0gZWxzZSBpZiAoc3RyYXRlZ3lUeXBlID09IFN0cmF0ZWd5RW51bS5pbnRlbnRfY3RhKSB7XG4gICAgYXBwTGF1bmNoU3RyYXRlZ3kgPSBuZXcgQ1RBSW50ZW50QXBwTGF1bmNoU3RyYXRlZ3koc3RyYXRlZ3lQYXJhbWV0ZXJzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlZXBsaW5raW5nOiBVbnN1cHBvcnRlZCBkZWVwbGlua2luZyBzdHJhdGVneSB0eXBlJyk7XG4gIH1cblxuICAvLyBpZiAoU2V0dGluZ3MuZGVidWcgJiYgYXBwTGF1bmNoU3RyYXRlZ3kpIHtcbiAgLy8gICBfX2RlYnVnKFwiQXBwTGF1bmNoU3RyYXRlZ3lUeXBlXCIsIHN0cmF0ZWd5VHlwZSk7XG4gIC8vIH1cbiAgcmV0dXJuIGFwcExhdW5jaFN0cmF0ZWd5O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHBMYXVuY2hTdHJhdGVneVBhcmFtZXRlckZhY3Rvcnkoc2V0dGluZ3M6IGFueSkge1xuICBsZXQgc3RyYXRlZ3lQYXJhbWV0ZXJzID0gbmV3IEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyhzZXR0aW5ncyk7XG4gIC8vIGxldCBwYXJhbWV0ZXJUeXBlO1xuICBjb25zdCBicm93c2VyQ2hlY2tlciA9IEJyb3dzZXJDaGVja2VyKCk7XG4gIGlmIChicm93c2VyQ2hlY2tlci5pc0lPUykge1xuICAgIC8vIHBhcmFtZXRlclR5cGUgPSAnaW9zJztcbiAgICBzdHJhdGVneVBhcmFtZXRlcnMgPSBuZXcgSU9TQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzKHNldHRpbmdzKTtcbiAgfSBlbHNlIGlmIChicm93c2VyQ2hlY2tlci5pc0FuZHJvaWQpIHtcbiAgICAvLyBwYXJhbWV0ZXJUeXBlID0gJ2FuZHJvaWQnO1xuICAgIHN0cmF0ZWd5UGFyYW1ldGVycyA9IG5ldyBBbmRyb2lkQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzKHNldHRpbmdzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBwYXJhbWV0ZXJUeXBlID0gJ2Rlc2t0b3Agb3IgZGVmYXVsdCc7XG4gICAgLy8gc3RyYXRlZ3lQYXJhbWV0ZXJzID0gQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzO1xuICB9XG5cbiAgLy8gaWYgKFNldHRpbmdzLmRlYnVnICYmIHN0cmF0ZWd5UGFyYW1ldGVycykge1xuICAvLyAgIF9fZGVidWcoXCJBcHBMYXVuY2hQYXJhbWV0ZXJcIiwgcGFyYW1ldGVyVHlwZSk7XG4gIC8vIH1cbiAgcmV0dXJuIHN0cmF0ZWd5UGFyYW1ldGVycztcbn07XG5cblxuZXhwb3J0IGNsYXNzIEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyB7XG4gIHB1YmxpYyBzZXR0aW5nczogYW55O1xuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogYW55KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICB9XG4gIC8vIE9uIGRlc2t0b3AsIHdlIGRvbid0IGtub3cgd2hhdCB0byBkby5cbiAgZ2V0QXBwVXJpKCkge1xuICAgIHJldHVybiBcIiNcIjtcbiAgfVxuICBnZXRBcHBMYXVuY2hlckVsKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmFwcExhdW5jaGVyRWxJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZXR0aW5ncyBkb2VzIG5vdCBoYXZlIHZhbGlkIGFwcExhdW5jaGVyRWxJZCcpO1xuICAgIH1cbiAgICByZXR1cm4gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuYXBwTGF1bmNoZXJFbElkKTtcbiAgfVxuXG4gIC8vIFRoaXMgbWVzc2FnZSBpcyBkaXNwbGF5ZWQgaWYgYW55IGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBkZWVwIGxpbmtpbmcuXG4gIGdldE5vdFN1cHBvcnRlZE1lc3NhZ2UoKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYXBwTGF1bmNoZXJFbElkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NldHRpbmdzIGRvZXMgbm90IGhhdmUgdmFsaWQgTm90U3VwcG9ydGVkTWVzc2FnZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5ub3RTdXBwb3J0ZWRNZXNzYWdlO1xuICB9XG5cbiAgLy9UT0RPOiBDYW1wYWlnbiBjYW4gYmUgY3JlYXRlZCBhcyBzZXBhcmF0ZSBkZWNvcmF0b3IvcHJveHkgb2JqZWN0XG4gIGdldENhbXBhaWduVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuY2FtcGFpZ25Db2RlO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBTdG9yZSBVUkksIG5vdCBzdXJlIHdoZXJlIHRvIGdvIDopLlxuICBnZXRBcHBTdG9yZVVSSSgpIHtcbiAgICByZXR1cm4gXCIjXCI7XG4gIH1cblxuICBnZXRJbnRlbnRVUkkoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiBudWxsOyB9XG4gIGdldFVuaXZlcnNhbExpbmtpbmdVcmwoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiBudWxsOyB9XG59XG5cblxuLyoqXG4gKiBAaW5oZXJpdHMgQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzXG4gKiBFeHRlbmRzIEJhc2UgQXBwIExhdW5jaCBTdHJhdGVneSBQYXJhbWV0ZXJzIHdoaWNoIGFyZSByZXF1aXJlZCBmb3JcbiAqIEFuZHJvaWQgQXBwIExhdW5jaCBTdHJhdGVnaWVzLlxuICovXG5leHBvcnQgY2xhc3MgQW5kcm9pZEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyBleHRlbmRzIEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzOiBhbnkpIHtcbiAgICBzdXBlcihzZXR0aW5ncyk7XG4gIH1cbiAgZ2V0SW50ZW50VVJJKCkge1xuICAgIHJldHVybiBcImludGVudDovL20vI0ludGVudDtzY2hlbWU9XCIgKyB0aGlzLnNldHRpbmdzLmFwcFVyaSArIFwiO3BhY2thZ2U9XCIgKyB0aGlzLnNldHRpbmdzLmFuZHJvaWRBcHBJZCArIFwiO2VuZFwiO1xuICB9XG4gIGdldEFwcFVyaSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5hcHBVcmk7XG4gIH1cbiAgZ2V0QXBwU3RvcmVVUkkoKSB7XG4gICAgdmFyIGNhbXBhaWduU3RyaW5nID0gdGhpcy5nZXRDYW1wYWlnblZhbHVlKCkgPyBcIiZyZWZlcnJlcj11dG1fc291cmNlJTNEb3RoZXIlMjZ1dG1fY2FtcGFpZ24lM0RcIiArIHRoaXMuZ2V0Q2FtcGFpZ25WYWx1ZSgpIDogXCJcIjtcbiAgICByZXR1cm4gXCJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS9zdG9yZS9hcHBzL2RldGFpbHM/aWQ9XCIgKyB0aGlzLnNldHRpbmdzLmFuZHJvaWRBcHBJZCArIGNhbXBhaWduU3RyaW5nO1xuICB9XG59XG5cbi8qKlxuICogRXh0ZW5kcyBCYXNlIEFwcCBMYXVuY2ggU3RyYXRlZ3kgUGFyYW1ldGVycyB3aGljaCBhcmUgcmVxdWlyZWQgZm9yXG4gKiBJb3MgQXBwIExhdW5jaCBTdHJhdGVnaWVzLlxuICovXG5leHBvcnQgY2xhc3MgSU9TQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzIGV4dGVuZHMgQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IGFueSkge1xuICAgIHN1cGVyKHNldHRpbmdzKTtcbiAgfVxuICBnZXRBcHBTdG9yZVVSSSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYW1wYWlnblZhbHVlKCkgP1xuICAgICAgYXBwZW5kUXVlcnlQYXJhbWV0ZXIodGhpcy5zZXR0aW5ncy5pT3NBcHBTdG9yZSwgJ2N0JywgdGhpcy5nZXRDYW1wYWlnblZhbHVlKCkpIDogdGhpcy5zZXR0aW5ncy5pT3NBcHBTdG9yZTtcbiAgfVxuXG4gIGdldFVuaXZlcnNhbExpbmtpbmdVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudW5pdmVyc2FsTGlua1VybDtcbiAgfVxuXG4gIGdldEFwcFVyaSgpIHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuYXBwVXJpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NldHRpbmdzIGRvZXMgbm90IGhhdmUgdmFsaWQgQXBwVVJJJylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuYXBwVXJpO1xuICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvQXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5LnRzIiwiLyoqXG4gKiBSZXR1cm5zIHF1ZXJ5IHN0cmluZyBpbnRvIGtleS9wYWlyIGFycmF5LlxuICogQHBhcmFtIHF1ZXJ5U3RyaW5nIHN0cmluZ1xuICogIFJhdyBRdWVyeSBzdHJpbmcuXG4gKiBAcmV0dXJucyBbXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVlcnlTdHJpbmcocXVlcnlTdHJpbmc6IHN0cmluZyk6IG9iamVjdCB7XG4gIGlmIChxdWVyeVN0cmluZyA9PSB1bmRlZmluZWQpIHtcbiAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIH1cblxuICBxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnNwbGl0KCcrJykuam9pbignICcpO1xuICBjb25zdCBwYXJhbXMgPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuICBsZXQgdG9rZW5zO1xuICBsZXQgcmUgPSAvWz8mXT8oW149XSspPShbXiZdKikvZztcbiAgd2hpbGUgKHRva2VucyA9IHJlLmV4ZWMocXVlcnlTdHJpbmcpKSB7XG4gICAgY29uc3Qga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1sxXSk7XG4gICAgY29uc3QgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodG9rZW5zWzJdKTtcbiAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRRdWVyeVBhcmFtZXRlcih1cmw6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgbGV0IHJlID0gbmV3IFJlZ0V4cChcIihbPyZdKVwiICsga2V5ICsgXCI9Lio/KCZ8JClcIiwgXCJpXCIpO1xuICBjb25zdCBzZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpICE9PSAtMSA/IFwiJlwiIDogXCI/XCI7XG4gIGlmICh1cmwubWF0Y2gocmUpKSB7XG4gICAgcmV0dXJuIHVybC5yZXBsYWNlKHJlLCAnJDEnICsga2V5ICsgXCI9XCIgKyB2YWx1ZSArICckMicpO1xuICB9XG4gIC8vVE9ETyAgRmlsdGVyIHZhbHVlIGFnYWluc3QgWFNTLlxuICByZXR1cm4gdXJsICsgc2VwYXJhdG9yICsga2V5ICsgXCI9XCIgKyB2YWx1ZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvVXRpbHMudHMiLCJleHBvcnQgY2xhc3MgRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3kge1xuICBzdHJhdGVneVBhcmFtZXRlcnM6IGFueTtcbiAgZXZlbnRzID0gW1wicGFnZWhpZGVcIiwgXCJibHVyXCIsIFwiYmVmb3JldW5sb2FkXCJdO1xuICB0aW1lb3V0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgZWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHN0cmF0ZWd5UGFyYW1ldGVyczogYW55KSB7XG4gICAgdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMgPSBzdHJhdGVneVBhcmFtZXRlcnM7XG4gICAgdGhpcy5lbCA9IHRoaXMuc3RyYXRlZ3lQYXJhbWV0ZXJzLmdldEFwcExhdW5jaGVyRWwoKTtcbiAgfVxuICAvLyBFdmVudHMgdGhhdCBnZXRzIGV4ZWN1dGVkIGlmIHBhZ2UgaXMgdHJhbnNpdGlvbmluZyBhd2F5LlxuICBwcmV2ZW50RGlhbG9nKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH1cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKGV2bmFtZSkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZuYW1lLCB0aGlzLnByZXZlbnREaWFsb2cpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnJlZGlyZWN0KCk7XG4gICAgLy8gSWYgdXNlciBuYXZpZ2F0ZXMgYmFjayB0byBicm93c2VyIGFuZCBjbGlja3MgdGhlIGJ1dHRvbixcbiAgICAvLyB0cnkgcmVkaXJlY3RpbmcgYWdhaW4uXG4gICAgLy8gdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKGNsaWNrKTtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMucmVkaXJlY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVkaXJlY3QoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRBcHBVcmkoKTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKChldm5hbWUpID0+IHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2bmFtZSwgdGhpcy5wcmV2ZW50RGlhbG9nKTtcbiAgICB9KTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmID0gdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMuZ2V0QXBwU3RvcmVVUkkoKTtcbiAgICB9LCAxNTAwKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9EaXJlY3RBcHBMYXVuY2hTdHJhdGVneS50cyIsImltcG9ydCB7IEFwcExhdW5jaGVyRmFjdG9yeSB9IGZyb20gJy4vbGliL0FwcExhdW5jaGVyRmFjdG9yeSc7XG5pbXBvcnQgeyBCcm93c2VyQ2hlY2tlciB9IGZyb20gJy4vbGliL0Jyb3dzZXJDaGVja2VyJztcbmltcG9ydCB7IGdldFF1ZXJ5U3RyaW5nLCBhcHBlbmRRdWVyeVBhcmFtZXRlciB9IGZyb20gJy4vbGliL1V0aWxzJztcbmltcG9ydCB7IEFuZHJvaWRBcHBMYXVuY2hTdHJhdGVneVBhcmFtZXRlcnMsIElPU0FwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyB9IGZyb20gJy4vbGliL0FwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBOYXRpdmVBcHBMYXVuY2hlciB7XG4gIGJyb3dzZXJDaGVja2VyOiBhbnk7XG4gIGFuZHJvaWRQYXJhbWV0ZXJzOiBhbnk7XG4gIGlPU1BhcmFtZXRlcnM6IGFueTtcbiAgdXRpbDogYW55O1xuICBwcml2YXRlIFNldHRpbmdzOiBhbnk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBpbml0KHNldHRpbmdzOiBhbnkpIHtcbiAgICB0aGlzLlNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgICB0aGlzLmJyb3dzZXJDaGVja2VyID0gQnJvd3NlckNoZWNrZXIoKTtcbiAgICB0aGlzLmFuZHJvaWRQYXJhbWV0ZXJzID0gbmV3IEFuZHJvaWRBcHBMYXVuY2hTdHJhdGVneVBhcmFtZXRlcnModGhpcy5TZXR0aW5ncyk7XG4gICAgdGhpcy5pT1NQYXJhbWV0ZXJzID0gbmV3IElPU0FwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyh0aGlzLlNldHRpbmdzKTtcbiAgICB0aGlzLnV0aWwgPSB7XG4gICAgICBnZXRRdWVyeVN0cmluZyxcbiAgICAgIGFwcGVuZFF1ZXJ5UGFyYW1ldGVyXG4gICAgfTtcblxuICAgIC8vIFRPRE86IGlzIHRoaXMgdHJ1ZT9cbiAgICAvLyBMZXQgYWxsIHRoZSBwYWdlIHJlbmRlciBmaW5pc2guXG4gICAgcmV0dXJuIG5ldyBBcHBMYXVuY2hlckZhY3RvcnkodGhpcy5TZXR0aW5ncykuaW5pdCgpO1xuICB9XG59XG5cbi8vIFRPRE86IG5vIG5lZWRlZCBhbnltb3JlIHByb2JhYmx5LlxuLy8gRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9XG4vLyAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHxcbi8vICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlc1NlbGVjdG9yIHx8XG4vLyAgIEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuLy8gICBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fFxuLy8gICBFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4vLyAgIEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuLy8gICBmdW5jdGlvbiAocykge1xuLy8gICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHMpLFxuLy8gICAgICAgaSA9IG1hdGNoZXMubGVuZ3RoO1xuLy8gICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IHRoaXMpIHsgfVxuLy8gICAgIHJldHVybiBpID4gLTE7XG4vLyAgIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVlcC1saW5rLXRvLW5hdGl2ZS1hcHAudHMiLCJpbXBvcnQgeyBCcm93c2VyQ2hlY2tlciB9IGZyb20gJy4vQnJvd3NlckNoZWNrZXInO1xuaW1wb3J0IHsgQXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5LCBTdHJhdGVneUVudW0gfSBmcm9tICcuL0FwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeSc7XG5pbXBvcnQgeyBDVEFBcHBMYXVuY2hTdHJhdGVneSB9IGZyb20gJy4vQ1RBQXBwTGF1bmNoU3RyYXRlZ3knO1xuaW1wb3J0IHsgRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3kgfSBmcm9tICcuL0RpcmVjdEFwcExhdW5jaFN0cmF0ZWd5JztcbmltcG9ydCB7IFVuaXZlcnNhbExpbmtpbmdBcHBMYXVuY2hTdHJhdGVneSB9IGZyb20gJy4vVW5pdmVyc2FsTGlua2luZ0FwcExhdW5jaFN0cmF0ZWd5JztcbmltcG9ydCB7IEFwcExhdW5jaE5vdFN1cHBvcnRlZFN0cmF0ZWd5IH0gZnJvbSAnLi9BcHBMYXVuY2hOb3RTdXBwb3J0ZWRTdHJhdGVneSc7XG5pbXBvcnQgeyBEaXJlY3RBcHBPbmx5TGF1bmNoU3RyYXRlZ3kgfSBmcm9tICcuL0RpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneSc7XG5pbXBvcnQgeyBDVEFJbnRlbnRBcHBMYXVuY2hTdHJhdGVneSB9IGZyb20gJy4vQ1RBSW50ZW50QXBwTGF1bmNoU3RyYXRlZ3knO1xuLyoqXG4qIFRoaXMgaXMgdGhlIG1haW4gZmFjdG9yeSB3aGljaCBjcmVhdGVzIHRoZSBkZWVwbGlua2luZyBzdHJhdGVneSBvYmplY3QgYmFzZWRcbiogb24gdGhlIHR5cGUgb2YgYnJvd3NlciBhbmQgaXRzIHZlcnNpb25zLiBNdWx0aXBsZSBpbnN0YW5jZXMgb2Ygc3RyYXRlZ3kgd2lsbCBiZSBjcmVhdGVkXG4qIGFzIHdlIHdpbGwgcmVxdWlyZSBqdXN0IG9uZSwgYnV0IHdlIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgR2FyYmFnZSBjb2xsZWN0aW9uLlxuKlxuKiBAcmV0dXJucyB7QXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5fVxuKiBAY29uc3RydWN0b3JcbiovXG5leHBvcnQgY2xhc3MgQXBwTGF1bmNoZXJGYWN0b3J5IHtcbiAgLy8gRklYTUU6IG1ha2UgdGhpcyBjbGFzcyBhYnN0cmFjdCBzbyB0aGF0IGl0IGNvdWxkIHJldHVybiBvbmUgb2YgdGhlIHN1YiBzdHJhdGVneSB0eXBlc1xuICBbeDogc3RyaW5nXTogYW55OyAvLyBqdXN0IGEgcXVpY2sgZml4IDooXG4gIHByaXZhdGUgYnJvd3NlcjogYW55O1xuICBwcml2YXRlIGRlZXBMaW5raW5nU3RyYXRlZ3k6IENUQUFwcExhdW5jaFN0cmF0ZWd5IHwgRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3kgfCBVbml2ZXJzYWxMaW5raW5nQXBwTGF1bmNoU3RyYXRlZ3kgfCBBcHBMYXVuY2hOb3RTdXBwb3J0ZWRTdHJhdGVneSB8IERpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneSB8IENUQUludGVudEFwcExhdW5jaFN0cmF0ZWd5O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2V0dGluZ3M6IGFueSkge1xuICAgIHRoaXMuYnJvd3NlciA9IEJyb3dzZXJDaGVja2VyKCk7XG4gICAgdGhpcy5kZWVwTGlua2luZ1N0cmF0ZWd5ID0gIHRoaXMuYXNzaWduU3RyYXRlZ3koKTsgLy8ganVzdCB0byBzYXRpc2Z5IHRoZSBjb21waWxlclxuICAgIHJldHVybiB0aGlzLmRlZXBMaW5raW5nU3RyYXRlZ3kgYXMgYW55O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3NpZ25TdHJhdGVneSgpIHtcbiAgICAvLyBEZWZhdWx0IHN0cmF0ZWd5LlxuICAgIHRoaXMuZGVlcExpbmtpbmdTdHJhdGVneSA9IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeShTdHJhdGVneUVudW0uY3RhLCB0aGlzLnNldHRpbmdzKTtcbiAgICBpZiAodGhpcy5icm93c2VyLmlzSU9TKSB7XG4gICAgICAvL2RlZXBMaW5raW5nU3RyYXRlZ3kgPSBuZXcgQXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5KCdjdGEnKTtcbiAgICAgIGlmICh0aGlzLmJyb3dzZXIuaU9TVmVyc2lvbiA8IDkpIHtcbiAgICAgICAgdGhpcy5kZWVwTGlua2luZ1N0cmF0ZWd5ID0gQXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5KFN0cmF0ZWd5RW51bS5kaXJlY3QsIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICBpZiAodGhpcy5icm93c2VyLmlzVHdpdHRlcikge1xuICAgICAgICAgIHRoaXMuZGVlcExpbmtpbmdTdHJhdGVneSA9IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeShTdHJhdGVneUVudW0uZGlyZWN0YXBwb25seSwgdGhpcy5zZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIElPUyA+PSA5LlxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZGVlcExpbmtpbmdTdHJhdGVneSA9IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeShTdHJhdGVneUVudW0uZGlyZWN0LCB0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgLy90aGlzLmRlZXBMaW5raW5nU3RyYXRlZ3kgPSBuZXcgQXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5KCd1bCcpO1xuXG4gICAgICAgIC8vIE90aGVyIHN0cmF0ZWd5IGRvZXMgbm90IHdvcmsgb24gRkIsIG90aGVyIHRoYW4gdWwuXG4gICAgICAgIGlmICh0aGlzLmJyb3dzZXIuaXNGYWNlYm9vaykge1xuICAgICAgICAgIHRoaXMuZGVlcExpbmtpbmdTdHJhdGVneSA9IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeShTdHJhdGVneUVudW0udWwsIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuYnJvd3Nlci5pc0FuZHJvaWQpIHtcbiAgICAgIHRoaXMuZGVlcExpbmtpbmdTdHJhdGVneSA9IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeShTdHJhdGVneUVudW0uaW50ZW50X2N0YSwgdGhpcy5zZXR0aW5ncyk7XG4gICAgICBpZiAodGhpcy5icm93c2VyLmlzQW5kcm9pZE5hdGl2ZUJyb3dzZXIgfHwgdGhpcy5icm93c2VyLmlzQW5kcm9pZFN0b2NrQnJvd3Nlcikge1xuICAgICAgICB0aGlzLmRlZXBMaW5raW5nU3RyYXRlZ3kgPSBBcHBMYXVuY2hTdHJhdGVneUZhY3RvcnkoU3RyYXRlZ3lFbnVtLm5vdHN1cHBvcnRlZCwgdGhpcy5zZXR0aW5ncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGVlcExpbmtpbmdTdHJhdGVneTtcblxuICAgIC8vIGlmICh0aGlzLnNldHRpbmdzLmRlYnVnID09IHRydWUpIHtcbiAgICAvLyAgIF9fZGVidWcoJ2Jyb3dzZXInLCBicm93c2VyKTtcbiAgICAvLyB9XG5cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9BcHBMYXVuY2hlckZhY3RvcnkudHMiLCJpbXBvcnQgeyBEaXJlY3RBcHBMYXVuY2hTdHJhdGVneSB9IGZyb20gJy4vRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3knO1xuLyoqXG4gKiBUaGlzIGlzIENhbGwgdG8gQWN0aW9uLiBNb2Rlcm4gYW5kIHJlY2VudCBicm93c2VycyBhcmUgbW92aW5nIHRvd2FyZHMgdGhpcyBhcHByb2FjaC5cbiAqIFRoZXkgYXJlIHJlcXVpcmluZyB1c2VyIGFjdGlvbiB0byBkZWVwIGxpbmsgdG8gdGhlIGFwcC4gRmlyc3QgaXMgYXNzaWducyBjbGljayBldmVudFxuICogdG8gJ3dhdGNoIGluIGFwcCcgbGluayB3aGljaCB3aWxsIHVsdGltYXRlbHkgaW52b2tlIERpcmVjdEFwcExhdW5jaFN0cmF0ZWd5KCkuXG4gKlxuICogQHBhcmFtIHN0cmF0ZWd5UGFyYW1ldGVyc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBjbGFzcyBDVEFBcHBMYXVuY2hTdHJhdGVneSB7XG4gIHN0cmF0ZWd5UGFyYW1ldGVyczogYW55O1xuICBjb25zdHJ1Y3RvcihzdHJhdGVneVBhcmFtZXRlcnM6IGFueSkge1xuICAgIHRoaXMuc3RyYXRlZ3lQYXJhbWV0ZXJzID0gc3RyYXRlZ3lQYXJhbWV0ZXJzO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBkaXJlY3RTdHJhdGVneSA9IG5ldyBEaXJlY3RBcHBMYXVuY2hTdHJhdGVneSh0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycyk7XG4gICAgY29uc3QgZWwgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRBcHBMYXVuY2hlckVsKCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICBjb25zdCBib2R5ID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSBhcyBIVE1MRWxlbWVudDtcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2OiBFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZWwgPSBldi50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoaWQpIHtcbiAgICAgICAgaWYgKGVsLm1hdGNoZXMoYCMke2lkfWApKSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGRpcmVjdFN0cmF0ZWd5LmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvQ1RBQXBwTGF1bmNoU3RyYXRlZ3kudHMiLCJleHBvcnQgY2xhc3MgVW5pdmVyc2FsTGlua2luZ0FwcExhdW5jaFN0cmF0ZWd5IHtcbiAgICBwcml2YXRlIHN0cmF0ZWd5UGFyYW1ldGVyczogYW55O1xuXG4gICAgY29uc3RydWN0b3Ioc3RyYXRlZ3lQYXJhbWV0ZXJzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMgPSBzdHJhdGVneVBhcmFtZXRlcnM7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRVbml2ZXJzYWxMaW5raW5nVXJsKCkpIHtcbiAgICAgICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdVbml2ZXJzYWwgTGlua2luZzogSW52YWxpZCB1cmwgcHJvdmlkZWQ6ICcgKyBzdHJhdGVneVBhcmFtZXRlcnMuZ2V0VW5pdmVyc2FsTGlua2luZ1VybCgpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFVuaXZlcnNhbCBMaW5raW5nOiBJbnZhbGlkIHVybCBwcm92aWRlZDogXCIgKyB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRVbml2ZXJzYWxMaW5raW5nVXJsKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsID0gdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMuZ2V0QXBwTGF1bmNoZXJFbCgpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCAkY29va2llTmFtZSA9ICd1bC1hcHAtZGV0ZWN0aW9uLWZsYWcnO1xuICAgICAgICBjb25zdCAkbG9jYXRpb24gPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRVbml2ZXJzYWxMaW5raW5nVXJsKCk7XG4gICAgICAgIGlmICh0aGlzLmFwcE5vdEluc3RhbGxlZCgkY29va2llTmFtZSkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMuZ2V0QXBwU3RvcmVVUkkoKTtcbiAgICAgICAgICAgIHRoaXMuZXJhc2VDb29raWUoJGNvb2tpZU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdocmVmJywgJGxvY2F0aW9uKTtcblxuICAgICAgICAvLyBJZiB1c2VyIG5hdmlnYXRlcyBhd2F5L2Nsb3NlcyBGYiBCcm93c2VyLlxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJhc2VDb29raWUoJGNvb2tpZU5hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldENvb2tpZSgkY29va2llTmFtZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoJGNvb2tpZU5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPbiBibHVyIHdpbGwgYWx3YXlzIGNsZWFyIHRoZSBjb29raWUsIG9yIHdoZW4gdHJ5aW5nIHRvXG4gICAgLy8gbmF2aWdhdGUgdG8gdGhlIGFwcCBzdG9yZSwgaG93ZXZlciwgaWYgdXNlciBjbG9zZXMgdGhlIGZiIGRpcmVjdGx5LFxuICAgIC8vIHRoZW4gaXQgYXNzdW1lcyBmb3IgMSBtaW4gdGhhdCB1c2VyIGRvZXMgbm90IGhhdmUgYXBwIGluc3RhbGxlZCBpZlxuICAgIC8vIGFwcCBpcyBub3QgZGV0ZWN0ZWQgZWFybGllciBhbmQgaW5zdGFsbGVkLiBJZiB0aGF0IGhhcHBlbnMgd2l0aGluIDFtaW5cbiAgICAvLyBpZiB1c2VyIGRpcmVjdGx5IGNsb3NlcyB0aGUgZmIsIHdoaWNoIG1lYW5zIGNvb2tpZSBzdGlsbCByZXNpZGVzLlxuICAgIHByaXZhdGUgc2V0Q29va2llKCRjb29raWVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyICRjb29raWVWYWx1ZSA9IHRoaXMucmVhZENvb2tpZSgkY29va2llTmFtZSk7XG4gICAgICAgIGlmICghJGNvb2tpZVZhbHVlIHx8IGlzTmFOKCRjb29raWVWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHNldCBmb3IgMSBtaW4uXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvb2tpZSgkY29va2llTmFtZSwgMSwgNjApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZXQgZm9yIDEgbWluLlxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb29raWUoJGNvb2tpZU5hbWUsIDIsIDYwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIGNvb2tpZSB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gMSwgdGhhdCBtZWFucyB1c2VyIGRvZXMgbm90IGhhdmUgYXBwIGluc3RhbGxlZC5cbiAgICBwcml2YXRlIGFwcE5vdEluc3RhbGxlZCgkY29va2llTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRDb29raWUoJGNvb2tpZU5hbWUpID4gMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIHNlY29uZDogbnVtYmVyKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKHNlY29uZCAqIDEwMDApKTtcbiAgICAgICAgdmFyIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9VVENTdHJpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZENvb2tpZShuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICB2YXIgbmFtZUVRID0gbmFtZSArIFwiPVwiO1xuICAgICAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGMgPSBjYVtpXTtcbiAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSAnICcpIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXJhc2VDb29raWUobmFtZSA9ICcnKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29va2llKG5hbWUsIDAsIC0xKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGliL1VuaXZlcnNhbExpbmtpbmdBcHBMYXVuY2hTdHJhdGVneS50cyIsIi8qKlxuICogVGhlcmUgYXJlIGZldyBicm93c2VycyBvbiBBbmRyb2lkIHdoaWNoIGRvZXMgbm90IHN1cHBvcnQgYm90aCBhcHAgbGF1bmNoXG4gKiB3aXRoICdpbnRlbnQnIG9yICdjdXN0b20gdXJpIHNjaGVtZScuIE5vdCBldmVuIENUQSB3b3JrcyBvbiB0aG9zZSBicm93c2VyLlxuICpcbiAqIFRoaXMganVzdCBkaXNwbGF5cyBicm93c2VyIGFsZXJ0IGRpYWxvZyBib3ggd2hlbiAnV2F0Y2ggSW4gQXBwJyBidXR0b24gaXMgY2xpY2tlZC5cbiAqIEBwYXJhbSBzdHJhdGVneVBhcmFtZXRlcnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgY2xhc3MgQXBwTGF1bmNoTm90U3VwcG9ydGVkU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0cmF0ZWd5UGFyYW1ldGVyczogYW55KSB7XG4gIH1cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuc3RyYXRlZ3lQYXJhbWV0ZXJzLmdldEFwcExhdW5jaGVyRWwoKSBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBjb25zdCBpZCA9IGVsLmdldEF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXROb3RTdXBwb3J0ZWRNZXNzYWdlKCkgP1xuICAgICAgICB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXROb3RTdXBwb3J0ZWRNZXNzYWdlKCkgOiAnTm90IFN1cHBvcnRlZCc7XG4gICAgICBhbGVydChtZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9BcHBMYXVuY2hOb3RTdXBwb3J0ZWRTdHJhdGVneS50cyIsIi8qKlxuICogVGhpcyBqdXN0IHRyaWVzIHRvIHJlZGlyZWN0IHRvIGFwcCwgbm90IHRvIHRoZSBhcHAgc3RvcmUsIGFzXG4gKiB0d2l0dGVyIGlvOCBicm93c2VyIGRvZXMgb3BlbiBib3RoIGFwcCBhbmQgYXBwIHN0b3JlIHdoaWNoIGlzIG5vdFxuICogYSBnb29kIHVzZXIgZXhwZXJpZW5jZS4gSWYgdXNlciBkb2VzIG5vdCBoYXZlIGFwcCBpbnN0YWxsZWQsIHRoZXkgd2lsbCBqdXN0XG4gKiB0aGV5IHdpbGwgaGF2ZSB0byBjbGljayB0byBkb3dubG9hZCBhcHAgYnV0dG9uIG1hbnVhbGx5IHRvIGdvIHRvIGFwcCBzdG9yZS5cbiAqXG4gKiBFZywgUXVvcmEgZG9lcyB0aGUgc2FtZS5cbiAqL1xuZXhwb3J0IGNsYXNzIERpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJhdGVneVBhcmFtZXRlcnM6IGFueSkgeyB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuc3RyYXRlZ3lQYXJhbWV0ZXJzLmdldEFwcExhdW5jaGVyRWwoKSBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBhcHBVUkkgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRBcHBVcmkoKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFwcFVSSTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGliL0RpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneS50cyIsIi8qKlxuICogVGhpcyBpcyBvbmx5IHVzZWQgZm9yIGFuZHJvaWQgZGV2aWNlcyBhcywgdGhleSB1bmRlcnN0YW5kIHRoZSBcIkludGVudFwiIFVSSVxuICogd2hpY2ggYXV0b21hdGljYWxseSByZXNvbHZlcyB0aGUgYXBwIGluc3RhbGxhdGlvbiBzdGF0ZSBhbmQgcmVkaXJlY3RzIHVzZXJzIGFjY29yZGluZ2x5LlxuICogV2l0aCBUaGlzIHN0cmF0ZWd5LCB3ZSBjYW5ub3QgcGFzcyB0aGUgY2FtcGFpZ24gaWQsIGlmIHVzZXIgaXMgYmVpbmcgcmVkaXJlY3QgdG8gYXBwIHN0b3JlLlxuXG4gKiBAcGFyYW0gc3RyYXRlZ3lQYXJhbWV0ZXJzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGNsYXNzIENUQUludGVudEFwcExhdW5jaFN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJhdGVneVBhcmFtZXRlcnM6IGFueSkgeyB9XG4gIGluaXQoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRBcHBMYXVuY2hlckVsKCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdocmVmJywgdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMuZ2V0SW50ZW50VVJJKCkpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvQ1RBSW50ZW50QXBwTGF1bmNoU3RyYXRlZ3kudHMiXSwic291cmNlUm9vdCI6IiJ9