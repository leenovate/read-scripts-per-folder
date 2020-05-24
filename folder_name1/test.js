const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function my_function(data, result) {

    console.log(`started: ${__filename}`);

    await delay(5000);
    return { num: data.num += result.num }
}

module.exports = {
    my_function: my_function
}

