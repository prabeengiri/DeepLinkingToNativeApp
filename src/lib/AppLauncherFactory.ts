import { BrowserChecker } from './BrowserChecker';
import { AppLaunchStrategyFactory, StrategyEnum } from './AppLaunchStrategyFactory';
import { CTAAppLaunchStrategy } from './CTAAppLaunchStrategy';
import { DirectAppLaunchStrategy } from './DirectAppLaunchStrategy';
import { UniversalLinkingAppLaunchStrategy } from './UniversalLinkingAppLaunchStrategy';
import { AppLaunchNotSupportedStrategy } from './AppLaunchNotSupportedStrategy';
import { DirectAppOnlyLaunchStrategy } from './DirectAppOnlyLaunchStrategy';
import { CTAIntentAppLaunchStrategy } from './CTAIntentAppLaunchStrategy';
/**
* This is the main factory which creates the deeplinking strategy object based
* on the type of browser and its versions. Multiple instances of strategy will be created
* as we will require just one, but we don't have to worry about Garbage collection.
*
* @returns {AppLaunchStrategyFactory}
* @constructor
*/
export class AppLauncherFactory {
  // FIXME: make this class abstract so that it could return one of the sub strategy types
  [x: string]: any; // just a quick fix :(
  private browser: any;
  private deepLinkingStrategy: CTAAppLaunchStrategy | DirectAppLaunchStrategy | UniversalLinkingAppLaunchStrategy | AppLaunchNotSupportedStrategy | DirectAppOnlyLaunchStrategy | CTAIntentAppLaunchStrategy;

  constructor(private settings: any) {
    this.browser = BrowserChecker();
    this.deepLinkingStrategy =  this.assignStrategy(); // just to satisfy the compiler
    return this.deepLinkingStrategy as any;
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

    return this.deepLinkingStrategy;

    // if (this.settings.debug == true) {
    //   __debug('browser', browser);
    // }

  }
}
