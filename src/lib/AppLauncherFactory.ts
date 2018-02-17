import { BrowserChecker } from './BrowserChecker';
import { AppLaunchStrategyFactory, StrategyEnum } from './AppLaunchStrategyFactory';
/**
* This is the main factory which creates the deeplinking strategy object based
* on the type of browser and its versions. Multiple instances of strategy will be created
* as we will require just one, but we don't have to worry about Garbage collection.
*
* @returns {AppLaunchStrategyFactory}
* @constructor
*/
export class AppLauncherFactory {
  private browser: any;
  private deepLinkingStrategy: any;

  constructor(private settings: any) {
    this.browser = BrowserChecker();

    this.assignStrategy();
    return this.deepLinkingStrategy;
  }

  private assignStrategy() {
    // Default strategy.
    this.deepLinkingStrategy = AppLaunchStrategyFactory(StrategyEnum.cta, this.settings);
    if (this.browser.isIOS) {
      //deepLinkingStrategy = new AppLaunchStrategyFactory('cta');
      if (this.browser.iOSVersion < 9) {
        this.deepLinkingStrategy = AppLaunchStrategyFactory(StrategyEnum.direct, this.settings);
        if (this.browser.isTwitter) {
          this.deepLinkingStrategy = AppLaunchStrategyFactory(StrategyEnum.directapponly, this.settings);
        }
      }
      // If IOS >= 9.
      else {
        this.deepLinkingStrategy = AppLaunchStrategyFactory(StrategyEnum.direct, this.settings);
        //this.deepLinkingStrategy = new AppLaunchStrategyFactory('ul');

        // Other strategy does not work on FB, other than ul.
        if (this.browser.isFacebook) {
          this.deepLinkingStrategy = AppLaunchStrategyFactory(StrategyEnum.ul, this.settings);
        }
      }
    }
    else if (this.browser.isAndroid) {
      this.deepLinkingStrategy = AppLaunchStrategyFactory(StrategyEnum.intent_cta, this.settings);
      if (this.browser.isAndroidNativeBrowser || this.browser.isAndroidStockBrowser) {
        this.deepLinkingStrategy = AppLaunchStrategyFactory(StrategyEnum.notsupported, this.settings);
      }
    }

    // if (this.settings.debug == true) {
    //   __debug('browser', browser);
    // }

  }
}
