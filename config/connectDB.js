import mongoose from "mongoose";

export default async () => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
       });
        console.log(`Connected to the MongoDB Database ${conn.connection.name}`)
    }
    catch (error){
        console.error(error);
        process.exit(1);
    }
};
