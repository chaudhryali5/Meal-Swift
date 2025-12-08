import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/cardController.js'
import authMiddleware from '../middleware/auth.js'

const cartRouter=express.Router();

cartRouter.post('/addtoCart',authMiddleware,addToCart);
cartRouter.post('/removeCart',authMiddleware,removeFromCart);
cartRouter.post('/get',authMiddleware,getCart);

export default cartRouter;