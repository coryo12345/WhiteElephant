// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('sw.js')
//             .then(registration => console.log('Service Worker Registered'))
//             .catch(err => 'SW registration failed')
//     });
// }

async function createSession() {
    response = await fetch('/create');
    json = await response.json();
    setSession(json.id);
}

async function joinSession() {
    code = document.getElementById('code');
    id = code.value;
    response = await fetch(`/join/${id}`);
    json = await response.json();
    if (json.id != 'error')
        setSession(json.id);
    else {
        p = document.getElementById('join-output');
        p.innerHTML = "That session does not exist!";
    }
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

function setSession(id = 0) {
    session = document.getElementById('session');
    session.innerHTML = id;
}