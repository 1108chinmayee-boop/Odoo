const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email/${token}`;

  const mailOptions = {
    from: `"Dayflow HRMS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Dayflow account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Welcome to Dayflow</h2>

        <p>Thank you for registering.</p>

        <p>Please verify your email address by clicking the button below:</p>

        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Verify Email
        </a>

        <p style="margin-top: 20px;">
          This verification link will expire in 24 hours.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};