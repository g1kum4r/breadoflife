const jsonwebtoken = require('jsonwebtoken');

function generateToken(payload){
    return jsonwebtoken.sign(JSON.stringify(payload), process.env.TOKEN_SECRET);
}

function getPayload(token){
    if(token){
        let splited = token.split(" ");
        if(splited.length > 1){
            try {
                return jsonwebtoken.verify(splited[1], process.env.TOKEN_SECRET);
            } catch (e) {
                throw e;
            }
        } else {
            // throw Error('Invalid token');
        }
    } else {
        // do nothing
    }
    throw Error('Invalid token');
}

function getId(token){
    return getPayload(token)._id;
}

module.exports.generateToken = generateToken;
module.exports.getPayload = getPayload;
module.exports.getId = getId;