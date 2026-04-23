
import express, { Express } from "express"; 
import apiRouter from './src/routes'; 
import connectionDB from './src/connection/connection'; 
import cors from 'cors';
import cookieParser from "cookie-parser";
const morgan = require('morgan'); 


const app: Express = express(); 
const port = 3000; 


app.use(cors({ 
    origin: true, // <- change when dealing with different servers
    credentials: true
}))
app.use(morgan('dev')); 
app.use(express.json());  
app.use(cookieParser());
app.use(apiRouter); 

connectionDB(); 

app.listen(port, () => { 
console.log(`Example app listening on port ${port}`); 
}); 

