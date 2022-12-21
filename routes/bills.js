
const express = require('express');
const sqlite = require('sqlite3').verbose();
const url = require('url');
let sql, sql2, sql3, sql4;
const db = new sqlite.Database("./quote.db",sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
})

const router = express.Router();

router.post("/", (req,res)=>{
    const {numeroFactura, fechaFactura, cedulaCliente, vendedor, estado,
        subtotal, iva, total, articulos}= req.body;
    try {
        sql= "INSERT INTO FACTURA(numeroFactura, fechaFactura, cedulaCliente, subtotal, iva, total) VALUES (?,?,?,?,?,?)" ;
        let success = false
        db.run(sql, [numeroFactura, fechaFactura, cedulaCliente, subtotal, iva, total],(err) => {
            if (err){
                console.log('err', err);
                console.log('err')
            } else {
                success = true
                console.log('succ');
            }
        });

        let vals = '';
        for (let i = 0; i < articulos.length; i++) {
            vals += `(${numeroFactura}, ${articulos[i].codigo}, ${articulos[i].precio}, ${articulos[i].cantidad}),`;
        }

        sql2= `INSERT INTO COMPRAS(numeroFactura, codigo, precio, cantidad) VALUES ${vals.slice(0, -1)}`;
        success = false
        db.run(sql2, [],(err) => {
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
    sql= `SELECT c.*, f.*, p.* FROM COMPRAS c
        JOIN FACTURA f ON f.numeroFactura = c.numeroFactura
        JOIN PRODUCTOS p ON p.codigo = c.codigo`;
        // FROM COMPRAS c
        // JOIN FACTURA f ON f.numeroFactura = c.numeroFactura
        // JOIN PRODUCTOS p ON p.codigo = c.codigo
    try {
        db.all(sql, [], (err, rows) => {
            if (err){
                console.log('err', err);
                return res.json({status:300,success:false, error:err});
            } else {
                const articulos = [];
                const facturas = [];
                rows.forEach(row => {
                    const factura = facturas.find(factura => factura.numeroFactura === row.numeroFactura);
                    if (factura) {
                        factura.articulos.push({
                            codigo: row.codigo,
                            descripcion: row.descripcion,
                            precio: row.precio,
                            cantidad: row.cantidad,
                            existencia: row.existencia,
                        });
                    } else {
                        facturas.push({
                            numeroFactura: row.numeroFactura,
                            fechaFactura: row.fechaFactura,
                            cedulaCliente: row.cedulaCliente,
                            subtotal: row.subtotal,
                            iva: row.iva,
                            total: row.total,
                            articulos: [{
                                codigo: row.codigo,
                                descripcion: row.descripcion,
                                precio: row.precio,
                                cantidad: row.cantidad,
                                existencia: row.existencia,
                            }],
                        });
                    }
                });

                return res.json({
                    status:200,
                    success:true,
                    data: facturas,
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
    try {
        success = false
        sql= "DELETE FROM FACTURA WHERE numeroFactura = ?" ;
        db.run(sql, [id], (err) => {
            success = true
        });

        sql2= "DELETE FROM COMPRAS WHERE numeroFactura = ?" ;
        db.run(sql2, [id], (err) => {
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
    let success = false
    const {numeroFactura, fechaFactura, cedulaCliente, vendedor, estado,
        subtotal, iva, total, articulos}= req.body;
    try {
        success = false
        sql= "DELETE FROM FACTURA WHERE numeroFactura = ?" ;
        db.run(sql, [id], (err) => {
            if (err){
                console.log('err', err);
            } else {
                console.log('succ');
            }
        });

        sql2= "DELETE FROM COMPRAS WHERE numeroFactura = ?" ;
        db.run(sql2, [id], (err) => {
            success = true
            if (err){
                console.log('err', err);
            } else {
                console.log('succ');
            }
            // if (err){
            //     return res.json({status:300,success:false, error:err});
            // } else {
            //     return res.json({
            //         status:200,
            //         success:true,
            //     });
            // }
        });

        sql3= "INSERT INTO FACTURA(numeroFactura, fechaFactura, cedulaCliente, subtotal, iva, total) VALUES (?,?,?,?,?,?)" ;
        db.run(sql3, [numeroFactura, fechaFactura, cedulaCliente, subtotal, iva, total],(err) => {
            if (err){
                console.log('err', err);
                console.log('err')
                // return res.json({status:300,success:false, error:err});
            } else {
                success = true
                console.log('succ');
                // return res.json({
                //     status:200,
                //     success:true,
                // });
            }
        });

        let vals = '';
        for (let i = 0; i < articulos.length; i++) {
            vals += `(${numeroFactura}, ${articulos[i].codigo}, ${articulos[i].precio}, ${articulos[i].cantidad}),`;
        }

        sql4= `INSERT INTO COMPRAS(numeroFactura, codigo, precio, cantidad) VALUES ${vals.slice(0, -1)}`;
        success = false
        db.run(sql4, [],(err) => {
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
