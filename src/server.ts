import  express, { Response, Request } from "express"
import cors from "cors"
import * as dotenv from "dotenv"
dotenv.config()
import { connecToDB } from "./config"
import bodyParser from "body-parser"
import { register, login, createProject } from "./services"
import { checkAuthState } from "./utils"

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

app.post("/auth/login", login)

app.post("/project/create", checkAuthState, createProject)

app.listen(PORT, ()=>{
    connecToDB()
    console.log("App listening on port 3000");
})