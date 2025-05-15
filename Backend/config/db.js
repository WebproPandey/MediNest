const mongoose  =  require("mongoose")

const connectdb = async () =>{
   try{
      const connect =  await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${connect.connection.host}`);
   }catch (error){
       console.error(`Error: ${error}`);
   }
}

module.exports = connectdb