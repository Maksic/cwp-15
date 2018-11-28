const express = require('express');
const APIRouter = express.Router();
const fleetsRouter = require('./fleets');
const vehiclesRouter = require('./vehicles');
const motionsRouter = require('./motions');
const authRouter = require('./auth');

APIRouter.use('/fleets', fleetsRouter);
APIRouter.use('/vehicles', vehiclesRouter);
APIRouter.use('/motions', motionsRouter);
APIRouter.use('/auth', authRouter);

module.exports = APIRouter;