const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');


app.use('/public', express.static(path.join(__dirname, 'public')))


app.use(morgan('dev'));
app.use(fileUpload());


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

const applicationsRoutes = require('./routes/applications');
app.use('/applications', applicationsRoutes);

const clientsRoutes = require('./routes/clients');
app.use('/clients', clientsRoutes);

// app.use((req, res, next) => {
//     res.status(200).json({
//         message:'Its working...'
//     })
// })

const categoryRoutes = require('./routes/category');
app.use('/category', categoryRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message:'Its working...'
    })
})
module.exports=app;
