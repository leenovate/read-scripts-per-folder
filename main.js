const fs = require('fs');

async function execAllJs(folderName, data, result) {
    let files = fs.readdirSync(__dirname + `/${folderName}`);

    for (const file of files) {
        let my_function = require(__dirname + `/${folderName}/` + file);
        data = await my_function.my_function(data, result);
        console.log(`ended: ${__dirname + `/${folderName}/` + file}`);
    }

    console.log(`done: ${folderName}`);
    return data;
}

function folderName1(data, result) {
    return new Promise(async (resolve, reject) => {
        const folderFinished = await execAllJs('folder_name1', data, result);
        return resolve(folderFinished);
    });
}

function folderName2(data, result) {
    return new Promise(async (resolve, reject) => {
        const folderFinished = await execAllJs('folder_name2', data, result);
        return resolve(folderFinished);
    });
}

function folderName3(data, result) {
    return new Promise(async (resolve, reject) => {
        const folderFinished = await execAllJs('folder_name3', data, result);
        return resolve(folderFinished);
    });
}

async function finalFunction(data, result) {
    console.log({ num: data.num += result.num });
    return 'everything is done';
}

async function main() {
    let data = { num: 0 };
    let result = { num: 2 }; //increment data per js file

    let start = new Date().getTime();

    data = await folderName1(data, result);
    data = await folderName2(data, result);
    data = await folderName3(data, result);

    const last = await finalFunction(data, result);
    console.log(last);

    let end = new Date().getTime();
    let time = end - start;
    console.log('Execution time: ' + time / 1000);
}

main();