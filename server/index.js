import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js'
import cors from 'cors';

const app = express();

dotenv.config();

//Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use('/api',userRoutes);

const PORT = process.env.PORT || 5000;
const MONGODBURI = process.env.MONGODB_URI;



//MongoDB Connection
mongoose.connect(MONGODBURI)
    .then(() => {
        console.log("Database Connected Successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on the port ${PORT}`);
        })
    })
    .catch((error) => console.log(error))
