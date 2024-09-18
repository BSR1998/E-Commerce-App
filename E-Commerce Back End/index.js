
const connection = require("./config")

const express = require("express")
const cors = require("cors")
const { createHmac,randomBytes } = require('crypto');
const multer  = require('multer');


const app = express()

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(express.static("./static"))
app.use(cors())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static/product')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}+${file.originalname}`)
     
    }
  })
  
  const upload = multer({ storage: storage })

app.post("/user",(req,res)=>{
    const { fname, lname, email, password } = req.body
    
    const secret = randomBytes(16).toString();
    
    const hash = createHmac('sha256', secret)
                    .update(password)
                    .digest('hex');
        console.log(hash);

    connection.query("INSERT INTO user (fname, lname, email, password,salt) VALUES(?,?,?,?,?)",[fname, lname, email, hash,secret ],(err,result)=>{
      
        res.status(201).json({status:"user created",
            user:{
                id:result.insertId,                                                                                                     
                email:email,                                                                                                        
                fname:fname
            }
        })
    })

})

app.post("/login",  (req,res)=>{
    let {email, password } = req.body
        console.log("Login data ",password)


    connection.query("SELECT * FROM user WHERE email = ?;",[email],(err,result)=>{

        const user = result[0]
 
        console.log("Everything is login god ",typeof(user.password))
        
        const hash = createHmac('sha256', user.salt)
                    .update(password)
                    .digest('hex');
        console.log(hash);

        if(hash===user.password)
        {
            res.status(200).json({
                id:user.srno,
                fname:user.fname,
                email:user.email
            })
        }
        
    })

   
})

app.post("/addproduct", upload.single("filepath"),(req,res)=>{
   
    const {srno,product,description,prize} = req.body
    const fileFUllPath = `/product/${req.file.filename}`
    console.log(" data ",req.body)
    connection.query("insert into product (srno,product_name,filepath,discription,prize) values(?,?,?,?,?)",[srno,product,fileFUllPath,description,prize],(error,result)=>{
        res.json({status:"Added"})
    })


})

app.get("/",(req,res)=>{
    res.json({status:"ok"})
})

app.get("/productlist",(req,res)=>{
    connection.query("select * from product",(err,result)=>{
        res.send(result)
    })
})

app.get("/product/:id",(req,res)=>{
    const id = req.params.id

    connection.query("select * from product where id =?",[id],(err,result)=>{
        res.send(result)
    })

})

app.post("/search",(req,res)=>{
    const body = req.body
    console.log("Search body ",body)

    if(body.name.length < 3)
    {

        connection.query("SELECT * FROM product WHERE product_name LIKE ?",[`%${body.name}%`],(err,result)=>{
            res.send(result)
        })
    }
    else 
    {

        connection.query("SELECT * FROM product WHERE product_name = ?",[body.name],(err,result)=>{
            res.send(result)
        })
    }
    
})


app.put("/product/:id", upload.single("filepath"),(req,res)=>{
    const id = req.params.id
    const {product,description,prize} = req.body
     const fileFUllPath = `/product/${req.file.filename}`

   console.log("Put response ",id,req.body)
    connection.query("update product set product_name = ? , filepath = ? , discription = ? , prize = ?  where id =?",[product,fileFUllPath,description,prize,id],(err,result)=>{
        res.json({status:"Product updated"})
    })
})




app.delete("/product/:id",(req,res)=>{

    const id = req.params.id
    console.log("Delete called ",id)
    connection.query("DELETE from product WHERE id=?",[id],(err,result)=>{
        res.json({status:"product deleted"})
    })
})

app.listen(8000,()=>{console.log("Server started")} )
