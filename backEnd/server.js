import express from 'express';
import dotenv from "dotenv"
import cors from 'cors';
import bodyParser from 'body-parser';
import {connectdatabase} from './db.js'
import registertion from './router/registertion.js'

const port  = process.env.PORT || 9000;

const app = express();
dotenv.config()
connectdatabase();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api",registertion)
app.use("/",express.static("uploads"));

app.listen(port,()=>{
    console.log(`Your Server is run ${port}`)
}) 