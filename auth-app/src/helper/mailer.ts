// domain.com/verifytoken/asssadkieidki
// domain.com/verifytoken?token=asssadkieidki
import nodemailer from 'nodemailer'
import User from "@/models/userModels"
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate
        (userId, { verifyToken: hashToken, verifyTokenExpire: Date.now() + 3600000 })
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate
        (userId, { forgotPasswordToken: hashToken, forgotPasswordExpire: Date.now() + 3600000 })

    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e0a73907cc2f9a",
        pass: "b936eb45379735"
      }
    });

    const mailOptions = {
      from: 'hitesh@gmail.com',
      to: email,
      subject: email === "VERIFY" ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${email === "VERIFY" ? 'verify your email' : 'reset your password'}
      or copy and paste the link below in your browser. <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashToken}
      </p>`
    }
    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message)
  }
}