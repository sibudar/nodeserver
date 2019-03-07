/*

we checking the returned values and return a meaningful http response 
to make life easier for front-end guys

source: https://www.restapitutorial.com/httpstatuscodes.html


format for returning a nice http response

{
    status: 200,
    message: "successful",
    data: [...]
}

*/



function response(status,message,data=[]){
    return {
        status,
        message,
        data,
    }
}





module.exports = response;