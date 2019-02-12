const express = require('express');
const connection = require('../connectionDB/mysql');
const router = express.Router();
const app = express();




// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Get all applications'
//     })
// });

router.get('/nonny', (req, res, next) => {
    res.status(200).json({
        message: 'added nonny'
    })
});

//Get all applications
router.get('/', function (req, resp) {

    //console.log('Devon')
    connection.query("SELECT * FROM applications WHERE active =1", function (error, rows, fields) {
        if (error) {
            console.log('Error in the query');
        } else {
            resp.json(rows);
        }

    })

});

//Get single application
router.get('/:id', (req, resp) => {


    connection.query("SELECT * FROM applications WHERE appID=?", [req.params.id], (error, rows, fields) => {
        if (error) {
            console.log('Error in the query');
            resp.send(error);
        } else {
            resp.json(rows);
        }

    })

});

//Delete application
router.delete('/:id', (req, resp) => {


    connection.query("DELETE FROM applications WHERE appID = ?", [req.params.id], (error, rows, fields) => {
        if (!error) {

            resp.send('application deleted succesfully');
        } else {
            console.log(error);
        }

    })

});

//Insert applications
router.post('/add', function (req, res) {
    
    console.log('dev');
    appName = req.body.appName;
    appDesc = req.body.appDesc;
    active = req.body.active;
    appIcon = req.files.appIcon;
    dateCreated = req.body.dateCreated;
    img1 = req.files.img1;
    img2 = req.files.img2;
    img3 = req.files.img3;
    img4 = req.files.img4;
    won = req.body.won;
    categoryID = req.body.categoryID;


   // res.send({res: 'sent'})


    iconName = appIcon.name;
    imgName1 = img1.name;
    imgName2 = img2.name;
    imgName3 = img3.name;
    imgName4 = img4.name;

    appIcon.mv("./public/icons/" + iconName, function (err) {
        console.log(err);
    });

    img1.mv("./public/screenshots/" + imgName1, function (err) {
        console.log(err);
    });
    img2.mv("./public/screenshots/" + imgName2, function (err) {
        console.log(err);
    });
    img3.mv("./public/screenshots/" + imgName3, function (err) {
        console.log(err);
    });
    img4.mv("./public/screenshots/" + imgName4, function (err) {
        console.log(err);
    });

   
    connection.query("call sp_InsertApplication('" + appName + "','" + appDesc + "','" + active + "','" + iconName + "','" + dateCreated + "','" + imgName1 + "','" + imgName2+ "','" + imgName3 + "','" + imgName4 + "','" + won +"','"+categoryID+"')", function (err) {


       
        
        if (err)
            res.send(err);
        else
            res.send({ status: "application added succesfully" });
    });

});

//Update applications


module.exports = router;
