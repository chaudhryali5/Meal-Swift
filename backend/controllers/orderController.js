import { LucideToyBrick } from "lucide-react";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

export const placeOrder = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    // const frontend_url = "http://localhost:5173"
    try {

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // Calculate delivery charges
        const subtotal = req.body.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const deliveryCharges = subtotal >= 999 ? 0 : 79;

        if (deliveryCharges > 0) {
            line_items.push({
                price_data: {
                    currency: "pkr",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: deliveryCharges * 100
                },
                quantity: 1
            })
        }

        const sessions = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.send({ status: true, session_url: sessions.url })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" })

    }
}

export const verifyOrder = async (req, res) => {

    const { orderId, status } = req.body;
    try {
        if (status == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.send({ status: true, message: "paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.send({ status: false, message: "Not paid" })
        }
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Something went wrong" })
    }
}

export const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.send({ status: true, data: orders })
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Something went wrong!" })
    }
}

export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.send({ status: true, data: orders })
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Something went wrong!" })
    }
}


export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { Status: req.body.status })
        res.send({ status: true, message: "Status updated" })
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Something went wrong" })
    }
}