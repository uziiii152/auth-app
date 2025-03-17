import nodemailer from 'nodemailer';
import User from "@/models/userModels";
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId, token }: any) => {
  try {
    // Hash userId if needed (for DB storage)
    const hashToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, { verifyToken: hashToken, verifyTokenExpire: Date.now() + 3600000 });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashToken, forgotPasswordExpire: Date.now() + 3600000 });
    }

    // Nodemailer setup
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e0a73907cc2f9a",
        pass: "b936eb45379735"
      }
    });

    // Email Content
    const subject = emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password";
    const urlPath = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const resetUrl = `${process.env.DOMAIN}/${urlPath}?token=${token}`;

    const mailOptions = {
      from: 'noreply@example.com',
      to: email,
      subject,
      html: `<p>Click <a href="${resetUrl}">here</a> to ${emailType === "VERIFY" ? 'verify your email' : 'reset your password'}.</p>
             <p>Or copy and paste this link: ${resetUrl}</p>`
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
