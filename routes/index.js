const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// GET /
router.get("/", (req, res, next) => {
  return res.render("index", { title: "Home" });
});

// GET /about
router.get("/about", (req, res, next) => {
  // Just home for now
  return res.render("index", { title: "Home" });
});

// GET /contact
router.get("/contact", (req, res, next) => {
  return res.render("contact", { title: "Contact Me" });
});

// POST /contact
router.post("/contact", (req, res) => {
  const output = `
    <h1>You have a new contact request!</h1>
    <h2>Contact Details</h2>
    <ul>
      <li>Name: ${req.body.first_name} ${req.body.last_name}</li>
      <li>Number: ${req.body.phone}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h2>Message</h2>
    <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });

  let mailOptions = {
    from: '"Website" <hello@andrewbarber.me>',
    to: "hello@andrewbarber.me",
    subject: `Website Contact from ${req.body.first_name}`,
    text: output,
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.render("contact", {
        title: "Contact",
        mailerMessage: "Error: message not sent"
      });
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    return res.render("contact", {
      title: "Contact",
      mailerMessage: "Message has been sent."
    });
  });
});

// GET /work
router.get("/work", (req, res, next) => {
  return res.render("portfolio", { title: "Work / Portfolio" });
});

module.exports = router;
