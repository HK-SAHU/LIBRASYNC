const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // Configure your email service here
    // For example, using Gmail:
    // service: 'gmail',
    // auth: {
    //     user: 'your-email@gmail.com',
    //     pass: 'your-password'
    // }
});

const sendReminderEmail = async (member, book, returnDate) => {
    const mailOptions = {
        from: 'library@example.com',
        to: member.email,
        subject: 'Library Book Return Reminder',
        text: `Dear ${member.name},\n\nThis is a reminder that the book "${book.title}" is due to be returned on ${returnDate.toDateString()}. Please return it on time to avoid any late fees.\n\nThank you,\nLibrary Management`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent to ${member.email}`);
    } catch (error) {
        console.error('Error sending reminder email:', error);
    }
};

module.exports = { sendReminderEmail };