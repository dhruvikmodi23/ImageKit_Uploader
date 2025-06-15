import mongoose from "mongoose";

const mongourl= process.env.MONGODB_URI!

if(!mongourl){
    console.log("Please define the MONGODB_URI environment variable inside .env file")
}

let cached=global.mongoose

if(!cached){
    cached= global.mongoose={conn:null, promise:null}
}

export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const opts={
            bufferCommands:true,
            maxPoolSize:10
        }

           mongoose
           .connect(mongourl,opts)
           .then(()=>mongoose.connection)
    }
    try {
        cached.conn = await cached.promise 
    } catch (error) {
        cached.promise=null
        throw error
    }

    return cached.conn;
}