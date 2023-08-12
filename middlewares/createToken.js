const jwt = require('jsonwebtoken');

const createToken = ({ body }, res, next) => {
    const { userID } = body;

    req.body.userID = null;
    next();
}

module.exports = createToken;