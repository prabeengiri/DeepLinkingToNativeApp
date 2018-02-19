import { AppLauncherFactory } from './lib/AppLauncherFactory';
import { BrowserChecker } from './lib/BrowserChecker';
import { getQueryString, appendQueryParameter } from './lib/Utils';
import { AndroidAppLaunchStrategyParameters, IOSAppLaunchStrategyParameters } from './lib/AppLaunchStrategyFactory';

export class NativeAppLauncher {
  browserChecker: any;
  androidParameters: any;
  iOSParameters: any;
  util: any;
  private Settings: any;
  constructor() {}

  init(settings: any) {
    this.Settings = settings;

    this.browserChecker = BrowserChecker();
    this.androidParameters = new AndroidAppLaunchStrategyParameters(this.Settings);
    this.iOSParameters = new IOSAppLaunchStrategyParameters(this.Settings);
    this.util = {
      getQueryString,
      appendQueryParameter
    };

    // TODO: is this true?
    // Let all the page render finish.
    return new AppLauncherFactory(this.Settings).init();
  }
}

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
