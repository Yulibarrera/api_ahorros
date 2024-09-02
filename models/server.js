import express, { json } from 'express'
import dbConnection from '../database/config.js'
import '../database/config.js'
import ahorroRouter from '../routes/ahorroRouter.js'

class Server{
    constructor(){
    this.app = express()
    this.listen()
    this.dbConnection()
    this.pathAhorro = "/api/ahorro"
    this.route()
    
    }

    route (){
        this.app.use(json())
        this.app.use(this.pathAhorro, ahorroRouter )
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running`)
        })
    }

    async dbConnection(){ 
        await dbConnection()
    }
}

export default Server