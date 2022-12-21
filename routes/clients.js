
const express = require('express');
const sqlite = require('sqlite3').verbose();
const url = require('url');
let sql;
const db = new sqlite.Database("./quote.db",sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
})

const router = express.Router();

router.post("/", (req,res)=>{
    try {
        const {cedula, nombre, telefono, direccion}= req.body;
        sql= "INSERT INTO CLIENTE(cedula, nombre, telefono, direccion) VALUES (?,?,?,?)" ;
        db.run(sql, [cedula, nombre, telefono, direccion],(err) => {
            if (err){
                return res.json({status:300,success:false, error:err});
            } else {
                return res.json({
                    status:200,
                    success:true,
                });
            }
        });
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    }
})

router.get("/", (req,res)=>{
    sql= "SELECT * FROM CLIENTE";
    try {
        db.all(sql, [], (err, rows) => {
            if (err){
                return res.json({status:300,success:false, error:err});
            } else {
                return res.json({
                    status:200,
                    success:true,
                    data: rows
                });
            }
        });
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    }
})


router.delete("/:id", (req,res)=>{
    const { id } = req.params;
    sql= "DELETE FROM CLIENTE WHERE codigo = ?" ;
    try {
        db.run(sql, [id], (err) => {
            if (err){
                return res.json({status:300,success:false, error:err});
            } else {
                return res.json({
                    status:200,
                    success:true,
                });
            }
        });
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    }
})

router.put("/:id", (req,res)=>{
    const { id } = req.params;
    const {nombre, telefono, direccion}= req.body;
    sql= `UPDATE CLIENTE SET nombre = '${nombre}',
        telefono = '${telefono}', direccion = '${direccion}'
        WHERE cedula = ${id}`;
    try {
        db.run(sql, [], (err) => {
            if (err){
                return res.json({status:300,success:false, error:err});
            } else {
                return res.json({
                    status:200,
                    success:true,
                });
            }
        });
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    }
})

module.exports = router;
