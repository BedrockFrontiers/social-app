
export function getCookieFromDOM(dom, cookieName){
    const cookieValue = dom.cookie
        .split('; ')
        .find((row) => row.startsWith(cookieName+'='))
        .split('=')[1];
    return cookieValue;
}