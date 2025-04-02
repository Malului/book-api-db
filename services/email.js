import "dotenv/config"
import transporter from "../config/nodemailer.js"


const sendReviewNotificationEmail = async (data) => {
    //get props
    //mail options: to, from, subject, html
    //send mail using nodemailer

    const {
        bookOwnerEmail,
        bookOwnerName,
        bookTitle,
        reviewerName,
        reviewContent,
        reviewRating
    } = data;

    const mailOptions = {
        to: bookOwnerEmail,
        from: `"BookAPI" <${process.env.ACCOUNT_EMAIL}>`,
        subject: `New Review from Your Book: ${bookTitle}`,
        html:`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
                <h2>Hello ${bookOwnerName},</h2>
                <p>Your book <strong>${bookTitle}</strong> has received a new review!</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4a90e2; margin: 20px 0;">
                <p><strong>${reviewerName}</strong> gave your book ${reviewRating} stars.</p>
                <p style="font-style: italic;">"${reviewContent}"</p>
                </div>
                <p>Thank you for being part of our community!</p>
                <p>Best regards,<br>The Book App Team</p>
            </div>
            `
    }

    try {
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email send:, ${info.messageId}`);

        return {
            success: true,
            messageId: info.messageId,
            data: info.response
        }
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: error.message,
            message: "Review Email not send"
        }
    }
}

export default sendReviewNotificationEmail