import cron from 'cron'
import https from 'https'

const  cronJob = new cron.CronJob("*/14 * * * *", function(){
    https.get(
       ' https://mobile-backend-app-1.onrender.com/', (res) => {
        if(!res.statusCode === 200) console.log("Get Request Failed", res.statusCode)
        console.log("Get Request sent successfulluy")
       }
    ).on("error", (e)=> console.log("Error while sending request", e))
})

export default cronJob