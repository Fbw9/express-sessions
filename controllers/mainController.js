const mongoose = require('mongoose');
const UserSchema = require('../models/UserSchema')
const User = mongoose.model('User', UserSchema);
const SessionSchema = require('../models/SessionSchema')
const Session = mongoose.model('Session', SessionSchema);

const mainController = {}

mainController.index = (req, res) => {
    if (!req.cookies || !req.cookies.session_id) {
        res.redirect('/login');
    }

    res.send('homepage<br><br><a href="/logout">Logout</a>');
};

mainController.users = (req, res) => {
    if (!req.cookies || !req.cookies.session_id) {
        res.redirect('/login');
    }

    res.send('users<br><br><a href="/logout">Logout</a>');
};

mainController.friends = (req, res) => {
    if (!req.cookies || !req.cookies.session_id) {
        res.redirect('/login');
    }

    console.log('session_id', req.cookies.session_id);

    Session.findOne({uuid: req.cookies.session_id}).exec((error, session) => {
        if (session) {
            User.findOne({_id: session.user_id}).exec((error, user) => {
                if (user) {
                    console.log(user);
                    let username = user.firstName;
                    res.send(`
                       <p>Hi, ${username}!</p>
                        <br><br><a href="/logout">Logout</a>
                    `);
                }
            });
        }
    });
};

module.exports = mainController;
