
const connection=require('../dbConnection');
exports.module=class data{
    constructor(u,p){
       this.u=u;
       this.p=p;
    }

    static fetchall(u,p){
        
        return connection.query("select * from registration where email = ? and password = ?",[u,p])
    }

}