import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.send({ status: false, message: "User dose not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({ status: false, message: "Invalid credentials" })
        }
        const token = createToken(user._id);
        res.send({ status: true, token })
    } catch (error) {
        console.log(error);

        res.send({ status: false, message: "Something went wrong!" })
    }
}


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.send({ status: false, message: "User email already exist" })
        }
        if (!validator.isEmail(email)) {
            return res.send({ status: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.send({ status: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.send({ status: true, token })
    } catch (error) {
        res.send({ status: false, message: "Something went wrong!" })
    }
}

export const adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ status: false, message: "Please enter email and password" })
    }
    try {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const adminPayload = {
                email: email,
                role: "admin"
            };
            const token = jwt.sign(adminPayload, process.env.JWT_SECRET, { expiresIn: "24hr" });
            res.send({
                status: true,
                token,
                email,
                role: "admin",
                expiresIn: "24hr"
            });

        } else {
            res.send({ status: false, message: "Invalid credentials" })
        }
    } catch (error) {
        return res.send({ status: false, message: "Something went wrong!" })
    }
}