const mongoose=require("mongoose");

const mongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected");
    }
    catch(error){
        console.log("mongodb connection failed");
        console.log(error);
        process.exit(1);
    }
};

module.exports =mongoDB;