

const mysql = require('mysql');
const connection = require('../connectionDB/mysql');


//Activate Apps
async function activateApp(id) {

    try {
        let sql = {
            sql: "CALL sp_ActivateApps(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult;
    } catch (err) {
        return err;

    }
}

//Display all apps
async function displayApp() {

    try {
        let sql = { sql: "CALL sp_DisplayAllApps" }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}

//Display active apps
async function displayActiveApps() {

    try {
        let sql = { sql: "CALL sp_DisplayActiveApps" }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}
//Get single app
async function singleApp(id) {
    try {

        const sql = { sql: "CALL sp_SingleApp(?)", values: [id] }
        const sqlResult = await connection.query(sql);

        return sqlResult;

    } catch (err) {
        return err;
    }
}

async function deleteApp(id) {

    try {

        let sql = {
            sql: "CALL sp_DeleteApp(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult;

    } catch (err) {

        return err;

    }

}

async function categoryApp(id) {

    try {
        let sql = {
            sql: "CALL sp_SelectCategoryApps(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}

async function wonApp(id) {

    try {
        let sql = {
            sql: "CALL sp_SelectCategoryAppsWon(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}

async function updateAppInfo(id, name, developers, categoryID) {

    try {
        let sql = {
            sql: "CALL sp_UpdateAppInfo(?,?,?,?)",
            values: [id, name, developers, categoryID]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}

async function updateDescriptions(id, longDesc, shortDesc) {

    try {
        let sql = {
            sql: "CALL sp_UpdateDescriptions(?,?,?)",
            values: [id, longDesc, shortDesc]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}

async function updateIcon(id, icon) {

    try {
        let sql = {
            sql: "CALL sp_UpdateIcon(?,?)",
            values: [id, icon]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}
async function makeAppWin(id) {
    try {

        const sql = {
            sql: "CALL sp_MakeAppWin(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult;

    } catch (err) {
        return err;
    }
}

async function makeAppLoose(id) {
    try {

        const sql = {
            sql: "CALL sp_MakeAppLoose(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return sqlResult;

    } catch (err) {
        return err;
    }
}

async function newApp() {

    try {
        let sql = { sql: "CALL sp_SelectNewApps" }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}

async function addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url, c, image) {

    iconName = icon.name;

    imagenames = image.name;

    //var imagenames = "[";

    if (!Array.isArray(image)) {


        image.mv("./public/screenshots/" + imagenames, function (err) {
            if (err)
                console.log('Error is: ', err);

        });
        
        //imagenames += image.name + "]";

        connection.query("call sp_InsertApplications(?,?,?,?,?,?,?,?,?,?)", [name, longDesc, shortDesc, iconName, developers,  "[" +imagenames + "]", won, categoryID, adminID, url, c], function (err) {
        });
        return ({ res: "Single image uploaded successfully" });




    } else {
        if (c.image.length >= 10)
            return { res: "Cannot upload more than 10 images" };

        c.image.forEach(element => {

            element.mv("./public/screenshots/" + element.name, function (err) {
                console.log(err)
            });
            imagenames += element.name + ",";

            icon.mv("./public/icons/" + iconName, function (err) {
                console.log(err);
            });
        });

        imagenames = (imagenames.substring(0, imagenames.length - 1)) + "]"

        connection.query("call sp_InsertApplications(?,?,?,?,?,?,?,?,?,?)", [name, longDesc, shortDesc, iconName, developers, "[" +imagenames + "]", won, categoryID, adminID, url, c], function (err) {
            console.log(err)
        });
        return { res: "images uploaded successfully" };

    }
   

}

module.exports = {
    activateApp,
    displayApp,
    singleApp,
    deleteApp,
    categoryApp,
    wonApp,
    updateAppInfo,
    updateDescriptions,
    updateIcon,
    makeAppWin,
    makeAppLoose,
    newApp,
    addApp,
    displayActiveApps,
};