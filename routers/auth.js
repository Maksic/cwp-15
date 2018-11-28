const express = require('express');
const authRouter = express.Router();
const bodyParser = require('body-parser');
const db = require('../data/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
authRouter.use(bodyParser.json());

authRouter.post('/register', async (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password);
    await db.Auth.create(req.body).catch((err)=>{
        res.status(409).end('Registration');
    });
    res.end('Succesfull');
});

authRouter.post('/login', async (req, res, next) => {
    let manager = await db.Auth.find({
        where: {
            email: req.body.email
        }
    })
    if(manager){
        if(bcrypt.compareSync(req.body.password, manager.password)){
            res.end(jwt.sign({
                id: manager.id,
                email: req.body.email
            }, "secret", {expiresIn: 60*5}));
        }
    }
    else{
        res.status(401).end('Login error');
    }
})

module.exports = authRouter;