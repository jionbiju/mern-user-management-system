import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
dotenv.config();

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