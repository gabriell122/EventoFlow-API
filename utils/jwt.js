require("dotenv").config()
const jwt = require("jsonwebtoken")
const key = process.env.KEY;

const validate = (token)=>
    jwt.verify(token, key, (err, decoded)=> {
        if (err) {
            console.log('Token inválido:', err.message)
            return(
                true
            )
        } else {
            console.log('Token decodificado:', decoded);
            return (
                false
            )
        }
    })
module.exports = {validate};