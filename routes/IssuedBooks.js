const express = require('express');
const router = express.Router();
const IssuedBook = require('../models/issuedBook');
// const Book = require('../models/book');

// Issue a book
router.post('/', async (req, res) => {
    try {
        const { bookId, memberId, returnDate } = req.body;
        const book = await Book.findById(bookId);
        if (book.availableQuantity === 0) {
            return res.status(400).json({ message: 'Book not available' });
        }
        const issuedBook = new IssuedBook({
            book: bookId,
            member: memberId,
            returnDate: new Date(returnDate),
        });
        await issuedBook.save();
        book.availableQuantity--;
        await book.save();
        res.status(201).json(issuedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Return a book
router.post('/:id/return', async (req, res) => {
    try {
        const issuedBook = await IssuedBook.findById(req.params.id);
        if (!issuedBook) {
            return res.status(404).json({ message: 'Issued book not found' });
        }
        issuedBook.returned = true;
        const book = await Book.findById(issuedBook.book);
        book.availableQuantity++;
        await book.save();
        await issuedBook.save();
        res.status(200).json(issuedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all issued books
router.get('/', async (req, res) => {
    try {
        const issuedBooks = await IssuedBook.find({ returned: false })
            .populate('book')
            .populate('member');
        res.status(200).json(issuedBooks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;