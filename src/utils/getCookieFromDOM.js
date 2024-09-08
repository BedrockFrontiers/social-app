
export function getCookieFromDOM(dom, cookieName) {
    const cookiesList = dom.cookie.trim().split("; ");
    
    if (cookiesList[0].length > 0)
        return cookiesList.find((row) => row.startsWith(cookieName + '='))?.split('=')[1];

    return null;
}