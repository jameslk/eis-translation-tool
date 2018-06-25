const readline = require('readline');

const ask = (question) => new Promise((resolve, reject) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.question('\n' + question, response => {
        rl.close();
        resolve(response.trim())
    })
});

const askMultiLine = (question) => new Promise((resolve, reject) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    console.log('\n' + question);

    let lines = ''

    const handler = (data) => {
        if (data.trim().length < 1) {
            rl.removeListener('line', handler);
            rl.close()
            resolve(lines);
            return;
        }

        lines += data + '\n';
    }

    rl.on('line', handler);
});

const askAndVerify = async (question, asker = ask) => {
    let answer = ''
    let hasCorrectAnswer = false;

    do {
        answer = await asker(question);

        console.log('\nYou said:');
        console.log(answer + '\n');

        const canContinue = await ask('Does this look correct [Y/n]?: ');

        if (canContinue !== 'n') {
            hasCorrectAnswer = true
        }

    } while (!hasCorrectAnswer);

    return answer
}

module.exports = exports = {
    ask, askMultiLine, askAndVerify
}