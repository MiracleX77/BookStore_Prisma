import * as productController from '../controllers/productController';
import * as orderController from '../controllers/orderController';
import * as userController from '../controllers/userController';
import express,{Router} from 'express';
import {authenticateToken} from '../services/authService';
import multer from 'multer';

const upload = multer();
const router : Router = express.Router();


router.post("/createAdmin",authenticateToken,userController.createAdmin)
//product route
router.post("/createProduct",authenticateToken,upload.single('image'),productController.createProduct)
router.put("/updateProduct/:id",authenticateToken,upload.single('image'),productController.updateProduct)
router.get("/removeProduct/:id",authenticateToken,productController.removeProduct)

//order route
router.get("/getAllOrder",authenticateToken,orderController.getAllOrder)
router.get("/getOrder/:id",authenticateToken,orderController.getOrder)
router.get("/verifyPaymentOrder/:id",authenticateToken,orderController.verifyPaymentOrder)
router.get("/cancelPaymentOrder/:id",authenticateToken,orderController.cancelPaymentOrder)
router.post("/confirmShipmentOrder/:id",authenticateToken,upload.array('image_before'),orderController.confirmShipmentOrder)
router.get("/confirmReceiveOrder/:id",authenticateToken,orderController.confirmReceiveOrder)
router.post("/problemReceiveOrder/:id",authenticateToken,upload.array('image_problem'),orderController.problemReceiveOrder)







export default router;