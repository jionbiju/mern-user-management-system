import express from 'express'
import { create, getUserById, getAllData, updateById, deleteUser } from '../controller/userController.js'

const route = express.Router();

route.post('/user',create);
route.get('/users',getAllData);
route.get('/user/:id',getUserById);
route.put('/update/user/:id',updateById);
route.delete('/delete/user/:id',deleteUser);

export  default route;