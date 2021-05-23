const { Console, error } = require('console');
const mysql=require('mysql');

const express=require('express');

const Swal= require('sweetalert2')

const path=require('path');
const alert=require('js-alert');
const { Script } = require('vm');


const app=express();
//-------------------------------------------------------------------------------------------------
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ms1"
});
connection.connect(function(error){
    if (error) throw error;
    else console.log("connected successfully")
});

//------------------------------------------------------------------------------------------------


exports.getLogin =(req, res) => {
    // res.sendFile(__dirname + '/index.html')
    
    //( req.get('Cookie').split(';')[0].trim().split('=')[1]==true )
   
      res.sendFile(path.join(__dirname,'../','views/index.html'));
 }

    



exports.postLogin=(req, res) => {
    console.log(req.body)

 var u=req.body.u;
    // var g=req.body.g;
    var p=req.body.p;
    if(u && p){

    
    connection.query("select * from registration where email = ? and password = ?",[u,p],function(error,results,fields){
      console.log(results);  
      if (results.length > 0){
        //res.setHeader('Set-Cookie','loggedin=true');
        req.session.loggedin=true;
        req.session.u=u;
            console.log("login")

          res.redirect('./welcome')
          
         
        }else{
               res.send('incorrect username and or  password')
            //res.redirect("/");
        }

        res.end();
    });
  }
  else{
    res.send("please entre user name and password!" );
    res.end();
  }
}

exports.getHome=(req, res) => {
    // res.sendFile(__dirname + '/welcome.html')
    
    //res.sendFile(path.join(__dirname ,'../','viewes/welcome.html'));
    connection.query("select * from car",(err,results,fields)=>{
      console.log(results)
      if(err)throw err; 
      res.render('welcome',{docTitle:'welcomee',items:results}) 
     
       

    })

    //res.send("welcome back," +req.session.u);
     }
  
  



 
exports.getSignup =(req, res) => {
  // res.sendFile(__dirname + '../viewes/signupp.html')
  
  //( req.get('Cookie').split(';')[0].trim().split('=')[1]==true )
 
  res.sendFile(path.join(__dirname,'../','views/signupp.html'));
}

exports.postSignup=(req,res)=>{
  var Username=req.body.Username;
  var email=req.body.email;
  var password=req.body.password;
  var cpassword=req.body.cpassword;
  console.log(Username,email,password,cpassword)
  var validPass=/^(?=.{2,})(?=.*[A-Z])(?=.*[a-z])/;
  if(Username && email && password && cpassword ){
   
      connection.query("SELECT * FROM registration WHERE email=?",[email],(error,results,fields)=>{
        console.log(results.length)
        if(results.length === 0) {

        if(password==cpassword && password.match(validPass)){
          connection.query("INSERT INTO registration (username, email, password, confirmPassword) VALUES(?,?,?,?)",[Username,email,password,cpassword],(error,results,fields)=>{
         if(error){
           console.log(error)
         }   else{
              console.log('Registerd Successfully! Please Login')
           // alert('')
              res.redirect('/')
         }
         })
        }else{
                // alert.alert('PASSWORD Not Match');
            
                res.render('swal',{notMatch:true,UE:false})
            }
          }

     else{
        //already hav acc
    //  res.render('swal',{present:results[0]})
        res.render('swal',{UE:true,present:results[0],notMatch:false})
     // console.log('Account is already created ! Please login')
      
     }
      })
  }

}


exports.getAdd=(req,res)=>{
  
  res.render('add',{docTitle:'Add cars'}) 

}

exports.postAdd=(req, res) => { 
  var Username=req.body.man;
  var email=req.body.noc;
  var password=req.body.type;
  var cpassword=req.body.color;   
         connection.query("INSERT INTO car (man, noc, type, color) VALUES(?,?,?,?)",[Username,email,password,cpassword],(err,results,fields)=>{

    if(err) throw err;
    res.redirect('/');
  });
};

// --------------------------------------------------------------------------------------------------------
exports.getEdit=(req,res)=>{
  
  // res.render('edit',{docTitle:'edit'}) 
    const id = req.params.id;
    let sql = `Select * from car where id = ${id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('edit', {
          docTitle:'edit',
            item : result[0]
        });
    });


}

exports.postEdit=(req, res) => { 
  var id = req.body.id;
  var Username=req.body.man;
  var email=req.body.noc;
  var password=req.body.type;
  var cpassword=req.body.color;  
         connection.query("update car SET man='"+Username+"',noc='"+email+"',type='"+password+"',color='"+cpassword+"' where id ="+id,(err,results,fields)=>{

    if(err) throw err;
    res.redirect('/');
  });
};



// --------------------------------------------------------------------------------------------------------
exports.getDelete=(req,res)=>{
  
  // res.render('edit',{docTitle:'edit'}) 
    const id = req.params.id;
    let sql = `DELETE FROM car WHERE id= ${id}`;
    let query = connection.query(sql,(err, result) => {
       
        if(err) throw err;
        
        
       res.redirect('/');
    });
//res.send("delete")

}


var ress;

exports.postResult=(req, res) => {
  // res.sendFile(__dirname + '/welcome.html')
  
  //res.sendFile(path.join(__dirname ,'../','viewes/welcome.html')); 
    var searchh=req.body.searchh;

connection.query("select * from car where type='"+searchh+"' or color='"+searchh+"'",(err,results,fields)=>{
  console.log(results)
  if(err)throw err; 

  res.redirect('./result')

ress=results;

})
}


exports.getResult=(req, res) => {
  // res.sendFile(__dirname + '/welcome.html')
  
  //res.sendFile(path.join(__dirname ,'../','viewes/welcome.html'));
  
    res.render('result',{docTitle:'search result',items:ress}) 
   
     console.log(ress)

 
} 