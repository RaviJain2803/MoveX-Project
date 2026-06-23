import mongoose from "mongoose";
try {
const url = "mongodb://127.0.0.1:27017/M&P";

mongoose.connect(url);

console.log("Successfully connected to mongodb database");

} catch (error) {
    console.log("Faild DataBase connection");
    
}