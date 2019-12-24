// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('sw.js')
//             .then(registration => console.log('Service Worker Registered'))
//             .catch(err => 'SW registration failed')
//     });
// }

document.addEventListener('DOMContentLoaded', pageLoad);

async function pageLoad() {
    session = document.getElementById('session');
    response = await fetch('/code');
    json = await response.json();
    if (json.code == null) {
        session.innerHTML = 'None';
    }
    else {
        session.innerHTML = json.code;
    }
}

async function createSession() {
    response = await fetch('/create');
    json = await response.json();
    window.location = '/items.html';
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

function setSession(id = 0) {
    session = document.getElementById('session');
    session.innerHTML = id;
    window.location = '/game.html';
}

async function submitItems() {
    item1 = document.getElementById('item1');
    item2 = document.getElementById('item2');
    item3 = document.getElementById('item3');
    item4 = document.getElementById('item4');
    item5 = document.getElementById('item5');
    item6 = document.getElementById('item6');
    items = {
        item1: item1.value,
        item2: item2.value,
        item3: item3.value,
        item4: item4.value,
        item5: item5.value,
        item6: item6.value
    };
    json = postData('/setItems', items);
    if (json.code != 'error') {
        window.location = '/game.html';
    }
    else {
        p = document.getElementById('error');
        p.style.display = 'block';
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

async function roll(dice) {
    postData('/roll', {});
    dice.style.color = 'red';
}