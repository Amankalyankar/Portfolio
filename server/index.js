import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// The single route to handle the email sending logic
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // --- 1. Create the Nodemailer Transporter ---
  // We use an explicit configuration for reliability instead of 'service: "gmail"'.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Port 465 requires 'secure: true'
    auth: {
      user: process.env.EMAIL_USER,
      // IMPORTANT: Use the 16-character App Password generated from your Google account
      pass: process.env.EMAIL_PASS,
    },
  });

  // --- 2. Define Email Options ---
  // Email content to be sent to you (the owner)
  const mailToOwnerOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name} on your portfolio`,
    text: `You have received a new message.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email,
  };

  // Auto-reply email content to be sent to the user
  const autoReplyOptions = {
    from: `"Aman Kalyankar" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for your message!`,
    text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will get back to you as soon as possible.\n\nBest regards,\nAman Kalyankar`,
  };

  // --- 3. Send Emails and Handle Response ---
  // Using a try...catch block with async/await for robust error handling
  try {
    // Send the notification email to yourself first
    await transporter.sendMail(mailToOwnerOptions);
    console.log('Notification email sent successfully to owner.');

    // Then, send the auto-reply to the user
    await transporter.sendMail(autoReplyOptions);
    console.log('Auto-reply sent successfully to user.');

    // If both emails are sent successfully, send a success response
    res.status(200).json({ status: 'success', message: 'Message sent successfully!' });

  } catch (error) {
    // If any error occurs in the process, log it and send a server error response
    console.error('Error sending email:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send message.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
