const http = require('http');
const fs = require('fs');
const oracledb = require('oracledb');
let error;
let user;


var credentials = {
    user:        "user",//  dbConfig.user,
    password:     "password",// dbConfig.password,
    connectString: "connectioString"//dbConfig.connectString
  };

console.log(TNSNAMES);

oracledb.getConnection(credentials,
    function (err, connection) {
        if (err) {
            console.error(err.message);
        return;
        }
        connection.execute('SELECT 12, owner , table_name FROM dba_All_tables where owner = :hr ', ['HR'], function (err, result) {
            if (err) {
                error = err;
                console.log(err.message);
                return;
            }
            //console.log(result.rows);
            fs.writeFileSync("queryResut.txt", result.rows);  
            connection.close(function (err) {
                if (err) {
                    console.log(err.message);
                    return;
                }
            });
        })
    }
);
