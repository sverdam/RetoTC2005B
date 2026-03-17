
import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';
import apiRouter from './src/routes'; 

const app: Express = express();
const port: number = 3000

app.use(morgan('dev'))
app.use(express.json());  
app.use(apiRouter); 

app.listen(port, () => {
  console.log(`App listening on port ${port}\n http://localhost:${port}`)  
})
