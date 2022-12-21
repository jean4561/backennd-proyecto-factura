const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./quote.db',sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
})
// const sql='CREATE TABLE quote(ID INTERGER PRIMARY KEY,movie, quote, character)';
const sql=`
    CREATE TABLE PRODUCTOS (
        codigo integer,
        descripcion text,
        existencia integer,
        precio numeric,
        PRIMARY KEY(codigo)
    );`
const sql2=`
    CREATE TABLE FACTURA (
        numeroFactura integer,
        cedulaCliente text,
        subtotal numeric,
        iva numeric,
        total numeric,
        fechaFactura date,
        PRIMARY KEY(numeroFactura)
    );`
const sql3=`
    CREATE TABLE COMPRAS (
        numeroFactura integer,
        codigo integer,
        precio numeric,
        cantidad integer,
        PRIMARY KEY(numeroFactura, codigo)
    );
    `
const sql4=`
    CREATE TABLE CLIENTE (
        cedula text,
        nombre text,
        telefono text,
        direccion text,
        PRIMARY KEY(cedula)
    );
`;

// const sql5=`
//     INSERT INTO PRODUCTOS(codigo, descripcion, existencia, precio) VALUES (1, 'Coca Cola', 10, 1.50);
//     INSERT INTO PRODUCTOS(codigo, descripcion, existencia, precio) VALUES (2, 'Pepsi', 10, 1.50);
//     INSERT INTO PRODUCTOS(codigo, descripcion, existencia, precio) VALUES (3, 'Fanta', 10, 1.50);	
//     INSERT INTO PRODUCTOS(codigo, descripcion, existencia, precio) VALUES (4, 'Sprite', 10, 1.50);
// `;

db.run(sql);
db.run(sql2);
db.run(sql3);
db.run(sql4);
db.close();

// const sqlite2 = require('sqlite3').verbose();
// const db2 = new sqlite2.Database('./quote.db',sqlite2.OPEN_READWRITE,(err)=>{
//     if(err) return console.error(err);
// })

// db2.run(sql5);

