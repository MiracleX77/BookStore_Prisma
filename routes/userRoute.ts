import * as userController from '../controllers/userController';
import express,{Router} from 'express';
import {authenticateToken} from '../controllers/authController';

const router : Router = express.Router();
//address route
router.get("/getAddress/:id",authenticateToken,userController.getAddress)
router.get("/getAllAddress/:user_id",authenticateToken,userController.getAllAddress)
router.get("/removeAddress/:id",authenticateToken,userController.removeAddress)
router.post("/insertAddress",authenticateToken,userController.insertAddress)
router.put("/updateAddress/:id",authenticateToken,userController.updateAddress)
//user route
router.get("/getAllUser",authenticateToken,userController.getAllUser)
router.get("/getUser/:id",authenticateToken,userController.getUser)
router.get("/removeUser/:id",authenticateToken,userController.removeUser)
router.put("/updateUser/:id",authenticateToken,userController.updateUser)







export default router;