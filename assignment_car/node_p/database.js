const mysql = require('mysql');
const express = require('express');
const session=require('express-session');
const bodyParser= require('body-parser');
const Swal=require('sweetalert2')



const app=express();

app.set('view engine','ejs');
app.set('views','views');


const signupRouter=require('./routes/signup')
const loginRouter=require('./routes/login');
const homeRouter=require('./routes/home');
const addRouter=require('./routes/add')

const editRouter=require('./routes/edit')
const deleteRouter=require('./routes/delete')
const resultRouter=require('./routes/result')



// const { response } = require('express');
 

app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, function() {
    console.log('listening on 3000')
  })
// const connection=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"ms1"
// });
// connection.connect(function(error){
//     if (error) throw error;
//     else console.log("connected successfully")
// });
app.use(signupRouter);
app.use(loginRouter);
app.use(homeRouter);
app.use(editRouter);
app.use(addRouter);
app.use(deleteRouter);
app.use(resultRouter);


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
// app.get('/welcome', (req, res) => {
//   // res.sendFile(__dirname + '/welcome.html')
//   res.sendFile(path.join(__dirname ,'welcome.html'));
// })

  // if(req.session.loggedin){
    
  //   res.sendFile(path.join(__dirname,'welcome.html'));
  //    //res.send("welcome back," +req.session.u);
  // }else{
  //   res.send('please login to viewthis page');
  // }
  // res.end();

//-----------------------------------------------------------------------------------------------------
// app.post('/auth', (req, res) => {
//     console.log(req.body)

//  var u=req.body.u;
//     // var g=req.body.g;
//     var p=req.body.p;
//     if(u && p){

    
//     connection.query("select * from reg where uname = ? and pass = ?",[u,p],function(error,results,fields){
//       console.log(results);  
//       if (results.length > 0){
//         req.session.loggedin=true;
//         req.session.u=u;
//             console.log("login")
//           res.redirect('./welcome')
//         }else{
//                res.send('incorrect username and or  password')
//             //res.redirect("/");
//         }

//         res.end();
//     });
//   }
//   else{
//     res.send("please entre user name and password!" );
//     res.end();
//   }
// })
//----------------------------------------------------------------------------------------
// app.post("/", function(res,req){
//     console.log(req.body);
//     var u=req.body.u;
//     var g=req.body.g;
//     var p=req.body.p;
//     connection.query("select * from reg where uname = ? and gm = ? and pass = ?",[u,g,p],function(error,results,fields){
//         if (results.length > 0){
            
//           res.redirect("/welcome.html");
//         }else{
               
//             res.redirect("/");
//         }

//         res.end();
//     });
// });

 
