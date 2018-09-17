const fs = require('fs');
const chalk = require('chalk');

function readDir(dirName, dataPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                if(dataPath.length > 0) {
                    const arr = []
                    for(i=0; i<data.length; i++) {                        
                        arr.push(`${dataPath}/${data[i]}`);                       
                    }     
                    resolve(arr);
                }
                else {
                    resolve(data);
                }
            }
        })
    })
}

const getDirList = ((x) => {
    Object.entries(x).forEach(([key, value]) => {
        if (value.length > 1) {
            Object.entries(value).forEach(([key, val]) => {
                console.log(chalk.blue(val))
            })
        } else {
            console.log(chalk.blue(value));
        }
    });
})

function nestedReadDir(newData) {

    const readFile = function (fileName) {
        return fileName.filter((x) => {
            if (!x.includes('.')) {
                return true;
            } else {
                return false;
            }
        })
    }

    var readFile1 = readFile(newData);



    const readDir1 = function (fileName) {
        return fileName.filter((x) => {
            if (x.includes('.')) {
                return true;
            } else {
                return false;
            }
        })
    }

    var readDir2 = readDir1(newData);

    return [readFile1, readDir2];
}

const nestedReadDir2 = function (data) {
    var newData = data[0];
    
    const newArr = Promise.all([     
        data[1],       
        readDir(`log-file/src/${newData[0]}`, newData[0]),
        readDir(`log-file/src/${newData[0]}`, newData[1])
    ])
    return newArr
}

readDir("log-file/src", '').then(nestedReadDir).then(nestedReadDir2).then(getDirList).then(console.log).catch((err) => console.log(err));