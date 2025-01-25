const errortry = (e)=>{
    //verifica entradas duplicadas
    if(e.code == "ER_DUP_ENTRY"){
        return {
            message:"entrada duplicada",
            status: 409
        }
    }
}
module.exports= {errortry}