const IssuedBook = require('../models/issuedBook');

const calculateFines = async () => {
    const issuedBooks = await IssuedBook.find({ returned: false });
    const today = new Date();
    for (let issuedBook of issuedBooks) {
        const daysLate = Math.max(0, Math.floor((today - issuedBook.returnDate) / (1000 * 60 * 60 * 24)));
        issuedBook.fine = daysLate * 20; // 20 rupees per day
        await issuedBook.save();
    }
    console.log('Fines calculated and updated');
};

module.exports = { calculateFines };