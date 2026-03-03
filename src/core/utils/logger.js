const fs = require('fs')

async function logger(level, msg) {
    const timestamp = new Date().toISOString();
    const text = `[${timestamp}] CORE ${level.toUpperCase()}: ${msg}`

    await fs.appendFileSync('server.log', text + '\n');

    console.log(text)
}

const log = {
    info: (msg) => logger('info', msg),
    error: (msg) => logger('error [X]', msg)
}

module.exports = {
    log
}