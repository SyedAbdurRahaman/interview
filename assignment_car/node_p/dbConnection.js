const mysql=require('mysql');
const connectionn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ms1"
});
connectionn.connect(function(error){
    if (error) throw error;
    else console.log("connected successfully")
});

exports.module=connectionn;