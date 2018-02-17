import { BrowserChecker } from './BrowserChecker';
import { appendQueryParameter } from './Utils';
import { CTAAppLaunchStrategy } from './CTAAppLaunchStrategy';
import { DirectAppLaunchStrategy } from './DirectAppLaunchStrategy';
import { UniversalLinkingAppLaunchStrategy } from './UniversalLinkingAppLaunchStrategy';
import { AppLaunchNotSupportedStrategy } from './AppLaunchNotSupportedStrategy';
import { DirectAppOnlyLaunchStrategy } from './DirectAppOnlyLaunchStrategy';
import { CTAIntentAppLaunchStrategy } from './CTAIntentAppLaunchStrategy';
export enum StrategyEnum {
  cta,
  direct,
  ul,
  notsupported,
  directapponly,
  intent_cta
}

export function AppLaunchStrategyFactory(strategyType: StrategyEnum, settings: any) {
  const strategyParameters = AppLaunchStrategyParameterFactory(settings);
  let appLaunchStrategy;

  if (strategyType == StrategyEnum.cta || strategyType == undefined) {
    appLaunchStrategy = new CTAAppLaunchStrategy(strategyParameters);
  } else if (strategyType == StrategyEnum.direct) {
    appLaunchStrategy = new DirectAppLaunchStrategy(strategyParameters);
  } else if (strategyType == StrategyEnum.ul) {
    appLaunchStrategy = new UniversalLinkingAppLaunchStrategy(strategyParameters);
  } else if (strategyType == StrategyEnum.notsupported) {
    appLaunchStrategy = new AppLaunchNotSupportedStrategy(strategyParameters);
  } else if (strategyType == StrategyEnum.directapponly) {
    appLaunchStrategy = new DirectAppOnlyLaunchStrategy(strategyParameters);
  } else if (strategyType == StrategyEnum.intent_cta) {
    appLaunchStrategy = new CTAIntentAppLaunchStrategy(strategyParameters);
  } else {
    throw new Error('Deeplinking: Unsupported deeplinking strategy type');
  }

  // if (Settings.debug && appLaunchStrategy) {
  //   __debug("AppLaunchStrategyType", strategyType);
  // }
  return appLaunchStrategy;

}

export function AppLaunchStrategyParameterFactory(settings: any) {
  let strategyParameters = new AppLaunchStrategyParameters(settings);
  // let parameterType;

  if (BrowserChecker().isIOS) {
    // parameterType = 'ios';
    strategyParameters = new IOSAppLaunchStrategyParameters(settings);
  } else if (BrowserChecker().isAndroid) {
    // parameterType = 'android';
    strategyParameters = new AndroidAppLaunchStrategyParameters(settings);
  } else {
    // parameterType = 'desktop or default';
    // strategyParameters = AppLaunchStrategyParameters;
  }

  // if (Settings.debug && strategyParameters) {
  //   __debug("AppLaunchParameter", parameterType);
  // }
  return strategyParameters;
};


export class AppLaunchStrategyParameters {
  public settings: any;
  constructor(settings: any) {
    this.settings = settings;
  }
  // On desktop, we don't know what to do.
  getAppUri() {
    return "#";
  }
  getAppLauncherEl(): HTMLElement | null {
    if (!this.settings.appLauncherElId) {
      throw new Error('Settings does not have valid appLauncherElId');
    }
    return window.document.getElementById(this.settings.appLauncherElId);
  }

  // This message is displayed if any browser does not support deep linking.
  getNotSupportedMessage() {
    if (this.settings.appLauncherElId) {
      throw new Error('Settings does not have valid NotSupportedMessage');
    }
    return this.settings.notSupportedMessage;
  }

  //TODO: Campaign can be created as separate decorator/proxy object
  getCampaignValue() {
    return this.settings.campaignCode;
  }

  // Default Store URI, not sure where to go :).
  getAppStoreURI() {
    return "#";
  }

  getIntentURI(): string | null { return null; }
  getUniversalLinkingUrl(): string | null { return null; }
}


/**
 * @inherits AppLaunchStrategyParameters
 * Extends Base App Launch Strategy Parameters which are required for
 * Android App Launch Strategies.
 */
export class AndroidAppLaunchStrategyParameters extends AppLaunchStrategyParameters {
  constructor(settings: any) {
    super(settings);
  }
  getIntentURI() {
    return "intent://m/#Intent;scheme=" + this.settings.appUri + ";package=" + this.settings.androidAppId + ";end";
  }
  getAppUri() {
    return this.settings.appUri;
  }
  getAppStoreURI() {
    var campaignString = this.getCampaignValue() ? "&referrer=utm_source%3Dother%26utm_campaign%3D" + this.getCampaignValue() : "";
    return "https://play.google.com/store/apps/details?id=" + this.settings.androidAppId + campaignString;
  }
}

/**
 * Extends Base App Launch Strategy Parameters which are required for
 * Ios App Launch Strategies.
 */
export class IOSAppLaunchStrategyParameters extends AppLaunchStrategyParameters {
  constructor(settings: any) {
    super(settings);
  }
  getAppStoreURI() {
    return this.getCampaignValue() ?
      appendQueryParameter(this.settings.iOsAppStore, 'ct', this.getCampaignValue()) : this.settings.iOsAppStore;
  }

  getUniversalLinkingUrl() {
    return this.settings.universalLinkUrl;
  }

  getAppUri() {
    if (!this.settings.appUri) {
      throw new Error('Settings does not have valid AppURI')
    }
    return this.settings.appUri;
  }
}

