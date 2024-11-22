const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "lexi.mitchell@ethereal.email",
    pass: "uG4b2V3uhg8KV1uErg",
  },
});

const sendEmailNotification = async (userEmail, productId, viewCount) => {
    console.log('xyz')
  try {
    const mailOptions = {
      from: "lexi.mitchell@ethereal.email",
      to: "tensajougan8@gmail.com",
      subject: `You viewed ${productId} multiple times!`,
      text: `You have viewed the product (${productId}) ${viewCount} times in the last 20 hours.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmailNotification };
