import express, { Router } from "express";
import * as productController from '../controllers/productController';
import * as orderController from '../controllers/orderController';
import * as userController from '../controllers/userController';
import * as transactionController from '../controllers/transactionController';
import { authenticateToken } from "../services/authService";
import multer from "multer";


const router : Router = express.Router();

//product route
router.get("/getProduct/:id",productController.getProduct)
router.get("/getAllProduct",productController.getAllProduct)
//transaction route
router.get("/getTransaction/:id",authenticateToken,transactionController.getTransaction)
router.get("/getTransactionByUser/:user_id",authenticateToken,transactionController.getTransactionByUser)
router.get("/getTransactionByOrder/:order_id",authenticateToken,transactionController.getTransactionByOrder)
//user route
router.get("/getUser/:id",authenticateToken,userController.getUser)
//order route
router.get("/getOrder/:id",authenticateToken,orderController.getOrder)

export default router;

