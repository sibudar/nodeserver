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


//Get all active applications
router.get('/', function (req, resp) {

    //console.log('Devon')
    connection.query("call sp_SelectActiveApps", function (error, rows, fields) {
        if (error) {
            console.log('Error in the query');
        } else {
            resp.json(rows[0]);
        }

    })

});



//Get single application
router.get('/:id', (req, resp) => {

    id = (req.params.id);
    connection.query("call sp_SingleApp(" + id + ")", (error, rows, fields) => {
        if (error) {
            console.log('Error in the query');
            resp.send(error);
        } else {
            resp.json(rows[0]);
        }

    })

});

//Get application according to category
router.get('/cat/:id', (req, resp) => {

    id = (req.params.id);

    connection.query("call sp_SelectCategoryApps(" + id + ")", (error, rows, fields) => {
        if (error) {
            console.log('Error in the query');
            resp.send(error);
        } else {
            resp.json(rows[0]);
        }

    })

});


//Delete application
router.delete('/:id', (req, resp) => {


    connection.query("call sp_DeleteApp('" + req.params.id + "')", (error, rows, fields) => {
        if (!error) {

            resp.send('application deleted succesfully');
        } else {
            console.log(error);
        }


    })

});



//Insert applications
router.post('/add', function (req, res) {


    name = req.body.name;
    longDesc = req.body.longDesc;
    shortDesc = req.body.shortDesc;
    icon = req.files.icon;
    developers = req.body.developers;
    img1 = req.files.img1;
    img2 = req.files.img2;
    img3 = req.files.img3;
    img4 = req.files.img4;
    won = req.body.won;
    categoryID = req.body.categoryID;
    adminID = req.body.adminID;
    url = req.body.url;



    iconName = icon.name;
    imgName1 = img1.name;
    imgName2 = img2.name;
    imgName3 = img3.name;
    imgName4 = img4.name;

    icon.mv("./public/icons/" + iconName, function (err) {
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


    connection.query("call sp_InsertApplications('" + name + "','" + longDesc + "','" + shortDesc + "','" + iconName + "','" + developers + "','" + imgName1 + "','" + imgName2 + "','" + imgName3 + "','" + imgName4 + "','" + won + "','" + categoryID + "','" + adminID + "','"+url+"')", function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application added succesfully" });
    });

});

//update application information
router.post('/update-info', (req, res) => {


    Name = req.body.Name;
    developers = req.body.developers;
    appID = req.body.appID;
    categoryID = req.body.categoryID;



    connection.query("call sp_UpdateAppInfo(" + appID + ",'" + Name + "','" + developers + "','" + categoryID + "')", function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application updated succesfully" });
    });

});

//update  application long and short descriptions
router.post('/update-desc', (req, res) => {


    longDesc = req.body.longDesc;
    shortDesc = req.body.shortDesc;
    appID = req.body.appID;




    connection.query("call sp_UpdateDescriptions(" + appID + ",'" + longDesc + "','" + shortDesc + "')", function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application descriptions updated succesfully" });
    });

});



//Update application icon
router.post('/update-icon', (req, res) => {



    icon = req.files.icon;
    appID = req.body.appID;


    iconName = icon.name;




    icon.mv("./public/icons/" + iconName, function (err) {
        console.log(err);
    });


    connection.query("call sp_UpdateIcon(" + appID + ",'" + iconName + "')", function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application icon updated succesfully" });
    });

});

//Update screenshots API
router.post('/update-screenshots', (req, res) => {



    img1 = req.files.img1;
    img2 = req.files.img1;
    img3 = req.files.img1;
    img4 = req.files.img1;
    appID = req.body.appID;

    imgName1 = img1.name;
    imgName2 = img2.name;
    imgName3 = img3.name;
    imgName4 = img4.name;



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


    connection.query("call sp_UpdateScreenshots(" + appID + ",'" + imgName1 + "','" + imgName2 + "','" + imgName3 + "','" + imgName4 + "')", function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application screnshots updated succesfully" });
    });

});

//Update won field
router.post('/update-won', (req, res) => {


    won = req.body.won;
    id = req.body.id;




    connection.query("call sp_UpdateWon(" + id + ",'" + won + "')", function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application won field  updated succesfully" });
    });

});
module.exports = router;
