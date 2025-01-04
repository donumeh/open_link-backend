const { expressjwt: jwt } = require('express-jwt');


function authJwt() {
    const secret = process.env.SECRET
    const api = process.env.API_URL
    return jwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            `${api}/users/login`,
            `${api}/users/register`,
            `${api}/users/get/count`,
            { url: /\/api\/v1\/products(.*)/, method: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/category(.*)/, method: ["GET", "OPTIONS"] }
        ]
    })
}

module.exports = authJwt;