const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./quote.db',sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
})
const sql='CREATE TABLE quote(ID INTERGER PRIMARY KEY,movie quote, character)';
db.run(sql);