import express from 'express';
import cors from 'cors'; // 👈 Import cors
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // --- 1. Email to YOU (the portfolio owner) ---
  const mailToOwnerOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name} on your portfolio`,
    text: `You have received a new message.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email
  };

  // --- 2. Auto-Reply Email to the USER --- (This is the new part)
  const autoReplyOptions = {
    from: `"Aman Kalyankar" <${process.env.EMAIL_USER}>`, // Your name and email
    to: email, // The user's email address
    subject: `Thank you for your message!`,
    text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will get back to you as soon as possible.\n\nBest regards,\nAman Kalyankar`
  };

  // --- Send both emails ---
  transporter.sendMail(mailToOwnerOptions, (error, info) => {
    if (error) {
      console.error('Error sending email to owner:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to send message.' });
    }
    
    // If the first email is successful, send the auto-reply
    transporter.sendMail(autoReplyOptions, (autoReplyError, autoReplyInfo) => {
      if (autoReplyError) {
        console.error('Error sending auto-reply:', autoReplyError);
        // Don't fail the whole request, as the main message was sent. Just log it.
      }
    });

    console.log('Email to owner sent:', info.response);
    res.status(200).json({ status: 'success', message: 'Message sent successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});