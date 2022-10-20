import mongoose from "mongoose";

function connecToDB() {
    mongoose.connect(
        process.env.DB_URL as string || "mongodb://localhost:27017/ssecret", () => {
            console.log("Connected to database");
        }
    )
}

const SuperSecretKeys = {
    SSK:"sup3rs3cr3t",
    SSEK:"sup3rs3cr3t4pp"
}

export {
    connecToDB,
    SuperSecretKeys
}