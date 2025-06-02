import mongoose from 'mongoose'


const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://hanzalasispn:Pakistan92@cluster0.7nxat.mongodb.net/mobileApp`)
        console.log(`database connected on port :: ${connectionInstance.connection.port}`);
        
    } catch (error) {
        console.log('mongodb connectd failed in db/index.js', error)
    }
} 
export{connectDb}
