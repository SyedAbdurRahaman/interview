const express=require('express');
const router=express.Router();

const path=require('path');

const getController=require('../controllers/logincontrollers')
const postController=require('../controllers/logincontrollers')
//------------------------
//db
//-----------------
router.get('/log', getController.getLogin);

// (req, res) => {
//     // res.sendFile(__dirname + '/index.html')
//     res.sendFile(path.join(__dirname,'../','index.html'));
// })


 router.post('/auth',postController.postLogin);

//(req, res) => {
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

module.exports = router;
