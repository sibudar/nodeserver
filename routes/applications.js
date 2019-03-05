
const express = require('express');
const connection = require('../connectionDB/mysql');
const router = express.Router();
const app = express();
const AppCtr = require('../controller/app-controller');


router.get('/nonny', (req, res, next) => {
    res.status(200).json({
        message: 'added nonny'
    })
});


//Get all  applications

router.get('/display-apps', async function (req, res) {
    var result = await AppCtr.displayApp();
    res.send(result[0]);

})

//Get active applications
router.get('/active-apps', async function (req, res) {
    var result = await AppCtr.displayActiveApps();
    res.send(result[0]);

})

//Get single application
router.get('/getSingleApp/:id', async function (req, res) {

    var id = (req.params.id);
    var result = await AppCtr.singleApp(id);

    res.send(result[0]);

})

//Delete application
router.delete('/delete-app/:id', async function (req, res) {
    var id = (req.params.id);
    var result = await AppCtr.deleteApp(id);

    res.send(result[0]);

})


//Get application according to category
router.get('/cat/:id', async function (req, res) {

    var id = (req.params.id);
    var result = await AppCtr.categoryApp(id);
    res.send(result[0]);

})

//Get top rated applications according to category
router.get('/won/:id', async function (req, res) {

    var id = (req.params.id);
    var result = await AppCtr.wonApp(id);
    res.send(result[0]);

})

//update application information
router.post('/update-info', async function (req, res) {

    var id = req.body.id;
    var name = req.body.name;
    var developers = req.body.developers;
    var categoryID = req.body.categoryID;


    var result = await AppCtr.updateAppInfo(id, name, developers, categoryID);

    res.send(result[0]);


})

//update  application long and short descriptions
router.post('/update-desc', async function (req, res) {

    var id = req.body.id;
    var longDesc = req.body.longDesc;
    var shortDesc = req.body.shortDesc;


    var result = await AppCtr.updateDescriptions(id, longDesc, shortDesc);

    res.send(result[0]);


})

//Update application icon
router.post('/update-icon', async function (req, res) {

    var id = req.body.id;
    var icon = req.files.icon;


    var result = await AppCtr.updateIcon(id, icon);

    res.send(result);


})


//Make app win
router.post('/makeAppWin/:id', async function (req, res) {

    var id = (req.params.id);

    var result = await AppCtr.makeAppWin(id);

    res.send(result);


})

//Make app loose
router.post('/makeAppLoose/:id', async function (req, res) {

    var id = (req.params.id);

    var result = await AppCtr.makeAppLoose(id);

    res.send(result);


})
//Activate Apps
router.post('/activate-apps', async function (req, res) {
    var id = req.body.id;

    var result = await AppCtr.activateApp(id);

    res.send(result[0]);

})

//Get all new applications
router.get('/new-apps', async function (req, res) {
    var result = await AppCtr.newApp();
    res.send(result);

})

//Insert applications
router.post('/insert-apps',async function(req, res) {
        
   
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
    c = req.files;

    iconName = icon.name;

    imagenames = image.name;

    var result = await AppCtr.addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url,c,image);

    res.send(result);


 })











// router.post('/insert-application', (req, res) => {

//     name = req.body.name;
//     longDesc = req.body.longDesc;
//     shortDesc = req.body.shortDesc;
//     icon = req.files.icon;
//     developers = req.body.developers;
//     image = req.files.image;
//     won = req.body.won;
//     categoryID = req.body.categoryID;
//     adminID = req.body.adminID;
//     url = req.body.url;
//     let c = req.files;
//     let x = Object.keys(c);


//     iconName = icon.name;

//     imagenames = image.name;

//     var imagenames = "[";


//     if (!Array.isArray(req.files.image)) {



//         image.mv("./public/test/" + imagenames, function (err) {
//             console.log('Error is: ', err);

//         });


//         imagenames += image.name + "]";

//         console.log(imagenames)

//         connection.query("call sp_InsertApplications(?,?,?,?,?,?,?,?,?,?)", [name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url], function (err) {
//         });
//         res.json({ res: "Application uploaded successfully" });



//     } else if (c.image.length <= 10) {
//         c.image.forEach(element => {

//             element.mv("./public/test/" + element.name, function (err) {
//             });
//             imagenames += element.name + ",";

//             icon.mv("./public/icons/" + iconName, function (err) {
//                 console.log(err);
//             });
//         });

//         imagenames = (imagenames.substring(0, imagenames.length - 1)) + "]"

//         connection.query("call sp_InsertApplications(?,?,?,?,?,?,?,?,?,?)", [name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url], function (err) {
//         });
//         res.json({ res: "Application uploaded successfully" });

//     } else {
//         res.json({ res: "Cannot upload more than 10 images" });
//     }

// })

module.exports = router;
