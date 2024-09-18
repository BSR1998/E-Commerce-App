
const mysql = require("mysql")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ecommerce"

})


    connection.connect((err)=>{
        if(err)
        {
            console.log("Error")
        }
        else
        {
            console.log("Perfect")
    
        }
    })




module.exports = connection