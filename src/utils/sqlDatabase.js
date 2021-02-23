const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./src/database/database.db', (err) => {
    if (err) {
        console.log(`Database error: ${err.message}`);
    } else {
        console.log('Connected to sqlite database');
    }
})

const addUserTokenLimit = async (token, wordsLength, timestamp) => {
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            console.log("wordLength: ", wordsLength)
            db.exec(`insert into main.user_limits (token, justifyWords, user_datetime) values ('${token}', ${wordsLength}, '${timestamp}');`, (err) => {
                if (err) {
                    console.log(`Insert new user limit error: ${err}`);
                    reject();
                } else {
                    console.log('Insert success');
                    resolve();
                }
            })
        })
    });
}

const selectUserLimit = async (token) => {
    let userLimit = {}
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`select * from user_limits where token = '${token}';`, (err, row) => {
                if (err) {
                    console.log(`Select user limit error: ${err}`);
                    reject();
                } else {
                    console.log('Select user limit success');
                    console.log(`row: ${row}`)
                    if (row !== undefined) {
                        userLimit['token'] = row.token;
                        userLimit['justifyWords'] = row.justifyWords;
                        userLimit['userDateTime'] = row.user_datetime;
                    }
                    resolve(userLimit);
                }
            })
        })
    })
    return userLimit;
}

const updateUserLimitWords = async (token, newWordsLength) => {
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('update user_limits set justifyWords = ? where token = ?;', newWordsLength, token, (err) => {
                if (err) {
                    console.log(`Error update: ${err}`);
                    reject();
                } else {
                    resolve();
                }
            });
        })
    })
}

const updateUserLimitWordsAndDate = async (token, newWordsLength, newDate) => {
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('update user_limits set justifyWords = ?, user_datetime = ? where token = ?;', newWordsLength, newDate, token, (err) => {
                if (err) {
                    console.log(`Error update: ${err}`);
                    reject();
                } else {
                    resolve();
                }
            });
        })
    })
}

module.exports = {
    selectUserLimit,
    addUserTokenLimit,
    updateUserLimitWords,
    updateUserLimitWordsAndDate
}
