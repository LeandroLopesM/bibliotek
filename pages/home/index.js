document.addEventListener('DOMContentLoaded', () => {
    // const header_height = document.querySelector('header').offsetHeight;
    // document.querySelector(':root').style.setProperty('--content-offset', `${header_height}`);

    setUserButtons(window.getCookie('userInfo'));
    setTheme(window.getCookie('darkMode'));
});

async function setTheme(modeCookie)
{
    if(modeCookie !== undefined)
    {
        // document.body.style.setProperty('--background', '#999');
        // document.body.style.setProperty('--light', '#aaa');
        // document.body.style.setProperty('--dark', '#666');
        // document.body.style.setProperty('--text', '#000');
    }
}

async function setUserButtons(userInfo)
{
    if(userInfo === null)
    {
        document.querySelector('.user-buttons').innerHTML += 
        '<button onclick="window.goTo(\'register\')" class="roboto-heavy user-button">REGISTER</button> \
        <button onclick="window.goTo(\'login\')" class="roboto-heavy user-button">LOGIN</button>'

        fetch('api/home/loggedIn.html').then(function (response) {
            return response.text()
        })
        .then(function (res) {
            document.querySelector('.content').innerHTML += res;
        });
    }
    else
    {
        document.querySelector('.user-buttons').innerHTML += 
        '<button onclick="window.goTo(\'userinfo\')" class="roboto-heavy user-button">MANAGE</button>';
        document.querySelector('.content').innerHTML += await fetch('api/home/unloggedIn.html');
    }
}