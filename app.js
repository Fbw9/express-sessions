var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();

app.use(cookieParser());

app.get('/login', function (req, res) {
    if (req.cookies && req.cookies.session_id) {
        res.redirect('/');
    }

    if (req.query.email && 
        req.query.password && 
        req.query.email === 'test@test.com' && 
        req.query.password === '1234'
    ) {
        res.cookie('session_id', '283472u3z4t23jh4gjh23fhj423', {
            expires: new Date(Date.now() + 900000)
        });

        res.redirect('/');
    }

    res.send('login form<br><br><a href="/login?email=test@test.com&password=1234">Push login button</a>');
});

app.get('/logout', function (req, res) {
    if (req.cookies && req.cookies.session_id) {
        res.clearCookie('session_id');
    }
    
    res.redirect('/login');
});

app.get('/', function (req, res) {
    if (!req.cookies || !req.cookies.session_id) {
        res.redirect('/login');
    }

    res.send('homepage<br><br><a href="/logout">Logout</a>');
});

app.get('/users', function (req, res) {
    if (!req.cookies || !req.cookies.session_id) {
        res.redirect('/login');
    }

    res.send('users<br><br><a href="/logout">Logout</a>');
});

app.get('/friends', function (req, res) {
    if (!req.cookies || !req.cookies.session_id) {
        res.redirect('/login');
    }

    res.send('friends<br><br><a href="/logout">Logout</a>');
});

app.listen(3000)
