const fs = require('fs');
const path = require('path');

//create folder database

module.exports.get = (key) => {
    try {
        return fs.readFileSync(__dirname + '/database/' + key, 'utf-8');
    }catch{
        return null;
    }
}

module.exports.set = (key, value) => {
    fs.writeFileSync(__dirname + '/database/' + key, value.toString(), 'utf-8');
}

module.exports.delete = (key) => {
    fs.unlink(path.join('database', key), err => {
        if (err) console.log(err);
    });
}

module.exports.empty = () => {
    fs.readdir('database', (err, files) => {
        if (err) console.log(err);
        for (const file of files) {
            fs.unlinkSync(path.join('database', file));
        }
    });
}