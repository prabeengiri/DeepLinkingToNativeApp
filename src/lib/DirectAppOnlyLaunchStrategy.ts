/**
 * This just tries to redirect to app, not to the app store, as
 * twitter io8 browser does open both app and app store which is not
 * a good user experience. If user does not have app installed, they will just
 * they will have to click to download app button manually to go to app store.
 *
 * Eg, Quora does the same.
 */
export class DirectAppOnlyLaunchStrategy {

  constructor(private strategyParameters: any) { }

  init() {
    const el = this.strategyParameters.getAppLauncherEl() as HTMLElement;
    const appURI = this.strategyParameters.getAppUri();

    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.reload();
    });
    window.location.href = appURI;
  }

}
