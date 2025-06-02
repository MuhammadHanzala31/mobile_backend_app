import mongoose from 'mongoose'


const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/mobileApp`)
        console.log(`database connected on port :: ${connectionInstance.connection.port}`);
        
    } catch (error) {
        console.log('mongodb connectd failed in db/index.js', error)
    }
} 
export{connectDb}