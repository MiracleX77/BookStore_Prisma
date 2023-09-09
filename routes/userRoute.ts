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


//address route
router.get("/getAddress/:id",authenticateToken,addressController.getAddress)
router.get("/getAllAddress/:user_id",authenticateToken,addressController.getAllAddress)
router.get("/removeAddress/:id",authenticateToken,addressController.removeAddress)
router.post("/createAddress",addressController.insertAddress)
router.put("/updateAddress/:id",authenticateToken,addressController.updateAddress)


//order route
router.post("/createTransaction",authenticateToken,transactionController.createTransaction)
router.post("/checkOrderOut",authenticateToken,orderController.checkOrderOut)
router.post("/createOrder",authenticateToken,upload.single('image'),orderController.createOrder)
router.put("/receiveUserOrder/:id",authenticateToken,orderController.receiveUserOrder)
router.put("/returnOrder/:id",authenticateToken,orderController.returnOrder)

router.get("/removeUser/:id",authenticateToken,userController.removeUser)
router.put("/updateUser/:id",authenticateToken,userController.updateUser)








export default router;