var paths = process.env.PATH;
const fs = require('fs');


if (paths.search("tnsname.ora") != "-1") {
    console.log(paths);

} else {
    var regedit = require('regedit');
    var path = "HKLM\\SOFTWARE\\Oracle";
    var tnsPath = "\\network\\ADMIN" + "\\tnsnames.ora";
    regedit.list([path], function (err, result) {
        if (err == null) {
            result[path].keys.forEach(element2 => {
                regedit.list([path + "\\" + element2], function (err, resultElement) {
                    if (resultElement[path + "\\" + element2].values != null) {
                        if (resultElement[path + "\\" + element2].values["ORACLE_HOME_NAME"] != undefined) {

                            var fs = require("fs");
                            var text = fs.readFileSync(resultElement[path + "\\" + element2].values["ORACLE_HOME"].value + tnsPath).toString();
                            //console.log(text);
                            fs.writeFileSync("TNSNAMES.txt", text);
                            var      xx= parseConnectString(text);
                            console.log(xx)    ; 
                            return;

                        }
                    }
                })
            });
        } else {

            console.log(err.message);
        }

    })
}




