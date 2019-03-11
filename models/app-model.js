

const mysql = require("mysql");
const connection = require("../connectionDB/mysql");
const res = require("../helpers/http-response");


//Activate Apps
async function activateApp(id) {

    try {
        let sql = {
            sql: "CALL sp_ActivateApps(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        
        return res(200,"application activated successfully",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}


//Display all apps
async function displayApp() {

    try {
        let sql = { sql: "CALL sp_DisplayAllApps" }
        const sqlResult = await connection.query(sql);

       
        return res(200,"All applications displayed",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

//Display Bottom 3 apps
async function bottom3() {

    try {
        let sql = { sql: "CALL sp_Bottom3" }
        const sqlResult = await connection.query(sql);

        return res(200,"Top3 applications",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

//Display active apps
async function displayActiveApps() {

    try {
        let sql = { sql: "CALL sp_DisplayActiveApps" }
        const sqlResult = await connection.query(sql);

        return res(200,"Active applications displayed",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}
//Get single app
async function singleApp(id) {
    try {

        const sql = { sql: "CALL sp_SingleApp(?)", values: [id] }
        const sqlResult = await connection.query(sql);


        return res(200,"single  application displayed",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

async function deleteApp(id) {

    try {

        let sql = {
            sql: "CALL sp_DeleteApp(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);


        return res(200,"application deleted successfully",sqlResult);
    } catch (err) {
        return res(400,err);

    }

}

async function categoryApp(id) {

    try {
        let sql = {
            sql: "CALL sp_SelectCategoryApps(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return res(200,"applications according to category",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

async function wonApp(id) {

    try {
        let sql = {
            sql: "CALL sp_SelectCategoryAppsWon(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return res(200,"applications that won",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

async function updateAppInfo(id, name, developers, categoryID) {

    try {
        let sql = {
            sql: "CALL sp_UpdateAppInfo(?,?,?,?)",
            values: [id, name, developers, categoryID]
        }
        const sqlResult = await connection.query(sql);

    
        return res(200,"application info updated successfully",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

async function updateDescriptions(id, longDesc, shortDesc) {

    try {
        let sql = {
            sql: "CALL sp_UpdateDescriptions(?,?,?)",
            values: [id, longDesc, shortDesc]
        }
        const sqlResult = await connection.query(sql);

        return res(200,"application descriptions updated successfully",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

async function updateIcon(id, icon) {

    try {
        let sql = {
            sql: "CALL sp_UpdateIcon(?,?)",
            values: [id, icon]
        }
        const sqlResult = await connection.query(sql);

        return res(200,"application icon updated successfully",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}
async function makeAppWin(id) {
    try {

        const sql = {
            sql: "CALL sp_MakeAppWin(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return res(200,"The application won",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

async function makeAppLoose(id) {
    try {

        const sql = {
            sql: "CALL sp_MakeAppLoose(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return res(200,"The application lost",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

async function newApp() {

    try {
        let sql = { sql: "CALL sp_SelectNewApps" }
        const sqlResult = await connection.query(sql);


        return res(200,"new applications",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}

async function addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url) {

    connection.query("call sp_InsertApplications(?,?,?,?,?,?,?,?,?,?)", [name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url], function (err) {
        console.log(err);
    });
    return ({ res: "Application uploaded successfully" });



}

//export functions
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
    bottom3,
};