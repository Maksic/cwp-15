module.exports = async function (db) {
    //await db.sequelize.sync({force: true});
    return Promise.all(/*[
        db.Fleet.create({
            name: "first park"
        }),
        db.Fleet.create({
            name: "second park"
        }),
        db.Vehicle.create({
            name: "first car",
            fleetId: 1
        }),
        db.Vehicle.create({
            name: "second car",
            fleetId: 1
        }),
        db.Vehicle.create({
            name: "third car",
            fleetId: 1
        }),
        db.Vehicle.create({
            name: "fourth car",
            fleetId: 1
        }),
        db.Vehicle.create({
            name: "fifth car",
            fleetId: 2
        }),
        db.Vehicle.create({
            name: "sixth car",
            fleetId: 2
        }),
        db.Motion.create({
            latitude: 51.5103,
            longitude: 7.49347,
            time: "2017-11-05T15:26:56.000Z",
            vehicleId: 1
        }),
        db.Motion.create({
            latitude: 59.1432,
            longitude: 49.1432,
            time: "2017-11-05T15:56:56.000Z",
            vehicleId: 1
        }),
        db.Motion.create({
            latitude: 121.5103,
            longitude: 71.49347,
            time: "2017-11-05T16:04:00.000Z",
            vehicleId: 1
        }),
        db.Motion.create({
            latitude: 151.5103,
            longitude: 117.49347,
            time: "2017-11-05T17:11:12.000Z",
            vehicleId: 1
        }),
    ]*/);
};