import * as productController from '../controllers/productController';
import express,{Router} from 'express';
import {authenticateToken} from '../controllers/authController';
import multer from 'multer';

const upload = multer();
const router : Router = express.Router();
//product route
router.post("/createProduct",upload.single('image'),productController.createProduct)
router.get("/getProduct/:id",productController.getProduct)
router.get("/getAllProduct",productController.getAllProduct)
router.put("/updateProduct/:id",upload.single('image'),productController.updateProduct)
router.get("/removeProduct/:id",productController.removeProduct)










export default router;