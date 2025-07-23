import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { app } from "./app.js";
dotenv.config();  // Must come first!

connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running at : ${process.env.PORT}`);
    })
} ) 
.catch((error) => {
    console.log(error);
    
})