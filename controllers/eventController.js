const db = require("../db.js");
const {validate} = require("../utils/jwt.js")
const createEvent = async( request, response )=>{
    try {
        const { title, description, date, location, capacity, organizer_id } = request.body;
        if(!( title && description && date && location && capacity && organizer_id )){
            return response.status(400).json({
                message: "invalid data"
            })
        }
        const token = request.headers["authorization"]
        //verifica a existencia do token
        if (!token) {
            return response.status(401).json({
                message:'Token não fornecido'
            });
        }
        const resToken = validate(token);
        //valida a sesão
        if (resToken) {
            return response.status(401).json({
                message:"token invalido"
            })
        }
        const sql = "INSERT INTO events( title, description, date, location, capacity, organizer_id) VALUES( ?, ?, ?, ?, ?, ? )"
        const res = await db.query(sql, [ title, description, date, location, capacity, organizer_id] )

        return response.status(200).json({
            massage:"suscesso",
            data: res
        })

    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
} 
const getEvents = async( request, response )=>{
    try {
        //ver se realmente vou poder trazer eventos novos ou trazer all
        const sql = "SELECT * FROM events WHERE date > NOW()";
        const res = await db.query(sql);

        return response.status(200).json({
            message: "suscesso",
            data: res[0]
        })
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
} 
const getEventDetails = async( request, response )=>{
    try {
        //
        const { id } = request.params
        if(!(id)){
            return response.status(400).json({
                message: "invalid data"
            })
        }
        const token = request.headers["authorization"]
        //verifica a existencia do token
        if (!token) {
            return response.status(401).json({
                message:'Token não fornecido'
            });
        }
        const resToken = validate(token);
        //valida a sesão
        if (resToken) {
            return response.status(401).json({
                message:"token invalido"
            })
        }
        const sql = "SELECT * FROM events WHERE id = ?"
        const res = await db.query( sql, [ id ] )
        return response.status(200).json({
            message: "suscesso",
           data: res[0]
        })

    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
} 
const updateEvent = async( request, response )=>{
    try {
        const { id } = request.params;
        const { title, description, date, location, capacity } = request.body
        if(!( title && description && date && location && capacity )){
            return response.status(400).json({
                message: "invalid data"
            })
        }
        const token = request.headers["authorization"]
        //verifica a existencia do token
        if (!token) {
            return response.status(401).json({
                message:'Token não fornecido'
            });
        }
        const resToken = validate(token);
        //valida a sesão
        if (resToken) {
            return response.status(401).json({
                message:"token invalido"
            })
        }

        const sql = "UPDATE events SET title = ?, description = ?, date = ?, location = ?, capacity = ? WHERE id = ?"
        const res = await db.query(sql, [ title, description, date, location, capacity, id])
        
        return response.status(200).json({
            message: "suscesso",
            data: res
        })
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
} 
const deleteEvent = async( request, response )=>{
    try {
        const {id} = request.params;
        if (!id) {
            return response.status(400).json({
                message: "invalid data"
            })
        }
        const token = request.headers["authorization"]
        //verifica a existencia do token
        if (!token) {
            return response.status(401).json({
                message:'Token não fornecido'
            });
        }
        const resToken = validate(token);
        //valida a sesão
        if (resToken) {
            return response.status(401).json({
                message:"token invalido"
            })
        }
        const sql = "DELETE FROM events WHERE id = ?"
        const res = await db.query( sql, [ id ] )
        return response.status(200).json({
            message: "suscesso",
            data: res
        })
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
} 



module.exports = {createEvent, getEvents, getEventDetails, updateEvent, deleteEvent}