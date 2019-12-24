const express = require('express');
const app = express();
const port = 3101;
var session = require('express-session');
var Game = require('./model.js');

var games = [];

app.use(express.json())
app.use(session({ secret: "white_elephant!" }));

app.get('/join/:code', (req, res) => {
    console.log(req.params.code);
    if (getGame(req.params.code) != null) {
        req.session.game = req.params.code;
        res.json({id: req.params.code});
        console.log(`player join game ${req.session.game}`);
    }
    else
        res.json({id: 'error'});
});

app.get('/create', (req, res) => {
    var id = 0;
    if (games.length == 0) {
        id = 1225;
    }
    else {
        games.forEach(game => {
            if (game.code > id)
                id = game.code;
        });
    }
    id++;
    var g = new Game(id);
    games.push(g);
    req.session.game = id;
    res.json({code: id});
    console.log(id);
    console.log(`created new game with id ${id}`);
});

app.post('/setItems', (req, res) => {
    game = getGame(req.session.game);
    if (game == null) {
        res.json({code: 'error'});
    }
    item0 = req.body.item1;
    item1 = req.body.item2;
    item2 = req.body.item3;
    item3 = req.body.item4;
    item4 = req.body.item5;
    item5 = req.body.item6;
    game.items.push(item0);
    game.items.push(item1);
    game.items.push(item2);
    game.items.push(item3);
    game.items.push(item4);
    game.items.push(item5);
    res.json({code: 200});
});

app.get('/latest', (req, res) => {
    g = getGame(req.session.game);
    if (g == null) {
        res.json({roll: null, text: ''});
    }
    else {
        res.json({roll: g.latest, text: g.getLatest()});
    }
});

app.get('/code', (req, res) => {
    res.json({code: req.session.game});
});

app.get('/leave', (req, res) => {
    req.session.game = null;
    res.json({code: 200});
});

app.post('/roll', (req, res) => {
    g = getGame(req.session.game);
    if (g == null) {
        res.json({code: 'error'});
    }
    else {
        g.latest = g.randomItem();
        console.log(g.latest);
        res.json({code: 200});
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getGame(id) {
    g = null;
    games.forEach(game => {
        if (game.code == id)
            g = game;
    });
    return g;
}
