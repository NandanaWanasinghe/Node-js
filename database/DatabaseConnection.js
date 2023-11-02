const myaql = require('mysql');
require('dotenv').config();

const db=myaql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

db.connect((err)=>{
    if(err){
        console.log('somthing went to wrong with the database initialization'+err.stack);
        process.exit(1);
    }
});

module.exports = db;