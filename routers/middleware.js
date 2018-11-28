const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db/db');

router.all('/*', async (req, res, next) => {
    if(req.header('Authorisation')){
        if(req.manager === undefined){
            let token = req.header('Authorisation').split(' ')[1];
            jwt.verify(token, 'secret', async (err, dec) => {
                if(!err){
                    let manager = await db.Auth.findById(dec.id);
                    req.manager = manager.get({raw: true});
                    next();
                }
                else{
                    console.log('err');
                    res.send('error of authorisation');
                }
            })
        }
    }
    else
        res.send("ERROR 401");
})

module.exports = router;