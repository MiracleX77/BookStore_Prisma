import * as userController from '../controllers/userController';
import * as addressController from '../controllers/addressController';
import * as transactionController from '../controllers/transactionController';
import * as orderController from '../controllers/orderController';
import express,{Router} from 'express';
import {authenticateToken} from '../services/authService';
import multer from 'multer';

const upload = multer();

const router : Router = express.Router();
//address route
router.get("/getAddress/:id",authenticateToken,addressController.getAddress)
router.get("/getAllAddress/:user_id",authenticateToken,addressController.getAllAddress)
router.get("/removeAddress/:id",authenticateToken,addressController.removeAddress)
router.post("/insertAddress",addressController.insertAddress)
router.put("/updateAddress/:id",authenticateToken,addressController.updateAddress)
//user route
router.get("/getAllUser",authenticateToken,userController.getAllUser)
router.get("/getUser/:id",authenticateToken,userController.getUser)
router.get("/removeUser/:id",authenticateToken,userController.removeUser)
router.put("/updateUser/:id",authenticateToken,userController.updateUser)

//order route
router.post("/insertTransaction",transactionController.createTransaction)
router.get("/getTransaction/:id",transactionController.getTransaction)
router.get("/getTransactionByUser/:user_id",transactionController.getTransactionByUser)
router.get("/getTransactionByOrder/:order_id",transactionController.getTransactionByOrder)
router.post("/checkOrderOut",orderController.checkOrderOut)
router.post("/createOrder",upload.single('image'),orderController.createOrder)
router.get("/receiveUserOrder/:id",orderController.receiveUserOrder)
router.post("/returnOrder",orderController.returnOrder)








export default router;