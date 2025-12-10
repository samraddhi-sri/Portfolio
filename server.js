// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = 5000; // http://localhost:5000

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (index.html, about.html, contact.html, style.css ...)
app.use(express.static(__dirname));

// CONTACT API
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, msg: "All fields are required." });
  }

  try {
    // 🔴 Yahan apna Gmail + App Password daalo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "samsri9415@gmail.com",        // 👉 apna gmail
        pass: "tela mxdk mgbu jesd",              // 👉 Gmail App Password (normal pwd NHI)
      },
    });

    const mailOptions = {
      from: `${email}`,
      to: "samsri9415@gmail.com", // jahan mail aayega
      subject: `New message from ${name}: ${subject}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    return res
      .status(500)
      .json({ success: false, msg: "Error sending message. Try again later." });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
