const express = require('express');
const connectDB = require('./config/db');
const cron = require('node-cron');
const { calculateFines } = require('./utils/fineCalculator');
const { sendReminderEmail } = require('./utils/emailService');
const IssuedBook = require('./models/issuedBook');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', require('./routes/BOOKS'));  // Books route
app.use('/api/members', require('./routes/Members'));  // Members route
app.use('/api/issued-books', require('./routes/IssuedBooks'));  // IssuedBooks route

// Schedule tasks
cron.schedule('0 0 * * *', calculateFines); // Run daily at midnight

cron.schedule('0 10 * * *', async () => {
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

    const issuedBooks = await IssuedBook.find({
        returned: false,
        returnDate: { $lte: twoDaysFromNow },
    }).populate('book').populate('member');

    for (let issuedBook of issuedBooks) {
        await sendReminderEmail(issuedBook.member, issuedBook.book, issuedBook.returnDate);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
