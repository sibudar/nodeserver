/*

Application Router

We handle all front-end http requests in this file 
and let app-controller to do all the 
validations and some other logics

*/

const express = require("express");
const connection = require("../connectionDB/mysql");
const router = express.Router();
const app = express();
const AppCtr = require("../controller/app-controller");


router.get("/nonny", (req, res, next) => {
    res.status(200).json({
        message: 'added nonny'
    })
});


//Get all  applications

router.get("/display-apps", async function (req, res) {
    var result = await AppCtr.displayApp();//from app-controller
    res.send(result[0]);

})

//Get active applications
router.get("/active-apps", async function (req, res) {
    var result = await AppCtr.displayActiveApps();//from app-controller
    res.send(result[0]);

})

/* 

display single app

required parameter (id)
returns an array of objects
*/
router.get("/getSingleApp/:id", async function (req, res) {

    var id = (req.params.id);
    var result = await AppCtr.singleApp(id);

    res.send(result[0]);

})

/*

delete applications

required parameters (id)
returns status as a string

*/
router.delete("/delete-app/:id", async function (req, res) {
    var id = (req.params.id);
    var result = await AppCtr.deleteApp(id);

    res.send(result[0]);

})



/* 

display applications according to category

required parameter (categoryID)
returns an array of objects
*/
router.get("/cat/:id", async function (req, res) {

    var id = (req.params.id);
    var result = await AppCtr.categoryApp(id);
    res.send(result[0]);

})

/* 

display top rated applications according to category

required parameter (categoryID)
returns an array of objects
*/
router.get("/won/:id", async function (req, res) {

    var id = (req.params.id);
    var result = await AppCtr.wonApp(id);
    res.send(result[0]);

})

/* 

update application information
required parameters (id, name,developers,categoryID)
returns a status as a string
*/
router.post("/update-info", async function (req, res) {

    var id = req.body.id;
    var name = req.body.name;
    var developers = req.body.developers;
    var categoryID = req.body.categoryID;


    var result = await AppCtr.updateAppInfo(id, name, developers, categoryID);

    res.send(result[0]);


})

/* 

update application short and long descriptions
required parameters (id, longDesc,shortDesc)
returns a status as a string
*/
router.post("/update-desc", async function (req, res) {

    var id = req.body.id;
    var longDesc = req.body.longDesc;
    var shortDesc = req.body.shortDesc;


    var result = await AppCtr.updateDescriptions(id, longDesc, shortDesc);

    res.send(result[0]);


})


/* 

update application icon
required parameters (id, icon)
returns a status as a string
*/
router.post("/update-icon", async function (req, res) {

    var id = req.body.id;
    var icon = req.files.icon;


    var result = await AppCtr.updateIcon(id, icon);

    res.send(result);


})


/* 

make an application win

required parameter(id)
*/
router.post("/makeAppWin/:id", async function (req, res) {

    var id = (req.params.id);

    var result = await AppCtr.makeAppWin(id);

    res.send(result);


})

/* 

make an application loose

required parameter(id)
*/
router.post("/makeAppLoose/:id", async function (req, res) {

    var id = (req.params.id);

    var result = await AppCtr.makeAppLoose(id);

    res.send(result);


})
/* 

activating applications

required parameter(id)
*/
router.post("/activate-apps", async function (req, res) {
    var id = req.body.id;

    var result = await AppCtr.activateApp(id);

    res.send(result[0]);

})

//Get all new applications
router.get("/new-apps", async function (req, res) {
    var result = await AppCtr.newApp();//from app-controller
    res.send(result);

})

/* 

Insert Applications

required parameters (name,longDesc,shortDesc,icon,developers,image,won,categoryID,adminID,url)
returns status as a string
*/
router.post("/insert-apps", async function (req, res) {


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

    var result = await AppCtr.addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url, c, image);

    res.send(result);


})


module.exports = router;
