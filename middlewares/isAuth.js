const {expressjwt} = require("express-jwt")

const isAuth = expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["ES256", "HS256"],
    requestProperty: "payload",
    getToken: (req)=>{

        if(req.headers === undefined || req.headers.authorization === undefined){
            return null
        }

        const tokenArr = req.headers.authorization.split(" ")
        const token = tokenArr[1]
        const tokenType = tokenArr[0]

        if(tokenType !== "Bearer"){
            return null
        }

        return token
    }
})

module.exports = isAuth