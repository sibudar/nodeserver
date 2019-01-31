const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

const applicationsRoutes = require('./routes/applications');
app.use('/applications', applicationsRoutes);

const clientsRoutes = require('./routes/clients');
app.use('/clients', clientsRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message:'Its working...'
    })
})
module.exports=app;