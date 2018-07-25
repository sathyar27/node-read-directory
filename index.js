const https = require('https');
const mySql = require('mysql');
const fs = require('fs');

const readableState = (x) => {
    return x.ReadableState;
}

function makeHttpCall(jsonUrl) {
    return new Promise((resolve, reject) => {
        https.get(jsonUrl, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

//makeHttpCall('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(JSON.parse).then(readableState).then(console.log).catch((err) => console.log(err))

const conn = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb2'
});

// const query = `insert into users (username,password) values('tamil', '12345')`;

const query = `select * from users`;

function dbConnection(query) {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}


//dbConnection(query).then(console.log).catch((err) => console.log)



function splitErrorFile(fileData) {

    const errorFile = function (fileName) {
        return fileName.split('\r\n').filter((x) => {
            if (x[0] == "E") {
                return true;
            }
            else {
                return false;
            }
        }
        )
    }

    var errorFile1 = errorFile(fileData);

    const infoFile = function (fileName) {
        return fileName.split('\r\n').filter((x) => {
            if (x[0] == "I") {
                return true;
            }
            else {
                return false;
            }
        }
        )
    }

    var infoFile1 = infoFile(fileData);

    const warnFile = function (fileName) {
        return fileName.split('\r\n').filter((x) => {
            if (x[0] == "W") {
                return true;
            }
            else {
                return false;
            }
        }
        )
    }

    var warnFile1 = warnFile(fileData);

    return [errorFile1, infoFile1, warnFile1];
}

function writeFile(fileData1) {

    const writeFile1 = function (fileName, fileData2) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, fileData2, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(`${fileName} Created successfully`);
                }
            })
        })
    }

    return Promise.all([
        writeFile1('log-file/error-log.txt', fileData1[0].join('\n')),
        writeFile1('log-file/info-log.txt', fileData1[1].join('\n')),
        writeFile1('log-file/warning-log.txt', fileData1[2].join('\n'))
    ])

}



function errorFileRead(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

// errorFileRead("error.log").then(splitErrorFile)
//     .then(writeFile).then(console.log).catch((err) => {
//         console.log(err);

//     })


function readDir(dirName) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirName, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

readDir("node_modules").then(console.log).catch((err) => console.log(err));



