
/*

app controller

All the logics and validations 
from app router are done here
*/

const AppModels = require("../models/app-model");
const res = require("../helpers/http-response");
//const validator = require("validator");
const check = require('check-types');


async function activateApp(id){
    
    if(id.length ==0){return res(404,"id is required")};

    if(check.not.integer(id)){return res(400,"id must be an integer")};

    var result = await AppModels.activateApp(id)

    return result;

}

async function displayApp(){
    var result = await AppModels.displayApp()

    return result;

}

async function monthApp(dateCreated){
    var result = await AppModels.monthApp(dateCreated)

    return result;

}

async function bottom3(){
    var result = await AppModels.bottom3()

    return result;

}

async function displayActiveApps(){
    var result = await AppModels.displayActiveApps()

    return result;

}

async function singleApp(id){
    var result = await AppModels.singleApp(id)
    return result;
}


async function deleteApp(id){
    var result = await AppModels.deleteApp(id)
    return result;

   }

   async function categoryApp(id){
    var result = await AppModels.categoryApp(id)
    return result;
}

async function wonApp(id){
    var result = await AppModels.wonApp(id)
    return result;
}

async function updateAppInfo(id,name,developers,categoryID){
    
    if(id.length ==0){return res(404,"id is required")};
    if(name.trim().length == 0){return res(404,"application name is required")};
    if(developers.trim().length ==0 ){return res(404,"developers is required")};
    if(categoryID.length ==0){return res(404,"categoryID is required")};
    
    
    if(check.not.integer(id)){return res(400,"id must be an integer")};
    if(check.not.string(name)){return res(400,"categnameoryID must be an integer")};
    if(check.not.string(developers)){return res(400,"developers names must be a string")};
    if(check.not.integer(categoryID)){return res(400,"categoryID must be a string")};
   
    
    var result = await AppModels.updateAppInfo(id,name,developers,categoryID)
    return result;
}

async function updateDescriptions(id,longDesc,shortDesc ,url){
    
    if(id.length ==0){return res(404,"id is required")};
    if(longDesc.trim().length == 0){return res(404,"long description is required")};
    if(shortDesc.trim().length ==0 ){return res(404,"short description is required")};
    if(url.trim().length ==0 ){return res(404,"url is required")};
    
    if(check.not.integer(id)){return res(400,"id must be an integer")};
    if(check.not.string(longDesc)){return res(400,"long description must be an integer")};
    if(check.not.string(shortDesc)){return res(400,"short description must be a string")};

    var result = await AppModels.updateDescriptions(id,longDesc,shortDesc,url)
    return result;
}

async function updateIcon(id,icon){
  
    if(id.length ==0){return res(404,"id is required")};
    if(icon.trim().length == 0){return res(404,"icon name is required")};


    if(check.not.integer(id)){return res(400,"id must be an integer")};
    if(check.not.string(icon)){return res(400,"icon name must be a string")};


    var result = await AppModels.updateIcon(id,icon)
    return result;
}

async function makeAppWin(id){


    var result = await AppModels.makeAppWin(id)
    return result;
}

async function makeAppLoose(id){
    var result = await AppModels.makeAppLoose(id)
    return result;
}


async function newApp(id){
    var result = await AppModels.newApp(id)
    return result;
}

async function addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID,  screenshotspath, iconspath, url, apk, privateKey, publicKey, platform){
   
        if(name.trim().length == 0){return res(404,"application name is required")};
        if(longDesc.trim().length == 0 ){return res(404,"application long description is required")};
        if(shortDesc.trim().length ==0 ){return res(404,"application short description  is required")};
        if(developers.trim().length ==0 ){return res(404,"developers are required")};
        if(imagenames.trim().length ==0 ){return res(404,"imagenames is required")};
        if(won.length ==0){return res(404,"won is required")};
        if(categoryID.length ==0){return res(404,"categoryID is required")};
        if(adminID.length ==0){return res(404,"adminID is required")};
        if(screenshotspath.length ==0){return res(404,"screenshotspath is required")};
        if(iconspath.length ==0){return res(404,"iconspath is required")};
        if(apk.length ==0){return res(404,"url is required")};
        ///if(privateKey.length ==0){return res(404,"privateKey is required")};
        if(publicKey.length ==0){return res(404,"publicKey is required")};
        if(platform.length ==0){return res(404,"platform is required")};
        
        

        
        if(check.not.integer(won)){return res(400,"won must be an integer")};
        if(check.not.integer(categoryID)){return res(400,"categoryID must be an integer")};
        if(check.not.integer(adminID)){return res(400,"adminID must be an integer")};
        if(check.not.string(screenshotspath)){return res(400,"screenshotspath must be a string")};
        if(check.not.string(iconspath)){return res(400,"admiiconspathnID must be a intstringeger")};
        

    var result = await AppModels.addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, screenshotspath, iconspath,url, apk, privateKey, publicKey, platform)
    return result;

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
   monthApp,                                                              
};