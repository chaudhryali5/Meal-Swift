import userModel from '../models/userModel.js'

export const addToCart = async (req, res) => {
    try {

        const userData = await userModel.findById(req.body.userId)

        if (!userData) {
            return res.send({ success: false, message: "User not found" })
        }



        let cartData = userData.cartData
        const itemId = req.body.itemId

        if (!cartData[itemId]) {
            cartData[itemId] = 1
        } else {
            cartData[itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData: cartData } })

        res.send({ success: true, message: "Added to cart" })
    } catch (error) {
        console.log(error)
        res.send({ success: false, message: "Something went wrong" })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.send({ success: true, message: "Removed from cart successful" })


    } catch (error) {
        console.log(error)
        res.send({ success: false, message: "Something went wrong" })
    }
}

export const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.send({ status: true, cartData })
    } catch (error) {
        console.log(error)
        res.send({ success: false, message: "Something went wrong" })
    }
}