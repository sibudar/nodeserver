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

    var id = req.body.id; // id : integer
    var longDesc = req.body.longDesc; // long description : string
    var shortDesc = req.body.shortDesc; //short description : string


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
    var icon = req.body.icon;


    var result = await AppCtr.updateIcon(id, icon);

    res.send(result[0]);


})


/* 

make an application win

required parameter(id)
*/
router.post("/makeAppWin/:id", async function (req, res) {

    var id = (req.params.id);

    var result = await AppCtr.makeAppWin(id);

    res.send(result[0]);


})

/* 

make an application loose

required parameter(id)
*/
router.post("/makeAppLoose/:id", async function (req, res) {

    var id = (req.params.id);

    var result = await AppCtr.makeAppLoose(id);

    res.send(result[0]);


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
    res.send(result[0]);

})

/* 

Insert Applications

required parameters (name,longDesc,shortDesc,icon,developers,image,won,categoryID,adminID,url)
returns status as a string
*/
router.post("/insert-apps", async function (req, res) {


    name = req.body.name;// application name : string
    longDesc = req.body.longDesc;// long description : string
    shortDesc = req.body.shortDesc;// short description : string
    iconName = req.body.iconName; // application icon : string
    developers = req.body.developers;// developers : string
    imagenames = req.body.imagenames; // image : string
    won = req.body.won;// won : integer
    categoryID = req.body.categoryID;//categoryID : integer
    adminID = req.body.adminID;//adminID : integer
    url = req.body.url;//application url : string
    //c = req.files;

    var result = await AppCtr.addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url);

    res.send(result);


})


module.exports = router;
