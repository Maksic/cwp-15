const express = require('express');
const fleetsRouter = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/db');
fleetsRouter.use(bodyParser.json());

class Fleet {
    constructor(name) {
        this.name = name;
    }
}
const ErrorObj = { code: 400, message: 'Fatall error' };

fleetsRouter.get('/readall', async (req, resp, next) => {
    if(req.manager.super){
        resp.statusCode = 200;
        db.Fleet.findAll().then((res) => {
            resp.json(res.map(i => i.name));
        });
    }
    else
        resp.json({Code: 403, Message: "Error 403"});
});
fleetsRouter.get('/read', (req, resp, next) => {
    let fleetId;
    if(req.manager.super){
        fleetId = req.manager.fleetId;        
    }   
    else{
        fleetId = req.manager.fleetId;        
    }
    db.Fleet.findAll(
        {
            attributes: ['name'],
            where: {
                id: fleetId,
                deletedAt: null
            },
        }).then((res) => {
            if (!res.length) resp.json(ErrorObj);
            else resp.json(res);
        });
});

fleetsRouter.post('/update', (req, resp, next) => {
    if(req.manager.super){
        req = req.body;
        if (!req.id) 
            { resp.json(ErrorObj); return; }
        const id = req.id;
        const fleet = new Fleet(req.name);
        fleet.id = id;
        db.Fleet.update({ name: req.name },
            {
                where: {
                    id: id,
                    deletedAt: null 
                }
            }
        );
        resp.json(fleet);
    }
    else{
        resp.json({Code: 403, Message: 'Error 403'});
    }
});

fleetsRouter.post('/delete', (req, resp, next) => {
    if(req.manager.super){
        req = req.body;
        if (!req.id) 
            { resp.json(ErrorObj); return; }
        const id = req.id;
        db.Fleet.destroy(
            {
                where:
                    {
                        id: id,
                        deletedAt: null            
                    }
            }
        ).catch((e) => {
            resp.json(ErrorObj);
        });
        resp.json(req.id);
    }
    else{
        resp.json({Code: 403, Message: 'Error 403'});
    }
});

fleetsRouter.post('/create', (req, resp, next) => {
    if(req.manager.super){
        req = req.body;
        if (!req.name) 
            { resp.json(ErrorObj); return; }
        const fleet = new Fleet(req.name);
        db.Fleet.create(fleet);
        resp.json(fleet);
    }
    else{
        resp.json({Code: 403, Message: 'Error 403'});
    }
});

module.exports = fleetsRouter;