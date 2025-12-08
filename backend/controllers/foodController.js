
import foodModel from "../models/foodModel.js";
import fs from 'fs'
import path from 'path'


export const addFood = async (req, res) => {
    if (!req.file) {
        return res.send({ success: false, message: "Please upload an image" })
    }
   let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        return res.send({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: "Something went Wrong!" })
    }


}


export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.send({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Something went Wrong!" })
    }
}

export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
     
            fs.unlink(path.join(process.cwd(), "uploads", food.image), () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.send({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Something went Wrong!" })
    }
}



