import * as userController from '../controllers/userController';
import * as addressController from '../controllers/addressController';
import * as transactionController from '../controllers/transactionController';
import * as orderController from '../controllers/orderController';
import * as productController from '../controllers/productController';
import express,{Router} from 'express';
import {authenticateToken} from '../services/authService';
import multer from 'multer';

const upload = multer();

const router : Router = express.Router();

router.get("/getProduct/:id",productController.getProduct)
router.get("/getAllProduct",productController.getAllProduct)
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
router.post("/insertTransaction",authenticateToken,transactionController.createTransaction)
router.get("/getTransaction/:id",authenticateToken,transactionController.getTransaction)
router.get("/getTransactionByUser/:user_id",authenticateToken,transactionController.getTransactionByUser)
router.get("/getTransactionByOrder/:order_id",authenticateToken,transactionController.getTransactionByOrder)
router.post("/checkOrderOut",authenticateToken,orderController.checkOrderOut)
router.post("/createOrder",authenticateToken,upload.single('image'),orderController.createOrder)
router.get("/receiveUserOrder/:id",authenticateToken,orderController.receiveUserOrder)
router.post("/returnOrder",authenticateToken,orderController.returnOrder)








export default router;