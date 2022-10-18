import  express, { Response, Request } from "express"
import cors from "cors"
import * as dotenv from "dotenv"
dotenv.config()
import { connecToDB } from "./config"
import bodyParser from "body-parser"
import { register, login, createProject, fetchProjects, createSecret, fetchSecrets, getUsername } from "./services"
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

app.get("/auth/username", checkAuthState, getUsername)

app.post("/project/create", checkAuthState, createProject)

app.get("/project/fetch", checkAuthState, fetchProjects)

app.post("/project/create/secret", checkAuthState, createSecret)

app.post("/project/fetch/secrets", checkAuthState, fetchSecrets)


app.listen(PORT, ()=>{
    connecToDB()
    console.log("App listening on port 3000");
})