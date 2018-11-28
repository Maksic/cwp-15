module.exports = async function (db) {
    await db.sequelize.sync({force: true});
    return Promise.all([
        db.fleets.create({
            name: "fleet1"
        }),
        db.fleets.create({
            name: "fleet2"
        }),
        db.vehicles.create({
            name: "car1",
            fleetId: 1
        }),
        db.vehicles.create({
            name: "car2",
            fleetId: 1
        }),
        db.vehicles.create({
            name: "car3",
            fleetId: 1
        }),
        db.vehicles.create({
            name: "car4",
            fleetId: 1
        }),
        db.vehicles.create({
            name: "car5",
            fleetId: 2
        }),
        db.vehicles.create({
            name: "car6",
            fleetId: 2
        }),
        db.motions.create({
            latitude: 51.5103,
            longitude: 7.49347,
            time: "2017-12-05T15:26:56.000Z",
            vehicleId: 1
        }),
        db.motions.create({
            latitude: 59.1432,
            longitude: 49.1432,
            time: "2017-12-05T15:56:56.000Z",
            vehicleId: 1
        }),
        db.motions.create({
            latitude: 121.5103,
            longitude: 71.49347,
            time: "2017-12-05T16:04:00.000Z",
            vehicleId: 1
        }),
        db.motions.create({
            latitude: 151.5103,
            longitude: 117.49347,
            time: "2017-12-05T17:11:12.000Z",
            vehicleId: 1
        }),
    ]);
};