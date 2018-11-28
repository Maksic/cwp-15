//complete
const express = require('express');
const app = express();

app.use('/api/*(fleets|vehicles|motions)', require('./routers/middleware'));
app.use('/api', require('./routers/api'));

app.all('/' , (req, res) =>
{
    res.send('some many text');
})
app.listen(3030, '127.0.0.1', () =>
{
    console.log('Server started ...');
})