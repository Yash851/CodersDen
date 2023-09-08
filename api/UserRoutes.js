import express from 'express';
import jwt from 'jsonwebtoken';
import db from './db.js';
import bcrypt from 'bcrypt';
const UserRoutes = express.Router();
const secret = 'secret';

UserRoutes.get('/profile', (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.status(403);
        }
        else {
            res.json(data);

        }
    })
})

UserRoutes.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.select('password')
        .from('users')
        .where({ email })
        .first()
        .then(user => {
            const isLoginOk = bcrypt.compareSync(password, user.password);
            isLoginOk && jwt.sign(email, secret, function (err, token) {
                if (err) {
                    res.status(403).send();
                }
                else {
                    db('users').where({ email }).update({ token })
                        .then(() => {
                            res.cookie('token', token).send();
                        })
                }
            })
            if (!isLoginOk) {
                res.status(403).send();
            }
        })
        .catch(e => {
            console.log(e);
            res.status(422).send();
        })

})

UserRoutes.post('/register', (req, res) => {
    const { fname, lname, email, password } = req.body;
    db
        .select('*')
        .from('users')
        .where({ email })
        .then(rows => {
            if (rows.length == 0) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                db('users').insert({ fname, lname, email, password: hashedPassword })
                    .then(() => {
                        jwt.sign(email, secret, function (err, token) {
                            if (err) {
                                res.status(403).send();
                            }
                            else {
                                db('users').where({ email }).update({ token })
                                    .then(() => {
                                        res.cookie('token', token).send();
                                    })
                            }
                        })
                    })
                    .catch(e => {
                        console.log(e);
                        res.status(422).send('User creation failed');
                    });
            }
            else {
                res.status(422).send('Email already exists. Please try to login.');
            }
        })
})

UserRoutes.post('/logout', (req, res) => {
    res.clearCookie('token').send('ok');
})

UserRoutes.get('/userinfo/:name',(req,res)=>{
    const name = req.params.name;
    return db.select('*')
    .from('users')
    .where({email: name})
    .first()
    .then(profile => {
        res.json(profile).send();
    })
    .catch(e => console.log(e));
})
export default UserRoutes;