import nodemailer from "nodemailer";

import "dotenv/config"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ACCOUNT_EMAIL,
        pass: process.env.ACCOUNT_PASSWORD
    },
    //Don't fail for invalid SSL certificates
    tls: {
        rejectUnauthorized: false
    }
})

export default transporter