export function BrowserChecker() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var iOSVersion = function () {
        if (!isIOS()) {
            return false;
        }
        const match = userAgent.match(/os\s+(\d+)_/);
        if (!match) {
            return false;
        }
        return parseInt(match[1], 10)
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
    }
}
