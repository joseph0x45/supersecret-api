import  express, { Response, Request } from "express"
import * as cors from "cors"
import * as dotenv from "dotenv"
dotenv.config()
import bodyParser from "body-parser"

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (_req: Request, res:Response)=>{
    return res.status(200).send({
        "ping":"pong"
    })
})

app.listen(PORT, ()=>{
    console.log("App listening on port 3000");
})