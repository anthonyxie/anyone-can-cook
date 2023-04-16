import mongoose from 'mongoose';
import ENV from '../config.env';

export default async function connect(){
    try {
        const db = await mongoose.connect(ENV.MONGO_DB_LINK);
        console.log(`MongoDB successfully connected...! ${ENV.MONGO_DB_LINK}`);
    }
    catch (error) {
        console.log('db error');
        throw error;
    }


    if(mongoose.connection.readyState === 1){
        console.log("Database Connected");
        return;
    }

    
}