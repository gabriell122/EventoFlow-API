require("dotenv").config()
const db = require("../db.js")
const jwt = require("jsonwebtoken");
const { validate } = require("../utils/jwt.js");
const key = process.env.KEY;

const registerUser = async ( request, response )=>{
    try {
        const { name, email, password, role} = request.body;

        //verifica se a dados vazios
        if (!(name && email && password)) {
            return response.status(400).json({
                message: "invalid data"
            })
        }

        //verifica se o emeil ja existe
        const sqlVerifica = "SELECT 1 AS DUP FROM users WHERE email = ?";
        const resVeirfica = await db.query(sqlVerifica, [ email ]);
        
        if (resVeirfica[0][0]?.DUP) {
            return response.status(409).json({
                message:"email duplicado"
            })
        }
        
        
        const sql = "INSERT INTO `users`( `name`, `email`, `password`, `role` ) VALUES (?,?,?,?)";
        const res = await db.query(sql , [name, email, password, role ?? "participant" ]);
        return response.status(200).json({
            message: "susceso",
            res:res
        })

    } catch (error) {
        
        //retorna outros erros
        return response.status(400).json({
            message: "error",
            error: error
        })
    }
}

const loginUser = async ( request, response )=>{
    try {
        const { email, password } = request.body;
        if (!(email && password)) {
            return response.status(400).json({
                message: "invalid data"
            })
        }

        const sql = "SELECT id, name, email, role FROM `users` WHERE email = ? AND password = ?"
        const res = await db.query( sql, [ email, password ])
        
        const user = { email:res[0][0].email, password: res[0][0].password}
        const token = jwt.sign(
            user,
            key,
            {expiresIn:"1h"}
        )
        return response.status(200).json({
            message:"Login feito",
            data: { user: res[0], token: token }
        })

    } catch (error) {
        //retorna outros erros
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
}

const getUserProfile = async ( request, response )=>{

    try {
        const {token, id} = request.params;
        if(!(token && id)){
            return response.status(400).json({
                message: "invalid data"
            })
        }
        const resToken = validate(token);
        if (resToken) {
            return response.status(401).json({
                message:"token invalido"
            })
        }
        const sql = "SELECT role FROM users WHERE id = ?"
        const res = await db.query( sql, [id])
        return response.status(200).json({
            message:"suscesso",
            data: res[0][0].role
        })
    } catch (error) {
        //retorna outros erros
        return response.status(400).json({
            message:"error",
            error: error
        })
    }

}

module.exports = { registerUser, loginUser, getUserProfile };

