import contactModel from "../models/contactModel.js";
import { sendEmail } from "../config/nodeMailerConfig.js";

export const contactUs = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).send({ message: "All fields are required" })
        }
        const contact = new contactModel({
            name: name.trim(),
            email: email.trim(),
            phone: phone ? phone.trim() : '',
            message: message.trim(),
        });

        await contact.save();

        // Send email to admin
        const subject = `New Contact Form Submission from ${name}`;
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #ff6347; padding: 20px; text-align: center; color: #ffffff;">
                    <h1 style="margin: 0; font-size: 24px;">MealSwift</h1>
                    <p style="margin: 5px 0 0; font-size: 14px;">New Contact Inquiry</p>
                </div>
                <div style="padding: 30px; background-color: #ffffff;">
                    <h2 style="color: #333333; font-size: 20px; margin-top: 0;">Hello Admin,</h2>
                    <p style="color: #666666; line-height: 1.6;">You have received a new message from the contact form on your website. Here are the details:</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <p style="margin: 10px 0; color: #333333;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0; color: #333333;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ff6347; text-decoration: none;">${email}</a></p>
                        <p style="margin: 10px 0; color: #333333;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
                    </div>

                    <h3 style="color: #333333; font-size: 16px; margin-bottom: 10px;">Message:</h3>
                    <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #ff6347; border-radius: 4px; color: #555555; line-height: 1.6;">
                        ${message}
                    </div>
                </div>
                <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
                    <p style="margin: 0;">&copy; ${new Date().getFullYear()} MealSwift. All rights reserved.</p>
                    <p style="margin: 5px 0 0;">This is an automated message.</p>
                </div>
            </div>
        `;

        // Send to admin (using SENDER_EMAIL as the admin email)
        await sendEmail(process.env.SENDER_EMAIL, subject, htmlContent);

        res.send({ success: true, message: "Message sent successfully" })
    } catch (error) {
        console.log(error)
        res.send({ success: false, message: "Something went wrong" })
    }
}