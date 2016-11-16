# Browser DeepLinking to Native App
JavaScript to DeepLink to Native App. Redirect from mobile browser to native app.


Based on the modern mobile browsers, I have compiled down different deeplinking implementation as following:

##### DirectAppLaunchStrategy
> This is the most common deeplinking strategy/implementation where browser tries to open app using `Iframe` or 
`window.location`, and then to app store after few seconds as soon as window is loaded. Most of the browsers still support this. 

##### DirectAppOnlyLaunchStrategy
> This is same as `DirectAppLaunchStrategy`, but it only tries to open app, not app store. Twitter browser on iOS8, 
opens 'Open URL..' dialog box and also redirects to app store without waiting for 'Open Url' dialog box to get dismissed.
This is only used for iOS8 Twitter Browser.

##### CTAAppLaunchStrategy (Call to Action)
> This requires user action to redirect to app or app store. Landing page needs to have element with `id` attribute. 
Essentially it is same as `DirectAppOnlyLaunchStrategy`, but this requires user action/click.

##### UniversalLinkAppLaunchStrategy (Introduced on iOS9).
> This is new deep linking technique introduced on IOS9. Same http url is used to open app or in browser.
If app is installed and configured to work with universal link, then automatically opens the app from browser, 
ios message app and other apps.
For this to work:
    1. Website should have valid Universal Link(json file in root of website, apple-app-site-association) 
    which defines path that will be used for universal linking. Eg /deeplink/*, *
    2. App should be specify the domains that can be used for universal linking to the app. Eg.
    https://www.linkedin.com, https://www.twitter.com.
    While app is installing it invokes the Universal link present on the domain specified and registers those path
    for universal linking.
    
This technique will just change the url of 'Open In App' button, to the url that does universal linking.

> To test if, universal linking is working for iOS App, tap the universal link from message app on Ios.
If it does not open the app, then it means universal link is not configured properly. 

> **Important:** This is only being used on iOS9 Facebook browser. For this to work, landing page which is used for 
  deeplinking should be cross domain. Otherwise it won't work. To get it working with Facebook and iOS9 directly, Facebook 
  `applink` method can also be used, but it also requires some implementation on the App side.  
 
 
##### NotSupportedAppLaunchStrategy.
> This implementation displays browser dialog box with message provided in settings. Some of the browsers in Android
Device does not understand `Intent` or Custom URI Scheme `myapp://`.  
 


## IOS
| OS/Browser   	| Facebook                       	| Twitter                 	| Chrome                  	| Safari                  	|
|--------------	|--------------------------------	|-------------------------	|-------------------------	|-------------------------	|
| Version <= 8 	| DirectAppLaunchStrategy        	| DirectAppLaunchStrategy 	| DirectAppLaunchStrategy 	| DirectAppLaunchStrategy 	|
| Version >= 9 	| UniversalLinkAppLaunchStrategy 	| DirectAppLaunchStrategy 	| DirectAppLaunchStrategy 	| DirectAppLaunchStrategy 	|

## Android
| OS/Browser     	| Facebook             	| Twitter              	| Chrome               	| Safari               	| Stock                         	| Native                        	|
|----------------	|----------------------	|----------------------	|----------------------	|----------------------	|-------------------------------	|-------------------------------	|
| Version >= 4.3 	| CTAAppLaunchStrategy 	| CTAAppLaunchStrategy 	| CTAAppLaunchStrategy 	| CTAAppLaunchStrategy 	| NotSupportedAppLaunchStrategy 	| NotSupportedAppLaunchStrategy 	|

##### I have not tested it on < Android 4.3. But if it needs to be supported, create an issue or send a pull request.

## Desktop
**Does Nothing!!!**



###Usage (Requires Jquery)
```
$(document).ready(function() {
    NativeAppLauncher.init({
      appLauncherElId: 'open-app-link', // Element Id of App Launcher button. 
      notSupportedMessage: 'Sorry, you’ll need to use a different browser to do this.',
      universalLinkUrl: 'http://mysite.com',
      appUri: 'myapp://',
      androidAppId: 'com.mycompany.app.enterprise',
      iOsAppStore:'https://itunes.apple.com/app/apple-store/id234234234?pt=12121212&mt=8',
      debug:false, // Optional
      campaignCode: 'this-is-test-campaign' // optional, this appends campaign on app store url.
    });
});
```



    
