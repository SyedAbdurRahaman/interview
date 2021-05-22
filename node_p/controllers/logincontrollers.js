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
     if(req.session.loggedin){
    //res.sendFile(path.join(__dirname ,'../','viewes/welcome.html'));
    connection.query("select * from registration",(err,results,fields)=>{
      console.log(results)
      if(err)throw err; 
      res.render('welcome',{docTitle:'welcomee',items:results}) 
     
       

    })

    //res.send("welcome back," +req.session.u);
     }else{
       res.send('please login to viewthis page');
     }
  
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
  
  res.render('add',{docTitle:'Add USERS'}) 

}

exports.postAdd=(req, res) => { 
  var Username=req.body.Username;
  var email=req.body.email;
  var password=req.body.password;
  var cpassword=req.body.cpassword;  
         connection.query("INSERT INTO registration (username, email, password, confirmPassword) VALUES(?,?,?,?)",[Username,email,password,cpassword],(err,results,fields)=>{

    if(err) throw err;
    res.redirect('/welcome');
  });
};

// --------------------------------------------------------------------------------------------------------
exports.getEdit=(req,res)=>{
  
  // res.render('edit',{docTitle:'edit'}) 
    const id = req.params.id;
    let sql = `Select * from registration where id = ${id}`;
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
  var Username=req.body.Username;
  var email=req.body.email;
  var password=req.body.password;
  var cpassword=req.body.cpassword;  
         connection.query("update registration SET username='"+Username+"', password='"+password+"',confirmPassword='"+cpassword+"' where id ="+id,(err,results,fields)=>{

    if(err) throw err;
    res.redirect('/welcome');
  });
};



// --------------------------------------------------------------------------------------------------------
exports.getDelete=(req,res)=>{
  
  // res.render('edit',{docTitle:'edit'}) 
    const id = req.params.id;
    let sql = `DELETE FROM registration WHERE id= ${id}`;
    let query = connection.query(sql,(err, result) => {
       
        if(err) throw err;
        
        
       res.redirect('/welcome');
    });
//res.send("delete")

}