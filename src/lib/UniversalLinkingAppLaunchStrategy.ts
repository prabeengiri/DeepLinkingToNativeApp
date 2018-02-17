export class UniversalLinkingAppLaunchStrategy {
    private strategyParameters: any;

    constructor(strategyParameters: any) {
        this.strategyParameters = strategyParameters;
    }

    init() {
        if (!this.strategyParameters.getUniversalLinkingUrl()) {
            //throw new Error('Universal Linking: Invalid url provided: ' + strategyParameters.getUniversalLinkingUrl());
            console.log("Error: Universal Linking: Invalid url provided: " + this.strategyParameters.getUniversalLinkingUrl());
        }
        const el = this.strategyParameters.getAppLauncherEl() as HTMLElement;
        const $cookieName = 'ul-app-detection-flag';
        const $location = this.strategyParameters.getUniversalLinkingUrl();
        if (this.appNotInstalled($cookieName)) {
            window.location.href = this.strategyParameters.getAppStoreURI();
            this.eraseCookie($cookieName);
        }

        el.setAttribute('href', $location);

        // If user navigates away/closes Fb Browser.
        window.addEventListener('blur', () => {
            this.eraseCookie($cookieName);
        });

        this.setCookie($cookieName);
        el.addEventListener('click', () => {
            this.setCookie($cookieName);
        });
    }

    // On blur will always clear the cookie, or when trying to
    // navigate to the app store, however, if user closes the fb directly,
    // then it assumes for 1 min that user does not have app installed if
    // app is not detected earlier and installed. If that happens within 1min
    // if user directly closes the fb, which means cookie still resides.
    private setCookie($cookieName: string) {
        var $cookieValue = this.readCookie($cookieName);
        if (!$cookieValue || isNaN($cookieValue)) {
            // set for 1 min.
            this.createCookie($cookieName, 1, 60)
        } else {
            // set for 1 min.
            this.createCookie($cookieName, 2, 60);
        }
    }

    // If cookie value is greater than 1, that means user does not have app installed.
    private appNotInstalled($cookieName: string) {
        return this.readCookie($cookieName) > 1;
    }

    private createCookie(name: string, value: number, second: number) {
        var date = new Date();
        date.setTime(date.getTime() + (second * 1000));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    private readCookie(name: string): number {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return parseInt(c.substring(nameEQ.length, c.length));
            }
        }
        return 0;
    }

    private eraseCookie(name = '') {
        this.createCookie(name, 0, -1);
    }
}
