const express = require('express');
const vehiclesRouter = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/db');
vehiclesRouter.use(bodyParser.json());

const ErrorObj = { code: 400, message: 'Fatall error' };
class Vehicle {
    constructor(name, fleetId) {
        this.name = name;
        this.fleetId = fleetId;
    }
}

vehiclesRouter.get('/readall', (req, resp, next) => {
    if(req.manager.super){
        db.Vehicle.findAll().then((res) => {
            resp.json(res);
        })    
    }
    else{
        db.Vehicle.findAll({
            where:
                {
                    fleetId: req.manager.fleetId,
                    deletedAt: null
                }
        }).then((res) => {
            resp.json(res);
        });
    }
});

vehiclesRouter.get('/read', (req, resp, next) => {
    if (!req.query.id) { resp.json(ErrorObj); return; }
    const id = req.query.id;

    if(req.manager.super){
    db.Vehicle.findAll(
        {
            where: {
                id: id,
                deletedAt: null
            },
        }).then((res) => {
            if (!res.length) resp.json(ErrorObj);
            else resp.json(res);
        });
    }
    else{
        db.Vehicle.findAll(
            {
                where: {
                    id: id,
                    fleetId: req.manager.fleetId,
                    deletedAt: null
                },
            }).then((res) => {
                if (!res.length) resp.json(ErrorObj);
                else {
                    resp.json(res);
                }
            });
        }
});

vehiclesRouter.post('/update', (req, resp, next) => {
    if(!req.manager.super){
        req.body.fleetId = req.manager.fleetId;
    }    
    req = req.body;
    const vehicle = new Vehicle(req.name, req.fleetId);
    vehicle.id = id;
    db.Vehicle.update({ name: req.name, fleetId: req.fleetId },
        {
            where: {
                id: id,
                deletedAt: null
            }
        }
    );
    resp.json(vehicle);
});

vehiclesRouter.post('/delete', (req, resp, next) => {
    if(!req.manager.super){
        req.body.fleetId = req.manager.fleetId;
    }    
    req = req.body;
    if (!req.id) { resp.json(ErrorObj); return; }
    const id = req.id;
    db.Vehicle.destroy(
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
});

vehiclesRouter.post('/create', (req, resp, next) => {
    if(!req.manager.super){
        req.body.fleetId = req.manager.fleetId;
    }    
    req = req.body;
    const vehicle = new Vehicle(req.name, req.fleetId);
    db.Vehicle.create(vehicle);
    resp.json(vehicle);
});

module.exports = vehiclesRouter;