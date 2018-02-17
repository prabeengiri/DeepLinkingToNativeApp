/**
 * This is only used for android devices as, they understand the "Intent" URI
 * which automatically resolves the app installation state and redirects users accordingly.
 * With This strategy, we cannot pass the campaign id, if user is being redirect to app store.

 * @param strategyParameters
 * @constructor
 */
export class CTAIntentAppLaunchStrategy {
  constructor(private strategyParameters: any) { }
  init() {
    const el = this.strategyParameters.getAppLauncherEl() as HTMLElement;
    el.setAttribute('href', this.strategyParameters.getIntentURI())
  }
}
