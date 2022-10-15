import mongoose from "mongoose";

function connecToDB() {
    mongoose.connect(
        process.env.DB_URL as string || "mongodb://localhost:27017/ssecret", () => {
            console.log("Connected to database");
        }
    )
}

export {
    connecToDB
}