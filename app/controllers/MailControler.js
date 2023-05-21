// Nodemailer
const nodemailer = require("nodemailer");

async function sendEmail() {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "MrCoder105@gmail.com",
        pass: "cqtqpkaonsmdxzyn",
      },
    });

    const mailOptions = {
      from: "<MrCoder105@gmail.com>",
      to: "athar9157@gmail.com",
      subject: "Account Activation Link",
      html: `<h2>Please click on the given link to activate the account</h2>
             <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
            `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return res.json({ message: "Email has been sent, kindly activate your account" });
  } catch (error) {
    console.error(error);
    return res.json({ error: error.message });
  }
}

sendEmail().catch(error => {
  console.error(error);
  return res.status(500).json({ error: "Internal Server Error" });
});
