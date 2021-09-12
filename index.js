const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.urlencoded ({extended: false}))

const Port = 3002;

const connnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "foods"
});

connnection.connect((err)=>{
    if(err) throw err
    console.log("database connect");
})

// Get data food
app.get("/api/Product", (req, res)=>{
    let sql= "select * from Product";
    let query = connnection.query(sql, (err, result)=>{
        if(err){
            res.render({
                msg: "fail get data",
                status: 500,
                err,
            })
        }else{
            res.send({
                msg: "success get data",
                status: "200",
                data: result,
            });
        }
    });
});

// add data food
app.post("/api/Product", (req, res)=>{
    let {body} = req;
    let sql = "insert into Product set ?";
    let query = connnection.query(sql, body,(err, result)=>{
        if(err){
            res.send({
                msg: "add data err",
                status: 500,
                err,
            })
        }else{
            let newBody = {
                id : result.insertId,
                ...body,
            }
            res.send({
                msg: "add data success",
                status: 200,
                data: newBody
            })
        }
    })
})


// Get data foood by Id
app.get("/api/Product/:id", (req, res)=>{
    let {id} = req.params;
    let sql = `select * from Product where id_product = ${id}`
    connnection.query(sql, (err, result)=> {
        if(err){
            res.send({
                msg: "get data by id error",
                status: 500,
                err,
            })
        }else{
            res.send({
                msg: "get data id succes",
                status: 200,
                data:result,
            })
        }
    })
})

// delete data.
app.delete("/api/Product/:id", (req, res)=>{
    let {id} = req.params;
    let sql = `DELETE FROM Product where id_product = ${id}`
    connnection.query(sql, (err, data)=>{
        if(!err){
            res.send({
                msg: "delete data id succes",
                status: 200,
                data,
            })
        }else{
            res.send({
                msg: "delete data id error",
                status: 500,
                err
            })
        }
    })
})

app.listen(Port, ()=>{
    console.log('running');
})