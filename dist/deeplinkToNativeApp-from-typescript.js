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
    if (BrowserChecker_1.BrowserChecker().isIOS) {
        // parameterType = 'ios';
        strategyParameters = new IOSAppLaunchStrategyParameters(settings);
    }
    else if (BrowserChecker_1.BrowserChecker().isAndroid) {
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
        var _this = this;
        this.Settings = settings;
        this.browserChecker = BrowserChecker_1.BrowserChecker();
        this.androidParameters = new AppLaunchStrategyFactory_1.AndroidAppLaunchStrategyParameters(this.Settings);
        this.iOSParameters = new AppLaunchStrategyFactory_1.IOSAppLaunchStrategyParameters(this.Settings);
        this.util = {
            getQueryString: Utils_1.getQueryString,
            appendQueryParameter: Utils_1.appendQueryParameter
        };
        // Let all the page render finish.
        setTimeout(function () {
            return new AppLauncherFactory_1.AppLauncherFactory(_this.Settings);
        }, 1000);
    };
    return NativeAppLauncher;
}());
exports.NativeAppLauncher = NativeAppLauncher;
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
        this.assignStrategy();
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
                if (el.matches(id)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2M2YjkyNmMxZGI2ZDAyOTg5YjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9Ccm93c2VyQ2hlY2tlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL0FwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL1V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZXAtbGluay10by1uYXRpdmUtYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvQXBwTGF1bmNoZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvQ1RBQXBwTGF1bmNoU3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9Vbml2ZXJzYWxMaW5raW5nQXBwTGF1bmNoU3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9BcHBMYXVuY2hOb3RTdXBwb3J0ZWRTdHJhdGVneS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL0RpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL0NUQUludGVudEFwcExhdW5jaFN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7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Q29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YzZiOTI2YzFkYjZkMDI5ODliMiIsImV4cG9ydCBmdW5jdGlvbiBCcm93c2VyQ2hlY2tlcigpIHtcbiAgICB2YXIgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgaU9TVmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpc0lPUygpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL29zXFxzKyhcXGQrKV8vKTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJzZUludChtYXRjaFsxXSwgMTApXG4gICAgfTtcbiAgICB2YXIgaXNJT1MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAvKD86aSg/OnBob25lfHAoPzpvfGEpZCkpLy50ZXN0KHVzZXJBZ2VudCk7XG4gICAgfTtcblxuICAgIHZhciBpc0ZhY2Vib29rID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISF1c2VyQWdlbnQubWF0Y2goL0ZCQVYvaSk7XG4gICAgfTtcblxuICAgIHZhciBpc0Nocm9tZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHVzZXJBZ2VudC5pbmRleE9mKCdjaHJvbWUnKSA+IC0xO1xuICAgIH07XG5cbiAgICB2YXIgY2hyb21lVmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhdyA9IHVzZXJBZ2VudC5tYXRjaCgvY2hyb20oZXxpdW0pXFwvKFswLTldKylcXC4vKTtcbiAgICAgICAgcmV0dXJuIHJhdyA/IHBhcnNlSW50KHJhd1syXSwgMTApIDogZmFsc2U7XG4gICAgfTtcblxuICAgIHZhciBpc1R3aXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB1c2VyQWdlbnQuaW5kZXhPZigndHdpdHRlcicpID4gLTE7XG4gICAgfTtcblxuICAgIHZhciBpc0FuZHJvaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgLy8gVGhpcyBpcyB0byBjaGVjayBBbmRyb2lkIE1vYmlsZS5cbiAgICAgICAgIHJldHVybiB1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpID4gLTFcbiAgICAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdNb3ppbGxhLzUuMCcpID4gLTFcbiAgICAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTE7XG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdXNlckFnZW50LmluZGV4T2YoJ2FuZHJvaWQnKSA+IC0xO1xuICAgIH07XG5cbiAgICB2YXIgYW5kcm9pZFZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvYW5kcm9pZFxccyhbMC05XFwuXSopLyk7XG4gICAgICAgIHJldHVybiBtYXRjaCA/IHBhcnNlRmxvYXQobWF0Y2hbMV0pIDogZmFsc2U7XG4gICAgfTtcblxuICAgIC8vIERvd25sb2FkZWQgZnJvbSB0aGUgQW5kcm9pZCBHb29nbGUgcGxheSBzdG9yZS5cbiAgICB2YXIgaXNBbmRyb2lkU3RvY2tCcm93c2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNBbmRyb2lkKClcbiAgICAgICAgICAgICYmIGlzQ2hyb21lKClcbiAgICAgICAgICAgICYmIGhhc1ZlcnNpb24oKVxuICAgICAgICAgICAgJiYgIWlzRmFjZWJvb2soKTsgLy8gRkIgdXNlcyB0aGlzIGJyb3dzZXIsIGJ1dCBkZWVwIGxpbmtzIHdpdGggY3VzdG9tIFVSSSBzY2hlbWUuXG5cbiAgICB9O1xuXG4gICAgLy8gRGVmYXVsdCBicm93c2VyIGZvciBvbGQgQW5kcm9pZCBhbmQgYW5kcm9pZCBBcHBzLlxuICAgIHZhciBpc0FuZHJvaWROYXRpdmVCcm93c2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBGYWNlYm9vayBpbiBBbnJvaWQgNC40IHVzZXMgdGhpcyBicm93c2VyLCBieSBkZWZhdWx0IGJ1dCBkb2VzIHRoZSBkZWVwIGxpbmtpbmcsXG4gICAgICAgIC8vIHNvIGxldHMgY2hlY2sgZm9yIGZhY2Vib29rLlxuICAgICAgICByZXR1cm4gIWlzRmFjZWJvb2soKVxuICAgICAgICAgICAgJiYgKGlzQW5kcm9pZCgpICYmIChhcHBsZVdlYktpdFZlcnNpb24oKSAmJiBhcHBsZVdlYktpdFZlcnNpb24oKSA8IDUzNylcbiAgICAgICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIChjaHJvbWVWZXJzaW9uKCkgJiYgY2hyb21lVmVyc2lvbigpIDwgMzcpKTtcbiAgICB9O1xuXG4gICAgdmFyIGhhc1ZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB1c2VyQWdlbnQuaW5kZXhPZigndmVyc2lvbicpID4gLTE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5cbiAgICAgKiAgUmV0dXJucyBvYmplY3Qgd2l0aCBmb2xsb3dpbmcgcHJvcGVydHlcbiAgICAgKiAgLSBib29sZWFuIDogSWYgQXBwbGVLaXQgQnJvd3NlclxuICAgICAqICAtIHZlcnNpb24gOiBBcHBsZUtpdCBCcm93c2VyIFZlcnNpb24uXG4gICAgICovXG4gICAgdmFyIGFwcGxlV2ViS2l0VmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhbXFxkLl0rKS8pO1xuICAgICAgICByZXR1cm4gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzFdKSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpc0lPUzogaXNJT1MoKSxcbiAgICAgICAgaU9TVmVyc2lvbjogaU9TVmVyc2lvbigpLFxuICAgICAgICBpc0FuZHJvaWQ6IGlzQW5kcm9pZCgpLFxuICAgICAgICBhbmRyb2lkVmVyc2lvbjogYW5kcm9pZFZlcnNpb24oKSxcbiAgICAgICAgaXNBbmRyb2lkU3RvY2tCcm93c2VyOiBpc0FuZHJvaWRTdG9ja0Jyb3dzZXIoKSxcbiAgICAgICAgaXNBbmRyb2lkTmF0aXZlQnJvd3NlcjogaXNBbmRyb2lkTmF0aXZlQnJvd3NlcigpLFxuICAgICAgICBpc0ZhY2Vib29rOiBpc0ZhY2Vib29rKCksXG4gICAgICAgIGlzQ2hyb21lOiBpc0Nocm9tZSgpLFxuICAgICAgICBpc1R3aXR0ZXI6IGlzVHdpdHRlcigpXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9Ccm93c2VyQ2hlY2tlci50cyIsImltcG9ydCB7IEJyb3dzZXJDaGVja2VyIH0gZnJvbSAnLi9Ccm93c2VyQ2hlY2tlcic7XG5pbXBvcnQgeyBhcHBlbmRRdWVyeVBhcmFtZXRlciB9IGZyb20gJy4vVXRpbHMnO1xuaW1wb3J0IHsgQ1RBQXBwTGF1bmNoU3RyYXRlZ3kgfSBmcm9tICcuL0NUQUFwcExhdW5jaFN0cmF0ZWd5JztcbmltcG9ydCB7IERpcmVjdEFwcExhdW5jaFN0cmF0ZWd5IH0gZnJvbSAnLi9EaXJlY3RBcHBMYXVuY2hTdHJhdGVneSc7XG5pbXBvcnQgeyBVbml2ZXJzYWxMaW5raW5nQXBwTGF1bmNoU3RyYXRlZ3kgfSBmcm9tICcuL1VuaXZlcnNhbExpbmtpbmdBcHBMYXVuY2hTdHJhdGVneSc7XG5pbXBvcnQgeyBBcHBMYXVuY2hOb3RTdXBwb3J0ZWRTdHJhdGVneSB9IGZyb20gJy4vQXBwTGF1bmNoTm90U3VwcG9ydGVkU3RyYXRlZ3knO1xuaW1wb3J0IHsgRGlyZWN0QXBwT25seUxhdW5jaFN0cmF0ZWd5IH0gZnJvbSAnLi9EaXJlY3RBcHBPbmx5TGF1bmNoU3RyYXRlZ3knO1xuaW1wb3J0IHsgQ1RBSW50ZW50QXBwTGF1bmNoU3RyYXRlZ3kgfSBmcm9tICcuL0NUQUludGVudEFwcExhdW5jaFN0cmF0ZWd5JztcbmV4cG9ydCBlbnVtIFN0cmF0ZWd5RW51bSB7XG4gIGN0YSxcbiAgZGlyZWN0LFxuICB1bCxcbiAgbm90c3VwcG9ydGVkLFxuICBkaXJlY3RhcHBvbmx5LFxuICBpbnRlbnRfY3RhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHBMYXVuY2hTdHJhdGVneUZhY3Rvcnkoc3RyYXRlZ3lUeXBlOiBTdHJhdGVneUVudW0sIHNldHRpbmdzOiBhbnkpIHtcbiAgY29uc3Qgc3RyYXRlZ3lQYXJhbWV0ZXJzID0gQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJGYWN0b3J5KHNldHRpbmdzKTtcbiAgbGV0IGFwcExhdW5jaFN0cmF0ZWd5O1xuXG4gIGlmIChzdHJhdGVneVR5cGUgPT0gU3RyYXRlZ3lFbnVtLmN0YSB8fCBzdHJhdGVneVR5cGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgYXBwTGF1bmNoU3RyYXRlZ3kgPSBuZXcgQ1RBQXBwTGF1bmNoU3RyYXRlZ3koc3RyYXRlZ3lQYXJhbWV0ZXJzKTtcbiAgfSBlbHNlIGlmIChzdHJhdGVneVR5cGUgPT0gU3RyYXRlZ3lFbnVtLmRpcmVjdCkge1xuICAgIGFwcExhdW5jaFN0cmF0ZWd5ID0gbmV3IERpcmVjdEFwcExhdW5jaFN0cmF0ZWd5KHN0cmF0ZWd5UGFyYW1ldGVycyk7XG4gIH0gZWxzZSBpZiAoc3RyYXRlZ3lUeXBlID09IFN0cmF0ZWd5RW51bS51bCkge1xuICAgIGFwcExhdW5jaFN0cmF0ZWd5ID0gbmV3IFVuaXZlcnNhbExpbmtpbmdBcHBMYXVuY2hTdHJhdGVneShzdHJhdGVneVBhcmFtZXRlcnMpO1xuICB9IGVsc2UgaWYgKHN0cmF0ZWd5VHlwZSA9PSBTdHJhdGVneUVudW0ubm90c3VwcG9ydGVkKSB7XG4gICAgYXBwTGF1bmNoU3RyYXRlZ3kgPSBuZXcgQXBwTGF1bmNoTm90U3VwcG9ydGVkU3RyYXRlZ3koc3RyYXRlZ3lQYXJhbWV0ZXJzKTtcbiAgfSBlbHNlIGlmIChzdHJhdGVneVR5cGUgPT0gU3RyYXRlZ3lFbnVtLmRpcmVjdGFwcG9ubHkpIHtcbiAgICBhcHBMYXVuY2hTdHJhdGVneSA9IG5ldyBEaXJlY3RBcHBPbmx5TGF1bmNoU3RyYXRlZ3koc3RyYXRlZ3lQYXJhbWV0ZXJzKTtcbiAgfSBlbHNlIGlmIChzdHJhdGVneVR5cGUgPT0gU3RyYXRlZ3lFbnVtLmludGVudF9jdGEpIHtcbiAgICBhcHBMYXVuY2hTdHJhdGVneSA9IG5ldyBDVEFJbnRlbnRBcHBMYXVuY2hTdHJhdGVneShzdHJhdGVneVBhcmFtZXRlcnMpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignRGVlcGxpbmtpbmc6IFVuc3VwcG9ydGVkIGRlZXBsaW5raW5nIHN0cmF0ZWd5IHR5cGUnKTtcbiAgfVxuXG4gIC8vIGlmIChTZXR0aW5ncy5kZWJ1ZyAmJiBhcHBMYXVuY2hTdHJhdGVneSkge1xuICAvLyAgIF9fZGVidWcoXCJBcHBMYXVuY2hTdHJhdGVneVR5cGVcIiwgc3RyYXRlZ3lUeXBlKTtcbiAgLy8gfVxuICByZXR1cm4gYXBwTGF1bmNoU3RyYXRlZ3k7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVyRmFjdG9yeShzZXR0aW5nczogYW55KSB7XG4gIGxldCBzdHJhdGVneVBhcmFtZXRlcnMgPSBuZXcgQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzKHNldHRpbmdzKTtcbiAgLy8gbGV0IHBhcmFtZXRlclR5cGU7XG5cbiAgaWYgKEJyb3dzZXJDaGVja2VyKCkuaXNJT1MpIHtcbiAgICAvLyBwYXJhbWV0ZXJUeXBlID0gJ2lvcyc7XG4gICAgc3RyYXRlZ3lQYXJhbWV0ZXJzID0gbmV3IElPU0FwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyhzZXR0aW5ncyk7XG4gIH0gZWxzZSBpZiAoQnJvd3NlckNoZWNrZXIoKS5pc0FuZHJvaWQpIHtcbiAgICAvLyBwYXJhbWV0ZXJUeXBlID0gJ2FuZHJvaWQnO1xuICAgIHN0cmF0ZWd5UGFyYW1ldGVycyA9IG5ldyBBbmRyb2lkQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzKHNldHRpbmdzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBwYXJhbWV0ZXJUeXBlID0gJ2Rlc2t0b3Agb3IgZGVmYXVsdCc7XG4gICAgLy8gc3RyYXRlZ3lQYXJhbWV0ZXJzID0gQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzO1xuICB9XG5cbiAgLy8gaWYgKFNldHRpbmdzLmRlYnVnICYmIHN0cmF0ZWd5UGFyYW1ldGVycykge1xuICAvLyAgIF9fZGVidWcoXCJBcHBMYXVuY2hQYXJhbWV0ZXJcIiwgcGFyYW1ldGVyVHlwZSk7XG4gIC8vIH1cbiAgcmV0dXJuIHN0cmF0ZWd5UGFyYW1ldGVycztcbn07XG5cblxuZXhwb3J0IGNsYXNzIEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyB7XG4gIHB1YmxpYyBzZXR0aW5nczogYW55O1xuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogYW55KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICB9XG4gIC8vIE9uIGRlc2t0b3AsIHdlIGRvbid0IGtub3cgd2hhdCB0byBkby5cbiAgZ2V0QXBwVXJpKCkge1xuICAgIHJldHVybiBcIiNcIjtcbiAgfVxuICBnZXRBcHBMYXVuY2hlckVsKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmFwcExhdW5jaGVyRWxJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZXR0aW5ncyBkb2VzIG5vdCBoYXZlIHZhbGlkIGFwcExhdW5jaGVyRWxJZCcpO1xuICAgIH1cbiAgICByZXR1cm4gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuYXBwTGF1bmNoZXJFbElkKTtcbiAgfVxuXG4gIC8vIFRoaXMgbWVzc2FnZSBpcyBkaXNwbGF5ZWQgaWYgYW55IGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBkZWVwIGxpbmtpbmcuXG4gIGdldE5vdFN1cHBvcnRlZE1lc3NhZ2UoKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYXBwTGF1bmNoZXJFbElkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NldHRpbmdzIGRvZXMgbm90IGhhdmUgdmFsaWQgTm90U3VwcG9ydGVkTWVzc2FnZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5ub3RTdXBwb3J0ZWRNZXNzYWdlO1xuICB9XG5cbiAgLy9UT0RPOiBDYW1wYWlnbiBjYW4gYmUgY3JlYXRlZCBhcyBzZXBhcmF0ZSBkZWNvcmF0b3IvcHJveHkgb2JqZWN0XG4gIGdldENhbXBhaWduVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuY2FtcGFpZ25Db2RlO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBTdG9yZSBVUkksIG5vdCBzdXJlIHdoZXJlIHRvIGdvIDopLlxuICBnZXRBcHBTdG9yZVVSSSgpIHtcbiAgICByZXR1cm4gXCIjXCI7XG4gIH1cblxuICBnZXRJbnRlbnRVUkkoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiBudWxsOyB9XG4gIGdldFVuaXZlcnNhbExpbmtpbmdVcmwoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiBudWxsOyB9XG59XG5cblxuLyoqXG4gKiBAaW5oZXJpdHMgQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzXG4gKiBFeHRlbmRzIEJhc2UgQXBwIExhdW5jaCBTdHJhdGVneSBQYXJhbWV0ZXJzIHdoaWNoIGFyZSByZXF1aXJlZCBmb3JcbiAqIEFuZHJvaWQgQXBwIExhdW5jaCBTdHJhdGVnaWVzLlxuICovXG5leHBvcnQgY2xhc3MgQW5kcm9pZEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyBleHRlbmRzIEFwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzOiBhbnkpIHtcbiAgICBzdXBlcihzZXR0aW5ncyk7XG4gIH1cbiAgZ2V0SW50ZW50VVJJKCkge1xuICAgIHJldHVybiBcImludGVudDovL20vI0ludGVudDtzY2hlbWU9XCIgKyB0aGlzLnNldHRpbmdzLmFwcFVyaSArIFwiO3BhY2thZ2U9XCIgKyB0aGlzLnNldHRpbmdzLmFuZHJvaWRBcHBJZCArIFwiO2VuZFwiO1xuICB9XG4gIGdldEFwcFVyaSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5hcHBVcmk7XG4gIH1cbiAgZ2V0QXBwU3RvcmVVUkkoKSB7XG4gICAgdmFyIGNhbXBhaWduU3RyaW5nID0gdGhpcy5nZXRDYW1wYWlnblZhbHVlKCkgPyBcIiZyZWZlcnJlcj11dG1fc291cmNlJTNEb3RoZXIlMjZ1dG1fY2FtcGFpZ24lM0RcIiArIHRoaXMuZ2V0Q2FtcGFpZ25WYWx1ZSgpIDogXCJcIjtcbiAgICByZXR1cm4gXCJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS9zdG9yZS9hcHBzL2RldGFpbHM/aWQ9XCIgKyB0aGlzLnNldHRpbmdzLmFuZHJvaWRBcHBJZCArIGNhbXBhaWduU3RyaW5nO1xuICB9XG59XG5cbi8qKlxuICogRXh0ZW5kcyBCYXNlIEFwcCBMYXVuY2ggU3RyYXRlZ3kgUGFyYW1ldGVycyB3aGljaCBhcmUgcmVxdWlyZWQgZm9yXG4gKiBJb3MgQXBwIExhdW5jaCBTdHJhdGVnaWVzLlxuICovXG5leHBvcnQgY2xhc3MgSU9TQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzIGV4dGVuZHMgQXBwTGF1bmNoU3RyYXRlZ3lQYXJhbWV0ZXJzIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IGFueSkge1xuICAgIHN1cGVyKHNldHRpbmdzKTtcbiAgfVxuICBnZXRBcHBTdG9yZVVSSSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYW1wYWlnblZhbHVlKCkgP1xuICAgICAgYXBwZW5kUXVlcnlQYXJhbWV0ZXIodGhpcy5zZXR0aW5ncy5pT3NBcHBTdG9yZSwgJ2N0JywgdGhpcy5nZXRDYW1wYWlnblZhbHVlKCkpIDogdGhpcy5zZXR0aW5ncy5pT3NBcHBTdG9yZTtcbiAgfVxuXG4gIGdldFVuaXZlcnNhbExpbmtpbmdVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudW5pdmVyc2FsTGlua1VybDtcbiAgfVxuXG4gIGdldEFwcFVyaSgpIHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuYXBwVXJpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NldHRpbmdzIGRvZXMgbm90IGhhdmUgdmFsaWQgQXBwVVJJJylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuYXBwVXJpO1xuICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvQXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5LnRzIiwiLyoqXG4gKiBSZXR1cm5zIHF1ZXJ5IHN0cmluZyBpbnRvIGtleS9wYWlyIGFycmF5LlxuICogQHBhcmFtIHF1ZXJ5U3RyaW5nIHN0cmluZ1xuICogIFJhdyBRdWVyeSBzdHJpbmcuXG4gKiBAcmV0dXJucyBbXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVlcnlTdHJpbmcocXVlcnlTdHJpbmc6IHN0cmluZyk6IG9iamVjdCB7XG4gIGlmIChxdWVyeVN0cmluZyA9PSB1bmRlZmluZWQpIHtcbiAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIH1cblxuICBxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnNwbGl0KCcrJykuam9pbignICcpO1xuICBjb25zdCBwYXJhbXMgPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuICBsZXQgdG9rZW5zO1xuICBsZXQgcmUgPSAvWz8mXT8oW149XSspPShbXiZdKikvZztcbiAgd2hpbGUgKHRva2VucyA9IHJlLmV4ZWMocXVlcnlTdHJpbmcpKSB7XG4gICAgY29uc3Qga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1sxXSk7XG4gICAgY29uc3QgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodG9rZW5zWzJdKTtcbiAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRRdWVyeVBhcmFtZXRlcih1cmw6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgbGV0IHJlID0gbmV3IFJlZ0V4cChcIihbPyZdKVwiICsga2V5ICsgXCI9Lio/KCZ8JClcIiwgXCJpXCIpO1xuICBjb25zdCBzZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpICE9PSAtMSA/IFwiJlwiIDogXCI/XCI7XG4gIGlmICh1cmwubWF0Y2gocmUpKSB7XG4gICAgcmV0dXJuIHVybC5yZXBsYWNlKHJlLCAnJDEnICsga2V5ICsgXCI9XCIgKyB2YWx1ZSArICckMicpO1xuICB9XG4gIC8vVE9ETyAgRmlsdGVyIHZhbHVlIGFnYWluc3QgWFNTLlxuICByZXR1cm4gdXJsICsgc2VwYXJhdG9yICsga2V5ICsgXCI9XCIgKyB2YWx1ZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvVXRpbHMudHMiLCJleHBvcnQgY2xhc3MgRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3kge1xuICBzdHJhdGVneVBhcmFtZXRlcnM6IGFueTtcbiAgZXZlbnRzID0gW1wicGFnZWhpZGVcIiwgXCJibHVyXCIsIFwiYmVmb3JldW5sb2FkXCJdO1xuICB0aW1lb3V0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgZWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHN0cmF0ZWd5UGFyYW1ldGVyczogYW55KSB7XG4gICAgdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMgPSBzdHJhdGVneVBhcmFtZXRlcnM7XG4gICAgdGhpcy5lbCA9IHRoaXMuc3RyYXRlZ3lQYXJhbWV0ZXJzLmdldEFwcExhdW5jaGVyRWwoKTtcbiAgfVxuICAvLyBFdmVudHMgdGhhdCBnZXRzIGV4ZWN1dGVkIGlmIHBhZ2UgaXMgdHJhbnNpdGlvbmluZyBhd2F5LlxuICBwcmV2ZW50RGlhbG9nKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH1cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKGV2bmFtZSkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZuYW1lLCB0aGlzLnByZXZlbnREaWFsb2cpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnJlZGlyZWN0KCk7XG4gICAgLy8gSWYgdXNlciBuYXZpZ2F0ZXMgYmFjayB0byBicm93c2VyIGFuZCBjbGlja3MgdGhlIGJ1dHRvbixcbiAgICAvLyB0cnkgcmVkaXJlY3RpbmcgYWdhaW4uXG4gICAgLy8gdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKGNsaWNrKTtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMucmVkaXJlY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVkaXJlY3QoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRBcHBVcmkoKTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKChldm5hbWUpID0+IHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2bmFtZSwgdGhpcy5wcmV2ZW50RGlhbG9nKTtcbiAgICB9KTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmID0gdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMuZ2V0QXBwU3RvcmVVUkkoKTtcbiAgICB9LCAxNTAwKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9EaXJlY3RBcHBMYXVuY2hTdHJhdGVneS50cyIsImltcG9ydCB7IEFwcExhdW5jaGVyRmFjdG9yeSB9IGZyb20gJy4vbGliL0FwcExhdW5jaGVyRmFjdG9yeSc7XG5pbXBvcnQgeyBCcm93c2VyQ2hlY2tlciB9IGZyb20gJy4vbGliL0Jyb3dzZXJDaGVja2VyJztcbmltcG9ydCB7IGdldFF1ZXJ5U3RyaW5nLCBhcHBlbmRRdWVyeVBhcmFtZXRlciB9IGZyb20gJy4vbGliL1V0aWxzJztcbmltcG9ydCB7IEFuZHJvaWRBcHBMYXVuY2hTdHJhdGVneVBhcmFtZXRlcnMsIElPU0FwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyB9IGZyb20gJy4vbGliL0FwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBOYXRpdmVBcHBMYXVuY2hlciB7XG4gIGJyb3dzZXJDaGVja2VyOiBhbnk7XG4gIGFuZHJvaWRQYXJhbWV0ZXJzOiBhbnk7XG4gIGlPU1BhcmFtZXRlcnM6IGFueTtcbiAgdXRpbDogYW55O1xuICBwcml2YXRlIFNldHRpbmdzOiBhbnk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBpbml0KHNldHRpbmdzOiBhbnkpIHtcbiAgICB0aGlzLlNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgICB0aGlzLmJyb3dzZXJDaGVja2VyID0gQnJvd3NlckNoZWNrZXIoKTtcbiAgICB0aGlzLmFuZHJvaWRQYXJhbWV0ZXJzID0gbmV3IEFuZHJvaWRBcHBMYXVuY2hTdHJhdGVneVBhcmFtZXRlcnModGhpcy5TZXR0aW5ncyk7XG4gICAgdGhpcy5pT1NQYXJhbWV0ZXJzID0gbmV3IElPU0FwcExhdW5jaFN0cmF0ZWd5UGFyYW1ldGVycyh0aGlzLlNldHRpbmdzKTtcbiAgICB0aGlzLnV0aWwgPSB7XG4gICAgICBnZXRRdWVyeVN0cmluZyxcbiAgICAgIGFwcGVuZFF1ZXJ5UGFyYW1ldGVyXG4gICAgfTtcblxuICAgIC8vIExldCBhbGwgdGhlIHBhZ2UgcmVuZGVyIGZpbmlzaC5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQXBwTGF1bmNoZXJGYWN0b3J5KHRoaXMuU2V0dGluZ3MpO1xuICAgIH0sIDEwMDApO1xuICB9XG59XG5cbi8vIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPVxuLy8gICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8XG4vLyAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXNTZWxlY3RvciB8fFxuLy8gICBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbi8vICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHxcbi8vICAgRWxlbWVudC5wcm90b3R5cGUub01hdGNoZXNTZWxlY3RvciB8fFxuLy8gICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbi8vICAgZnVuY3Rpb24gKHMpIHtcbi8vICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcbi8vICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcbi8vICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSB0aGlzKSB7IH1cbi8vICAgICByZXR1cm4gaSA+IC0xO1xuLy8gICB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlZXAtbGluay10by1uYXRpdmUtYXBwLnRzIiwiaW1wb3J0IHsgQnJvd3NlckNoZWNrZXIgfSBmcm9tICcuL0Jyb3dzZXJDaGVja2VyJztcbmltcG9ydCB7IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeSwgU3RyYXRlZ3lFbnVtIH0gZnJvbSAnLi9BcHBMYXVuY2hTdHJhdGVneUZhY3RvcnknO1xuLyoqXG4qIFRoaXMgaXMgdGhlIG1haW4gZmFjdG9yeSB3aGljaCBjcmVhdGVzIHRoZSBkZWVwbGlua2luZyBzdHJhdGVneSBvYmplY3QgYmFzZWRcbiogb24gdGhlIHR5cGUgb2YgYnJvd3NlciBhbmQgaXRzIHZlcnNpb25zLiBNdWx0aXBsZSBpbnN0YW5jZXMgb2Ygc3RyYXRlZ3kgd2lsbCBiZSBjcmVhdGVkXG4qIGFzIHdlIHdpbGwgcmVxdWlyZSBqdXN0IG9uZSwgYnV0IHdlIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgR2FyYmFnZSBjb2xsZWN0aW9uLlxuKlxuKiBAcmV0dXJucyB7QXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5fVxuKiBAY29uc3RydWN0b3JcbiovXG5leHBvcnQgY2xhc3MgQXBwTGF1bmNoZXJGYWN0b3J5IHtcbiAgcHJpdmF0ZSBicm93c2VyOiBhbnk7XG4gIHByaXZhdGUgZGVlcExpbmtpbmdTdHJhdGVneTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2V0dGluZ3M6IGFueSkge1xuICAgIHRoaXMuYnJvd3NlciA9IEJyb3dzZXJDaGVja2VyKCk7XG5cbiAgICB0aGlzLmFzc2lnblN0cmF0ZWd5KCk7XG4gICAgcmV0dXJuIHRoaXMuZGVlcExpbmtpbmdTdHJhdGVneTtcbiAgfVxuXG4gIHByaXZhdGUgYXNzaWduU3RyYXRlZ3koKSB7XG4gICAgLy8gRGVmYXVsdCBzdHJhdGVneS5cbiAgICB0aGlzLmRlZXBMaW5raW5nU3RyYXRlZ3kgPSBBcHBMYXVuY2hTdHJhdGVneUZhY3RvcnkoU3RyYXRlZ3lFbnVtLmN0YSwgdGhpcy5zZXR0aW5ncyk7XG4gICAgaWYgKHRoaXMuYnJvd3Nlci5pc0lPUykge1xuICAgICAgLy9kZWVwTGlua2luZ1N0cmF0ZWd5ID0gbmV3IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeSgnY3RhJyk7XG4gICAgICBpZiAodGhpcy5icm93c2VyLmlPU1ZlcnNpb24gPCA5KSB7XG4gICAgICAgIHRoaXMuZGVlcExpbmtpbmdTdHJhdGVneSA9IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeShTdHJhdGVneUVudW0uZGlyZWN0LCB0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgaWYgKHRoaXMuYnJvd3Nlci5pc1R3aXR0ZXIpIHtcbiAgICAgICAgICB0aGlzLmRlZXBMaW5raW5nU3RyYXRlZ3kgPSBBcHBMYXVuY2hTdHJhdGVneUZhY3RvcnkoU3RyYXRlZ3lFbnVtLmRpcmVjdGFwcG9ubHksIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBJZiBJT1MgPj0gOS5cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmRlZXBMaW5raW5nU3RyYXRlZ3kgPSBBcHBMYXVuY2hTdHJhdGVneUZhY3RvcnkoU3RyYXRlZ3lFbnVtLmRpcmVjdCwgdGhpcy5zZXR0aW5ncyk7XG4gICAgICAgIC8vdGhpcy5kZWVwTGlua2luZ1N0cmF0ZWd5ID0gbmV3IEFwcExhdW5jaFN0cmF0ZWd5RmFjdG9yeSgndWwnKTtcblxuICAgICAgICAvLyBPdGhlciBzdHJhdGVneSBkb2VzIG5vdCB3b3JrIG9uIEZCLCBvdGhlciB0aGFuIHVsLlxuICAgICAgICBpZiAodGhpcy5icm93c2VyLmlzRmFjZWJvb2spIHtcbiAgICAgICAgICB0aGlzLmRlZXBMaW5raW5nU3RyYXRlZ3kgPSBBcHBMYXVuY2hTdHJhdGVneUZhY3RvcnkoU3RyYXRlZ3lFbnVtLnVsLCB0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmJyb3dzZXIuaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLmRlZXBMaW5raW5nU3RyYXRlZ3kgPSBBcHBMYXVuY2hTdHJhdGVneUZhY3RvcnkoU3RyYXRlZ3lFbnVtLmludGVudF9jdGEsIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgaWYgKHRoaXMuYnJvd3Nlci5pc0FuZHJvaWROYXRpdmVCcm93c2VyIHx8IHRoaXMuYnJvd3Nlci5pc0FuZHJvaWRTdG9ja0Jyb3dzZXIpIHtcbiAgICAgICAgdGhpcy5kZWVwTGlua2luZ1N0cmF0ZWd5ID0gQXBwTGF1bmNoU3RyYXRlZ3lGYWN0b3J5KFN0cmF0ZWd5RW51bS5ub3RzdXBwb3J0ZWQsIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmICh0aGlzLnNldHRpbmdzLmRlYnVnID09IHRydWUpIHtcbiAgICAvLyAgIF9fZGVidWcoJ2Jyb3dzZXInLCBicm93c2VyKTtcbiAgICAvLyB9XG5cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9BcHBMYXVuY2hlckZhY3RvcnkudHMiLCJpbXBvcnQgeyBEaXJlY3RBcHBMYXVuY2hTdHJhdGVneSB9IGZyb20gJy4vRGlyZWN0QXBwTGF1bmNoU3RyYXRlZ3knO1xuLyoqXG4gKiBUaGlzIGlzIENhbGwgdG8gQWN0aW9uLiBNb2Rlcm4gYW5kIHJlY2VudCBicm93c2VycyBhcmUgbW92aW5nIHRvd2FyZHMgdGhpcyBhcHByb2FjaC5cbiAqIFRoZXkgYXJlIHJlcXVpcmluZyB1c2VyIGFjdGlvbiB0byBkZWVwIGxpbmsgdG8gdGhlIGFwcC4gRmlyc3QgaXMgYXNzaWducyBjbGljayBldmVudFxuICogdG8gJ3dhdGNoIGluIGFwcCcgbGluayB3aGljaCB3aWxsIHVsdGltYXRlbHkgaW52b2tlIERpcmVjdEFwcExhdW5jaFN0cmF0ZWd5KCkuXG4gKlxuICogQHBhcmFtIHN0cmF0ZWd5UGFyYW1ldGVyc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBjbGFzcyBDVEFBcHBMYXVuY2hTdHJhdGVneSB7XG4gIHN0cmF0ZWd5UGFyYW1ldGVyczogYW55O1xuICBjb25zdHJ1Y3RvcihzdHJhdGVneVBhcmFtZXRlcnM6IGFueSkge1xuICAgIHRoaXMuc3RyYXRlZ3lQYXJhbWV0ZXJzID0gc3RyYXRlZ3lQYXJhbWV0ZXJzO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBkaXJlY3RTdHJhdGVneSA9IG5ldyBEaXJlY3RBcHBMYXVuY2hTdHJhdGVneSh0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycyk7XG4gICAgY29uc3QgZWwgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRBcHBMYXVuY2hlckVsKCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICBjb25zdCBib2R5ID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSBhcyBIVE1MRWxlbWVudDtcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2OiBFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZWwgPSBldi50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoaWQpIHtcbiAgICAgICAgaWYgKGVsLm1hdGNoZXMoaWQpKSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGRpcmVjdFN0cmF0ZWd5LmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvQ1RBQXBwTGF1bmNoU3RyYXRlZ3kudHMiLCJleHBvcnQgY2xhc3MgVW5pdmVyc2FsTGlua2luZ0FwcExhdW5jaFN0cmF0ZWd5IHtcbiAgICBwcml2YXRlIHN0cmF0ZWd5UGFyYW1ldGVyczogYW55O1xuXG4gICAgY29uc3RydWN0b3Ioc3RyYXRlZ3lQYXJhbWV0ZXJzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMgPSBzdHJhdGVneVBhcmFtZXRlcnM7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRVbml2ZXJzYWxMaW5raW5nVXJsKCkpIHtcbiAgICAgICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdVbml2ZXJzYWwgTGlua2luZzogSW52YWxpZCB1cmwgcHJvdmlkZWQ6ICcgKyBzdHJhdGVneVBhcmFtZXRlcnMuZ2V0VW5pdmVyc2FsTGlua2luZ1VybCgpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFVuaXZlcnNhbCBMaW5raW5nOiBJbnZhbGlkIHVybCBwcm92aWRlZDogXCIgKyB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRVbml2ZXJzYWxMaW5raW5nVXJsKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsID0gdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMuZ2V0QXBwTGF1bmNoZXJFbCgpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCAkY29va2llTmFtZSA9ICd1bC1hcHAtZGV0ZWN0aW9uLWZsYWcnO1xuICAgICAgICBjb25zdCAkbG9jYXRpb24gPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRVbml2ZXJzYWxMaW5raW5nVXJsKCk7XG4gICAgICAgIGlmICh0aGlzLmFwcE5vdEluc3RhbGxlZCgkY29va2llTmFtZSkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMuZ2V0QXBwU3RvcmVVUkkoKTtcbiAgICAgICAgICAgIHRoaXMuZXJhc2VDb29raWUoJGNvb2tpZU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdocmVmJywgJGxvY2F0aW9uKTtcblxuICAgICAgICAvLyBJZiB1c2VyIG5hdmlnYXRlcyBhd2F5L2Nsb3NlcyBGYiBCcm93c2VyLlxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJhc2VDb29raWUoJGNvb2tpZU5hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldENvb2tpZSgkY29va2llTmFtZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoJGNvb2tpZU5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPbiBibHVyIHdpbGwgYWx3YXlzIGNsZWFyIHRoZSBjb29raWUsIG9yIHdoZW4gdHJ5aW5nIHRvXG4gICAgLy8gbmF2aWdhdGUgdG8gdGhlIGFwcCBzdG9yZSwgaG93ZXZlciwgaWYgdXNlciBjbG9zZXMgdGhlIGZiIGRpcmVjdGx5LFxuICAgIC8vIHRoZW4gaXQgYXNzdW1lcyBmb3IgMSBtaW4gdGhhdCB1c2VyIGRvZXMgbm90IGhhdmUgYXBwIGluc3RhbGxlZCBpZlxuICAgIC8vIGFwcCBpcyBub3QgZGV0ZWN0ZWQgZWFybGllciBhbmQgaW5zdGFsbGVkLiBJZiB0aGF0IGhhcHBlbnMgd2l0aGluIDFtaW5cbiAgICAvLyBpZiB1c2VyIGRpcmVjdGx5IGNsb3NlcyB0aGUgZmIsIHdoaWNoIG1lYW5zIGNvb2tpZSBzdGlsbCByZXNpZGVzLlxuICAgIHByaXZhdGUgc2V0Q29va2llKCRjb29raWVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyICRjb29raWVWYWx1ZSA9IHRoaXMucmVhZENvb2tpZSgkY29va2llTmFtZSk7XG4gICAgICAgIGlmICghJGNvb2tpZVZhbHVlIHx8IGlzTmFOKCRjb29raWVWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHNldCBmb3IgMSBtaW4uXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvb2tpZSgkY29va2llTmFtZSwgMSwgNjApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZXQgZm9yIDEgbWluLlxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb29raWUoJGNvb2tpZU5hbWUsIDIsIDYwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIGNvb2tpZSB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gMSwgdGhhdCBtZWFucyB1c2VyIGRvZXMgbm90IGhhdmUgYXBwIGluc3RhbGxlZC5cbiAgICBwcml2YXRlIGFwcE5vdEluc3RhbGxlZCgkY29va2llTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRDb29raWUoJGNvb2tpZU5hbWUpID4gMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIHNlY29uZDogbnVtYmVyKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKHNlY29uZCAqIDEwMDApKTtcbiAgICAgICAgdmFyIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9VVENTdHJpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZENvb2tpZShuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICB2YXIgbmFtZUVRID0gbmFtZSArIFwiPVwiO1xuICAgICAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGMgPSBjYVtpXTtcbiAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSAnICcpIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXJhc2VDb29raWUobmFtZSA9ICcnKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29va2llKG5hbWUsIDAsIC0xKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGliL1VuaXZlcnNhbExpbmtpbmdBcHBMYXVuY2hTdHJhdGVneS50cyIsIi8qKlxuICogVGhlcmUgYXJlIGZldyBicm93c2VycyBvbiBBbmRyb2lkIHdoaWNoIGRvZXMgbm90IHN1cHBvcnQgYm90aCBhcHAgbGF1bmNoXG4gKiB3aXRoICdpbnRlbnQnIG9yICdjdXN0b20gdXJpIHNjaGVtZScuIE5vdCBldmVuIENUQSB3b3JrcyBvbiB0aG9zZSBicm93c2VyLlxuICpcbiAqIFRoaXMganVzdCBkaXNwbGF5cyBicm93c2VyIGFsZXJ0IGRpYWxvZyBib3ggd2hlbiAnV2F0Y2ggSW4gQXBwJyBidXR0b24gaXMgY2xpY2tlZC5cbiAqIEBwYXJhbSBzdHJhdGVneVBhcmFtZXRlcnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgY2xhc3MgQXBwTGF1bmNoTm90U3VwcG9ydGVkU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0cmF0ZWd5UGFyYW1ldGVyczogYW55KSB7XG4gIH1cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuc3RyYXRlZ3lQYXJhbWV0ZXJzLmdldEFwcExhdW5jaGVyRWwoKSBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBjb25zdCBpZCA9IGVsLmdldEF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXROb3RTdXBwb3J0ZWRNZXNzYWdlKCkgP1xuICAgICAgICB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXROb3RTdXBwb3J0ZWRNZXNzYWdlKCkgOiAnTm90IFN1cHBvcnRlZCc7XG4gICAgICBhbGVydChtZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9BcHBMYXVuY2hOb3RTdXBwb3J0ZWRTdHJhdGVneS50cyIsIi8qKlxuICogVGhpcyBqdXN0IHRyaWVzIHRvIHJlZGlyZWN0IHRvIGFwcCwgbm90IHRvIHRoZSBhcHAgc3RvcmUsIGFzXG4gKiB0d2l0dGVyIGlvOCBicm93c2VyIGRvZXMgb3BlbiBib3RoIGFwcCBhbmQgYXBwIHN0b3JlIHdoaWNoIGlzIG5vdFxuICogYSBnb29kIHVzZXIgZXhwZXJpZW5jZS4gSWYgdXNlciBkb2VzIG5vdCBoYXZlIGFwcCBpbnN0YWxsZWQsIHRoZXkgd2lsbCBqdXN0XG4gKiB0aGV5IHdpbGwgaGF2ZSB0byBjbGljayB0byBkb3dubG9hZCBhcHAgYnV0dG9uIG1hbnVhbGx5IHRvIGdvIHRvIGFwcCBzdG9yZS5cbiAqXG4gKiBFZywgUXVvcmEgZG9lcyB0aGUgc2FtZS5cbiAqL1xuZXhwb3J0IGNsYXNzIERpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJhdGVneVBhcmFtZXRlcnM6IGFueSkgeyB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuc3RyYXRlZ3lQYXJhbWV0ZXJzLmdldEFwcExhdW5jaGVyRWwoKSBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBhcHBVUkkgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRBcHBVcmkoKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFwcFVSSTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGliL0RpcmVjdEFwcE9ubHlMYXVuY2hTdHJhdGVneS50cyIsIi8qKlxuICogVGhpcyBpcyBvbmx5IHVzZWQgZm9yIGFuZHJvaWQgZGV2aWNlcyBhcywgdGhleSB1bmRlcnN0YW5kIHRoZSBcIkludGVudFwiIFVSSVxuICogd2hpY2ggYXV0b21hdGljYWxseSByZXNvbHZlcyB0aGUgYXBwIGluc3RhbGxhdGlvbiBzdGF0ZSBhbmQgcmVkaXJlY3RzIHVzZXJzIGFjY29yZGluZ2x5LlxuICogV2l0aCBUaGlzIHN0cmF0ZWd5LCB3ZSBjYW5ub3QgcGFzcyB0aGUgY2FtcGFpZ24gaWQsIGlmIHVzZXIgaXMgYmVpbmcgcmVkaXJlY3QgdG8gYXBwIHN0b3JlLlxuXG4gKiBAcGFyYW0gc3RyYXRlZ3lQYXJhbWV0ZXJzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGNsYXNzIENUQUludGVudEFwcExhdW5jaFN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJhdGVneVBhcmFtZXRlcnM6IGFueSkgeyB9XG4gIGluaXQoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLnN0cmF0ZWd5UGFyYW1ldGVycy5nZXRBcHBMYXVuY2hlckVsKCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdocmVmJywgdGhpcy5zdHJhdGVneVBhcmFtZXRlcnMuZ2V0SW50ZW50VVJJKCkpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvQ1RBSW50ZW50QXBwTGF1bmNoU3RyYXRlZ3kudHMiXSwic291cmNlUm9vdCI6IiJ9