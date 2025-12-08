import nodemailer from 'nodemailer'
export const sendEmail = async (userEmail, subject, content) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"MealSwift" <${process.env.SENDER_EMAIL}>`,
            to: userEmail,
            subject: subject,
            html: content,
        });

        console.log("Message sent:", info.messageId);
    } catch (error) {
        console.log("Failed to send email: ", error);
    }
}