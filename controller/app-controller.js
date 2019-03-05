const AppModels = require('../models/app-model');


async function activateApp(id){
    var result = await AppModels.activateApp(id)

    return result;

}

async function displayApp(){
    var result = await AppModels.displayApp()

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
    var result = await AppModels.updateAppInfo(id,name,developers,categoryID)
    return result;
}

async function updateDescriptions(id,longDesc,shortDesc ){
    var result = await AppModels.updateDescriptions(id,longDesc,shortDesc)
    return result;
}

async function updateIcon(id,icon){
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

async function addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url , c){
   
    var result = await AppModels.addApp(name, longDesc, shortDesc, iconName, developers, imagenames, won, categoryID, adminID, url,c)
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
};