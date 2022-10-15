import  express, { Response, Request } from "express"
import cors from "cors"
import * as dotenv from "dotenv"
dotenv.config()
import { connecToDB } from "./config"
import bodyParser from "body-parser"
import { register, login, tokenizeSecrets } from "./services"


const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (_req: Request, res:Response)=>{
    return res.status(200).send({
        "ping":"pong"
    })
})

app.post("/auth/register", register)

app.listen(PORT, ()=>{
    connecToDB()
    console.log("App listening on port 3000");
})