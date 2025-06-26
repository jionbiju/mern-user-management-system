import express from 'express'
import { create, getUserById, getAllData } from '../controller/userController.js'

const route = express.Router();

route.post('/user',create);
route.get('/users',getAllData);
route.get('/user/:id',getUserById);

export  default route;