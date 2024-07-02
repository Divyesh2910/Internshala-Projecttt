const nodemailer = require("nodemailer");
const errorHandler = require("./errorHandler");

exports.sendmail = (req, res, next, url,) => {
    const transport = nodemailer.createTransport({
        service : "gmail",
        host : "smtp.gmail.com",
        port : 465,
        auth : {
            user : process.env.MAIL_Email_ADDRESS,
            pass : process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "Divyesh Pvt. Ltd.",
        to: req.body.email,
        subject: "Password Reset Link",
        // "text" : "DO NOT SHARE THIS LINKK TO ANYONE"
        html: `<h1>Click below link to reset password</h1> <a href="${url}">Password Reset Link</a>`,
    };

    transport.sendMail(mailOptions, (err, info) => {
        if(err) return next(new errorHandler(err, 500));
        console.log(info);
        return res.status(200).json({
            message: "mail send successfully.",
            url,
        })
    });
};