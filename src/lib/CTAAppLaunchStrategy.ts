import { DirectAppLaunchStrategy } from './DirectAppLaunchStrategy';
/**
 * This is Call to Action. Modern and recent browsers are moving towards this approach.
 * They are requiring user action to deep link to the app. First is assigns click event
 * to 'watch in app' link which will ultimately invoke DirectAppLaunchStrategy().
 *
 * @param strategyParameters
 * @constructor
 */
export class CTAAppLaunchStrategy {
  strategyParameters: any;
  constructor(strategyParameters: any) {
    this.strategyParameters = strategyParameters;
  }

  init() {
    const directStrategy = new DirectAppLaunchStrategy(this.strategyParameters);
    const el = this.strategyParameters.getAppLauncherEl() as HTMLElement;
    const id = el.getAttribute('id');

    const body = window.document.querySelector('body') as HTMLElement;
    body.addEventListener('click', (ev: Event) => {
      const el = ev.target as HTMLElement;
      if (id) {
        if (el.matches(id)) {
          ev.preventDefault()
          directStrategy.init();
        }
      }
    })
  }
}
