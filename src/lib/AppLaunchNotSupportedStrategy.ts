/**
 * There are few browsers on Android which does not support both app launch
 * with 'intent' or 'custom uri scheme'. Not even CTA works on those browser.
 *
 * This just displays browser alert dialog box when 'Watch In App' button is clicked.
 * @param strategyParameters
 * @constructor
 */
export class AppLaunchNotSupportedStrategy {
  constructor(private strategyParameters: any) {
  }
  init() {
    const el = this.strategyParameters.getAppLauncherEl() as HTMLElement;
    // const id = el.getAttribute('id');

    el.addEventListener('click', (e) => {
      e.preventDefault();
      const message = this.strategyParameters.getNotSupportedMessage() ?
        this.strategyParameters.getNotSupportedMessage() : 'Not Supported';
      alert(message);
    });
  }
}
