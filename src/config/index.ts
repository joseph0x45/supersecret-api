import mongoose from "mongoose";

function connecToDB() {
    mongoose.connect(
        process.env.DB_URL as string || "mongodb://localhost:27017/ssecret", () => {
            console.log("Connected to database");
        }
    )
}

const SuperSecretKeys = {
    SSK:process.env.SSK as string,
    SSEK:process.env.SSEK as string
}

export {
    connecToDB,
    SuperSecretKeys
}