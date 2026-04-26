
import express, { Express } from "express"; 
import apiRouter from './src/routes'; 
import connectionDB from './src/connection/connection'; 
const morgan = require('morgan'); 


const app: Express = express(); 
const port = 3000; 


app.use(morgan('dev')); 
app.use(express.json());  
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});
app.use(apiRouter); 

connectionDB(); 

app.listen(port, () => { 
console.log(`Example app listening on port ${port}`); 
}); 

