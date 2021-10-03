var express = require('express');
const { Mongoose } = require('mongoose');
var router = express.Router();
const crypt = require('../util/crypt');
const jwt = require('../util/jwt');
const AuthUser = require('../models/authuser');

router.post('/login', (req, res, next) => {
    console.log('login');
    AuthUser.findOne({
        email: req.body.email
    }, (err, doc) => {
        if(err) {
            res.json(err);
            // res.json({status: 'invalid password'});
        } else if (doc) {
            if(req.body.password === doc.password) {
                res.json({
                    token: jwt.generateToken({
                        _id: doc._id,
                        email: doc.email,
                        role: doc.role
                    })
                });
            } else {
                res.json({status: 'invalid password'});
            }
        } else {
            res.json({error: "email not registered"});
        }
    })
    // res.json({status: "authentication working"});
});

function registerUser(email, password, role, res){
    console.log('registerUser');
    try {
        // let hashPassword = crypt.encrypt(password);
        let authUser = {
            email: email,
            password: password,
            role: role
        };
        AuthUser.create(authUser, (err, doc) => {
            if(err) {
                res.json({
                    error: err
                });
            } else {
                res.json({
                    _id: doc._id,
                    email: doc.email,
                    role: doc.role
                });
            }
        });
    } catch (e) {
        console.log(e);
        res.json( { error: e } );
    }
}

// router.post('/register/manager', (req, res, next) => {
//     console.log('register/manager');
//     registerUser(req.body.email, req.body.password, 'Manager', res);
// });

router.post('/register/supervisor', (req, res, next) => {
    console.log('register/supervisor');
    if(req.headers.authorization){
        let user = jwt.getPayload(req.headers.authorization);
        if(user.role && user.role.toLocaleLowerCase() == "manager".toLocaleLowerCase()) {
            registerUser(req.body.email, req.body.password, 'Supervisor', res);
        } else {
            res.status(400).json({
                error: 'Unauthorized user'
            });
        }
    } else {
        res.status(400).json({
            error: 'Authorization bearer token is missing'
        });
    }
});

router.post('/register', (req, res, next) => {
    console.log('register');
    registerUser(req.body.email, req.body.password, 'Distributor', res);
});

router.post('/resetpassword', (req, res, next) => {
    console.log('resetpassword');
    try {
        let hashPassword = crypt.encrypt(req.body.password);
        AuthUser.updateOne({email: req.body.email}, {password : hashPassword}, (err, doc) => {
            if(err) {
                res.json({
                    error: err
                });
            } else {
                res.json(doc);
            }
        });
    } catch (e) {
        console.log(e);
        res.json( { error: e } );
    }
});


module.exports = router;