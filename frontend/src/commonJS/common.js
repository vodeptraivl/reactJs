
export function setCookie(nameCookie, data) {
    // Build the expiration date string:
    var expiration_date = new Date();
    expiration_date.setFullYear(expiration_date.getFullYear() + 1);
    document.cookie = nameCookie + "=" + data + ";path=/; expires=" + expiration_date.toUTCString();
}

export function getcookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    } else {
        return null;
    }
}

export function delAllCookie() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        if (cookie.indexOf('lang') > -1 || cookie.indexOf('sysname') > -1 || cookie.indexOf('redirect') > -1) {
            continue;
        }
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=delete;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function deleteCookie(nameCookie) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        if (cookie.indexOf(nameCookie) > -1) {
            document.cookie = nameCookie + "=delete;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}
