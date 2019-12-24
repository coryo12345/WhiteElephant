const express = require('express');
const app = express();
const port = 3001;
var session = require('express-session');
var Game = require('./model.js');

var games = [];

app.use(session({ secret: "white_elephant!" }));

app.get('/join/:code', (req, res) => {
    console.log(req.params.code);
    console.log(getGame(req.param.code));
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
    var g = new Game(1 + id);
    games.push(g);
    req.session.game = id;
    res.json({id: id});
    console.log(`created new game with id ${1 + id}`);
});

app.post('/addItem', (req, res) => {

});

app.get('/latest', (req, res) => {
    g = getGame(req.session.game);
    res.send({text: g.getLatest()});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getGame(code) {
    return games.forEach(game => {
        console.log(game);
        if (game.code == code)
            return game;
    });
    return null;
}
