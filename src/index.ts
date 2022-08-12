import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request,Response,Application } from 'express';

dotenv.config();
const app:Application = express();

app.use(express.json());

app.use(cors);

app.get('/',(req:Request,res:Response)=>{
    res.send('Api is running')

})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));