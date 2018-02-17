export class DirectAppLaunchStrategy {
  strategyParameters: any;
  events = ["pagehide", "blur", "beforeunload"];
  timeout: number | null = null;
  el: HTMLElement;

  constructor(strategyParameters: any) {
    this.strategyParameters = strategyParameters;
    this.el = this.strategyParameters.getAppLauncherEl();
  }
  // Events that gets executed if page is transitioning away.
  preventDialog() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
    this.events.forEach((evname) => {
      window.removeEventListener(evname, this.preventDialog);
    });
  }

  init() {
    this.redirect();
    // If user navigates back to browser and clicks the button,
    // try redirecting again.
    // this.el.removeEventListener(click);
    this.el.addEventListener('click', (e) => {
      e.preventDefault();
      this.redirect();
    });
  }

  private redirect() {
    window.location.href = this.strategyParameters.getAppUri();
    this.events.forEach((evname) => {
      window.addEventListener(evname, this.preventDialog);
    });

    this.timeout = setTimeout(() => {
      window.top.location.href = this.strategyParameters.getAppStoreURI();
    }, 1500);
  }
}
