document.addEventListener('DOMContentLoaded', () => {
    var root = document.querySelector(':root');

    setUserButtons(window.getCookie('userInfo'));
    setTheme(window.getCookie('darkMode'));
});

async function setTheme(modeCookie)
{
    if(modeCookie !== undefined)
    {
        document.body.style.setProperty('--background', '#999');
        document.body.style.setProperty('--light', '#aaa');
        document.body.style.setProperty('--dark', '#666');
        document.body.style.setProperty('--text', '#000');
    }
}

async function setUserButtons(userInfo)
{
    if(userInfo === null)
    {
        document.querySelector('.user-buttons').innerHTML += 
        '<button onclick="window.goTo(\'register\')" class="roboto-heavy user-button">REGISTER</button> \
        <button onclick="window.goTo(\'login\')" class="roboto-heavy user-button">LOGIN</button>'
        
        document.querySelector('.content').innerHTML += (await (await fetch('api/home/loggedIn.html')).bytes()).toString('utf-8');
    }
    else
    {
        document.querySelector('.user-buttons').innerHTML += 
        '<button onclick="window.goTo(\'userinfo\')" class="roboto-heavy user-button">MANAGE</button>';
        document.querySelector('.content').innerHTML += await fetch('api/home/unloggedIn.html');
    }
}