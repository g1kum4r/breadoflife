const bcrypt = require('bcrypt');

function encrypt(password) {
    let salt = bcrypt.genSaltSync(10, "b");
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

function compare(password, hash){
    console.log('password: ', password);
    console.log('hash: ', hash);
    let isMatch = bcrypt.compareSync(password, hash);
    console.log('isMatch: ', isMatch);
    return isMatch;
}

module.exports.compare = compare;
module.exports.encrypt = encrypt;
