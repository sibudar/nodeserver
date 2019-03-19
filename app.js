const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
//const upload = require('formidable-upload');
const path = require('path');
const cors = require('cors');

app.use(cors());

app.use('/icons', express.static(path.join(__dirname, 'public/icons')))
app.use('/screenshots', express.static(path.join(__dirname, 'public/screenshots')))

app.use(morgan('dev'));
app.use(fileUpload());


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

const applicationsRoutes = require('./routes/applications');
app.use('/applications', applicationsRoutes);

const clientsRoutes = require('./routes/clients');
app.use('/clients', clientsRoutes);



const categoryRoutes = require('./routes/category');
app.use('/category', categoryRoutes);





module.exports=app;
