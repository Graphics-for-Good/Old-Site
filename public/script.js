// Set the initial height property
setHeight({target: window})
// Add event listener to update height on window resize
window.addEventListener('resize', setHeight)

// Function to set the height property
function setHeight(e) {
    document.documentElement.style.setProperty('--dHeight', window.innerHeight)
}

// Check if the user is in beta mode
var isBeta = !!localStorage.getItem('isBeta')
if (isBeta) document.body.classList.add('isBeta')

// Ensure queryString and urlParams are defined
var queryString = window.location.search || ''
var urlParams = new URLSearchParams(queryString);

// Clean up URL if it contains redundant '&' characters
if (location.href.includes('&&')) {
    location.href = location.href.replace('&&', '&')
}
else if (location.href.includes('?&')) {
    location.href = location.href.replace('?&', '?')
}

// Function to set a cookie
function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Check for overflow parameter and set overflow style
let overflow = urlParams.get('o')
if (overflow === 'n') {
    document.documentElement.setAttribute('style', 'overflow: hidden;')
}

// Set target="_blank" for external links
document.querySelectorAll('a').forEach(a => {
    if(!!a.target === false) {
        if (a.href.startsWith('/') === false) {
            if (a.href.includes('://')) {
                if (a.href.split('://')[1].startsWith(location.host) === false) {
                    a.target = '_blank'
                }
            }
        }
    }
})

// Normalize the pathname
let pathName = location.pathname
if (pathName.endsWith('/')) {
    pathName = pathName.substring(0, pathName.split('').length - 1)
}

// Check if the body height is less than the window height
let isTall = false
if (document.body.clientHeight < window.innerHeight) {
    isTall === true
    document.documentElement.classList.add('fullHeight')
    if (!!document.getElementsByTagName('main')[0]) {
        if (document.getElementsByTagName('main').length === 1) {
            document.getElementsByTagName('main')[0].style.flex = 1
        }
    }
    if (!!document.getElementsByClassName('hero')[0]) {
        document.getElementsByTagName('main')[0].style.display = 'flex'
        document.getElementsByTagName('main')[0].style.flexDirection = 'column'
        document.getElementsByClassName('hero')[0].style.flex = '1'
    }
    else {
        document.body.classList.add('fullHeight')
    }
}
else {
    document.documentElement.classList.remove('fullHeight')
    document.body.classList.remove('fullHeight')
}