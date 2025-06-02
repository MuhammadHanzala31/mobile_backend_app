import { app } from "./app.js";
import { connectDb } from "./db/index.js";
import "dotenv/config"

const port = process.env.PORT || 5000

connectDb().then(() => {
    app.listen(port, () => {
        console.log('app is running on::', port)
    })
}).catch((err)=>{
    console.log(err)
})


