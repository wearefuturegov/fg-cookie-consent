// import cookieConsent from "@futuregov/cookie-consent"
import cookieConsent from "../index"


const options = {
    cookieName: "test-cookie",
    cookieHtmlMainMessage: `<p>We use cookies to collect information about how you use this site.<br />We use this information to make the website work as well as possible and improve our services.<br /><a href="/privacy">Learn more about how we use cookies</a></p>`,
    cookiesAcceptCookiesButtonText: "Accept all cookies",
    cookiesRejectCookiesButtonText: "Do not accept",
}

const callback = () => {
    var tag = document.createElement("script");
    tag.src = "https://www.googletagmanager.com/gtag/js?id=<%= ENV[\"GTM_TRACKING_ID\"] %>";
    document.getElementsByTagName("head")[0].appendChild(tag);



    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', '<%= ENV["GA_TRACKING_ID"] %>');


    (function (h, o, t, j, a, r) {
        h.hj = h.hj || function () {
            (h.hj.q = h.hj.q || []).push(arguments)
        };
        h._hjSettings = {
            hjid: 12345,
            hjsv: 6
        };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

}

cookieConsent(options, callback);

