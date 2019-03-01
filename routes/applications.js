const mysql = require('mysql');
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
router.get('/getSingleApp/:id', (req, resp) => {

    id = (req.params.id);
    connection.query("call sp_SingleApp(?)", [id], (error, rows, fields) => {
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

    connection.query("call sp_SelectCategoryApps(?)", [id], (error, rows, fields) => {
        if (error) {
            console.log('Error in the query');
            resp.send(error);
        } else {
            resp.json(rows[0]);
        }

    })

});

//Get top rated applications according to category
router.get('/won/:id', (req, resp) => {

    id = (req.params.id);

    connection.query("call sp_SelectCategoryAppsWon(?)", [id], (error, rows, fields) => {
        if (error) {
            console.log('Error in the query');
            resp.send(error);
        } else {
            resp.json(rows[0]);
        }

    })

});
//Delete application
router.delete('/deleteapp/:id', (req, resp) => {


    id = (req.params.id);

    connection.query("call sp_DeleteApp(?)", [id], (error, rows, fields) => {
        if (!error) {

            resp.send('application deleted succesfully');
        } else {
            console.log(error);
        }


    })

});

//update application information
router.post('/update-info', (req, res) => {


    id = req.body.id;
    name = req.body.name;
    developers = req.body.developers;
    categoryID = req.body.categoryID;



    connection.query("call sp_UpdateAppInfo(?,?,?,?)", [id, name, developers, categoryID], function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application updated succesfully" });
    });

});

//update  application long and short descriptions
router.post('/update-desc', (req, res) => {

    id = req.body.id;
    longDesc = req.body.longDesc;
    shortDesc = req.body.shortDesc;





    connection.query("call sp_UpdateDescriptions(?,?,?)", [id, longDesc, shortDesc], function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application descriptions updated succesfully" });
    });

});



//Update application icon
router.post('/update-icon', (req, res) => {


    id = req.body.id;
    icon = req.files.icon;



    iconName = icon.name;




    icon.mv("./public/icons/" + iconName, function (err) {
        console.log(err);
    });


    connection.query("call sp_UpdateIcon(" + id + ",'" + iconName + "')", function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application icon updated succesfully" });
    });

});



//Make app win
router.post('/makeAppWin', (req, res) => {

    id = req.body.id;
    

    connection.query("call sp_MakeAppWin(?)", [id], function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application won field  updated succesfully" });
    });

});

//Make app loose
router.post('/makeAppLoose', (req, res) => {

    id = req.body.id;
    

    connection.query("call sp_MakeAppLoose(?)", [id], function (err) {




        if (err)
            res.send(err);
        else
            res.send({ status: "application won field  updated succesfully" });
    });

});

//Activate Apps
router.post('/activate-apps/:id', (req, resp) => {

    id = (req.params.id);
    connection.query("call sp_ActivateApps(?)", [id], (error, rows, fields) => {
        if (!error) {

            resp.send('application activated succesfully');
        } else {
            console.log(error);
        }


    })

});

//Get all new applications
router.get('/new-apps', function (req, resp) {


    connection.query("call sp_SelectNewApps", function (error, rows, fields) {
        if (error) {
            console.log('Error in the query');
        } else {
            resp.json(rows[0]);
        }

    })


});

//Insert applications
router.post('/insert-application', (req, res) => {

    name = req.body.name;
    longDesc = req.body.longDesc;
    shortDesc = req.body.shortDesc;
    icon = req.files.icon;
    developers = req.body.developers;
    image = req.files.image;
    won = req.body.won;
    categoryID = req.body.categoryID;
    adminID = req.body.adminID;
    url = req.body.url;
    let c = req.files;
    let x = Object.keys(c);


    iconName = icon.name;

    imagenames = image.name;

    var imagenames = "[";


    if (!Array.isArray(req.files.image)) {

    

        image.mv("./public/test/" + imagenames, function (err) {
            console.log('Error is: ',err);

        });

       
         imagenames += image.name + "]" ;
         
        console.log(imagenames)

         connection.query("call sp_InsertApplications(?,?,?,?,?,?,?,?,?,?)", [name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url], function (err) {
        });
        res.json({ res: "Application uploaded successfully" });
   
       

    } else if(c.image.length <= 10) {
        c.image.forEach(element => {

            element.mv("./public/test/" + element.name, function (err) {
            });
            imagenames += element.name + ",";

            icon.mv("./public/icons/" + iconName, function (err) {
                console.log(err);
            });
        });

        imagenames = (imagenames.substring(0, imagenames.length - 1)) + "]"

        connection.query("call sp_InsertApplications(?,?,?,?,?,?,?,?,?,?)", [name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url], function (err) {
        });
        res.json({ res: "Application uploaded successfully" });
       
    }else{
        res.json({ res: "Cannot upload more than 10 images" });
    }








});





module.exports = router;
