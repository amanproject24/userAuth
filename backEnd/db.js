import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dataBaseURl = process.env.Database

export const connectdatabase = async()=>{

    mongoose.connect(dataBaseURl, {useNewUrlparser: true}).then((res)=>{
        console.log("Your DataBase is connect succefully")
    }).catch((err)=>{
        console.log(err)
    })

}
