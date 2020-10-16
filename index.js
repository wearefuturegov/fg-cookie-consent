module.exports = ({cookieName, cookieHtmlMainMessage, cookiesAcceptCookiesButtonText, cookiesRejectCookiesButtonText}, cookieCallback) => {

    cookieName =  cookieName || 'FGCookieConsent';

    const cookieButtons = document.querySelectorAll("[data-accept-cookie]");

    for (let i = 0; i < cookieButtons.length; i++) {
        cookieButtons[i].addEventListener("click", function (e) {
            var target = e.target;
            var accepted = (target.getAttribute('data-accept-cookie') == 'true');
            dismiss(accepted);
        });
    }

    function hideCookieBanner() {
        if (document.getElementById("cookie-banner") != null) {
            document.getElementById("cookie-banner").style.display = "none";
        }
    }

    function showCookieBanner() {
        if (document.getElementById("cookie-banner") != null) {
            document.getElementById("cookie-banner").style.display = "block";
        }
    }

    function dismiss(accepted) {
        var cookie = '';
        var date = new Date();
        // Cookie is valid 1 year
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        if (accepted === true) {
            cookie = {
                "bannerDismissed": true,
                "cookiesAccepted": true
            };
            document.cookie = `${cookieName}=${JSON.stringify(cookie)};expires=${date.toUTCString()};path=/`;
            location.reload(); // reload to load the cookiesss
        } else {
            cookie = {
                "bannerDismissed": true,
                "cookiesAccepted": false
            };
            document.cookie = `${cookieName}=${JSON.stringify(cookie)};expires=${date.toUTCString()};path=/`;
            hideCookieBanner();
        }
    }


    function checkCookie() {
        // on every page load run this.
        var myCookie = getCookie(cookieName);
        if (myCookie == null) {
            // no cookie - show banner
            showCookieBanner();
        } else {
            // we have cookie		
            var cookiesAccepted = JSON.parse(myCookie).cookiesAccepted;
            var bannerDismissed = JSON.parse(myCookie).bannerDismissed;

            // banner already dismissed - hide the banner
            if (!bannerDismissed) {
                hideCookieBanner();
            }

            if (cookiesAccepted) {
                // we've accepted cookies so load all the things
                loadAnalytics();
            }

        }
    }

    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = dc.length;
            }
        }

        return decodeURI(dc.substring(begin + prefix.length, end));
    }



    function loadAnalytics() {
        console.log('loadAnalytics');
        try {
            cookieCallback();   
        } catch (error) {
            throw new Error(`You didn't include a callback function`)
        }
       
    }


    checkCookie()

};