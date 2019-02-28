const express = require('express');
const ClientCtr = require('../controller/client-controller');
const router = express.Router();


//console.log("uclient uya runner")

  router.get('/nonny', (req, res, next) =>{
    res.status(200).json({
        message :'added nonny'
    })
  });

//clients login
router.post('/login', async function(req, res){
    // console.log("req")
    var email =  req.body.email;
    var password = req.body.password;

    var result = await ClientCtr.Login(email,password);

    res.send(result);
   
})

      //Insert clients
      router.post('/add-clients', function(req, res) {
        
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var organization = req.body.organization;
    var password = bcrypt.hashSync(req.body.password,10);
    var email = req.body.email;
    var active = req.body.active;
    var adminID = req.body.adminID;
    
    var fields = [[ firstname, lastname, organization, password,email, active, adminID]];
   //var sql = "INSERT INTO clients (firstname,lastname,organization,password, email, active, adminID)VALUES ?";
   //var sql = `CALL sp_addClients('${firstname}','${lastname}','${organization}','${password}','${email}','${active}','${adminID}')`;
    connection.query("CALL sp_addClients(?,?,?,?,?,?,?)",[firstname, lastname, organization, password, email, active, adminID],function(err, results) {
      if (err) {
        res.status(205).send("Eroor ");
      }
      if(results){
          
          console.log("data added!")
         res.json("data added!")
      }

  })

 })

 
 //admin displaying all clients
router.get('/display-clients',async function(req, res)  {
    var result = await ClientCtr.displayClient();
    res.send(result);
        
}) 


//display single client  
router.get('/getSingle-client/:id',async function(req, res){
 
      var id = (req.params.id);
      var result = await ClientCtr.singleClient(id);

    res.send(result);

})
          
//delete clients
router.post('/delete-clients', function(req, res){
      var id = req.body.id;
      let sql = {
        sql: "CALL sp_DeleteClients(?)",
        values: [id]
       }
      //var sql = `CALL sp_DeleteClients(${id})`;
    connection.query(sql, function(err, results){
        if (err) {
        res.json({'status' : 'fail to delete due to' })
      }else{
        res.send('client deleted');
      }

      })

    })




    // activating clients
router.post('/activate-clients', async function(req, res){
      var id = req.body.id;

      var result = await ClientCtr.ActivateClient(id);

    res.send(result);
  
  })
  
  



//update clients
router.post('/update-clients', function(req, res){
  var id = req.body.id;
  var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var organization = req.body.organization;
    var email = req.body.email;
    
  //var sql = "UPDATE clients SET firstname='"+firstname+"',lastname='"+lastname+"',organization='"+organization+"',password='"+password+"',email='"+email+"',active="+active +" WHERE id="+mysql.escape(id);
  //var sql = `CALL sp_updateClients ('${id = id}','${firstname = firstname}','${lastname = lastname}','${organization = organization}','${email = email}')`;
connection.query("CALL sp_updateClients(?,?,?,?,?)",[id,firstname, lastname, organization, email], function(err, results){
  if (err)
  res.send (err);
  else
  res.send('client updated');
})
// res.json({
//   mysql: sql
// });

})






module.exports=router;
      